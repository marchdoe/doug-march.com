import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { countArchivedDesigns } from '../../scripts/utils/archive-count.js'

let dir

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'archive-count-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('countArchivedDesigns', () => {
  it('counts date directories', () => {
    for (const d of ['2026-03-12', '2026-06-28', '2026-08-23']) mkdirSync(join(dir, d))
    expect(countArchivedDesigns(dir)).toBe(3)
  })

  it('ignores non-date directories and loose files', () => {
    mkdirSync(join(dir, '2026-03-12'))
    mkdirSync(join(dir, 'scratch'))
    mkdirSync(join(dir, '2026-3-12')) // not zero-padded
    writeFileSync(join(dir, '2026-04-01'), 'a file, not a directory')
    expect(countArchivedDesigns(dir)).toBe(1)
  })

  it('returns 0 when the archive directory is absent', () => {
    expect(countArchivedDesigns(join(dir, 'nope'))).toBe(0)
  })

  it('returns 0 for an empty archive', () => {
    expect(countArchivedDesigns(dir)).toBe(0)
  })
})
