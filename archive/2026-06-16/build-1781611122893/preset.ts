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
      fontSize: '16px',
      fontOpticalSizing: 'auto',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'accentText',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentDeep',
      textDecoration: 'underline',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    p: {
      lineHeight: 'normal',
    },
    'abbr': {
      fontVariantCaps: 'all-small-caps',
      letterSpacing: '0.06em',
    },
    'table': {
      borderCollapse: 'collapse',
      width: '100%',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &, &',
    _dark: '[data-theme="dark"] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        lime: {
          '50':  { value: '#F7FCE8' },
          '100': { value: '#EDFAB5' },
          '200': { value: '#DAF574' },
          '300': { value: '#BEEF36' },
          '400': { value: '#A5D61E' },
          '500': { value: '#8BBF12' },
          '600': { value: '#6F9A0E' },
          '700': { value: '#53750A' },
          '800': { value: '#384F07' },
          '900': { value: '#1D2903' },
        },
        stone: {
          '50':  { value: '#FAFAF6' },
          '100': { value: '#F7F4EC' },
          '200': { value: '#EDE9D9' },
          '300': { value: '#DDD7C3' },
          '400': { value: '#C4BAA8' },
          '500': { value: '#A79D8B' },
          '600': { value: '#857B6A' },
          '700': { value: '#645C4E' },
          '800': { value: '#3E3830' },
          '900': { value: '#1B1710' },
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
        tight:  { value: '1.08' },
        snug:   { value: '1.25' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.14em' },
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
          value: { base: '{colors.stone.100}', _light: '{colors.stone.100}' },
        },
        bgCard: {
          value: { base: '{colors.stone.50}', _light: '{colors.stone.50}' },
        },
        bgSidebar: {
          value: { base: '{colors.stone.200}', _light: '{colors.stone.200}' },
        },
        bgAccent: {
          value: { base: '{colors.lime.100}', _light: '{colors.lime.100}' },
        },
        text: {
          value: { base: '{colors.stone.900}', _light: '{colors.stone.900}' },
        },
        textSecondary: {
          value: { base: '{colors.stone.700}', _light: '{colors.stone.700}' },
        },
        textMuted: {
          value: { base: '{colors.stone.500}', _light: '{colors.stone.500}' },
        },
        accent: {
          value: { base: '{colors.lime.500}', _light: '{colors.lime.500}' },
        },
        accentText: {
          value: { base: '{colors.lime.700}', _light: '{colors.lime.700}' },
        },
        accentDeep: {
          value: { base: '{colors.lime.800}', _light: '{colors.lime.800}' },
        },
        accentLight: {
          value: { base: '{colors.lime.200}', _light: '{colors.lime.200}' },
        },
        accentRule: {
          value: { base: '{colors.lime.500}', _light: '{colors.lime.500}' },
        },
        border: {
          value: { base: '{colors.stone.300}', _light: '{colors.stone.300}' },
        },
        borderSubtle: {
          value: { base: '{colors.stone.200}', _light: '{colors.stone.200}' },
        },
        borderAccent: {
          value: { base: '{colors.lime.500}', _light: '{colors.lime.500}' },
        },
      },
    },
  },
})