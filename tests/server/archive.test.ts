// tests/server/archive.test.ts
import { describe, it, expect, afterEach } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { _readArchiveHandler } from '../../app/server/archive-impl.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_DIR = resolve(__dirname, '../fixtures/archive')

/** Write the record the pipeline leaves in `archive/<date>/record.json`. */
function writeRecord(date: string, brief: string, opts?: Record<string, unknown>) {
  const dir = resolve(FIXTURES_DIR, date)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    resolve(dir, 'record.json'),
    JSON.stringify({
      date,
      era: 'traced',
      generatedAt: '2026-08-24T00:00:00.000Z',
      buildId: null,
      attempts: 0,
      brief,
      rationale: 'Because the day asked for it.',
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
}

afterEach(() => {
  try {
    rmSync(FIXTURES_DIR, { recursive: true })
  } catch {
    /* ok */
  }
})

describe('_readArchiveHandler', () => {
  it('returns empty array when archive dir does not exist', () => {
    expect(_readArchiveHandler('/nonexistent/path')).toEqual([])
  })

  it('returns records sorted descending by date', () => {
    writeRecord('2026-03-12', 'Whiteout Protocol')
    writeRecord('2026-03-14', 'Post-blizzard brutalism')
    writeRecord('2026-03-13', 'Spring thaw')
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result.map((r) => r.date)).toEqual(['2026-03-14', '2026-03-13', '2026-03-12'])
  })

  it('carries the record through without re-deriving it', () => {
    writeRecord('2026-03-14', 'Post-blizzard brutalism: heavy type, cold grays', {
      era: 'grammar',
      buildId: '1234567890',
      legacyArchetype: 'Specimen',
      chassis: 'bebas-plex',
    })
    const [entry] = _readArchiveHandler(FIXTURES_DIR)
    expect(entry.brief).toBe('Post-blizzard brutalism: heavy type, cold grays')
    expect(entry.era).toBe('grammar')
    expect(entry.buildId).toBe('1234567890')
    expect(entry.legacyArchetype).toBe('Specimen')
    expect(entry.chassis).toBe('bebas-plex')
  })

  it('skips a date with no record', () => {
    mkdirSync(resolve(FIXTURES_DIR, '2026-03-14'), { recursive: true })
    expect(_readArchiveHandler(FIXTURES_DIR)).toHaveLength(0)
  })

  it('skips an unparseable record rather than throwing', () => {
    const dir = resolve(FIXTURES_DIR, '2026-03-14')
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'record.json'), '{ truncated', 'utf8')
    expect(_readArchiveHandler(FIXTURES_DIR)).toHaveLength(0)
  })

  it('ignores directories that are not dates', () => {
    writeRecord('2026-03-14', 'A real day')
    mkdirSync(resolve(FIXTURES_DIR, 'scratch'), { recursive: true })
    expect(_readArchiveHandler(FIXTURES_DIR)).toHaveLength(1)
  })

  it('returns all entries without a limit', () => {
    for (let i = 1; i <= 12; i++) {
      writeRecord(`2026-03-${String(i).padStart(2, '0')}`, `Design ${i}`)
    }
    expect(_readArchiveHandler(FIXTURES_DIR)).toHaveLength(12)
  })
})
