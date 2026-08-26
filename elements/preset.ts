import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: 'bg',
      color: 'text',
    },
    body: {
      fontFamily: 'body',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*': {
      boxSizing: 'border-box',
      borderColor: 'border',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontWeight: 'bold',
      color: 'text',
      textWrap: 'balance',
    },
    p: {
      margin: 0,
      textWrap: 'pretty',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    'a:hover': {
      color: '{colors.amber.200}',
    },
    'ul, ol': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    '::selection': {
      backgroundColor: '{colors.amber.400}',
      color: '{colors.neutral.900}',
    },
    'table': {
      borderCollapse: 'collapse',
      fontVariantNumeric: 'tabular-nums',
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
        amber: {
          50: { value: '#FFF6E0' },
          100: { value: '#FFE8B0' },
          200: { value: '#FFD873' },
          300: { value: '#FFC94D' },
          400: { value: '#FFB020' },
          500: { value: '#F59E0B' },
          600: { value: '#D1850A' },
          700: { value: '#A8690A' },
          800: { value: '#7A4C08' },
          900: { value: '#4A2E05' },
        },
        neutral: {
          50: { value: '#FBF7EF' },
          100: { value: '#F2E8D5' },
          200: { value: '#E3CFA8' },
          300: { value: '#CBAE79' },
          400: { value: '#A8875B' },
          500: { value: '#82663F' },
          600: { value: '#5F4B2E' },
          700: { value: '#423323' },
          800: { value: '#251C13' },
          900: { value: '#120D08' },
        },
        rust: {
          400: { value: '#C1573D' },
        },
        moss: {
          400: { value: '#6B8F71' },
        },
      },
      spacing: {
        4: { value: '4px' },
        8: { value: '8px' },
        16: { value: '16px' },
        24: { value: '24px' },
        32: { value: '32px' },
        48: { value: '48px' },
        64: { value: '64px' },
        96: { value: '96px' },
        128: { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.92' },
        snug: { value: '1.15' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.02em' },
        wider: { value: '0.05em' },
        widest: { value: '0.12em' },
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
        bg: { value: '{colors.neutral.900}' },
        bgSubtle: { value: '#1C140C' },
        bgSidebar: { value: '#171009' },
        text: { value: '#F5ECDA' },
        textSecondary: { value: '{colors.neutral.300}' },
        textMuted: { value: '{colors.neutral.400}' },
        accent: { value: '{colors.amber.400}' },
        accentLight: { value: '{colors.amber.200}' },
        accentDark: { value: '{colors.amber.700}' },
        accentGlow: { value: '#FFDD99' },
        border: { value: '{colors.neutral.700}' },
        success: { value: '{colors.moss.400}' },
        danger: { value: '{colors.rust.400}' },
      },
    },
  },
})