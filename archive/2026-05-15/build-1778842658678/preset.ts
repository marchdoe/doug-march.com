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
    },
    'a:hover': {
      color: 'accentLight',
      textDecoration: 'underline',
    },
    p: {
      lineHeight: 'normal',
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
        primary: {
          '50': { value: '#FAF5FF' },
          '100': { value: '#F0E6FF' },
          '200': { value: '#DCC4FF' },
          '300': { value: '#C39BFF' },
          '400': { value: '#A668F5' },
          '500': { value: '#8B47E0' },
          '600': { value: '#7030C4' },
          '700': { value: '#561EA3' },
          '800': { value: '#3D1280' },
          '900': { value: '#270B57' },
        },
        neutral: {
          '50': { value: '#F3F0F8' },
          '100': { value: '#E5DEEF' },
          '200': { value: '#C4B8D8' },
          '300': { value: '#A294BC' },
          '400': { value: '#80709E' },
          '500': { value: '#5F4F7E' },
          '600': { value: '#443662' },
          '700': { value: '#2D2046' },
          '800': { value: '#1A102E' },
          '900': { value: '#0C0716' },
        },
      },

      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '5': { value: '24px' },
        '6': { value: '32px' },
        '7': { value: '48px' },
        '8': { value: '64px' },
        '9': { value: '96px' },
        '10': { value: '128px' },
      },

      lineHeights: {
        tight: { value: '0.88' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.02em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.08em' },
        widest: { value: '0.15em' },
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
        bgSubtle: {
          value: {
            base: '{colors.neutral.700}',
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
            _light: '{colors.neutral.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.primary.400}',
            _light: '{colors.primary.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.primary.200}',
            _light: '{colors.primary.400}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.primary.600}',
            _light: '{colors.primary.800}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.primary.300}',
            _light: '{colors.primary.500}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.primary.500}',
            _light: '{colors.primary.400}',
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