/**
 * Modern expressive pairing. Bricolage Grotesque is a variable display face
 * with deliberate quirk — it tightens at large sizes and softens at body.
 * Pairs with Manrope's humanist sans for body — readable, warm, slightly
 * informal without being childlike.
 *
 * Scale at Perfect 5th (1.500) gives dramatic hierarchy jumps — heading-
 * led layouts where the typography is the visual hierarchy.
 *
 * Off impeccable's reflex-reject list. Use for brand-register days that
 * need expressive voice — Poster, Stack, Scroll archetypes especially.
 */

/** @type {import('./types.js').ChassisEntry} */
export const bricolageManrope = {
  id: 'bricolage-manrope',
  name: 'Bricolage Grotesque + Manrope',
  description: 'Expressive variable display with humanist body — modern, warm, brand-driven.',
  moods: ['expressive', 'modern', 'brand-driven', 'warm', 'distinctive'],
  archetypes: ['Poster', 'Stack', 'Scroll'],

  fonts: {
    display: {
      family: 'Bricolage Grotesque',
      fallbacks: ['Georgia', 'serif'],
      weights: [400, 600, 800],
      italics: false,
    },
    body: {
      family: 'Manrope',
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
