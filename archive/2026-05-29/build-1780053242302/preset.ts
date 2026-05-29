import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    'html, body': {
      height: '100%',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    'p': {
      lineHeight: 'normal',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
  },

  conditions: {
    _light: { selector: '.light &, [data-color-mode="light"] &' },
    _dark: { selector: '.dark &, [data-color-mode="dark"] &' },
    _hover: { selector: '&:hover, &:focus-visible' },
  },

  theme: {
    tokens: {
      colors: {
        lime: {
          '50':  { value: '#F2FAE9' },
          '100': { value: '#E0F5CE' },
          '200': { value: '#BEED93' },
          '300': { value: '#94DE52' },
          '400': { value: '#68CB1E' },
          '500': { value: '#51A417' },
          '600': { value: '#3D7E12' },
          '700': { value: '#2A590C' },
          '800': { value: '#193806' },
          '900': { value: '#0D1F03' },
        },
        stone: {
          '50':  { value: '#F5F8F0' },
          '100': { value: '#E6EDE0' },
          '200': { value: '#C8D4BC' },
          '300': { value: '#A3B594' },
          '400': { value: '#7C906A' },
          '500': { value: '#5C6E4E' },
          '600': { value: '#404E36' },
          '700': { value: '#2B3523' },
          '800': { value: '#1A2215' },
          '900': { value: '#0D1209' },
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
        tight:  { value: '0.88' },
        snug:   { value: '1.15' },
        normal: { value: '1.6' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.12em' },
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
        bold:     { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.900}',
            _light: '{colors.stone.50}',
          },
        },
        'bg-card': {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        'bg-raised': {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        'bg-accent': {
          value: {
            base: '{colors.lime.400}',
            _light: '{colors.lime.400}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.50}',
            _light: '{colors.stone.900}',
          },
        },
        'text-secondary': {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.600}',
          },
        },
        'text-muted': {
          value: {
            base: '{colors.stone.500}',
            _light: '{colors.stone.400}',
          },
        },
        'text-on-accent': {
          value: {
            base: '{colors.stone.900}',
            _light: '{colors.stone.900}',
          },
        },
        accent: {
          value: {
            base: '{colors.lime.400}',
            _light: '{colors.lime.600}',
          },
        },
        'accent-subtle': {
          value: {
            base: '{colors.lime.700}',
            _light: '{colors.lime.100}',
          },
        },
        'accent-strong': {
          value: {
            base: '{colors.lime.300}',
            _light: '{colors.lime.500}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        'border-subtle': {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
      },
    },
  },
})