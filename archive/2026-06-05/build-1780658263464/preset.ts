import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: '1.6',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'h1, h2, h3': {
      lineHeight: '0.92',
      letterSpacing: '-0.03em',
    },
    'h4, h5, h6': {
      lineHeight: '1.1',
      letterSpacing: '-0.01em',
    },
    'p': {
      lineHeight: '1.6',
    },
    '::selection': {
      background: 'accentGlow',
      color: 'text',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        teal: {
          '50': { value: '#E8FAF2' },
          '100': { value: '#C5F0DD' },
          '200': { value: '#8CD9BA' },
          '300': { value: '#4EC49A' },
          '400': { value: '#14A87C' },
          '500': { value: '#008A65' },
          '600': { value: '#006D4D' },
          '700': { value: '#004F36' },
          '800': { value: '#003224' },
          '900': { value: '#001814' },
        },
        neutral: {
          '50': { value: '#F2FAF5' },
          '100': { value: '#E1F0E6' },
          '200': { value: '#C2D8C9' },
          '300': { value: '#98B8A0' },
          '400': { value: '#6A9474' },
          '500': { value: '#4A7053' },
          '600': { value: '#2E5038' },
          '700': { value: '#1A3321' },
          '800': { value: '#0D1F12' },
          '900': { value: '#060E09' },
        },
        mint: {
          '50': { value: '#ECFFF5' },
          '100': { value: '#C3FFDD' },
          '200': { value: '#82FFBB' },
          '300': { value: '#38F094' },
          '400': { value: '#00D972' },
          '500': { value: '#00B85A' },
          '600': { value: '#009044' },
          '700': { value: '#006830' },
          '800': { value: '#00421E' },
          '900': { value: '#001F0D' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '5': { value: '24px' },
        '6': { value: '32px' },
        '7': { value: '48px' },
        '8': { value: '64px' },
        '9': { value: '96px' },
        '10': { value: '128px' },
      },

      lineHeights: {
        tight: { value: '0.9' },
        snug: { value: '1.1' },
        normal: { value: '1.6' },
        loose: { value: '1.85' },
      },

      letterSpacings: {
        tight: { value: '-0.04em' },
        snug: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.10em' },
        widest: { value: '0.16em' },
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
        bold: { value: '700' },
        black: { value: '900' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
        bgElevated: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        bgNav: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.50}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.300}',
            _light: '{colors.neutral.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.500}',
          },
        },
        textDisabled: {
          value: {
            base: '{colors.neutral.600}',
            _light: '{colors.neutral.300}',
          },
        },
        accent: {
          value: {
            base: '{colors.teal.300}',
            _light: '{colors.teal.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.teal.200}',
            _light: '{colors.teal.500}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.teal.600}',
            _light: '{colors.teal.800}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.teal.800}',
            _light: '{colors.teal.100}',
          },
        },
        accentVivid: {
          value: {
            base: '{colors.mint.300}',
            _light: '{colors.teal.500}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.teal.700}',
            _light: '{colors.teal.200}',
          },
        },
        heroText: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.900}',
          },
        },
        heroAccent: {
          value: {
            base: '{colors.teal.300}',
            _light: '{colors.teal.500}',
          },
        },
        signalLabel: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.500}',
          },
        },
        signalValue: {
          value: {
            base: '{colors.neutral.300}',
            _light: '{colors.neutral.700}',
          },
        },
      },
    },
  },
})