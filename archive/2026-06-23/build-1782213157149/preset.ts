import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      '&:hover': {
        color: 'accentBright',
      },
    },
    'p, li': {
      lineHeight: 'normal',
    },
    blockquote: {
      borderLeft: '3px solid',
      borderColor: 'accent',
      paddingLeft: '3',
      fontStyle: 'italic',
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
    'button, input, select, textarea': {
      fontFamily: 'inherit',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        rose: {
          50:  { value: '#FFF0F5' },
          100: { value: '#FFD6E7' },
          200: { value: '#FFB3D1' },
          300: { value: '#FF8ABF' },
          400: { value: '#FF5599' },
          500: { value: '#FF2878' },
          600: { value: '#D4005C' },
          700: { value: '#A30047' },
          800: { value: '#720033' },
          900: { value: '#420020' },
        },
        ink: {
          50:  { value: '#FDF5F7' },
          100: { value: '#F5E8ED' },
          200: { value: '#E8D0D8' },
          300: { value: '#C8A8B5' },
          400: { value: '#A07A8A' },
          500: { value: '#7A5563' },
          600: { value: '#5A3A46' },
          700: { value: '#3D2130' },
          800: { value: '#240E1B' },
          900: { value: '#0F0308' },
        },
      },

      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '16px' },
        4: { value: '24px' },
        5: { value: '32px' },
        6: { value: '48px' },
        7: { value: '64px' },
        8: { value: '96px' },
        9: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.15' },
        normal: { value: '1.65' },
        loose:  { value: '1.85' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.14em' },
      },

      radii: {
        none: { value: '0' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light:    { value: '300' },
        normal:   { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        cardBg: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        sidebarBg: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.100}', _light: '{colors.ink.800}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.300}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.400}', _light: '{colors.ink.500}' },
        },
        accent: {
          value: { base: '{colors.rose.500}', _light: '{colors.rose.600}' },
        },
        accentBright: {
          value: { base: '{colors.rose.400}', _light: '{colors.rose.500}' },
        },
        accentDark: {
          value: { base: '{colors.rose.700}', _light: '{colors.rose.800}' },
        },
        accentGlow: {
          value: { base: '{colors.rose.300}', _light: '{colors.rose.200}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderAccent: {
          value: { base: '{colors.rose.800}', _light: '{colors.rose.200}' },
        },
      },
    },
  },
})