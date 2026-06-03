import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: '0',
      padding: '0',
      minHeight: '100vh',
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
      transition: 'color 0.15s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      fontWeight: 'bold',
      lineHeight: 'tight',
    },
    'p': {
      margin: '0',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
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
        indigo: {
          50:  { value: '#F0EFFF' },
          100: { value: '#E2E0FF' },
          200: { value: '#C8C4FF' },
          300: { value: '#ACA3FF' },
          400: { value: '#8C80FF' },
          500: { value: '#6B5EFA' },
          600: { value: '#5245E0' },
          700: { value: '#3D33B8' },
          800: { value: '#2A2388' },
          900: { value: '#171050' },
        },
        stone: {
          50:  { value: '#F2F1FF' },
          100: { value: '#E8E6FF' },
          200: { value: '#D0CDEE' },
          300: { value: '#A8A4C8' },
          400: { value: '#7A759A' },
          500: { value: '#544F70' },
          600: { value: '#3B3758' },
          700: { value: '#27234A' },
          800: { value: '#17143A' },
          900: { value: '#0A0820' },
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
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },
      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.20em' },
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
          value: {
            base: '{colors.stone.900}',
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        bgSurface: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        text: {
          value: {
            base: '{colors.indigo.50}',
            _light: '{colors.stone.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.indigo.400}',
            _light: '{colors.indigo.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.indigo.300}',
            _light: '{colors.indigo.500}',
          },
        },
        accentVivid: {
          value: {
            base: '{colors.indigo.500}',
            _light: '{colors.indigo.700}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
      },
    },
  },
})