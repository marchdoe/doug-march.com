import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    html: {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontKerning: 'normal',
      fontVariantNumeric: 'oldstyle-nums',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'semibold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 140ms ease, text-decoration-color 140ms ease',
    },
    'a:hover': {
      color: 'accent',
    },
  },
  conditions: {
    extend: {
      light: '[data-theme=light] &',
      dark: '[data-theme=dark] &',
      hover: '&:hover',
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          ink: {
            50: { value: '#FCEAE6' },
            100: { value: '#F8CFC6' },
            200: { value: '#F2A99A' },
            300: { value: '#E97C66' },
            400: { value: '#DE5138' },
            500: { value: '#CE2E1A' },
            600: { value: '#A9210F' },
            700: { value: '#831A0C' },
            800: { value: '#5C130A' },
            900: { value: '#380B05' },
          },
          paper: {
            50: { value: '#FBF6F0' },
            100: { value: '#F5EDE3' },
            200: { value: '#E9DDCE' },
            300: { value: '#D8C7B2' },
            400: { value: '#B5A08A' },
            500: { value: '#8A7663' },
            600: { value: '#665748' },
            700: { value: '#473B30' },
            800: { value: '#2E2621' },
            900: { value: '#1A1512' },
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
          tight: { value: '1.0' },
          snug: { value: '1.15' },
          normal: { value: '1.6' },
          loose: { value: '1.75' },
        },
        letterSpacings: {
          tight: { value: '-0.015em' },
          normal: { value: '0' },
          wide: { value: '0.06em' },
          wider: { value: '0.12em' },
          widest: { value: '0.18em' },
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
            value: { base: '{colors.paper.50}', _light: '{colors.paper.50}', _dark: '{colors.paper.900}' },
          },
          surface: {
            value: { base: '{colors.paper.100}', _light: '{colors.paper.100}', _dark: '{colors.paper.800}' },
          },
          text: {
            value: { base: '{colors.paper.900}', _light: '{colors.paper.900}', _dark: '{colors.paper.50}' },
          },
          textMuted: {
            value: { base: '{colors.paper.500}', _light: '{colors.paper.500}', _dark: '{colors.paper.400}' },
          },
          accent: {
            value: { base: '{colors.ink.500}', _light: '{colors.ink.500}', _dark: '{colors.ink.400}' },
          },
          accentDark: {
            value: { base: '{colors.ink.600}', _light: '{colors.ink.600}', _dark: '{colors.ink.500}' },
          },
          border: {
            value: { base: '{colors.paper.300}', _light: '{colors.paper.300}', _dark: '{colors.paper.700}' },
          },
        },
      },
    },
  },
})