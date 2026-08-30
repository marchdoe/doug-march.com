/**
 * The type system is the one part of the design system no agent authors. If
 * it stops covering the sizes a page actually needs, the engineer reaches for
 * a name that isn't there and Panda ships `font-size:7xl` without complaint —
 * which is how a 64px mobile hero rendered at the browser's default 32px
 * (#252). Since #253 the chassis carries the whole system: an explicit step
 * table (size, leading, tracking per step), a weights map, and a spacing
 * rhythm, all emitted from renderChassisPresetFile.
 */
import { describe, it, expect } from 'vitest'
import { CHASSIS_CATALOG } from '../../elements/chassis/index.js'
import { scaleSteps, fluid, RAMP_STEPS } from '../../elements/chassis/scale.js'
import {
  buildGoogleFontsUrl,
  buildFontSizes,
  buildTextStyles,
  buildFontWeights,
  buildLineHeights,
  buildLetterSpacings,
  buildSpacing,
  rhythmPx,
  stepPxAt,
  renderChassisPresetFile,
} from '../../scripts/utils/chassis.js'

/** A plain 1.5-ratio chassis the worked-out numbers below refer to. */
const TEST_CHASSIS = {
  id: 'test-1-5',
  fonts: {
    display: {
      family: 'Unbounded',
      fallbacks: ['Arial', 'sans-serif'],
      weights: [400, 900],
      italics: false,
    },
    body: {
      family: 'Figtree',
      fallbacks: ['system-ui', 'sans-serif'],
      weights: [400, 700],
      italics: false,
    },
  },
  type: {
    steps: scaleSteps(1.5, '1rem'),
    weights: { light: 400, normal: 400, medium: 400, semibold: 700, bold: 900 },
  },
}

const px = (value) => Math.round(parseFloat(value) * 16 * 10) / 10

