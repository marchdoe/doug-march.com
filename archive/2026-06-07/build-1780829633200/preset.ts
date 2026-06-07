import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      fontWeight: 'bold',
      lineHeight: 'tight',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    '::selection': {
      backgroundColor: 'accent',
      color: 'bg',
    },
    img: {
      display: 'block',
      maxWidth: '100%',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &',
    _dark: '[data-theme="dark"] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        crimson: {
          '50':  { value: '#FFF0F2' },
          '100': { value: '#FFD6DC' },
          '200': { value: '#FFB3BE' },
          '300': { value: '#FF8096' },
          '400': { value: '#F74D6E' },
          '500': { value: '#E8193C' },
          '600': { value: '#C50D2E' },
          '700': { value: '#9E0824' },
          '800': { value: '#72051A' },
          '900': { value: '#450310' },
        },
        garnet: {
          '50':  { value: '#FAF0F1' },
          '100': { value: '#F2E3E5' },
          '200': { value: '#E0C8CB' },
          '300': { value: '#C4A5A9' },
          '400': { value: '#9E7B80' },
          '500': { value: '#7A5659' },
          '600': { value: '#5C3538' },
          '700': { value: '#3E1C1F' },
          '800': { value: '#241012' },
          '900': { value: '#0D0507' },
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
        tight:  { value: '0.9' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
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
          value: { base: '{colors.garnet.900}', _light: '{colors.garnet.50}' },
        },
        bgCard: {
          value: { base: '{colors.garnet.800}', _light: '{colors.garnet.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.garnet.700}', _light: '{colors.garnet.200}' },
        },
        bgInverse: {
          value: { base: '{colors.crimson.500}', _light: '{colors.crimson.500}' },
        },
        bgInverseDeep: {
          value: { base: '{colors.crimson.700}', _light: '{colors.crimson.700}' },
        },
        text: {
          value: { base: '{colors.garnet.50}', _light: '{colors.garnet.900}' },
        },
        textSecondary: {
          value: { base: '{colors.garnet.200}', _light: '{colors.garnet.700}' },
        },
        textMuted: {
          value: { base: '{colors.garnet.400}', _light: '{colors.garnet.500}' },
        },
        textInverse: {
          value: { base: '{colors.garnet.50}', _light: '{colors.garnet.50}' },
        },
        textInverseMuted: {
          value: { base: '{colors.crimson.200}', _light: '{colors.crimson.200}' },
        },
        accent: {
          value: { base: '{colors.crimson.500}', _light: '{colors.crimson.600}' },
        },
        accentLight: {
          value: { base: '{colors.crimson.300}', _light: '{colors.crimson.400}' },
        },
        accentDark: {
          value: { base: '{colors.crimson.700}', _light: '{colors.crimson.800}' },
        },
        border: {
          value: { base: '{colors.garnet.700}', _light: '{colors.garnet.200}' },
        },
        borderAccent: {
          value: { base: '{colors.crimson.800}', _light: '{colors.crimson.200}' },
        },
        borderStrong: {
          value: { base: '{colors.crimson.500}', _light: '{colors.crimson.600}' },
        },
      },
    },
  },
})