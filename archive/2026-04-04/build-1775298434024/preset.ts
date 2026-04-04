import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
    html: {
      fontSize: '16px',
      scrollBehavior: 'smooth',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      color: 'text',
      backgroundColor: 'bg',
      letterSpacing: 'wide',
      fontWeight: '400',
      transition: 'all 180ms ease',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'serif',
      fontWeight: '700',
      lineHeight: 'snug',
      letterSpacing: 'normal',
      margin: '0',
    },
    'h1': {
      fontSize: '2xl',
    },
    'h2': {
      fontSize: 'lg',
    },
    'h3': {
      fontSize: 'md',
    },
    'p': {
      margin: '0 0 1em 0',
      lineHeight: 'normal',
    },
    'a': {
      color: 'text',
      textDecoration: 'none',
      borderBottom: '1px solid',
      borderColor: 'accent',
      transition: 'all 140ms ease',
      _hover: {
        color: '{colors.neutral.700}',
      },
    },
    'button': {
      fontFamily: 'body',
      fontSize: 'xs',
      fontWeight: '600',
      padding: '12px 28px',
      borderRadius: 'full',
      border: 'none',
      backgroundColor: 'accent',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 140ms ease',
      _hover: {
        backgroundColor: 'accent-dark',
      },
    },
    'hr': {
      border: 'none',
      borderTop: '1px solid',
      borderColor: 'border',
      margin: '64px 0',
    },
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'bg',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'border',
      borderRadius: 'xs',
      _hover: {
        backgroundColor: '{colors.neutral.300}',
      },
    },
  },

  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: '#FAFAF4' },
          100: { value: '#F4F1E8' },
          200: { value: '#E5DFC8' },
          300: { value: '#C8BFA0' },
          400: { value: '#A69B82' },
          500: { value: '#7A7060' },
          600: { value: '#574E3F' },
          700: { value: '#3A3228' },
          800: { value: '#211C14' },
          900: { value: '#120D09' },
        },
        accent: {
          light: { value: '#BBD4A4' },
          default: { value: '#6A9D51' },
          dark: { value: '#3E6A2A' },
          glow: { value: '#6A9D5114' },
        },
      },
      fonts: {
        serif: { value: '"Playfair Display", serif' },
        body: { value: '"Source Sans 3", sans-serif' },
      },
      fontSizes: {
        '2xs': { value: '10px' },
        xs: { value: '13px' },
        sm: { value: '16px' },
        base: { value: '20px' },
        md: { value: '25px' },
        lg: { value: '31px' },
        xl: { value: '39px' },
        '2xl': { value: '49px' },
        display: { value: 'clamp(64px, 9vw, 110px)' },
      },
      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.2' },
        normal: { value: '1.65' },
        loose: { value: '1.85' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },
      spacing: {
        4: { value: '4px' },
        8: { value: '8px' },
        16: { value: '16px' },
        24: { value: '24px' },
        28: { value: '28px' },
        32: { value: '32px' },
        48: { value: '48px' },
        64: { value: '64px' },
        96: { value: '96px' },
        112: { value: '112px' },
        120: { value: '120px' },
      },
      radii: {
        xs: { value: '3px' },
        sm: { value: '6px' },
        full: { value: '28px' },
      },
      sizes: {
        full: { value: '100%' },
        screen: { value: '100vw' },
        screenHeight: { value: '100vh' },
      },
      durations: {
        fast: { value: '140ms' },
        base: { value: '180ms' },
      },
    },

    semanticTokens: {
      colors: {
        bg: { value: '{colors.neutral.100}' },
        text: { value: '{colors.neutral.800}' },
        'text-secondary': { value: '{colors.neutral.600}' },
        'text-muted': { value: '{colors.neutral.500}' },
        'text-disabled': { value: '{colors.neutral.300}' },
        border: { value: '{colors.neutral.200}' },
        'card-bg': { value: '{colors.neutral.50}' },
        accent: { value: '{colors.accent.default}' },
        'accent-light': { value: '{colors.accent.light}' },
        'accent-dark': { value: '{colors.accent.dark}' },
        'accent-glow': { value: '{colors.accent.glow}' },
      },
    },
  },

  conditions: {
    light: '&:not([data-color-mode="dark"])',
    dark: '&[data-color-mode="dark"]',
  },
})