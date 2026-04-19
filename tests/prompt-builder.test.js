// tests/prompt-builder.test.js
import { describe, it, expect } from 'vitest'
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

describe('prompt-builder', () => {
  it('system prompt matches unified-designer.md byte-for-byte', async () => {
    const expected = await readFile(path.join(ROOT, 'scripts/prompts/unified-designer.md'), 'utf8')
    const { system } = buildMessages(CONTEXT)
    expect(system).toBe(expected)
  })

  it('user message contains formatted signals', () => {
    const { messages } = buildMessages(CONTEXT)
    expect(messages[0].content).toContain("Today's Signals (2026-04-13)")
    expect(messages[0].content).toContain('Boston')
  })

  it('user message uses brief when provided', () => {
    const { messages } = buildMessages({ ...CONTEXT, brief: 'Design a quiet, editorial day.' })
    expect(messages[0].content).toContain('Creative Brief')
    expect(messages[0].content).toContain('quiet, editorial')
  })

  it('tokenContext is threaded into user prompt when provided', () => {
    const tokenSnippet = 'export const elementsPreset = definePreset({ name: "elements" })'
    const { messages } = buildMessages({ ...CONTEXT, tokenContext: tokenSnippet })
    expect(messages[0].content).toContain('## Design Tokens')
    expect(messages[0].content).toContain(tokenSnippet)
  })

  it('optional tokenContext defaults to absent (local-dev parity)', () => {
    const withoutOptional = buildMessages(CONTEXT)
    const withNull = buildMessages({ ...CONTEXT, tokenContext: null })
    const withUndefined = buildMessages({ ...CONTEXT, tokenContext: undefined })
    // When omitted/null/undefined, no Design Tokens section is emitted
    // and the three outputs are identical.
    expect(withoutOptional.messages[0].content).toBe(withNull.messages[0].content)
    expect(withoutOptional.messages[0].content).toBe(withUndefined.messages[0].content)
    expect(withoutOptional.messages[0].content).not.toContain('## Design Tokens')
  })

  it('appends the Lesson from Recent Builds section when context.responsiveLesson is present', () => {
    const lesson = 'Recent lesson (2026-04-14): horizontalScroll failed on mobile.'
    const { messages } = buildMessages({ ...CONTEXT, responsiveLesson: lesson })
    expect(messages[0].content).toContain('## Lesson from Recent Builds')
    expect(messages[0].content).toContain(lesson)
  })

  it('omits the Lesson section when responsiveLesson is absent', () => {
    const { messages } = buildMessages(CONTEXT)
    expect(messages[0].content).not.toContain('## Lesson from Recent Builds')
  })
})
