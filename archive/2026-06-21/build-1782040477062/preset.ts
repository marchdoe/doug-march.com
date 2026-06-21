import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'html, body': {
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
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
      color: 'accent',
      textDecoration: 'none',
      _hover: {
        textDecoration: 'underline',
      },
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
        teal: {
          '50':  { value: '#E6F7F3' },
          '100': { value: '#B8E9DE' },
          '200': { value: '#75CFC0' },
          '300': { value: '#38B5A3' },
          '400': { value: '#0E9482' },
          '500': { value: '#0A7165' },
          '600': { value: '#085148' },
          '700': { value: '#063D37' },
          '800': { value: '#042D29' },
          '900': { value: '#021A18' },
        },
        stone: {
          '50':  { value: '#F7F5F3' },
          '100': { value: '#EEEAE5' },
          '200': { value: '#DDD7D1' },
          '300': { value: '#C2BBBA' },
          '400': { value: '#9F9694' },
          '500': { value: '#7D7472' },
          '600': { value: '#5D5452' },
          '700': { value: '#413C3A' },
          '800': { value: '#29221F' },
          '900': { value: '#141110' },
        },
        cream: {
          '50':  { value: '#FDFAF5' },
          '100': { value: '#F7F3ED' },
          '200': { value: '#EDE5D8' },
          '300': { value: '#D9CDBF' },
          '400': { value: '#C0B0A0' },
          '500': { value: '#9E8E7E' },
          '600': { value: '#7A6D5E' },
          '700': { value: '#584F44' },
          '800': { value: '#38332C' },
          '900': { value: '#1C1914' },
        },
      },
      spacing: {
        '4':   { value: '4px' },
        '8':   { value: '8px' },
        '16':  { value: '16px' },
        '24':  { value: '24px' },
        '32':  { value: '32px' },
        '48':  { value: '48px' },
        '64':  { value: '64px' },
        '96':  { value: '96px' },
        '128': { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.9' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.8' },
      },
      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.2em' },
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
          value: { base: '{colors.cream.100}', _light: '{colors.cream.100}' },
        },
        bgHero: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.700}' },
        },
        bgCard: {
          value: { base: '{colors.cream.50}', _light: '{colors.cream.50}' },
        },
        text: {
          value: { base: '{colors.cream.900}', _light: '{colors.cream.900}' },
        },
        textHero: {
          value: { base: '{colors.cream.100}', _light: '{colors.cream.100}' },
        },
        textSecondary: {
          value: { base: '{colors.stone.600}', _light: '{colors.stone.600}' },
        },
        textMuted: {
          value: { base: '{colors.stone.500}', _light: '{colors.stone.500}' },
        },
        accent: {
          value: { base: '{colors.teal.500}', _light: '{colors.teal.500}' },
        },
        accentLight: {
          value: { base: '{colors.teal.300}', _light: '{colors.teal.300}' },
        },
        accentDark: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.700}' },
        },
        border: {
          value: { base: '{colors.stone.200}', _light: '{colors.stone.200}' },
        },
        borderHero: {
          value: { base: '{colors.teal.600}', _light: '{colors.teal.600}' },
        },
      },
    },
  },
})