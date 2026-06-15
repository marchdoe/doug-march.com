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
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    p: {
      lineHeight: 'normal',
      textWrap: 'pretty',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    'a:hover': {
      color: 'accentHover',
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
    'button, input, select, textarea': {
      fontFamily: 'inherit',
      fontSize: 'inherit',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus',
    _focusVisible: '&:focus-visible',
    _active: '&:active',
    _disabled: '&:disabled, &[aria-disabled=true]',
  },

  theme: {
    tokens: {
      colors: {
        // Primary — deep crimson, H:350°
        crimson: {
          50:  { value: '#FFF0F2' },
          100: { value: '#FFD6DC' },
          200: { value: '#FFB0BB' },
          300: { value: '#FF8090' },
          400: { value: '#F05063' },
          500: { value: '#DC2040' },
          600: { value: '#C41230' },
          700: { value: '#A00020' },
          800: { value: '#780010' },
          900: { value: '#4A0008' },
        },
        // Neutral — warm stone, barely tinted toward red-rose
        stone: {
          50:  { value: '#FAFAF8' },
          100: { value: '#F5F5F2' },
          200: { value: '#EBEBEA' },
          300: { value: '#D8D8D5' },
          400: { value: '#B5B5B0' },
          500: { value: '#8E8E88' },
          600: { value: '#6A6A64' },
          700: { value: '#4A4A44' },
          800: { value: '#2E2E28' },
          900: { value: '#1A1A14' },
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
        tight:  { value: '0.92' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.72' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.09em' },
        widest:  { value: '0.15em' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light:    { value: '200' },
        normal:   { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
        bg: {
          value: '{colors.stone.50}',
        },
        bgCard: {
          value: '{colors.stone.100}',
        },
        bgSubtle: {
          value: '{colors.stone.100}',
        },
        bgInverse: {
          value: '{colors.stone.900}',
        },

        // Text
        text: {
          value: '{colors.stone.900}',
        },
        textSecondary: {
          value: '{colors.stone.600}',
        },
        textMuted: {
          value: '{colors.stone.400}',
        },
        textInverse: {
          value: '{colors.stone.50}',
        },

        // Accent — deep crimson
        accent: {
          value: '{colors.crimson.600}',
        },
        accentHover: {
          value: '{colors.crimson.700}',
        },
        accentSubtle: {
          value: '{colors.crimson.50}',
        },
        accentVivid: {
          value: '{colors.crimson.500}',
        },

        // Borders
        border: {
          value: '{colors.stone.200}',
        },
        borderStrong: {
          value: '{colors.stone.300}',
        },
        borderAccent: {
          value: '{colors.crimson.600}',
        },
      },
    },
  },
})