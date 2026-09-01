/**
 * PandaCSS does not fail on a token it has never heard of — it passes the name
 * through as a literal, so `fontSize: '5xl'` against a ramp that stops at `2xl`
 * ships `font-size:5xl` and the browser drops the declaration. On 2026-08-30
 * that put the home hero at 32px on mobile where the approved mockup called for
 * 64px, and nothing noticed.
 *
 * The bar for this gate is asymmetric. A missed finding costs one bad morning;
 * a false one kills a nightly run that would have been fine. Most of what
 * follows is therefore about what must NOT be flagged.
 */
import { describe, it, expect } from 'vitest'
import {
  CHECKED_PROPERTIES,
  findNumericScaleMisses,
  findUnresolvedCssValues,
  formatFindings,
  isBareIdentifier,
  isUnresolvedTokenValue,
  parseAtomicSelector,
  parseDeclarations,
  mergeTokenScaleKeys,
  parseTokenScaleKeys,
  stripComments,
} from '../../scripts/utils/token-gate.js'

describe('the properties the gate checks', () => {
  it('covers colour, type, space, size and radius', () => {
    for (const prop of [
      'color',
      'background',
      'background-color',
      'border-color',
      'fill',
      'font-size',
      'font-family',
      'letter-spacing',
      'padding-top',
      'margin',
      'gap',
      'width',
      'height',
      'border-radius',
    ]) {
      expect(CHECKED_PROPERTIES.has(prop)).toBe(true)
    }
  })

  it('leaves properties whose values are open-ended identifiers alone', () => {
    // `display: grid`, `position: sticky`, `text-rendering: optimizelegibility`
    // and `animation-name: whatever` are all bare identifiers that mean
    // something. There is no way to tell a typo from a keyword here.
    for (const prop of [
      'display',
      'position',
      'text-rendering',
      'animation-name',
      'grid-area',
      'text-transform',
      'font-weight',
      'line-height',
      'z-index',
      'opacity',
      'flex',
      'order',
      'overflow',
      'align-items',
      'cursor',
    ]) {
      expect(CHECKED_PROPERTIES.has(prop)).toBe(false)
    }
  })
})

describe('unresolved token names', () => {
  it.each([
    ['font-size', '5xl'],
    ['font-size', '7xl'],
    ['color', 'textSecondary'],
    ['color', 'accentGlow'],
    ['border-color', 'border.accent'],
    ['background', 'cardBg'],
    ['color', 'pine.4'],
    ['font-family', 'heading'],
    ['padding-top', 'px'],
    ['letter-spacing', 'wideish'],
    ['border-radius', 'pill'],
  ])('flags %s: %s', (prop, value) => {
    expect(isUnresolvedTokenValue(prop, value)).toBe(true)
  })

  it('ignores the same name on a property it does not check', () => {
    expect(isUnresolvedTokenValue('grid-template-areas', 'cardBg')).toBe(false)
  })

  it('sees through !important', () => {
    expect(isUnresolvedTokenValue('color', 'accentGlow !important')).toBe(true)
  })
})

