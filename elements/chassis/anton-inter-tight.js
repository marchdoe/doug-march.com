/**
 * Heavy-display poster pairing. Anton is a single-weight condensed display
 * sans (Vernon Adams, Google Fonts) — drawn for ad headlines, reads as
 * confident and tight. Pairs with Inter Tight (Rasmus Andersson, Google
 * Fonts), a workhorse sans optimized for screen text with a slightly
 * narrower advance than Inter classic — keeps body copy economical so
 * the display heads dominate.
 *
 * Scale at Perfect 5th (1.500) — dramatic hierarchy, comfortable home
 * for poster-scale type without crushing body legibility.
 *
 * Off impeccable's reflex-reject list. Use for Poster, Specimen, and
 * Stack archetypes — anywhere the brief calls for headline-led drama.
 */

/** @type {import('./types.js').ChassisEntry} */
export const antonInterTight = {
  id: 'anton-inter-tight',
  name: 'Anton + Inter Tight',
  description: 'Condensed display heavy + workhorse sans body — confident, headline-led, modern.',
  moods: ['dramatic', 'poster', 'condensed', 'headline-led', 'modern'],
  archetypes: ['Poster', 'Specimen', 'Stack'],

  fonts: {
    display: {
      family: 'Anton',
      fallbacks: ['Impact', 'Arial Narrow', 'sans-serif'],
      weights: [400],
      italics: false,
    },
    body: {
      family: 'Inter Tight',
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
