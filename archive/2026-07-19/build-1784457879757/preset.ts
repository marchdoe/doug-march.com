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
      margin: '0',
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontVariantNumeric: 'tabular-nums',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      fontWeight: 'bold',
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    p: {
      margin: '0',
      textWrap: 'pretty',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accent',
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
        primary: {
          50: { value: '#fff0f6' },
          100: { value: '#ffdbe9' },
          200: { value: '#ffb8d3' },
          300: { value: '#ff8bb6' },
          400: { value: '#ff5f9c' },
          500: { value: '#ff3d86' },
          600: { value: '#e51f6b' },
          700: { value: '#b81456' },
          800: { value: '#7d0d3b' },
          900: { value: '#470722' },
        },
        neutral: {
          50: { value: '#fbf3f6' },
          100: { value: '#f2e6ec' },
          200: { value: '#e0cbd7' },
          300: { value: '#c3a4b6' },
          400: { value: '#96738a' },
          500: { value: '#6b4d60' },
          600: { value: '#4a3242' },
          700: { value: '#31212c' },
          800: { value: '#1f131a' },
          900: { value: '#150a0f' },
        },
        accent: {
          light: { value: '#ff5f9c' },
          default: { value: '#ff3d86' },
          dark: { value: '#b81456' },
          glow: { value: 'rgba(255, 61, 134, 0.55)' },
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
        tight: { value: '0.85' },
        snug: { value: '1.2' },
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
          value: {
            base: '{colors.primary.500}',
            _light: '{colors.primary.100}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.900}',
          },
        },
        accent: {
          value: {
            base: '{colors.primary.700}',
            _light: '{colors.primary.600}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.800}',
          },
        },
        knockout: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.primary.50}',
          },
        },
        panel: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.900}',
          },
        },
      },
    },
  },
})