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
      fontFeatureSettings: '"kern" 1, "liga" 1',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      fontWeight: 'bold',
      lineHeight: 'tight',
    },
    p: {
      margin: '0',
      padding: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
      textDecoration: 'none',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    '::selection': {
      background: '#2AB8F5',
      color: '#060E17',
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
        cerulean: {
          50:  { value: '#F0F9FF' },
          100: { value: '#DDF0F9' },
          200: { value: '#BADEF4' },
          300: { value: '#7DC8F0' },
          400: { value: '#38AEE8' },
          500: { value: '#2AB8F5' },
          600: { value: '#0A8AC4' },
          700: { value: '#0869A0' },
          800: { value: '#064F7A' },
          900: { value: '#043858' },
        },
        midnight: {
          50:  { value: '#F0F7FB' },
          100: { value: '#DDEDF5' },
          200: { value: '#BACFE0' },
          300: { value: '#8DAEC8' },
          400: { value: '#5F8EAF' },
          500: { value: '#3C6E8E' },
          600: { value: '#244F6A' },
          700: { value: '#163549' },
          800: { value: '#0D1F2E' },
          850: { value: '#0A1622' },
          900: { value: '#060E17' },
          950: { value: '#030810' },
        },
      },
      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '16px' },
        4: { value: '24px' },
        5: { value: '32px' },
        6: { value: '48px' },
        7: { value: '64px' },
        8: { value: '96px' },
        9: { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
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
          value: { base: '{colors.midnight.900}', _light: '{colors.midnight.50}' },
        },
        bgCard: {
          value: { base: '{colors.midnight.850}', _light: '{colors.midnight.100}' },
        },
        bgSurface: {
          value: { base: '{colors.midnight.800}', _light: '{colors.midnight.200}' },
        },
        text: {
          value: { base: '{colors.midnight.50}', _light: '{colors.midnight.900}' },
        },
        textSecondary: {
          value: { base: '{colors.midnight.300}', _light: '{colors.midnight.600}' },
        },
        textMuted: {
          value: { base: '{colors.midnight.500}', _light: '{colors.midnight.500}' },
        },
        accent: {
          value: { base: '{colors.cerulean.500}', _light: '{colors.cerulean.700}' },
        },
        accentLight: {
          value: { base: '{colors.cerulean.300}', _light: '{colors.cerulean.500}' },
        },
        accentDark: {
          value: { base: '{colors.cerulean.700}', _light: '{colors.cerulean.900}' },
        },
        border: {
          value: { base: '{colors.midnight.700}', _light: '{colors.midnight.200}' },
        },
        borderAccent: {
          value: { base: '{colors.cerulean.700}', _light: '{colors.cerulean.400}' },
        },
      },
    },
  },
})