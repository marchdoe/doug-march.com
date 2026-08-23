/**
 * Parsers for the Art Director's MEASURABLES, SHELL, and LAYOUT_SIGNATURE
 * delimiter blocks. All are simple `key: value` lines; `#` starts a
 * comment. Missing/unparseable fields come back null — validation policy
 * lives in the caller (validateArtDirectorResult), not here.
 */

function parseKeyValues(text) {
  const out = {}
  for (const rawLine of String(text || '').split('\n')) {
    const line = rawLine.split('#')[0]
    const m = /^\s*([a-z_]+)\s*:\s*(.+?)\s*$/.exec(line)
    if (m) out[m[1]] = m[2]
  }
  return out
}

function toInt(v) {
  const m = /\d+/.exec(String(v ?? ''))
  return m ? parseInt(m[0], 10) : null
}

/**
 * @returns {{ canvas_utilization_min: number|null, hero_scale: string|null, color_coverage_min: number|null }}
 */
export function parseMeasurablesBlock(text) {
  const kv = parseKeyValues(text)
  return {
    canvas_utilization_min: toInt(kv.canvas_utilization_min),
    hero_scale: kv.hero_scale ?? null,
    color_coverage_min: toInt(kv.color_coverage_min),
  }
}

/**
 * @returns {{ nav: string|null, footer: string|null, brand_lockup: string|null, brand_color_mode: string|null, ground_strategy: string|null }}
 */
export function parseShellBlock(text) {
  const kv = parseKeyValues(text)
  return {
    nav: kv.nav ?? null,
    footer: kv.footer ?? null,
    brand_lockup: kv.brand_lockup ?? null,
    brand_color_mode: kv.brand_color_mode ? kv.brand_color_mode.toLowerCase().trim() : null,
    // Palette-formula mandate (2026-08-23): the "ground" a palette commits
    // to — added as a SHELL field rather than a new block since it's a
    // structural declaration like nav/footer, not a poetic color spec.
    // Optional: old archives and pre-mandate responses won't have it.
    ground_strategy: kv.ground_strategy ? kv.ground_strategy.toLowerCase().trim() : null,
  }
}

/**
 * Layout-signature mandate (2026-08-23): a compact, exact-match-comparable
 * fingerprint of today's composition, used to soft-forbid repeating the
 * same structural tuple. All fields optional — missing/unparseable fields
 * come back null so old archives and non-compliant responses degrade
 * gracefully instead of failing the run.
 *
 * @returns {{ columns: string|null, axis: string|null, symmetry: string|null, hero_zone: string|null }}
 */
export function parseLayoutSignatureBlock(text) {
  const kv = parseKeyValues(text)
  return {
    columns: kv.columns ? kv.columns.toLowerCase().trim() : null,
    axis: kv.axis ? kv.axis.toLowerCase().trim() : null,
    symmetry: kv.symmetry ? kv.symmetry.toLowerCase().trim() : null,
    hero_zone: kv.hero_zone ? kv.hero_zone.toLowerCase().trim() : null,
  }
}
