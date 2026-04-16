import { describe, it, expect, afterEach } from 'vitest'
import { readFile, rm } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { archive } from '../../scripts/utils/archiver.js'
import { ROOT } from '../../scripts/utils/file-manager.js'

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
