import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: '1.5',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: '0.88',
      letterSpacing: '0.01em',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
      _hover: {
        color: 'accentLight',
      },
    },
    'img, video': {
      display: 'block',
      maxWidth: '100%',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &, &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Hot rose-magenta accent scale — H≈330°, full saturation
        magenta: {
          50:  { value: '#FFE8F3' },
          100: { value: '#FFC2DF' },
          200: { value: '#FF93C8' },
          300: { value: '#FF5AA4' },
          400: { value: '#FF1A82' },
          500: { value: '#E8006B' },
          600: { value: '#C00058' },
          700: { value: '#920043' },
          800: { value: '#62002D' },
          900: { value: '#36001A' },
        },
        // Void-rose neutral family — tinted toward H:330°, dark-first
        neutral: {
          50:  { value: '#FEF3F8' },
          100: { value: '#FAEAF4' },
          200: { value: '#F0CAE0' },
          300: { value: '#D4A0BB' },
          400: { value: '#A8728F' },
          500: { value: '#7D4A68' },
          600: { value: '#572D4A' },
          700: { value: '#38172E' },
          800: { value: '#220B1B' },
          900: { value: '#130009' },
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
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.2em' },
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
        black:    { value: '900' },
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
        bgSidebar: {
          value: {
            base: '{colors.neutral.900}',
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
            base: '{colors.neutral.200}',
            _light: '{colors.neutral.700}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.magenta.500}',
            _light: '{colors.magenta.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.magenta.300}',
            _light: '{colors.magenta.400}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.magenta.700}',
            _light: '{colors.magenta.800}',
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