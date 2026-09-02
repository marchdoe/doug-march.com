import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { archivedDates, datesWithOgImage, readJsonSafe } from '../../scripts/utils/archive-fs.js'

let dir

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'archive-fs-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('archivedDates', () => {
  it('lists only dated directories, ascending by default', () => {
    for (const d of ['2026-08-20', '2026-08-18', 'not-a-date', '2026-08-19']) {
      mkdirSync(path.join(dir, d))
    }
    writeFileSync(path.join(dir, '2026-08-21'), 'a file, not a dir')
    expect(archivedDates(dir)).toEqual(['2026-08-18', '2026-08-19', '2026-08-20'])
  })

  it('reverses on request', () => {
    for (const d of ['2026-08-18', '2026-08-20']) mkdirSync(path.join(dir, d))
    expect(archivedDates(dir, { newestFirst: true })).toEqual(['2026-08-20', '2026-08-18'])
  })

  it('is [] for a missing archive', () => {
    expect(archivedDates(path.join(dir, 'nope'))).toEqual([])
  })

  it('skips a future-dated directory (#311)', () => {
    // A dir dated after today is not a real archived day — a UTC-derived
    // write, a clock skew, a typo — and would otherwise show up as a
    // phantom calendar cell with 0 pages.
    for (const d of ['2026-08-18', '2999-01-01']) mkdirSync(path.join(dir, d))
    expect(archivedDates(dir)).toEqual(['2026-08-18'])
  })
})

describe('datesWithOgImage', () => {
  it('lists dates with a real dated PNG, not default.png or other files', () => {
    writeFileSync(path.join(dir, '2026-08-18.png'), 'fake png')
    writeFileSync(path.join(dir, '2026-08-19.png'), 'fake png')
    writeFileSync(path.join(dir, 'default.png'), 'fake png')
    writeFileSync(path.join(dir, '2026-08-20.json'), '{}')
    expect(datesWithOgImage(dir)).toEqual(['2026-08-18', '2026-08-19'])
  })

  it('is [] for a missing directory', () => {
    expect(datesWithOgImage(path.join(dir, 'nope'))).toEqual([])
  })
})

describe('readJsonSafe', () => {
  it('parses, and treats missing or malformed as null', () => {
    writeFileSync(path.join(dir, 'ok.json'), '{"a":1}')
    writeFileSync(path.join(dir, 'bad.json'), '{ nope')
    expect(readJsonSafe(path.join(dir, 'ok.json'))).toEqual({ a: 1 })
    expect(readJsonSafe(path.join(dir, 'bad.json'))).toBeNull()
    expect(readJsonSafe(path.join(dir, 'absent.json'))).toBeNull()
  })
})
