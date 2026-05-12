import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      margin: '0',
      padding: '0',
      height: '100%',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: 'tight',
      letterSpacing: 'wide',
    },
    'p': {
      margin: '0',
      padding: '0',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      color: 'inherit',
      font: 'inherit',
    },
    '::selection': {
      background: 'accentDim',
      color: 'text',
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
        // Phosphor green — H:120°, terminal screen frequency
        green: {
          50:  { value: '#EDFDED' },
          100: { value: '#CBEFCB' },
          200: { value: '#A0E0A0' },
          300: { value: '#6DD26D' },
          400: { value: '#3EC63E' },
          500: { value: '#28B028' },
          600: { value: '#1E8E1E' },
          700: { value: '#156815' },
          800: { value: '#0D480D' },
          900: { value: '#072807' },
        },
        // Terminal void neutrals — near-black tinted H:118° for atmospheric cohesion
        neutral: {
          50:  { value: '#EDFCEC' },
          100: { value: '#D1E8D0' },
          200: { value: '#AFCBAE' },
          300: { value: '#89AD88' },
          400: { value: '#648764' },
          500: { value: '#486748' },
          600: { value: '#344E34' },
          700: { value: '#223522' },
          800: { value: '#141E14' },
          900: { value: '#090E09' },
        },
      },

      spacing: {
        '4':   { value: '4px' },
        '8':   { value: '8px' },
        '16':  { value: '16px' },
        '24':  { value: '24px' },
        '32':  { value: '32px' },
        '48':  { value: '48px' },
        '64':  { value: '64px' },
        '96':  { value: '96px' },
        '128': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.15' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0.01em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.18em' },
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
          value: { base: '{colors.neutral.900}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}' },
        },
        bgSubtle: {
          value: { base: '{colors.neutral.700}' },
        },
        bgStrip: {
          value: { base: '{colors.neutral.900}' },
        },
        text: {
          value: { base: '{colors.neutral.50}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.300}' },
        },
        textSubtle: {
          value: { base: '{colors.neutral.400}' },
        },
        textDim: {
          value: { base: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.green.400}' },
        },
        accentLight: {
          value: { base: '{colors.green.300}' },
        },
        accentDim: {
          value: { base: '{colors.green.700}' },
        },
        accentSubtle: {
          value: { base: '{colors.green.600}' },
        },
        border: {
          value: { base: '{colors.neutral.700}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.800}' },
        },
      },
    },
  },
})