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
      WebkitTextSizeAdjust: '100%',
      textSizeAdjust: '100%',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontKerning: 'normal',
      fontOpticalSizing: 'auto',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      lineHeight: 'tight',
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'p': {
      textWrap: 'pretty',
    },
    '::selection': {
      background: '{colors.neutral.900}',
      color: '{colors.primary.400}',
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
        primary: {
          50: { value: '#FFFCEB' },
          100: { value: '#FFF3C4' },
          200: { value: '#FFE896' },
          300: { value: '#FFD84D' },
          400: { value: '#FFC400' },
          500: { value: '#EBB000' },
          600: { value: '#C08E00' },
          700: { value: '#8F6900' },
          800: { value: '#5E4500' },
          900: { value: '#332500' },
        },
        neutral: {
          50: { value: '#FAF8F1' },
          100: { value: '#F1EEE2' },
          200: { value: '#E0DBC9' },
          300: { value: '#C6BFA6' },
          400: { value: '#A39B7E' },
          500: { value: '#7C745A' },
          600: { value: '#5A5340' },
          700: { value: '#40392A' },
          800: { value: '#29241A' },
          900: { value: '#16130A' },
        },
        accent: {
          light: { value: '#FFD84D' },
          default: { value: '#FFC400' },
          dark: { value: '#C08E00' },
          glow: { value: 'rgba(255,196,0,0.55)' },
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
        tight: { value: '0.82' },
        snug: { value: '1.0' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.01em' },
        normal: { value: '0' },
        wide: { value: '0.05em' },
        wider: { value: '0.1em' },
        widest: { value: '0.16em' },
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
          value: { base: '{colors.primary.400}', _light: '{colors.primary.400}' },
        },
        surface: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },
        surfaceText: {
          value: { base: '{colors.primary.400}', _light: '{colors.primary.400}' },
        },
        text: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.700}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.600}', _light: '{colors.neutral.600}' },
        },
        accent: {
          value: { base: '{colors.primary.600}', _light: '{colors.primary.600}' },
        },
        onAccent: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },
        border: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },
      },
    },
  },
})