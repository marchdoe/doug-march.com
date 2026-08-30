import { lastDistinct, readRecentArtifacts } from './recency.js'

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
 * The walk itself lives in recency.js, shared with the other mandates.
 */

/** How many recent distinct formulas are discouraged. */
const FORBID_WINDOW = 3

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, groundStrategy: string }>} newest first, entries without a declared ground strategy omitted
 */
export function extractRecentGroundStrategies(archiveDir, lookbackDays) {
  return readRecentArtifacts(archiveDir, lookbackDays, ({ date, read }) => {
    const s = read('shell.json')
    return s?.ground_strategy ? { date, groundStrategy: s.ground_strategy } : null
  })
}

/**
 * @param {{ archiveDir: string, lookbackDays?: number }} opts
 * @returns {{ recentGroundStrategies: object[], softForbidden: string[], rationale: string }}
 */
export function computePaletteFormulaMandate({ archiveDir, lookbackDays = 7 }) {
  const recentGroundStrategies = extractRecentGroundStrategies(archiveDir, lookbackDays)
  const softForbidden = lastDistinct(
    recentGroundStrategies.map((s) => s.groundStrategy),
    FORBID_WINDOW
  )
  const rationale = recentGroundStrategies.length
    ? `Last ${recentGroundStrategies.length} declared ground strategies: ${recentGroundStrategies.map((s) => `${s.date}: ${s.groundStrategy}`).join(' | ')}`
    : 'No recent ground-strategy history available; the formula is open.'
  return { recentGroundStrategies, softForbidden, rationale }
}

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection, or '' when there is
 *   no ground-strategy history to react to (e.g. every recent archive
 *   predates this field)
 */
export function formatPaletteFormulaMandateForPrompt(mandate) {
  if (!mandate.recentGroundStrategies.length) return ''
  const lines = [
    `## Palette Formula Mandate`,
    ``,
    `Computed from recent builds. The audit that motivated this mandate found 49% of days land on the same "saturated accent on near-black void" FORMULA regardless of hue — hue rotation alone doesn't prevent sameness. Treat this as strong guidance, not law.`,
    ``,
    mandate.softForbidden.length
      ? `- **Ground strategies used recently (avoid):** ${mandate.softForbidden.join(', ')}`
      : `- **Ground strategies:** no recent history.`,
    ``,
    `- **Rationale:** ${mandate.rationale}`,
    ``,
    `Prefer a formula NOT in the recent list (light-ground, dark-void, drench, duotone, split-field). If today's brief genuinely calls for a recently-used formula, you may reuse it — justify why in your rationale. Fit > novelty.`,
  ]
  return lines.join('\n')
}
