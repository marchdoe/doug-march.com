import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
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
      fontOpticalSizing: 'auto',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100dvh',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      textWrap: 'balance',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.18s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    p: {
      textWrap: 'pretty',
    },
    '::selection': {
      background: 'accentSubtle',
      color: 'text',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Primary amber scale — H:28°, concert-poster warmth, mandate-compliant
        amber: {
          50: { value: '#FFF8F0' },
          100: { value: '#FFEFD8' },
          200: { value: '#FFD9A8' },
          300: { value: '#FFB862' },
          400: { value: '#FF9330' },
          500: { value: '#E87210' },
          600: { value: '#BE5400' },
          700: { value: '#8F3D00' },
          800: { value: '#632900' },
          900: { value: '#3A1600' },
        },
        // Warm stone neutrals — amber-tinted, H:28° chroma whisper
        stone: {
          50: { value: '#FAF5EE' },
          100: { value: '#F0E8D8' },
          200: { value: '#DED0B8' },
          300: { value: '#BCA882' },
          400: { value: '#93785A' },
          500: { value: '#6C5135' },
          600: { value: '#4A3320' },
          700: { value: '#2E1D0E' },
          800: { value: '#1C1008' },
          900: { value: '#100904' },
          950: { value: '#090503' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight: { value: '0.9' },
        snug: { value: '1.1' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.04em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.10em' },
        widest: { value: '0.20em' },
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
            base: '{colors.stone.900}',
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        bgSurface: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        bgDispatch: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        text: {
          value: {
            base: '{colors.amber.100}',
            _light: '{colors.stone.800}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.amber.300}',
            _light: '{colors.stone.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.amber.400}',
            _light: '{colors.amber.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.amber.200}',
            _light: '{colors.amber.500}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.amber.900}',
            _light: '{colors.amber.100}',
          },
        },
        accentStrong: {
          value: {
            base: '{colors.amber.500}',
            _light: '{colors.amber.700}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.amber.700}',
            _light: '{colors.amber.300}',
          },
        },
      },
    },
  },
})