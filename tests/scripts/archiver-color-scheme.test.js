import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { tempRepoRoot } from '../helpers/tmp.js'

// Stub captureSnapshot — it spawns `vite preview` which takes longer
// than the per-test timeout on CI. This test is about archive() side
// effects (brief.md, build.json, color-scheme.json), not snapshotting.
vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: vi.fn().mockResolvedValue(undefined),
}))

// Stub the seal too. archive() reseals the whole archive on the way out, which
// is right in the pipeline and wrong in a unit test: it rewrites committed
// files under public/archive/ as a side effect of running the suite. On a
// machine holding an uncommitted build it gave the previous day a next arrow
// pointing at it, which is how nine files ended up modified by `pnpm test`.
// The seal has its own tests against a temp tree.
vi.mock('../../scripts/seal-archive.js', () => ({
  sealArchive: vi.fn().mockResolvedValue({ dates: 0, scanned: 0, changed: [] }),
}))

const { archive } = await import('../../scripts/utils/archiver.js')

describe('archive() — color scheme persistence', () => {
  // A temp root rather than the repo. archive() writes archive/{date}/ AND
  // copies into public/archive/{date}/, so this needed two hand-written
  // cleanups keyed on a path recorded only after archive() returned — a throw
  // before that leaked both. Pointing the whole call at a temp dir removes the
  // cleanup rather than fixing it.
  let ROOT
  let createdDir = null
  beforeEach(async () => {
    ROOT = await tempRepoRoot()
    createdDir = null
  })

  it('writes color-scheme.json when colorScheme is provided', async () => {
    const date = '2099-01-01'
    const signals = { date, weather: 'test' }
    const scheme = {
      primary_hue: { h: 200, s: 70, l: 50, name: 'test blue' },
      secondary_accent: null,
      neutral_family: { tinted_toward: 'blue', name: 'slate' },
      mood_word: 'crisp',
      color_story: 'Test.',
    }

    await archive(date, signals, 'rationale', 'brief', [], {}, scheme, null, {}, { root: ROOT })

    const dir = path.join(ROOT, 'archive', date)
    createdDir = dir
    const { readdirSync } = await import('node:fs')
    const buildDirs = readdirSync(dir).filter((f) => f.startsWith('build-'))
    expect(buildDirs.length).toBeGreaterThan(0)

    const schemePath = path.join(dir, buildDirs[0], 'color-scheme.json')
    expect(existsSync(schemePath)).toBe(true)
    const contents = JSON.parse(await readFile(schemePath, 'utf8'))
    expect(contents.primary_hue.h).toBe(200)
    expect(contents.mood_word).toBe('crisp')
  })

  it('does not write color-scheme.json when colorScheme is omitted', async () => {
    const date = '2099-01-02'
    await archive(date, { date }, 'r', 'b', [], {}, null, null, {}, { root: ROOT })

    const dir = path.join(ROOT, 'archive', date)
    createdDir = dir
    const { readdirSync } = await import('node:fs')
    const buildDirs = readdirSync(dir).filter((f) => f.startsWith('build-'))
    const schemePath = path.join(dir, buildDirs[0], 'color-scheme.json')
    expect(existsSync(schemePath)).toBe(false)
  })
})
