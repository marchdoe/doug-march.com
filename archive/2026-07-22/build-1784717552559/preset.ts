import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    html: {
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontFamily: 'body',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      margin: '0',
      minHeight: '100vh',
      fontKerning: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      fontFamily: 'display',
      fontWeight: 'bold',
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    p: {
      textWrap: 'pretty',
    },
    'sup, .tabular': {
      fontVariantNumeric: 'tabular-nums',
    },
  },
  conditions: {
    light: '[data-theme="light"] &',
    dark: '[data-theme="dark"] &',
    hover: '&:hover',
  },
  theme: {
    tokens: {
      colors: {
        teal: {
          50: { value: '#E8F8F9' },
          100: { value: '#C6ECEE' },
          200: { value: '#97DBDE' },
          300: { value: '#5BC5CB' },
          400: { value: '#26ABB3' },
          500: { value: '#0E8F97' },
          600: { value: '#0B727A' },
          700: { value: '#0C5A60' },
          800: { value: '#0C464B' },
          900: { value: '#082F33' },
        },
        aqua: {
          50: { value: '#E4FCF8' },
          100: { value: '#BEF7EF' },
          200: { value: '#86EFE1' },
          300: { value: '#5CEBDD' },
          400: { value: '#1FDDCB' },
          500: { value: '#12BAAA' },
          600: { value: '#0FA697' },
          700: { value: '#10786D' },
          800: { value: '#115E56' },
          900: { value: '#0A3D39' },
        },
        neutral: {
          50: { value: '#F2FBFB' },
          100: { value: '#E1F0F0' },
          200: { value: '#C4DCDD' },
          300: { value: '#9FBEC0' },
          400: { value: '#6F9497' },
          500: { value: '#4E7275' },
          600: { value: '#385659' },
          700: { value: '#274143' },
          800: { value: '#182E30' },
          900: { value: '#0D1E20' },
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
        tight: { value: '0.9' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0.005em' },
        wide: { value: '0.08em' },
        wider: { value: '0.14em' },
        widest: { value: '0.18em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '2px' },
        md: { value: '4px' },
        lg: { value: '8px' },
        full: { value: '9999px' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '800' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.teal.800}', _light: '{colors.neutral.50}' },
        },
        bgSpine: {
          value: { base: '{colors.teal.900}', _light: '{colors.neutral.100}' },
        },
        bgCard: {
          value: { base: '{colors.teal.700}', _light: '{colors.neutral.100}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.teal.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.100}', _light: '{colors.teal.700}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.aqua.400}', _light: '{colors.aqua.600}' },
        },
        accentGlow: {
          value: { base: 'rgba(31,221,203,0.45)', _light: 'rgba(15,166,151,0.30)' },
        },
        border: {
          value: { base: '{colors.teal.600}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})