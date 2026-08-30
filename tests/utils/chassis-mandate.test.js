import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  extractRecentChassis,
  computeChassisMandate,
  formatChassisMandateForPrompt,
} from '../../scripts/utils/chassis-mandate.js'

/** record.json lives at the DATE level, not inside a build dir. */
function seedRecord(archiveDir, date, chassis) {
  const dateDir = path.join(archiveDir, date)
  mkdirSync(dateDir, { recursive: true })
  writeFileSync(path.join(dateDir, 'record.json'), JSON.stringify({ date, chassis }))
}

describe('chassis-mandate', () => {
  let archiveDir
  beforeEach(() => {
    archiveDir = mkdtempSync(path.join(tmpdir(), 'chassism-'))
  })
  afterEach(() => {
    rmSync(archiveDir, { recursive: true, force: true })
  })

  it('extracts recent chassis newest-first from date-level record.json', () => {
    seedRecord(archiveDir, '2026-08-27', 'bebas-plex')
    seedRecord(archiveDir, '2026-08-28', 'bricolage-manrope')
    const recent = extractRecentChassis(archiveDir, 14)
    expect(recent).toEqual([
      { date: '2026-08-28', chassis: 'bricolage-manrope' },
      { date: '2026-08-27', chassis: 'bebas-plex' },
    ])
  })

  it('skips dates whose record has no chassis (pre-field archives)', () => {
    seedRecord(archiveDir, '2026-08-26', null)
    seedRecord(archiveDir, '2026-08-27', 'anton-inter-tight')
    mkdirSync(path.join(archiveDir, '2026-08-28'), { recursive: true })
    const recent = extractRecentChassis(archiveDir, 14)
    expect(recent).toEqual([{ date: '2026-08-27', chassis: 'anton-inter-tight' }])
  })

  it('soft-forbids the last three DISTINCT chassis', () => {
    seedRecord(archiveDir, '2026-08-24', 'spectral-albert')
    seedRecord(archiveDir, '2026-08-25', 'bebas-plex')
    seedRecord(archiveDir, '2026-08-26', 'big-shoulders-atkinson')
    seedRecord(archiveDir, '2026-08-27', 'bebas-plex')
    seedRecord(archiveDir, '2026-08-28', 'bricolage-manrope')
    const m = computeChassisMandate({ archiveDir, lookbackDays: 14 })
    expect(m.softForbidden).toEqual(['bricolage-manrope', 'bebas-plex', 'big-shoulders-atkinson'])
  })

  it('degrades to an empty mandate and an empty prompt block with no history', () => {
    const m = computeChassisMandate({ archiveDir, lookbackDays: 14 })
    expect(m.softForbidden).toEqual([])
    expect(m.rationale).toContain('No recent chassis history')
    expect(formatChassisMandateForPrompt(m)).toBe('')
  })

  it('formats a prompt block with the guidance language of the other mandates', () => {
    seedRecord(archiveDir, '2026-08-28', 'bricolage-manrope')
    const block = formatChassisMandateForPrompt(
      computeChassisMandate({ archiveDir, lookbackDays: 14 })
    )
    expect(block).toContain('## Chassis Mandate')
    expect(block).toContain('bricolage-manrope')
    expect(block).toContain('justify')
    expect(block).toContain('Fit > novelty')
  })

  it('honors the lookback window', () => {
    seedRecord(archiveDir, '2026-08-01', 'zilla-worksans')
    seedRecord(archiveDir, '2026-08-28', 'bebas-plex')
    const m = computeChassisMandate({ archiveDir, lookbackDays: 1 })
    expect(m.recentChassis).toEqual([{ date: '2026-08-28', chassis: 'bebas-plex' }])
  })
})
