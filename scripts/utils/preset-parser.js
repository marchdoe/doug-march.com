/**
 * Parse an archived `preset.ts` into a plain token record.
 *
 * The preset is a hand-authored-looking TypeScript module the pipeline rewrites
 * nightly, so the shape is stable but the formatting is not: comments between
 * ramps, bare numeric keys (`50:`) on some nights and quoted ones (`'50':`) on
 * others, trailing commas, aligned values padded with spaces. Expecting only one
 * of those forms silently drops whole months of history, so this reads the
 * `theme` block with a small literal parser instead of regexes.
 *
 * Only the `theme` object is parsed. `globalCss` above it carries arbitrary CSS
 * selectors and is not part of the record.
 */

const IDENT_START = /[A-Za-z_$]/
const IDENT_PART = /[A-Za-z0-9_$]/

class LiteralParser {
  /** @param {string} src */
  constructor(src) {
    this.src = src
    this.i = 0
  }

  error(msg) {
    const line = this.src.slice(0, this.i).split('\n').length
    return new Error(`${msg} at line ${line}`)
  }

  /** Skip whitespace and both comment styles. Strings are consumed elsewhere. */
  skip() {
    for (;;) {
      const c = this.src[this.i]
      if (c === undefined) return
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
        this.i++
      } else if (c === '/' && this.src[this.i + 1] === '/') {
        const nl = this.src.indexOf('\n', this.i)
        this.i = nl === -1 ? this.src.length : nl + 1
      } else if (c === '/' && this.src[this.i + 1] === '*') {
        const end = this.src.indexOf('*/', this.i + 2)
        this.i = end === -1 ? this.src.length : end + 2
      } else {
        return
      }
    }
  }

  /** @returns {string} */
  readString() {
    const quote = this.src[this.i]
    this.i++
    let out = ''
    for (;;) {
      const c = this.src[this.i]
      if (c === undefined) throw this.error('unterminated string')
      if (c === '\\') {
        const next = this.src[this.i + 1]
        out += next === 'n' ? '\n' : next === 't' ? '\t' : next
        this.i += 2
        continue
      }
      if (c === quote) {
        this.i++
        return out
      }
      // A template literal with an interpolation is not a value we can record.
      if (quote === '`' && c === '$' && this.src[this.i + 1] === '{') {
        throw this.error('template interpolation')
      }
      out += c
      this.i++
    }
  }

  /** @returns {string} */
  readIdent() {
    const start = this.i
    while (this.i < this.src.length && IDENT_PART.test(this.src[this.i])) this.i++
    if (this.i === start)
      throw this.error(`unexpected character ${JSON.stringify(this.src[this.i])}`)
    return this.src.slice(start, this.i)
  }

  /** @returns {number} */
  readNumber() {
    const start = this.i
    if (this.src[this.i] === '-') this.i++
    while (this.i < this.src.length && /[0-9.eE+-]/.test(this.src[this.i])) this.i++
    const n = Number(this.src.slice(start, this.i))
    if (Number.isNaN(n)) throw this.error('bad number')
    return n
  }

  /** @returns {unknown} */
  readValue() {
    this.skip()
    const c = this.src[this.i]
    if (c === undefined) throw this.error('unexpected end of input')
    if (c === '{') return this.readObject()
    if (c === '[') return this.readArray()
    if (c === "'" || c === '"' || c === '`') return this.readString()
    if (c === '-' || (c >= '0' && c <= '9')) return this.readNumber()
    if (IDENT_START.test(c)) {
      const word = this.readIdent()
      if (word === 'true') return true
      if (word === 'false') return false
      if (word === 'null') return null
      if (word === 'undefined') return null
      // A bare reference (an imported constant, a spread source) is not a
      // recordable value. Better to lose the token block than to invent one.
      throw this.error(`unsupported identifier value ${JSON.stringify(word)}`)
    }
    throw this.error(`unexpected character ${JSON.stringify(c)}`)
  }

  /** @returns {unknown[]} */
  readArray() {
    this.i++ // [
    const out = []
    for (;;) {
      this.skip()
      if (this.src[this.i] === ']') {
        this.i++
        return out
      }
      out.push(this.readValue())
      this.skip()
      if (this.src[this.i] === ',') this.i++
    }
  }

  /** @returns {Record<string, unknown>} */
  readObject() {
    this.i++ // {
    /** @type {Record<string, unknown>} */
    const out = {}
    for (;;) {
      this.skip()
      const c = this.src[this.i]
      if (c === undefined) throw this.error('unterminated object')
      if (c === '}') {
        this.i++
        return out
      }
      if (c === ',') {
        this.i++
        continue
      }
      if (c === '.' && this.src.startsWith('...', this.i)) {
        throw this.error('spread in object literal')
      }

      let key
      if (c === "'" || c === '"') key = this.readString()
      else if (c >= '0' && c <= '9') key = String(this.readNumber())
      else if (c === '[') throw this.error('computed key')
      else key = this.readIdent()

      this.skip()
      if (this.src[this.i] !== ':')
        throw this.error(`expected ':' after key ${JSON.stringify(key)}`)
      this.i++
      out[key] = this.readValue()
    }
  }
}

