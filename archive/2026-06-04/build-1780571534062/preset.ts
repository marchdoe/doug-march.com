import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentHover',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      fontWeight: '800',
      lineHeight: '0.88',
      letterSpacing: '-0.02em',
    },
    'p': {
      margin: '0',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },

  conditions: {
    _light: '.light &, [data-theme=light] &',
    _dark: '.dark &, [data-theme=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        amber: {
          '50':  { value: '#FFF9ED' },
          '100': { value: '#FFF0CC' },
          '200': { value: '#FFE08A' },
          '300': { value: '#FFCA3A' },
          '400': { value: '#F09400' },
          '500': { value: '#C07000' },
          '600': { value: '#924E00' },
          '700': { value: '#6B3400' },
          '800': { value: '#3F1D00' },
          '900': { value: '#211000' },
        },
        stone: {
          '50':  { value: '#FAF8F3' },
          '100': { value: '#F4EEE0' },
          '200': { value: '#E6D9C2' },
          '300': { value: '#D2C0A0' },
          '400': { value: '#B5A07A' },
          '500': { value: '#8A7558' },
          '600': { value: '#685538' },
          '700': { value: '#493A22' },
          '800': { value: '#2D2210' },
          '900': { value: '#1A1408' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '16px' },
        '4': { value: '24px' },
        '5': { value: '32px' },
        '6': { value: '48px' },
        '7': { value: '64px' },
        '8': { value: '96px' },
        '9': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.15' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.18em' },
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
        bold:     { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.amber.900}', _light: '{colors.stone.50}' },
        },
        bgCard: {
          value: { base: '{colors.amber.800}', _light: '{colors.stone.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.stone.900}', _light: '{colors.stone.100}' },
        },
        text: {
          value: { base: '{colors.amber.200}', _light: '{colors.stone.900}' },
        },
        textSecondary: {
          value: { base: '{colors.amber.300}', _light: '{colors.stone.700}' },
        },
        textMuted: {
          value: { base: '{colors.amber.500}', _light: '{colors.stone.500}' },
        },
        accent: {
          value: { base: '{colors.amber.300}', _light: '{colors.amber.500}' },
        },
        accentHover: {
          value: { base: '{colors.amber.200}', _light: '{colors.amber.600}' },
        },
        border: {
          value: { base: '{colors.amber.700}', _light: '{colors.stone.200}' },
        },
      },
    },
  },
})