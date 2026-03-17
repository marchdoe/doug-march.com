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
      WebkitTextSizeAdjust: '100%',
    },
    body: {
      fontFamily: 'body',
      background: 'bg',
      color: 'text',
      fontSize: 'base',
      lineHeight: 'normal',
      fontWeight: 'regular',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      _hover: {
        color: 'accentLight',
      },
    },
    'button, input, select, textarea': {
      fontFamily: 'body',
      fontSize: 'base',
    },
    'pre, code, kbd, samp': {
      fontFamily: 'mono',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    hr: {
      border: 'none',
      borderTop: '1px solid',
      borderColor: 'border',
    },
  },

  theme: {
    tokens: {
      colors: {
        // Neutral scale — H:210°, S:7–9%, cold blue-slate
        slate: {
          50: { value: '#F3F4F8' },
          100: { value: '#E8ECF2' },
          200: { value: '#CBD0DB' },
          300: { value: '#A1AABB' },
          400: { value: '#747E92' },
          500: { value: '#535D6E' },
          600: { value: '#383F4D' },
          700: { value: '#262C38' },
          800: { value: '#161D26' },
          900: { value: '#0D1016' },
        },
        // Accent — deep moss green, H:148°
        moss: {
          light: { value: '#6FAE8D' },
          base: { value: '#37785A' },
          dark: { value: '#1A5636' },
          glow: { value: 'rgba(55, 120, 90, 0.10)' },
        },
      },

      fonts: {
        heading: { value: "'Syne', sans-serif" },
        body: { value: "'Work Sans', sans-serif" },
        mono: { value: "'JetBrains Mono', monospace" },
      },

      // Major Third scale (×1.250), base 16px
      fontSizes: {
        '2xs': { value: '10px' },
        xs: { value: '13px' },
        sm: { value: '16px' },
        base: { value: '16px' },
        md: { value: '20px' },
        lg: { value: '25px' },
        xl: { value: '31px' },
        '2xl': { value: '39px' },
      },

      fontWeights: {
        regular: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
        extrabold: { value: '800' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.22' },
        normal: { value: '1.58' },
        loose: { value: '1.80' },
      },

      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.06em' },
        wider: { value: '0.10em' },
        widest: { value: '0.14em' },
      },

      // Spacing scale — 4px base unit
      spacing: {
        '1': { value: '4px' },
        '2': { value: '8px' },
        '4': { value: '16px' },
        '6': { value: '24px' },
        '8': { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
      },

      // Newspaper has no radius — everything is hard-edged
      radii: {
        none: { value: '0px' },
        sm: { value: '0px' },
        md: { value: '0px' },
        lg: { value: '0px' },
        xl: { value: '0px' },
        full: { value: '0px' },
      },

      // No shadows — flat, unlit, new moon
      shadows: {
        none: { value: 'none' },
        sm: { value: 'none' },
        md: { value: 'none' },
        lg: { value: 'none' },
      },

      // Layout dimensions from the Broadsheet spec
      sizes: {
        masthead: { value: '56px' },
        row: { value: '44px' },
        footer: { value: '48px' },
        maxContent: { value: '1200px' },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
        bg: {
          value: {
            base: '{colors.slate.800}',
            _light: '{colors.slate.50}',
          },
        },
        bgElevated: {
          value: {
            base: '#1B2230',
            _light: '{colors.slate.100}',
          },
        },
        bgMasthead: {
          value: {
            base: '{colors.slate.900}',
            _light: '{colors.slate.100}',
          },
        },
        bgHover: {
          value: {
            base: '{colors.moss.glow}',
            _light: '{colors.moss.glow}',
          },
        },

        // Text hierarchy
        text: {
          value: {
            base: '{colors.slate.100}',
            _light: '{colors.slate.700}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.slate.300}',
            _light: '{colors.slate.500}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.slate.400}',
            _light: '{colors.slate.400}',
          },
        },

        // Accent — the single green thread
        accent: {
          value: {
            base: '{colors.moss.base}',
            _light: '{colors.moss.base}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.moss.light}',
            _light: '{colors.moss.light}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.moss.dark}',
            _light: '{colors.moss.dark}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.moss.glow}',
            _light: '{colors.moss.glow}',
          },
        },

        // Borders — hairline rules are the only structure
        border: {
          value: {
            base: '{colors.slate.700}',
            _light: '{colors.slate.200}',
          },
        },
        borderStrong: {
          value: {
            base: '{colors.slate.600}',
            _light: '{colors.slate.300}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.moss.base}',
            _light: '{colors.moss.base}',
          },
        },
      },

      // fonts and fontSizes are defined in raw tokens — no semantic overrides needed

      radii: {
        sm: { value: '{radii.none}' },
        md: { value: '{radii.none}' },
        lg: { value: '{radii.none}' },
      },

      shadows: {
        sm: { value: '{shadows.none}' },
        md: { value: '{shadows.none}' },
        lg: { value: '{shadows.none}' },
      },
    },
  },
})