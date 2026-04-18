import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: '#F4F5EE' },
          100: { value: '#E8EADB' },
          200: { value: '#D1D5BE' },
          300: { value: '#A9B091' },
          400: { value: '#7F886D' },
          500: { value: '#596249' },
          600: { value: '#3D4432' },
          700: { value: '#262B1D' },
          800: { value: '#151810' },
          900: { value: '#0B0D08' },
        },

        accent: {
          light: { value: '#BCDA74' },
          DEFAULT: { value: '#6E9E2A' },
          dark: { value: '#4B6B1C' },
          glow: { value: 'rgba(110, 158, 42, 0.09)' },
        },

        signal: {
          amber: { value: '#B47830' },
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
        80: { value: '80px' },
        96: { value: '96px' },
        120: { value: '120px' },
      },

      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },

      lineHeights: {
        tight: { value: '1.0' },
        snug: { value: '1.15' },
        normal: { value: '1.58' },
        loose: { value: '1.85' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.13em' },
      },

      radii: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '12px' },
        lg: { value: '16px' },
        full: { value: '24px' },
      },

      shadows: {
        sm: { value: '0 2px 14px rgba(38, 43, 29, 0.06)' },
        md: { value: '0 4px 24px rgba(38, 43, 29, 0.10)' },
      },

      zIndex: {
        nav: { value: '100' },
      },
    },

    semanticTokens: {
      colors: {
        bg: { value: '{colors.neutral.50}' },
        'bg.card': { value: '{colors.neutral.50}' },
        'bg.frame': { value: '#EDEFD9' },
        'bg.frame.hover': { value: '#E4E6CC' },
        'bg.accent.light': { value: '{colors.accent.glow}' },

        text: { value: '{colors.neutral.700}' },
        'text.secondary': { value: '{colors.neutral.500}' },
        'text.muted': { value: '{colors.neutral.400}' },
        'text.on-accent': { value: '{colors.neutral.50}' },

        accent: { value: '{colors.accent.DEFAULT}' },
        'accent.hover': { value: '{colors.accent.dark}' },
        'accent.light': { value: '{colors.accent.light}' },

        border: { value: '{colors.neutral.200}' },
        'border.hover': { value: '{colors.neutral.300}' },

        'signal.tigers': { value: '{colors.signal.amber}' },
      },
    },
  },

  globalCss: {
    html: {
      fontSize: '16px',
    },

    body: {
      fontFamily: 'Outfit, sans-serif',
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },

    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'Fraunces, serif',
      lineHeight: 'tight',
      fontWeight: 'normal',
    },

    a: {
      color: 'text.secondary',
      textDecoration: 'none',
      transition: 'color 200ms ease-out',
    },

    'a:hover': {
      color: 'accent',
    },

    'button, [role="button"]': {
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 'medium',
      borderRadius: 'full',
      cursor: 'pointer',
      transition: 'background-color 200ms ease-out, color 200ms ease-out',
    },

    nav: {
      position: 'sticky',
      top: '0',
      zIndex: 'nav',
      background: 'bg',
      backdropFilter: 'blur(8px)',
    },
  },

  conditions: {
    light: '[data-color-mode=light]',
    dark: '[data-color-mode=dark]',
  },
})