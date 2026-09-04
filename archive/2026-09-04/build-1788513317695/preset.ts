import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      fontKerning: 'normal',
    },
    '::selection': {
      background: 'accent',
      color: 'accentText',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 120ms ease',
      _hover: { color: 'accentAlt' },
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      fontWeight: 'inherit',
      textWrap: 'balance',
    },
    'p': {
      textWrap: 'pretty',
    },
    '*': {
      borderColor: 'border',
    },
  },

  conditions: {
    _light: '[data-theme=light] &',
    _dark: '[data-theme=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        terracotta: {
          50: { value: '#FCEAE0' },
          100: { value: '#F8D3C0' },
          200: { value: '#F2B092' },
          300: { value: '#EC8E63' },
          400: { value: '#E67240' },
          500: { value: '#D2582F' },
          600: { value: '#B4451F' },
          700: { value: '#8F3517' },
          800: { value: '#6B2712' },
          900: { value: '#481A0C' },
        },
        sand: {
          50: { value: '#FBF4EC' },
          100: { value: '#F3E7D9' },
          200: { value: '#E4D0BC' },
          300: { value: '#CDB097' },
          400: { value: '#AC8A6E' },
          500: { value: '#8A6A52' },
          600: { value: '#6A4E3B' },
          700: { value: '#4A3529' },
          800: { value: '#281C14' },
          900: { value: '#1B130D' },
        },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '0' },
        md: { value: '0' },
        lg: { value: '0' },
        full: { value: '9999px' },
      },
    },

    semanticTokens: {
      colors: {
        bg: { value: { base: '{colors.sand.900}' } },
        bgAlt: { value: { base: '{colors.sand.800}' } },
        surface: { value: { base: '#34261B' } },

        text: { value: { base: '{colors.sand.50}' } },
        textMuted: { value: { base: '{colors.sand.300}' } },
        textFaint: { value: { base: '{colors.sand.500}' } },

        accent: { value: { base: '{colors.terracotta.400}' } },
        accentText: { value: { base: '#160F0A' } },
        accentAlt: { value: { base: '{colors.terracotta.300}' } },

        border: { value: { base: '{colors.sand.700}' } },
        borderStrong: { value: { base: '{colors.sand.600}' } },

        field: { value: { base: '{colors.terracotta.500}' } },
        fieldInk: { value: { base: '#160F0A' } },
        fieldInkMuted: { value: { base: '{colors.terracotta.900}' } },
        fieldBorder: { value: { base: '{colors.terracotta.600}' } },
      },
    },
  },
})