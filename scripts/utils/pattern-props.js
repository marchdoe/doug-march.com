/**
 * The frozen pattern-prop surface, read from the compiled types.
 *
 * `design-system-reference.md` used to hand-list which props each layout
 * component takes: "Stack/VStack/HStack: gap, align, justify". That line was
 * wrong the night the React Engineer wrote `wrap` on `HStack`, `align` on
 * `VStack`, and `href` on `<Box as="a">` (#432) — HStack and VStack take only
 * `justify` and `gap`; `align` belongs to `Stack` and `Wrap`, not to either of
 * them, and `as` changes which element renders without changing which props
 * it accepts.
 *
 * Panda already generates the truth for this, once per build, in
 * `styled-system/patterns/*.d.ts` and `styled-system/jsx/index.d.ts`. This
 * module reads those files instead of letting a human re-type their contents
 * into a prompt, so the reference the engineer sees cannot drift from what
 * actually compiles the way the hand-written line did.
 *
 * @see https://github.com/marchdoe/dougmar.ch/issues/432
 */

import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

/**
 * `hstack` and `vstack` are the only pattern names where capitalizing every
 * hyphen-separated segment doesn't land on the name Panda actually exports —
 * `styled-system/jsx/hstack.d.ts` declares `HStack`, not `Hstack`. Every other
 * pattern name is already hyphen-separated (`visually-hidden`, `link-overlay`,
 * `grid-item`, `aspect-ratio`) or a single word, so segment-capitalizing it
 * lands on the real export name.
 * @type {Readonly<Record<string, string>>}
 */
const IRREGULAR_COMPONENT_NAMES = Object.freeze({
  hstack: 'HStack',
  vstack: 'VStack',
})

/**
 * @param {string} baseName pattern file base name, e.g. `visually-hidden`
 * @returns {string} the PascalCase name Panda exports for it, e.g. `VisuallyHidden`
 */
function toComponentName(baseName) {
  if (IRREGULAR_COMPONENT_NAMES[baseName]) return IRREGULAR_COMPONENT_NAMES[baseName]
  return baseName
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')
}

/**
 * `styled-system/jsx/index.d.ts` re-exports one file per JSX component
 * (`export * from './hstack';`) plus three non-pattern modules (`factory`,
 * `is-valid-prop`, `create-style-context`) that share the directory but
 * aren't patterns. Returns the pattern base names, in file order, filtered
 * to the ones that also have a `.d.ts` in `patterns/` — that's what makes
 * them layout components rather than plumbing.
 * @param {string} jsxIndexSource contents of styled-system/jsx/index.d.ts
 * @param {Set<string>} patternBaseNames base names with a patterns/*.d.ts
 * @returns {string[]}
 */
function readJsxComponentOrder(jsxIndexSource, patternBaseNames) {
  const order = []
  const re = /export \* from '\.\/([\w-]+)';/g
  let match = re.exec(jsxIndexSource)
  while (match) {
    const baseName = match[1]
    if (patternBaseNames.has(baseName)) order.push(baseName)
    match = re.exec(jsxIndexSource)
  }
  return order
}

/** Matches one member of a TypeScript interface body, e.g. `  gap?: SystemProperties["gap"]`. */
const PROP_LINE_RE = /^\s*(\w+)\??:\s*(.+?)\s*$/
/** Matches a prop type that aliases a CSS property through the style-props table. */
const SYSTEM_PROPERTY_RE = /^SystemProperties\["(\w+)"\]$/

/**
 * Parses the `export interface <Name>Properties { ... }` block out of one
 * pattern `.d.ts`.
 * @param {string} source contents of a styled-system/patterns/*.d.ts file
 * @returns {Array<{ name: string, mapsTo: string | null }>} prop names, in
 *   declaration order, with the CSS property a `SystemProperties["x"]` type
 *   names — or `null` when the prop is typed some other way (a literal
 *   union, `ConditionalValue<number>`, and so on)
 */
export function parsePatternInterface(source) {
  const interfaceMatch = /export interface \w+Properties\s*\{([\s\S]*?)\n\}/.exec(source)
  if (!interfaceMatch) return []
  const props = []
  for (const line of interfaceMatch[1].split('\n')) {
    const propMatch = PROP_LINE_RE.exec(line)
    if (!propMatch) continue
    const [, name, type] = propMatch
    const sysMatch = SYSTEM_PROPERTY_RE.exec(type)
    props.push({ name, mapsTo: sysMatch ? sysMatch[1] : null })
  }
  return props
}

/**
 * Reads every `styled-system/patterns/*.d.ts` under `root` and returns the
 * prop surface for each JSX pattern component, ordered the way
 * `styled-system/jsx/index.d.ts` exposes them.
 *
 * @param {string} root repo root containing a generated `styled-system/` dir
 *   (run `panda codegen` first — it's gitignored)
 * @returns {Array<{ component: string, baseName: string, props: Array<{ name: string, mapsTo: string | null }> }>}
 */
export function readPatternProps(root) {
  const patternsDir = path.join(root, 'styled-system', 'patterns')
  const jsxIndexPath = path.join(root, 'styled-system', 'jsx', 'index.d.ts')

  const patternBaseNames = new Set(
    readdirSync(patternsDir)
      .filter((f) => f.endsWith('.d.ts') && f !== 'index.d.ts')
      .map((f) => f.slice(0, -'.d.ts'.length))
  )
  const jsxIndexSource = readFileSync(jsxIndexPath, 'utf8')
  const order = readJsxComponentOrder(jsxIndexSource, patternBaseNames)

  return order.map((baseName) => {
    const source = readFileSync(path.join(patternsDir, `${baseName}.d.ts`), 'utf8')
    return {
      component: toComponentName(baseName),
      baseName,
      props: parsePatternInterface(source),
    }
  })
}

/**
 * Renders the parsed pattern surface as the fixed block engineers read in
 * `design-system-reference.md`, replacing `{{PATTERN_PROPS}}`.
 *
 * @param {Array<{ component: string, props: Array<{ name: string, mapsTo: string | null }> }>} patterns
 * @returns {string} markdown
 */
export function formatPatternPropsForPrompt(patterns) {
  const lines = [
    "This is the exact prop surface Panda compiled tonight, read straight from `styled-system/patterns/*.d.ts`. A component takes only what's listed here.",
    '',
  ]
  for (const { component, props } of patterns) {
    if (props.length === 0) {
      lines.push(`- \`${component}\` — no pattern props; use style props directly.`)
      continue
    }
    const propBits = props.map(({ name, mapsTo }) =>
      mapsTo && mapsTo !== name ? `\`${name}\` (→ \`${mapsTo}\`)` : `\`${name}\``
    )
    lines.push(`- \`${component}\` — ${propBits.join(', ')}`)
  }
  lines.push(
    '',
    'Any prop not listed above for that component is not a pattern prop — set it as a style prop on the element (`css()` or a direct style prop), not by guessing it exists.',
    'The `as` prop changes which element renders. It does not change which props that element accepts — `<Box as="a">` still only takes Box\'s props, not `href`.',
    'For navigation, use plain `<a href="/">` tags styled with `css()`, as above.'
  )
  return lines.join('\n')
}
