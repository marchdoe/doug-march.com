import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      fontKerning: 'normal',
    },
    body: {
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontWeight: 'medium',
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: 'accent',
    },
    '::selection': {
      background: '{colors.green.400}',
      color: '{colors.green.900}',
    },
  },

  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
    hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        green: {
          50: { value: '#ECFAEF' },
          100: { value: '#D2F4D9' },
          200: { value: '#A4E6B4' },
          300: { value: '#6FD38C' },
          400: { value: '#3DBB68' },
          500: { value: '#22A04F' },
          600: { value: '#178740' },
          700: { value: '#106E36' },
          800: { value: '#0E4A26' },
          900: { value: '#0A2E18' },
        },
        sage: {
          50: { value: '#F3F7F3' },
          100: { value: '#E6EEE7' },
          200: { value: '#CBD8CC' },
          300: { value: '#A6B8A8' },
          400: { value: '#7C8E7E' },
          500: { value: '#5B6B5D' },
          600: { value: '#455146' },
          700: { value: '#333D34' },
          800: { value: '#212A23' },
          900: { value: '#121A14' },
        },
      },
      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        4: { value: '16px' },
        6: { value: '24px' },
        8: { value: '32px' },
        12: { value: '48px' },
        16: { value: '64px' },
        24: { value: '96px' },
        32: { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.95' },
        snug: { value: '1.15' },
        normal: { value: '1.6' },
        loose: { value: '1.9' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '0' },
        md: { value: '0' },
        lg: { value: '0' },
        full: { value: '9999px' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.green.800}', _light: '{colors.green.50}' },
        },
        bgDeep: {
          value: { base: '{colors.green.900}', _light: '{colors.sage.100}' },
        },
        surface: {
          value: { base: '{colors.green.900}', _light: '{colors.sage.50}' },
        },
        text: {
          value: { base: '{colors.green.50}', _light: '{colors.green.900}' },
        },
        textSecondary: {
          value: { base: '{colors.sage.200}', _light: '{colors.sage.600}' },
        },
        textMuted: {
          value: { base: '#8AA391', _light: '{colors.sage.500}' },
        },
        accent: {
          value: { base: '{colors.green.400}', _light: '{colors.green.600}' },
        },
        accentGlow: {
          value: { base: '{colors.green.200}', _light: '{colors.green.500}' },
        },
        border: {
          value: { base: '{colors.green.600}', _light: '{colors.sage.200}' },
        },
      },
    },
  },
})