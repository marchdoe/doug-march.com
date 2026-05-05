/**
 * Dramatic poster pairing. Big Shoulders Display is a condensed grotesque
 * with athletic energy — designed for signage, originally drawn for the
 * city of Chicago. Pairs with Atkinson Hyperlegible (Braille Institute,
 * optimized for low-vision readers — it has distinctive letterforms that
 * prevent character confusion, which makes it visually interesting at body).
 *
 * Scale at Golden ratio (1.618) — operatic hierarchy. Heading sizes will
 * dwarf body. Use only when the brief calls for visual drama.
 *
 * Off impeccable's reflex-reject list. Use for Poster and Specimen archetypes,
 * especially with high-risk weights.
 */

/** @type {import('./types.js').ChassisEntry} */
export const bigShouldersAtkinson = {
  id: 'big-shoulders-atkinson',
  name: 'Big Shoulders Display + Atkinson Hyperlegible',
  description: 'Condensed signage display with hyperlegible body — dramatic, athletic, brand-loud.',
  moods: ['dramatic', 'poster', 'condensed', 'athletic', 'signage'],
  archetypes: ['Poster', 'Specimen'],

  fonts: {
    display: {
      family: 'Big Shoulders Display',
      fallbacks: ['Impact', 'Arial Narrow', 'sans-serif'],
      weights: [400, 700, 900],
      italics: false,
    },
    body: {
      family: 'Atkinson Hyperlegible',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 700],
      italics: true,
    },
  },

  scale: {
    ratio: 1.618,
    base: '1rem',
  },
}