describe('scaleSteps — the generated table', () => {
  const steps = scaleSteps(1.5, '1rem')

  it('names every step a component can ask for, in ramp order', () => {
    expect(Object.keys(steps)).toEqual([
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

  it('keeps base at the given base size', () => {
    expect(steps.base.size).toBe('1rem')
    expect(scaleSteps(1.5, '1.125rem').base.size).toBe('1.125rem')
  })

  it('runs the ratio up to 5xl and the fixed minor second down to 2xs', () => {
    expect(steps.md.size).toBe('1.5rem')
    expect(steps['2xl'].size).toBe('5.063rem')
    expect(steps['5xl'].size).toBe('17.086rem')
    expect(steps.sm.size).toBe('0.889rem')
    expect(steps.xs.size).toBe('0.79rem')
    expect(steps['2xs'].size).toBe('0.702rem')
  })

  it('tightens leading as size grows and opens tracking below base', () => {
    expect(steps.base.lineHeight).toBe(1.5)
    expect(steps['2xl'].lineHeight).toBeLessThan(steps.md.lineHeight)
    expect(steps.hero.lineHeight).toBeLessThanOrEqual(steps['2xl'].lineHeight)
    expect(steps['2xs'].tracking).toBe('0.04em')
    expect(steps['2xl'].tracking).toBe('-0.015em')
  })

  it('generates the same hero clamp the pre-table ramp shipped at ratio 1.5', () => {
    expect(steps.hero.size).toBe('clamp(5.063rem, 4.219rem + 3.75vw, 7.594rem)')
  })

  it('floors the hero at 64px and spans it to 1.5x on a gentle ratio', () => {
    // At 1.333 the 2xl step is 50.5px, below the mockup critic's 64px mobile
    // floor — the undershoot #257 found and left for this change.
    const gentle = scaleSteps(1.333, '1rem')
    expect(stepPxAt(gentle.hero, 360)).toBe(64)
    expect(stepPxAt(gentle.hero, 1440)).toBe(96)
  })

  it('applies per-step overrides field by field', () => {
    const overridden = scaleSteps(1.5, '1rem', {
      hero: { lineHeight: 0.9 },
      '2xl': { tracking: '0' },
    })
    expect(overridden.hero.lineHeight).toBe(0.9)
    expect(overridden.hero.size).toBe(steps.hero.size)
    expect(overridden['2xl'].tracking).toBe('0')
    expect(overridden['2xl'].lineHeight).toBe(1.1)
  })

  it('rejects an override naming a step that does not exist', () => {
    expect(() => scaleSteps(1.5, '1rem', { '6xl': { lineHeight: 1 } })).toThrow(/unknown step/)
  })
})

describe('fluid', () => {
  it('interpolates between 360px and 1440px viewports', () => {
    const clamp = fluid('4rem', '6rem')
    expect(clamp).toBe('clamp(4rem, 3.333rem + 2.963vw, 6rem)')
    expect(stepPxAt({ size: clamp }, 360)).toBe(64)
    expect(stepPxAt({ size: clamp }, 1440)).toBeCloseTo(96, 0)
  })
})

describe('buildFontSizes', () => {
  it('is a straight read of the step table', () => {
    const sizes = buildFontSizes(TEST_CHASSIS)
    expect(Object.keys(sizes)).toEqual(RAMP_STEPS)
    expect(sizes['2xl'].value).toBe('5.063rem')
    expect(sizes.hero.value).toBe('clamp(5.063rem, 4.219rem + 3.75vw, 7.594rem)')
  })

  it('refuses a table with a missing step rather than shipping a gap', () => {
    const broken = { id: 'broken', type: { steps: { base: { size: '1rem' } } } }
    expect(() => buildFontSizes(broken)).toThrow(/missing "2xs"/)
  })
})

describe('buildTextStyles', () => {
  it('bundles size, leading and tracking per step, sizing via the step token', () => {
    const styles = buildTextStyles(TEST_CHASSIS)
    expect(Object.keys(styles)).toEqual(RAMP_STEPS)
    expect(styles.hero.value).toEqual({
      fontSize: 'hero',
      lineHeight: '0.95',
      letterSpacing: '-0.02em',
    })
    expect(styles.base.value).toEqual({ fontSize: 'base', lineHeight: '1.5', letterSpacing: '0' })
  })
})

describe('derived legacy tokens', () => {
  it('derives lineHeights from the step table', () => {
    expect(buildLineHeights(TEST_CHASSIS)).toEqual({
      tight: { value: '0.95' },
      snug: { value: '1.1' },
      normal: { value: '1.5' },
      loose: { value: '1.7' },
    })
  })

  it('derives letterSpacings from the step table', () => {
    expect(buildLetterSpacings(TEST_CHASSIS)).toEqual({
      tight: { value: '-0.015em' },
      normal: { value: '0' },
      wide: { value: '0.04em' },
      wider: { value: '0.08em' },
      widest: { value: '0.14em' },
    })
  })

  it('emits fontWeights from the chassis weights map', () => {
    expect(buildFontWeights(TEST_CHASSIS).bold).toEqual({ value: '900' })
    expect(() => buildFontWeights({ id: 'x', type: { steps: TEST_CHASSIS.type.steps } })).toThrow(
      /weights/
    )
  })
})

describe('buildSpacing — rhythm-derived', () => {
  it('reproduces the historical nine values at the default 24px rhythm', () => {
    expect(rhythmPx(TEST_CHASSIS)).toBe(24)
    const spacing = buildSpacing(TEST_CHASSIS)
    expect(Object.entries(spacing).map(([k, v]) => [k, v.value])).toEqual([
      ['1', '4px'],
      ['2', '8px'],
      ['3', '16px'],
      ['4', '24px'],
      ['5', '32px'],
      ['6', '48px'],
      ['7', '64px'],
      ['8', '96px'],
      ['9', '128px'],
    ])
  })

  it('follows a declared rhythm', () => {
    const chassis = {
      ...TEST_CHASSIS,
      type: { ...TEST_CHASSIS.type, rhythm: '2rem' },
    }
    expect(rhythmPx(chassis)).toBe(32)
    expect(buildSpacing(chassis)['4'].value).toBe('32px')
  })

  it('follows the body leading when no rhythm is declared', () => {
    const chassis = {
      ...TEST_CHASSIS,
      type: {
        ...TEST_CHASSIS.type,
        steps: scaleSteps(1.5, '1rem', { base: { lineHeight: 1.55 } }),
      },
    }
    expect(rhythmPx(chassis)).toBeCloseTo(24.8, 5)
    expect(buildSpacing(chassis)['4'].value).toBe('25px')
  })
})

describe('buildGoogleFontsUrl — family merging', () => {
  it('merges two tokens naming one family into a single css2 family param', () => {
    const solo = CHASSIS_CATALOG.find((c) => c.id === 'hanken-solo')
    const url = buildGoogleFontsUrl(solo)
    expect(url.match(/family=/g)).toHaveLength(1)
    // Union of display [800] and body [400, 600], italics OR'd on.
    expect(url).toContain('family=Hanken+Grotesk:ital,wght@0,400;0,600;0,800;1,400;1,600;1,800')
  })

  it('keeps distinct families separate', () => {
    const url = buildGoogleFontsUrl(TEST_CHASSIS)
    expect(url).toContain('family=Unbounded:wght@400;900')
    expect(url).toContain('family=Figtree:wght@400;700')
  })
})

describe('the catalog', () => {
  it('holds fifteen chassis with unique ids', () => {
    expect(CHASSIS_CATALOG).toHaveLength(15)
    expect(new Set(CHASSIS_CATALOG.map((c) => c.id)).size).toBe(15)
  })

  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))('%s passes the schema check', (_id, chassis) => {
    expect(chassis.name).toBeTruthy()
    expect(chassis.description).toBeTruthy()
    expect(chassis.moods.length).toBeGreaterThan(0)
    expect(chassis.archetypes.length).toBeGreaterThan(0)
    expect(chassis.fonts.display).toBeDefined()
    expect(chassis.fonts.body).toBeDefined()
    for (const font of Object.values(chassis.fonts)) {
      expect(font.weights.length).toBeGreaterThan(0)
    }
    for (const step of RAMP_STEPS) {
      const s = chassis.type.steps[step]
      expect(s?.size, `${step} size`).toBeTruthy()
      expect(s.lineHeight, `${step} lineHeight`).toBeGreaterThan(0)
      expect(s.tracking, `${step} tracking`).toBeDefined()
    }
  })

  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))(
    '%s has monotonically increasing sizes from 2xs to 5xl',
    (_id, chassis) => {
      const fixed = RAMP_STEPS.filter((s) => s !== 'hero')
      for (let i = 1; i < fixed.length; i++) {
        const prev = stepPxAt(chassis.type.steps[fixed[i - 1]], 1440)
        const next = stepPxAt(chassis.type.steps[fixed[i]], 1440)
        expect(next, `${fixed[i]} > ${fixed[i - 1]}`).toBeGreaterThan(prev)
      }
    }
  )

  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))(
    '%s reaches marquee: hero is 64px+ at 360 and 96px+ at 1440',
    (_id, chassis) => {
      expect(stepPxAt(chassis.type.steps.hero, 360)).toBeGreaterThanOrEqual(64)
      expect(stepPxAt(chassis.type.steps.hero, 1440)).toBeGreaterThanOrEqual(96)
    }
  )

  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))(
    '%s keeps every step below base between 11px and 15px, all distinct',
    (_id, chassis) => {
      const values = ['2xs', 'xs', 'sm'].map((s) => chassis.type.steps[s].size)
      expect(new Set(values).size).toBe(3)
      for (const value of values) {
        expect(px(value)).toBeGreaterThanOrEqual(11)
        expect(px(value)).toBeLessThan(15)
      }
    }
  )

  it.each(CHASSIS_CATALOG.map((c) => [c.id, c]))(
    '%s maps every named weight to a weight some font actually loads',
    (_id, chassis) => {
      const loaded = new Set(Object.values(chassis.fonts).flatMap((f) => f.weights))
      for (const name of ['light', 'normal', 'medium', 'semibold', 'bold']) {
        const weight = chassis.type.weights[name]
        expect(weight, `weights.${name}`).toBeDefined()
        expect(loaded.has(weight), `weights.${name}=${weight} is loaded`).toBe(true)
      }
    }
  )
})

describe('renderChassisPresetFile', () => {
  const source = renderChassisPresetFile(TEST_CHASSIS)

  it('pins the body font and leading so rhythm is real, not aspirational', () => {
    expect(source).toContain("body: { fontFamily: 'body', lineHeight: 'normal' }")
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

  it('emits every group the chassis now owns', () => {
    expect(source).toContain('fontWeights: {')
    expect(source).toContain('lineHeights: {')
    expect(source).toContain('letterSpacings: {')
    expect(source).toContain('spacing: {')
    expect(source).toContain(`'1': { value: "4px" }`)
    expect(source).toContain(`'9': { value: "128px" }`)
    expect(source).toContain(`bold: { value: "900" }`)
  })

  it('emits textStyles as a sibling of tokens under theme.extend', () => {
    expect(source).toContain('textStyles: {')
    expect(source).toContain(
      `hero: { value: { fontSize: "hero", lineHeight: "0.95", letterSpacing: "-0.02em" } }`
    )
    const extendBlock = source.slice(source.indexOf('extend:'))
    expect(extendBlock.indexOf('textStyles:')).toBeGreaterThan(extendBlock.indexOf('tokens:'))
  })
})
