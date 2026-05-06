import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: '1',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
    'img, video': {
      display: 'block',
      maxWidth: '100%',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover, &[data-hover]',
  },

  theme: {
    tokens: {
      colors: {
        chartreuse: {
          50: { value: '#F5FFB8' },
          100: { value: '#ECFF85' },
          200: { value: '#DDFF33' },
          300: { value: '#CCEE00' },
          400: { value: '#B8D900' },
          500: { value: '#9BBF00' },
          600: { value: '#7A9600' },
          700: { value: '#5C7000' },
          800: { value: '#3D4B00' },
          900: { value: '#1F2500' },
        },
        neutral: {
          50: { value: '#F8FCED' },
          100: { value: '#EFF7D8' },
          200: { value: '#D9EBA8' },
          300: { value: '#B5CC6E' },
          400: { value: '#8EA640' },
          500: { value: '#6B7F26' },
          600: { value: '#505E19' },
          700: { value: '#374210' },
          800: { value: '#232B09' },
          900: { value: '#141804' },
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
        tight: { value: '0.88' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
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
        none: { value: '0' },
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
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.600}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.400}', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.chartreuse.300}', _light: '{colors.chartreuse.800}' },
        },
        accentLight: {
          value: { base: '{colors.chartreuse.200}', _light: '{colors.chartreuse.700}' },
        },
        accentDark: {
          value: { base: '{colors.chartreuse.500}', _light: '{colors.chartreuse.900}' },
        },
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        borderAccent: {
          value: { base: '{colors.chartreuse.700}', _light: '{colors.chartreuse.300}' },
        },
        heroText: {
          value: { base: '{colors.chartreuse.300}', _light: '{colors.neutral.900}' },
        },
        signalWin: {
          value: { base: '{colors.chartreuse.300}', _light: '{colors.chartreuse.800}' },
        },
        signalLoss: {
          value: { base: '{colors.neutral.500}', _light: '{colors.neutral.400}' },
        },
      },
    },
  },
})