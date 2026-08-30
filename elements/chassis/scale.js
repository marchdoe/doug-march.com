/**
 * Step-table generator for the chassis catalog.
 *
 * A chassis used to carry `scale: { ratio, base }` and the ramp was computed
 * at build time — one ratio, no per-step leading, no tracking, no record of
 * what the numbers actually are. Now each chassis stores an explicit table:
 * every step declares `size`, `lineHeight` and `tracking`, and the file is
 * the artifact a reviewer reads (#253).
 *
 * `scaleSteps(ratio, base, overrides)` keeps authoring cheap. It generates
 * the same sizes the old math produced — chassis ratio above `base`, a fixed
 * minor second below it (#252) — plus defaults for leading and tracking, and
 * the author lays face-specific overrides on top. A condensed caps face wants
 * different hero tracking than a didone; that difference lives in the chassis
 * file, not in a global constant.
 *
 * Defaults, and why:
 * - Leading tightens as size grows: body reads at 1.5, headlines at 1.1,
 *   the hero near 0.95. Big type with body leading floats apart.
 * - Tracking opens below `base` (small type needs air) and closes above it
 *   (display type sets tighter than the font's built-in spacing).
 * - `hero` is a clamp from `2xl` at a 360px viewport to `3xl` at 1440px,
 *   floored so every chassis reaches marquee: the minimum never drops below
 *   4rem (64px, the mockup critic's mobile floor) and the maximum never
 *   drops below 1.5x the minimum. On a 1.5-ratio chassis the floor is inert
 *   and the clamp is identical to the pre-table one; on a 1.333 chassis it
 *   lifts the hero from 50.5px to a real 64px-to-96px range, which is the
 *   undershoot #257 found and left for this change.
 */

/** The ramp, small to large. Order matters: it is the emission order. */
export const RAMP_STEPS = [
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
]

/** Steps above `base`, nearest first. Each is one chassis-ratio step out. */
const UP_STEPS = ['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']

/** Steps below `base`, nearest first, on a fixed minor second (#252). */
const DOWN_STEPS = ['sm', 'xs', '2xs']
const SMALL_RATIO = 1.125

/** The viewport window `fluid()` interpolates across, in rem. */
const FLUID_MIN_VW_REM = 22.5 // 360px
const FLUID_MAX_VW_REM = 90 // 1440px

/** The hero floor: 4rem is the mockup critic's 64px mobile minimum. */
const HERO_MIN_REM = 4
const HERO_SPAN = 1.5

const DEFAULT_LINE_HEIGHTS = {
  '2xs': 1.4,
  xs: 1.4,
  sm: 1.45,
  base: 1.5,
  md: 1.4,
  lg: 1.3,
  xl: 1.2,
  '2xl': 1.1,
  '3xl': 1.05,
  '4xl': 1,
  '5xl': 0.95,
  hero: 0.95,
}

const DEFAULT_TRACKING = {
  '2xs': '0.04em',
  xs: '0.03em',
  sm: '0.01em',
  base: '0',
  md: '0',
  lg: '-0.005em',
  xl: '-0.01em',
  '2xl': '-0.015em',
  '3xl': '-0.02em',
  '4xl': '-0.02em',
  '5xl': '-0.025em',
  hero: '-0.02em',
}

function parseRem(value) {
  const match = /^([\d.]+)rem$/.exec(value)
  if (!match) throw new Error(`expected a rem value, got: ${value}`)
  return parseFloat(match[1])
}

function roundRem(n) {
  return Math.round(n * 1000) / 1000
}

/**
 * A clamp whose middle term is the straight line through (360px, min) and
 * (1440px, max). Bare sums are legal inside clamp(), so no calc() wrapper.
 *
 * Exported so a chassis can declare its own fluid display steps:
 * `hero: { size: fluid('4rem', '6.5rem') }`.
 *
 * @param {string} min rem value at a 360px viewport
 * @param {string} max rem value at a 1440px viewport
 * @returns {string}
 */
export function fluid(min, max) {
  const minRem = parseRem(min)
  const maxRem = parseRem(max)
  const slope = (maxRem - minRem) / (FLUID_MAX_VW_REM - FLUID_MIN_VW_REM)
  const intercept = roundRem(minRem - slope * FLUID_MIN_VW_REM)
  const vw = roundRem(slope * 100)
  return `clamp(${roundRem(minRem)}rem, ${intercept}rem + ${vw}vw, ${roundRem(maxRem)}rem)`
}

/**
 * Generate a full step table from a ratio and a base size, then lay
 * per-step overrides on top.
 *
 * @param {number} ratio modular ratio for the display end (`md` through `5xl`)
 * @param {string} base body size as a rem string, e.g. '1rem'
 * @param {Partial<Record<string, {size?: string, lineHeight?: number, tracking?: string}>>} [overrides]
 *   per-step patches; each step merges field by field over the generated one
 * @returns {Record<string, {size: string, lineHeight: number, tracking: string}>}
 */
export function scaleSteps(ratio, base, overrides = {}) {
  const baseRem = parseRem(base)

  const rems = { base: baseRem }
  DOWN_STEPS.forEach((step, i) => {
    rems[step] = baseRem / SMALL_RATIO ** (i + 1)
  })
  UP_STEPS.forEach((step, i) => {
    rems[step] = baseRem * ratio ** (i + 1)
  })

  const heroMin = Math.max(rems['2xl'], HERO_MIN_REM)
  const heroMax = Math.max(rems['3xl'], heroMin * HERO_SPAN)

  const steps = {}
  for (const step of RAMP_STEPS) {
    const size =
      step === 'hero'
        ? fluid(`${roundRem(heroMin)}rem`, `${roundRem(heroMax)}rem`)
        : `${roundRem(rems[step])}rem`
    steps[step] = {
      size,
      lineHeight: DEFAULT_LINE_HEIGHTS[step],
      tracking: DEFAULT_TRACKING[step],
      ...(overrides[step] || {}),
    }
  }

  for (const step of Object.keys(overrides)) {
    if (!RAMP_STEPS.includes(step)) {
      throw new Error(`scaleSteps override names unknown step "${step}"`)
    }
  }

  return steps
}
