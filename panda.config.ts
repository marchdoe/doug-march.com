import { defineConfig } from '@pandacss/dev'
import { elementsPreset } from './elements/preset'
import { chassisPreset } from './elements/chassis-preset'

export default defineConfig({
  preflight: false,
  // chassisPreset listed LAST so its fonts + fontSizes win even if the
  // Token Designer accidentally emits its own. See elements/chassis-preset.ts.
  presets: [elementsPreset, chassisPreset],
  include: ['./app/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',
  theme: {
    extend: {
      /**
       * The archive's fixed identity — #152, #157.
       *
       * The archive is the one part of this site that must not change nightly.
       * It is the container the changing things sit in, and a container that
       * redesigns itself every night is just another exhibit.
       *
       * These live in panda.config.ts because it is orchestrator-owned. Neither
       * `elements/preset.ts` nor `elements/chassis-preset.ts` can be used here:
       * both carry "overwritten on every daily redesign" at the top, and the
       * chassis type ramp really does move — `2xl` was 5.063rem on 2026-07-22
       * and 3.157rem on 2026-07-24. Borrowing it would resize the archive's
       * headline every morning.
       *
       * The palette is achromatic on purpose. The only colour on an archive
       * surface comes from the days themselves — the hue of each build, filling
       * its cell in the calendar. Chrome that competed with that would be
       * chrome arguing with the collection.
       *
       * `archive.bg` is the same #0e0e10 as the frame rail injected into every
       * snapshot by scripts/utils/archive-seal.js, so the surfaces and the
       * frame read as one system rather than two.
       */
      tokens: {
        colors: {
          archive: {
            bg: { value: '#0e0e10' },
            panel: { value: '#161619' },
            line: { value: '#26262b' },
            lineSoft: { value: '#1d1d21' },
            text: { value: '#e8e8ea' },
            dim: { value: '#8a8a93' },
            faint: { value: '#4a4a52' },
          },
        },
        fonts: {
          archive: {
            // Mono leads. The nightly designs are expressive — Anton, Fraunces,
            // Big Shoulders — so the archive reads as a record instead: a
            // catalogue, not a poster.
            mono: {
              value:
                "'IBM Plex Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
            },
            sans: {
              value: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
            },
          },
        },
        fontSizes: {
          archive: {
            micro: { value: '0.6875rem' },
            small: { value: '0.8125rem' },
            body: { value: '0.9375rem' },
            lead: { value: '1.0625rem' },
            title: { value: '1.5rem' },
            display: { value: '2.25rem' },
          },
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  conditions: {
    extend: {
      light: '.light &, [data-theme=light] &',
      dark: '.dark &,  [data-theme=dark] &',
      mobile: '@media (max-width: 767px)',
    },
  },
})
