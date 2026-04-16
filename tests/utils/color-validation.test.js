import { describe, it, expect } from 'vitest'
import {
  hexToHsl,
  detectCoffeeShopPalette,
  validateSchemeAgainstPreset,
  validateSchemeAgainstMandate,
} from '../../scripts/utils/color-validation.js'

describe('hexToHsl', () => {
  it('converts pure red', () => {
    const hsl = hexToHsl('#ff0000')
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })
  it('converts pure white', () => {
    const hsl = hexToHsl('#ffffff')
    expect(hsl.l).toBe(100)
  })
  it('handles 3-char hex', () => {
    const hsl = hexToHsl('#f00')
    expect(hsl.h).toBe(0)
  })
  it('returns null on invalid hex', () => {
    expect(hexToHsl('not-a-hex')).toBeNull()
  })
})

describe('detectCoffeeShopPalette', () => {
  it('warns on warm low-saturation palette (olive-on-stone)', () => {
    const scheme = {
      primary_hue: { h: 30, s: 40, l: 50, name: 'amber' },
      neutral_family: { tinted_toward: 'warm' },
    }
    const preset = `colors: { neutral: { 500: { value: '#8A7F70' } } }`
    const result = detectCoffeeShopPalette(scheme, preset)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/coffee-shop/i)
  })

  it('passes on vibrant palette', () => {
    const scheme = {
      primary_hue: { h: 340, s: 85, l: 55, name: 'magenta' },
      neutral_family: { tinted_toward: 'magenta' },
    }
    const preset = `colors: { neutral: { 500: { value: '#8E7085' } } }`
    const result = detectCoffeeShopPalette(scheme, preset)
    expect(result.ok).toBe(true)
    expect(result.warnings).toEqual([])
  })
})

describe('validateSchemeAgainstPreset', () => {
  it('passes when preset accent hex matches scheme primary_hue', () => {
    const scheme = { primary_hue: { h: 215, s: 70, l: 50, name: 'ocean' } }
    const preset = `
      colors: {
        accent: {
          DEFAULT: { value: '#2673BF' }
        }
      }
    `
    const result = validateSchemeAgainstPreset(scheme, preset)
    expect(result.ok).toBe(true)
  })

  it('warns when accent hex differs from stated primary_hue by >15°', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const preset = `
      colors: {
        accent: {
          DEFAULT: { value: '#2673BF' }
        }
      }
    `
    const result = validateSchemeAgainstPreset(scheme, preset)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/stated hue.*actual hue/i)
  })

  it('passes silently when preset has no extractable accent', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const preset = `// empty`
    const result = validateSchemeAgainstPreset(scheme, preset)
    expect(result.ok).toBe(true)
  })
})

describe('validateSchemeAgainstMandate', () => {
  it('passes when primary hue is inside target range and outside forbidden zones', () => {
    const scheme = { primary_hue: { h: 215, s: 70, l: 50, name: 'ocean' } }
    const mandate = { targetHueRange: [195, 240], forbiddenHues: [[0, 60]], recentPrimaryHues: [30], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(true)
    expect(result.warnings).toEqual([])
  })

  it('warns when primary hue falls inside a forbidden zone', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const mandate = { targetHueRange: [0, 360], forbiddenHues: [[0, 60]], recentPrimaryHues: [30], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/forbidden zone/i)
  })

  it('warns when primary hue falls outside target range', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const mandate = { targetHueRange: [195, 240], forbiddenHues: [], recentPrimaryHues: [], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(false)
    expect(result.warnings[0]).toMatch(/outside target range/i)
  })

  it('accepts the permissive-default mandate (0-360 range, no forbidden)', () => {
    const scheme = { primary_hue: { h: 30, s: 70, l: 50, name: 'amber' } }
    const mandate = { targetHueRange: [0, 360], forbiddenHues: [], recentPrimaryHues: [], rationale: '' }
    const result = validateSchemeAgainstMandate(scheme, mandate)
    expect(result.ok).toBe(true)
  })
})
