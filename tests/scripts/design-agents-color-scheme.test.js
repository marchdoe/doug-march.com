import { describe, it, expect } from 'vitest'
import { parseDelimiterResponse } from '../../scripts/design-agents.js'
import { detectCoffeeShopPalette, validateSchemeAgainstPreset } from '../../scripts/utils/color-validation.js'

describe('parseDelimiterResponse — COLOR_SCHEME block', () => {
  it('extracts a well-formed COLOR_SCHEME JSON block', () => {
    const response = `===RATIONALE===
Ocean blue for clarity.

===DESIGN_BRIEF===
Crisp winter morning on the coast.

===COLOR_SCHEME===
{
  "primary_hue": { "h": 215, "s": 70, "l": 50, "name": "ocean blue" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "blue", "name": "slate" },
  "mood_word": "crisp",
  "color_story": "Winter clarity — slate neutrals, ocean accent for emphasis."
}

===FILE:elements/preset.ts===
export const elementsPreset = {}
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toBeDefined()
    expect(parsed.color_scheme.primary_hue.h).toBe(215)
    expect(parsed.color_scheme.mood_word).toBe('crisp')
    expect(parsed.color_scheme.secondary_accent).toBeNull()
  })

  it('returns color_scheme as undefined when block is missing', () => {
    const response = `===RATIONALE===
no scheme
===FILE:elements/preset.ts===
x
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toBeUndefined()
  })

  it('returns color_scheme as null-sentinel when block is present but JSON is malformed', () => {
    const response = `===RATIONALE===
x
===COLOR_SCHEME===
{ this is not valid json
===FILE:elements/preset.ts===
x
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toEqual({ __parse_error: true, raw: expect.any(String) })
  })
})

describe('color scheme end-to-end (parse + validate)', () => {
  it('flags a coffee-shop palette when parser output + preset agree on warm-muted', () => {
    const response = `===RATIONALE===
third olive palette in a week
===COLOR_SCHEME===
{
  "primary_hue": { "h": 30, "s": 40, "l": 50, "name": "amber" },
  "secondary_accent": null,
  "neutral_family": { "tinted_toward": "warm", "name": "stone" },
  "mood_word": "cozy",
  "color_story": "Third coffee-shop palette in a row."
}
===FILE:elements/preset.ts===
export const elementsPreset = { theme: { tokens: { colors: {
  neutral: { 500: { value: '#8A7F70' } },
  accent: { DEFAULT: { value: '#8C6B44' } }
}}}}
`
    const parsed = parseDelimiterResponse(response)
    expect(parsed.color_scheme).toBeDefined()

    const preset = parsed.files.find((f) => f.path === 'elements/preset.ts').content
    const rut = detectCoffeeShopPalette(parsed.color_scheme, preset)
    expect(rut.ok).toBe(false)
    expect(rut.warnings[0]).toMatch(/coffee-shop/i)
  })

  it('lets a vibrant palette through without warnings', () => {
    const response = `===RATIONALE===
electric day
===COLOR_SCHEME===
{
  "primary_hue": { "h": 345, "s": 85, "l": 55, "name": "magenta" },
  "secondary_accent": { "h": 50, "s": 90, "l": 60, "name": "citrus" },
  "neutral_family": { "tinted_toward": "magenta", "name": "rosewood" },
  "mood_word": "kinetic",
  "color_story": "Magenta demanding attention."
}
===FILE:elements/preset.ts===
export const x = { theme: { tokens: { colors: {
  neutral: { 500: { value: '#6D4D62' } },
  accent: { DEFAULT: { value: '#DF2668' } }
}}}}
`
    const parsed = parseDelimiterResponse(response)
    const preset = parsed.files.find((f) => f.path === 'elements/preset.ts').content
    const rut = detectCoffeeShopPalette(parsed.color_scheme, preset)
    const consistency = validateSchemeAgainstPreset(parsed.color_scheme, preset)
    expect(rut.ok).toBe(true)
    expect(consistency.ok).toBe(true)
  })
})
