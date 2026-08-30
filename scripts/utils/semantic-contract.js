/**
 * The frozen semantic colour contract.
 *
 * The set of semantic colour tokens was renegotiated every night. A hundred and
 * ten archived presets between them define more than two hundred distinct
 * names, and a hundred and forty of those appear exactly once: `bgSpine`,
 * `surfaceQuiet`, `textMastheadMuted`, `knockout`, `signalWin`. Only four names
 * — `bg`, `text`, `accent`, `border` — survive in every build, and the two the
 * engineer reaches for most after those, `textSecondary` and `textMuted`, are
 * present about four nights in five.
 *
 * That is why the engineer's TSX kept doing one of two wrong things. Either it
 * named a token that did not exist that night, which Panda passes through as a
 * literal and the browser drops (#252), or it gave up on the semantic layer and
 * reached past it into the raw palette — `sand.300`, `gold.800` throughout
 * 2026-08-30's `Layout.tsx`. A raw scale step resolves, so nothing caught it,
 * and it hard-codes a value the day's design has no way to move.
 *
 * So the set is frozen here. Fifteen names, each with a role. The Art Director
 * maps the day's palette onto all fifteen and may define no others: a design
 * that wants a special masthead ground uses `field`, and a design with no
 * masthead maps `field` onto something else it does have. The engineer may
 * reference these fifteen and nothing else in a colour position.
 *
 * This module is the single source of that list. The validator reads it, and
 * the three prompts that document it are generated from it at assembly time, so
 * `react-engineer.md` can no longer end up listing `bg.side` and `accent.glow`
 * — names no preset has ever defined.
 *
 * @see https://github.com/marchdoe/dougmar.ch/issues/255
 */

import { GLOBAL_KEYWORDS, NAMED_COLORS, isBareIdentifier } from './token-gate.js'

/**
 * The canonical fifteen, in the order the prompts list them.
 *
 * Chosen from what a hundred and ten nightly presets actually reach for, not
 * from a theory of design systems. Three grounds, three inks, three accent
 * roles, two rules, and a four-name field group.
 *
 * The field group is the permanent home for the flooded plane of colour that
 * has been reinvented as `bgHero`, `bandBg`, `bgSignal`, `knockout` and
 * `bgSpine` on sixteen separate nights. It carries its own ink, muted ink and
 * rule rather than only an ink, because a design that floods a plane needs the
 * same three steps on it that it needs on the page ground: 2026-08-30's gold
 * sidebar sets a heading, a label and a hairline on the field, and the twelve
 * historical spellings of that trio (`textOnHeroMuted`, `textInverseMuted`,
 * `textMutedOnDark`, `borderOnDark`) are what a shorter list would send
 * straight back to the palette.
 *
 * @type {ReadonlyArray<{name: string, role: string}>}
 */
export const SEMANTIC_COLORS = Object.freeze([
  { name: 'bg', role: 'The page ground. Everything else is judged against it.' },
  {
    name: 'bgAlt',
    role: 'A second ground, for a band or a section that has to sit apart from bg without reading as a raised surface.',
  },
  {
    name: 'surface',
    role: 'A raised or inset plane: a card, a rail, a panel. Distinct from bg by value, not by shadow.',
  },
  { name: 'text', role: 'The default ink. Must clear 4.5:1 against bg, bgAlt and surface.' },
  {
    name: 'textMuted',
    role: 'The secondary ink, still readable at body size: decks, captions, standfirsts.',
  },
  {
    name: 'textFaint',
    role: 'The quietest ink: micro labels, metadata, timestamps. Never a place to set a sentence.',
  },
  {
    name: 'accent',
    role: 'The one saturated colour the design turns on. Used as a mark or a fill.',
  },
  {
    name: 'accentText',
    role: 'The ink that sits on accent. It exists so nobody has to guess whether the accent is light or dark.',
  },
  {
    name: 'accentAlt',
    role: 'The accent in its second register: lighter, darker, or a glow. One step, not a second accent.',
  },
  { name: 'border', role: 'Hairlines, dividers, the default rule.' },
  {
    name: 'borderStrong',
    role: 'The emphatic rule: a section break, a framed edge, a table head.',
  },
  {
    name: 'field',
    role: 'A flooded plane of colour that is neither bg nor surface: a masthead band, a knockout block, a poster ground.',
  },
  { name: 'fieldInk', role: 'The ink that sits on field, for the same reason accentText exists.' },
  {
    name: 'fieldInkMuted',
    role: 'The secondary ink on field: the labels and metadata inside a flooded plane.',
  },
  { name: 'fieldBorder', role: 'The rule inside a flooded plane, where border would disappear.' },
])

/** Just the names, in contract order. @type {ReadonlyArray<string>} */
export const SEMANTIC_COLOR_NAMES = Object.freeze(SEMANTIC_COLORS.map((t) => t.name))

/** Lookup for the checks below. */
const CANONICAL = new Set(SEMANTIC_COLOR_NAMES)

/**
 * The top-level keys defined under `theme.semanticTokens.colors` in a preset.
 *
 * Parsed out of the source rather than imported, because `elements/preset.ts` is
 * TypeScript and these are plain `.js` scripts — the same regex-over-the-source
 * idiom `token-gate.js` and `site-context.js` already use.
 *
 * @param {string} source contents of elements/preset.ts
 * @returns {string[]} declared names, in file order
 */
