import { describe, it, expect } from 'vitest'
import {
  briefSection,
  completeSemanticTokens,
  headerBlock,
  kvBlock,
} from '../../scripts/build-fixtures-from-archive.js'
import {
  SEMANTIC_COLOR_NAMES,
  parsePresetSemanticColors,
} from '../../scripts/utils/semantic-contract.js'

const PRESET = `export const preset = {
  theme: {
    semanticTokens: {
      colors: {
        bg: { value: { base: '{colors.sand.900}', _light: '{colors.sand.50}' } },
        surface: { value: { base: '{colors.sand.800}', _light: '{colors.sand.100}' } },
        field: { value: { base: '{colors.gold.400}', _light: '{colors.gold.400}' } },
        fieldInk: { value: { base: '{colors.sand.900}', _light: '{colors.sand.900}' } },
        text: { value: { base: '{colors.sand.50}', _light: '{colors.sand.900}' } },
        textMuted: { value: { base: '{colors.sand.300}', _light: '{colors.sand.500}' } },
        accent: { value: { base: '{colors.gold.400}', _light: '{colors.gold.500}' } },
        accentText: { value: { base: '{colors.sand.900}', _light: '{colors.sand.900}' } },
        border: { value: { base: '{colors.sand.700}', _light: '{colors.sand.200}' } },
      },
    },
  },
}`

describe('briefSection', () => {
  const brief = '# Title\n\n## Files Changed\n\n- a.ts\n- b.tsx\n- c.tsx\n\n## Next\n\nother'

  it('returns the whole section, not just its first line', () => {
    // `$` under the `m` flag matches the end of every line, so the original
    // lookahead cut every section down to one entry.
    expect(briefSection(brief, 'Files Changed')).toBe('- a.ts\n- b.tsx\n- c.tsx')
  })

  it('reads a section that runs to the end of the document', () => {
    expect(briefSection(brief, 'Next')).toBe('other')
  })

  it('returns empty for a heading that is not there', () => {
    expect(briefSection(brief, 'Nope')).toBe('')
  })
})

describe('completeSemanticTokens', () => {
  it('adds every frozen name the preset predates, and no others', () => {
    const before = parsePresetSemanticColors(PRESET)
    const after = parsePresetSemanticColors(completeSemanticTokens(PRESET))
    expect(before).toHaveLength(9)
    expect(new Set(after)).toEqual(new Set(SEMANTIC_COLOR_NAMES))
  })

  it('borrows values whole, including the nested token references', () => {
    // A `{[^}]*}` match stops at the first inner brace of `{colors.sand.800}`
    // and emits an unterminated string literal, which fails codegen.
    const out = completeSemanticTokens(PRESET)
    expect(out).toContain(
      "bgAlt: {\n          value: { base: '{colors.sand.800}', _light: '{colors.sand.100}' },"
    )
    expect(out.match(/'/g).length % 2).toBe(0)
  })

  it('marks each addition as synthesized and names its donor', () => {
    expect(completeSemanticTokens(PRESET)).toContain('// synthesized from textMuted')
  })

  it('leaves a complete preset untouched', () => {
    const complete = completeSemanticTokens(PRESET)
    expect(completeSemanticTokens(complete)).toBe(complete)
  })
})

describe('headerBlock', () => {
  it('uses the declared header when the build has one', () => {
    expect(headerBlock({ placement: 'top-bar', mark_px: 40 }, {}, {})).toBe(
      'placement: top-bar\nmark_px: 40'
    )
  })

  it('synthesizes one for builds that predate the declaration, and says so', () => {
    const block = headerBlock(null, { nav: 'three links' }, { shell_posture: 'marginal' })
    expect(block).toContain('# synthesized')
    // Placement has to agree with shell_posture or isValidHeader rejects it.
    expect(block).toContain('placement: right-margin')
    expect(block).toContain('nav: three links')
  })

  it('falls back to top-bar for any other posture', () => {
    expect(headerBlock(null, {}, { shell_posture: 'anchored' })).toContain('placement: top-bar')
  })
})

describe('kvBlock', () => {
  it('drops null and undefined rather than writing them as values', () => {
    expect(kvBlock({ a: 1, b: null, c: undefined, d: 'x' })).toBe('a: 1\nd: x')
  })
})
