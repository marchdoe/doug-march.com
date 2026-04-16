import { describe, it, expect } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  computeColorMandate,
  extractRecentPrimaryHues,
  mapSignalsToTargetHue,
  computeForbiddenZones,
  formatMandateForPrompt,
} from '../../scripts/utils/color-mandate.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIXTURE_DIR = path.resolve(__dirname, '../fixtures/archive-mandate')

describe('extractRecentPrimaryHues', () => {
  it('reads color-scheme.json when present', () => {
    const hues = extractRecentPrimaryHues(FIXTURE_DIR, 7)
    expect(hues).toEqual(expect.arrayContaining([30, 80]))
    expect(hues.length).toBeGreaterThanOrEqual(2)
  })

  it('respects lookbackDays limit', () => {
    const hues = extractRecentPrimaryHues(FIXTURE_DIR, 1)
    expect(hues.length).toBeLessThanOrEqual(1)
  })

  it('returns empty array on missing archive dir', () => {
    const hues = extractRecentPrimaryHues('/nonexistent/path', 7)
    expect(hues).toEqual([])
  })
})

describe('mapSignalsToTargetHue', () => {
  it('maps cold-winter mood to cool blue range', () => {
    const { targetHueRange, mood } = mapSignalsToTargetHue({ weather: { mood: 'cold winter' } })
    expect(targetHueRange[0]).toBeGreaterThanOrEqual(180)
    expect(targetHueRange[1]).toBeLessThanOrEqual(260)
    expect(mood).toMatch(/cool/i)
  })

  it('maps energetic mood to vivid range', () => {
    const { targetHueRange } = mapSignalsToTargetHue({ weather: { mood: 'energetic' } })
    expect(targetHueRange.length).toBe(2)
  })

  it('returns permissive default when no mood', () => {
    const { targetHueRange } = mapSignalsToTargetHue({})
    expect(targetHueRange).toEqual([0, 360])
  })
})

describe('computeForbiddenZones', () => {
  it('creates ±30° zones around each recent hue', () => {
    const zones = computeForbiddenZones([30, 80], 30)
    expect(zones).toEqual([[0, 110]])
  })

  it('keeps non-overlapping zones separate', () => {
    const zones = computeForbiddenZones([30, 200], 20)
    expect(zones).toEqual([[10, 50], [180, 220]])
  })

  it('handles wraparound at 0/360', () => {
    const zones = computeForbiddenZones([10], 20)
    expect(zones.some((z) => z[0] >= 340)).toBe(true)
    expect(zones.some((z) => z[0] === 0 && z[1] >= 20)).toBe(true)
  })

  it('returns empty on empty input', () => {
    expect(computeForbiddenZones([], 30)).toEqual([])
  })
})

describe('computeColorMandate', () => {
  it('produces a full mandate from fixtures', () => {
    const mandate = computeColorMandate({
      archiveDir: FIXTURE_DIR,
      signals: { weather: { mood: 'cold winter' } },
      lookbackDays: 7,
    })
    expect(mandate.targetHueRange).toBeDefined()
    expect(mandate.forbiddenHues.length).toBeGreaterThan(0)
    expect(mandate.recentPrimaryHues).toEqual(expect.arrayContaining([30, 80]))
    expect(mandate.rationale).toEqual(expect.any(String))
    expect(mandate.rationale.length).toBeGreaterThan(20)
  })

  it('falls back gracefully when archive is empty', () => {
    const mandate = computeColorMandate({
      archiveDir: '/nonexistent',
      signals: {},
      lookbackDays: 7,
    })
    expect(mandate.forbiddenHues).toEqual([])
    expect(mandate.rationale).toMatch(/no recent/i)
  })
})

describe('formatMandateForPrompt', () => {
  it('renders a markdown section with clear structure', () => {
    const mandate = {
      targetHueRange: [195, 240],
      forbiddenHues: [[0, 60]],
      recentPrimaryHues: [30, 40],
      rationale: 'Cool blue for winter clarity; avoid warm amber seen recently.',
    }
    const formatted = formatMandateForPrompt(mandate)
    expect(formatted).toMatch(/## Color Mandate/)
    expect(formatted).toMatch(/195.*240/)
    expect(formatted).toMatch(/0.*60/)
    expect(formatted).toMatch(/winter clarity/)
  })
})