export function parsePresetSemanticColors(source) {
  const semanticStart = source.indexOf('semanticTokens')
  if (semanticStart < 0) return []
  const section = source.slice(semanticStart)
  const header = /\bcolors\s*:\s*\{/.exec(section)
  if (!header) return []

  const open = section.indexOf('{', header.index)
  let depth = 0
  let end = section.length
  for (let i = open; i < section.length; i++) {
    if (section[i] === '{') depth++
    else if (section[i] === '}') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  const block = section.slice(open + 1, end)

  const names = []
  let nesting = 0
  for (let i = 0; i < block.length; i++) {
    if (block[i] === '{') nesting++
    else if (block[i] === '}') nesting--
    else if (nesting === 0) {
      const m = /^(?:'([^']+)'|"([^"]+)"|([A-Za-z0-9_$-]+))\s*:/.exec(block.slice(i))
      if (m) {
        names.push(m[1] ?? m[2] ?? m[3])
        i += m[0].length - 1
      }
    }
  }
  return names
}

/**
 * Does a preset define the contract, all of it and nothing else?
 *
 * Extras are rejected as firmly as omissions. An extra name is exactly the
 * drift this contract exists to stop: it is a role the engineer cannot rely on
 * tomorrow, and every one that shipped left a component behind referencing a
 * name the next night's preset no longer defines.
 *
 * @param {string} source contents of elements/preset.ts
 * @returns {{ ok: boolean, declared: string[], missing: string[], extra: string[] }}
 */
export function checkPresetContract(source) {
  const declared = parsePresetSemanticColors(source)
  const seen = new Set(declared)
  const missing = SEMANTIC_COLOR_NAMES.filter((n) => !seen.has(n))
  const extra = declared.filter((n) => !CANONICAL.has(n))
  return { ok: missing.length === 0 && extra.length === 0, declared, missing, extra }
}

/**
 * Style props whose value is a colour.
 *
 * Written as Panda authors them — camelCase in `css()` and as JSX props — rather
 * than as the kebab-case CSS the token gate scans for in the emitted
 * stylesheet. `bg` and `bgColor` are Panda shorthands and are how most of the
 * nightly output actually spells `background`.
 */
export const COLOR_PROPS = Object.freeze([
  'color',
  'background',
  'backgroundColor',
  'bg',
  'bgColor',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderXColor',
  'borderYColor',
  'borderInlineColor',
  'borderInlineStartColor',
  'borderInlineEndColor',
  'borderBlockColor',
  'borderBlockStartColor',
  'borderBlockEndColor',
  'outlineColor',
  'textDecorationColor',
  'caretColor',
  'accentColor',
  'columnRuleColor',
  'fill',
  'stroke',
])

/**
 * Colour values in TSX that are neither a canonical semantic name nor plain CSS.
 *
 * What this catches is the reach past the semantic layer into the palette:
 * `color: 'sand.300'` resolves, ships, and pins an ink to one scale step that
 * the day's design cannot move. It catches an off-contract semantic name too
 * (`cardBg`, `textSecondary`), which the token gate only sees once the build has
 * produced a stylesheet.
 *
 * Raw CSS is not this check's business, exactly as it is not the token gate's:
 * a hex, an `rgb()`, a `var()`, a gradient, a CSS named colour and the CSS-wide
 * keywords all pass. `react-engineer.md` asks for tokens over hexes, but a hex
 * paints, and a build should not die over one.
 *
 * @param {string} source TSX contents
 * @returns {Array<{prop: string, value: string}>} one entry per distinct pair
 */
export function findOffContractColorValues(source) {
  const out = []
  const seen = new Set()
  for (const prop of COLOR_PROPS) {
    const re = new RegExp(`\\b${prop}\\s*[:=]\\s*['"\`]([^'"\`]*)['"\`]`, 'g')
    for (const [, raw] of source.matchAll(re)) {
      const value = raw.trim()
      if (!isBareIdentifier(value)) continue
      if (CANONICAL.has(value)) continue
      const lower = value.toLowerCase()
      if (GLOBAL_KEYWORDS.has(lower) || NAMED_COLORS.has(lower)) continue
      const key = `${prop}:${value}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ prop, value })
    }
  }
  return out
}

/**
 * The contract as the engineer and the design-system reference read it.
 *
 * Both prompts carry a `{{SEMANTIC_COLOR_CONTRACT}}` placeholder that the
 * orchestrator fills with this at assembly time, so the documented list cannot
 * drift from the list the validator enforces.
 *
 * @returns {string} markdown
 */
export function formatSemanticContractForPrompt() {
  const lines = [
    `These ${SEMANTIC_COLORS.length} names are the whole colour vocabulary, every night. The Art Director's preset defines all of them and nothing besides, and the build fails either way round, so you can write them without reading the preset first.`,
    '',
  ]
  for (const { name, role } of SEMANTIC_COLORS) {
    lines.push(`- \`${name}\` — ${role}`)
  }
  lines.push(
    '',
    "A name outside this set is a build failure, whether it resolves or not. That includes reaching past the semantic layer into the palette: `sand.300` and `gold.800` are real tokens and they still fail, because they pin an ink to one scale step the day's design cannot move."
  )
  return lines.join('\n')
}

/**
 * The contract as the Art Director reads it: an authoring instruction.
 * @returns {string} markdown
 */
export function formatSemanticContractForArtDirector() {
  const lines = [
    `Define exactly these ${SEMANTIC_COLORS.length} names under \`theme.semanticTokens.colors\`, with \`_light\` variants if the design flips. The set is frozen and the validator checks it both ways: a missing name fails the build, and so does an invented one.`,
    '',
  ]
  for (const { name, role } of SEMANTIC_COLORS) {
    lines.push(`- \`${name}\` — ${role}`)
  }
  lines.push(
    '',
    'Every one of them maps onto your palette. A design with no masthead still declares `field` and `fieldInk`; point them at whatever plane of colour that design does have. A design with one accent still declares `accentAlt`; make it a step of the same hue. The names are roles, not features, and the engineer writes them against the contract rather than against your file.'
  )
  return lines.join('\n')
}
