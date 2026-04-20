import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    html: {
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'text',
      lineHeight: 'snug',
      margin: '0',
      padding: '0',
      fontWeight: 'semibold',
    },
    'p': {
      margin: '0',
      padding: '0',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'color 180ms ease',
    },
    'a:hover': {
      color: 'text-secondary',
    },
  },

  theme: {
    tokens: {
      colors: {
        sage: {
          50: { value: '#F2F6F4' },
          100: { value: '#E2EDE9' },
          200: { value: '#C4D9D3' },
          300: { value: '#97BAB2' },
          400: { value: '#6B9B92' },
          500: { value: '#487870' },
          600: { value: '#324F4A' },
          700: { value: '#1D2E2C' },
          800: { value: '#111A18' },
          900: { value: '#080E0D' },
        },
        clay: {
          light: { value: '#EAA882' },
          default: { value: '#C05828' },
          dark: { value: '#8A3518' },
        },
        'off-white': { value: '#FAFCFB' },
        transparent: { value: 'transparent' },
      },
      spacing: {
        4: { value: '4px' },
        8: { value: '8px' },
        16: { value: '16px' },
        24: { value: '24px' },
        32: { value: '32px' },
        40: { value: '40px' },
        48: { value: '48px' },
        56: { value: '56px' },
        64: { value: '64px' },
        72: { value: '72px' },
        80: { value: '80px' },
        96: { value: '96px' },
        128: { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.90' },
        snug: { value: '1.10' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },
      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '-0.01em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
        md: { value: '4px' },
        lg: { value: '8px' },
      },
      shadows: {
        subtle: { value: '0 1px 3px rgba(13, 22, 20, 0.05), 0 3px 10px rgba(13, 22, 20, 0.04)' },
      },
    },

    semanticTokens: {
      colors: {
        bg: { value: '{colors.sage.50}' },
        'bg-secondary': { value: '{colors.sage.100}' },
        'bg-card': { value: '{colors.off-white}' },
        'bg-footer': { value: '{colors.sage.700}' },
        text: { value: '{colors.sage.700}' },
        'text-secondary': { value: '{colors.sage.600}' },
        'text-muted': { value: '{colors.sage.400}' },
        'text-footer': { value: '{colors.sage.50}' },
        accent: { value: '{colors.clay.default}' },
        'accent-light': { value: '{colors.clay.light}' },
        'accent-dark': { value: '{colors.clay.dark}' },
        'accent-glow': { value: 'rgba(192, 88, 40, 0.08)' },
        border: { value: '{colors.sage.200}' },
        'border-subtle': { value: '{colors.sage.100}' },
      },
    },
  },
})