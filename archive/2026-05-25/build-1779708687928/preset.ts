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
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    p: {
      lineHeight: 'normal',
      textWrap: 'pretty',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 200ms ease',
      _hover: {
        color: 'accentLight',
      },
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
    '::selection': {
      background: 'accentDim',
      color: 'text',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
    _disabled: '&:disabled, &[aria-disabled=true]',
  },

  theme: {
    tokens: {
      colors: {
        indigo: {
          50:  { value: '#EEF0FF' },
          100: { value: '#D8DDFF' },
          200: { value: '#B3BCFF' },
          300: { value: '#8896FF' },
          400: { value: '#5C70FF' },
          500: { value: '#3A52F5' },
          600: { value: '#2438D4' },
          700: { value: '#1528AA' },
          800: { value: '#0B1880' },
          900: { value: '#060C55' },
        },
        ink: {
          50:  { value: '#F4F4FA' },
          100: { value: '#E5E5F0' },
          200: { value: '#C7C7DC' },
          300: { value: '#A6A6C8' },
          400: { value: '#7676A4' },
          500: { value: '#4F4F78' },
          600: { value: '#353554' },
          700: { value: '#212135' },
          800: { value: '#141425' },
          900: { value: '#07071A' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.65' },
        loose:  { value: '1.85' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.14em' },
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
        black:    { value: '800' },
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
        bgSubtle: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        bgSection: {
          value: { base: '#0D0D22', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.50}', _light: '{colors.ink.900}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.300}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.400}', _light: '{colors.ink.500}' },
        },
        accent: {
          value: { base: '{colors.indigo.400}', _light: '{colors.indigo.600}' },
        },
        accentLight: {
          value: { base: '{colors.indigo.300}', _light: '{colors.indigo.500}' },
        },
        accentDim: {
          value: { base: '{colors.indigo.700}', _light: '{colors.indigo.200}' },
        },
        accentSubtle: {
          value: { base: '{colors.indigo.900}', _light: '{colors.indigo.50}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
      },
    },
  },
})