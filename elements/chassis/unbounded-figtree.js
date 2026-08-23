/**
 * Wide/expanded grotesk pairing. Unbounded is a blocky, geometric variable
 * display face drawn WIDE rather than condensed — the opposite proportion
 * statement from the catalog's existing condensed-caps chassis. Pairs with
 * Figtree, a warm neutral grotesk for body, so the wide display headlines
 * don't fight a competing personality underneath them.
 *
 * Scale at Perfect 5th (1.500) — display-grade, marquee-capable. Added
 * 2026-08-23 specifically to counter the monoculture finding that 3 of the
 * prior 5 chassis were condensed display sans (big-shoulders-atkinson,
 * anton-inter-tight, bebas-plex) — every one of them narrows type under
 * pressure. Unbounded does the opposite: it gets wider and blockier at
 * weight, which reads as confident and modern without repeating the same
 * "tight condensed caps" gesture a fourth time.
 *
 * Off impeccable's reflex-reject list — neither Unbounded nor Figtree
 * appear on it. Use for Poster, Specimen, and Gallery Wall — anywhere the
 * brief wants loud, geometric confidence that isn't condensed.
 */

/** @type {import('./types.js').ChassisEntry} */
export const unboundedFigtree = {
  id: 'unbounded-figtree',
  name: 'Unbounded + Figtree',
  description: 'Blocky, wide geometric display with warm neutral grotesk body — expanded, confident, modern-loud.',
  moods: ['geometric', 'expanded', 'blocky', 'confident', 'modern'],
  archetypes: ['Poster', 'Specimen', 'Gallery Wall'],

  fonts: {
    display: {
      family: 'Unbounded',
      fallbacks: ['Arial', 'sans-serif'],
      weights: [400, 700, 900],
      italics: false,
    },
    body: {
      family: 'Figtree',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 500, 700],
      italics: false,
    },
  },

  scale: {
    ratio: 1.500,
    base: '1rem',
  },
}
