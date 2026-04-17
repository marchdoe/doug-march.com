import { readFileSync, readdirSync, existsSync } from 'fs'
import path from 'path'
import { hexToHsl } from './color-validation.js'

/**
 * Read the last N days of archived builds and extract each build's primary
 * hue. Prefers color-scheme.json (Phase 1); falls back to regex extraction
 * from preset.ts.
 *
 * @param {string} archiveDir - path to `archive/` directory
 * @param {number} lookbackDays
 * @returns {number[]} primary hues (0-360)
 */
export function extractRecentPrimaryHues(archiveDir, lookbackDays) {
  if (!existsSync(archiveDir)) return []

  let dateDirs
  try {
    dateDirs = readdirSync(archiveDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()
      .slice(0, lookbackDays)
  } catch { return [] }

  const hues = []
  for (const dateDir of dateDirs) {
    const datePath = path.join(archiveDir, dateDir)
    let buildDirs
    try {
      buildDirs = readdirSync(datePath)
        .filter((b) => b.startsWith('build-'))
        .sort()
        .reverse()
    } catch { continue }

    if (buildDirs.length === 0) continue
    const latestBuild = path.join(datePath, buildDirs[0])

    const schemePath = path.join(latestBuild, 'color-scheme.json')
    if (existsSync(schemePath)) {
      try {
        const scheme = JSON.parse(readFileSync(schemePath, 'utf8'))
        if (scheme?.primary_hue?.h != null) {
          hues.push(scheme.primary_hue.h)
          continue
        }
      } catch { /* fall through to preset.ts */ }
    }

    const presetPath = path.join(latestBuild, 'preset.ts')
    if (existsSync(presetPath)) {
      try {
        const src = readFileSync(presetPath, 'utf8')
        const match = src.match(/accent\s*:\s*\{[^}]*?DEFAULT\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i)
        if (match) {
          const hsl = hexToHsl(match[1])
          if (hsl) hues.push(hsl.h)
        }
      } catch { /* ignore */ }
    }
  }
  return hues
}

/**
 * Minimal mood → hue range lookup. Extend as needed.
 * @param {object} signals
 * @returns {{ targetHueRange: [number, number], mood: string }}
 */
export function mapSignalsToTargetHue(signals) {
  const mood = String(signals?.weather?.mood || signals?.news?.tone || '').toLowerCase()

  const rules = [
    { match: /cold|winter|snow|ice|frost/, range: [195, 240], label: 'cool blue' },
    { match: /warm spring|coral|blossom/,   range: [5, 35],    label: 'warm coral' },
    { match: /summer|bright|sunny/,          range: [40, 80],   label: 'warm sunny' },
    { match: /autumn|fall|burn|rust/,        range: [15, 40],   label: 'rust/terracotta' },
    { match: /energetic|electric|vivid/,     range: [280, 340], label: 'electric magenta' },
    { match: /calm|misty|overcast/,          range: [140, 180], label: 'muted cyan-green' },
    { match: /moody|dark|sombre/,            range: [230, 280], label: 'deep indigo/violet' },
    { match: /celebratory|party|upbeat/,     range: [320, 360], label: 'hot pink' },
  ]

  for (const rule of rules) {
    if (rule.match.test(mood)) {
      return { targetHueRange: rule.range, mood: rule.label }
    }
  }
  return { targetHueRange: [0, 360], mood: 'open (no strong signal)' }
}

/**
 * Compute forbidden zones as ±zoneRadius° around each recent hue.
 * Merges overlapping zones and handles 360° wraparound.
 *
 * @param {number[]} hues
 * @param {number} zoneRadius
 * @returns {Array<[number, number]>} sorted, non-overlapping zones
 */
export function computeForbiddenZones(hues, zoneRadius) {
  if (!hues || hues.length === 0) return []

  const expanded = []
  for (const h of hues) {
    const low = h - zoneRadius
    const high = h + zoneRadius
    if (low < 0) {
      expanded.push([0, high])
      expanded.push([360 + low, 360])
    } else if (high > 360) {
      expanded.push([low, 360])
      expanded.push([0, high - 360])
    } else {
      expanded.push([low, high])
    }
  }

  expanded.sort((a, b) => a[0] - b[0])
  const merged = []
  for (const zone of expanded) {
    if (merged.length && zone[0] <= merged[merged.length - 1][1]) {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], zone[1])
    } else {
      merged.push([...zone])
    }
  }
  return merged
}

/**
 * Top-level: compute a full mandate object.
 * @param {{ archiveDir: string, signals: object, lookbackDays?: number, zoneRadius?: number }} opts
 * @returns {{ targetHueRange: [number,number], forbiddenHues: Array<[number,number]>, recentPrimaryHues: number[], rationale: string }}
 */
export function computeColorMandate({ archiveDir, signals, lookbackDays = 7, zoneRadius = 30 }) {
  const recentPrimaryHues = extractRecentPrimaryHues(archiveDir, lookbackDays)
  const { targetHueRange, mood } = mapSignalsToTargetHue(signals)
  const forbiddenHues = computeForbiddenZones(recentPrimaryHues, zoneRadius)

  const parts = []
  if (targetHueRange[0] === 0 && targetHueRange[1] === 360) {
    parts.push(`No strong signal-driven target; palette is open.`)
  } else {
    parts.push(`Target hue range ${targetHueRange[0]}-${targetHueRange[1]}° (${mood}).`)
  }
  if (recentPrimaryHues.length > 0) {
    parts.push(`Recent primary hues: ${recentPrimaryHues.join('°, ')}°.`)
  } else {
    parts.push(`No recent build history available.`)
  }

  const rationale = parts.join(' ')

  return { targetHueRange, forbiddenHues, recentPrimaryHues, rationale }
}

/**
 * Render a mandate as a markdown section suitable for inclusion in an
 * agent's user prompt.
 * @param {object} mandate
 * @returns {string}
 */
export function formatMandateForPrompt(mandate) {
  const lines = [
    `## Color Mandate`,
    ``,
    `This mandate is computed from recent builds and today's signals. Treat it as strong guidance, not law.`,
    ``,
    `- **Target hue range:** ${mandate.targetHueRange[0]}°–${mandate.targetHueRange[1]}°`,
  ]
  if (mandate.forbiddenHues.length > 0) {
    const zones = mandate.forbiddenHues.map(([a, b]) => `${a}°–${b}°`).join(', ')
    lines.push(`- **Avoid these hue zones (recent palettes):** ${zones}`)
  } else {
    lines.push(`- **Avoid:** no recent palettes to avoid.`)
  }
  lines.push(`- **Rationale:** ${mandate.rationale}`)
  lines.push(``)
  lines.push(`If your chosen primary hue falls outside the target range or inside a forbidden zone, justify why in your color story.`)
  return lines.join('\n')
}