describe('valid CSS is never a finding', () => {
  it.each([
    ['color', 'inherit'],
    ['color', 'transparent'],
    ['color', 'currentColor'],
    ['color', 'currentcolor'],
    ['background', 'none'],
    ['width', 'auto'],
    ['letter-spacing', 'normal'],
    ['color', 'initial'],
    ['color', 'unset'],
    ['color', 'revert'],
    ['color', 'revert-layer'],
  ])('keyword %s: %s', (prop, value) => {
    expect(isUnresolvedTokenValue(prop, value)).toBe(false)
  })

  it.each([
    ['color', 'rebeccapurple'],
    ['color', 'tomato'],
    ['background-color', 'white'],
    ['fill', 'black'],
    ['border-color', 'gold'],
    ['stroke', 'DarkSlateGray'],
  ])('named colour %s: %s', (prop, value) => {
    expect(isUnresolvedTokenValue(prop, value)).toBe(false)
  })

  it.each([
    ['font-size', 'small'],
    ['font-size', 'xx-large'],
    ['font-size', 'larger'],
    ['font-family', 'sans-serif'],
    ['font-family', 'ui-monospace'],
    ['font-family', 'system-ui'],
    ['width', 'fit-content'],
    ['max-width', 'max-content'],
    ['min-height', 'min-content'],
    ['border-width', 'thin'],
    ['background', 'border-box'],
    ['background', 'no-repeat'],
  ])('property keyword %s: %s', (prop, value) => {
    expect(isUnresolvedTokenValue(prop, value)).toBe(false)
  })

  it.each([
    ['width', '-webkit-fill-available'],
    ['height', '-moz-fit-content'],
  ])('vendor keyword %s: %s', (prop, value) => {
    expect(isUnresolvedTokenValue(prop, value)).toBe(false)
  })

  it.each([
    ['color', 'var(--colors-accent)'],
    ['background', 'var(--colors-bg, #000)'],
    ['font-size', 'clamp(4rem,8.5vw,8.5rem)'],
    ['width', 'calc(100% - 2rem)'],
    ['background', 'url(data:image/svg+xml;base64,AAA)'],
    ['background', 'linear-gradient(90deg, #000, #fff)'],
    ['color', '#b5e61d'],
    ['color', '#fff'],
    ['color', 'rgb(0 0 0 / 50%)'],
    ['color', 'hsl(210deg 40% 20%)'],
    ['color', 'color-mix(in srgb, red, blue)'],
    ['font-family', "'IBM Plex Mono', ui-monospace, monospace"],
    ['font-family', 'Inter, system-ui, sans-serif'],
    ['width', '100%'],
    ['font-size', '0.9rem'],
    ['font-size', '13px'],
    ['letter-spacing', '-0.01em'],
    ['margin', '0'],
    ['padding', '0 auto'],
    ['width', '8.5vw'],
    ['gap', '1px 4px'],
    ['border-radius', '9999px'],
    ['background', 'transparent url(x.png) no-repeat'],
  ])('raw value %s: %s', (prop, value) => {
    expect(isUnresolvedTokenValue(prop, value)).toBe(false)
  })

  it('treats a number with any CSS unit as a measurement, not a name', () => {
    for (const v of ['1px', '2rem', '0.5s', '150ms', '45deg', '1fr', '3ch', '100dvh', '2.5e2px']) {
      expect(isBareIdentifier(v)).toBe(false)
    }
  })

  it('still reads a ramp step that starts with a digit as a name', () => {
    // `5xl` and `2xs` both begin with a number, and `2xs` even ends in `s`.
    // Neither is a measurement.
    expect(isBareIdentifier('5xl')).toBe(true)
    expect(isBareIdentifier('2xs')).toBe(true)
  })
})

describe('reading the emitted stylesheet', () => {
  it('finds rules nested inside at-rules', () => {
    const css =
      '@layer utilities{.fs_5xl{font-size:5xl}@media (min-width:768px){.md\\:fs_7xl{font-size:7xl}}}'
    expect(findUnresolvedCssValues(css).map((f) => f.value)).toEqual(['5xl', '7xl'])
  })

  it('skips custom property declarations', () => {
    const css = ':where(:root){--colors-accent:#F4B90A;--scroll-snap-strictness:proximity}'
    expect(parseDeclarations(css).length).toBe(0)
  })

  it('leaves the globalCss reset alone', () => {
    // Real base-layer output from 2026-08-30. Every value here is legal.
    const css =
      'body{background:var(--colors-bg);color:var(--colors-text);-webkit-font-smoothing:antialiased;' +
      'text-rendering:optimizelegibility;margin:0;padding:0}' +
      'a{color:inherit;text-decoration:none}*{box-sizing:border-box}'
    expect(findUnresolvedCssValues(css)).toEqual([])
  })

  it('reports one finding per property and value, however many breakpoints repeat it', () => {
    const css = '.fs_5xl{font-size:5xl}.sm\\:fs_5xl{font-size:5xl}.lg\\:fs_5xl{font-size:5xl}'
    expect(findUnresolvedCssValues(css)).toHaveLength(1)
  })

  it('recovers the value the engineer wrote, not the one Panda emitted', () => {
    // Panda rewrites `pine.400` to `pine.4` on the way out, so the emitted value
    // will not be found in the TSX. The class name still carries the original.
    const [finding] = findUnresolvedCssValues('.c_pine\\.400{color:pine.4}')
    expect(finding).toMatchObject({ value: 'pine.4', authoredValue: 'pine.400' })
  })
})

