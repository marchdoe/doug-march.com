/**
 * The measurement wants a URL, not a port (#280).
 *
 * archive() used to probe 127.0.0.1:5173 with a raw socket and skip the whole
 * responsive measurement when nothing answered — which was always true in CI,
 * so responsive-metrics.json existed for zero builds across the archive.
 * These tests exercise the fixed path: measurement runs through
 * withPreviewServer, a success writes scores, and a failure writes a loud,
 * recorded miss instead of silence.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFile } from 'node:fs/promises'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { tempRepoRoot } from '../helpers/tmp.js'

// Stub captureSnapshot — it spawns `vite preview`, unrelated to what these
// tests exercise. withPreviewServer is stubbed to hand the callback a fake
// URL directly, so no real server or browser is ever started.
const withPreviewServerMock = vi.fn(async (fn) => await fn('http://fake-preview.test/'))
vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: vi.fn().mockResolvedValue(undefined),
  withPreviewServer: (...args) => withPreviewServerMock(...args),
}))

const closeMock = vi.fn().mockResolvedValue(undefined)
vi.mock('@playwright/test', () => ({
  chromium: { launch: vi.fn().mockResolvedValue({ close: closeMock }) },
}))

const screenshotViewportsMock = vi.fn().mockResolvedValue([])
vi.mock('../../scripts/utils/viewport-screenshotter.js', () => ({
  screenshotViewports: (...args) => screenshotViewportsMock(...args),
}))

const scoreResponsiveMock = vi.fn()
vi.mock('../../scripts/utils/responsive-scorer.js', () => ({
  scoreResponsive: (...args) => scoreResponsiveMock(...args),
}))

// Stub the seal too, per tests/scripts/tests-do-not-mutate-archive.test.js:
// archive() reseals every page under public/archive/ on the way out, which
// would otherwise rewrite committed files as a side effect of running the
// suite.
vi.mock('../../scripts/seal-archive.js', () => ({
  sealArchive: vi.fn().mockResolvedValue({ dates: 0, scanned: 0, changed: [] }),
}))

const { archive } = await import('../../scripts/utils/archiver.js')

async function readMetrics(root, date) {
  const dateDir = path.join(root, 'archive', date)
  const build = readdirSync(dateDir).find((d) => /^build-\d+$/.test(d))
  return JSON.parse(await readFile(path.join(dateDir, build, 'responsive-metrics.json'), 'utf8'))
}

describe('archive() — responsive metrics via the preview server', () => {
  let root
  beforeEach(async () => {
    root = await tempRepoRoot('dm-responsive-')
    withPreviewServerMock.mockClear()
    screenshotViewportsMock.mockClear()
    scoreResponsiveMock.mockReset()
  })

  it('writes scores when measurement succeeds', async () => {
    scoreResponsiveMock.mockResolvedValue({
      viewports: { mobile: { width: 360, height: 640, checks: {}, score: 5 } },
      overallScore: 5,
      worstFailure: null,
    })

    const date = '2099-05-01'
    await archive(
      date,
      { date },
      'rationale',
      'brief',
      [],
      {},
      null,
      'Specimen',
      {},
      { root: root }
    )

    expect(withPreviewServerMock).toHaveBeenCalledTimes(1)
    expect(screenshotViewportsMock).toHaveBeenCalledWith(
      'http://fake-preview.test/',
      expect.any(Array),
      expect.stringContaining(path.join('viewports')),
      expect.objectContaining({ browser: expect.anything() })
    )

    const metrics = await readMetrics(root, date)
    expect(metrics.overallScore).toBe(5)
    expect(metrics.archetype).toBe('Specimen')
    expect(metrics.error).toBeUndefined()
  })

  it('writes an error record when the scorer throws', async () => {
    scoreResponsiveMock.mockRejectedValue(new Error('page.goto: timeout exceeded'))

    const date = '2099-05-02'
    await archive(date, { date }, 'rationale', 'brief', [], {}, null, null, {}, { root: root })

    const metrics = await readMetrics(root, date)
    expect(metrics.error).toBe('page.goto: timeout exceeded')
    expect(metrics.date).toBe(date)
    expect(typeof metrics.buildId).toBe('string')
    expect(typeof metrics.measuredAt).toBe('string')
    expect(metrics.viewports).toBeUndefined()
  })
})
