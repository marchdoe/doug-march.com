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
      fontOpticalSizing: 'auto',
      textRendering: 'optimizeLegibility',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      letterSpacing: 'tight',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
    },
    'abbr': {
      fontVariantCaps: 'all-small-caps',
      letterSpacing: '0.06em',
    },
    '::selection': {
      background: 'accentGlow',
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
        chartreuse: {
          50:  { value: '#F4FAD5' },
          100: { value: '#E8F5AE' },
          200: { value: '#D5EC6E' },
          300: { value: '#C1E136' },
          400: { value: '#AACC1A' },
          500: { value: '#8FB512' },
          600: { value: '#73920D' },
          700: { value: '#576F0A' },
          800: { value: '#3B4C06' },
          900: { value: '#1E2800' },
        },
        neutral: {
          50:  { value: '#F0F0E8' },
          100: { value: '#DEDEDA' },
          200: { value: '#C4C4BA' },
          300: { value: '#A6A69A' },
          400: { value: '#888876' },
          500: { value: '#6A6A58' },
          600: { value: '#4E4E3C' },
          700: { value: '#323220' },
          800: { value: '#1C1C0E' },
          900: { value: '#0C0E08' },
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
        tight:  { value: '0.92' },
        snug:   { value: '1.2' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.2em' },
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
        bgElevated: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
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
            base: '{colors.neutral.500}',
            _light: '{colors.neutral.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.chartreuse.400}',
            _light: '{colors.chartreuse.700}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.chartreuse.200}',
            _light: '{colors.chartreuse.100}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.chartreuse.600}',
            _light: '{colors.chartreuse.800}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.chartreuse.300}',
            _light: '{colors.chartreuse.200}',
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
            base: '{colors.chartreuse.700}',
            _light: '{colors.chartreuse.500}',
          },
        },
        borderStrong: {
          value: {
            base: '{colors.chartreuse.400}',
            _light: '{colors.chartreuse.600}',
          },
        },
      },
    },
  },
})