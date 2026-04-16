/**
 * Editorial pairing. Playfair Display's high-contrast modern serif against
 * Outfit's geometric, low-contrast sans. The italic weights on the display
 * face open up callouts and emphasis without needing a third family.
 *
 * Scale at Perfect 4th (1.333) gives meaningful hierarchy jumps without
 * the drama of a Golden ratio — suited to text-dense layouts.
 */

/** @type {import('./types.js').ChassisEntry} */
export const playfairOutfit = {
  id: 'playfair-outfit',
  name: 'Playfair Display + Outfit',
  description: 'Editorial serif with geometric sans body — literary, classic, calm.',
  moods: ['editorial', 'literary', 'classic', 'considered'],
  archetypes: ['Broadsheet', 'Stack', 'Scroll'],

  fonts: {
    display: {
      family: 'Playfair Display',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      weights: [400, 700],
      italics: true,
    },
    body: {
      family: 'Outfit',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [300, 400, 500],
      italics: false,
    },
  },

  scale: {
    ratio: 1.333,
    base: '1rem',
  },
}
