import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      fontKerning: 'normal',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    '*': {
      boxSizing: 'border-box',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      color: 'text',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    a: {
      color: 'text',
      textDecoration: 'underline',
      textDecorationThickness: '1px',
      textUnderlineOffset: '3px',
      textDecorationColor: 'border',
      transition: 'text-decoration-color 120ms ease',
    },
    'a:hover': {
      textDecorationColor: 'accentAlt',
      textDecorationThickness: '2px',
    },
    'th, td': {
      fontVariantNumeric: 'tabular-nums',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &',
    _dark: '[data-theme="dark"] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        gold: {
          50: { value: '#fbf6da' },
          100: { value: '#f7ecad' },
          200: { value: '#f2dd6f' },
          300: { value: '#edc933' },
          400: { value: '#e8bc16' },
          500: { value: '#cf9f0d' },
          600: { value: '#a87f0a' },
          700: { value: '#7e5f0b' },
          800: { value: '#533f0a' },
          900: { value: '#2c2107' },
        },
        chalk: {
          50: { value: '#f7f3e8' },
          100: { value: '#efe9d7' },
          200: { value: '#ded6bd' },
          300: { value: '#c4ba99' },
          400: { value: '#9c9270' },
          500: { value: '#6f6750' },
          600: { value: '#514a38' },
          700: { value: '#383324' },
          800: { value: '#232016' },
          900: { value: '#14120b' },
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
        bg: { value: { base: '#f4efe1', _light: '#f4efe1', _dark: '#f4efe1' } },
        bgAlt: { value: { base: '#e8e0cb' } },
        surface: { value: { base: '#fcfaf1' } },
        text: { value: { base: '#1b1810' } },
        textMuted: { value: { base: '{colors.chalk.600}' } },
        textFaint: { value: { base: '#635b44' } },
        accent: { value: { base: '{colors.gold.500}' } },
        accentText: { value: { base: '#1b1810' } },
        accentAlt: { value: { base: '{colors.gold.600}' } },
        border: { value: { base: '#ddd4ba' } },
        borderStrong: { value: { base: '#b6aa86' } },
        field: { value: { base: '{colors.gold.400}' } },
        fieldInk: { value: { base: '#1e1905' } },
        fieldInkMuted: { value: { base: '#574508' } },
        fieldBorder: { value: { base: '#c39d10' } },
      },
    },
  },
})