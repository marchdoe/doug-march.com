import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      borderRadius: '0',
      boxShadow: 'none',
    },
    'html': {
      colorScheme: 'dark light',
    },
    'body': {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      backgroundColor: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: '700',
      lineHeight: 'tight',
      margin: '0',
      padding: '0',
    },
    'p, ul, ol, li': {
      margin: '0',
      padding: '0',
    },
    'a': {
      color: 'text',
      textDecoration: 'none',
      transition: 'color 0.2s ease, text-decoration 0.2s ease',
      '&:hover': {
        color: 'accent',
        textDecoration: 'underline',
      },
    },
    'button': {
      fontFamily: 'body',
      cursor: 'pointer',
      borderRadius: '2px',
      border: '1px solid {colors.border}',
      backgroundColor: 'surface',
      color: 'text',
      padding: '{spacing.sm} {spacing.md}',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'accent',
        color: 'bg',
        borderColor: 'accent',
      },
    },
    'hr': {
      height: '1px',
      backgroundColor: 'border',
      border: 'none',
      margin: '0',
    },
  },

  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: '#F6F3F0' },
          100: { value: '#EDE8E3' },
          200: { value: '#D5CEC7' },
          300: { value: '#AFA59C' },
          400: { value: '#8B8079' },
          500: { value: '#625A53' },
          600: { value: '#443D37' },
          700: { value: '#2A2420' },
          800: { value: '#181310' },
          900: { value: '#0D0A08' },
        },
        accent: {
          light: { value: '#E8906A' },
          DEFAULT: { value: '#C95220' },
          dark: { value: '#8C3410' },
          glow: { value: 'rgba(201, 82, 32, 0.1)' },
        },
        sand: {
          value: '#C9A87C',
        },
      },
      fonts: {
        body: { value: '"Work Sans", sans-serif' },
        heading: { value: 'Syne, sans-serif' },
      },
      fontSizes: {
        '2xs': { value: '7px' },
        xs: { value: '9px' },
        sm: { value: '12px' },
        base: { value: '16px' },
        md: { value: '21px' },
        lg: { value: '28px' },
        xl: { value: '37px' },
        '2xl': { value: '49px' },
        display: { value: 'clamp(72px, 11vw, 120px)' },
      },
      lineHeights: {
        tight: { value: '1.0' },
        snug: { value: '1.15' },
        normal: { value: '1.65' },
        loose: { value: '1.85' },
      },
      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.09em' },
        widest: { value: '0.15em' },
      },
      spacing: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '16px' },
        lg: { value: '24px' },
        xl: { value: '32px' },
        '2xl': { value: '48px' },
        '3xl': { value: '64px' },
        '4xl': { value: '96px' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: '{colors.neutral.900}',
        },
        surface: {
          value: '{colors.neutral.800}',
        },
        text: {
          value: '#F0EAE3',
        },
        textSecondary: {
          value: '{colors.neutral.300}',
        },
        textMuted: {
          value: '{colors.neutral.500}',
        },
        border: {
          value: '{colors.neutral.700}',
        },
        accent: {
          value: '{colors.accent.DEFAULT}',
        },
        accentLight: {
          value: '{colors.accent.light}',
        },
        accentDark: {
          value: '{colors.accent.dark}',
        },
        accentGlow: {
          value: '{colors.accent.glow}',
        },
        sand: {
          value: '{colors.sand}',
        },
      },
    },
  },
})