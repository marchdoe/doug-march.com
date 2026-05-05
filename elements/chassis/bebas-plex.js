/**
 * Editorial-poster pairing. Bebas Neue is a tall, condensed display sans
 * (Ryoichi Tsunekawa, Google Fonts) — narrower and more editorial than
 * Anton, with a tabular feel that suits dense list/index layouts. Pairs
 * with IBM Plex Sans (IBM/Bold Monkeys, Google Fonts), a humanist
 * workhorse with mechanical texture and a wide weight range.
 *
 * Scale at Perfect 5th (1.500) — same dramatic hierarchy as
 * anton-inter-tight, but a different mood: editorial / catalog / index
 * vs. poster / signage.
 *
 * Off impeccable's reflex-reject list. Use for Specimen, Index, and
 * Split archetypes — anywhere the brief calls for editorial weight at
 * poster scale.
 */

/** @type {import('./types.js').ChassisEntry} */
export const bebasPlex = {
  id: 'bebas-plex',
  name: 'Bebas Neue + IBM Plex Sans',
  description: 'Condensed editorial display + humanist workhorse body — editorial, catalog, declarative.',
  moods: ['editorial', 'catalog', 'declarative', 'condensed', 'humanist'],
  archetypes: ['Specimen', 'Index', 'Split'],

  fonts: {
    display: {
      family: 'Bebas Neue',
      fallbacks: ['Oswald', 'Impact', 'sans-serif'],
      weights: [400],
      italics: false,
    },
    body: {
      family: 'IBM Plex Sans',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 500, 700],
      italics: true,
    },
  },

  scale: {
    ratio: 1.500,
    base: '1rem',
  },
}
