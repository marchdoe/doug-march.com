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
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
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
        cyan: {
          50: { value: '#ecfbfc' },
          100: { value: '#d3f5f7' },
          200: { value: '#a8ebef' },
          300: { value: '#71dbe2' },
          400: { value: '#38c4cf' },
          500: { value: '#14a8b6' },
          600: { value: '#0b8794' },
          700: { value: '#106b76' },
          800: { value: '#155760' },
          900: { value: '#124851' },
        },
        neutral: {
          50: { value: '#f2f7f8' },
          100: { value: '#e6eef0' },
          200: { value: '#cfdcdf' },
          300: { value: '#aebfc3' },
          400: { value: '#7e9297' },
          500: { value: '#5b6f74' },
          600: { value: '#45585c' },
          700: { value: '#344549' },
          800: { value: '#222f32' },
          900: { value: '#131c1e' },
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
        tight: { value: '0.92' },
        snug: { value: '1.1' },
        normal: { value: '1.6' },
        loose: { value: '1.8' },
      },
      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0' },
        wide: { value: '0.02em' },
        wider: { value: '0.06em' },
        widest: { value: '0.12em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '4px' },
        md: { value: '8px' },
        lg: { value: '16px' },
        full: { value: '9999px' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '800' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.cyan.100}', _light: '{colors.cyan.100}' },
        },
        cardBg: {
          value: { base: '{colors.cyan.50}', _light: '{colors.cyan.50}' },
        },
        spineBg: {
          value: { base: '{colors.cyan.700}', _light: '{colors.cyan.700}' },
        },
        text: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.700}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.600}', _light: '{colors.neutral.600}' },
        },
        textOnSpine: {
          value: { base: '{colors.cyan.50}', _light: '{colors.cyan.50}' },
        },
        accent: {
          value: { base: '{colors.cyan.600}', _light: '{colors.cyan.600}' },
        },
        accentGlow: {
          value: { base: '{colors.cyan.300}', _light: '{colors.cyan.300}' },
        },
        border: {
          value: { base: '{colors.neutral.200}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})