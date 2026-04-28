/**
 * Hybrid technical-warm pairing. Schibsted Grotesk is a Norwegian
 * newspaper-derived grotesque — neutral but with subtle warmth and
 * character that distinguishes it from Inter / DM Sans / Space Grotesk
 * (all on impeccable's reflex-reject list). Anonymous Pro adds a
 * structural mono accent that punctuates rather than dominates.
 *
 * Scale at Major 3rd (1.250) — close ratio matched to the grotesque's
 * even color and the dense-info archetypes this serves.
 *
 * Off impeccable's reflex-reject list. Use for Index, Split, and
 * Specimen archetypes that want technical clarity without committing
 * fully to mono.
 */

/** @type {import('./types.js').ChassisEntry} */
export const schibstedAnonymous = {
  id: 'schibsted-anonymous',
  name: 'Schibsted Grotesk + Anonymous Pro',
  description: 'Newspaper-derived grotesque with mono accents — technical, warm, modern.',
  moods: ['technical', 'hybrid', 'warm', 'modern', 'editorial-data'],
  archetypes: ['Index', 'Split', 'Specimen'],

  fonts: {
    heading: {
      family: 'Schibsted Grotesk',
      fallbacks: ['system-ui', 'sans-serif'],
      weights: [500, 700, 900],
      italics: false,
    },
    body: {
      family: 'Schibsted Grotesk',
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
      weights: [400, 500, 600],
      italics: true,
    },
    mono: {
      family: 'Anonymous Pro',
      fallbacks: ['ui-monospace', 'Menlo', 'monospace'],
      weights: [400, 700],
      italics: false,
    },
  },

  scale: {
    ratio: 1.250,
    base: '1rem',
  },
}
