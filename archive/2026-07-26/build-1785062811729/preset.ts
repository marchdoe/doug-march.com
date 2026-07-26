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
      fontFeatureSettings: '"kern", "liga"',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6, p': {
      margin: 0,
    },
    '::selection': {
      background: 'accent',
      color: '{colors.pine.900}',
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
        emerald: {
          50: { value: '#E4FBEF' },
          100: { value: '#BEF5D9' },
          200: { value: '#86ECB8' },
          300: { value: '#4FDF97' },
          400: { value: '#29CE7F' },
          500: { value: '#18B06D' },
          600: { value: '#108C57' },
          700: { value: '#0D6B43' },
          800: { value: '#0A4A2F' },
          900: { value: '#06301F' },
        },
        pine: {
          50: { value: '#EDF4F0' },
          100: { value: '#D6E4DC' },
          200: { value: '#B0C7BB' },
          300: { value: '#83A292' },
          400: { value: '#587A69' },
          500: { value: '#3A5749' },
          600: { value: '#263C31' },
          700: { value: '#182A21' },
          800: { value: '#0E1D16' },
          900: { value: '#07120D' },
        },
      },
      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        4: { value: '16px' },
        6: { value: '24px' },
        8: { value: '32px' },
        12: { value: '48px' },
        16: { value: '64px' },
        24: { value: '96px' },
        32: { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.85' },
        snug: { value: '0.95' },
        normal: { value: '1.35' },
        loose: { value: '1.55' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.08em' },
        wider: { value: '0.14em' },
        widest: { value: '0.2em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '0' },
        md: { value: '0' },
        lg: { value: '0' },
        full: { value: '9999px' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.pine.900}', _light: '{colors.pine.50}' },
        },
        surface: {
          value: { base: '{colors.pine.800}', _light: '#FFFFFF' },
        },
        text: {
          value: { base: '{colors.pine.50}', _light: '{colors.pine.900}' },
        },
        textSecondary: {
          value: { base: '{colors.pine.200}', _light: '{colors.pine.600}' },
        },
        textMuted: {
          value: { base: '{colors.pine.300}', _light: '{colors.pine.500}' },
        },
        accent: {
          value: { base: '{colors.emerald.400}', _light: '{colors.emerald.600}' },
        },
        accentBright: {
          value: { base: '{colors.emerald.300}', _light: '{colors.emerald.500}' },
        },
        border: {
          value: { base: '{colors.pine.700}', _light: '{colors.pine.200}' },
        },
      },
    },
  },
})