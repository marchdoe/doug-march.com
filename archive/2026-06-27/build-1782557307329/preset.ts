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
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
      textDecoration: 'underline',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    'img, video': {
      display: 'block',
      maxWidth: '100%',
    },
  },

  conditions: {
    _light: '[data-theme=light] &',
    _dark: '[data-theme=dark] &, &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Primary: TV-screen indigo H:243°
        indigo: {
          50:  { value: '#F2F2FA' },
          100: { value: '#E8E9F5' },
          200: { value: '#D0D2E8' },
          300: { value: '#9DA2F5' },
          400: { value: '#7179F0' },
          500: { value: '#4D5BE8' },
          600: { value: '#3744CC' },
          700: { value: '#2530A8' },
          800: { value: '#161E7A' },
          900: { value: '#0A1050' },
        },
        // Neutral: night slate, tinted toward H:243°
        slate: {
          50:  { value: '#F2F2FA' },
          100: { value: '#E8E9F5' },
          200: { value: '#D0D2E8' },
          300: { value: '#B2B4D0' },
          400: { value: '#8E91B5' },
          500: { value: '#6B6E95' },
          600: { value: '#484B70' },
          700: { value: '#2D3052' },
          800: { value: '#181B38' },
          900: { value: '#0B0D1E' },
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
        tight:  { value: '0.85' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },
      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.16em' },
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
        bold:     { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '#070B1C', _light: '{colors.slate.50}' },
        },
        bgCard: {
          value: { base: '#0F1328', _light: '{colors.slate.100}' },
        },
        bgStrip: {
          value: { base: '#0F1328', _light: '{colors.slate.100}' },
        },
        text: {
          value: { base: '#F0F1FF', _light: '{colors.slate.900}' },
        },
        textSecondary: {
          value: { base: '{colors.slate.300}', _light: '{colors.slate.700}' },
        },
        textMuted: {
          value: { base: '{colors.slate.500}', _light: '{colors.slate.600}' },
        },
        accent: {
          value: { base: '{colors.indigo.400}', _light: '{colors.indigo.600}' },
        },
        accentLight: {
          value: { base: '{colors.indigo.300}', _light: '{colors.indigo.700}' },
        },
        accentDark: {
          value: { base: '{colors.indigo.600}', _light: '{colors.indigo.800}' },
        },
        border: {
          value: { base: '{colors.slate.700}', _light: '{colors.slate.200}' },
        },
        borderAccent: {
          value: { base: '{colors.indigo.400}', _light: '{colors.indigo.600}' },
        },
      },
    },
  },
})