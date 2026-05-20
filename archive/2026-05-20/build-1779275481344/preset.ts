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
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    '::selection': {
      backgroundColor: '#5DC43A',
      color: '#080E07',
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
        green: {
          '50':  { value: '#F0FAE8' },
          '100': { value: '#D4F2C0' },
          '200': { value: '#A3E07C' },
          '300': { value: '#6DC83C' },
          '400': { value: '#4AAF24' },
          '500': { value: '#369218' },
          '600': { value: '#267511' },
          '700': { value: '#1A580B' },
          '800': { value: '#103C06' },
          '900': { value: '#092203' },
        },
        lime: {
          '50':  { value: '#F4FDE4' },
          '100': { value: '#E2FAC0' },
          '200': { value: '#C0F080' },
          '300': { value: '#93E040' },
          '400': { value: '#5DC43A' },
          '500': { value: '#3FAA24' },
          '600': { value: '#2D8C18' },
          '700': { value: '#1E6810' },
          '800': { value: '#12440A' },
          '900': { value: '#082505' },
        },
        neutral: {
          '50':  { value: '#F2F5F1' },
          '100': { value: '#E2EAE0' },
          '200': { value: '#C4D4C0' },
          '300': { value: '#9DB498' },
          '400': { value: '#728F6B' },
          '500': { value: '#527049' },
          '600': { value: '#3C5435' },
          '700': { value: '#283C22' },
          '800': { value: '#182616' },
          '900': { value: '#0D170A' },
          '950': { value: '#080E07' },
        },
        cream: {
          '50':  { value: '#FAFEF8' },
          '100': { value: '#EEF7EA' },
          '200': { value: '#D8EDCE' },
          '300': { value: '#B8D9AC' },
          '400': { value: '#8FBF83' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '20px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '10': { value: '40px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.15' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
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
          value: {
            base: '{colors.neutral.950}',
            _light: '{colors.neutral.50}',
          },
        },
        text: {
          value: {
            base: '{colors.cream.100}',
            _light: '{colors.neutral.950}',
          },
        },
        accent: {
          value: {
            base: '{colors.lime.400}',
            _light: '{colors.lime.500}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
      },
    },
  },
})