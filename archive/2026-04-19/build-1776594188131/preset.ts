import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    html: {
      backgroundColor: 'bg',
      color: 'text',
    },
    body: {
      backgroundColor: 'bg',
      color: 'text',
      lineHeight: 'normal',
      fontWeight: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'text',
      lineHeight: 'snug',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 180ms ease-out',
    },
    'a:hover': {
      color: 'accent-dark',
      textDecoration: 'underline',
    },
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          '50': { value: '#FAF6F3' },
          '100': { value: '#F3EDE8' },
          '200': { value: '#E4D9D0' },
          '300': { value: '#C8B5A8' },
          '400': { value: '#A89080' },
          '500': { value: '#7A6558' },
          '600': { value: '#5C4A3E' },
          '700': { value: '#3E3028' },
          '800': { value: '#231C16' },
          '900': { value: '#130F0B' },
        },
        sage: {
          light: { value: '#8DBBA0' },
          DEFAULT: { value: '#4E8C6A' },
          dark: { value: '#2D6248' },
          glow: { value: '#4E8C6A14' },
        },
      },

      spacing: {
        '4': { value: '4px' },
        '8': { value: '8px' },
        '16': { value: '16px' },
        '24': { value: '24px' },
        '32': { value: '32px' },
        '48': { value: '48px' },
        '64': { value: '64px' },
        '96': { value: '96px' },
      },

      lineHeights: {
        tight: { value: '1' },
        snug: { value: '1.15' },
        normal: { value: '1.65' },
        loose: { value: '1.9' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.09em' },
        widest: { value: '0.14em' },
      },

      fontWeights: {
        thin: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
        black: { value: '800' },
      },

      radii: {
        none: { value: '0px' },
        tight: { value: '3px' },
        base: { value: '4px' },
        card: { value: '6px' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.50}',
            _dark: '{colors.stone.900}',
          },
        },
        'bg-card': {
          value: {
            base: '{colors.stone.100}',
            _dark: '{colors.stone.800}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.700}',
            _dark: '{colors.stone.50}',
          },
        },
        'text-secondary': {
          value: {
            base: '{colors.stone.600}',
            _dark: '{colors.stone.200}',
          },
        },
        'text-muted': {
          value: {
            base: '{colors.stone.500}',
            _dark: '{colors.stone.300}',
          },
        },
        'text-placeholder': {
          value: {
            base: '{colors.stone.400}',
            _dark: '{colors.stone.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.sage.DEFAULT}',
            _dark: '{colors.sage.light}',
          },
        },
        'accent-light': {
          value: {
            base: '{colors.sage.light}',
            _dark: '{colors.sage.light}',
          },
        },
        'accent-dark': {
          value: {
            base: '{colors.sage.dark}',
            _dark: '{colors.sage.dark}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.600}',
          },
        },
      },
    },
  },
})