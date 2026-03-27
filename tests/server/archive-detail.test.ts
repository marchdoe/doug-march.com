// tests/server/archive-detail.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'fs'
import { join } from 'path'
import { _readArchiveDetail } from '../../app/server/archive-detail-impl'

const TEST_ARCHIVE = join(process.cwd(), 'archive', '__test-detail__')

describe('archive detail', () => {
  const dateWithBuild = '2099-01-01'
  const dateDir = join(TEST_ARCHIVE, dateWithBuild)
  const buildDir = join(dateDir, 'build-9999999999999')

  const dateNoBuild = '2099-01-02'
  const dateDirNoBuild = join(TEST_ARCHIVE, dateNoBuild)

  beforeAll(() => {
    mkdirSync(buildDir, { recursive: true })
    writeFileSync(join(dateDir, 'archetype.txt'), 'Specimen')
    writeFileSync(join(buildDir, 'brief.md'), [
      '# 2099-01-01', '',
      '**Design Brief:** Test brief content', '',
      '## Signals', '',
      "## Claude's Rationale", '',
      'Test rationale paragraph.', '',
      '## Files Changed', '',
      '- app/routes/index.tsx',
      '- elements/preset.ts',
    ].join('\n'))
    writeFileSync(join(buildDir, 'signals-brief.md'), '# Signals Brief\n\n## Mood\nTest mood')
    writeFileSync(join(buildDir, 'preset.ts'), 'export const preset = {}')

    mkdirSync(dateDirNoBuild, { recursive: true })
    writeFileSync(join(dateDirNoBuild, 'archetype.txt'), 'Poster')
    writeFileSync(join(dateDirNoBuild, 'brief.md'), [
      '# 2099-01-02', '',
      '**Design Brief:** Old format brief', '',
      "## Claude's Rationale", '',
      'Old rationale.', '',
      '## Files Changed', '',
      '- app/routes/index.tsx',
    ].join('\n'))
  })

  afterAll(() => {
    rmSync(TEST_ARCHIVE, { recursive: true, force: true })
  })

  it('reads all artifacts for a date with build directory', () => {
    const result = _readArchiveDetail(dateWithBuild, TEST_ARCHIVE)
    expect(result).not.toBeNull()
    expect(result!.date).toBe(dateWithBuild)
    expect(result!.archetype).toBe('Specimen')
    expect(result!.brief).toBe('Test brief content')
    expect(result!.rationale).toBe('Test rationale paragraph.')
    expect(result!.signalsBrief).toContain('## Mood')
    expect(result!.preset).toContain('export const preset')
    expect(result!.filesChanged).toEqual(['app/routes/index.tsx', 'elements/preset.ts'])
    expect(result!.buildId).toBe('9999999999999')
    expect(result!.hasScreenshot).toBe(false)
  })

  it('falls back to top-level brief.md when no build directory exists', () => {
    const result = _readArchiveDetail(dateNoBuild, TEST_ARCHIVE)
    expect(result).not.toBeNull()
    expect(result!.archetype).toBe('Poster')
    expect(result!.brief).toBe('Old format brief')
    expect(result!.rationale).toBe('Old rationale.')
    expect(result!.signalsBrief).toBe('')
    expect(result!.preset).toBe('')
    expect(result!.buildId).toBe('')
  })

  it('returns null for non-existent date', () => {
    const result = _readArchiveDetail('9999-99-99', TEST_ARCHIVE)
    expect(result).toBeNull()
  })
})
