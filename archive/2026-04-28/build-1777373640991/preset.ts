import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    light: '&:is(:root.light, :root.light *)',
    dark: '&:is(:root.dark, :root.dark *)',
  },

  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    html: {
      colorScheme: 'light dark',
      scrollBehavior: 'smooth',
    },
    body: {
      margin: 0,
      padding: 0,
      fontSize: '1rem',
      lineHeight: 'normal',
      color: 'text',
      backgroundColor: 'bg',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'heading',
      lineHeight: 'snug',
      margin: 0,
      fontWeight: 'semibold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 200ms ease',
    },
    'a:hover': {
      color: 'accentDark',
    },
    'button, [role="button"]': {
      padding: 0,
      border: 'none',
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      cursor: 'pointer',
      transition: 'background-color 200ms ease',
    },
  },

  theme: {
    tokens: {
      colors: {
        // Neutrals: H:88° warm yellow-green, S:5-10%
        neutral: {
          50: { value: '#F2F3EE' },
          100: { value: '#E4E8DC' },
          200: { value: '#C9D1BE' },
          300: { value: '#A5B098' },
          400: { value: '#7E8F70' },
          500: { value: '#586447' },
          600: { value: '#3D4733' },
          700: { value: '#252D1E' },
          800: { value: '#131810' },
          900: { value: '#080D07' },
        },

        // Celadon accent: H:175°
        celadon: {
          light: { value: '#9ED9D3' },
          default: { value: '#5AADA5' },
          dark: { value: '#3A7D77' },
        },

        // Pale gold secondary: H:45°
        gold: {
          default: { value: '#C4A23F' },
          dark: { value: '#9A7D2A' },
        },

        // Utility
        transparent: { value: 'transparent' },
      },

      spacing: {
        4: { value: '4px' },
        8: { value: '8px' },
        12: { value: '12px' },
        16: { value: '16px' },
        24: { value: '24px' },
        32: { value: '32px' },
        48: { value: '48px' },
        64: { value: '64px' },
        96: { value: '96px' },
        120: { value: '120px' },
        160: { value: '160px' },
      },

      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },

      lineHeights: {
        tight: { value: '0.92' },
        snug: { value: '1.10' },
        normal: { value: '1.60' },
        loose: { value: '1.80' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },

      radii: {
        xs: { value: '2px' },
        sm: { value: '3px' },
        md: { value: '4px' },
        full: { value: '9999px' },
        none: { value: '0px' },
      },

      shadows: {
        sm: { value: '0 1px 0 rgba(37, 45, 30, 0.2)' },
        md: {
          value:
            '0 2px 8px rgba(37, 45, 30, 0.06), 0 8px 24px rgba(37, 45, 30, 0.04)',
        },
      },

      sizes: {
        contentMax: { value: '760px' },
        contentWideMax: { value: '1040px' },
        heroMinHeight: { value: '100vh' },
        featuredMinHeight: { value: '80vh' },
        pistonsMinHeight: { value: '60vh' },
        marleyMinHeight: { value: '50vh' },
        navHeight: { value: '56px' },
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
        bgDark: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.800}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.600}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.200}',
            _light: '{colors.neutral.500}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.400}',
          },
        },
        heading: {
          value: {
            base: '{colors.neutral.100}',
            _light: '{colors.neutral.700}',
          },
        },

        // Accent (Celadon)
        accent: {
          value: '{colors.celadon.default}',
        },
        accentLight: {
          value: '{colors.celadon.light}',
        },
        accentDark: {
          value: '{colors.celadon.dark}',
        },
        accentGlow: {
          value: 'rgba(90, 173, 165, 0.10)',
        },

        // Gold (secondary accent for Specimen moments)
        gold: {
          value: '{colors.gold.default}',
        },
        goldDark: {
          value: '{colors.gold.dark}',
        },

        // Borders
        border: {
          value: {
            base: '{colors.neutral.600}',
            _light: '{colors.neutral.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.100}',
          },
        },
      },
    },
  },
})