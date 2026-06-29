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
      height: '100%',
    },
    body: {
      minHeight: '100vh',
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
    },
    p: {
      margin: '0',
      lineHeight: 'normal',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.12s ease',
      _hover: {
        color: 'accentLight',
      },
    },
    '::selection': {
      backgroundColor: '{colors.teal.400}',
      color: '{colors.teal.900}',
    },
    'button': {
      cursor: 'pointer',
      border: 'none',
      background: 'none',
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
  },

  conditions: {
    _light: { selector: '.light &, [data-theme=light] &' },
    _dark: { selector: '.dark &, [data-theme=dark] &, &' },
    _hover: { selector: '&:hover' },
    _focus: { selector: '&:focus, &:focus-visible' },
    _active: { selector: '&:active' },
    _disabled: { selector: '&:disabled, &[aria-disabled=true]' },
  },

  theme: {
    tokens: {
      colors: {
        teal: {
          50:  { value: '#EEF9F4' },
          100: { value: '#D1F0E2' },
          200: { value: '#9EDDBF' },
          300: { value: '#52C896' },
          400: { value: '#18C476' },
          500: { value: '#12A562' },
          600: { value: '#0E844F' },
          700: { value: '#0A643C' },
          800: { value: '#074528' },
          900: { value: '#032716' },
        },
        neutral: {
          50:  { value: '#F3F7F5' },
          100: { value: '#E5EDEA' },
          200: { value: '#C9D6D1' },
          300: { value: '#A4B4AF' },
          400: { value: '#7A8D88' },
          500: { value: '#5E6E6A' },
          600: { value: '#404F4B' },
          700: { value: '#2C3C38' },
          800: { value: '#182420' },
          900: { value: '#0A1410' },
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
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.18em' },
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
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgHero: {
          value: { base: '{colors.teal.400}', _light: '{colors.teal.400}' },
        },
        bgHeroText: {
          value: { base: '{colors.teal.900}', _light: '{colors.teal.900}' },
        },
        bgSection: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.600}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.500}', _light: '{colors.neutral.400}' },
        },
        textOnHero: {
          value: { base: '{colors.teal.900}', _light: '{colors.teal.900}' },
        },
        textOnHeroMuted: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.700}' },
        },
        accent: {
          value: { base: '{colors.teal.400}', _light: '{colors.teal.600}' },
        },
        accentLight: {
          value: { base: '{colors.teal.300}', _light: '{colors.teal.500}' },
        },
        accentDark: {
          value: { base: '{colors.teal.600}', _light: '{colors.teal.700}' },
        },
        accentSubtle: {
          value: { base: '{colors.teal.800}', _light: '{colors.teal.100}' },
        },
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        borderAccent: {
          value: { base: '{colors.teal.700}', _light: '{colors.teal.200}' },
        },
        win: {
          value: { base: '{colors.teal.400}', _light: '{colors.teal.600}' },
        },
        loss: {
          value: { base: '{colors.neutral.500}', _light: '{colors.neutral.400}' },
        },
        surface: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        surfaceRaised: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})