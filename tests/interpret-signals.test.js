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

  it('includes the current output sections in the format spec', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('## Mood')
    expect(prompt).toContain('## Composition Direction')
    expect(prompt).toContain('## Typography Direction')
    expect(prompt).toContain('## Signal Integration')
    expect(prompt).toContain('## Palette Direction')
  })

  it('frames the role as Product Manager, not designer', () => {
    const prompt = buildInterpretPrompt(sampleSignals)
    expect(prompt).toContain('Product Manager')
    expect(prompt).toContain('NOT the designer')
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

describe('buildInterpretPrompt — structural weight changes', () => {
  it('strips signal dump to primary-only when signals weight <= 3', () => {
    const prompt = buildInterpretPrompt(sampleSignals, { signals: 2 })
    expect(prompt).toContain('Signals — Minimal')
    expect(prompt).toContain('weather')
    expect(prompt).toContain('season')
    // Secondary/accent signals should be stripped from the dump
    expect(prompt).not.toContain('"Detroit Tigers"')
    expect(prompt).not.toContain('"waning crescent"')
    expect(prompt).not.toContain('"Show HN: Han"')
  })

  it('keeps full signal dump when signals weight >= 7', () => {
    const prompt = buildInterpretPrompt(sampleSignals, { signals: 8 })
    expect(prompt).not.toContain('Signals — Minimal')
    expect(prompt).toContain('Detroit Tigers')
    expect(prompt).toContain('waning crescent')
    expect(prompt).toContain('Show HN: Han')
  })

  it('adds moderate note when signals weight is 4-6', () => {
    const prompt = buildInterpretPrompt(sampleSignals, { signals: 5 })
    expect(prompt).toContain('moderate influence')
    expect(prompt).toContain('Detroit Tigers')
  })

  it('moves design references to top when inspiration >= 7', () => {
    const images = [{
      title: 'Test Site',
      description: 'A test design',
      base64: 'abc123',
      contentType: 'image/jpeg',
    }]
    const prompt = buildInterpretPrompt(sampleSignals, { inspiration: 8 }, { designReferenceImages: images })
    const refIndex = prompt.indexOf('PRIMARY DRIVER')
    const signalIndex = prompt.indexOf("Today's Raw Signals")
    expect(refIndex).toBeLessThan(signalIndex)
    expect(prompt).toContain('Your primary job today is to create a brief inspired by this award-winning design')
  })

  it('places design references after signals when inspiration < 7', () => {
    const images = [{
      title: 'Test Site',
      description: 'A test design',
      base64: 'abc123',
      contentType: 'image/jpeg',
    }]
    const prompt = buildInterpretPrompt(sampleSignals, { inspiration: 5 }, { designReferenceImages: images })
    const refIndex = prompt.indexOf('Awwwards Sites of the Day')
    const signalIndex = prompt.indexOf("Today's Raw Signals")
    expect(refIndex).toBeGreaterThan(signalIndex)
    expect(prompt).not.toContain('PRIMARY DRIVER')
  })

  it('injects high-risk directive when risk >= 7', () => {
    const prompt = buildInterpretPrompt(sampleSignals, { risk: 9 })
    expect(prompt).toContain('Creative Risk Directive (HIGH)')
    expect(prompt).toContain('Surprise the owner')
    expect(prompt).not.toContain('Creative Risk Directive (LOW)')
  })

  it('injects low-risk directive when risk <= 3', () => {
    const prompt = buildInterpretPrompt(sampleSignals, { risk: 2 })
    expect(prompt).toContain('Creative Risk Directive (LOW)')
    expect(prompt).toContain('proven, professional layout')
    expect(prompt).not.toContain('Creative Risk Directive (HIGH)')
  })

  it('does not inject risk directive for moderate risk (4-6)', () => {
    const prompt = buildInterpretPrompt(sampleSignals, { risk: 5 })
    expect(prompt).not.toContain('Creative Risk Directive')
  })

  it('injects previous brief as "do not repeat" constraint', () => {
    const prev = '## Mood\nA calm, serene day.\n## Composition Direction\nScroll.'
    const prompt = buildInterpretPrompt(sampleSignals, {}, { previousBrief: prev })
    expect(prompt).toContain('DO NOT REPEAT')
    expect(prompt).toContain('A calm, serene day.')
    expect(prompt).toContain('MUST be substantially different')
  })

  it('injects run diversity requirement for run > 1', () => {
    const prompt = buildInterpretPrompt(sampleSignals, {}, { runNumber: 3 })
    expect(prompt).toContain('run #3')
    expect(prompt).toContain('previous 2 run(s)')
    expect(prompt).toContain('DIFFERENT archetype')
  })

  it('does not inject run diversity for first run', () => {
    const prompt = buildInterpretPrompt(sampleSignals, {}, { runNumber: 1 })
    expect(prompt).not.toContain('Run Diversity Requirement')
  })
})
