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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      margin: '0',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentHover',
    },
    'ul, ol': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
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
    _focus: '&:focus-visible',
    _active: '&:active',
    _disabled: '&:disabled, &[aria-disabled=true]',
  },

  theme: {
    tokens: {
      colors: {
        // Violet primary scale — H:292, vivid
        violet: {
          50: { value: '#F8F0FF' },
          100: { value: '#EDD9FF' },
          200: { value: '#D9B0FF' },
          300: { value: '#C080F8' },
          400: { value: '#A450EC' },
          500: { value: '#8820D8' },
          600: { value: '#6E10B0' },
          700: { value: '#530C84' },
          800: { value: '#380858' },
          900: { value: '#1E0430' },
        },
        // Vivid accent — H:292, maximum saturation
        vivid: {
          50: { value: '#FBF0FF' },
          100: { value: '#F0C8FF' },
          200: { value: '#DF8FFF' },
          300: { value: '#CC55F5' },
          400: { value: '#B020E0' },
          500: { value: '#8A10B8' },
          600: { value: '#6A0090' },
          700: { value: '#4D0068' },
          800: { value: '#320044' },
          900: { value: '#1A0024' },
        },
        // Ink neutral scale — H:270, lightly tinted, dark-first
        ink: {
          50: { value: '#F0ECFF' },
          100: { value: '#E2DCFF' },
          200: { value: '#C8BAEA' },
          300: { value: '#A898D0' },
          400: { value: '#7970A8' },
          500: { value: '#544A78' },
          600: { value: '#382B58' },
          700: { value: '#261A44' },
          800: { value: '#160E30' },
          900: { value: '#0A0618' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '16px' },
        '4': { value: '24px' },
        '5': { value: '32px' },
        '6': { value: '48px' },
        '7': { value: '64px' },
        '8': { value: '96px' },
        '9': { value: '128px' },
      },

      lineHeights: {
        tight: { value: '0.92' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
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
            base: '{colors.ink.900}',
            _light: '{colors.ink.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.ink.800}',
            _light: '{colors.violet.50}',
          },
        },
        bgMuted: {
          value: {
            base: '{colors.ink.700}',
            _light: '{colors.violet.100}',
          },
        },
        bgMasthead: {
          value: {
            base: '{colors.ink.800}',
            _light: '{colors.violet.200}',
          },
        },
        bgRow: {
          value: {
            base: '{colors.ink.900}',
            _light: '{colors.ink.50}',
          },
        },
        bgRowHover: {
          value: {
            base: '{colors.ink.800}',
            _light: '{colors.violet.100}',
          },
        },
        text: {
          value: {
            base: '{colors.ink.50}',
            _light: '{colors.ink.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.ink.200}',
            _light: '{colors.ink.700}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.ink.400}',
            _light: '{colors.ink.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.vivid.300}',
            _light: '{colors.violet.600}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.vivid.200}',
            _light: '{colors.violet.500}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.vivid.800}',
            _light: '{colors.vivid.100}',
          },
        },
        accentDim: {
          value: {
            base: '{colors.vivid.500}',
            _light: '{colors.violet.400}',
          },
        },
        border: {
          value: {
            base: '{colors.ink.700}',
            _light: '{colors.violet.200}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.vivid.300}',
            _light: '{colors.violet.500}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.ink.700}',
            _light: '{colors.violet.100}',
          },
        },
        highlight: {
          value: {
            base: '{colors.vivid.300}',
            _light: '{colors.violet.600}',
          },
        },
      },
    },
  },
})