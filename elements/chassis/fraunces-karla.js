/**
 * Fat, soft display serif pairing. Fraunces is a variable "wonky" serif with
 * high-contrast optical sizing — at heavy weights it reads warm and tactile
 * rather than formal, closer to a hand-inked headline than a book face.
 * Pairs with Karla, a clean humanist grotesk for body — keeps the softness
 * of the display from tipping into whimsy.
 *
 * Scale at Perfect 5th (1.500) — display-grade, marquee-capable. Added
 * 2026-08-23 to break the condensed-caps monoculture: at the time, 3 of 5
 * chassis were condensed display sans, and every Poster day rendered in
 * the same tight, shouty register. Fraunces is loud in a completely
 * different way — round, warm, generous letterforms instead of narrow ones.
 *
 * Fraunces appears on impeccable's reflex-reject list (a guard against
 * defaulting into it in freeform generative design). That guard doesn't
 * apply here — this catalog is a fixed, hand-curated menu the Art Director
 * picks FROM, not a freeform choice a model reaches for by habit. Use for
 * Gallery Wall, Stack, and Broadsheet — anywhere the brief wants warmth
 * without losing display-scale confidence.
 */

/** @type {import('./types.js').ChassisEntry} */
export const fraucesKarla = {
  id: 'fraunces-karla',
  name: 'Fraunces + Karla',
  description: 'Fat, soft variable display serif with humanist grotesk body — warm, tactile, generous.',
  moods: ['warm', 'soft', 'tactile', 'editorial', 'friendly'],
  archetypes: ['Gallery Wall', 'Stack', 'Broadsheet'],

  fonts: {
    display: {
      family: 'Fraunces',
      fallbacks: ['Georgia', 'serif'],
      weights: [300, 400, 600, 900],
      italics: true,
    },
    body: {
      family: 'Karla',
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
