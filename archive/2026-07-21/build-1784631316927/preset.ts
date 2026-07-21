import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    ':root': {
      fontFamily: 'var(--fonts-body)',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      fontFeatureSettings: '"kern", "liga"',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      lineHeight: 'normal',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      lineHeight: 'tight',
      textWrap: 'balance',
      fontWeight: 'normal',
    },
    p: {
      margin: '0',
      textWrap: 'pretty',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
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
        violet: {
          50: { value: '#f5f2fe' },
          100: { value: '#eae2fd' },
          200: { value: '#d5c5fb' },
          300: { value: '#b89cf7' },
          400: { value: '#9a6ef1' },
          500: { value: '#7f45e7' },
          600: { value: '#6a2fd4' },
          700: { value: '#571fb0' },
          800: { value: '#431a86' },
          900: { value: '#2c1258' },
        },
        lilac: {
          50: { value: '#f8f2ff' },
          100: { value: '#eee0ff' },
          200: { value: '#dcc4ff' },
          300: { value: '#c9a8ff' },
          400: { value: '#a970ff' },
          500: { value: '#8a45f0' },
          600: { value: '#7330d0' },
          700: { value: '#5c22a6' },
          800: { value: '#461a7d' },
          900: { value: '#301254' },
        },
        neutral: {
          50: { value: '#f7f5fb' },
          100: { value: '#efecf5' },
          200: { value: '#ddd8e8' },
          300: { value: '#c3bcd3' },
          400: { value: '#9b93ac' },
          500: { value: '#736a86' },
          600: { value: '#554d67' },
          700: { value: '#3f384f' },
          800: { value: '#292236' },
          900: { value: '#16111f' },
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
        snug: { value: '1.05' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.01em' },
        normal: { value: '0' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
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
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgPanel: {
          value: { base: '{colors.violet.600}', _light: '{colors.violet.500}' },
        },
        bgSliver: {
          value: { base: '#120d1e', _light: '{colors.neutral.100}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        text: {
          value: { base: '{colors.violet.50}', _light: '{colors.neutral.900}' },
        },
        textOnPanel: {
          value: { base: '#f8f5ff', _light: '#f8f5ff' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.600}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.400}', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.lilac.400}', _light: '{colors.lilac.500}' },
        },
        accentGlow: {
          value: { base: '{colors.lilac.300}', _light: '{colors.lilac.400}' },
        },
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})