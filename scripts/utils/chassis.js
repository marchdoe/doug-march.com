/**
 * Chassis helpers — deterministic transforms from a chassis entry into the
 * artifacts the orchestrator injects:
 *
 *   buildGoogleFontsUrl(chassis) → CSS2 stylesheet href for __root.tsx
 *   buildFontTokens(chassis)     → theme.tokens.fonts object for preset.ts
 *   buildFontSizes(chassis)      → theme.tokens.fontSizes object for preset.ts
 *   renderRootTemplate(url)      → __root.tsx contents with URL substituted
 *
 * No I/O lives here except renderRootTemplate (which reads the template
 * once at module load). Keep it pure so the preview script and the
 * orchestrator share identical behavior.
 */

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATE_PATH = resolve(__dirname, '../templates/__root.tsx.template')

/** The ramp, small to large. `hero` is fluid; every other step is a rem value. */
const RAMP_STEPS = ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'hero']

/** Steps above `base`, nearest first. Each is one chassis-ratio step further out. */
const UP_STEPS = ['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']

/** Steps below `base`, nearest first. */
const DOWN_STEPS = ['sm', 'xs', '2xs']

/**
 * The small end steps down by a fixed 1.125 instead of the chassis ratio (#252).
 *
 * A display ratio is chosen to separate headlines. Running it downward as well
 * put every caption under 11px — at 1.5 the bottom three steps landed on 10.7,
 * 10 and 10px, all three pinned to a floor. Engineers stopped using them and
 * hand-wrote '13px' instead, which is how eight literal pixel sizes ended up in
 * one night's TSX. A minor second below base keeps captions at 11-14px on every
 * chassis in the catalog, so the tokens can express what the pages need.
 */
const SMALL_RATIO = 1.125

/**
 * `hero` interpolates between two ramp steps across a 360px-1440px viewport
 * window, so headlines scale without anyone hand-writing a clamp.
 *
 * It tops out at `3xl` rather than `5xl`: on the golden-ratio chassis `5xl` is
 * 29rem, and a hero that reached it would render at 464px. `3xl` puts the
 * desktop hero at 121px on the 1.5 chassis, which is where the mockups sit.
 * `4xl` and `5xl` still exist as tokens for anyone who wants them explicitly.
 */
const HERO_MIN_STEP = '2xl'
const HERO_MAX_STEP = '3xl'
const HERO_MIN_VW_REM = 22.5
const HERO_MAX_VW_REM = 90

/**
 * Build the Google Fonts CSS2 URL for the chassis.
 *
 * Format examples:
 *   No italics:   family=Outfit:wght@300;400;500
 *   With italics: family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700
 *
 * Always ends with &display=swap for consistent FOIT/FOUT behavior across
 * chassis. The validator allowlists fonts.googleapis.com only.
 */
export function buildGoogleFontsUrl(chassis) {
  const families = Object.values(chassis.fonts).map((font) => {
    const familyParam = font.family.replace(/\s+/g, '+')
    const weights = [...font.weights].sort((a, b) => a - b)

    if (font.italics) {
      // ital,wght axis: cartesian product, italic-first then weight-first.
      // Order matters — Google Fonts requires axis values ascending.
      const tuples = []
      for (const ital of [0, 1]) {
        for (const w of weights) tuples.push(`${ital},${w}`)
      }
      return `family=${familyParam}:ital,wght@${tuples.join(';')}`
    }

    return `family=${familyParam}:wght@${weights.join(';')}`
  })

  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
}

/**
 * Build the theme.tokens.fonts object for preset.ts. Components reference
 * these by token name (e.g. fontFamily: 'display'), so the keys here are
 * the contract — must match what Layout/Sidebar/etc. expect.
 *
 * Value format: '"Family Name", Fallback1, Fallback2, generic'
 * Multi-word families get double-quoted; single-word fallbacks don't.
 */
export function buildFontTokens(chassis) {
  const tokens = {}
  for (const [key, font] of Object.entries(chassis.fonts)) {
    const stack = [font.family, ...font.fallbacks].map(quoteIfMultiWord).join(', ')
    tokens[key] = { value: stack }
  }
  return tokens
}

/** Quote any font name with internal whitespace ("Times New Roman") but
 * leave bare identifiers (Georgia, system-ui, serif) alone. */
function quoteIfMultiWord(name) {
  return /\s/.test(name) ? `"${name}"` : name
}

/**
 * Build the theme.tokens.fontSizes object for the chassis.
 *
 * Two scales meet at `base`. Above it, seven steps of the chassis ratio carry
 * `md` through `5xl` — that is where the chassis gets its voice. Below it,
 * three steps of a fixed 1.125 carry `sm`, `xs` and `2xs`, so the small end
 * stays readable whatever ratio the display end is running.
 *
 * `hero` sits on top as a clamp. Output values are rem strings rounded to
 * 0.001rem; no floor, because nothing in the catalog now falls near one.
 */
export function buildFontSizes(chassis) {
  const baseRem = parseRem(chassis.scale.base)
  const ratio = chassis.scale.ratio

  const rems = { base: baseRem }
  DOWN_STEPS.forEach((step, i) => {
    rems[step] = baseRem / SMALL_RATIO ** (i + 1)
  })
  UP_STEPS.forEach((step, i) => {
    rems[step] = baseRem * ratio ** (i + 1)
  })

  const sizes = {}
  for (const step of RAMP_STEPS) {
    sizes[step] = { value: step === 'hero' ? buildHeroClamp(rems) : `${roundRem(rems[step])}rem` }
  }
  return sizes
}

