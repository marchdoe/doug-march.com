import { describe, it, expect, afterEach, vi } from 'vitest'
import { readFile, rm } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

// Stub captureSnapshot — it spawns `vite preview` which takes longer
// than the per-test timeout on CI. This test is about archive() side
// effects (brief.md, build.json, color-scheme.json), not snapshotting.
vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: vi.fn().mockResolvedValue(undefined),
}))

const { archive } = await import('../../scripts/utils/archiver.js')
const { ROOT } = await import('../../scripts/utils/file-manager.js')

describe('archive() — color scheme persistence', () => {
  let createdDir = null

  afterEach(async () => {
    if (createdDir && existsSync(createdDir)) {
      await rm(createdDir, { recursive: true, force: true })
    }
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

    await archive(date, signals, 'rationale', 'brief', [], {}, scheme)

    const dir = path.join(ROOT, 'archive', date)
    createdDir = dir
    const { readdirSync } = await import('fs')
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
    await archive(date, { date }, 'r', 'b', [], {})

    const dir = path.join(ROOT, 'archive', date)
    createdDir = dir
    const { readdirSync } = await import('fs')
    const buildDirs = readdirSync(dir).filter((f) => f.startsWith('build-'))
    const schemePath = path.join(dir, buildDirs[0], 'color-scheme.json')
    expect(existsSync(schemePath)).toBe(false)
  })
})
