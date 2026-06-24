import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'p': {
      lineHeight: 'normal',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    '::selection': {
      background: '{colors.chartreuse.300}',
      color: '{colors.ink.900}',
    },
    'hr': {
      border: 'none',
      borderTop: '1px solid',
      borderColor: 'border',
    },
    'img, picture, video, canvas, svg': {
      display: 'block',
      maxWidth: '100%',
    },
    'input, button, textarea, select': {
      font: 'inherit',
    },
    'p, h1, h2, h3, h4, h5, h6': {
      overflowWrap: 'break-word',
    },
    'ol, ul': {
      listStyle: 'none',
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
          50:  { value: '#F8FFE0' },
          100: { value: '#F0FFB8' },
          200: { value: '#DEFF6A' },
          300: { value: '#C8F000' },
          400: { value: '#AACE00' },
          500: { value: '#8AAA00' },
          600: { value: '#6B8600' },
          700: { value: '#506500' },
          800: { value: '#384500' },
          900: { value: '#222900' },
        },
        ink: {
          50:  { value: '#EEEFD9' },
          100: { value: '#DADEC6' },
          200: { value: '#B8BD9A' },
          300: { value: '#959A72' },
          400: { value: '#727851' },
          500: { value: '#545935' },
          600: { value: '#3A3F21' },
          700: { value: '#252A13' },
          800: { value: '#161A0B' },
          900: { value: '#0C0E08' },
          950: { value: '#080A05' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '24px' },
        '6':  { value: '32px' },
        '7':  { value: '48px' },
        '8':  { value: '64px' },
        '9':  { value: '96px' },
        '10': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.16em' },
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
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        bgCard: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        bgMasthead: {
          value: { base: '{colors.ink.950}', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.50}', _light: '{colors.ink.900}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.200}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.400}', _light: '{colors.ink.400}' },
        },
        accent: {
          value: { base: '{colors.chartreuse.300}', _light: '{colors.chartreuse.600}' },
        },
        accentLight: {
          value: { base: '{colors.chartreuse.100}', _light: '{colors.chartreuse.400}' },
        },
        accentDim: {
          value: { base: '{colors.chartreuse.500}', _light: '{colors.chartreuse.700}' },
        },
        accentSubtle: {
          value: { base: '{colors.chartreuse.900}', _light: '{colors.chartreuse.50}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderStrong: {
          value: { base: '{colors.ink.600}', _light: '{colors.ink.300}' },
        },
        borderAccent: {
          value: { base: '{colors.chartreuse.300}', _light: '{colors.chartreuse.500}' },
        },
      },
    },
  },
})