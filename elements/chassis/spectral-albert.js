/**
 * Editorial slab pairing. Spectral is a transitional serif with low contrast
 * and slab-leaning details — it reads as literary without the predictability
 * of Lora or Playfair. Albert Sans is a clean humanist body font that stays
 * out of the way.
 *
 * Scale at Perfect 4th (1.333) — strong hierarchy without operatic drama.
 * Suited to text-dense layouts where reading rhythm matters.
 *
 * Off impeccable's reflex-reject list. Use for editorial, literary,
 * considered briefs — Broadsheet, Stack, Scroll, Gallery Wall.
 */

/** @type {import('./types.js').ChassisEntry} */
export const spectralAlbert = {
  id: 'spectral-albert',
  name: 'Spectral + Albert Sans',
  description: 'Transitional slab serif with humanist body — editorial, literary, considered.',
  moods: ['editorial', 'literary', 'considered', 'distinctive', 'reflective'],
  archetypes: ['Broadsheet', 'Stack', 'Scroll', 'Gallery Wall'],

  fonts: {
    display: {
      family: 'Spectral',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      weights: [400, 500, 700],
      italics: true,
    },
    body: {
      family: 'Albert Sans',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 500, 600],
      italics: false,
    },
  },

  scale: {
    ratio: 1.333,
    base: '1rem',
  },
}
