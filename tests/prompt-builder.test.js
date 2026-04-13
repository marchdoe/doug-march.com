// tests/prompt-builder.test.js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildMessages } from '../scripts/utils/prompt-builder.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const CONTEXT = {
  signals: { date: '2026-04-13', weather: { location: 'Boston', conditions: 'clear', feel: 'crisp' } },
  brief: '',
  contentSummary: 'projects = [...]',
  currentFiles: [{ path: 'app/components/Sidebar.tsx', content: '// ...' }],
}

test('system prompt matches unified-designer.md byte-for-byte', async () => {
  const expected = await readFile(path.join(ROOT, 'scripts/prompts/unified-designer.md'), 'utf8')
  const { system } = buildMessages(CONTEXT)
  assert.equal(system, expected)
})

test('user message contains formatted signals', () => {
  const { messages } = buildMessages(CONTEXT)
  assert.ok(messages[0].content.includes("Today's Signals (2026-04-13)"))
  assert.ok(messages[0].content.includes('Boston'))
})

test('user message uses brief when provided', () => {
  const { messages } = buildMessages({ ...CONTEXT, brief: 'Design a quiet, editorial day.' })
  assert.ok(messages[0].content.includes('Creative Brief'))
  assert.ok(messages[0].content.includes('quiet, editorial'))
})

test('tokenContext is threaded into user prompt when provided', () => {
  const tokenSnippet = 'export const elementsPreset = definePreset({ name: "elements" })'
  const { messages } = buildMessages({ ...CONTEXT, tokenContext: tokenSnippet })
  assert.ok(messages[0].content.includes('## Design Tokens'))
  assert.ok(messages[0].content.includes(tokenSnippet))
})

test('optional tokenContext defaults to absent (local-dev parity)', () => {
  const withoutOptional = buildMessages(CONTEXT)
  const withNull = buildMessages({ ...CONTEXT, tokenContext: null })
  const withUndefined = buildMessages({ ...CONTEXT, tokenContext: undefined })
  // When omitted/null/undefined, no Design Tokens section is emitted
  // and the three outputs are identical.
  assert.equal(withoutOptional.messages[0].content, withNull.messages[0].content)
  assert.equal(withoutOptional.messages[0].content, withUndefined.messages[0].content)
  assert.ok(!withoutOptional.messages[0].content.includes('## Design Tokens'))
})
