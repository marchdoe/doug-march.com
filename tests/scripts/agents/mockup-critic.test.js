import { describe, it, expect } from 'vitest'
import { parseMockupCriticResponse } from '../../../scripts/agents/mockup-critic.js'

describe('parseMockupCriticResponse', () => {
  it('parses APPROVE', () => {
    const r = parseMockupCriticResponse('===VERDICT===\nAPPROVE\n===FEEDBACK===\nStrong drench.\n===END===')
    expect(r.verdict).toBe('APPROVE')
    expect(r.feedback).toBe('Strong drench.')
  })
  it('parses REVISE with feedback', () => {
    const r = parseMockupCriticResponse('===VERDICT===\nREVISE\n===FEEDBACK===\n1. utilization ~45% vs floor 70\n===END===')
    expect(r.verdict).toBe('REVISE')
    expect(r.feedback).toContain('45%')
  })
  it('defaults to REVISE on malformed responses (fail-closed)', () => {
    const r = parseMockupCriticResponse('I think it looks nice')
    expect(r.verdict).toBe('REVISE')
    expect(r.feedback).toContain('malformed')
  })
})
