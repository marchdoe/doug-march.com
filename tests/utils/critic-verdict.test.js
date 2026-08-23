import { describe, it, expect } from 'vitest'
import { parseCriticVerdict, parseBarLine } from '../../scripts/utils/critic-verdict.js'

describe('parseCriticVerdict', () => {
  it('reads an anchored APPROVED verdict block', () => {
    const raw = 'Some analysis.\n===VERDICT===\nAPPROVED\n===END==='
    expect(parseCriticVerdict(raw, 'APPROVED')).toEqual({ verdict: 'APPROVED', malformed: false })
  })

  it('reads an anchored SHIP verdict block', () => {
    const raw = '===VERDICT===\nSHIP\n===END==='
    expect(parseCriticVerdict(raw, 'SHIP')).toEqual({ verdict: 'SHIP', malformed: false })
  })

  it('reads REVISE', () => {
    const raw = 'Problems here.\n===VERDICT===\nREVISE\n===END==='
    expect(parseCriticVerdict(raw, 'SHIP')).toEqual({ verdict: 'REVISE', malformed: false })
  })

  it('does not flip to REVISE when the word appears only in prose', () => {
    // The whole point: a bare includes('REVISE') would wrongly return REVISE here
    const raw = 'The design is strong; no need to REVISE.\n===VERDICT===\nSHIP\n===END==='
    expect(parseCriticVerdict(raw, 'SHIP').verdict).toBe('SHIP')
  })

  it('ignores a template echo of the APPROVE | REVISE line', () => {
    const raw = 'Respond with one of: APPROVE | REVISE\n===VERDICT===\nAPPROVE\n===END==='
    expect(parseCriticVerdict(raw, 'APPROVE').verdict).toBe('APPROVE')
  })

  it('takes the last verdict block when an example precedes the real one', () => {
    const raw =
      'Example:\n===VERDICT===\nSHIP\n===END===\n\nMy actual call:\n===VERDICT===\nREVISE\n===END==='
    expect(parseCriticVerdict(raw, 'SHIP').verdict).toBe('REVISE')
  })

  it('fails closed to REVISE on a malformed/absent block', () => {
    expect(parseCriticVerdict('no verdict here', 'SHIP')).toEqual({
      verdict: 'REVISE',
      malformed: true,
    })
    expect(parseCriticVerdict('', 'APPROVED')).toEqual({ verdict: 'REVISE', malformed: true })
    expect(parseCriticVerdict(null, 'SHIP')).toEqual({ verdict: 'REVISE', malformed: true })
  })

  it('rejects an inline verdict that is not alone on its line', () => {
    const raw = '===VERDICT=== SHIP right away'
    expect(parseCriticVerdict(raw, 'SHIP')).toEqual({ verdict: 'REVISE', malformed: true })
  })
})

describe('parseBarLine', () => {
  it('parses an em-dash-separated BAR line', () => {
    const raw =
      '===VERDICT===\nSHIP\n\nBAR: above — cleaner hierarchy than the reference.\n===END==='
    expect(parseBarLine(raw)).toEqual({
      position: 'above',
      reason: 'cleaner hierarchy than the reference.',
    })
  })

  it('tolerates a hyphen or colon instead of an em-dash', () => {
    expect(parseBarLine('BAR: at - about the same drench commitment')).toEqual({
      position: 'at',
      reason: 'about the same drench commitment',
    })
    expect(parseBarLine('BAR: below: canvas utilization is lower than the reference')).toEqual({
      position: 'below',
      reason: 'canvas utilization is lower than the reference',
    })
  })

  it('is case-insensitive on the position token', () => {
    expect(parseBarLine('bar: ABOVE — stronger hero scale')).toEqual({
      position: 'above',
      reason: 'stronger hero scale',
    })
  })

  it('tolerates a missing reason (position only)', () => {
    expect(parseBarLine('BAR: at')).toEqual({ position: 'at', reason: '' })
  })

  it('only captures the first line of the reason', () => {
    const raw = 'BAR: above — first line reason\nsome trailing prose\n===END==='
    expect(parseBarLine(raw).reason).toBe('first line reason')
  })

  it('returns null when no BAR line is present (no reference was attached)', () => {
    expect(parseBarLine('===VERDICT===\nSHIP\n===END===')).toBeNull()
  })

  it('returns null on empty/null/undefined input', () => {
    expect(parseBarLine('')).toBeNull()
    expect(parseBarLine(null)).toBeNull()
    expect(parseBarLine(undefined)).toBeNull()
  })

  it('returns null on an invalid position token', () => {
    expect(parseBarLine('BAR: sideways — nonsense')).toBeNull()
  })
})
