import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    'html': {
      scrollBehavior: 'smooth',
    },
    'body': {
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'text',
      textWrap: 'balance',
    },
    'p': {
      textWrap: 'pretty',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
      textDecorationColor: 'accent',
      opacity: '0.85',
    },
    'img': {
      maxWidth: '100%',
      display: 'block',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &, .light &',
    _dark: '[data-theme="dark"] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        amber: {
          50: { value: '#FFFBF0' },
          100: { value: '#FFF3D0' },
          200: { value: '#FFE299' },
          300: { value: '#FFCA5C' },
          400: { value: '#F5A820' },
          500: { value: '#D4780A' },
          600: { value: '#AE5A06' },
          700: { value: '#873F05' },
          800: { value: '#632C04' },
          900: { value: '#3E1A02' },
        },
        stone: {
          50: { value: '#FDFAF5' },
          100: { value: '#F5EDD9' },
          200: { value: '#E8D9BF' },
          300: { value: '#D4C19E' },
          400: { value: '#BCA57A' },
          500: { value: '#9E8458' },
          600: { value: '#7D6340' },
          700: { value: '#5C4428' },
          800: { value: '#3A2B16' },
          900: { value: '#1A0F05' },
        },
      },

      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '12px' },
        4: { value: '16px' },
        5: { value: '24px' },
        6: { value: '32px' },
        7: { value: '48px' },
        8: { value: '64px' },
        9: { value: '96px' },
        10: { value: '128px' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.2' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },

      radii: {
        none: { value: '0px' },
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
        bold: { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.100}',
            _dark: '{colors.stone.900}',
          },
        },
        'bg-card': {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.800}',
          },
        },
        'bg-sidebar': {
          value: {
            base: '{colors.stone.50}',
            _dark: '{colors.stone.800}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.900}',
            _dark: '{colors.stone.50}',
          },
        },
        'text-secondary': {
          value: {
            base: '{colors.stone.700}',
            _dark: '{colors.stone.300}',
          },
        },
        'text-muted': {
          value: {
            base: '{colors.stone.500}',
            _dark: '{colors.stone.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.amber.700}',
            _dark: '{colors.amber.400}',
          },
        },
        'accent-glow': {
          value: {
            base: '{colors.amber.500}',
            _dark: '{colors.amber.500}',
          },
        },
        'accent-light': {
          value: {
            base: '{colors.amber.300}',
            _dark: '{colors.amber.300}',
          },
        },
        'accent-dark': {
          value: {
            base: '{colors.amber.900}',
            _dark: '{colors.amber.800}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.300}',
            _dark: '{colors.stone.700}',
          },
        },
        'border-subtle': {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.800}',
          },
        },
      },
    },
  },
})