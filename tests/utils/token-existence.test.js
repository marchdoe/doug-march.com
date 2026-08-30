/**
 * Panda emits an unknown token as the bare string, so `color: 'panel'` becomes
 * `color: panel`, the browser drops the declaration, and the element renders
 * with its inherited value. Nothing throws and the page looks nearly right —
 * the hardest kind of wrong to spot in a design that changes every morning.
 */
import { describe, it, expect } from 'vitest'
import { findUnknownTokens, readGeneratedTokens } from '../../scripts/utils/token-existence.js'

const TOKENS = new Set([
  'colors.accent',
  'colors.text',
  'colors.amber.500',
  'fonts.display',
  'fonts.body',
  'fontSizes.lg',
])

const find = (src) => findUnknownTokens(src, TOKENS)

describe('unknown token references', () => {
  it('flags a colour that was never defined', () => {
    // The live case: Sidebar.tsx asks for a `panel` background the preset
    // stopped defining.
    expect(find(`css({ background: 'panel' })`)).toEqual([
      { prop: 'background', value: 'panel', category: 'colors' },
    ])
  })

  it('flags a font family the chassis does not define', () => {
    // The live case: four nightly routes ask for `mono`; the chassis defines
    // display and body only.
    expect(find(`css({ fontFamily: 'mono' })`)[0]).toMatchObject({ value: 'mono' })
  })

  it('accepts a token that exists', () => {
    expect(find(`css({ color: 'accent', fontFamily: 'display' })`)).toEqual([])
  })

  it('accepts a nested token path', () => {
    expect(find(`css({ color: 'amber.500' })`)).toEqual([])
  })

  it('reports each distinct miss once, however often it appears', () => {
    expect(find(`css({ color: 'ghost' }); css({ color: 'ghost' })`)).toHaveLength(1)
  })
})

describe('raw CSS values are not token references', () => {
  // A false alarm is worse than a missed one here: it fails a nightly run that
  // would otherwise have been fine.
  it.each([
    `css({ fontSize: '0.9rem' })`,
    `css({ color: '#b5e61d' })`,
    `css({ color: 'rgb(0 0 0 / 50%)' })`,
    `css({ background: 'var(--colors-bg)' })`,
    `css({ color: 'transparent' })`,
    `css({ color: 'currentColor' })`,
    `css({ color: 'inherit' })`,
    `css({ fontWeight: '600' })`,
    `css({ boxShadow: '0 1px 2px rgba(0,0,0,.2)' })`,
    `css({ fontFamily: 'Inter, system-ui, sans-serif' })`,
  ])('ignores %s', (src) => {
    expect(find(src)).toEqual([])
  })
})

describe('readGeneratedTokens', () => {
  it('reads the real codegen output', () => {
    const tokens = readGeneratedTokens(process.cwd())
    expect(tokens.size).toBeGreaterThan(50)
    expect(tokens.has('colors.accent')).toBe(true)
  })

  it('returns an empty set when codegen has not run, rather than flagging everything', () => {
    expect(readGeneratedTokens('/nonexistent')).toEqual(new Set())
  })
})
