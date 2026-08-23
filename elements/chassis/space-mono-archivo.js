/**
 * Mono-display pairing. Space Mono is a retro-futurist monospace pushed up
 * to display duty — quirky, technical, terminal-adjacent, unlike anything
 * else in the catalog (every other chassis pairs a proportional display
 * face). Pairs with Archivo, a neutral grotesk body, so the mono voice
 * stays confined to headlines and doesn't make body copy tedious to read.
 *
 * Scale at Perfect 5th (1.500) — display-grade, marquee-capable. Added
 * 2026-08-23 to break the condensed-caps monoculture (3 of the prior 5
 * chassis were condensed display sans) with a genuinely different texture:
 * fixed-width display type reads as technical/precise rather than loud.
 *
 * Space Mono appears on impeccable's reflex-reject list (a guard against
 * reaching for it by training-data habit in freeform design). That guard
 * doesn't apply here — this catalog is a fixed menu the Art Director picks
 * from, not a freeform default. Use for Specimen, Index, and Split — the
 * archetypes that already read as technical/precise and can carry a
 * monospace display without it feeling like a costume.
 */

/** @type {import('./types.js').ChassisEntry} */
export const spaceMonoArchivo = {
  id: 'space-mono-archivo',
  name: 'Space Mono + Archivo',
  description: 'Retro-futurist monospace display with neutral grotesk body — technical, precise, terminal-adjacent.',
  moods: ['technical', 'retro-futurist', 'terminal', 'precise', 'quirky'],
  archetypes: ['Specimen', 'Index', 'Split'],

  fonts: {
    display: {
      family: 'Space Mono',
      fallbacks: ['SFMono-Regular', 'Menlo', 'monospace'],
      weights: [400, 700],
      italics: true,
    },
    body: {
      family: 'Archivo',
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
