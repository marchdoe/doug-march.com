import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      letterSpacing: '-0.025em',
      lineHeight: '1.1',
      fontWeight: '700',
      textWrap: 'balance',
    },
    'p': {
      textWrap: 'pretty',
      lineHeight: '1.5',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.2s ease, opacity 0.2s ease',
    },
    'a:hover': {
      opacity: '0.8',
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
        primary: {
          50:  { value: '#E5FAF6' },
          100: { value: '#BBEEE6' },
          200: { value: '#7EDCCF' },
          300: { value: '#3EC9B8' },
          400: { value: '#15B39F' },
          500: { value: '#0A9687' },
          600: { value: '#077A6C' },
          700: { value: '#055B51' },
          800: { value: '#033E38' },
          900: { value: '#022420' },
        },
        neutral: {
          50:  { value: '#EEF3F5' },
          100: { value: '#D8E4E9' },
          200: { value: '#B3C9D1' },
          300: { value: '#8AADB9' },
          400: { value: '#628F9F' },
          500: { value: '#437282' },
          600: { value: '#2E5666' },
          700: { value: '#1E3D4E' },
          800: { value: '#122837' },
          900: { value: '#0B1C24' },
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
        tight:  { value: '0.92' },
        snug:   { value: '1.2' },
        normal: { value: '1.5' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.15em' },
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
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgBand: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        bgBandAlt: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSignal: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.200}', _light: '{colors.neutral.700}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.400}', _light: '{colors.neutral.500}' },
        },
        textDim: {
          value: { base: '{colors.neutral.500}', _light: '{colors.neutral.400}' },
        },
        accent: {
          value: { base: '{colors.primary.300}', _light: '{colors.primary.500}' },
        },
        accentBright: {
          value: { base: '{colors.primary.200}', _light: '{colors.primary.400}' },
        },
        accentSubtle: {
          value: { base: '{colors.primary.800}', _light: '{colors.primary.100}' },
        },
        accentDim: {
          value: { base: '{colors.primary.600}', _light: '{colors.primary.200}' },
        },
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        borderAccent: {
          value: { base: '{colors.primary.600}', _light: '{colors.primary.300}' },
        },
      },
    },
  },
})