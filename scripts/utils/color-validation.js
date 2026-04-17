/**
 * Pure helpers for validating a Token Designer COLOR_SCHEME block against
 * the emitted preset.ts. All helpers return { ok: boolean, warnings: string[] }.
 * Never fail the build — warnings only.
 */

/**
 * Convert a hex color (#rgb, #rrggbb, with or without #) to HSL.
 * @param {string} hex
 * @returns {{ h: number, s: number, l: number } | null}
 */
export function hexToHsl(hex) {
  if (typeof hex !== 'string') return null
  const clean = hex.replace(/^#/, '')
  let r, g, b
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16)
    g = parseInt(clean[1] + clean[1], 16)
    b = parseInt(clean[2] + clean[2], 16)
  } else if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16)
    g = parseInt(clean.slice(2, 4), 16)
    b = parseInt(clean.slice(4, 6), 16)
  } else {
    return null
  }
  if ([r, g, b].some((v) => Number.isNaN(v))) return null

  const rN = r / 255, gN = g / 255, bN = b / 255
  const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rN: h = ((gN - bN) / d + (gN < bN ? 6 : 0)); break
      case gN: h = ((bN - rN) / d + 2); break
      case bN: h = ((rN - gN) / d + 4); break
    }
    h *= 60
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

/**
 * Shortest angular distance between two hues (0-360°).
 * @param {number} a
 * @param {number} b
 * @returns {number} distance in degrees, 0-180
 */
export function hueDistance(a, b) {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

/**
 * Extract the accent DEFAULT hex from a preset.ts source string.
 * Best-effort regex; returns null if not found.
 * @param {string} presetSrc
 * @returns {string | null}
 */
export function extractAccentHex(presetSrc) {
  const match = presetSrc.match(/accent\s*:\s*\{[^}]*?DEFAULT\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i)
  return match ? match[1] : null
}

/**
 * Warn if the palette matches the "coffee-shop" pattern — warm low-saturation
 * neutrals + warm hue (10-50°) + muted accent. Heuristic only.
 *
 * Threshold: neutral s < 11 catches olive-on-stone (#8A7F70, s=10%) while
 * excluding magenta-tinted neutrals (#8E7085, s=12%).
 *
 * @param {object} scheme
 * @param {string} presetSrc
 * @returns {{ ok: boolean, warnings: string[] }}
 */
export function detectCoffeeShopPalette(scheme, presetSrc) {
  const warnings = []
  if (!scheme || !scheme.primary_hue) return { ok: true, warnings }

  const { h, s } = scheme.primary_hue
  const warmHue = h >= 10 && h <= 50
  const mutedAccent = s < 50

  const neutralMatch = presetSrc.match(/neutral\s*:\s*\{[^}]*?500\s*:\s*\{\s*value:\s*['"](#[0-9a-f]{3,6})['"]/i)
  let neutralLowSat = false
  if (neutralMatch) {
    const hsl = hexToHsl(neutralMatch[1])
    if (hsl && hsl.s < 11) neutralLowSat = true
  }

  if (warmHue && mutedAccent && neutralLowSat) {
    warnings.push(
      `coffee-shop palette detected: warm hue (${h}°) + muted accent (s=${s}) + low-saturation neutral. Consider a more vibrant palette next run.`
    )
  }

  return { ok: warnings.length === 0, warnings }
}

/**
 * Warn if the preset's actual accent hex, converted to HSL, differs from the
 * scheme's stated primary_hue by more than 15° (hue distance).
 *
 * @param {object} scheme
 * @param {string} presetSrc
 * @returns {{ ok: boolean, warnings: string[] }}
 */
export function validateSchemeAgainstPreset(scheme, presetSrc) {
  const warnings = []
  if (!scheme || !scheme.primary_hue) return { ok: true, warnings }

  const accentHex = extractAccentHex(presetSrc)
  if (!accentHex) return { ok: true, warnings }

  const actualHsl = hexToHsl(accentHex)
  if (!actualHsl) return { ok: true, warnings }

  const dist = hueDistance(scheme.primary_hue.h, actualHsl.h)
  if (dist > 15) {
    warnings.push(
      `COLOR_SCHEME stated hue ${scheme.primary_hue.h}° (${scheme.primary_hue.name}) ` +
      `but actual hue from preset accent is ${actualHsl.h}° (distance ${dist}°).`
    )
  }
  return { ok: warnings.length === 0, warnings }
}

/**
 * Warn when the scheme's primary hue falls outside the mandate's target
 * range or inside a forbidden zone.
 *
 * @param {object} scheme - with primary_hue.h
 * @param {{ targetHueRange: [number, number], forbiddenHues: Array<[number, number]> }} mandate
 * @returns {{ ok: boolean, warnings: string[] }}
 */
export function validateSchemeAgainstMandate(scheme, mandate) {
  const warnings = []
  if (!scheme?.primary_hue || !mandate) return { ok: true, warnings }
  const h = scheme.primary_hue.h

  const [lo, hi] = mandate.targetHueRange
  if (!(lo === 0 && hi === 360)) {
    if (h < lo || h > hi) {
      warnings.push(
        `primary hue ${h}° (${scheme.primary_hue.name || 'unnamed'}) is outside target range ${lo}°–${hi}°.`
      )
    }
  }

  for (const [a, b] of mandate.forbiddenHues) {
    if (h >= a && h <= b) {
      warnings.push(
        `primary hue ${h}° is inside forbidden zone ${a}°–${b}° (recent palette repeated).`
      )
      break
    }
  }

  return { ok: warnings.length === 0, warnings }
}
