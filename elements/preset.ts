import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  conditions: {
    extend: {
      _light: '[data-color-mode=light] &',
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          neutral: {
            50: { value: '#EEF2F8' },
            100: { value: '#DCE4EE' },
            200: { value: '#BECDD9' },
            300: { value: '#93A8BC' },
            400: { value: '#6A85A0' },
            500: { value: '#4B6478' },
            600: { value: '#344D62' },
            700: { value: '#1F3346' },
            800: { value: '#131F2E' },
            900: { value: '#0A1319' },
          },
          accent: {
            light: { value: '#C9D97A' },
            DEFAULT: { value: '#A8C040' },
            dark: { value: '#7A9022' },
          },
          seafoam: {
            light: { value: '#7EC8B8' },
            DEFAULT: { value: '#4AA494' },
            dark: { value: '#2C7064' },
          },
        },
        fonts: {
          heading: { value: '"Space Grotesk", sans-serif' },
          body: { value: '"DM Sans", sans-serif' },
        },
        fontSizes: {
          '2xs': { value: '7px' },
          xs: { value: '9px' },
          sm: { value: '12px' },
          base: { value: '16px' },
          md: { value: '21px' },
          lg: { value: '28px' },
          xl: { value: '37px' },
          '2xl': { value: '50px' },
        },
        lineHeights: {
          tight: { value: '1.05' },
          snug: { value: '1.20' },
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
        spacing: {
          0: { value: '0px' },
          1: { value: '4px' },
          2: { value: '8px' },
          3: { value: '12px' },
          4: { value: '16px' },
          5: { value: '20px' },
          6: { value: '24px' },
          7: { value: '28px' },
          8: { value: '32px' },
          9: { value: '36px' },
          10: { value: '40px' },
          12: { value: '48px' },
          16: { value: '64px' },
          24: { value: '96px' },
        },
        shadows: {
          cell: { value: '0 2px 4px rgba(8, 18, 26, 0.7), 0 6px 16px rgba(8, 18, 26, 0.45)' },
          none: { value: 'none' },
        },
        radii: {
          none: { value: '0px' },
          sm: { value: '2px' },
        },
      },
      semanticTokens: {
        colors: {
          bg: { value: { base: '#111C28', _light: '{colors.neutral.50}' } },
          bgCard: { value: { base: '#192535', _light: '#FFFFFF' } },
          bgOverlay: { value: { base: '#0E1720', _light: '{colors.neutral.100}' } },
          text: { value: { base: '{colors.neutral.50}', _light: '{colors.neutral.700}' } },
          textSecondary: { value: { base: '{colors.neutral.300}', _light: '{colors.neutral.600}' } },
          textMuted: { value: { base: '{colors.neutral.500}', _light: '{colors.neutral.400}' } },
          accent: { value: '{colors.accent.DEFAULT}' },
          accentLight: { value: '{colors.accent.light}' },
          accentDark: { value: '{colors.accent.dark}' },
          accentGlow: { value: 'rgba(168, 192, 64, 0.10)' },
          seafoam: { value: '{colors.seafoam.DEFAULT}' },
          seafoamLight: { value: '{colors.seafoam.light}' },
          seafoamDark: { value: '{colors.seafoam.dark}' },
          seafoamGlow: { value: 'rgba(74, 164, 148, 0.10)' },
          border: { value: { base: '{colors.neutral.600}', _light: '{colors.neutral.300}' } },
          borderMuted: { value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' } },
        },
      },
    },
  },
  globalCss: {
    '*': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
    html: {
      colorScheme: 'dark light',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      color: 'text',
      backgroundColor: 'bg',
      transition: 'background-color 200ms ease, color 200ms ease',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: 'textSecondary',
    },
    button: {
      fontFamily: 'body',
      fontSize: 'base',
      cursor: 'pointer',
      transition: 'all 150ms ease',
    },
    'input, textarea, select': {
      fontFamily: 'body',
      fontSize: 'base',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: '600',
      lineHeight: 'tight',
    },
  },
})