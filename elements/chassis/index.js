import { bricolageManrope } from './bricolage-manrope.js'
import { spectralAlbert } from './spectral-albert.js'
import { bigShouldersAtkinson } from './big-shoulders-atkinson.js'
import { antonInterTight } from './anton-inter-tight.js'
import { bebasPlex } from './bebas-plex.js'

/**
 * Curated chassis catalog. Each entry is a hand-vetted typography decision
 * — fonts, weights, italics, type scale. The Art Director picks one per
 * day to carry the chosen hero phrase at the intended scale.
 *
 * v2 scope (2026-04-29): culled to display-grade only. Removed
 * `schibsted-anonymous` and `jetbrains-mono-only` — both ratio 1.250
 * (body-scale), which locked Index/Split days into typography that
 * couldn't carry poster-scale heads. Replaced with `anton-inter-tight`
 * and `bebas-plex`, both ratio 1.500 (display-grade).
 *
 * Result: 4 of 5 chassis are display-or-display-adjacent (1.500–1.618).
 * `spectral-albert` is retained for serif coverage at 1.333.
 *
 * To add a chassis:
 *   1. Verify the font is NOT on impeccable's reflex-reject list.
 *   2. Verify every weight in `weights: [...]` exists on
 *      fonts.google.com/specimen/<family>.
 *   3. Pick a ratio that doesn't crush sm/xs/2xs — see chassis.js
 *      buildFontSizes() for the math (clamped at 0.625rem floor).
 *   4. Tag moods + archetypes so the Art Director can filter sensibly.
 *   5. Append to CHASSIS_CATALOG below.
 *
 * @type {import('./types.js').ChassisEntry[]}
 */
export const CHASSIS_CATALOG = [
  bricolageManrope,
  spectralAlbert,
  bigShouldersAtkinson,
  antonInterTight,
  bebasPlex,
]
