import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontFeatureSettings: '"kern" 1, "liga" 1, "tnum" 1',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      textWrap: 'balance',
    },
    'p': {
      textWrap: 'pretty',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.12s ease',
      _hover: {
        color: 'accentLight',
      },
    },
    '::selection': {
      background: 'accentMuted',
      color: 'text',
    },
    'abbr': {
      fontVariantCaps: 'all-small-caps',
      letterSpacing: '0.06em',
    },
    '.tabular': {
      fontVariantNumeric: 'tabular-nums',
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
        violet: {
          50:  { value: '#F5EEFF' },
          100: { value: '#EBD9FF' },
          200: { value: '#D5ADFF' },
          300: { value: '#C4A0FF' },
          400: { value: '#9D50FF' },
          500: { value: '#8330EB' },
          600: { value: '#6820C4' },
          700: { value: '#4E149A' },
          800: { value: '#2D0B60' },
          900: { value: '#1C0640' },
        },
        ink: {
          50:  { value: '#F2EFF8' },
          100: { value: '#E4DFF0' },
          200: { value: '#C5BDD8' },
          300: { value: '#A39BBB' },
          400: { value: '#7E7598' },
          500: { value: '#5C5476' },
          600: { value: '#3F395A' },
          700: { value: '#27223C' },
          800: { value: '#14112A' },
          900: { value: '#07050D' },
        },
      },

      spacing: {
        1:  { value: '4px' },
        2:  { value: '8px' },
        3:  { value: '12px' },
        4:  { value: '16px' },
        5:  { value: '24px' },
        6:  { value: '32px' },
        7:  { value: '48px' },
        8:  { value: '64px' },
        9:  { value: '96px' },
        10: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.12em' },
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
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        bgCard: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        bgHover: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.50}', _light: '{colors.ink.900}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.300}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.500}', _light: '{colors.ink.400}' },
        },
        accent: {
          value: { base: '{colors.violet.400}', _light: '{colors.violet.600}' },
        },
        accentLight: {
          value: { base: '{colors.violet.300}', _light: '{colors.violet.500}' },
        },
        accentDark: {
          value: { base: '{colors.violet.600}', _light: '{colors.violet.700}' },
        },
        accentMuted: {
          value: { base: '{colors.violet.800}', _light: '{colors.violet.100}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        borderAccent: {
          value: { base: '{colors.violet.600}', _light: '{colors.violet.300}' },
        },
      },
    },
  },
})