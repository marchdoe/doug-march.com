import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

/**
 * Hero-source variance mandate — structural clone of shell-mandate.js
 * applied to where today's hero phrase came from (quote, composed,
 * content-lifted, signal-event). Reads the hero-source.json artifact
 * persisted in recent build dirs (see HERO_SOURCE block, Art Director) and
 * soft-forbids quote-sourcing after two consecutive quote-sourced days.
 *
 * Empirical audit (2026-08-23, 122 archived builds): 45% of heroes are
 * quote-derived. This mandate doesn't ban quotes — a quote is a lane, not
 * the default — it just flags when the lane has been run twice in a row.
 *
 * Old archives predate the hero-source.json artifact entirely; those
 * builds are simply skipped, so history degrades gracefully rather than
 * breaking.
 */

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, source: string }>} newest first, entries without a declared source omitted
 */
export function extractRecentHeroSources(archiveDir, lookbackDays) {
  if (!existsSync(archiveDir)) return []
  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch {
    return []
  }

  const sources = []
  for (const dateDir of dateDirs) {
    const datePath = path.join(archiveDir, dateDir)
    let buildDirs
    try {
      buildDirs = readdirSync(datePath)
        .filter((b) => /^build-\d+$/.test(b))
        .sort()
        .reverse()
    } catch {
      continue
    }
    if (buildDirs.length === 0) continue
    const heroSourcePath = path.join(datePath, buildDirs[0], 'hero-source.json')
    if (!existsSync(heroSourcePath)) continue
    try {
      const h = JSON.parse(readFileSync(heroSourcePath, 'utf8'))
      if (h.source) {
        sources.push({ date: dateDir, source: h.source })
      }
    } catch {
      /* ignore malformed */
    }
  }
  return sources
}

/**
 * @param {{ archiveDir: string, lookbackDays?: number }} opts
 * @returns {{ recentHeroSources: object[], softForbidden: string[], rationale: string }}
 */
export function computeHeroSourceMandate({ archiveDir, lookbackDays = 7 }) {
  const recentHeroSources = extractRecentHeroSources(archiveDir, lookbackDays)
  const lastTwo = recentHeroSources.slice(0, 2)
  const softForbidden =
    lastTwo.length === 2 && lastTwo.every((s) => s.source === 'quote') ? ['quote'] : []
  const rationale = recentHeroSources.length
    ? `Last ${recentHeroSources.length} hero sources: ${recentHeroSources.map((s) => `${s.date}: ${s.source}`).join(' | ')}`
    : 'No recent hero-source history available; the source is open.'
  return { recentHeroSources, softForbidden, rationale }
}

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection, or '' when there is
 *   no hero-source history to react to
 */
export function formatHeroSourceMandateForPrompt(mandate) {
  if (!mandate.recentHeroSources.length) return ''
  const lines = [
    `## Hero Source Mandate`,
    ``,
    `Computed from recent builds. The audit that motivated this mandate found 45% of heroes are quote-derived. A quote is a lane, not the default. Treat this as strong guidance, not law.`,
    ``,
    mandate.softForbidden.length
      ? `- **Hero sources used recently (avoid):** ${mandate.softForbidden.join(', ')} — the last two consecutive days were both quote-sourced.`
      : `- **Hero sources:** no back-to-back quote streak to avoid.`,
    ``,
    `- **Rationale:** ${mandate.rationale}`,
    ``,
    `If today's genuinely strongest line is a quote, use it — justify why in your hero rationale. Fit > novelty.`,
  ]
  return lines.join('\n')
}
