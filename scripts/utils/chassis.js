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

import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATE_PATH = resolve(__dirname, '../templates/__root.tsx.template')

/** Standard 8-step ramp the rest of the codebase already references. */
const RAMP_STEPS = ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl']

/** Modular-scale offset from base for each ramp step. */
const RAMP_OFFSETS = { '2xs': -3, xs: -2, sm: -1, base: 0, md: 1, lg: 2, xl: 3, '2xl': 4 }

/**
 * Floor the ramp at 10px so aggressive ratios (1.5+) don't render captions
 * at unreadable sizes. Curators see this clamp in the preview output and
 * can pick a tighter ratio if all three small steps collapse to the same value.
 */
const MIN_REM = 0.625

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
  const families = Object.values(chassis.fonts).map(font => {
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
 * Build the theme.tokens.fontSizes object using the chassis's modular scale.
 *
 *   2xs..base..2xl spans 8 steps; ratio raised/lowered by step offset from base.
 *   Output values are rem strings rounded to 0.001rem. Floor of 0.625rem
 *   prevents tiny/illegible captions from aggressive ratios.
 */
export function buildFontSizes(chassis) {
  const baseRem = parseRem(chassis.scale.base)
  const ratio = chassis.scale.ratio
  const sizes = {}
  for (const step of RAMP_STEPS) {
    const offset = RAMP_OFFSETS[step]
    const computed = baseRem * Math.pow(ratio, offset)
    const clamped = Math.max(MIN_REM, computed)
    sizes[step] = { value: `${roundRem(clamped)}rem` }
  }
  return sizes
}

/**
 * Read the frozen __root.tsx template and substitute the Google Fonts URL.
 * The template lives at scripts/templates/__root.tsx.template and contains
 * exactly one placeholder: {{GOOGLE_FONTS_URL}}.
 *
 * Read fresh on every call so a developer editing the template during a
 * dev loop sees changes without a node restart. Cost is negligible.
 */
export function renderRootTemplate(googleFontsUrl) {
  const template = readFileSync(TEMPLATE_PATH, 'utf8')
  if (!template.includes('{{GOOGLE_FONTS_URL}}')) {
    throw new Error('__root.tsx.template missing {{GOOGLE_FONTS_URL}} placeholder')
  }
  return template.replace('{{GOOGLE_FONTS_URL}}', googleFontsUrl)
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
  theme: {
    tokens: {
${formatTokenBlock('fonts', fonts, 6)}
${formatTokenBlock('fontSizes', sizes, 6)}
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
  return catalog.find(c => c.id === id)
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
