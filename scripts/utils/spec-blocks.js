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
 * Widened to all eight composition axes (see utils/composition-grammar.js).
 * The ~15 `layout-signature.json` files written under the original four-key
 * shape still parse: the four new keys simply come back null, which the
 * per-axis mandate treats as "no history for this axis" rather than an
 * error.
 *
 * @returns {Record<'columns'|'axis'|'symmetry'|'hero_zone'|'density'|'rhythm'|'shell_posture'|'field_ratio', string|null>}
 */
export function parseLayoutSignatureBlock(text) {
  const kv = parseKeyValues(text)
  const norm = (v) => (v ? v.toLowerCase().trim() : null)
  return {
    columns: norm(kv.columns),
    axis: norm(kv.axis),
    symmetry: norm(kv.symmetry),
    hero_zone: norm(kv.hero_zone),
    density: norm(kv.density),
    rhythm: norm(kv.rhythm),
    shell_posture: norm(kv.shell_posture),
    field_ratio: norm(kv.field_ratio),
  }
}
