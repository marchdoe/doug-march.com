import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: '{colors.bg}',
      color: '{colors.text}',
      lineHeight: '{lineHeights.normal}',
      fontWeight: '{fontWeights.normal}',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: '{fontWeights.semibold}',
      color: '{colors.text}',
      lineHeight: '{lineHeights.tight}',
    },
    a: {
      color: '{colors.accent}',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    hr: {
      borderColor: '{colors.border}',
    },
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          50: { value: '#FAF8F2' },
          100: { value: '#F2ECE0' },
          200: { value: '#E4D5C0' },
          300: { value: '#C8B898' },
          400: { value: '#A89270' },
          500: { value: '#7D6A50' },
          600: { value: '#5A4C38' },
          700: { value: '#3D3328' },
          800: { value: '#241C14' },
          900: { value: '#130E08' },
        },
        accent: {
          light: { value: '#F8D07A' },
          500: { value: '#D4920F' },
          dark: { value: '#9A6800' },
          glow: { value: '#D4920F1A' },
        },
        sage: {
          500: { value: '#7C8F22' },
        },
      },

      spacing: {
        0: { value: '0' },
        4: { value: '4px' },
        8: { value: '8px' },
        12: { value: '12px' },
        16: { value: '16px' },
        24: { value: '24px' },
        32: { value: '32px' },
        48: { value: '48px' },
        64: { value: '64px' },
        72: { value: '72px' },
        80: { value: '80px' },
        96: { value: '96px' },
      },

      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.20' },
        normal: { value: '1.62' },
        loose: { value: '1.85' },
      },

      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },

      radii: {
        none: { value: '0' },
        sm: { value: '2px' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.50}',
            _dark: '{colors.stone.900}',
          },
        },
        'bg-secondary': {
          value: {
            base: '{colors.stone.100}',
            _dark: '{colors.stone.800}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.700}',
            _dark: '{colors.stone.50}',
          },
        },
        'text-secondary': {
          value: {
            base: '{colors.stone.600}',
            _dark: '{colors.stone.100}',
          },
        },
        'text-muted': {
          value: {
            base: '{colors.stone.500}',
            _dark: '{colors.stone.300}',
          },
        },
        accent: {
          value: {
            base: '{colors.accent.500}',
            _dark: '{colors.accent.light}',
          },
        },
        'accent-light': {
          value: {
            base: '{colors.accent.light}',
            _dark: '{colors.accent.500}',
          },
        },
        'accent-dark': {
          value: {
            base: '{colors.accent.dark}',
            _dark: '{colors.accent.dark}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.700}',
          },
        },
        'border-muted': {
          value: {
            base: '{colors.stone.300}',
            _dark: '{colors.stone.600}',
          },
        },
        sage: {
          value: {
            base: '{colors.sage.500}',
            _dark: '{colors.sage.500}',
          },
        },
      },
    },
  },
})