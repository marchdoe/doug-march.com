// tests/prompt-identity.test.js
import { describe, it, expect } from 'vitest'
import { buildMessages } from '../scripts/utils/prompt-builder.js'

const CTX = {
  signals: { date: '2026-04-13' },
  brief: 'x',
  contentSummary: 'y',
  currentFiles: [],
}

describe('prompt-identity', () => {
  it('prompt assembler is deterministic — same input → identical bytes', () => {
    const a = buildMessages(CTX)
    const b = buildMessages(CTX)
    expect(a.system).toBe(b.system)
    expect(a.messages[0].content).toBe(b.messages[0].content)
  })

  it('tokenContext field, when provided, produces stable output across calls', () => {
    const withCtx = { ...CTX, tokenContext: 'export const foo = 1' }
    const a = buildMessages(withCtx)
    const b = buildMessages(withCtx)
    expect(a.messages[0].content).toBe(b.messages[0].content)
  })
})
