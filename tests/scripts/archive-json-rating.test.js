import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { readRatingForDate, readRecentRatings } from '../../scripts/utils/ratings.js'

let dir

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'archive-'))
})
afterEach(() => rmSync(dir, { recursive: true, force: true }))

const writeRating = (date, ts, data) => {
  mkdirSync(join(dir, date), { recursive: true })
  writeFileSync(join(dir, date, `rating-${ts}.json`), JSON.stringify(data))
}

describe('readRatingForDate', () => {
  it('returns the newest valid rating for a date', () => {
    writeRating('2026-07-12', 1, { grade: 'C', worked: 'old', didnt: '', try: '' })
    writeRating('2026-07-12', 2, { grade: 'B', worked: 'new', didnt: '', try: '' })
    expect(readRatingForDate(dir, '2026-07-12')).toEqual({
      grade: 'B',
      worked: 'new',
      didnt: '',
      try: '',
    })
  })
  it('skips malformed grades and returns null when nothing is valid', () => {
    writeRating('2026-07-12', 1, { grade: 'Z' })
    expect(readRatingForDate(dir, '2026-07-12')).toBeNull()
  })
  it('returns null for a date with no directory', () => {
    expect(readRatingForDate(dir, '2026-01-01')).toBeNull()
  })
})

describe('readRecentRatings (still works after refactor)', () => {
  it('returns newest-first ratings across dates', () => {
    writeRating('2026-07-11', 1, { grade: 'A', worked: '', didnt: '', try: '' })
    writeRating('2026-07-12', 1, { grade: 'B', worked: '', didnt: '', try: '' })
    const out = readRecentRatings(dir)
    expect(out.map((r) => r.grade)).toEqual(['B', 'A'])
    expect(out[0].date).toBe('2026-07-12')
  })
})
