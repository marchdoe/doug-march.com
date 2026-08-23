import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  extractRecentGroundStrategies,
  computePaletteFormulaMandate,
  formatPaletteFormulaMandateForPrompt,
} from '../../scripts/utils/palette-formula-mandate.js'

function seedBuild(archiveDir, date, shell) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  writeFileSync(path.join(buildDir, 'shell.json'), JSON.stringify(shell))
}

describe('palette-formula-mandate', () => {
  let archiveDir
  beforeEach(() => {
    archiveDir = mkdtempSync(path.join(tmpdir(), 'palettem-'))
  })
  afterEach(() => {
    rmSync(archiveDir, { recursive: true, force: true })
  })

  it('extracts recent ground strategies newest-first', () => {
    seedBuild(archiveDir, '2026-08-01', { ground_strategy: 'dark-void' })
    seedBuild(archiveDir, '2026-08-02', { ground_strategy: 'light-ground' })
    const strategies = extractRecentGroundStrategies(archiveDir, 7)
    expect(strategies.length).toBe(2)
    expect(strategies[0].groundStrategy).toBe('light-ground')
  })

  it('computes soft-forbidden list from the last 3 distinct values', () => {
    seedBuild(archiveDir, '2026-08-01', { ground_strategy: 'dark-void' })
    seedBuild(archiveDir, '2026-08-02', { ground_strategy: 'dark-void' })
    seedBuild(archiveDir, '2026-08-03', { ground_strategy: 'drench' })
    seedBuild(archiveDir, '2026-08-04', { ground_strategy: 'duotone' })
    const m = computePaletteFormulaMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden).toEqual(['duotone', 'drench', 'dark-void'])
  })

  it('skips builds with no declared ground strategy (old archives)', () => {
    seedBuild(archiveDir, '2026-08-01', { nav: 'top bar' })
    const strategies = extractRecentGroundStrategies(archiveDir, 7)
    expect(strategies).toEqual([])
  })

  it('degrades to empty mandate and empty prompt block with no history', () => {
    const m = computePaletteFormulaMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden).toEqual([])
    expect(m.recentGroundStrategies).toEqual([])
    expect(formatPaletteFormulaMandateForPrompt(m)).toBe('')
  })

  it('degrades to empty prompt block when archives predate the field', () => {
    seedBuild(archiveDir, '2026-08-01', { nav: 'top bar', footer: 'colophon' })
    const m = computePaletteFormulaMandate({ archiveDir, lookbackDays: 7 })
    expect(formatPaletteFormulaMandateForPrompt(m)).toBe('')
  })

  it('formats a prompt block with guidance language when history exists', () => {
    seedBuild(archiveDir, '2026-08-04', { ground_strategy: 'dark-void' })
    const block = formatPaletteFormulaMandateForPrompt(
      computePaletteFormulaMandate({ archiveDir, lookbackDays: 7 })
    )
    expect(block).toContain('## Palette Formula Mandate')
    expect(block).toContain('dark-void')
    expect(block).toContain('justify')
  })
})
