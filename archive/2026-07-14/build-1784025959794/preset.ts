import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    html: {
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontKerning: 'normal',
      lineHeight: 'normal',
      minHeight: '100vh',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'normal',
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    '::selection': {
      background: '{colors.accent.default}',
      color: '{colors.neutral.900}',
    },
  },
  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
    hover: '&:is(:hover, [data-hover])',
  },
  theme: {
    tokens: {
      colors: {
        cobalt: {
          50: { value: '#eef1ff' },
          100: { value: '#dde3ff' },
          200: { value: '#b8c4ff' },
          300: { value: '#8ea0ff' },
          400: { value: '#5f78fb' },
          500: { value: '#3a53f0' },
          600: { value: '#2437d8' },
          700: { value: '#1c2bb0' },
          800: { value: '#182590' },
          900: { value: '#131c66' },
        },
        sky: {
          50: { value: '#eef3ff' },
          100: { value: '#d9e4ff' },
          200: { value: '#bcd0ff' },
          300: { value: '#a9c3ff' },
          400: { value: '#6f9bff' },
          500: { value: '#4f7aff' },
          600: { value: '#3661f0' },
          700: { value: '#2a4dc4' },
          800: { value: '#233d99' },
          900: { value: '#1d3170' },
        },
        neutral: {
          50: { value: '#f6f6fb' },
          100: { value: '#ecedf5' },
          200: { value: '#d9dbe8' },
          300: { value: '#b9bcce' },
          400: { value: '#8e91a8' },
          500: { value: '#6a6d84' },
          600: { value: '#4e5167' },
          700: { value: '#3a3d50' },
          800: { value: '#24263a' },
          900: { value: '#14162b' },
        },
        cream: {
          value: '#f4f1e6',
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
        tight: { value: '0.9' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '0.005em' },
        normal: { value: '0.01em' },
        wide: { value: '0.06em' },
        wider: { value: '0.12em' },
        widest: { value: '0.18em' },
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
          value: { base: '{colors.cobalt.600}', _light: '{colors.cobalt.600}' },
        },
        panel: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },
        surface: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.800}' },
        },
        text: {
          value: { base: '{colors.cream}', _light: '{colors.cream}' },
        },
        textSecondary: {
          value: { base: '{colors.cobalt.100}', _light: '{colors.cobalt.100}' },
        },
        textMuted: {
          value: { base: '{colors.cobalt.200}', _light: '{colors.cobalt.200}' },
        },
        accent: {
          value: { base: '{colors.sky.400}', _light: '{colors.sky.400}' },
        },
        accentDark: {
          value: { base: '{colors.sky.500}', _light: '{colors.sky.500}' },
        },
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.700}' },
        },
      },
    },
  },
})