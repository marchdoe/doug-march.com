import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
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
      letterSpacing: 'tight',
      fontWeight: 'bold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    '::selection': {
      backgroundColor: 'accentDark',
      color: 'bg',
    },
  },

  conditions: {
    _light: '[data-theme=light] &, .light &',
    _dark: '[data-theme=dark] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Primary: electric indigo — H:248°, mandated range 230–265°
        indigo: {
          50:  { value: '#EEF0FF' },
          100: { value: '#DDD8FF' },
          200: { value: '#BBB2FF' },
          300: { value: '#9B8FFB' },
          400: { value: '#7B6EF8' },
          500: { value: '#5C4EE8' },
          600: { value: '#4538C8' },
          700: { value: '#2F25A0' },
          800: { value: '#1D1670' },
          900: { value: '#0E0A40' },
        },
        // Neutral: indigo-tinted shadow scale — H:248° at 8–14% saturation
        neutral: {
          50:  { value: '#F5F4FF' },
          100: { value: '#ECEAFF' },
          200: { value: '#D4D2F0' },
          300: { value: '#B8B5D8' },
          400: { value: '#9290B8' },
          500: { value: '#6E6C94' },
          600: { value: '#4E4C70' },
          700: { value: '#32304C' },
          800: { value: '#1E1C30' },
          900: { value: '#0C0B1E' },
        },
      },

      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '16px' },
        4: { value: '24px' },
        5: { value: '32px' },
        6: { value: '48px' },
        7: { value: '64px' },
        8: { value: '96px' },
        9: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.92' },
        snug:   { value: '1.2' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
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
        // Backgrounds — dark-first
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
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },

        // Text
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

        // Accent — electric indigo
        accent: {
          value: {
            base: '{colors.indigo.400}',
            _light: '{colors.indigo.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.indigo.300}',
            _light: '{colors.indigo.400}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.indigo.500}',
            _light: '{colors.indigo.700}',
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
            _light: '{colors.neutral.100}',
          },
        },
      },
    },
  },
})