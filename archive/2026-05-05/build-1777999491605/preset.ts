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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    'a:hover': {
      color: 'accentDark',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    'p': {
      margin: '0',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
    'img': {
      maxWidth: '100%',
      display: 'block',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      padding: '0',
    },
  },

  conditions: {
    _light: '[data-theme=light] &, [data-color-scheme=light] &',
    _dark: '[data-theme=dark] &, [data-color-scheme=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Crimson scale — HSL ~350°, warm red-crimson
        crimson: {
          50:  { value: '#FEF1F3' },
          100: { value: '#FDE0E4' },
          200: { value: '#FAB8C1' },
          300: { value: '#F5808D' },
          400: { value: '#EC3D50' },
          500: { value: '#D91828' },
          600: { value: '#B01020' },
          700: { value: '#880C1A' },
          800: { value: '#600A14' },
          900: { value: '#3D080E' },
        },
        // Warm neutral scale — tinted toward orange-red (~15° HSL)
        warm: {
          50:  { value: '#F9F2E8' },
          100: { value: '#F2E6D6' },
          200: { value: '#E4CDB8' },
          300: { value: '#CEB09A' },
          400: { value: '#B08C78' },
          500: { value: '#8C6B58' },
          600: { value: '#6A4E3C' },
          700: { value: '#4E3428' },
          800: { value: '#341E16' },
          900: { value: '#200E0A' },
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
        tight:  { value: '0.88' },
        snug:   { value: '1.15' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.20em' },
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
          value: { base: '{colors.warm.50}', _light: '{colors.warm.50}' },
        },
        bgCard: {
          value: { base: '{colors.warm.100}', _light: '{colors.warm.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.warm.100}', _light: '{colors.warm.100}' },
        },
        text: {
          value: { base: '{colors.warm.900}', _light: '{colors.warm.900}' },
        },
        textSecondary: {
          value: { base: '{colors.warm.700}', _light: '{colors.warm.700}' },
        },
        textMuted: {
          value: { base: '{colors.warm.600}', _light: '{colors.warm.600}' },
        },
        accent: {
          value: { base: '{colors.crimson.500}', _light: '{colors.crimson.500}' },
        },
        accentLight: {
          value: { base: '{colors.crimson.300}', _light: '{colors.crimson.300}' },
        },
        accentDark: {
          value: { base: '{colors.crimson.700}', _light: '{colors.crimson.700}' },
        },
        accentGlow: {
          value: { base: '{colors.crimson.200}', _light: '{colors.crimson.200}' },
        },
        hero: {
          value: { base: '{colors.crimson.700}', _light: '{colors.crimson.700}' },
        },
        border: {
          value: { base: '{colors.warm.200}', _light: '{colors.warm.200}' },
        },
      },
    },
  },
})