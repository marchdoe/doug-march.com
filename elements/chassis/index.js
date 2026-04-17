import { playfairOutfit } from './playfair-outfit.js'
import { spaceGroteskWorkSans } from './space-grotesk-work-sans.js'

/**
 * Curated chassis catalog. Each entry is a hand-vetted typography decision
 * — fonts, weights, italics, type scale. The Director picks one per day.
 *
 * v1 scope: fonts + font scale only. Spacing, colors, and semantic tokens
 * remain in the Token Designer's lane.
 *
 * To add a chassis:
 *   1. Verify every weight in `weights: [...]` exists on
 *      fonts.google.com/specimen/<family>.
 *   2. Pick a ratio that doesn't crush sm/xs/2xs — see chassis.js
 *      buildFontSizes() for the math (clamped at 0.625rem floor).
 *   3. Tag moods + archetypes so the Director can filter sensibly.
 *   4. Append to CHASSIS_CATALOG below.
 *
 * @type {import('./types.js').ChassisEntry[]}
 */
export const CHASSIS_CATALOG = [
  playfairOutfit,
  spaceGroteskWorkSans,
]
