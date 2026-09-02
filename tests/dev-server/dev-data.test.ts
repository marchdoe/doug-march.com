// tests/dev-server/dev-data.test.ts
import { describe, it, expect, afterEach } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { readArchiveListing } from '../../app/dev-server/dev-data'
import { _readArchiveHandler } from '../../app/server/archive-impl'

// A temp dir, not archive/__test-dev-data__ inside the repo — see
// tests/server/archive.test.ts for the same reasoning.
const FIXTURES_DIR = mkdtempSync(resolve(tmpdir(), 'dm-dev-data-'))

/** Write the record the pipeline leaves in `archive/<date>/record.json`. */
function writeRecord(date: string, opts: Record<string, unknown> = {}) {
  const dir = resolve(FIXTURES_DIR, date)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    resolve(dir, 'record.json'),
    JSON.stringify({
      date,
      era: 'grammar',
      generatedAt: '2026-08-24T00:00:00.000Z',
      buildId: null,
      attempts: 0,
      brief: 'A brief',
      rationale: 'Because reasons.',
      filesChanged: [],
      legacyArchetype: null,
      signals: null,
      hero: { copy: null, rationale: null, source: null },
      chassis: null,
      adBrief: null,
      tokens: null,
      colorScheme: null,
      shell: null,
      verdicts: null,
      composition: null,
      lane: null,
      cost: null,
      ...opts,
    }),
    'utf8'
  )
  return dir
}

afterEach(() => {
  try {
    rmSync(FIXTURES_DIR, { recursive: true })
  } catch {
    /* ok */
  }
})

describe('readArchiveListing', () => {
  it('carries a rationale through in full even when the brief had no Files Changed section (#331)', () => {
    // scripts/utils/archive-record.js's parseBrief falls back to the end of
    // the file when `## Files Changed` is absent, so record.json already
    // holds the full rationale for a day like this. dev-data.ts used to
    // re-walk archive/ and re-parse brief.md with a stricter rule that
    // required that heading and dropped the rationale to '' without it; it
    // now reads the record instead of re-deriving it.
    const fullRationale =
      'The phrase is a command, and the layout argues with itself across a divide. ' +
      'No file list follows it in this brief, and the rationale should not care.'
    writeRecord('2026-09-01', {
      buildId: '1000000000000',
      rationale: fullRationale,
    })

    const [entry] = readArchiveListing(FIXTURES_DIR)
    expect(entry.rationale).toBe(fullRationale)
  })

  it('matches _readArchiveHandler exactly for a fixture with no build.json', () => {
    writeRecord('2026-09-01', { buildId: '1000000000000' })
    writeRecord('2026-08-30', { buildId: null, attempts: 0 })

    expect(readArchiveListing(FIXTURES_DIR)).toEqual(_readArchiveHandler(FIXTURES_DIR))
  })

  it('enriches a record with the timestamp and weights only its build.json carries', () => {
    writeRecord('2026-09-01', { buildId: '1000000000000' })
    const buildDir = resolve(FIXTURES_DIR, '2026-09-01', 'build-1000000000000')
    mkdirSync(buildDir, { recursive: true })
    writeFileSync(
      resolve(buildDir, 'build.json'),
      JSON.stringify({
        buildId: '1000000000000',
        date: '2026-09-01',
        timestamp: 1000000000000,
        brief: 'A brief',
        weights: { signals: 5, inspiration: 5, ratings: 5, risk: 6 },
      }),
      'utf8'
    )

    const [entry] = readArchiveListing(FIXTURES_DIR)
    expect(entry.timestamp).toBe(1000000000000)
    expect(entry.weights).toEqual({ signals: 5, inspiration: 5, ratings: 5, risk: 6 })
  })

  it('leaves a legacy date-only record (no buildId) unenriched', () => {
    writeRecord('2026-08-30', { buildId: null, attempts: 0 })

    const [entry] = readArchiveListing(FIXTURES_DIR)
    expect(entry.timestamp).toBeUndefined()
    expect(entry.weights).toBeUndefined()
  })
})
