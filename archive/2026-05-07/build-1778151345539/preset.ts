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
      fontOpticalSizing: 'auto',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'p': {
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    'a:hover': {
      color: 'accentGlow',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
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
        // Nightshade neutral scale — tinted toward H:295° violet
        neutral: {
          50:  { value: '#F8F4FC' },
          100: { value: '#EEE6F7' },
          200: { value: '#D9CCF0' },
          300: { value: '#BCA8DC' },
          400: { value: '#9980C4' },
          500: { value: '#775EA8' },
          600: { value: '#564282' },
          700: { value: '#3C2C60' },
          800: { value: '#251B42' },
          900: { value: '#0C0818' },
        },
        // Vivid violet/magenta primary — H:295°
        primary: {
          50:  { value: '#FBF0FE' },
          100: { value: '#F4D6FC' },
          200: { value: '#E9AEFA' },
          300: { value: '#D875F5' },
          400: { value: '#C840EE' },
          500: { value: '#A820C8' },
          600: { value: '#8610A0' },
          700: { value: '#660078' },
          800: { value: '#480054' },
          900: { value: '#2A0030' },
        },
        // Spring grass green — secondary accent, used only for "GRASS." and spring markers
        grass: {
          50:  { value: '#F0FDF4' },
          100: { value: '#DCFCE8' },
          200: { value: '#A8F7BE' },
          300: { value: '#64EE88' },
          400: { value: '#30D856' },
          500: { value: '#1CB840' },
          600: { value: '#118C2C' },
          700: { value: '#086620' },
          800: { value: '#034814' },
          900: { value: '#012C0A' },
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
        wider:   { value: '0.10em' },
        widest:  { value: '0.20em' },
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
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
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
        bgPanel: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
        bgSubtle: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.neutral.100}',
            _light: '{colors.neutral.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.500}',
            _light: '{colors.neutral.500}',
          },
        },

        // Violet accent
        accent: {
          value: {
            base: '{colors.primary.400}',
            _light: '{colors.primary.600}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.primary.300}',
            _light: '{colors.primary.500}',
          },
        },
        accentDim: {
          value: {
            base: '{colors.primary.700}',
            _light: '{colors.primary.200}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.primary.900}',
            _light: '{colors.primary.100}',
          },
        },

        // Grass green accent (secondary — "GRASS." word and spring markers only)
        grassAccent: {
          value: {
            base: '{colors.grass.400}',
            _light: '{colors.grass.600}',
          },
        },
        grassDim: {
          value: {
            base: '{colors.grass.700}',
            _light: '{colors.grass.200}',
          },
        },
        grassSubtle: {
          value: {
            base: '{colors.grass.900}',
            _light: '{colors.grass.100}',
          },
        },

        // Borders
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.200}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.primary.700}',
            _light: '{colors.primary.200}',
          },
        },
      },
    },
  },
})