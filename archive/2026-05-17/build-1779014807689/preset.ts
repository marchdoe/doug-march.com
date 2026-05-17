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
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      overflowX: 'hidden',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: 'text',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: '700',
      lineHeight: '0.88',
      letterSpacing: '-0.04em',
    },
    'p': {
      lineHeight: '1.5',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      color: 'inherit',
      font: 'inherit',
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
        ocean: {
          '50':  { value: '#EEEEF8' },
          '100': { value: '#D8D8F2' },
          '200': { value: '#B0B0E4' },
          '300': { value: '#8080D0' },
          '400': { value: '#5555B8' },
          '500': { value: '#3030A0' },
          '600': { value: '#1E1E88' },
          '700': { value: '#121268' },
          '800': { value: '#0A0A48' },
          '900': { value: '#04042A' },
        },
        void: {
          '50':  { value: '#F2F2FF' },
          '100': { value: '#E0E0F8' },
          '200': { value: '#BEBEDD' },
          '300': { value: '#9494BB' },
          '400': { value: '#686898' },
          '500': { value: '#444472' },
          '600': { value: '#2C2C54' },
          '700': { value: '#1A1A38' },
          '800': { value: '#0E0E24' },
          '900': { value: '#060616' },
        },
        foam: {
          '50':  { value: '#FAFAFF' },
          '100': { value: '#F0F0FF' },
          '200': { value: '#DDDDF8' },
          '300': { value: '#B8B8F0' },
          '400': { value: '#8E8EE8' },
          '500': { value: '#6666DC' },
          '600': { value: '#4444CC' },
          '700': { value: '#2828B0' },
          '800': { value: '#161690' },
          '900': { value: '#0A0A70' },
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
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.2em' },
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
        bg: {
          value: { base: '{colors.void.900}' },
        },
        bgCard: {
          value: { base: '{colors.void.800}' },
        },
        bgSidebar: {
          value: { base: '{colors.void.800}' },
        },
        bgElevated: {
          value: { base: '{colors.void.700}' },
        },
        text: {
          value: { base: '{colors.void.50}' },
        },
        textMuted: {
          value: { base: '{colors.void.300}' },
        },
        textDim: {
          value: { base: '{colors.void.400}' },
        },
        textFaint: {
          value: { base: '{colors.void.500}' },
        },
        accent: {
          value: { base: '{colors.foam.400}' },
        },
        accentBright: {
          value: { base: '{colors.foam.300}' },
        },
        accentDim: {
          value: { base: '{colors.foam.700}' },
        },
        accentSubtle: {
          value: { base: '{colors.foam.200}' },
        },
        border: {
          value: { base: '{colors.void.700}' },
        },
        borderSubtle: {
          value: { base: '{colors.void.600}' },
        },
      },
    },
  },
})