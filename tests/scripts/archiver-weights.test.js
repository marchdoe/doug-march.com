/**
 * The archive must record the night it actually had.
 *
 * design-agents.js passed `{}` as archive()'s `weights` argument, so
 * archiver.js fell back to `?? 5` for all four and wrote those into build.json.
 * Every archived night therefore claimed the defaults — including the risk
 * value derived from the build date, which is the entire point of that dial.
 * Any later reading of "did risk 9 produce better designs" was fiction.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFile } from 'node:fs/promises'
import { mkdirSync, mkdtempSync, readdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('../../scripts/seal-archive.js', () => ({
  sealArchive: vi.fn().mockResolvedValue({ dates: 0, scanned: 0, changed: [] }),
}))

const { archive } = await import('../../scripts/utils/archiver.js')

let ROOT
beforeEach(() => {
  ROOT = mkdtempSync(path.join(tmpdir(), 'dm-weights-'))
  for (const d of ['archive', 'public/archive', 'public/archive-data', 'signals', 'elements']) {
    mkdirSync(path.join(ROOT, ...d.split('/')), { recursive: true })
  }
})

async function buildMeta(date) {
  const dateDir = path.join(ROOT, 'archive', date)
  const build = readdirSync(dateDir).find((d) => /^build-\d+$/.test(d))
  return JSON.parse(await readFile(path.join(dateDir, build, 'build.json'), 'utf8'))
}

describe('archive() — build.json weights', () => {
  it('records the weights the run actually used', async () => {
    const date = '2099-01-09'
    const weights = { signals: 8, inspiration: 2, ratings: 7, risk: 9 }
    await archive(date, { date }, 'r', 'b', [], weights, null, null, {}, { root: ROOT })
    expect((await buildMeta(date)).weights).toEqual(weights)
  })

  it('keeps a risk of 9 rather than flattening it to the default', async () => {
    // risk >= 9 is the Max-Risk License tier. Recording it as 5 makes the
    // archive unable to say the tier ever fired.
    const date = '2099-01-11'
    await archive(date, { date }, 'r', 'b', [], { risk: 9 }, null, null, {}, { root: ROOT })
    expect((await buildMeta(date)).weights.risk).toBe(9)
  })

  it('keeps an explicit 0, which is falsy but not unset', async () => {
    const date = '2099-01-12'
    await archive(date, { date }, 'r', 'b', [], { signals: 0 }, null, null, {}, { root: ROOT })
    expect((await buildMeta(date)).weights.signals).toBe(0)
  })

  it('still falls back to 5 for a weight that is genuinely absent', async () => {
    const date = '2099-01-10'
    await archive(date, { date }, 'r', 'b', [], { signals: 3 }, null, null, {}, { root: ROOT })
    expect((await buildMeta(date)).weights).toEqual({
      signals: 3,
      inspiration: 5,
      ratings: 5,
      risk: 5,
    })
  })
})
