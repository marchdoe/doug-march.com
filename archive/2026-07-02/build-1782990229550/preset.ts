import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: '1.55',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: '1',
      letterSpacing: '-0.02em',
      margin: '0',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 120ms ease',
    },
    'a:hover': {
      color: 'accentLight',
      textDecoration: 'underline',
    },
    '::selection': {
      backgroundColor: 'accentMuted',
      color: 'textPrimary',
    },
    'ul, ol': {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    'button, input, select, textarea': {
      font: 'inherit',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &, .light &',
    _dark: '[data-theme="dark"] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Acid chartreuse primary scale — H:72°, hazard-terminal register
        lime: {
          50:  { value: '#F7FAD0' },
          100: { value: '#EFF5A5' },
          200: { value: '#E5EF78' },
          300: { value: '#D8E745' },
          400: { value: '#CCDB10' },
          500: { value: '#C2D400' },
          600: { value: '#A4B300' },
          700: { value: '#808D00' },
          800: { value: '#5A6300' },
          900: { value: '#303500' },
        },
        // Void-moss neutrals — dark, chartreuse-tinted, no pure greys
        neutral: {
          50:  { value: '#F4F4EC' },
          100: { value: '#E8E9DB' },
          200: { value: '#D0D1C4' },
          300: { value: '#A8A99D' },
          400: { value: '#7A7B71' },
          500: { value: '#585950' },
          600: { value: '#3E3F37' },
          700: { value: '#2A2B23' },
          800: { value: '#1A1B13' },
          900: { value: '#0A0B06' },
        },
      },

      spacing: {
        1:  { value: '4px' },
        2:  { value: '8px' },
        4:  { value: '16px' },
        6:  { value: '24px' },
        8:  { value: '32px' },
        12: { value: '48px' },
        16: { value: '64px' },
        24: { value: '96px' },
        32: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.12em' },
      },

      radii: {
        none: { value: '0' },
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
        // Surfaces
        bg: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        bgInverse: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },

        // Text
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textPrimary: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.600}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.400}', _light: '{colors.neutral.500}' },
        },
        textInverse: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },

        // Accent — acid chartreuse
        accent: {
          value: { base: '{colors.lime.500}', _light: '{colors.lime.600}' },
        },
        accentLight: {
          value: { base: '{colors.lime.400}', _light: '{colors.lime.500}' },
        },
        accentDim: {
          value: { base: '{colors.lime.700}', _light: '{colors.lime.400}' },
        },
        accentMuted: {
          value: { base: '{colors.lime.900}', _light: '{colors.lime.100}' },
        },
        accentForeground: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.900}' },
        },

        // Borders
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.300}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.200}' },
        },
        borderAccent: {
          value: { base: '{colors.lime.500}', _light: '{colors.lime.600}' },
        },
      },
    },
  },
})