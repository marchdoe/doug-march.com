import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      scrollBehavior: 'smooth',
      fontOpticalSizing: 'auto',
      textSizeAdjust: '100%',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: '1.5',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
      textWrap: 'balance',
      letterSpacing: 'tight',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: 'accentDark',
    },
    p: {
      textWrap: 'pretty',
    },
    '::selection': {
      background: 'accentLight',
      color: 'text',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        // Cerulean — H:205° spring sky blue
        cerulean: {
          50:  { value: '#EDF4FB' },
          100: { value: '#C8E3F5' },
          200: { value: '#90C7ED' },
          300: { value: '#52A8DE' },
          400: { value: '#2287CA' },
          500: { value: '#1272B2' },
          600: { value: '#0E5C92' },
          700: { value: '#0A4872' },
          800: { value: '#073459' },
          900: { value: '#04213B' },
        },
        // Warm sand — tinted subtly toward cerulean
        stone: {
          50:  { value: '#F8F5F2' },
          100: { value: '#EDE9E5' },
          200: { value: '#D8D4CF' },
          300: { value: '#BEB9B3' },
          400: { value: '#9B9690' },
          500: { value: '#797470' },
          600: { value: '#5C5855' },
          700: { value: '#433F3D' },
          800: { value: '#2D2B29' },
          900: { value: '#1A1815' },
        },
      },

      spacing: {
        1:  { value: '4px' },
        2:  { value: '8px' },
        3:  { value: '12px' },
        4:  { value: '16px' },
        6:  { value: '24px' },
        8:  { value: '32px' },
        12: { value: '48px' },
        16: { value: '64px' },
        24: { value: '96px' },
        32: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.15' },
        normal: { value: '1.60' },
        loose:  { value: '1.80' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
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
        black:    { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        // Surfaces
        bg:         { value: { base: '{colors.stone.50}' } },
        bgCard:     { value: { base: '{colors.stone.100}' } },
        bgSubtle:   { value: { base: '{colors.cerulean.50}' } },
        bgSidebar:  { value: { base: '{colors.stone.100}' } },

        // Text
        text:          { value: { base: '{colors.stone.900}' } },
        textSecondary: { value: { base: '{colors.stone.700}' } },
        textMuted:     { value: { base: '{colors.stone.600}' } },

        // Accent — cerulean
        accent:      { value: { base: '{colors.cerulean.500}' } },
        accentHover: { value: { base: '{colors.cerulean.600}' } },
        accentLight: { value: { base: '{colors.cerulean.100}' } },
        accentDark:  { value: { base: '{colors.cerulean.700}' } },

        // Borders
        border:       { value: { base: '{colors.stone.200}' } },
        borderStrong: { value: { base: '{colors.stone.300}' } },
        borderAccent: { value: { base: '{colors.cerulean.200}' } },

        // Hero phrase special tokens
        heroPhrase:      { value: { base: '{colors.stone.900}' } },
        heroPunctuation: { value: { base: '{colors.cerulean.500}' } },
        heroAttribution: { value: { base: '{colors.cerulean.500}' } },
      },
    },
  },
})