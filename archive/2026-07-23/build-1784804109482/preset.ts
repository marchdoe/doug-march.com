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
      fontKerning: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    p: {
      margin: 0,
      textWrap: 'pretty',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
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
        brand: {
          50: { value: '#eceffd' },
          100: { value: '#d6ddfb' },
          200: { value: '#aebbf6' },
          300: { value: '#8296ef' },
          400: { value: '#5670e8' },
          500: { value: '#3550dd' },
          600: { value: '#2439c4' },
          700: { value: '#1e2fa0' },
          800: { value: '#1a2780' },
          900: { value: '#131a4d' },
        },
        accent: {
          50: { value: '#eef2ff' },
          100: { value: '#d3ddff' },
          200: { value: '#9db4ff' },
          300: { value: '#6d8bff' },
          400: { value: '#5673f2' },
          500: { value: '#3f5ce6' },
          600: { value: '#2f47c8' },
          700: { value: '#2437a1' },
          800: { value: '#1c2b7d' },
          900: { value: '#141d54' },
        },
        neutral: {
          50: { value: '#f6f7fc' },
          100: { value: '#eceef6' },
          200: { value: '#d6dae8' },
          300: { value: '#b3b9d1' },
          400: { value: '#868ead' },
          500: { value: '#5c6486' },
          600: { value: '#414863' },
          700: { value: '#2d3349' },
          800: { value: '#1b2036' },
          900: { value: '#0d1024' },
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
        snug: { value: '1.0' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0.01em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '4px' },
        md: { value: '10px' },
        lg: { value: '20px' },
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
          value: { base: '{colors.brand.700}', _light: '{colors.neutral.50}' },
        },
        surface: {
          value: { base: '{colors.brand.800}', _light: '#ffffff' },
        },
        surfaceQuiet: {
          value: { base: '{colors.brand.900}', _light: '{colors.neutral.100}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.200}', _light: '{colors.neutral.600}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.accent.300}', _light: '{colors.accent.500}' },
        },
        accentGlow: {
          value: { base: '{colors.accent.100}', _light: '{colors.accent.400}' },
        },
        border: {
          value: { base: '{colors.brand.500}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})