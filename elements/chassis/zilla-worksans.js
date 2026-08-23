/**
 * Editorial slab pairing. Zilla Slab is a sturdy, low-contrast slab serif
 * (Mozilla, designed for reading at both text and display sizes) — it reads
 * confident and grounded without the signage energy of a condensed grotesk.
 * Pairs with Work Sans, a humanist sans body drawn for screen legibility.
 *
 * Scale at Perfect 4th (1.333) — editorial hierarchy, not operatic. Sits
 * alongside spectral-albert as the catalog's second sub-1.500 chassis:
 * text-dense archetypes (Broadsheet, Index, Stack) need a chassis that
 * doesn't crush body copy with an aggressive ratio. Added 2026-08-23 to
 * break the condensed-caps monoculture (3 of the prior 5 chassis were
 * condensed display sans) with a structural, civic-feeling slab instead.
 *
 * Off impeccable's reflex-reject list — neither Zilla Slab nor Work Sans
 * appear on it. Use for Broadsheet, Index, and Stack archetypes — anywhere
 * the brief wants grounded, structural confidence over poster drama.
 */

/** @type {import('./types.js').ChassisEntry} */
export const zillaWorksans = {
  id: 'zilla-worksans',
  name: 'Zilla Slab + Work Sans',
  description: 'Sturdy low-contrast slab serif with humanist body — confident, structural, civic.',
  moods: ['confident', 'structural', 'civic', 'editorial', 'grounded'],
  archetypes: ['Broadsheet', 'Index', 'Stack'],

  fonts: {
    display: {
      family: 'Zilla Slab',
      fallbacks: ['Georgia', 'serif'],
      weights: [400, 500, 700],
      italics: true,
    },
    body: {
      family: 'Work Sans',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 500, 700],
      italics: false,
    },
  },

  scale: {
    ratio: 1.333,
    base: '1rem',
  },
}
