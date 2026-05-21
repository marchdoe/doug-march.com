import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
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
      padding: '0',
      lineHeight: 'tight',
    },
    'p': {
      margin: '0',
      padding: '0',
    },
    '*': {
      boxSizing: 'border-box',
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
        crimson: {
          '50': { value: '#FFF0F2' },
          '100': { value: '#FFD5DB' },
          '200': { value: '#FFB0BC' },
          '300': { value: '#FF7F97' },
          '400': { value: '#F54D6E' },
          '500': { value: '#DC1F3E' },
          '600': { value: '#B01530' },
          '700': { value: '#840C23' },
          '800': { value: '#580616' },
          '900': { value: '#2C030B' },
        },
        ink: {
          '50': { value: '#F5EEF0' },
          '100': { value: '#E6D5DA' },
          '200': { value: '#C4A5AE' },
          '300': { value: '#9E7580' },
          '400': { value: '#7A5260' },
          '500': { value: '#5C3442' },
          '600': { value: '#421A28' },
          '700': { value: '#2C0E1A' },
          '800': { value: '#1A060F' },
          '900': { value: '#0D0307' },
        },
      },
      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '5': { value: '24px' },
        '6': { value: '32px' },
        '7': { value: '48px' },
        '8': { value: '64px' },
        '9': { value: '96px' },
        '10': { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.88' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.12em' },
        widest: { value: '0.22em' },
      },
      radii: {
        none: { value: '0px' },
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
          value: '{colors.ink.900}',
        },
        bgCard: {
          value: '{colors.ink.800}',
        },
        bgSidebar: {
          value: '{colors.ink.900}',
        },
        text: {
          value: '{colors.ink.50}',
        },
        textSecondary: {
          value: '{colors.ink.200}',
        },
        textMuted: {
          value: '{colors.ink.400}',
        },
        accent: {
          value: '{colors.crimson.400}',
        },
        accentLight: {
          value: '{colors.crimson.300}',
        },
        accentDark: {
          value: '{colors.crimson.600}',
        },
        accentGlow: {
          value: '{colors.crimson.200}',
        },
        border: {
          value: '{colors.ink.700}',
        },
        borderAccent: {
          value: '{colors.crimson.700}',
        },
      },
    },
  },
})