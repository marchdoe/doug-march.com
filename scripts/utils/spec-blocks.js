/**
 * Parsers for the Art Director's MEASURABLES and SHELL delimiter blocks.
 * Both blocks are simple `key: value` lines; `#` starts a comment.
 * Missing/unparseable fields come back null — validation policy lives in
 * the caller (validateArtDirectorResult), not here.
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
 * @returns {{ nav: string|null, footer: string|null, brand_lockup: string|null, brand_color_mode: string|null }}
 */
export function parseShellBlock(text) {
  const kv = parseKeyValues(text)
  return {
    nav: kv.nav ?? null,
    footer: kv.footer ?? null,
    brand_lockup: kv.brand_lockup ?? null,
    brand_color_mode: kv.brand_color_mode ? kv.brand_color_mode.toLowerCase().trim() : null,
  }
}
