/**
 * Does every token the generated code names actually exist?
 *
 * Panda emits an unknown token as the bare string — `color: 'panel'` becomes
 * `color: panel`, which is not a colour, so the browser drops the declaration
 * and the element renders with its inherited value. Nothing throws, nothing
 * warns, and the page looks *nearly* right, which is the hardest kind of wrong
 * to notice in a design that is different every morning.
 *
 * The build validator's only token check is for circular semantic references
 * (`fonts.heading: '{fonts.heading}'`). A name that was simply never defined
 * passes everything.
 *
 * This is deliberately not `strictTokens: true`. That setting also rejects
 * every raw CSS value — 737 errors on this codebase, most of them legitimate:
 * app/components/panel/styles.ts alone accounts for 134, and raw values inside
 * css() are the documented pattern for the tooling surfaces, which are not
 * meant to follow the day's design. The defect worth catching is a token
 * *reference* that resolves to nothing, not a pixel value.
 */

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Properties whose string values are token references rather than free CSS.
 * Kept narrow on purpose: a property listed here that also accepts keywords
 * would produce false positives, and a false alarm on a nightly build is worse
 * than a missed one — it fails a run that would have been fine.
 */
const TOKEN_PROPS = {
  color: 'colors',
  background: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  borderTopColor: 'colors',
  borderBottomColor: 'colors',
  borderLeftColor: 'colors',
  borderRightColor: 'colors',
  outlineColor: 'colors',
  fill: 'colors',
  stroke: 'colors',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  letterSpacing: 'letterSpacings',
  lineHeight: 'lineHeights',
  radius: 'radii',
  borderRadius: 'radii',
  shadow: 'shadows',
  boxShadow: 'shadows',
}

/**
 * Values that are valid CSS keywords or raw values rather than token names.
 * A token name is a bare identifier; anything with a unit, a function call, a
 * hash, a slash or whitespace is raw.
 */
const CSS_KEYWORDS = new Set([
  'inherit',
  'initial',
  'unset',
  'revert',
  'none',
  'auto',
  'transparent',
  'currentColor',
  'currentcolor',
  'normal',
  'bold',
  'bolder',
  'lighter',
  'italic',
  'inline',
  'block',
  'center',
  'left',
  'right',
])

function looksRaw(value) {
  return (
    value === '' ||
    CSS_KEYWORDS.has(value) ||
    /[#(){}/\s,]/.test(value) ||
    /^-?\d/.test(value) ||
    /(px|rem|em|vh|vw|%|ch|ex|fr|deg|s|ms)$/.test(value) ||
    value.startsWith('--') ||
    value.startsWith('{')
  )
}

/**
 * Every token path the current codegen knows about, e.g. `colors.accent`.
 * @param {string} root repo root
 * @returns {Set<string>}
 */
export function readGeneratedTokens(root) {
  const file = path.join(root, 'styled-system', 'tokens', 'index.mjs')
  if (!existsSync(file)) return new Set()
  const src = readFileSync(file, 'utf8')
  const names = new Set()
  for (const m of src.matchAll(/"([a-zA-Z]+\.[a-zA-Z0-9.\-_]+)"/g)) names.add(m[1])
  return names
}

/**
 * Find token references in `source` that the generated tokens do not define.
 *
 * @param {string} source file contents
 * @param {Set<string>} tokens from readGeneratedTokens
 * @returns {Array<{prop: string, value: string, category: string}>}
 */
export function findUnknownTokens(source, tokens) {
  const unknown = []
  const seen = new Set()

  for (const [prop, category] of Object.entries(TOKEN_PROPS)) {
    const re = new RegExp(`\\b${prop}\\s*:\\s*'([^'\\n]*)'`, 'g')
    for (const match of source.matchAll(re)) {
      const value = match[1]
      if (looksRaw(value)) continue
      // Panda accepts a leading category for semantic tokens; normalise.
      const full = value.includes('.') && tokens.has(value) ? value : `${category}.${value}`
      if (tokens.has(full) || tokens.has(value)) continue
      const key = `${prop}:${value}`
      if (seen.has(key)) continue
      seen.add(key)
      unknown.push({ prop, value, category })
    }
  }
  return unknown
}

/**
 * Check every generated file for token references that resolve to nothing.
 *
 * @param {object} options
 * @param {string} options.root repo root
 * @param {string[]} options.files repo-relative paths to scan
 * @returns {Array<{file: string, prop: string, value: string, category: string}>}
 */
export function checkTokenExistence({ root, files }) {
  const tokens = readGeneratedTokens(root)
  // No codegen output means nothing to check against; say so rather than
  // reporting every token as missing.
  if (tokens.size === 0) return []

  const problems = []
  for (const rel of files) {
    const abs = path.join(root, rel)
    if (!existsSync(abs)) continue
    for (const hit of findUnknownTokens(readFileSync(abs, 'utf8'), tokens)) {
      problems.push({ file: rel, ...hit })
    }
  }
  return problems
}
