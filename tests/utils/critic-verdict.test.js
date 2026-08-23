import { describe, it, expect } from 'vitest'
import { parseCriticVerdict } from '../../scripts/utils/critic-verdict.js'

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
