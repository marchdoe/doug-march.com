import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: '0',
      padding: '0',
      overflowX: 'hidden',
    },
    body: {
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: '0.88',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
    },
    '*': {
      boxSizing: 'border-box',
    },
    '::selection': {
      background: 'accentGlow',
      color: 'bg',
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
        indigo: {
          '50':  { value: '#f2f1ff' },
          '100': { value: '#e5e3ff' },
          '200': { value: '#cccaff' },
          '300': { value: '#a8a3ff' },
          '400': { value: '#8079ff' },
          '500': { value: '#5d54ff' },
          '600': { value: '#4038e0' },
          '700': { value: '#2d27b8' },
          '800': { value: '#1c1880' },
          '900': { value: '#0e0c4a' },
        },
        void: {
          '50':  { value: '#f1f1f7' },
          '100': { value: '#e2e2ee' },
          '200': { value: '#c5c5de' },
          '300': { value: '#a6a6cc' },
          '400': { value: '#8383ad' },
          '500': { value: '#62628a' },
          '600': { value: '#48486a' },
          '700': { value: '#30304e' },
          '800': { value: '#191930' },
          '900': { value: '#080816' },
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
        tight:  { value: '0.85' },
        snug:   { value: '1.1' },
        normal: { value: '1.6' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.06em' },
        wider:   { value: '0.14em' },
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
          value: { base: '#06060F', _light: '#f2f1ff' },
        },
        bgCard: {
          value: { base: '#0d0d22', _light: '#e5e3ff' },
        },
        bgSidebar: {
          value: { base: '#0a0a1c', _light: '#cccaff' },
        },
        text: {
          value: { base: '#e8e7ff', _light: '#0e0c4a' },
        },
        textSecondary: {
          value: { base: '#a8a3ff', _light: '#2d27b8' },
        },
        textMuted: {
          value: { base: '#9494c8', _light: '#48486a' },
        },
        accent: {
          value: { base: '#8079ff', _light: '#4038e0' },
        },
        accentLight: {
          value: { base: '#cccaff', _light: '#a8a3ff' },
        },
        accentGlow: {
          value: { base: '#5d54ff', _light: '#2d27b8' },
        },
        border: {
          value: { base: '#1c1c34', _light: '#cccaff' },
        },
      },
    },
  },
})