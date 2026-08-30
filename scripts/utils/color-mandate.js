import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { extractAccentHex, hexToHsl } from './color-validation.js'
import { HUE_FORBIDDEN_ZONE_RADIUS } from './hue-thresholds.js'
import { readRecentArtifacts } from './recency.js'

/**
 * Read the last N days of archived builds and extract each build's primary
 * hue. Prefers color-scheme.json (Phase 1); falls back to the accent ramp
 * in preset.ts, read with the same literal parser archive-record uses —
 * the regex this used to inline dropped every night whose preset was
 * formatted differently (#225).
 *
 * @param {string} archiveDir - path to `archive/` directory
 * @param {number} lookbackDays
 * @returns {number[]} primary hues (0-360)
 */
export function extractRecentPrimaryHues(archiveDir, lookbackDays) {
  return readRecentArtifacts(archiveDir, lookbackDays, ({ buildDir, read }) => {
    const scheme = read('color-scheme.json')
    if (scheme?.primary_hue?.h != null) return scheme.primary_hue.h

    const presetPath = path.join(buildDir, 'preset.ts')
    if (!existsSync(presetPath)) return null
    try {
      const hex = extractAccentHex(readFileSync(presetPath, 'utf8'))
      return hex ? (hexToHsl(hex)?.h ?? null) : null
    } catch {
      return null
    }
  })
}

/**
 * Mood → hue range. The rules are matched against what the collectors
 * actually write: the weather conditions text, the season, the lunar phase,
 * and the owner's mood override from the dev panel. The previous version
 * read `weather.mood` and `news.tone`, which no collector has ever produced,
 * so in production the target range was always open and these rules fired
 * only in the unit test that fabricated the field (#225).
 *
 * @param {object} signals
 * @returns {{ targetHueRange: [number, number], mood: string }}
 */
export function mapSignalsToTargetHue(signals) {
  // Priority order. Each source is matched on its own, so the owner's
  // override wins over the weather even when the weather would have hit an
  // earlier rule — joining them into one string let "sunny" beat "moody".
  const sources = [
    signals?.mood_override,
    signals?.weather?.conditions,
    signals?.season?.season,
    signals?.lunar?.phase,
  ]
    .filter((v) => typeof v === 'string' && v)
    .map((v) => v.toLowerCase())

  const rules = [
    { match: /cold|winter|snow|ice|frost|sleet|blizzard/, range: [195, 240], label: 'cool blue' },
    { match: /warm spring|coral|blossom|spring/, range: [5, 35], label: 'warm coral' },
    { match: /summer|bright|sunny|clear/, range: [40, 80], label: 'warm sunny' },
    { match: /autumn|fall|burn|rust/, range: [15, 40], label: 'rust/terracotta' },
    {
      match: /energetic|electric|vivid|thunder|storm/,
      range: [280, 340],
      label: 'electric magenta',
    },
    {
      match: /calm|misty|mist|fog|overcast|cloudy|drizzle/,
      range: [140, 180],
      label: 'muted cyan-green',
    },
    { match: /moody|dark|sombre|new moon/, range: [230, 280], label: 'deep indigo/violet' },
    { match: /celebratory|party|upbeat|full moon/, range: [320, 360], label: 'hot pink' },
  ]

  for (const source of sources) {
    for (const rule of rules) {
      if (rule.match.test(source)) {
        return { targetHueRange: rule.range, mood: rule.label }
      }
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
export function computeColorMandate({
  archiveDir,
  signals,
  lookbackDays = 7,
  zoneRadius = HUE_FORBIDDEN_ZONE_RADIUS,
}) {
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
  lines.push(
    `If your chosen primary hue falls outside the target range or inside a forbidden zone, justify why in your color story.`
  )
  return lines.join('\n')
}
