import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      margin: '0',
      padding: '0',
      background: 'bg',
      color: 'text',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 160ms ease',
    },
    'a:hover': {
      color: 'accentDark',
    },
  },

  conditions: {
    light: '[data-color-mode="light"] &',
    dark: '[data-color-mode="dark"] &',
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          50: { value: '#F4F7FB' },
          100: { value: '#E6EDF5' },
          200: { value: '#C9D5E3' },
          300: { value: '#A6B6C9' },
          400: { value: '#7E94AB' },
          500: { value: '#5A6E80' },
          600: { value: '#3E5265' },
          700: { value: '#27374A' },
          800: { value: '#15222E' },
          900: { value: '#0C1520' },
        },
        sage: {
          light: { value: '#D6E8D4' },
          default: { value: '#7DAB7A' },
          dark: { value: '#4E7A4B' },
        },
      },

      spacing: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '16px' },
        lg: { value: '24px' },
        xl: { value: '32px' },
        '2xl': { value: '40px' },
        '3xl': { value: '48px' },
        '4xl': { value: '64px' },
        '5xl': { value: '80px' },
        '6xl': { value: '96px' },
      },

      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },

      lineHeights: {
        tight: { value: '1.00' },
        snug: { value: '1.15' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },

      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
        md: { value: '24px' },
      },
    },

    semanticTokens: {
      colors: {
        bg: { value: { base: '{colors.stone.50}' } },
        cardBg: { value: { base: '{colors.stone.100}' } },
        text: { value: { base: '{colors.stone.700}' } },
        textSecondary: { value: { base: '{colors.stone.500}' } },
        textMuted: { value: { base: '{colors.stone.400}' } },
        textNav: { value: { base: '{colors.stone.300}' } },
        border: { value: { base: '{colors.stone.200}' } },
        accent: { value: { base: '{colors.sage.default}' } },
        accentLight: { value: { base: '{colors.sage.light}' } },
        accentDark: { value: { base: '{colors.sage.dark}' } },
      },
    },
  },
})