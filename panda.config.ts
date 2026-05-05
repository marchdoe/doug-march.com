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
      light:  '.light &, [data-theme=light] &',
      dark:   '.dark &,  [data-theme=dark] &',
      mobile: '@media (max-width: 767px)',
    },
  },
})
