import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  countSnapshotPages,
  indexEntry,
  projectArchive,
} from '../../scripts/generate-archive-json.js'

// The build-step projection the site depends on: every calendar cell and
// every explainer page reads what this writes. It had no test (#229).

let root
let archiveDir
let publicDir
let outDir

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'archive-json-'))
  archiveDir = join(root, 'archive')
  publicDir = join(root, 'public')
  outDir = join(publicDir, 'archive-data')
  mkdirSync(archiveDir, { recursive: true })
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
  vi.restoreAllMocks()
})

const record = (date, extra = {}) => ({
  date,
  era: 'grammar',
  brief: `Brief for ${date}`,
  legacyArchetype: null,
  chassis: 'unbounded-figtree',
  buildId: '1',
  attempts: 1,
  colorScheme: { mood_word: 'ELECTRIC', primary_hue: { h: 210 } },
  ...extra,
})

function writeDay(date, { pages = [], withRecord = true } = {}) {
  mkdirSync(join(archiveDir, date, 'build-1'), { recursive: true })
  if (withRecord) {
    writeFileSync(join(archiveDir, date, 'record.json'), JSON.stringify(record(date)))
  }
  for (const p of pages) {
    const file = join(publicDir, 'archive', date, p)
    mkdirSync(join(file, '..'), { recursive: true })
    writeFileSync(file, '<html></html>')
  }
}

describe('countSnapshotPages', () => {
  it('counts html files recursively, and nothing else', () => {
    writeDay('2026-08-20', { pages: ['index.html', 'about.html', 'work/spaceman.html'] })
    writeFileSync(join(publicDir, 'archive', '2026-08-20', 'logo.png'), '')
    expect(countSnapshotPages('2026-08-20', publicDir)).toBe(3)
  })

  it('is 0 for a day with a record and no capture', () => {
    writeDay('2026-08-20')
    expect(countSnapshotPages('2026-08-20', publicDir)).toBe(0)
  })
})

describe('indexEntry', () => {
  it('carries only what a calendar cell needs', () => {
    const entry = indexEntry(
      record('2026-08-20'),
      { hasScreenshot: true, pages: 9, uniqueness: { composite: 0.4, window: 7, metrics: {} } },
      archiveDir
    )
    expect(entry).toMatchObject({
      date: '2026-08-20',
      era: 'grammar',
      moodWord: 'ELECTRIC',
      primaryHue: { h: 210 },
      hasScreenshot: true,
      pages: 9,
      cost: null,
      rating: null,
      uniqueness: { composite: 0.4, window: 7 },
    })
    // The full uniqueness payload stays in the per-date file, not the index.
    expect(entry.uniqueness).not.toHaveProperty('metrics')
  })
})

describe('projectArchive', () => {
  it('writes an index and one file per day, newest first', () => {
    writeDay('2026-08-19', { pages: ['index.html'] })
    writeDay('2026-08-20', { pages: ['index.html', 'about.html'] })

    const result = projectArchive({ archiveDir, publicDir, outDir })

    expect(result.index.map((e) => e.date)).toEqual(['2026-08-20', '2026-08-19'])
    expect(result.rebuilt).toBe(0)
    const index = JSON.parse(readFileSync(join(outDir, 'index.json'), 'utf8'))
    expect(index).toHaveLength(2)
    expect(index[0].pages).toBe(2)
    expect(index[1].pages).toBe(1)

    const day = JSON.parse(readFileSync(join(outDir, '2026-08-20.json'), 'utf8'))
    expect(day.brief).toBe('Brief for 2026-08-20')
    expect(day.pages).toBe(2)
    expect(day.hasScreenshot).toBe(false)
    expect(day.uniqueness).not.toBeNull()
  })

  it('marks a day whose screenshot is beside the record', () => {
    writeDay('2026-08-20')
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, '2026-08-20.png'), '')
    const { index } = projectArchive({ archiveDir, publicDir, outDir })
    expect(index[0].hasScreenshot).toBe(true)
  })

  it('scores each day only against the days that preceded it', () => {
    writeDay('2026-08-18')
    writeDay('2026-08-19')
    writeDay('2026-08-20')
    const { index } = projectArchive({ archiveDir, publicDir, outDir })
    const byDate = Object.fromEntries(index.map((e) => [e.date, e.uniqueness]))
    // The first day has nothing to compare to; the third has two.
    expect(byDate['2026-08-18'].window).toBe(0)
    expect(byDate['2026-08-20'].window).toBe(2)
  })

  it('produces an empty index for an empty archive rather than failing', () => {
    const { index } = projectArchive({ archiveDir, publicDir, outDir })
    expect(index).toEqual([])
    expect(existsSync(join(outDir, 'index.json'))).toBe(true)
  })
})
