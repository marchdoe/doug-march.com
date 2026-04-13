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

  it('falls back to raw signals when brief is empty string', () => {
    const context = { ...baseContext, brief: '' }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Empty brief should not trigger the brief framing
    expect(prompt).not.toContain('How to read this brief')
    expect(prompt).toContain("Today's Signals")
  })

  it('falls back to raw signals when brief is whitespace-only', () => {
    const context = { ...baseContext, brief: '   \n  ' }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    expect(prompt).not.toContain('How to read this brief')
    expect(prompt).toContain("Today's Signals")
  })
})

describe('buildMessages — formatSignals catch-all', () => {
  it('includes unhandled signal keys via generic catch-all', () => {
    const context = {
      ...baseContext,
      signals: {
        ...baseContext.signals,
        lunar: { phase: 'full moon', illumination: 1.0 },
        season: { season: 'winter' },
      },
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content

    // Generic catch-all should include lunar and season data
    expect(prompt).toContain('full moon')
    expect(prompt).toContain('winter')
  })
})

describe('buildMessages — system prompt (designer prompt rewrite)', () => {
  it('establishes designer role receiving a brief from PM', () => {
    const { system } = buildMessages(baseContext)
    expect(system).toContain('You are designing a complete website')
    expect(system).toContain('creative brief')
    expect(system).toContain('complete reimagination')
  })

  it('includes all six design dimensions', () => {
    const { system } = buildMessages(baseContext)
    expect(system).toContain('Layout structure')
    expect(system).toContain('Visual hierarchy')
    expect(system).toContain('Density')
    expect(system).toContain('Typography scale')
    expect(system).toContain('Color approach')
    expect(system).toContain('Element character')
  })

  it('includes structural creativity examples', () => {
    const { system } = buildMessages(baseContext)
    expect(system).toContain('nav is at the bottom')
    expect(system).toContain('fills the entire viewport')
    expect(system).toContain('persistent left sidebar')
    expect(system).toContain('asymmetrically split')
  })

  it('unlocks Google Fonts typography', () => {
    const { system } = buildMessages(baseContext)
    expect(system).toContain('ANY font from Google Fonts')
    expect(system).toContain('links')
    expect(system).toContain('__root.tsx')
    expect(system).toContain('font tokens')
  })

  it('includes accessibility floors', () => {
    const { system } = buildMessages(baseContext)
    expect(system).toContain('WCAG AA')
    expect(system).toContain('4.5:1')
    expect(system).toContain('14px')
    expect(system).toContain('75 characters')
    expect(system).toContain('keyboard-accessible')
  })

  it('does not contain old conservative prompt language', () => {
    const { system } = buildMessages(baseContext)
    expect(system).not.toContain('CSS Zen Garden')
    expect(system).not.toContain('Be bold')
    expect(system).not.toContain('A safe redesign is a failed redesign')
  })
})

describe('buildMessages — user prompt (reframed file contents)', () => {
  it('frames current files as technical reference, not starting point', () => {
    const context = {
      ...baseContext,
      currentFiles: [{ path: 'elements/preset.ts', content: 'const x = 1' }],
    }
    const { messages } = buildMessages(context)
    const prompt = messages[0].content
    expect(prompt).toContain('Technical Reference')
    expect(prompt).toContain('Do NOT use these as a layout starting point')
    expect(prompt).toContain('design from scratch')
  })

  it('does not include the old generic design prompt with blizzard example', () => {
    const { messages } = buildMessages(baseContext)
    const prompt = messages[0].content
    expect(prompt).not.toContain('blizzard')
    expect(prompt).not.toContain('Safe is wrong')
    expect(prompt).not.toContain('The signals are your palette')
  })
})
