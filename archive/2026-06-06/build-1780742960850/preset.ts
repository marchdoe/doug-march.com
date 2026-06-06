import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      fontWeight: '700',
      lineHeight: '0.88',
      letterSpacing: '0.01em',
    },
    p: {
      margin: '0',
      padding: '0',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.08s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: '0',
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
        // Primary: electric lime — H:112° chartreuse/lime, within mandated 108°–125° zone
        lime: {
          '50': { value: '#F3FDE8' },
          '100': { value: '#E1F7C8' },
          '200': { value: '#C3EE92' },
          '300': { value: '#9ED85C' },
          '400': { value: '#7AFF18' },
          '500': { value: '#58C400' },
          '600': { value: '#409200' },
          '700': { value: '#2C6200' },
          '800': { value: '#1A3C00' },
          '900': { value: '#0D1E00' },
        },
        // Neutral: void-forest — near-black darks tinted toward H:112°
        forest: {
          '50': { value: '#D0E8B0' },
          '100': { value: '#A8C880' },
          '200': { value: '#7CAA4C' },
          '300': { value: '#547828' },
          '400': { value: '#385212' },
          '500': { value: '#243608' },
          '600': { value: '#182505' },
          '700': { value: '#111A03' },
          '800': { value: '#0D1404' },
          '900': { value: '#080D02' },
        },
        // Light: mist — near-white lime-tinted surfaces and text
        mist: {
          '50': { value: '#FBFFF5' },
          '100': { value: '#F2FDE6' },
          '200': { value: '#E6F9D2' },
          '300': { value: '#D4F0B8' },
          '400': { value: '#B8E090' },
          '500': { value: '#8EC864' },
          '600': { value: '#65A038' },
          '700': { value: '#447820' },
          '800': { value: '#2C500E' },
          '900': { value: '#1A3006' },
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
        tight: { value: '0.88' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
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
          value: { base: '{colors.forest.900}', _light: '{colors.mist.50}' },
        },
        bgCard: {
          value: { base: '{colors.forest.800}', _light: '{colors.mist.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.forest.800}', _light: '{colors.mist.100}' },
        },
        text: {
          value: { base: '{colors.mist.200}', _light: '{colors.forest.800}' },
        },
        textSecondary: {
          value: { base: '{colors.mist.400}', _light: '{colors.forest.500}' },
        },
        textMuted: {
          value: { base: '{colors.mist.600}', _light: '{colors.forest.400}' },
        },
        accent: {
          value: { base: '{colors.lime.400}', _light: '{colors.lime.600}' },
        },
        accentLight: {
          value: { base: '{colors.lime.200}', _light: '{colors.lime.500}' },
        },
        accentDark: {
          value: { base: '{colors.lime.600}', _light: '{colors.lime.700}' },
        },
        border: {
          value: { base: '{colors.forest.600}', _light: '{colors.mist.300}' },
        },
        borderSubtle: {
          value: { base: '{colors.forest.700}', _light: '{colors.mist.200}' },
        },
      },
    },
  },
})