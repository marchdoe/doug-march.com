import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: 0,
      padding: 0,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontWeight: 'inherit',
      textWrap: 'balance',
    },
    p: {
      margin: 0,
      textWrap: 'pretty',
    },
    '::selection': {
      background: 'accent',
      color: 'accentText',
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
        yellow: {
          50: { value: '#FBFCE6' },
          100: { value: '#F4F9C6' },
          200: { value: '#E7F191' },
          300: { value: '#DBEA5F' },
          400: { value: '#CFDE33' },
          500: { value: '#B6C81C' },
          600: { value: '#96A612' },
          700: { value: '#71800E' },
          800: { value: '#4C560B' },
          900: { value: '#2A3007' },
        },
        neutral: {
          50: { value: '#FAF9EE' },
          100: { value: '#EFEDD9' },
          200: { value: '#DAD5B8' },
          300: { value: '#BDB68E' },
          400: { value: '#969067' },
          500: { value: '#726C44' },
          600: { value: '#524D2C' },
          700: { value: '#38341C' },
          800: { value: '#232010' },
          900: { value: '#141207' },
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
        bg: { value: { base: '{colors.yellow.400}' } },
        bgAlt: { value: { base: '{colors.yellow.500}' } },
        surface: { value: { base: '{colors.yellow.200}' } },
        text: { value: { base: '{colors.neutral.900}' } },
        textMuted: { value: { base: '{colors.neutral.700}' } },
        textFaint: { value: { base: '{colors.neutral.600}' } },
        accent: { value: { base: '{colors.yellow.800}' } },
        accentText: { value: { base: '{colors.yellow.50}' } },
        accentAlt: { value: { base: '{colors.yellow.700}' } },
        border: { value: { base: '{colors.yellow.600}' } },
        borderStrong: { value: { base: '{colors.neutral.800}' } },
        field: { value: { base: '{colors.neutral.900}' } },
        fieldInk: { value: { base: '{colors.yellow.300}' } },
        fieldInkMuted: { value: { base: '{colors.yellow.600}' } },
        fieldBorder: { value: { base: '{colors.neutral.700}' } },
      },
    },
  },
})