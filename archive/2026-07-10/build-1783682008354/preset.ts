import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
      lineHeight: '1.55',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
      textDecorationColor: 'accent',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'semibold',
      margin: '0',
    },
    p: {
      margin: '0',
    },
    '::selection': {
      backgroundColor: 'accent',
      color: 'bg',
    },
  },

  conditions: {
    _light: '[data-theme=light] &, .light &',
    _dark: '[data-theme=dark] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        yellow: {
          50:  { value: '#FDFFF0' },
          100: { value: '#F5FFD6' },
          200: { value: '#EEFF9E' },
          300: { value: '#E2F56A' },
          400: { value: '#E8F200' },
          500: { value: '#D8E500' },
          600: { value: '#B2BE00' },
          700: { value: '#8E9700' },
          800: { value: '#606600' },
          900: { value: '#333800' },
        },
        stone: {
          50:  { value: '#FAFAF5' },
          100: { value: '#F5F3E8' },
          200: { value: '#E8E5D4' },
          300: { value: '#CBC6B2' },
          400: { value: '#9E9888' },
          500: { value: '#6E6858' },
          600: { value: '#4E4A3C' },
          700: { value: '#342F24' },
          800: { value: '#1E1912' },
          900: { value: '#120E06' },
        },
        cream: {
          100: { value: '#F8F0DC' },
          200: { value: '#F0E3C0' },
          300: { value: '#E5D09A' },
          400: { value: '#D4B870' },
          500: { value: '#B89040' },
        },
      },
      spacing: {
        1:  { value: '4px' },
        2:  { value: '8px' },
        3:  { value: '12px' },
        4:  { value: '16px' },
        5:  { value: '24px' },
        6:  { value: '32px' },
        7:  { value: '48px' },
        8:  { value: '64px' },
        9:  { value: '96px' },
        10: { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.9' },
        snug:   { value: '1.15' },
        base:   { value: '1.55' },
        loose:  { value: '1.8' },
      },
      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.15em' },
      },
      radii: {
        none: { value: '0px' },
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
        bold:     { value: '700' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base:   '{colors.stone.900}',
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base:   '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        bgSidebar: {
          value: {
            base:   '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        text: {
          value: {
            base:   '{colors.cream.100}',
            _light: '{colors.stone.900}',
          },
        },
        textSecondary: {
          value: {
            base:   '{colors.stone.400}',
            _light: '{colors.stone.600}',
          },
        },
        textMuted: {
          value: {
            base:   '{colors.stone.500}',
            _light: '{colors.stone.400}',
          },
        },
        accent: {
          value: {
            base:   '{colors.yellow.500}',
            _light: '{colors.yellow.600}',
          },
        },
        accentLight: {
          value: {
            base:   '{colors.yellow.400}',
            _light: '{colors.yellow.500}',
          },
        },
        accentGlow: {
          value: {
            base:   '{colors.yellow.200}',
            _light: '{colors.yellow.300}',
          },
        },
        border: {
          value: {
            base:   '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
      },
    },
  },
})