import { readFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

/**
 * Layout-signature variance mandate — structural clone of shell-mandate.js
 * applied to a compact composition fingerprint: column count, dominant
 * axis, symmetry, and hero zone. Reads the layout-signature.json artifact
 * persisted in recent build dirs (see LAYOUT_SIGNATURE block, Art
 * Director) and soft-forbids the last 3 distinct signatures, matched
 * exactly on the full tuple.
 *
 * Empirical audit (2026-08-23, 122 archived builds): archetype rotation
 * exists, but layout composition itself — columns, axis, symmetry, hero
 * placement — has no variance lever at all. This mandate is that lever.
 *
 * Old archives predate the layout-signature.json artifact entirely; those
 * builds are simply skipped, so history degrades gracefully rather than
 * breaking.
 */

/**
 * @param {string} archiveDir
 * @param {number} lookbackDays
 * @returns {Array<{ date: string, columns: string, axis: string, symmetry: string, heroZone: string }>} newest first, entries missing any field omitted
 */
export function extractRecentLayoutSignatures(archiveDir, lookbackDays) {
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

  const signatures = []
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
    const sigPath = path.join(datePath, buildDirs[0], 'layout-signature.json')
    if (!existsSync(sigPath)) continue
    try {
      const s = JSON.parse(readFileSync(sigPath, 'utf8'))
      if (s.columns && s.axis && s.symmetry && s.hero_zone) {
        signatures.push({
          date: dateDir,
          columns: s.columns,
          axis: s.axis,
          symmetry: s.symmetry,
          heroZone: s.hero_zone,
        })
      }
    } catch {
      /* ignore malformed */
    }
  }
  return signatures
}

function tupleKey(s) {
  return `columns=${s.columns}, axis=${s.axis}, symmetry=${s.symmetry}, hero_zone=${s.heroZone}`
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
 * @returns {{ recentLayoutSignatures: object[], softForbidden: string[], rationale: string }}
 */
export function computeLayoutSignatureMandate({ archiveDir, lookbackDays = 7 }) {
  const recentLayoutSignatures = extractRecentLayoutSignatures(archiveDir, lookbackDays)
  const softForbidden = lastDistinct(recentLayoutSignatures.map(tupleKey), 3)
  const rationale = recentLayoutSignatures.length
    ? `Last ${recentLayoutSignatures.length} layout signatures: ${recentLayoutSignatures.map((s) => `${s.date}: ${tupleKey(s)}`).join(' | ')}`
    : 'No recent layout-signature history available; the layout is open.'
  return { recentLayoutSignatures, softForbidden, rationale }
}

/**
 * @param {object} mandate
 * @returns {string} markdown block for prompt injection, or '' when there is
 *   no layout-signature history to react to
 */
export function formatLayoutSignatureMandateForPrompt(mandate) {
  if (!mandate.recentLayoutSignatures.length) return ''
  const lines = [
    `## Layout Signature Mandate`,
    ``,
    `Computed from recent builds. The audit that motivated this mandate found layout composition — columns, axis, symmetry, hero placement — has no variance lever at all, unlike hue or archetype. Treat this as strong guidance, not law.`,
    ``,
    mandate.softForbidden.length
      ? `- **Signatures used recently (avoid exact repeats):**\n${mandate.softForbidden.map((s) => `  - ${s}`).join('\n')}`
      : `- **Layout signatures:** no recent history.`,
    ``,
    `- **Rationale:** ${mandate.rationale}`,
    ``,
    `Prefer a tuple (columns, axis, symmetry, hero zone) NOT in the recent list. If today's brief genuinely calls for a recently-used signature, you may reuse it — justify why in your rationale. Fit > novelty.`,
  ]
  return lines.join('\n')
}
