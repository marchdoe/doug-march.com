import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      margin: 0,
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      fontKerning: 'normal',
      fontOpticalSizing: 'auto',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 120ms ease',
    },
    'a:hover': {
      color: 'accent',
      textDecoration: 'underline',
      textUnderlineOffset: '0.18em',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontWeight: 'inherit',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    'p, li': {
      maxWidth: '66ch',
    },
    '::selection': {
      background: 'accent',
      color: 'accentText',
    },
    '.tnum': {
      fontVariantNumeric: 'tabular-nums',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &',
    _dark: '[data-theme="dark"] &',
    _hover: '&:hover:not(:disabled)',
  },

  theme: {
    tokens: {
      colors: {
        amber: {
          50: { value: '#FDF3DC' },
          100: { value: '#FBE4B2' },
          200: { value: '#F7CE77' },
          300: { value: '#F1B948' },
          400: { value: '#E7A31F' },
          500: { value: '#CE8610' },
          600: { value: '#A9620A' },
          700: { value: '#7E470A' },
          800: { value: '#5A330A' },
          900: { value: '#3A2107' },
        },
        espresso: {
          50: { value: '#FBF3E4' },
          100: { value: '#F5E7CC' },
          200: { value: '#E9D4A6' },
          300: { value: '#D6B776' },
          400: { value: '#BC9048' },
          500: { value: '#96692C' },
          600: { value: '#71491A' },
          700: { value: '#513313' },
          800: { value: '#35210C' },
          900: { value: '#1F1305' },
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
        bg: { value: { base: '{colors.amber.300}' } },
        bgAlt: { value: { base: '{colors.amber.400}' } },
        surface: { value: { base: '{colors.espresso.50}' } },
        text: { value: { base: '{colors.espresso.900}' } },
        textMuted: { value: { base: '{colors.espresso.700}' } },
        textFaint: { value: { base: '{colors.espresso.600}' } },
        accent: { value: { base: '{colors.amber.600}' } },
        accentText: { value: { base: '{colors.espresso.50}' } },
        accentAlt: { value: { base: '{colors.amber.400}' } },
        border: { value: { base: '{colors.espresso.400}' } },
        borderStrong: { value: { base: '{colors.espresso.700}' } },
        field: { value: { base: '{colors.amber.700}' } },
        fieldInk: { value: { base: '{colors.espresso.50}' } },
        fieldInkMuted: { value: { base: '{colors.amber.200}' } },
        fieldBorder: { value: { base: '{colors.amber.600}' } },
      },
    },
  },
})