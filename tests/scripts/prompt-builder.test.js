// tests/scripts/prompt-builder.test.js
import { describe, it, expect } from 'vitest'
import { buildMessages } from '../../scripts/utils/prompt-builder.js'

const baseContext = {
  signals: {
    date: '2026-03-14',
    weather: { location: 'Chicago', conditions: 'Sunny', feel: 'warm' },
  },
  contentSummary: 'Projects: foo.',
  currentFiles: [],
}

describe('buildMessages — notes field', () => {
  it('includes notes section when signals.notes is set', () => {
    const context = {
      ...baseContext,
      signals: { ...baseContext.signals, notes: 'I just got a hole in one!' },
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content
    expect(prompt).toContain('### Notes from site owner')
    expect(prompt).toContain('I just got a hole in one!')
  })

  it('omits notes section when signals.notes is null', () => {
    const context = {
      ...baseContext,
      signals: { ...baseContext.signals, notes: null },
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content
    expect(prompt).not.toContain('### Notes from site owner')
  })

  it('omits notes section when signals.notes is absent', () => {
    const { messages } = buildMessages(baseContext)
    const prompt = messages[0].content
    expect(prompt).not.toContain('### Notes from site owner')
  })
})
