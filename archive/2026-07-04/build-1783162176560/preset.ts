import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      opacity: '0.8',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },

  conditions: {
    _light: '[data-theme=light] &',
    _dark: '[data-theme=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        aqua: {
          50:  { value: '#e2f5fc' },
          100: { value: '#bbebf8' },
          200: { value: '#82d4f0' },
          300: { value: '#45b8e2' },
          400: { value: '#1a9ec8' },
          500: { value: '#0e7fa6' },
          600: { value: '#0b6184' },
          700: { value: '#084863' },
          800: { value: '#052e40' },
          900: { value: '#021722' },
        },
        neutral: {
          50:  { value: '#ecf5f8' },
          100: { value: '#d6ecf2' },
          200: { value: '#aed3de' },
          300: { value: '#7db5c6' },
          400: { value: '#508fa8' },
          500: { value: '#3e7d96' },
          600: { value: '#1e4e67' },
          700: { value: '#123548' },
          800: { value: '#082130' },
          900: { value: '#040f18' },
          950: { value: '#020810' },
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
        tight:  { value: '0.90' },
        snug:   { value: '1.15' },
        normal: { value: '1.55' },
        loose:  { value: '1.80' },
      },
      letterSpacings: {
        tight:  { value: '-0.03em' },
        normal: { value: '0em' },
        wide:   { value: '0.05em' },
        wider:  { value: '0.10em' },
        widest: { value: '0.20em' },
      },
      radii: {
        none: { value: '0px' },
        sm:   { value: '4px' },
        md:   { value: '8px' },
        lg:   { value: '16px' },
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
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.neutral.950}', _light: '{colors.neutral.200}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.700}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.400}', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.aqua.400}', _light: '{colors.aqua.600}' },
        },
        accentLight: {
          value: { base: '{colors.aqua.300}', _light: '{colors.aqua.500}' },
        },
        accentDim: {
          value: { base: '{colors.aqua.700}', _light: '{colors.aqua.200}' },
        },
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.300}' },
        },
      },
    },
  },
})