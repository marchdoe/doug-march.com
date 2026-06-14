import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      minHeight: '100vh',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    'p': {
      margin: '0',
    },
    'img, svg': {
      display: 'block',
      maxWidth: '100%',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: '0',
      margin: '0',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
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
        acid: {
          50:  { value: '#EFF8EB' },
          100: { value: '#D3EFCA' },
          200: { value: '#A5DA87' },
          300: { value: '#76C44B' },
          400: { value: '#6DD619' },
          500: { value: '#7FE521' },
          600: { value: '#5EBF17' },
          700: { value: '#429710' },
          800: { value: '#2D6C09' },
          900: { value: '#1A4305' },
        },
        void: {
          50:  { value: '#E8F0E6' },
          100: { value: '#C2D3BE' },
          200: { value: '#96B290' },
          300: { value: '#6D8D67' },
          400: { value: '#4B6B45' },
          500: { value: '#334D2E' },
          600: { value: '#21341E' },
          700: { value: '#142015' },
          800: { value: '#0D1509' },
          900: { value: '#060C04' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.9' },
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
          value: { base: '{colors.void.900}', _light: '{colors.void.50}' },
        },
        bgCard: {
          value: { base: '{colors.void.800}', _light: '{colors.void.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.void.700}', _light: '{colors.void.200}' },
        },
        bgHero: {
          value: { base: '{colors.acid.500}', _light: '{colors.acid.500}' },
        },
        bgHeroText: {
          value: { base: '{colors.void.900}', _light: '{colors.void.900}' },
        },
        text: {
          value: { base: '{colors.void.50}', _light: '{colors.void.900}' },
        },
        textSecondary: {
          value: { base: '{colors.void.200}', _light: '{colors.void.600}' },
        },
        textMuted: {
          value: { base: '{colors.void.300}', _light: '{colors.void.500}' },
        },
        accent: {
          value: { base: '{colors.acid.500}', _light: '{colors.acid.700}' },
        },
        accentSubtle: {
          value: { base: '{colors.acid.900}', _light: '{colors.acid.100}' },
        },
        accentGlow: {
          value: { base: '{colors.acid.400}', _light: '{colors.acid.600}' },
        },
        accentLight: {
          value: { base: '{colors.acid.200}', _light: '{colors.acid.800}' },
        },
        border: {
          value: { base: '{colors.void.600}', _light: '{colors.void.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.void.700}', _light: '{colors.void.100}' },
        },
        borderAccent: {
          value: { base: '{colors.acid.700}', _light: '{colors.acid.300}' },
        },
      },
    },
  },
})