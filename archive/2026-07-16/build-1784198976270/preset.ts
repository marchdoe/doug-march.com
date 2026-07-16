import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontKerning: 'normal',
      fontOpticalSizing: 'auto',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      lineHeight: 'normal',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 160ms ease',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      lineHeight: 'tight',
      fontWeight: 'normal',
    },
    '::selection': {
      background: '{colors.gold.default}',
      color: '{colors.scarlet.900}',
    },
  },

  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
    hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        scarlet: {
          50: { value: '#FFF2ED' },
          100: { value: '#FFE1D7' },
          200: { value: '#FEBFAC' },
          300: { value: '#FA9575' },
          400: { value: '#F26A45' },
          500: { value: '#E24A25' },
          600: { value: '#C0360F' },
          700: { value: '#9C2809' },
          800: { value: '#741C06' },
          900: { value: '#4E1203' },
        },
        gold: {
          light: { value: '#FFD98A' },
          default: { value: '#FBC13F' },
          dark: { value: '#D99A1E' },
          glow: { value: '#FFE0A0' },
        },
        neutral: {
          50: { value: '#FBF4F1' },
          100: { value: '#F3E7E2' },
          200: { value: '#E4CFC7' },
          300: { value: '#CDB0A6' },
          400: { value: '#B08E83' },
          500: { value: '#8E6D63' },
          600: { value: '#6E514A' },
          700: { value: '#513A35' },
          800: { value: '#372623' },
          900: { value: '#221513' },
        },
      },
      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '16px' },
        4: { value: '24px' },
        5: { value: '32px' },
        6: { value: '48px' },
        7: { value: '64px' },
        8: { value: '96px' },
        9: { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.85' },
        snug: { value: '0.95' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.01em' },
        normal: { value: '0' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '2px' },
        md: { value: '6px' },
        lg: { value: '12px' },
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
          value: { base: '{colors.scarlet.700}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.scarlet.800}', _light: '{colors.neutral.100}' },
        },
        bgRail: {
          value: { base: '{colors.scarlet.900}', _light: '{colors.scarlet.700}' },
        },
        text: {
          value: { base: '{colors.scarlet.50}', _light: '{colors.scarlet.900}' },
        },
        textSecondary: {
          value: { base: '#F5C9B8', _light: '{colors.scarlet.700}' },
        },
        textMuted: {
          value: { base: '#E0A08C', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.gold.default}', _light: '{colors.gold.dark}' },
        },
        accentGlow: {
          value: { base: '{colors.gold.glow}', _light: '{colors.gold.default}' },
        },
        border: {
          value: { base: '{colors.scarlet.600}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})