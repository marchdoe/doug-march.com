// tests/prompt-identity.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildMessages } from '../scripts/utils/prompt-builder.js'

const CTX = {
  signals: { date: '2026-04-13' },
  brief: 'x',
  contentSummary: 'y',
  currentFiles: [],
}

test('prompt assembler is deterministic — same input → identical bytes', () => {
  const a = buildMessages(CTX)
  const b = buildMessages(CTX)
  assert.equal(a.system, b.system)
  assert.equal(a.messages[0].content, b.messages[0].content)
})

test('tokenContext field, when provided, produces stable output across calls', () => {
  const withCtx = { ...CTX, tokenContext: 'export const foo = 1' }
  const a = buildMessages(withCtx)
  const b = buildMessages(withCtx)
  assert.equal(a.messages[0].content, b.messages[0].content)
})
