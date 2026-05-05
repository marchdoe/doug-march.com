import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    h1: { fontWeight: 'bold' },
    h2: { fontWeight: 'semibold' },
    h3: { fontWeight: 'semibold' },
    strong: { fontWeight: 'semibold' },
    em: { fontStyle: 'italic' },
    a: {
      color: 'accent',
      textDecoration: 'underline',
      '&:hover': {
        color: 'accentDark',
      },
    },
    code: {
      fontFamily: 'monospace',
    },
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          50: { value: '#F5FAF8' },
          100: { value: '#E8F3EF' },
          200: { value: '#CCDFD8' },
          300: { value: '#9DC0B5' },
          400: { value: '#6D9F93' },
          500: { value: '#467F72' },
          600: { value: '#2C5F53' },
          700: { value: '#1A3D33' },
          800: { value: '#0D221C' },
          900: { value: '#07140F' },
        },
        mint: {
          light: { value: '#8DCFBC' },
          DEFAULT: { value: '#2DA88A' },
          dark: { value: '#1A705C' },
          glow: { value: 'rgba(45, 168, 138, 0.1)' },
        },
        amber: {
          DEFAULT: { value: '#C4873B' },
        },
      },

      spacing: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '12px' },
        lg: { value: '16px' },
        xl: { value: '24px' },
        '2xl': { value: '32px' },
        '3xl': { value: '40px' },
        '4xl': { value: '48px' },
        '5xl': { value: '56px' },
        '6xl': { value: '64px' },
        '7xl': { value: '72px' },
        '8xl': { value: '80px' },
        '9xl': { value: '96px' },
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
        normal: { value: '1.55' },
        loose: { value: '1.82' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
      },

      radii: {
        none: { value: '0px' },
        xs: { value: '3px' },
        sm: { value: '6px' },
        lg: { value: '20px' },
        full: { value: '50%' },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
        bg: { value: '{colors.stone.50}' },
        bgPanelLeft: { value: '#F0F8F4' },
        bgPanel: { value: '{colors.stone.100}' },
        bgDark: { value: '{colors.stone.800}' },
        bgDarkAlt: { value: '{colors.stone.700}' },
        bgAccent: { value: '{colors.mint.light}' },

        // Text
        text: { value: '{colors.stone.700}' },
        textSecondary: { value: '{colors.stone.600}' },
        textMuted: { value: '{colors.stone.500}' },
        textOnDark: { value: '{colors.stone.50}' },

        // Accents
        accent: { value: '{colors.mint.DEFAULT}' },
        accentLight: { value: '{colors.mint.light}' },
        accentDark: { value: '{colors.mint.dark}' },
        secondary: { value: '{colors.amber.DEFAULT}' },

        // Borders
        border: { value: '{colors.stone.200}' },
        borderSubtle: { value: '{colors.stone.300}' },
      },
    },
  },
})