import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      textWrap: 'balance',
      fontWeight: 'bold',
    },
    p: {
      textWrap: 'pretty',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
      color: 'accentBright',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &, .light &',
    _dark: '[data-theme="dark"] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Primary — fairway green, H:115°
        green: {
          50:  { value: '#F3FCF1' },
          100: { value: '#DAF9D6' },
          200: { value: '#AEEFAA' },
          300: { value: '#72E269' },
          400: { value: '#32D422' },
          500: { value: '#1FAE12' },
          600: { value: '#168A0B' },
          700: { value: '#0D6507' },
          800: { value: '#084204' },
          900: { value: '#042802' },
        },
        // Neutral — "ink", tinted toward H:115°, chroma ~0.007
        ink: {
          50:  { value: '#F3F5F2' },
          100: { value: '#E5E9E4' },
          200: { value: '#C6CEC5' },
          300: { value: '#9EAA9D' },
          400: { value: '#6F7E6E' },
          500: { value: '#4A5849' },
          600: { value: '#333E32' },
          700: { value: '#222A21' },
          800: { value: '#141C13' },
          900: { value: '#0B0F0A' },
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
        tight:  { value: '0.85' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
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
          value: { base: '{colors.ink.900}', _light: '{colors.ink.50}' },
        },
        bgCard: {
          value: { base: '{colors.ink.800}', _light: '{colors.ink.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        bgSignals: {
          value: { base: '{colors.ink.900}', _light: '{colors.ink.100}' },
        },
        text: {
          value: { base: '{colors.ink.100}', _light: '{colors.ink.900}' },
        },
        textSecondary: {
          value: { base: '{colors.ink.300}', _light: '{colors.ink.600}' },
        },
        textMuted: {
          value: { base: '{colors.ink.400}', _light: '{colors.ink.500}' },
        },
        accent: {
          value: { base: '{colors.green.400}', _light: '{colors.green.600}' },
        },
        accentBright: {
          value: { base: '{colors.green.300}', _light: '{colors.green.500}' },
        },
        accentSubtle: {
          value: { base: '{colors.green.800}', _light: '{colors.green.100}' },
        },
        accentDim: {
          value: { base: '{colors.green.700}', _light: '{colors.green.200}' },
        },
        border: {
          value: { base: '{colors.ink.700}', _light: '{colors.ink.200}' },
        },
        borderAccent: {
          value: { base: '{colors.green.700}', _light: '{colors.green.300}' },
        },
        borderStrong: {
          value: { base: '{colors.ink.600}', _light: '{colors.ink.300}' },
        },
      },
    },
  },
})