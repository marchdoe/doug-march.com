import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentHover',
    },
    '*': {
      boxSizing: 'border-box',
    },
    '::selection': {
      background: 'accentSubtle',
      color: 'text',
    },
  },

  conditions: {
    _light: '.light &, [data-theme="light"] &',
    _dark: '.dark &, [data-theme="dark"] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        crimson: {
          50:  { value: '#FFF0F4' },
          100: { value: '#FFD6E4' },
          200: { value: '#FFB0CB' },
          300: { value: '#FF7AAD' },
          400: { value: '#F04882' },
          500: { value: '#CC2060' },
          600: { value: '#A8194F' },
          700: { value: '#841340' },
          800: { value: '#5E0C2E' },
          900: { value: '#3C0620' },
        },
        stone: {
          50:  { value: '#FAF0F3' },
          100: { value: '#EDD8DF' },
          200: { value: '#D4B8C1' },
          300: { value: '#B594A0' },
          400: { value: '#91707E' },
          500: { value: '#6D4E5C' },
          600: { value: '#503543' },
          700: { value: '#371F2D' },
          800: { value: '#22101A' },
          900: { value: '#130910' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '24px' },
        '6':  { value: '32px' },
        '7':  { value: '48px' },
        '8':  { value: '64px' },
        '9':  { value: '96px' },
        '10': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.93' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.15em' },
      },

      radii: {
        none: { value: '0' },
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
        bgSidebar: {
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
          value: { base: '{colors.crimson.400}', _light: '{colors.crimson.600}' },
        },
        accentHover: {
          value: { base: '{colors.crimson.300}', _light: '{colors.crimson.500}' },
        },
        accentSubtle: {
          value: { base: '{colors.crimson.900}', _light: '{colors.crimson.100}' },
        },
        border: {
          value: { base: '{colors.stone.700}', _light: '{colors.stone.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.stone.800}', _light: '{colors.stone.100}' },
        },
      },
    },
  },
})