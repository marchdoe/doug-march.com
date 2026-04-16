import { describe, it, expect } from 'vitest'
import { parseDelimiterResponse } from '../../scripts/design-agents.js'

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
