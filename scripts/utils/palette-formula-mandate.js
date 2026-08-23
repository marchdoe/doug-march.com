import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

/**
 * Palette-formula variance mandate — structural clone of shell-mandate.js
 * applied to the "ground strategy" a palette commits to (light-ground,
 * dark-void, drench, duotone, split-field). Reads the ground_strategy field
 * persisted in shell.json in recent build dirs (see SHELL block, Art
 * Director) and marks recently-used formulas as soft-forbidden.
 *
 * Empirical audit (2026-08-23, 122 archived builds): hue rotation works
 * (only 4/92 near-repeats), but 49% of days land on the same "saturated
 * accent on near-black void" FORMULA regardless of hue. This mandate
 * targets the formula, not the hue — guidance, never law.
 *
 * Old archives predate the ground_strategy field entirely; those builds
 * are simply skipped (ground_strategy: null), so history degrades
 * gracefully rather than breaking.
 */

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, groundStrategy: string }>} newest first, entries without a declared ground strategy omitted
 */
export function extractRecentGroundStrategies(archiveDir, lookbackDays) {
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

  const strategies = []
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
    const shellPath = path.join(datePath, buildDirs[0], 'shell.json')
    if (!existsSync(shellPath)) continue
    try {
      const s = JSON.parse(readFileSync(shellPath, 'utf8'))
      if (s.ground_strategy) {
        strategies.push({ date: dateDir, groundStrategy: s.ground_strategy })
      }
    } catch {
      /* ignore malformed */
    }
  }
  return strategies
}

function lastDistinct(values, n) {
  const out = []
  for (const v of values) {
    if (v && !out.includes(v)) out.push(v)
    if (out.length === n) break
  }
  return out
}

/**
 * @param {{ archiveDir: string, lookbackDays?: number }} opts
 * @returns {{ recentGroundStrategies: object[], softForbidden: string[], rationale: string }}
 */
export function computePaletteFormulaMandate({ archiveDir, lookbackDays = 7 }) {
  const recentGroundStrategies = extractRecentGroundStrategies(archiveDir, lookbackDays)
  const softForbidden = lastDistinct(
    recentGroundStrategies.map((s) => s.groundStrategy),
    3
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
