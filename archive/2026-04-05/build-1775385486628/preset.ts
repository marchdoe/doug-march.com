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
      fontVariantNumeric: 'tabular-nums',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'text',
    },
    'p, .prose': {
      maxWidth: '580px',
      lineHeight: 'normal',
    },
    a: {
      color: 'text',
      textDecoration: 'none',
      transition: 'color 150ms ease',
    },
    'a:hover': {
      color: 'accent',
    },
  },

  theme: {
    tokens: {
      fonts: {
        heading: { value: '"Cormorant Garamond", Georgia, serif' },
        body: { value: '"Lora", Georgia, serif' },
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
        regular: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.20' },
        normal: { value: '1.62' },
        loose: { value: '1.78' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '0.05em' },
        wider: { value: '0.09em' },
        widest: { value: '0.14em' },
      },

      colors: {
        // Neutral scale — hue 165°, 5–8% saturation
        neutral: {
          50: { value: '#F2F7F5' },
          100: { value: '#E4EFEC' },
          200: { value: '#C9DDD9' },
          300: { value: '#9BBFB8' },
          400: { value: '#6D9C95' },
          500: { value: '#4A7870' },
          600: { value: '#355A55' },
          700: { value: '#213A37' },
          800: { value: '#132421' },
          900: { value: '#0A1614' },
        },
        // Accent — amber-gold hue 48°
        amber: {
          light: { value: '#E8CB7E' },
          default: { value: '#C9920E' },
          dark: { value: '#8A6408' },
          glow: { value: 'rgba(201, 146, 14, 0.10)' },
        },
        // Pure white for cards
        white: { value: '#FFFFFF' },
      },

      spacing: {
        '0': { value: '0px' },
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

      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
        md: { value: '4px' },
        full: { value: '24px' },
      },

      shadows: {
        card: { value: '0 2px 20px rgba(33, 58, 55, 0.06)' },
        cardHeavy: { value: '0 4px 32px rgba(33, 58, 55, 0.10)' },
        cardDeep: { value: '0 6px 40px rgba(33, 58, 55, 0.14)' },
      },

      sizes: {
        contentWidth: { value: '720px' },
        contentWidthWide: { value: '800px' },
        proseWidth: { value: '580px' },
        quoteWidth: { value: '560px' },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
        bg: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.neutral.800}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.white}',
            _dark: '{colors.neutral.700}',
          },
        },
        bgSubtle: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.700}',
          },
        },
        bgHover: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.600}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.neutral.700}',
            _dark: '{colors.neutral.50}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.500}',
            _dark: '{colors.neutral.300}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.400}',
            _dark: '{colors.neutral.400}',
          },
        },

        // Accent
        accent: {
          value: {
            base: '{colors.amber.default}',
            _dark: '{colors.amber.light}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.amber.dark}',
            _dark: '{colors.amber.default}',
          },
        },
        accentSubtle: {
          value: {
            base: '{colors.amber.glow}',
            _dark: '{colors.amber.glow}',
          },
        },

        // Borders
        border: {
          value: {
            base: '{colors.neutral.200}',
            _dark: '{colors.neutral.600}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.amber.default}',
            _dark: '{colors.amber.default}',
          },
        },
      },
    },
  },
})