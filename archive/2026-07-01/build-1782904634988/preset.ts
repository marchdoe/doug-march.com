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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*': {
      boxSizing: 'border-box',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentLight',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      lineHeight: 'tight',
    },
    'p': {
      margin: '0',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        // Forensic rose — primary hue H:335°
        rose: {
          50:  { value: '#FFF0F6' },
          100: { value: '#FFD6E8' },
          200: { value: '#FFB0CC' },
          300: { value: '#FF80AA' },
          400: { value: '#FF4D88' },
          500: { value: '#FF2472' },
          600: { value: '#E0005A' },
          700: { value: '#B80048' },
          800: { value: '#8C0036' },
          900: { value: '#5E0024' },
        },
        // Void neutral — tinted toward rose-purple (H:325°), very low chroma
        neutral: {
          50:  { value: '#FCF7FA' },
          100: { value: '#F5EEEF' },
          200: { value: '#E8DDE4' },
          300: { value: '#CEB8C7' },
          400: { value: '#A88A9C' },
          500: { value: '#7F5E73' },
          600: { value: '#5C3D52' },
          700: { value: '#3D2237' },
          800: { value: '#261423' },
          900: { value: '#150A14' },
          950: { value: '#0C0610' },
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
        widest:  { value: '0.2em' },
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
        black:    { value: '900' },
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
        bgCard: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.100}',
          },
        },
        bgSubtle: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.200}',
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
            base: '{colors.neutral.500}',
            _light: '{colors.neutral.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.rose.500}',
            _light: '{colors.rose.700}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.rose.300}',
            _light: '{colors.rose.600}',
          },
        },
        accentDim: {
          value: {
            base: '{colors.rose.900}',
            _light: '{colors.rose.100}',
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