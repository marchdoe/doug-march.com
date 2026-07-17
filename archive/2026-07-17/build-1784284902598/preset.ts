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
      margin: '0',
      fontKerning: 'normal',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    p: {
      margin: '0',
      textWrap: 'pretty',
    },
  },
  conditions: {
    light: '[data-theme="light"] &',
    dark: '[data-theme="dark"] &',
    hover: '&:hover',
  },
  theme: {
    tokens: {
      colors: {
        emerald: {
          50: { value: '#E8F9F0' },
          100: { value: '#C6F0DC' },
          200: { value: '#96E4C0' },
          300: { value: '#5FD49F' },
          400: { value: '#2DBE7F' },
          500: { value: '#10A366' },
          600: { value: '#068A54' },
          700: { value: '#076E44' },
          800: { value: '#085637' },
          900: { value: '#06422B' },
        },
        lime: {
          50: { value: '#EAFCF2' },
          100: { value: '#C9F6DD' },
          200: { value: '#9AECC1' },
          300: { value: '#6BE4A9' },
          400: { value: '#4FD79C' },
          500: { value: '#3FE39B' },
          600: { value: '#10A366' },
          700: { value: '#0C7E50' },
          800: { value: '#0A6444' },
          900: { value: '#064A32' },
        },
        sage: {
          50: { value: '#F5F8F5' },
          100: { value: '#E8EEE9' },
          200: { value: '#CFDAD1' },
          300: { value: '#ADBCAF' },
          400: { value: '#829387' },
          500: { value: '#5E6F62' },
          600: { value: '#47564B' },
          700: { value: '#354039' },
          800: { value: '#232B26' },
          900: { value: '#141814' },
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
        tight: { value: '0.88' },
        snug: { value: '1.15' },
        normal: { value: '1.5' },
        loose: { value: '1.6' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0.01em' },
        wide: { value: '0.06em' },
        wider: { value: '0.1em' },
        widest: { value: '0.12em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '2px' },
        md: { value: '4px' },
        lg: { value: '8px' },
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
          value: { base: '#07724A', _light: '#07724A' },
        },
        cardBg: {
          value: { base: '#0A6444', _light: '#0A6444' },
        },
        bandBg: {
          value: { base: '#064A32', _light: '#064A32' },
        },
        text: {
          value: { base: '#F2FBF5', _light: '#F2FBF5' },
        },
        textSecondary: {
          value: { base: '#B9E6CE', _light: '#B9E6CE' },
        },
        textMuted: {
          value: { base: '#7FBF9E', _light: '#7FBF9E' },
        },
        accent: {
          value: { base: '{colors.lime.500}', _light: '{colors.lime.500}' },
        },
        accentLight: {
          value: { base: '{colors.lime.400}', _light: '{colors.lime.400}' },
        },
        accentDark: {
          value: { base: '{colors.emerald.500}', _light: '{colors.emerald.500}' },
        },
        border: {
          value: { base: '{colors.emerald.900}', _light: '{colors.emerald.900}' },
        },
      },
    },
  },
})