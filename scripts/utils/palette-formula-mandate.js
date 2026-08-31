import { recencyMandate } from './recency-mandate.js'

/**
 * Palette-formula variance mandate — applied to the "ground strategy" a
 * palette commits to (light-ground, dark-void, drench, duotone,
 * split-field). Reads the ground_strategy field persisted in shell.json in
 * recent build dirs (see SHELL block, Art Director) and marks recently-used
 * formulas as soft-forbidden.
 *
 * Empirical audit (2026-08-23, 122 archived builds): hue rotation works
 * (only 4/92 near-repeats), but 49% of days land on the same "saturated
 * accent on near-black void" FORMULA regardless of hue. This mandate
 * targets the formula, not the hue — guidance, never law.
 *
 * Old archives predate the ground_strategy field entirely; those builds
 * are simply skipped, so history degrades gracefully rather than breaking.
 * The read, the window and the prose scaffolding live in
 * recency-mandate.js, shared with hero-source-mandate (#225).
 */
const mandate = recencyMandate({
  artifact: 'shell.json',
  field: 'ground_strategy',
  valueKey: 'groundStrategy',
  historyKey: 'recentGroundStrategies',
  title: 'Palette Formula Mandate',
  intro: `Computed from recent builds. The audit that motivated this mandate found 49% of days land on the same "saturated accent on near-black void" FORMULA regardless of hue — hue rotation alone doesn't prevent sameness. Treat this as strong guidance, not law.`,
  rationaleLabel: 'declared ground strategies',
  emptyRationale: 'No recent ground-strategy history available; the formula is open.',
  forbiddenBullet: (forbidden) =>
    `- **Ground strategies used recently (avoid):** ${forbidden.join(', ')}`,
  emptyBullet: `- **Ground strategies:** no recent history.`,
  closing: `Prefer a formula NOT in the recent list (light-ground, dark-void, drench, duotone, split-field). If today's brief genuinely calls for a recently-used formula, you may reuse it — justify why in your rationale. Fit > novelty.`,
})

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, groundStrategy: string }>} newest first, entries without a declared ground strategy omitted
 */
export const extractRecentGroundStrategies = mandate.extract

/**
 * @param {{ archiveDir: string, lookbackDays?: number }} opts
 * @returns {{ recentGroundStrategies: object[], softForbidden: string[], rationale: string }}
 */
export const computePaletteFormulaMandate = mandate.compute

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection, or '' when there is
 *   no ground-strategy history to react to (e.g. every recent archive
 *   predates this field)
 */
export const formatPaletteFormulaMandateForPrompt = mandate.format
