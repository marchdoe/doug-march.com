import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { recencyMandate, FORBID_WINDOW } from '../../scripts/utils/recency-mandate.js'

function seedBuild(archiveDir, date, artifact, contents) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  writeFileSync(path.join(buildDir, artifact), JSON.stringify(contents))
}

/** A mandate with every string distinguishable, so the block can be asserted. */
const build = (overrides = {}) =>
  recencyMandate({
    artifact: 'thing.json',
    field: 'flavour',
    valueKey: 'flavour',
    historyKey: 'recentFlavours',
    title: 'Flavour Mandate',
    intro: 'INTRO LINE.',
    rationaleLabel: 'flavours',
    emptyRationale: 'No flavour history; the flavour is open.',
    forbiddenBullet: (f) => `- **Avoid:** ${f.join(', ')}`,
    emptyBullet: `- **Flavours:** no recent history.`,
    closing: 'CLOSING LINE.',
    ...overrides,
  })

describe('recencyMandate', () => {
  let archiveDir
  beforeEach(() => {
    archiveDir = mkdtempSync(path.join(tmpdir(), 'recencym-'))
  })
  afterEach(() => {
    rmSync(archiveDir, { recursive: true, force: true })
  })

  it('names the history array with the caller’s key, not a generic one', () => {
    seedBuild(archiveDir, '2026-08-01', 'thing.json', { flavour: 'salt' })
    const m = build().compute({ archiveDir, lookbackDays: 7 })
    // The key is public shape: mandates.js and the archived tests read it.
    expect(m.recentFlavours).toEqual([{ date: '2026-08-01', flavour: 'salt' }])
    expect(m.history).toBeUndefined()
  })

  it('discourages the last three distinct values by default', () => {
    for (const [date, flavour] of [
      ['2026-08-01', 'salt'],
      ['2026-08-02', 'salt'],
      ['2026-08-03', 'smoke'],
      ['2026-08-04', 'char'],
    ]) {
      seedBuild(archiveDir, date, 'thing.json', { flavour })
    }
    const m = build().compute({ archiveDir, lookbackDays: 7 })
    expect(FORBID_WINDOW).toBe(3)
    expect(m.softForbidden).toEqual(['char', 'smoke', 'salt'])
  })

  it('lets a caller replace the rule entirely', () => {
    seedBuild(archiveDir, '2026-08-01', 'thing.json', { flavour: 'salt' })
    seedBuild(archiveDir, '2026-08-02', 'thing.json', { flavour: 'salt' })
    const streak = build({
      forbid: (h) => (h.length >= 2 && h[0].flavour === h[1].flavour ? [h[0].flavour] : []),
    })
    expect(streak.compute({ archiveDir, lookbackDays: 7 }).softForbidden).toEqual(['salt'])
  })

  it('omits dates whose build never declared the field', () => {
    seedBuild(archiveDir, '2026-08-01', 'thing.json', { somethingElse: 'x' })
    seedBuild(archiveDir, '2026-08-02', 'thing.json', { flavour: 'salt' })
    const m = build().compute({ archiveDir, lookbackDays: 7 })
    expect(m.recentFlavours).toHaveLength(1)
  })

  it('returns an empty block rather than an empty section when there is no history', () => {
    const mandate = build()
    const m = mandate.compute({ archiveDir, lookbackDays: 7 })
    expect(m.rationale).toBe('No flavour history; the flavour is open.')
    expect(mandate.format(m)).toBe('')
  })

  it('renders heading, bullet, rationale and closing in order', () => {
    seedBuild(archiveDir, '2026-08-01', 'thing.json', { flavour: 'salt' })
    const mandate = build()
    const block = mandate.format(mandate.compute({ archiveDir, lookbackDays: 7 }))
    expect(block).toBe(
      [
        '## Flavour Mandate',
        '',
        'INTRO LINE.',
        '',
        '- **Avoid:** salt',
        '',
        '- **Rationale:** Last 1 flavours: 2026-08-01: salt',
        '',
        'CLOSING LINE.',
      ].join('\n')
    )
  })

  it('uses the empty bullet when there is history but nothing to discourage', () => {
    seedBuild(archiveDir, '2026-08-01', 'thing.json', { flavour: 'salt' })
    const mandate = build({ forbid: () => [] })
    const block = mandate.format(mandate.compute({ archiveDir, lookbackDays: 7 }))
    expect(block).toContain('- **Flavours:** no recent history.')
    expect(block).not.toContain('**Avoid:**')
  })
})
