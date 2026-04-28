/**
 * Mono-only chassis. JetBrains Mono carries both display and body — the
 * variable axis lets us push weight contrast within a single family,
 * which impeccable's typography reference notes is often stronger than
 * a timid display+body pairing.
 *
 * Scale at Major 3rd (1.250) — close ratio. Mono everywhere wants tight
 * type density, no big editorial jumps.
 *
 * Off impeccable's reflex-reject list (Space Mono is rejected — JetBrains
 * Mono is not). Use for technical, programmer-aesthetic, or deliberate
 * Index/Specimen archetypes. Brand register can absolutely commit to mono
 * as voice (per impeccable's brand.md "creative studios" guidance).
 */

/** @type {import('./types.js').ChassisEntry} */
export const jetbrainsMonoOnly = {
  id: 'jetbrains-mono-only',
  name: 'JetBrains Mono (only)',
  description: 'Single-family mono — technical, deliberate, programmer-aesthetic.',
  moods: ['technical', 'programmer', 'deliberate', 'mono', 'considered'],
  archetypes: ['Index', 'Specimen'],

  fonts: {
    display: {
      family: 'JetBrains Mono',
      fallbacks: ['ui-monospace', 'Menlo', 'Monaco', 'monospace'],
      weights: [400, 700, 800],
      italics: false,
    },
    body: {
      family: 'JetBrains Mono',
      fallbacks: ['ui-monospace', 'Menlo', 'Monaco', 'monospace'],
      weights: [400, 500],
      italics: true,
    },
  },

  scale: {
    ratio: 1.250,
    base: '1rem',
  },
}
