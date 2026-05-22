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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    p: {
      lineHeight: 'normal',
    },
    hr: {
      border: 'none',
      borderTop: '1px solid',
      borderColor: 'border',
    },
    '::selection': {
      backgroundColor: '#C8E828',
      color: '#0E0E06',
    },
  },

  conditions: {
    _light: '[data-theme=light] &, .light &',
    _dark: '[data-theme=dark] &, .dark &, &',
    _hover: '&:hover, &:focus-visible',
  },

  theme: {
    tokens: {
      colors: {
        chartreuse: {
          50:  { value: '#F7FCD8' },
          100: { value: '#EEF9A8' },
          200: { value: '#DCEF65' },
          300: { value: '#C8E828' },
          400: { value: '#ACDA0A' },
          500: { value: '#8EC206' },
          600: { value: '#709C05' },
          700: { value: '#527604' },
          800: { value: '#365003' },
          900: { value: '#1A2A01' },
        },
        ink: {
          50:  { value: '#FAFAF2' },
          100: { value: '#F4F4E4' },
          200: { value: '#E6E6C8' },
          300: { value: '#CECDA8' },
          400: { value: '#AEAD85' },
          500: { value: '#8A8A62' },
          600: { value: '#666646' },
          700: { value: '#484830' },
          800: { value: '#2E2E1C' },
          900: { value: '#1A1A0A' },
          950: { value: '#0E0E06' },
        },
      },
      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.95' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },
      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
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
          value: {
            base: '{colors.ink.900}',
            _light: '{colors.ink.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.ink.800}',
            _light: '{colors.ink.100}',
          },
        },
        bgSidebar: {
          value: {
            base: '{colors.ink.950}',
            _light: '{colors.ink.50}',
          },
        },
        text: {
          value: {
            base: '{colors.ink.50}',
            _light: '{colors.ink.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.ink.300}',
            _light: '{colors.ink.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.ink.500}',
            _light: '{colors.ink.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.chartreuse.300}',
            _light: '{colors.chartreuse.700}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.chartreuse.200}',
            _light: '{colors.chartreuse.600}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.chartreuse.900}',
            _light: '{colors.chartreuse.100}',
          },
        },
        border: {
          value: {
            base: '{colors.ink.700}',
            _light: '{colors.ink.200}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.chartreuse.500}',
            _light: '{colors.chartreuse.500}',
          },
        },
      },
    },
  },
})