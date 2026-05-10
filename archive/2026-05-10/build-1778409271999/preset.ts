import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    'html, body': {
      height: '100%',
    },
    body: {
      background: 'bg',
      color: 'text',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentHover',
    },
    p: {
      textWrap: 'pretty',
    },
    '::selection': {
      background: 'accent',
      color: 'bg',
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
        amber: {
          '50':  { value: '#FFF8EE' },
          '100': { value: '#FFEFD0' },
          '200': { value: '#FFD998' },
          '300': { value: '#F5C060' },
          '400': { value: '#F2A82A' },
          '500': { value: '#D48520' },
          '600': { value: '#A86215' },
          '700': { value: '#7E4A0C' },
          '800': { value: '#573206' },
          '900': { value: '#321C02' },
        },
        stone: {
          '50':  { value: '#F8F4EF' },
          '100': { value: '#EDE6DC' },
          '200': { value: '#D8CCBC' },
          '300': { value: '#BBAA96' },
          '400': { value: '#988572' },
          '500': { value: '#736050' },
          '600': { value: '#534540' },
          '700': { value: '#382E28' },
          '800': { value: '#1C1410' },
          '900': { value: '#0F0B07' },
        },
      },
      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },
      letterSpacings: {
        tight:   { value: '-0.04em' },
        snug:    { value: '-0.02em' },
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
          value: { base: '{colors.amber.200}', _light: '{colors.stone.800}' },
        },
        textSecondary: {
          value: { base: '{colors.amber.400}', _light: '{colors.stone.600}' },
        },
        textMuted: {
          value: { base: '{colors.stone.400}', _light: '{colors.stone.500}' },
        },
        accent: {
          value: { base: '{colors.amber.400}', _light: '{colors.amber.600}' },
        },
        accentHover: {
          value: { base: '{colors.amber.300}', _light: '{colors.amber.500}' },
        },
        accentGlow: {
          value: { base: '{colors.amber.500}', _light: '{colors.amber.400}' },
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