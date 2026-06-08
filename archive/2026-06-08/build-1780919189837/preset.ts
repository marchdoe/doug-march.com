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
      fontSize: '16px',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: '1.6',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: '0.95',
      textWrap: 'balance',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'text',
    },
    'p': {
      textWrap: 'pretty',
    },
    'abbr': {
      fontVariant: 'all-small-caps',
      letterSpacing: '0.08em',
      textDecoration: 'none',
    },
    '::selection': {
      background: '#BFFF00',
      color: '#0A0C02',
    },
  },

  conditions: {
    _light: { selector: '.light &, [data-theme=light] &' },
    _dark: { selector: '.dark &, [data-theme=dark] &' },
    _hover: { selector: '&:hover' },
  },

  theme: {
    tokens: {
      colors: {
        chartreuse: {
          50:  { value: '#F5FFBF' },
          100: { value: '#EAFF80' },
          200: { value: '#DAFF33' },
          300: { value: '#CCFF00' },
          400: { value: '#BFFF00' },
          500: { value: '#A8E000' },
          600: { value: '#8ABE00' },
          700: { value: '#6B9900' },
          800: { value: '#4D7000' },
          900: { value: '#2F4500' },
        },
        neutral: {
          50:  { value: '#F6F8EB' },
          100: { value: '#E9EDCC' },
          200: { value: '#D1D69E' },
          300: { value: '#ACAF72' },
          400: { value: '#838750' },
          500: { value: '#5F6235' },
          600: { value: '#464920' },
          700: { value: '#2F3110' },
          800: { value: '#1A1C05' },
          900: { value: '#0A0C02' },
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
        tight:  { value: '0.95' },
        snug:   { value: '1.2' },
        normal: { value: '1.6' },
        loose:  { value: '1.85' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.12em' },
        widest:  { value: '0.22em' },
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
        bgSidebar: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
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
            base: '{colors.neutral.200}',
            _light: '{colors.neutral.700}',
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
            base: '{colors.chartreuse.400}',
            _light: '{colors.chartreuse.700}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.chartreuse.800}',
            _light: '{colors.chartreuse.100}',
          },
        },
        accentStrong: {
          value: {
            base: '{colors.chartreuse.300}',
            _light: '{colors.chartreuse.600}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.200}',
          },
        },
        borderStrong: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.300}',
          },
        },
        surface: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
        surfaceRaised: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.50}',
          },
        },
      },
    },
  },
})