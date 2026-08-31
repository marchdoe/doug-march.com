import { recencyMandate } from './recency-mandate.js'

/**
 * Hero-source variance mandate — applied to where today's hero phrase came
 * from (quote, composed, content-lifted, signal-event). Reads the
 * hero-source.json artifact persisted in recent build dirs (see HERO_SOURCE
 * block, Art Director) and soft-forbids quote-sourcing after two consecutive
 * quote-sourced days.
 *
 * Empirical audit (2026-08-23, 122 archived builds): 45% of heroes are
 * quote-derived. This mandate doesn't ban quotes — a quote is a lane, not
 * the default — it just flags when the lane has been run twice in a row.
 * That streak rule is the one thing here the shared factory could not
 * assume: every other recency mandate discourages the last N distinct
 * values, and this one discourages a repeat.
 *
 * Old archives predate the hero-source.json artifact entirely; those
 * builds are simply skipped, so history degrades gracefully rather than
 * breaking. The read and the prose scaffolding live in recency-mandate.js,
 * shared with palette-formula-mandate (#225).
 */
const mandate = recencyMandate({
  artifact: 'hero-source.json',
  field: 'source',
  valueKey: 'source',
  historyKey: 'recentHeroSources',
  // Not "the last N distinct": two quote-sourced days running is the signal,
  // and a quote three days ago with something else in between is not.
  forbid: (history) => {
    const lastTwo = history.slice(0, 2)
    return lastTwo.length === 2 && lastTwo.every((s) => s.source === 'quote') ? ['quote'] : []
  },
  title: 'Hero Source Mandate',
  intro: `Computed from recent builds. The audit that motivated this mandate found 45% of heroes are quote-derived. A quote is a lane, not the default. Treat this as strong guidance, not law.`,
  rationaleLabel: 'hero sources',
  emptyRationale: 'No recent hero-source history available; the source is open.',
  forbiddenBullet: (forbidden) =>
    `- **Hero sources used recently (avoid):** ${forbidden.join(', ')} — the last two consecutive days were both quote-sourced.`,
  emptyBullet: `- **Hero sources:** no back-to-back quote streak to avoid.`,
  closing: `If today's genuinely strongest line is a quote, use it — justify why in your hero rationale. Fit > novelty.`,
})

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, source: string }>} newest first, entries without a declared source omitted
 */
export const extractRecentHeroSources = mandate.extract

/**
 * @param {{ archiveDir: string, lookbackDays?: number }} opts
 * @returns {{ recentHeroSources: object[], softForbidden: string[], rationale: string }}
 */
export const computeHeroSourceMandate = mandate.compute

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection, or '' when there is
 *   no hero-source history to react to
 */
export const formatHeroSourceMandateForPrompt = mandate.format
