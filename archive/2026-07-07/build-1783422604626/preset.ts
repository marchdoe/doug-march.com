import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'p': {
      lineHeight: 'normal',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        teal: {
          '50':  { value: '#edfff6' },
          '100': { value: '#c5fde4' },
          '200': { value: '#84f9c8' },
          '300': { value: '#3df5ac' },
          '400': { value: '#0de591' },
          '500': { value: '#00c97e' },
          '600': { value: '#009962' },
          '700': { value: '#007349' },
          '800': { value: '#004d31' },
          '900': { value: '#002a1c' },
        },
        void: {
          '50':  { value: '#e8f5ee' },
          '100': { value: '#c2ddd2' },
          '200': { value: '#90b8a4' },
          '300': { value: '#5e8c77' },
          '400': { value: '#3d6f5c' },
          '500': { value: '#265443' },
          '600': { value: '#183d2f' },
          '700': { value: '#0f281f' },
          '800': { value: '#081812' },
          '900': { value: '#030d08' },
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
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.8' },
      },
      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.2em' },
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
          value: { base: '{colors.void.900}', _light: '{colors.void.50}' },
        },
        bgCard: {
          value: { base: '{colors.void.800}', _light: '{colors.teal.50}' },
        },
        bgSubtle: {
          value: { base: '{colors.void.700}', _light: '{colors.teal.100}' },
        },
        bgSignal: {
          value: { base: '{colors.void.700}', _light: '{colors.teal.100}' },
        },
        text: {
          value: { base: '{colors.teal.50}', _light: '{colors.void.900}' },
        },
        textSecondary: {
          value: { base: '{colors.teal.200}', _light: '{colors.void.700}' },
        },
        textMuted: {
          value: { base: '{colors.teal.400}', _light: '{colors.void.500}' },
        },
        textDim: {
          value: { base: '{colors.void.400}', _light: '{colors.void.400}' },
        },
        accent: {
          value: { base: '{colors.teal.500}', _light: '{colors.teal.600}' },
        },
        accentLight: {
          value: { base: '{colors.teal.400}', _light: '{colors.teal.500}' },
        },
        accentDark: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.800}' },
        },
        border: {
          value: { base: '{colors.void.600}', _light: '{colors.teal.200}' },
        },
        borderAccent: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.600}' },
        },
      },
    },
  },
})