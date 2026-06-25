import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: '0',
      padding: '0',
      minHeight: '100vh',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontFeatureSettings: '"kern" 1, "liga" 1, "tnum" 1',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      padding: '0',
      lineHeight: 'tight',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.12s ease',
    },
    'a:hover': {
      color: 'accentLight',
    },
    '*': {
      boxSizing: 'border-box',
    },
    '::selection': {
      background: '#7030E8',
      color: '#F0ECF8',
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
        violet: {
          50: { value: '#F5EEFF' },
          100: { value: '#E8DAFF' },
          200: { value: '#CEAEFF' },
          300: { value: '#B07FFF' },
          400: { value: '#9050FF' },
          500: { value: '#7030E8' },
          600: { value: '#5615C4' },
          700: { value: '#3E0C9A' },
          800: { value: '#280670' },
          900: { value: '#160048' },
        },
        neutral: {
          50: { value: '#F7F5FC' },
          100: { value: '#EDE9F5' },
          200: { value: '#D8D1E8' },
          300: { value: '#BEB4D5' },
          400: { value: '#9F93BF' },
          500: { value: '#7E70A8' },
          600: { value: '#5E5088' },
          700: { value: '#423568' },
          800: { value: '#281E48' },
          900: { value: '#120A2C' },
        },
        ink: {
          base: { value: '#0E0B18' },
          card: { value: '#1A1430' },
          sidebar: { value: '#130F22' },
          rule: { value: '#281E48' },
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
        tight: { value: '0.88' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.65' },
      },

      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.10em' },
        widest: { value: '0.15em' },
      },

      radii: {
        none: { value: '0' },
        sm: { value: '2px' },
        md: { value: '4px' },
        lg: { value: '8px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: '#0E0B18', _light: '#F7F5FC' },
        },
        cardBg: {
          value: { base: '#1A1430', _light: '#EDE9F5' },
        },
        sidebarBg: {
          value: { base: '#130F22', _light: '#EDE9F5' },
        },
        text: {
          value: { base: '#F0ECF8', _light: '#120A2C' },
        },
        textSecondary: {
          value: { base: '#BEB4D5', _light: '#423568' },
        },
        textMuted: {
          value: { base: '#7E70A8', _light: '#7E70A8' },
        },
        accent: {
          value: { base: '#B07FFF', _light: '#7030E8' },
        },
        accentLight: {
          value: { base: '#CEAEFF', _light: '#9050FF' },
        },
        accentDark: {
          value: { base: '#7030E8', _light: '#5615C4' },
        },
        accentGlow: {
          value: { base: '#9050FF', _light: '#B07FFF' },
        },
        border: {
          value: { base: '#281E48', _light: '#D8D1E8' },
        },
        borderSubtle: {
          value: { base: '#1A1430', _light: '#EDE9F5' },
        },
      },
    },
  },
})