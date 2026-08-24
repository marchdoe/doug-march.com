import { describe, it, expect, afterEach, vi } from 'vitest'
import { readFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

// Stub captureSnapshot — it spawns `vite preview`, which is far slower than the
// per-test timeout. This test is about the record archive() leaves behind.
vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: vi.fn().mockResolvedValue(undefined),
}))

// Stub the seal too. archive() reseals the whole archive on the way out, which
// is correct in the pipeline and wrong in a unit test — on an unsealed checkout
// it would quietly rewrite 1,000 committed files as a side effect of running
// the suite. The seal has its own tests against a temp tree.
vi.mock('../../scripts/seal-archive.js', () => ({
  sealArchive: vi.fn().mockResolvedValue({ dates: 0, scanned: 0, changed: [] }),
}))

const { archive } = await import('../../scripts/utils/archiver.js')
const { ROOT } = await import('../../scripts/utils/file-manager.js')

describe('archive() — record.json', () => {
  let createdDir = null

  afterEach(async () => {
    if (!createdDir) return
    const date = path.basename(createdDir)
    for (const dir of [createdDir, path.join(ROOT, 'public', 'archive', date)]) {
      if (existsSync(dir)) await rm(dir, { recursive: true, force: true })
    }
    const png = path.join(ROOT, 'public', 'archive', `${date}.png`)
    if (existsSync(png)) await rm(png, { force: true })
    createdDir = null
  })

  it('writes the day’s record from the artifacts it just archived', async () => {
    const date = '2099-01-04'
    const signals = { date, lunar: { illumination: 0.42 }, golf: { tournament: 'Test Open' } }
    const scheme = {
      primary_hue: { h: 200, s: 70, l: 50, name: 'test blue' },
      mood_word: 'crisp',
      color_story: 'Test.',
    }

    await archive(date, signals, 'A rationale.', 'A brief.', ['elements/preset.ts'], {}, scheme)
    createdDir = path.join(ROOT, 'archive', date)

    const recordPath = path.join(createdDir, 'record.json')
    expect(existsSync(recordPath)).toBe(true)
    const record = JSON.parse(await readFile(recordPath, 'utf8'))

    expect(record.date).toBe(date)
    expect(record.era).toBe('grammar')
    expect(record.brief).toBe('A brief.')
    expect(record.rationale).toBe('A rationale.')
    expect(record.filesChanged).toEqual(['elements/preset.ts'])
    expect(record.colorScheme.mood_word).toBe('crisp')
    expect(record.buildId).toMatch(/^\d+$/)
    expect(record.attempts).toBe(1)
    expect(record.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  // trace.json is written by design-agents.js after archive() returns, so a
  // record that lifted signals from disk would be blank on every live build.
  it('takes signals from the run rather than from a trace that is not written yet', async () => {
    const date = '2099-01-05'
    const signals = { date, hacker_news: { stories: ['How Complex Systems Fail'] } }

    await archive(date, signals, 'r', 'b', [])
    createdDir = path.join(ROOT, 'archive', date)

    const record = JSON.parse(await readFile(path.join(createdDir, 'record.json'), 'utf8'))
    expect(record.signals).toEqual(signals)
  })
})
