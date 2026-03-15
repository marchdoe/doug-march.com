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

describe('buildMessages — brief framing', () => {
  it('frames the brief with per-section design instructions when brief is provided', () => {
    const context = {
      ...baseContext,
      brief: `## Palette Direction\nWarm and golden.\n\n## Layout Energy\nSpacious and relaxed.\n\n## Tension\nNo tension today.\n\n## Required Elements\n- Tigers win badge: celebratory (source: sports)\n\n## Accent Notes\n- music (GBV): lo-fi texture\n\n## Anchor Signal\nSpring Saturday dominates.`,
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Should frame the brief as design requirements
    expect(prompt).toContain('Palette Direction')
    expect(prompt).toContain('elements/preset.ts')
    expect(prompt).toContain('Required Elements')
    expect(prompt).toContain('MUST include')
  })

  it('includes design-dimension mapping when brief is provided', () => {
    const context = {
      ...baseContext,
      brief: `## Palette Direction\nCold and stark.`,
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Should explain what each brief section drives
    expect(prompt).toContain('color tokens')
    expect(prompt).toContain('Layout')
  })

  it('falls back to raw signals when no brief is provided', () => {
    const { messages } = buildMessages(baseContext)
    const prompt = messages[0].content

    // Should use the old formatSignals path
    expect(prompt).toContain("Today's Signals")
    expect(prompt).toContain('Chicago')
  })
})
