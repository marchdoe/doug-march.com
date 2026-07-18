import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontFamily: 'body',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      fontKerning: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontFamily: 'display',
      fontWeight: 'bold',
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    'p': {
      textWrap: 'pretty',
    },
    'a': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '::selection': {
      background: '{colors.lime.400}',
      color: '{colors.olive.900}',
    },
  },

  conditions: {
    extend: {
      _light: '&:is(.light *, .light)',
      _dark: '&:is(.dark *, .dark)',
      _hover: '&:hover',
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          lime: {
            50: { value: '#f7fce6' },
            100: { value: '#edf8c6' },
            200: { value: '#ddf095' },
            300: { value: '#cae95f' },
            400: { value: '#b5e61d' },
            500: { value: '#9fce12' },
            600: { value: '#7fa30d' },
            700: { value: '#5f7a0d' },
            800: { value: '#48590f' },
            900: { value: '#2f3a0c' },
          },
          olive: {
            50: { value: '#f6f8f0' },
            100: { value: '#ecefe0' },
            200: { value: '#d5dbc3' },
            300: { value: '#b3bd97' },
            400: { value: '#899168' },
            500: { value: '#646c47' },
            600: { value: '#4a5133' },
            700: { value: '#333823' },
            800: { value: '#1f2314' },
            900: { value: '#12150b' },
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
          snug: { value: '1.1' },
          normal: { value: '1.5' },
          loose: { value: '1.7' },
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
          sm: { value: '4px' },
          md: { value: '8px' },
          lg: { value: '16px' },
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
            value: { base: '{colors.olive.900}', _light: '{colors.olive.50}' },
          },
          bgCandle: {
            value: { base: '{colors.lime.400}', _light: '{colors.lime.400}' },
          },
          bgLedger: {
            value: { base: '{colors.olive.800}', _light: '{colors.olive.100}' },
          },
          text: {
            value: { base: '{colors.olive.100}', _light: '{colors.olive.900}' },
          },
          textOnCandle: {
            value: { base: '{colors.olive.900}', _light: '{colors.olive.900}' },
          },
          textSecondary: {
            value: { base: '{colors.olive.300}', _light: '{colors.olive.600}' },
          },
          textMuted: {
            value: { base: '{colors.olive.400}', _light: '{colors.olive.400}' },
          },
          accent: {
            value: { base: '{colors.lime.400}', _light: '{colors.lime.600}' },
          },
          accentDark: {
            value: { base: '{colors.lime.600}', _light: '{colors.lime.700}' },
          },
          border: {
            value: { base: '{colors.olive.700}', _light: '{colors.olive.200}' },
          },
        },
      },
    },
  },
})