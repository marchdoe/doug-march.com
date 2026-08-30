/**
 * The type ramp is the one part of the design system no agent authors. If it
 * stops covering the sizes a page actually needs, the engineer reaches for a
 * name that isn't there and Panda ships `font-size:7xl` without complaint —
 * which is how a 64px mobile hero rendered at the browser's default 32px (#252).
 */
import { describe, it, expect } from 'vitest'
import { CHASSIS_CATALOG } from '../../elements/chassis/index.js'
import { buildFontSizes, renderChassisPresetFile } from '../../scripts/utils/chassis.js'

/** The chassis the ramp numbers below are worked out against. */
const RATIO_1_5 = { scale: { base: '1rem', ratio: 1.5 }, fonts: {}, id: 'test-1-5' }

const px = (value) => Math.round(parseFloat(value) * 16 * 10) / 10

describe('buildFontSizes — ramp vocabulary', () => {
  it('names every step a component can ask for', () => {
    expect(Object.keys(buildFontSizes(RATIO_1_5))).toEqual([
      '2xs',
      'xs',
      'sm',
      'base',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      'hero',
    ])
  })

  it('keeps base at the chassis base', () => {
    expect(buildFontSizes(RATIO_1_5).base.value).toBe('1rem')
    expect(
      buildFontSizes({ ...RATIO_1_5, scale: { base: '1.125rem', ratio: 1.5 } }).base.value
    ).toBe('1.125rem')
  })

  it('runs the chassis ratio all the way up to 5xl', () => {
    const sizes = buildFontSizes(RATIO_1_5)
    expect(sizes.md.value).toBe('1.5rem')
    expect(sizes['2xl'].value).toBe('5.063rem')
    expect(sizes['3xl'].value).toBe('7.594rem')
    expect(sizes['4xl'].value).toBe('11.391rem')
    expect(sizes['5xl'].value).toBe('17.086rem')
  })

  it('leaves the chassis ratio out of the small end', () => {
    // A 1.5 display ratio and a 1.333 one used to produce different captions;
    // now both step down by 1.125 and land on the same three readable sizes.
    const steep = buildFontSizes(RATIO_1_5)
    const gentle = buildFontSizes({ ...RATIO_1_5, scale: { base: '1rem', ratio: 1.333 } })
    for (const step of ['sm', 'xs', '2xs']) {
      expect(steep[step].value).toBe(gentle[step].value)
    }
    expect(steep.sm.value).toBe('0.889rem')
    expect(steep.xs.value).toBe('0.79rem')
    expect(steep['2xs'].value).toBe('0.702rem')
  })
})

describe('buildFontSizes — the small end stays readable', () => {
  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))(
    '%s puts every step below base between 11px and 15px',
    (_id, chassis) => {
      const sizes = buildFontSizes(chassis)
      for (const step of ['2xs', 'xs', 'sm']) {
        expect(px(sizes[step].value)).toBeGreaterThanOrEqual(11)
        expect(px(sizes[step].value)).toBeLessThan(15)
      }
    }
  )

  it('gives the three small steps three distinct values', () => {
    // The 10px floor used to collapse 2xs, xs and sm onto one or two values
    // for every chassis at ratio 1.5 or above.
    for (const chassis of CHASSIS_CATALOG) {
      const sizes = buildFontSizes(chassis)
      const values = ['2xs', 'xs', 'sm'].map((s) => sizes[s].value)
      expect(new Set(values).size).toBe(3)
    }
  })
})

describe('buildFontSizes — the hero step', () => {
  it('is a clamp, so no one has to hand-write one', () => {
    expect(buildFontSizes(RATIO_1_5).hero.value).toBe(
      'clamp(5.063rem, 4.219rem + 3.75vw, 7.594rem)'
    )
  })

  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))(
    '%s resolves hero to 2xl at 360px and 3xl at 1440px',
    (_id, chassis) => {
      const sizes = buildFontSizes(chassis)
      const [min, intercept, slope, max] =
        /clamp\(([\d.]+)rem, ([-\d.]+)rem \+ ([\d.]+)vw, ([\d.]+)rem\)/
          .exec(sizes.hero.value)
          .slice(1)
          .map(Number)

      expect(min).toBeCloseTo(parseFloat(sizes['2xl'].value), 2)
      expect(max).toBeCloseTo(parseFloat(sizes['3xl'].value), 2)
      // Middle term in rem at a given viewport width in px.
      const at = (vw) => intercept + (slope / 100) * (vw / 16)
      expect(at(360)).toBeCloseTo(min, 2)
      expect(at(1440)).toBeCloseTo(max, 2)
    }
  )
})

describe('renderChassisPresetFile', () => {
  const source = renderChassisPresetFile({
    id: 'unbounded-figtree',
    scale: { base: '1rem', ratio: 1.5 },
    fonts: {
      display: { family: 'Unbounded', fallbacks: ['Arial', 'sans-serif'], weights: [400] },
      body: { family: 'Figtree', fallbacks: ['system-ui', 'sans-serif'], weights: [400] },
    },
  })

  it('pins the body font so an unstyled element cannot fall back to Times', () => {
    expect(source).toContain("body: { fontFamily: 'body' }")
  })

  it('puts the body rule under globalCss.extend', () => {
    // Panda merges plain preset globalCss shallowly and the last preset wins
    // the whole selector, so a bare globalCss.body here would delete the Art
    // Director's background and colour along with it.
    const globalCss = source.slice(source.indexOf('globalCss'), source.indexOf('theme:'))
    expect(globalCss).toContain('extend:')
    expect(globalCss.indexOf('extend:')).toBeLessThan(globalCss.indexOf('body:'))
  })

  it('emits the full ramp, quoting the keys that need it', () => {
    expect(source).toContain(`'2xs': { value: "0.702rem" }`)
    expect(source).toContain(`'5xl': { value: "17.086rem" }`)
    expect(source).toContain(`hero: { value: "clamp(5.063rem, 4.219rem + 3.75vw, 7.594rem)" }`)
  })
})
