import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      fontSize: '16px',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    p: {
      lineHeight: 'normal',
    },
    '::selection': {
      backgroundColor: 'accentSubtle',
      color: 'text',
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
        // Lime / Chartreuse — H:105° yellow-green
        lime: {
          50: { value: '#f2ffed' },
          100: { value: '#e0fcd5' },
          200: { value: '#c2f9a3' },
          300: { value: '#9ef070' },
          400: { value: '#76e035' },
          500: { value: '#54c918' },
          600: { value: '#3fa50d' },
          700: { value: '#307d09' },
          800: { value: '#225906' },
          900: { value: '#133402' },
        },
        // Neutral — near-black tinted toward H:105° forest-green
        neutral: {
          50: { value: '#f2f4f0' },
          100: { value: '#e4e8e1' },
          200: { value: '#c8d1c3' },
          300: { value: '#a8b4a2' },
          400: { value: '#7d8c77' },
          500: { value: '#566452' },
          600: { value: '#3e4b3a' },
          700: { value: '#2c362a' },
          800: { value: '#1c241a' },
          900: { value: '#0e1510' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight: { value: '0.92' },
        snug: { value: '1.1' },
        normal: { value: '1.55' },
        loose: { value: '1.8' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.1em' },
        widest: { value: '0.2em' },
      },

      radii: {
        none: { value: '0px' },
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
        // Backgrounds
        bg: {
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        bgCard: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSidebar: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        bgSubtle: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },

        // Text
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.600}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.500}', _light: '{colors.neutral.400}' },
        },

        // Accent — chartreuse / lime
        accent: {
          value: { base: '{colors.lime.400}', _light: '{colors.lime.600}' },
        },
        accentSubtle: {
          value: { base: '{colors.lime.900}', _light: '{colors.lime.100}' },
        },
        accentGlow: {
          value: { base: '{colors.lime.300}', _light: '{colors.lime.500}' },
        },
        accentDim: {
          value: { base: '{colors.lime.700}', _light: '{colors.lime.200}' },
        },

        // Borders / rules
        border: {
          value: { base: '{colors.neutral.700}', _light: '{colors.neutral.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
      },
    },
  },
})