/**
 * Parse a single object literal beginning at `{`.
 * Exported for tests; the preset path uses `parsePreset`.
 * @param {string} src
 * @param {number} [start] index of the opening brace
 * @returns {Record<string, unknown>}
 */
export function parseObjectLiteral(src, start = src.indexOf('{')) {
  if (start === -1) throw new Error('no object literal found')
  const p = new LiteralParser(src)
  p.i = start
  p.skip()
  if (p.src[p.i] !== '{') throw new Error('expected an object literal')
  return p.readObject()
}

/**
 * Collapse PandaCSS `{ value: X }` wrappers so a ramp reads as
 * `{ orange: { 50: '#FFF3EE' } }` rather than nesting a `value` at every stop.
 * @param {unknown} node
 * @returns {unknown}
 */
function unwrapValues(node) {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return node
  const entries = Object.entries(node)
  if (entries.length === 1 && entries[0][0] === 'value') return entries[0][1]
  if ('value' in node && Object.keys(node).every((k) => k === 'value' || k === 'description')) {
    return node.value
  }
  /** @type {Record<string, unknown>} */
  const out = {}
  for (const [k, v] of entries) out[k] = unwrapValues(v)
  return out
}

/**
 * @param {unknown} node
 * @returns {Record<string, any>|null}
 */
function pickObject(node) {
  return node !== null && typeof node === 'object' && !Array.isArray(node)
    ? /** @type {Record<string, any>} */ (node)
    : null
}

/**
 * Parse `preset.ts` source into the record's `tokens` block.
 *
 * Colours are split: `ramps` are the raw scales from `theme.tokens.colors`,
 * `semantic` is `theme.semanticTokens.colors`, whose values are condition maps
 * (`{ base, _light }`) rather than single colours. Every other token group is
 * carried through as it was found — the groups vary by era (`fonts` and
 * `fontSizes` appear on a handful of nights, `radii` on most).
 *
 * @param {string} src
 * @returns {{colors: {ramps: object, semantic: object}} & Record<string, unknown>}
 * @throws if the theme block is absent or holds something unparseable
 */
export function parsePreset(src) {
  const anchor = /(^|[{,\s])theme\s*:\s*\{/.exec(src)
  if (!anchor) throw new Error('no theme block in preset')
  const brace = src.indexOf('{', anchor.index + anchor[0].indexOf('theme'))
  const theme = parseObjectLiteral(src, brace)

  // Two nights (2026-07-18, 2026-07-24) nested everything under `theme.extend`,
  // which is Panda's other legal form. Reading only the bare form loses them.
  const extend = pickObject(theme.extend) ?? {}
  const rawTokens = pickObject(theme.tokens) ?? pickObject(extend.tokens) ?? {}
  const semanticTokens = pickObject(theme.semanticTokens) ?? pickObject(extend.semanticTokens) ?? {}
  const semanticColors = pickObject(semanticTokens.colors) ?? {}

  /** @type {Record<string, unknown>} */
  const out = {
    colors: {
      ramps: unwrapValues(rawTokens.colors ?? {}),
      semantic: unwrapValues(semanticColors),
    },
  }
  for (const [group, value] of Object.entries(rawTokens)) {
    if (group === 'colors') continue
    out[group] = unwrapValues(value)
  }
  return /** @type {any} */ (out)
}
