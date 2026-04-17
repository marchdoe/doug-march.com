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
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      background: 'bg',
      color: 'text',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'p': {
      lineHeight: 'normal',
      maxWidth: '68ch',
    },
  },

  theme: {
    tokens: {
      fonts: {
        heading: { value: '"Playfair Display", Georgia, serif' },
        body: { value: '"Source Sans 3", system-ui, sans-serif' },
        mono: { value: '"JetBrains Mono", "Courier New", monospace' },
      },

      fontSizes: {
        '2xs': { value: '0.5625rem' },   // 9px
        xs:    { value: '0.75rem' },      // 12px
        sm:    { value: '0.875rem' },     // 14px
        base:  { value: '1rem' },         // 16px
        md:    { value: '1.3125rem' },    // 21px
        lg:    { value: '1.75rem' },      // 28px
        xl:    { value: '2.3125rem' },    // 37px
        '2xl': { value: '3.125rem' },     // 50px
      },

      fontWeights: {
        light:    { value: '300' },
        regular:  { value: '400' },
        semibold: { value: '600' },
        bold:     { value: '700' },
        black:    { value: '900' },
      },

      lineHeights: {
        tight:  { value: '1.05' },
        snug:   { value: '1.20' },
        normal: { value: '1.62' },
        loose:  { value: '1.85' },
      },

      letterSpacings: {
        tight:   { value: '-0.025em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.14em' },
      },

      colors: {
        // Warm amber-sand neutral scale (H:55°, S:5–30%)
        sand: {
          50:  { value: '#F9F6EE' },
          100: { value: '#EEE8D8' },
          200: { value: '#D9D1BC' },
          300: { value: '#B5AC97' },
          400: { value: '#8C8373' },
          500: { value: '#695F50' },
          600: { value: '#4A4238' },
          700: { value: '#2D2820' },
          800: { value: '#1A1610' },
          900: { value: '#0E0B07' },
        },

        // Sage green accent (H:112°)
        sage: {
          light:   { value: '#AABFA4' },
          DEFAULT: { value: '#5E8C55' },
          dark:    { value: '#3A5E34' },
          glow:    { value: 'rgba(94, 140, 85, 0.09)' },
        },

        // Honey-gold secondary accent (H:38°)
        honey: {
          DEFAULT: { value: '#C08B1C' },
          light:   { value: '#D4A83A' },
        },

        // Band-specific backgrounds
        band: {
          identity: { value: '#1A1610' },
          page:     { value: '#F9F6EE' },
          card:     { value: '#EEE8D8' },
          quote:    { value: '#3A5E34' },
          repos:    { value: '#EEE8D8' },
          work:     { value: '#F2EDE2' },
          footer:   { value: '#1A1610' },
        },
      },

      spacing: {
        '0':   { value: '0px' },
        '1':   { value: '4px' },
        '2':   { value: '8px' },
        '3':   { value: '12px' },
        '4':   { value: '16px' },
        '5':   { value: '20px' },
        '6':   { value: '24px' },
        '7':   { value: '28px' },
        '8':   { value: '32px' },
        '10':  { value: '40px' },
        '12':  { value: '48px' },
        '14':  { value: '56px' },
        '16':  { value: '64px' },
        '20':  { value: '80px' },
        '24':  { value: '96px' },
        '32':  { value: '128px' },
      },

      radii: {
        none: { value: '0px' },
        xs:   { value: '2px' },
        sm:   { value: '3px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },

      borders: {
        hairline: { value: '1px solid #D9D1BC' },
        subtle:   { value: '1px solid #B5AC97' },
      },

      sizes: {
        contentNarrow:  { value: '720px' },
        contentDefault: { value: '1100px' },
        contentWide:    { value: '1200px' },
        quoteMax:       { value: '820px' },
        bodyMax:        { value: '680px' },
      },
    },

    semanticTokens: {
      colors: {
        // Base backgrounds
        bg: {
          value: {
            base:   '{colors.sand.800}',
            _light: '{colors.sand.50}',
          },
        },
        bgCard: {
          value: {
            base:   '{colors.sand.700}',
            _light: '{colors.sand.100}',
          },
        },
        bgSubtle: {
          value: {
            base:   '{colors.sand.700}',
            _light: '{colors.sand.100}',
          },
        },

        // Text tokens
        text: {
          value: {
            base:   '{colors.sand.100}',
            _light: '{colors.sand.700}',
          },
        },
        textSecondary: {
          value: {
            base:   '{colors.sand.300}',
            _light: '{colors.sand.500}',
          },
        },
        textMuted: {
          value: {
            base:   '{colors.sand.400}',
            _light: '{colors.sand.400}',
          },
        },
        textOnDark: {
          value: {
            base:   '{colors.sand.100}',
            _light: '{colors.sand.100}',
          },
        },
        textOnLight: {
          value: {
            base:   '{colors.sand.700}',
            _light: '{colors.sand.700}',
          },
        },

        // Accent tokens
        accent: {
          value: {
            base:   '{colors.sage.light}',
            _light: '{colors.sage.DEFAULT}',
          },
        },
        accentStrong: {
          value: {
            base:   '{colors.sage.DEFAULT}',
            _light: '{colors.sage.dark}',
          },
        },
        accentGlow: {
          value: {
            base:   '{colors.sage.glow}',
            _light: '{colors.sage.glow}',
          },
        },

        // Secondary accent
        gold: {
          value: {
            base:   '{colors.honey.DEFAULT}',
            _light: '{colors.honey.DEFAULT}',
          },
        },

        // Border tokens
        border: {
          value: {
            base:   '{colors.sand.600}',
            _light: '{colors.sand.200}',
          },
        },
        borderSubtle: {
          value: {
            base:   '{colors.sand.700}',
            _light: '{colors.sand.200}',
          },
        },

        // Interactive states
        hoverBg: {
          value: {
            base:   'rgba(94, 140, 85, 0.09)',
            _light: 'rgba(94, 140, 85, 0.07)',
          },
        },
        navLink: {
          value: {
            base:   '{colors.sand.300}',
            _light: '{colors.sand.400}',
          },
        },
        navLinkHover: {
          value: {
            base:   '{colors.sage.light}',
            _light: '{colors.sage.DEFAULT}',
          },
        },
      },
    },
  },

  conditions: {
    light: '[data-color-mode=light] &, .light &',
    dark:  '[data-color-mode=dark] &, .dark &',
  },
})