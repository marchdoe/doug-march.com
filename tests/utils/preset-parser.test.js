import { describe, it, expect } from 'vitest'
import { parseObjectLiteral, parsePreset } from '../../scripts/utils/preset-parser.js'

describe('parseObjectLiteral', () => {
  it('reads bare, quoted, and numeric keys alike', () => {
    expect(parseObjectLiteral('{ bare: 1, \'quoted\': 2, 50: 3, "double": 4 }')).toEqual({
      bare: 1,
      quoted: 2,
      50: 3,
      double: 4,
    })
  })

  it('tolerates comments, trailing commas, and alignment padding', () => {
    const src = `{
      // the only open corridor is 10-42 degrees
      orange: {
        50:  { value: '#FFF3EE' },   /* lightest */
        100: { value: '#FFE4D6' },
      },
    }`
    expect(parseObjectLiteral(src)).toEqual({
      orange: { 50: { value: '#FFF3EE' }, 100: { value: '#FFE4D6' } },
    })
  })

  it('does not treat // inside a string as a comment', () => {
    expect(parseObjectLiteral("{ url: 'https://fonts.googleapis.com/x' }")).toEqual({
      url: 'https://fonts.googleapis.com/x',
    })
  })

  it('reads arrays, booleans, null, and negative numbers', () => {
    expect(parseObjectLiteral('{ a: [1, -2.5, true, null], b: false }')).toEqual({
      a: [1, -2.5, true, null],
      b: false,
    })
  })

  it('refuses a value it cannot record rather than guessing', () => {
    expect(() => parseObjectLiteral('{ a: someImportedThing }')).toThrow(/unsupported identifier/)
    expect(() => parseObjectLiteral('{ ...base, a: 1 }')).toThrow(/spread/)
    // biome-ignore lint/suspicious/noTemplateCurlyInString: the literal interpolation is the input under test.
    expect(() => parseObjectLiteral('{ a: `${x}px` }')).toThrow(/interpolation/)
  })
})

const PRESET = `import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    'a:hover': { opacity: '0.75' },
  },
  theme: {
    tokens: {
      colors: {
        // Primary
        orange: {
          50:  { value: '#FFF3EE' },
          500: { value: '#F05428' },
        },
      },
      spacing: {
        '1': { value: '4px' },
      },
      fontWeights: {
        bold: { value: '700' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base:   '{colors.night.400}',
            _light: '{colors.taupe.50}',
          },
        },
      },
    },
  },
})
`

describe('parsePreset', () => {
  it('splits ramps from semantic colors and unwraps value wrappers', () => {
    const tokens = parsePreset(PRESET)
    expect(tokens.colors.ramps).toEqual({ orange: { 50: '#FFF3EE', 500: '#F05428' } })
    expect(tokens.colors.semantic).toEqual({
      bg: { base: '{colors.night.400}', _light: '{colors.taupe.50}' },
    })
  })

  it('carries every other token group through', () => {
    const tokens = parsePreset(PRESET)
    expect(tokens.spacing).toEqual({ 1: '4px' })
    expect(tokens.fontWeights).toEqual({ bold: '700' })
  })

  it('ignores globalCss, which is not part of the record', () => {
    expect(parsePreset(PRESET)).not.toHaveProperty('globalCss')
  })

  // 2026-07-18 and 2026-07-24 nested everything under theme.extend.
  it('reads the theme.extend form', () => {
    const tokens = parsePreset(`export const p = definePreset({
  theme: {
    extend: {
      tokens: { colors: { orange: { 500: { value: '#F05428' } } } },
      semanticTokens: { colors: { bg: { value: { _light: '{colors.taupe.50}' } } } },
    },
  },
})`)
    expect(tokens.colors.ramps.orange[500]).toBe('#F05428')
    expect(tokens.colors.semantic.bg._light).toBe('{colors.taupe.50}')
  })

  it('throws when there is no theme block', () => {
    expect(() => parsePreset('export const x = 1')).toThrow(/no theme block/)
  })
})
