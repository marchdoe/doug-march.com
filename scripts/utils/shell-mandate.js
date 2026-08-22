import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

/**
 * Shell variance mandate — structural clone of color-mandate.js applied to
 * the page shell (nav treatment, footer treatment, brand lockup). Reads the
 * SHELL declarations persisted as shell.json in recent build dirs and marks
 * recently-used treatments as soft-forbidden. Guidance, never law:
 * "Fit > novelty" — deviation is allowed when justified.
 */

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, nav: string|null, footer: string|null, brand_lockup: string|null }>} newest first
 */
export function extractRecentShells(archiveDir, lookbackDays) {
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

  const shells = []
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
      shells.push({
        date: dateDir,
        nav: s.nav ?? null,
        footer: s.footer ?? null,
        brand_lockup: s.brand_lockup ?? null,
      })
    } catch {
      /* ignore malformed */
    }
  }
  return shells
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
 * @returns {{ recentShells: object[], softForbidden: { nav: string[], footer: string[], brand_lockup: string[] }, rationale: string }}
 */
export function computeShellMandate({ archiveDir, lookbackDays = 7 }) {
  const recentShells = extractRecentShells(archiveDir, lookbackDays)
  const softForbidden = {
    nav: lastDistinct(
      recentShells.map((s) => s.nav),
      3
    ),
    footer: lastDistinct(
      recentShells.map((s) => s.footer),
      3
    ),
    brand_lockup: lastDistinct(
      recentShells.map((s) => s.brand_lockup),
      3
    ),
  }
  const rationale = recentShells.length
    ? `Last ${recentShells.length} shells: ${recentShells.map((s) => `${s.date}: nav=${s.nav}, footer=${s.footer}, lockup=${s.brand_lockup}`).join(' | ')}`
    : 'No recent shell history available; the shell is open.'
  return { recentShells, softForbidden, rationale }
}

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection
 */
export function formatShellMandateForPrompt(mandate) {
  const lines = [
    `## Shell Mandate`,
    ``,
    `Computed from recent builds. The page shell (nav placement, footer treatment, brand lockup) must be a DECLARED choice, not a default. Treat this as strong guidance, not law.`,
    ``,
  ]
  const label = {
    nav: 'Nav treatments',
    footer: 'Footer treatments',
    brand_lockup: 'Brand lockups',
  }
  for (const key of ['nav', 'footer', 'brand_lockup']) {
    const used = mandate.softForbidden[key]
    lines.push(
      used.length
        ? `- **${label[key]} used recently (avoid):** ${used.join(', ')}`
        : `- **${label[key]}:** no recent history.`
    )
  }
  lines.push(``)
  lines.push(`- **Rationale:** ${mandate.rationale}`)
  lines.push(``)
  lines.push(
    `If today's brief genuinely calls for a recently-used treatment, you may reuse it — justify why in your rationale. Fit > novelty.`
  )
  return lines.join('\n')
}
