// tests/server/archive.test.ts
import { describe, it, expect, afterEach } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { _readArchiveHandler } from '../../app/server/archive-impl.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_DIR = resolve(__dirname, '../fixtures/archive')

function writeArchiveEntry(date: string, brief: string, opts?: { archetype?: string; buildId?: string }) {
  const dir = resolve(FIXTURES_DIR, date)
  mkdirSync(dir, { recursive: true })

  if (opts?.archetype) {
    writeFileSync(resolve(dir, 'archetype.txt'), opts.archetype, 'utf8')
  }

  const briefContent = `# ${date}\n\n**Design Brief:** ${brief}\n\n## Signals\n`

  if (opts?.buildId) {
    const buildDir = resolve(dir, `build-${opts.buildId}`)
    mkdirSync(buildDir, { recursive: true })
    writeFileSync(resolve(buildDir, 'brief.md'), briefContent, 'utf8')
  } else {
    writeFileSync(resolve(dir, 'brief.md'), briefContent, 'utf8')
  }
}

afterEach(() => {
  try { rmSync(FIXTURES_DIR, { recursive: true }) } catch { /* ok */ }
})

describe('_readArchiveHandler', () => {
  it('returns empty array when archive dir does not exist', () => {
    const result = _readArchiveHandler('/nonexistent/path')
    expect(result).toEqual([])
  })

  it('returns parsed entries sorted descending by date', () => {
    writeArchiveEntry('2026-03-12', 'Whiteout Protocol')
    writeArchiveEntry('2026-03-14', 'Post-blizzard brutalism')
    writeArchiveEntry('2026-03-13', 'Spring thaw')
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result).toHaveLength(3)
    expect(result[0].date).toBe('2026-03-14')
    expect(result[1].date).toBe('2026-03-13')
    expect(result[2].date).toBe('2026-03-12')
  })

  it('extracts brief text correctly', () => {
    writeArchiveEntry('2026-03-14', 'Post-blizzard brutalism: heavy type, cold grays')
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result[0].brief).toBe('Post-blizzard brutalism: heavy type, cold grays')
  })

  it('skips entries with missing brief.md', () => {
    mkdirSync(resolve(FIXTURES_DIR, '2026-03-14'), { recursive: true })
    // no brief.md written
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result).toHaveLength(0)
  })

  it('returns all entries without a limit', () => {
    for (let i = 1; i <= 12; i++) {
      writeArchiveEntry(`2026-03-${String(i).padStart(2, '0')}`, `Design ${i}`)
    }
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result).toHaveLength(12)
  })

  it('includes archetype and buildId fields', () => {
    writeArchiveEntry('2026-03-14', 'Brutalist design', { archetype: 'Specimen', buildId: '1234567890' })
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result[0].archetype).toBe('Specimen')
    expect(result[0].buildId).toBe('1234567890')
  })

  it('defaults archetype and buildId to empty string when missing', () => {
    writeArchiveEntry('2026-03-14', 'Simple design')
    const result = _readArchiveHandler(FIXTURES_DIR)
    expect(result[0].archetype).toBe('')
    expect(result[0].buildId).toBe('')
  })
})