describe('parsing an escaped Panda selector', () => {
  it('keeps an escaped colon and drops a pseudo-class', () => {
    expect(parseAtomicSelector('.hover\\:c_accentGlow:hover')).toEqual({
      className: 'hover:c_accentGlow',
      authoredValue: 'accentGlow',
    })
  })

  it('keeps an escaped dot inside a nested token path', () => {
    expect(parseAtomicSelector('.c_text\\.dim')).toEqual({
      className: 'c_text.dim',
      authoredValue: 'text.dim',
    })
  })

  it('handles a pseudo-element', () => {
    expect(parseAtomicSelector('.after\\:bg_accentGlow:after').authoredValue).toBe('accentGlow')
  })

  it('returns null for a selector with no class, such as globalCss', () => {
    expect(parseAtomicSelector('body')).toBe(null)
    expect(parseAtomicSelector('h1,h2,h3')).toBe(null)
  })
})

describe('reading a token scale out of the preset', () => {
  // The Art Director rewrites elements/preset.ts every night, so the scale is
  // parsed rather than hardcoded.
  const preset = `
    export const elementsPreset = definePreset({
      theme: {
        tokens: {
          colors: { gold: { 400: { value: '#F4B90A' } } },
          spacing: {
            1: { value: '4px' },
            2: { value: '8px' },
            9: { value: '128px' },
          },
          fontSizes: { '2xs': { value: '10px' }, base: { value: '1rem' } },
        },
      },
    })`

  it('reads the keys of the scale it was asked for', () => {
    expect([...parseTokenScaleKeys(preset, 'spacing')]).toEqual(['1', '2', '9'])
  })

  it('reads quoted keys', () => {
    expect([...parseTokenScaleKeys(preset, 'fontSizes')]).toEqual(['2xs', 'base'])
  })

  it('does not descend into a nested palette', () => {
    expect([...parseTokenScaleKeys(preset, 'colors')]).toEqual(['gold'])
  })

  it('returns nothing for a scale the preset does not define', () => {
    expect(parseTokenScaleKeys(preset, 'sizes')).toEqual(new Set())
  })
})

describe('the scale spans both presets', () => {
  // panda.config.ts merges [elementsPreset, chassisPreset]. The Art Director
  // writes the first and is told not to emit `spacing`; the orchestrator
  // generates it into the second. Reading only the first is what failed the
  // 2026-09-01 run — see the regression below.
  const artDirectorPreset = `
    export const elementsPreset = definePreset({
      theme: { tokens: { colors: { gold: { 400: { value: '#F4B90A' } } } } },
    })`

  const chassisPreset = `
    export const chassisPreset = definePreset({
      theme: {
        tokens: {
          spacing: {
            '1': { value: '4px' },
            '4': { value: '24px' },
            '9': { value: '128px' },
          },
        },
      },
    })`

  it('unions the keys across the presets that define them', () => {
    expect([...mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'spacing')]).toEqual([
      '1',
      '4',
      '9',
    ])
  })

  it('reads a scale the Art Director preset alone does not carry', () => {
    // The regression, stated plainly: the Art Director's own preset has no
    // spacing block, because it is under orders not to write one.
    expect(parseTokenScaleKeys(artDirectorPreset, 'spacing')).toEqual(new Set())
    expect(mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'spacing').size).toBe(3)
  })

  it('does not flag a legal spacing token that lives in the chassis preset', () => {
    // 49 of these killed 2026-09-01. Every one was correct code.
    const scales = {
      spacing: mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'spacing'),
      sizes: mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'sizes'),
    }
    expect(findNumericScaleMisses(`css({ gap: '4', marginTop: '9' })`, scales)).toEqual([])
  })

  it('still flags the 11px mark when neither preset defines sizes', () => {
    // The union must not disarm the case the gate was built for. `sizes` is
    // empty in both presets today and has to stay checkable while empty.
    const scales = {
      spacing: mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'spacing'),
      sizes: mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'sizes'),
    }
    expect(findNumericScaleMisses(`css({ width: '11' })`, scales)).toEqual([
      { prop: 'width', value: '11', category: 'sizes' },
    ])
  })

  it('still flags a spacing key past the end of the merged scale', () => {
    const scales = {
      spacing: mergeTokenScaleKeys([artDirectorPreset, chassisPreset], 'spacing'),
      sizes: new Set(),
    }
    expect(findNumericScaleMisses(`css({ marginBottom: '12' })`, scales)).toEqual([
      { prop: 'marginBottom', value: '12', category: 'spacing' },
    ])
  })
})

