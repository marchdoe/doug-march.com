/**
 * Type definitions for the fonts + font-scale chassis catalog.
 * JSDoc-only — there is no runtime export. Authoring chassis files
 * `@type {ChassisEntry}` gets autocompletion + type checking in IDEs
 * without forcing the orchestrator (plain Node) to load a TS runtime.
 */

/**
 * @typedef {Object} FontSpec
 * @property {string} family
 *   Google Fonts family name as it appears on fonts.google.com (e.g. 'Playfair Display').
 * @property {string[]} fallbacks
 *   CSS fallback stack appended after the Google Fonts family.
 *   E.g. ['Georgia', 'Times New Roman', 'serif'].
 * @property {number[]} weights
 *   Weights to load from Google Fonts. Must all exist on the family's specimen
 *   page — verify at fonts.google.com/specimen/<family> before adding a chassis.
 * @property {boolean} italics
 *   Whether to also load italic variants of the listed weights.
 */

/**
 * @typedef {Object} ChassisScale
 * @property {number} ratio
 *   Modular ratio. Canonical musical intervals:
 *     1.067 Minor 2nd · 1.125 Major 2nd · 1.200 Minor 3rd · 1.250 Major 3rd
 *     1.333 Perfect 4th · 1.414 Aug 4th · 1.500 Perfect 5th · 1.618 Golden
 *   Editorial/literary → 1.250–1.333 · Product/UI → 1.125–1.200 · Poster → 1.414+
 * @property {string} base
 *   Base size in rem, e.g. '1rem' or '1.0625rem' (17px).
 */

/**
 * @typedef {Object} ChassisEntry
 * @property {string} id
 *   Stable identifier. Lowercase, hyphenated. Used in Director output.
 * @property {string} name
 *   Human-readable name shown to the Director and in archive metadata.
 * @property {string} description
 *   One-line description of the typographic feel.
 * @property {string[]} moods
 *   Tags the Director matches against the day's brief and chosen archetype.
 * @property {string[]} archetypes
 *   Archetype affinities — chassis IDs the Director should prefer for each archetype.
 * @property {Record<string, FontSpec>} fonts
 *   Font tokens. Key becomes the token name in `theme.tokens.fonts`
 *   (components reference by name: `fontFamily: 'display'`).
 *   Convention: include at least one of `display`/`heading`/`serif` and
 *   one of `body`/`sans`. Optional `mono` for code/tabular.
 * @property {ChassisScale} scale
 *   Type scale. Generates `theme.tokens.fontSizes` deterministically.
 */

export {}
