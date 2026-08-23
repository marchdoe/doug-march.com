import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  extractRecentLayoutSignatures,
  computeLayoutSignatureMandate,
  formatLayoutSignatureMandateForPrompt,
} from '../../scripts/utils/layout-signature-mandate.js'

function seedBuild(archiveDir, date, signature) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  writeFileSync(path.join(buildDir, 'layout-signature.json'), JSON.stringify(signature))
}

const sigA = { columns: '2', axis: 'vertical', symmetry: 'asymmetric', hero_zone: 'left' }
const sigB = { columns: '1', axis: 'horizontal', symmetry: 'symmetric', hero_zone: 'center' }
const sigC = { columns: 'asym', axis: 'diagonal', symmetry: 'asymmetric', hero_zone: 'full-bleed' }
const sigD = { columns: '3', axis: 'vertical', symmetry: 'symmetric', hero_zone: 'top' }

describe('layout-signature-mandate', () => {
  let archiveDir
  beforeEach(() => {
    archiveDir = mkdtempSync(path.join(tmpdir(), 'layoutsigm-'))
  })
  afterEach(() => {
    rmSync(archiveDir, { recursive: true, force: true })
  })

  it('extracts recent layout signatures newest-first', () => {
    seedBuild(archiveDir, '2026-08-01', sigA)
    seedBuild(archiveDir, '2026-08-02', sigB)
    const sigs = extractRecentLayoutSignatures(archiveDir, 7)
    expect(sigs.length).toBe(2)
    expect(sigs[0].columns).toBe('1')
    expect(sigs[0].heroZone).toBe('center')
  })

  it('soft-forbids the last 3 distinct signatures, exact-match on the tuple', () => {
    seedBuild(archiveDir, '2026-08-01', sigA)
    seedBuild(archiveDir, '2026-08-02', sigB)
    seedBuild(archiveDir, '2026-08-03', sigC)
    seedBuild(archiveDir, '2026-08-04', sigD)
    const m = computeLayoutSignatureMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden.length).toBe(3)
    expect(m.softForbidden[0]).toContain('columns=3')
    expect(m.softForbidden[0]).toContain('hero_zone=top')
  })

  it('does not soft-forbid a repeated exact tuple twice', () => {
    seedBuild(archiveDir, '2026-08-01', sigA)
    seedBuild(archiveDir, '2026-08-02', sigA)
    seedBuild(archiveDir, '2026-08-03', sigB)
    const m = computeLayoutSignatureMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden.length).toBe(2)
  })

  it('skips builds missing any signature field (old archives)', () => {
    seedBuild(archiveDir, '2026-08-01', { columns: '2', axis: 'vertical' })
    const sigs = extractRecentLayoutSignatures(archiveDir, 7)
    expect(sigs).toEqual([])
  })

  it('degrades to empty mandate and empty prompt block with no history', () => {
    const m = computeLayoutSignatureMandate({ archiveDir, lookbackDays: 7 })
    expect(m.softForbidden).toEqual([])
    expect(m.recentLayoutSignatures).toEqual([])
    expect(formatLayoutSignatureMandateForPrompt(m)).toBe('')
  })

  it('formats a prompt block with guidance language when history exists', () => {
    seedBuild(archiveDir, '2026-08-04', sigA)
    const block = formatLayoutSignatureMandateForPrompt(
      computeLayoutSignatureMandate({ archiveDir, lookbackDays: 7 })
    )
    expect(block).toContain('## Layout Signature Mandate')
    expect(block).toContain('columns=2')
    expect(block).toContain('justify')
  })
})