describe('bare numbers where a token key was meant', () => {
  const scales = { spacing: new Set(['1', '2', '3', '4']), sizes: new Set() }

  it('flags the 11px logo', () => {
    // The live case: Sidebar.tsx set the brand mark to `width: '11'`, meaning a
    // spacing token. Panda appended px. The mockup had it at 44px.
    expect(findNumericScaleMisses(`css({ width: '11' })`, scales)).toEqual([
      { prop: 'width', value: '11', category: 'sizes' },
    ])
  })

  it('flags the JSX prop spelling too', () => {
    expect(findNumericScaleMisses(`<Box height="3" />`, scales)).toEqual([
      { prop: 'height', value: '3', category: 'sizes' },
    ])
  })

  it('accepts a spacing key the preset defines', () => {
    expect(findNumericScaleMisses(`css({ marginTop: '3', gap: '1' })`, scales)).toEqual([])
  })

  it('flags a spacing key past the end of the scale', () => {
    expect(findNumericScaleMisses(`css({ marginBottom: '12' })`, scales)).toEqual([
      { prop: 'marginBottom', value: '12', category: 'spacing' },
    ])
  })

  it('always allows zero', () => {
    expect(findNumericScaleMisses(`css({ margin: '0', padding: '0' })`, scales)).toEqual([])
  })

  it('leaves values with a unit alone', () => {
    expect(
      findNumericScaleMisses(`css({ width: '11px', maxWidth: '520px', gap: '0.5rem' })`, scales)
    ).toEqual([])
  })

  it('leaves unitless numbers on properties that take them alone', () => {
    expect(
      findNumericScaleMisses(
        `css({ lineHeight: '1.5', opacity: '0.6', zIndex: '10', flex: '1', fontWeight: '600', order: '2' })`,
        scales
      )
    ).toEqual([])
  })

  it('reports each distinct miss once', () => {
    expect(
      findNumericScaleMisses(`css({ width: '11' }); css({ width: '11' })`, scales)
    ).toHaveLength(1)
  })
})

describe('the message handed to the retry', () => {
  it('names the file, the property, the value and the scale', () => {
    const message = formatFindings([
      {
        kind: 'unresolved',
        property: 'font-size',
        value: '5xl',
        authoredValue: '5xl',
        category: 'fontSizes',
        files: ['app/components/Sidebar.tsx'],
      },
      {
        kind: 'numeric',
        property: 'width',
        value: '11',
        category: 'spacing',
        available: ['1', '2', '3'],
        files: ['app/components/Sidebar.tsx'],
      },
    ])
    expect(message).toContain('app/components/Sidebar.tsx')
    expect(message).toContain("font-size: '5xl'")
    expect(message).toContain('fontSizes.5xl')
    expect(message).toContain("width: '11'")
    expect(message).toContain('1, 2, 3')
  })
})

describe('stripComments', () => {
  it('does not mistake a URL inside a string for a comment', () => {
    const src = `const u = 'https://dougmar.ch/work'\nconst w = { width: '11' }`
    expect(stripComments(src)).toContain("'https://dougmar.ch/work'")
    expect(findNumericScaleMisses(src, { sizes: new Set(), spacing: new Set() })).toEqual([
      { prop: 'width', value: '11', category: 'sizes' },
    ])
  })

  it('does not flag a bare number that only appears in a comment', () => {
    // Sidebar.tsx carries a comment explaining that `width: '11'` once meant a
    // spacing token that does not exist. The gate flagged the comment and
    // reported an 11px mark in a file that renders none — a rule firing on its
    // own documentation.
    const src = `// it kept going wrong: \`width: '11'\` meant a spacing token\nexport const x = 1`
    expect(findNumericScaleMisses(src, { sizes: new Set(), spacing: new Set() })).toEqual([])
  })

  it('blanks block comments without moving line numbers', () => {
    const src = `/* width: '11'\n   height: '9' */\nconst gap = { gap: '3' }`
    const stripped = stripComments(src)
    expect(stripped.split('\n')).toHaveLength(src.split('\n').length)
    expect(findNumericScaleMisses(src, { sizes: new Set(), spacing: new Set() })).toEqual([
      { prop: 'gap', value: '3', category: 'spacing' },
    ])
  })

  it('keeps an escaped quote from ending a string early', () => {
    const src = `const s = 'it\\'s fine // not a comment'\nconst w = { width: '11' }`
    expect(findNumericScaleMisses(src, { sizes: new Set(), spacing: new Set() })).toEqual([
      { prop: 'width', value: '11', category: 'sizes' },
    ])
  })
})
