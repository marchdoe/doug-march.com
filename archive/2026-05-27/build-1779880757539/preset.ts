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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
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
        // Amber gold scale — H:35°, the hue of candlelight and illuminated manuscripts
        amber: {
          50:  { value: '#FFFCF0' },
          100: { value: '#FFF4D0' },
          200: { value: '#FFE89A' },
          300: { value: '#FFD555' },
          400: { value: '#FBBF24' },
          500: { value: '#F59E0B' },
          600: { value: '#D97706' },
          700: { value: '#B45309' },
          800: { value: '#92400E' },
          900: { value: '#78350F' },
        },
        // Ink scale — near-black amber-tinted neutrals (H:35°, chroma ~0.01)
        ink: {
          50:  { value: '#FDFAF2' },
          100: { value: '#F5EDDA' },
          200: { value: '#E2D4B4' },
          300: { value: '#C4B287' },
          400: { value: '#A0895E' },
          500: { value: '#7D6642' },
          600: { value: '#5C4A2C' },
          700: { value: '#3D3018' },
          800: { value: '#26200E' },
          900: { value: '#140E02' },
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
        tight:  { value: '0.92' },
        snug:   { value: '1.15' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.14em' },
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
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        bgCard: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.50}' },
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
          value: { base: '{colors.amber.400}', _light: '{colors.amber.600}' },
        },
        accentLight: {
          value: { base: '{colors.amber.300}', _light: '{colors.amber.500}' },
        },
        accentDark: {
          value: { base: '{colors.amber.600}', _light: '{colors.amber.700}' },
        },
        accentGlow: {
          value: { base: '{colors.amber.400}', _light: '{colors.amber.500}' },
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