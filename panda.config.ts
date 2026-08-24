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
      // PROTOTYPE (#157) — the archive's fixed neutral identity. elements/preset.ts
      // is rewritten nightly by the Art Director, so archive surfaces cannot use the
      // day's semantic tokens without changing nightly, which #152 forbids. These
      // live here because panda.config.ts is not agent-owned.
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
