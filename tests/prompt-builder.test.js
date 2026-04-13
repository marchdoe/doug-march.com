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
