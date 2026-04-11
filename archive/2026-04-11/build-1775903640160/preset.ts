import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      fontSize: '16px',
      scrollBehavior: 'smooth',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      background: 'bg',
      color: 'text',
      fontWeight: '400',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'snug',
      letterSpacing: 'tight',
      color: 'textHeading',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentHover',
    },
    '::selection': {
      background: 'accentGlow',
      color: 'text',
    },
  },

  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Space Grotesk', sans-serif" },
        body: { value: "'Work Sans', sans-serif" },
      },

      fontSizes: {
        '2xs': { value: '9px' },
        xs: { value: '12px' },
        sm: { value: '14px' },
        base: { value: '16px' },
        md: { value: '21px' },
        lg: { value: '28px' },
        xl: { value: '37px' },
        '2xl': { value: '50px' },
      },

      fontWeights: {
        light: { value: '300' },
        regular: { value: '400' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.20' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '-0.01em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },

      colors: {
        // Neutral scale — H:218°, 5–8% saturation
        neutral: {
          50: { value: '#F0F3F8' },
          100: { value: '#DFE7F1' },
          200: { value: '#BFC9D6' },
          300: { value: '#96AABB' },
          400: { value: '#6B8599' },
          500: { value: '#485F70' },
          600: { value: '#2E3E4D' },
          700: { value: '#1B2A37' },
          800: { value: '#0D1822' },
          900: { value: '#060C14' },
        },

        // Card surface
        surface: {
          card: { value: '#141E2B' },
        },

        // Rust accent — H:15°, dawn horizon
        rust: {
          light: { value: '#D36945' },
          default: { value: '#C34B22' },
          dark: { value: '#9C3816' },
          glow: { value: 'rgba(195, 75, 34, 0.10)' },
          subtle: { value: 'rgba(195, 75, 34, 0.04)' },
        },

        // Gold accent — H:43°, Masters / quote border
        gold: {
          light: { value: '#DDC588' },
          default: { value: '#D8A931' },
          dark: { value: '#9C7616' },
        },

        // Border utilities
        border: {
          card: { value: 'rgba(150, 170, 187, 0.10)' },
          section: { value: 'rgba(150, 170, 187, 0.08)' },
        },
      },

      spacing: {
        '0': { value: '0px' },
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '16px' },
        '4': { value: '24px' },
        '5': { value: '32px' },
        '6': { value: '48px' },
        '7': { value: '64px' },
        '8': { value: '96px' },
        '9': { value: '120px' },
      },

      radii: {
        none: { value: '0px' },
        tag: { value: '0px' },
        card: { value: '2px' },
        button: { value: '3px' },
      },

      sizes: {
        contentMax: { value: '720px' },
        quoteMax: { value: '480px' },
        leaderboardMax: { value: '320px' },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
        bg: {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.surface.card}',
            _light: '{colors.neutral.100}',
          },
        },
        bgDeep: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.200}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.neutral.100}',
            _light: '{colors.neutral.600}',
          },
        },
        textHeading: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.700}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.300}',
            _light: '{colors.neutral.500}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.400}',
          },
        },

        // Accent — rust
        accent: {
          value: {
            base: '{colors.rust.default}',
            _light: '{colors.rust.dark}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.rust.light}',
            _light: '{colors.rust.default}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.rust.glow}',
            _light: '{colors.rust.glow}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.rust.subtle}',
            _light: '{colors.rust.subtle}',
          },
        },

        // Gold — secondary accent
        gold: {
          value: {
            base: '{colors.gold.default}',
            _light: '{colors.gold.dark}',
          },
        },
        goldLight: {
          value: {
            base: '{colors.gold.light}',
            _light: '{colors.gold.default}',
          },
        },

        // Borders
        borderCard: {
          value: {
            base: '{colors.border.card}',
            _light: '{colors.neutral.200}',
          },
        },
        borderSection: {
          value: {
            base: '{colors.border.section}',
            _light: '{colors.neutral.200}',
          },
        },
      },
    },
  },
})