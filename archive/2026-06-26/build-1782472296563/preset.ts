import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: 'tight',
    },
    p: {
      margin: '0',
      padding: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
    },
    '*': {
      boxSizing: 'border-box',
    },
    '::selection': {
      backgroundColor: 'accent',
      color: 'bg',
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
        cerulean: {
          50: { value: '#E5F5FB' },
          100: { value: '#C0E7F5' },
          200: { value: '#87CEEA' },
          300: { value: '#3FB4DB' },
          400: { value: '#0C9DC7' },
          500: { value: '#007BA3' },
          600: { value: '#005E82' },
          700: { value: '#004263' },
          800: { value: '#002844' },
          900: { value: '#001528' },
        },
        ink: {
          50: { value: '#EBF2F6' },
          100: { value: '#D2E2EC' },
          200: { value: '#A9C5D8' },
          300: { value: '#7EA5BC' },
          400: { value: '#5787A0' },
          500: { value: '#3B6880' },
          600: { value: '#294E63' },
          700: { value: '#1A3648' },
          800: { value: '#0E2030' },
          900: { value: '#07111C' },
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
        tight: { value: '0.92' },
        snug: { value: '1.2' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },
      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.10em' },
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
        bold: { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        bgCard: {
          value: { base: '{colors.ink.800}', _light: '{colors.cerulean.50}' },
        },
        bgSidebar: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.50}', _light: '{colors.ink.900}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.200}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.400}', _light: '{colors.ink.500}' },
        },
        accent: {
          value: { base: '{colors.cerulean.300}', _light: '{colors.cerulean.500}' },
        },
        accentLight: {
          value: { base: '{colors.cerulean.200}', _light: '{colors.cerulean.400}' },
        },
        accentDark: {
          value: { base: '{colors.cerulean.400}', _light: '{colors.cerulean.600}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderAccent: {
          value: { base: '{colors.cerulean.700}', _light: '{colors.cerulean.300}' },
        },
      },
    },
  },
})