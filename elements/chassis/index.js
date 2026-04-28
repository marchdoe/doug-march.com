import { bricolageManrope } from './bricolage-manrope.js'
import { spectralAlbert } from './spectral-albert.js'
import { bigShouldersAtkinson } from './big-shoulders-atkinson.js'
import { jetbrainsMonoOnly } from './jetbrains-mono-only.js'
import { schibstedAnonymous } from './schibsted-anonymous.js'

/**
 * Curated chassis catalog. Each entry is a hand-vetted typography decision
 * — fonts, weights, italics, type scale. The Director picks one per day.
 *
 * v1 scope: fonts + font scale only. Spacing, colors, and semantic tokens
 * remain in the Token Designer's lane.
 *
 * Catalog audited 2026-04-28 against impeccable's reflex-reject list
 * (see scripts/prompts/impeccable/reference/brand.md "Reflex-reject list").
 * Previous chassis `playfair-outfit` and `space-grotesk-work-sans` were
 * removed — both used fonts on the reject list, forcing the Director to
 * pick reflex-default fonts and producing generic output. The current
 * five chassis use only off-reject-list Google Fonts and cover all eight
 * archetypes (Poster, Broadsheet, Gallery Wall, Scroll, Split, Stack,
 * Specimen, Index).
 *
 * To add a chassis:
 *   1. Verify the font is NOT on impeccable's reflex-reject list.
 *   2. Verify every weight in `weights: [...]` exists on
 *      fonts.google.com/specimen/<family>.
 *   3. Pick a ratio that doesn't crush sm/xs/2xs — see chassis.js
 *      buildFontSizes() for the math (clamped at 0.625rem floor).
 *   4. Tag moods + archetypes so the Director can filter sensibly.
 *   5. Append to CHASSIS_CATALOG below.
 *
 * @type {import('./types.js').ChassisEntry[]}
 */
export const CHASSIS_CATALOG = [
  bricolageManrope,
  spectralAlbert,
  bigShouldersAtkinson,
  jetbrainsMonoOnly,
  schibstedAnonymous,
]
