import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    'html': {
      height: '100%',
    },
    'body': {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentBright',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    '::selection': {
      background: '#4F5FFF',
      color: '#FFFFFF',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
    _focus: '&:focus',
    _focusVisible: '&:focus-visible',
  },

  theme: {
    tokens: {
      colors: {
        primary: {
          '50':  { value: '#F0F1FF' },
          '100': { value: '#E3E5FF' },
          '200': { value: '#C7CCFF' },
          '300': { value: '#9BA5FF' },
          '400': { value: '#7080FF' },
          '500': { value: '#4F5FFF' },
          '600': { value: '#3344EE' },
          '700': { value: '#2030CC' },
          '800': { value: '#161FA8' },
          '900': { value: '#0E1480' },
        },
        neutral: {
          '50':  { value: '#F3F4FA' },
          '100': { value: '#E6E8F5' },
          '200': { value: '#CDD1EA' },
          '300': { value: '#ACB0D0' },
          '400': { value: '#7D82B0' },
          '500': { value: '#555A88' },
          '600': { value: '#393D66' },
          '700': { value: '#252844' },
          '800': { value: '#181A30' },
          '900': { value: '#0C0D1A' },
          '950': { value: '#07080E' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
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
        tight:   { value: '-0.02em' },
        normal:  { value: '0' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
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
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
        bgHeroPanel: {
          value: {
            base: '{colors.primary.500}',
            _light: '{colors.primary.500}',
          },
        },
        bgSection: {
          value: {
            base: '{colors.neutral.950}',
            _light: '{colors.neutral.100}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.300}',
            _light: '{colors.neutral.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.500}',
          },
        },
        textOnIndigo: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.50}',
          },
        },
        accent: {
          value: {
            base: '{colors.primary.400}',
            _light: '{colors.primary.600}',
          },
        },
        accentBright: {
          value: {
            base: '{colors.primary.300}',
            _light: '{colors.primary.700}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.primary.800}',
            _light: '{colors.primary.100}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
      },
    },
  },
})