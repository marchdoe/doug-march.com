/**
 * Two-sans pairing for product, technical, and modernist designs.
 * Space Grotesk's slightly idiosyncratic display character against Work
 * Sans's neutral, highly legible body. Tight modular scale (1.200) keeps
 * type density even — no big editorial jumps.
 *
 * Use for archetypes that lean toward catalog, index, or developer-doc
 * energy rather than literary flourish.
 */

/** @type {import('./types.js').ChassisEntry} */
export const spaceGroteskWorkSans = {
  id: 'space-grotesk-work-sans',
  name: 'Space Grotesk + Work Sans',
  description: 'Modern display sans with neutral body sans — product, technical, calm.',
  moods: ['modern', 'product', 'technical', 'neutral'],
  archetypes: ['Index', 'Specimen', 'Split'],

  fonts: {
    heading: {
      family: 'Space Grotesk',
      fallbacks: ['system-ui', 'sans-serif'],
      weights: [500, 700],
      italics: false,
    },
    body: {
      family: 'Work Sans',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 500, 600],
      italics: false,
    },
  },

  scale: {
    ratio: 1.200,
    base: '1rem',
  },
}
