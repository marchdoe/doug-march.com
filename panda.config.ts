import { defineConfig } from '@pandacss/dev'
import { elementsPreset } from './elements/preset'

export default defineConfig({
  preflight: false,
  presets: [elementsPreset],
  include: ['./app/**/*.{ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',
  conditions: {
    extend: {
      light:  '.light &, [data-theme=light] &',
      dark:   '.dark &,  [data-theme=dark] &',
      mobile: '@media (max-width: 767px)',
    },
  },
})
