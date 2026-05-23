import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*': {
      boxSizing: 'border-box',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      lineHeight: '0.88',
      letterSpacing: '0.04em',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'text',
    },
    p: {
      margin: '0',
    },
    '::selection': {
      background: '#A87BF8',
      color: '#F6F4FA',
    },
  },

  conditions: {
    _light: { selector: '[data-theme="light"] &, .light &' },
    _dark: { selector: '[data-theme="dark"] &, .dark &' },
    _hover: { selector: '&:hover' },
  },

  theme: {
    tokens: {
      colors: {
        violet: {
          50:  { value: '#F8F5FF' },
          100: { value: '#EEE5FF' },
          200: { value: '#DCCAFF' },
          300: { value: '#C5A6FF' },
          400: { value: '#A87BF8' },
          500: { value: '#8B50E8' },
          600: { value: '#6E2EC8' },
          700: { value: '#5214A0' },
          800: { value: '#360A70' },
          900: { value: '#1E0445' },
        },
        stone: {
          50:  { value: '#F6F4FA' },
          100: { value: '#ECE8F5' },
          200: { value: '#D9D3EC' },
          300: { value: '#C0B8DC' },
          400: { value: '#9890B8' },
          500: { value: '#706A90' },
          600: { value: '#504A6E' },
          700: { value: '#342E50' },
          800: { value: '#1E1A34' },
          900: { value: '#100D1E' },
          950: { value: '#090710' },
        },
      },

      spacing: {
        1:  { value: '4px' },
        2:  { value: '8px' },
        3:  { value: '12px' },
        4:  { value: '16px' },
        6:  { value: '24px' },
        8:  { value: '32px' },
        12: { value: '48px' },
        16: { value: '64px' },
        24: { value: '96px' },
        32: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.15em' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light:    { value: '300' },
        normal:   { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.stone.900}', _light: '{colors.stone.50}' },
        },
        bgCard: {
          value: { base: '{colors.stone.800}', _light: '{colors.stone.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.stone.800}', _light: '{colors.stone.100}' },
        },
        text: {
          value: { base: '{colors.stone.50}', _light: '{colors.stone.900}' },
        },
        textSecondary: {
          value: { base: '{colors.stone.300}', _light: '{colors.stone.600}' },
        },
        textMuted: {
          value: { base: '{colors.stone.500}', _light: '{colors.stone.400}' },
        },
        accent: {
          value: { base: '{colors.violet.400}', _light: '{colors.violet.600}' },
        },
        accentSubtle: {
          value: { base: '{colors.violet.800}', _light: '{colors.violet.100}' },
        },
        border: {
          value: { base: '{colors.stone.700}', _light: '{colors.stone.200}' },
        },
      },
    },
  },
})