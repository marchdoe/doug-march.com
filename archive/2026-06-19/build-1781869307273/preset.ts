import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    html: {
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      minHeight: '100vh',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: 'tight',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accentText',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'text',
      textDecoration: 'underline',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        indigo: {
          50: { value: '#F0F0FA' },
          100: { value: '#D8D8F5' },
          200: { value: '#B5B4ED' },
          300: { value: '#8F8DE0' },
          400: { value: '#6965C9' },
          500: { value: '#4A46B0' },
          600: { value: '#342F91' },
          700: { value: '#231F72' },
          800: { value: '#161454' },
          900: { value: '#0C0A32' },
        },
        parchment: {
          50: { value: '#FDFBF7' },
          100: { value: '#F7F3E9' },
          200: { value: '#EDE8D8' },
          300: { value: '#D8D2BF' },
          400: { value: '#BDB6A2' },
          500: { value: '#9E9787' },
          600: { value: '#7E786A' },
          700: { value: '#5E594F' },
          800: { value: '#3F3B34' },
          900: { value: '#221F1A' },
        },
        gold: {
          50: { value: '#FEF9EA' },
          100: { value: '#FAEEC4' },
          200: { value: '#F5D478' },
          300: { value: '#E8B940' },
          400: { value: '#C8952A' },
          500: { value: '#A67520' },
          600: { value: '#855A18' },
          700: { value: '#643F12' },
          800: { value: '#432A0C' },
          900: { value: '#211505' },
        },
      },
      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.88' },
        snug: { value: '1.15' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
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
        extrabold: { value: '800' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.parchment.100}', _light: '{colors.parchment.100}' },
        },
        bgCard: {
          value: { base: '{colors.parchment.50}', _light: '{colors.parchment.50}' },
        },
        text: {
          value: { base: '{colors.indigo.900}', _light: '{colors.indigo.900}' },
        },
        textSecondary: {
          value: { base: '{colors.indigo.700}', _light: '{colors.indigo.700}' },
        },
        textMuted: {
          value: { base: '{colors.parchment.600}', _light: '{colors.parchment.600}' },
        },
        accent: {
          value: { base: '{colors.gold.400}', _light: '{colors.gold.400}' },
        },
        accentText: {
          value: { base: '{colors.gold.600}', _light: '{colors.gold.600}' },
        },
        accentSubtle: {
          value: { base: '{colors.gold.100}', _light: '{colors.gold.100}' },
        },
        border: {
          value: { base: '{colors.parchment.300}', _light: '{colors.parchment.300}' },
        },
        borderStrong: {
          value: { base: '{colors.indigo.800}', _light: '{colors.indigo.800}' },
        },
      },
    },
  },
})