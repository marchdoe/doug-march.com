import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      scrollBehavior: 'smooth',
      fontOpticalSizing: 'auto',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
      margin: '0',
      padding: '0',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      textWrap: 'balance',
      margin: '0',
    },
    p: {
      margin: '0',
      textWrap: 'pretty',
    },
    'ul, ol': {
      listStyle: 'none',
      margin: '0',
      padding: '0',
    },
    'img, picture, video, canvas, svg': {
      display: 'block',
      maxWidth: '100%',
    },
    '::selection': {
      backgroundColor: 'accentLight',
      color: 'text',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, [data-color-mode=light]',
    _dark: '[data-color-mode=dark] &, [data-color-mode=dark]',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        sky: {
          50: { value: '#F0F9FF' },
          100: { value: '#E0F2FE' },
          200: { value: '#BAE6FD' },
          300: { value: '#7DD3FC' },
          400: { value: '#38BDF8' },
          500: { value: '#0EA5E9' },
          600: { value: '#0284C7' },
          700: { value: '#0369A1' },
          800: { value: '#075985' },
          900: { value: '#0C4A6E' },
        },
        neutral: {
          50: { value: '#FAFAF7' },
          100: { value: '#F4F4EF' },
          200: { value: '#E8E8E2' },
          300: { value: '#D1D1C9' },
          400: { value: '#A8A89E' },
          500: { value: '#7A7A70' },
          600: { value: '#5C5C52' },
          700: { value: '#3D3D34' },
          800: { value: '#242420' },
          900: { value: '#121210' },
        },
        ink: {
          50: { value: '#F2F2EF' },
          100: { value: '#E6E6E2' },
          200: { value: '#CCCCC6' },
          300: { value: '#A0A098' },
          400: { value: '#72726A' },
          500: { value: '#4E4E46' },
          600: { value: '#3A3A32' },
          700: { value: '#28281E' },
          800: { value: '#1A1A12' },
          900: { value: '#0E0E08' },
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
        tight: { value: '0.88' },
        snug: { value: '1.15' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
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
        bold: { value: '800' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.ink.900}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.ink.800}',
          },
        },
        bgSubtle: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.ink.800}',
          },
        },
        bgInverse: {
          value: {
            base: '{colors.ink.900}',
            _dark: '{colors.neutral.100}',
          },
        },
        bgInverseSubtle: {
          value: {
            base: '{colors.ink.800}',
            _dark: '{colors.neutral.200}',
          },
        },
        text: {
          value: {
            base: '{colors.ink.900}',
            _dark: '{colors.neutral.100}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.700}',
            _dark: '{colors.neutral.400}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.500}',
            _dark: '{colors.neutral.500}',
          },
        },
        textInverse: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.ink.900}',
          },
        },
        textInverseSecondary: {
          value: {
            base: '{colors.neutral.400}',
            _dark: '{colors.ink.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.sky.500}',
            _dark: '{colors.sky.400}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.sky.200}',
            _dark: '{colors.sky.900}',
          },
        },
        accentStrong: {
          value: {
            base: '{colors.sky.700}',
            _dark: '{colors.sky.300}',
          },
        },
        accentOnDark: {
          value: {
            base: '{colors.sky.400}',
            _dark: '{colors.sky.500}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.200}',
            _dark: '{colors.ink.700}',
          },
        },
        borderStrong: {
          value: {
            base: '{colors.neutral.300}',
            _dark: '{colors.ink.600}',
          },
        },
      },
    },
  },
})