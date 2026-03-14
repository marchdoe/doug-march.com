import { describe, it, expect } from 'vitest'
import { buildInterpretPrompt } from '../scripts/interpret-signals.js'

describe('interpret-signals', () => {
  it('builds a prompt from signal data', () => {
    const signals = {
      date: '2026-03-14',
      weather: { location: 'Ashburn, VA', conditions: 'Heavy rain, 45°F' },
      season: { season: 'spring' },
      day_of_week: { day: 'Saturday', is_weekend: true },
    }
    const prompt = buildInterpretPrompt(signals)
    expect(prompt).toContain('Heavy rain')
    expect(prompt).toContain('spring')
    expect(prompt).toContain('Saturday')
    expect(prompt).toContain('per-signal feel')
    expect(prompt).toContain('synthesis paragraph')
  })
})
