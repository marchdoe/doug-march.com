import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
      color: 'text',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
      _hover: {
        color: 'accentSubtle',
        textDecoration: 'underline',
      },
    },
    hr: {
      border: 'none',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'border',
    },
    blockquote: {
      borderLeftWidth: '3px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'accent',
      paddingLeft: '1.5rem',
      fontStyle: 'italic',
    },
    'table': {
      borderCollapse: 'collapse',
      width: '100%',
    },
    'th, td': {
      textAlign: 'left',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &',
    _dark: '[data-theme="dark"] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        teal: {
          50:  { value: '#EEF6FA' },
          100: { value: '#D4ECF5' },
          200: { value: '#A2D4EA' },
          300: { value: '#5FB8DC' },
          400: { value: '#2898C4' },
          500: { value: '#1A7FA8' },
          600: { value: '#13627F' },
          700: { value: '#0D4659' },
          800: { value: '#082E38' },
          900: { value: '#041720' },
        },
        amber: {
          50:  { value: '#FFF8ED' },
          100: { value: '#FFEAD0' },
          200: { value: '#FFD099' },
          300: { value: '#FFB05E' },
          400: { value: '#FF8A28' },
          500: { value: '#F06810' },
          600: { value: '#C24C07' },
          700: { value: '#943804' },
          800: { value: '#672602' },
          900: { value: '#3C1401' },
        },
        ink: {
          50:  { value: '#F2F7F9' },
          100: { value: '#E1EEF3' },
          200: { value: '#C2D9E4' },
          300: { value: '#98BEC9' },
          400: { value: '#6B9BAB' },
          500: { value: '#4C7888' },
          600: { value: '#345866' },
          700: { value: '#223C47' },
          800: { value: '#13252D' },
          900: { value: '#0A171E' },
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
        tight:  { value: '0.95' },
        snug:   { value: '1.2' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
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
        bold:     { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        bgCard: {
          value: { base: '{colors.ink.800}', _light: '{colors.teal.50}' },
        },
        bgSubtle: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.100}', _light: '{colors.ink.900}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.300}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.500}', _light: '{colors.ink.400}' },
        },
        accent: {
          value: { base: '{colors.teal.400}', _light: '{colors.teal.600}' },
        },
        accentSubtle: {
          value: { base: '{colors.teal.200}', _light: '{colors.teal.400}' },
        },
        accentDim: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.100}' },
        },
        alert: {
          value: { base: '{colors.amber.400}', _light: '{colors.amber.600}' },
        },
        alertDim: {
          value: { base: '{colors.amber.800}', _light: '{colors.amber.100}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderAccent: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.200}' },
        },
      },
    },
  },
})