/**
 * Render the `hero` step: a clamp whose middle term is the straight line
 * through (360px, HERO_MIN_STEP) and (1440px, HERO_MAX_STEP). Bare sums are
 * legal inside clamp(), so no calc() wrapper is needed.
 */
function buildHeroClamp(rems) {
  const min = roundRem(rems[HERO_MIN_STEP])
  const max = roundRem(rems[HERO_MAX_STEP])
  const slope = (max - min) / (HERO_MAX_VW_REM - HERO_MIN_VW_REM)
  const intercept = roundRem(min - slope * HERO_MIN_VW_REM)
  const vw = roundRem(slope * 100)
  return `clamp(${min}rem, ${intercept}rem + ${vw}vw, ${max}rem)`
}

/**
 * Read the frozen __root.tsx template and substitute its placeholders:
 * {{GOOGLE_FONTS_URL}}, {{OG_META}}, and {{ARCHIVE_COUNT}}.
 *
 * The template lives at scripts/templates/__root.tsx.template. Agents never
 * author it, which is why the archive link lives there (#155).
 *
 * Read fresh on every call so a developer editing the template during a
 * dev loop sees changes without a node restart. Cost is negligible.
 */
export function renderRootTemplate(googleFontsUrl, ogMeta = '', archiveCount = 0) {
  const template = readFileSync(TEMPLATE_PATH, 'utf8')
  if (!template.includes('{{GOOGLE_FONTS_URL}}')) {
    throw new Error('__root.tsx.template missing {{GOOGLE_FONTS_URL}} placeholder')
  }
  if (!template.includes('{{OG_META}}')) {
    throw new Error('__root.tsx.template missing {{OG_META}} placeholder')
  }
  if (!template.includes('{{ARCHIVE_COUNT}}')) {
    throw new Error('__root.tsx.template missing {{ARCHIVE_COUNT}} placeholder')
  }
  return template
    .replace('{{GOOGLE_FONTS_URL}}', googleFontsUrl)
    .replace('{{OG_META}}', ogMeta)
    .replace('{{ARCHIVE_COUNT}}', String(archiveCount))
}

function parseRem(value) {
  const match = /^([\d.]+)rem$/.exec(value)
  if (!match) throw new Error(`chassis.scale.base must be a rem value, got: ${value}`)
  return parseFloat(match[1])
}

function roundRem(n) {
  return Math.round(n * 1000) / 1000
}

/**
 * Render the contents of `elements/chassis-preset.ts` for a chosen chassis.
 * The orchestrator writes this file each run so PandaCSS can merge fonts +
 * fontSizes from the chassis into the final design system.
 *
 * Listed LAST in panda.config.ts so it always overrides any fonts/fontSizes
 * the Token Designer accidentally emits in elements/preset.ts.
 *
 * It also pins `body { font-family: var(--fonts-body) }`. That declaration used
 * to be the Art Director's to write and 9 of the last 12 presets left it out,
 * so every element the engineer did not tag by hand rendered in Times with the
 * chassis body face loaded and unused (#252).
 *
 * The declaration goes under `globalCss.extend`, not `globalCss`. Panda merges
 * plain preset globalCss shallowly per selector and the last preset wins the
 * whole selector, so a bare `globalCss.body` here would delete the Art
 * Director's background, colour and margin along with it. Under `extend` the
 * two objects deep-merge and only `fontFamily` is taken.
 */
export function renderChassisPresetFile(chassis) {
  const fonts = buildFontTokens(chassis)
  const sizes = buildFontSizes(chassis)
  return `import { definePreset } from '@pandacss/dev'

/**
 * Generated from elements/chassis/${chassis.id}.js by scripts/utils/chassis.js.
 * Listed LAST in panda.config.ts so its fonts + fontSizes win over any values
 * the Token Designer emits in elements/preset.ts.
 *
 * Do not edit by hand — overwritten on every daily redesign.
 */
export const chassisPreset = definePreset({
  name: 'chassis',
  // Orchestrator-owned. \`extend\` deep-merges into the Art Director's
  // globalCss.body instead of replacing it. See scripts/utils/chassis.js.
  globalCss: {
    extend: {
      body: { fontFamily: 'body' },
    },
  },
  theme: {
    extend: {
      tokens: {
${formatTokenBlock('fonts', fonts, 8)}
${formatTokenBlock('fontSizes', sizes, 8)}
      },
    },
  },
})
`
}

/** Format a tokens object as TS source with the given indent depth (in spaces). */
function formatTokenBlock(name, tokens, indent) {
  const pad = ' '.repeat(indent)
  const inner = ' '.repeat(indent + 2)
  const lines = Object.entries(tokens).map(([key, { value }]) => {
    const safeKey = /^[a-z][a-z0-9]*$/i.test(key) ? key : `'${key}'`
    return `${inner}${safeKey}: { value: ${JSON.stringify(value)} },`
  })
  return `${pad}${name}: {\n${lines.join('\n')}\n${pad}},`
}

/** Look up a chassis by id. Returns undefined if not found. */
export function getChassisById(catalog, id) {
  return catalog.find((c) => c.id === id)
}

/**
 * Render the chassis catalog as a markdown table for inclusion in the
 * Design Director prompt. Each row shows id, name, description, moods,
 * and archetype affinities — enough for the Director to match a chassis
 * to the day's brief without dumping the entire chassis source.
 */
export function formatChassisCatalogForPrompt(catalog) {
  const lines = [
    '| ID | Name | Feel | Moods | Best for archetypes |',
    '|----|------|------|-------|---------------------|',
  ]
  for (const c of catalog) {
    lines.push(
      `| \`${c.id}\` | ${c.name} | ${c.description} | ${c.moods.join(', ')} | ${c.archetypes.join(', ')} |`
    )
  }
  return lines.join('\n')
}
