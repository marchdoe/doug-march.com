import { describe, it, expect } from 'vitest'
import { buildInterpretPrompt } from '../scripts/interpret-signals.js'

const sampleSignals = {
  date: '2026-03-15',
  weather: { location: 'Ashburn, VA', conditions: 'Partly cloudy, 58°F', feel: 'mild' },
  season: { season: 'spring', month: 3, day: 15 },
  day_of_week: { day: 'Saturday', is_weekend: true, day_index: 6 },
  sun: { sunrise: '06:30', sunset: '18:09', daylight_hours: 11.7 },
  sports: {
    teams: [
      { name: 'Detroit Tigers', league: 'MLB', result: 'win', score: '6-1' },
      { name: 'Detroit Lions', league: 'NFL', result: 'off season' },
    ],
  },
  golf: { tournament: 'THE PLAYERS Championship', status: 'In Progress', leaders: [{ name: 'Ludvig Åberg', position: '1', score: '-13' }] },
  holidays: { today: null, upcoming: [{ name: "St. Patrick's Day", date: '2026-03-17', days_away: 3 }] },
  music: { bands: ['The War on Drugs', 'Guided by Voices'] },
  lunar: { phase: 'waning crescent', illumination: 0.092 },
  quote: { text: 'If you set your goals ridiculously high...', author: 'James Cameron' },
  github: { repos: [{ name: 'anthropics/claude-plugins-official', language: 'Python' }] },
  hacker_news: { stories: [{ title: 'Show HN: Han', score: 83 }] },
  books: { currently_reading: [] },
}

describe('buildInterpretPrompt', () => {
  it('includes signal hierarchy definitions', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('PRIMARY')
    expect(prompt).toContain('SECONDARY')
    expect(prompt).toContain('ACCENT')
  })

  it('includes all six output sections in the format spec', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('## Palette Direction')
    expect(prompt).toContain('## Layout Energy')
    expect(prompt).toContain('## Tension')
    expect(prompt).toContain('## Required Elements')
    expect(prompt).toContain('## Accent Notes')
    expect(prompt).toContain('## Anchor Signal')
  })

  it('frames the role as Product Manager, not designer', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('Product Manager')
    expect(prompt).toContain('NOT the designer')
    expect(prompt).not.toContain("designer's eye")
  })

  it('does not contain old format artifacts', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).not.toContain('## Feel Tags')
    expect(prompt).not.toContain('## Synthesis')
    expect(prompt).not.toContain('per-signal feel')
    expect(prompt).not.toContain('synthesis paragraph')
  })

  it('handles signals with only a date (no signal data)', () => {
    const prompt = buildInterpretPrompt({ date: '2026-01-01' })
    expect(prompt).toContain('2026-01-01')
    expect(prompt).toContain('## Palette Direction')
  })

  it('includes the raw signal data so Claude can read it', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('Ashburn, VA')
    expect(prompt).toContain('spring')
    expect(prompt).toContain('Saturday')
    expect(prompt).toContain('Detroit Tigers')
  })

  it('includes tension guidance', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('tension')
    expect(prompt).toContain('not resolve')
  })

  it('includes the date', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('2026-03-15')
  })
})
