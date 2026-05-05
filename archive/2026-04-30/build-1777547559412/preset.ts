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
      minHeight: '100vh',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'opacity 0.15s ease',
    },
    'a:hover': {
      opacity: '0.8',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    p: {
      margin: '0',
    },
    '::selection': {
      backgroundColor: '#F5C42C',
      color: '#1C0640',
    },
  },

  conditions: {
    _light: '&.light, .light &',
    _dark: '&.dark, .dark &, &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        violet: {
          '50': { value: '#F7F4FF' },
          '100': { value: '#EEE6FF' },
          '200': { value: '#DCCEFF' },
          '300': { value: '#C3AAFF' },
          '400': { value: '#A880F8' },
          '500': { value: '#8C50E8' },
          '600': { value: '#6E33C4' },
          '700': { value: '#511B9A' },
          '800': { value: '#330D6E' },
          '900': { value: '#1C0640' },
        },
        gold: {
          '50': { value: '#FFFAE0' },
          '100': { value: '#FFF0A8' },
          '200': { value: '#FFE066' },
          '300': { value: '#F5C42C' },
          '400': { value: '#D9A818' },
          '500': { value: '#B88C0E' },
          '600': { value: '#967006' },
          '700': { value: '#755602' },
          '800': { value: '#543D00' },
          '900': { value: '#342500' },
        },
        neutral: {
          '50': { value: '#F9F8FC' },
          '100': { value: '#F0EEF7' },
          '200': { value: '#E2DDF0' },
          '300': { value: '#C9C2E0' },
          '400': { value: '#9C93C0' },
          '500': { value: '#726899' },
          '600': { value: '#524878' },
          '700': { value: '#38305B' },
          '800': { value: '#221A3D' },
          '900': { value: '#13102A' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '10': { value: '40px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight: { value: '0.9' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.04em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.1em' },
        widest: { value: '0.2em' },
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
            base: '#0D0A1E',
            _light: '{colors.neutral.50}',
          },
        },
        bgCard: {
          value: {
            base: '#181528',
            _light: '{colors.neutral.100}',
          },
        },
        bgElevated: {
          value: {
            base: '#221A3D',
            _light: '{colors.neutral.200}',
          },
        },
        text: {
          value: {
            base: '#F0EEFF',
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
        accent: {
          value: {
            base: '{colors.gold.300}',
            _light: '{colors.violet.600}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.gold.200}',
            _light: '{colors.violet.500}',
          },
        },
        primary: {
          value: {
            base: '{colors.violet.500}',
            _light: '{colors.violet.700}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.gold.300}',
            _light: '{colors.violet.300}',
          },
        },
      },
    },
  },
})