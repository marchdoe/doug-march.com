import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'html, body': {
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accent',
      textDecoration: 'underline',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    p: {
      margin: '0',
    },
  },

  conditions: {
    extend: {
      _light: '[data-color-mode=light] &, .light &',
      _dark: '[data-color-mode=dark] &, .dark &',
      _hover: '&:hover',
    },
  },

  theme: {
    tokens: {
      colors: {
        red: {
          50: { value: '#FEF5F4' },
          100: { value: '#FFE4E0' },
          200: { value: '#FFBDB5' },
          300: { value: '#FF8070' },
          400: { value: '#FF5A4A' },
          500: { value: '#E8351E' },
          600: { value: '#CC1E0B' },
          700: { value: '#A01508' },
          800: { value: '#6E0C04' },
          900: { value: '#3A0602' },
        },
        stone: {
          50: { value: '#FAFAF8' },
          100: { value: '#F4F3F0' },
          200: { value: '#E8E6E0' },
          300: { value: '#D0CCC4' },
          400: { value: '#A8A39C' },
          500: { value: '#7A756E' },
          600: { value: '#565048' },
          700: { value: '#3A3530' },
          800: { value: '#252220' },
          900: { value: '#131210' },
        },
      },
      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },
      lineHeights: {
        tight: { value: '0.88' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },
      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.08em' },
        widest: { value: '0.15em' },
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
        bgCard: {
          value: {
            base: '{colors.stone.100}',
            _dark: '{colors.stone.800}',
          },
        },
        bgSidebar: {
          value: {
            base: '{colors.stone.100}',
            _dark: '{colors.stone.800}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.900}',
            _dark: '{colors.stone.50}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.stone.600}',
            _dark: '{colors.stone.300}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.stone.400}',
            _dark: '{colors.stone.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.red.600}',
            _dark: '{colors.red.400}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.red.100}',
            _dark: '{colors.red.900}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.700}',
          },
        },
      },
    },
  },
})