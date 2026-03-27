import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    extend: {
      _light: '[class~="light"] &',
      _dark: '[class~="dark"] &',
    },
  },

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      fontSize: '16px',
    },
    body: {
      fontFamily: 'body',
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'snug',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          50:  { value: '#F8F5F0' },
          100: { value: '#EEE8DF' },
          200: { value: '#D8CEBD' },
          300: { value: '#B5A98D' },
          400: { value: '#907A5C' },
          500: { value: '#6A5840' },
          600: { value: '#48392C' },
          700: { value: '#2D241A' },
          800: { value: '#19130D' },
          900: { value: '#0F0B07' },
        },
        amber: {
          light:   { value: '#F5C97A' },
          DEFAULT: { value: '#E8950E' },
          dark:    { value: '#A86B05' },
          glow:    { value: 'rgba(232, 149, 14, 0.10)' },
        },
      },

      fonts: {
        heading: { value: '"DM Sans", sans-serif' },
        body:    { value: '"Lora", Georgia, serif' },
        mono:    { value: '"JetBrains Mono", "Fira Code", monospace' },
      },

      fontSizes: {
        '2xs': { value: '0.5625rem' },   /* 9px  */
        xs:    { value: '0.75rem' },      /* 12px */
        sm:    { value: '1rem' },         /* 16px */
        base:  { value: '1.3125rem' },   /* 21px */
        md:    { value: '1.75rem' },      /* 28px */
        lg:    { value: '2.375rem' },     /* 38px */
        xl:    { value: '3.125rem' },     /* 50px */
        '2xl': { value: '4.1875rem' },   /* 67px */
      },

      fontWeights: {
        regular: { value: '400' },
        medium:  { value: '500' },
        semibold:{ value: '600' },
        bold:    { value: '700' },
      },

      lineHeights: {
        tight:  { value: '0.95' },
        snug:   { value: '1.2' },
        normal: { value: '1.55' },
        loose:  { value: '1.85' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.18em' },
      },

      spacing: {
        px:  { value: '1px' },
        1:   { value: '4px' },
        2:   { value: '8px' },
        3:   { value: '12px' },
        4:   { value: '16px' },
        6:   { value: '24px' },
        8:   { value: '32px' },
        10:  { value: '40px' },
        12:  { value: '48px' },
        16:  { value: '64px' },
        18:  { value: '72px' },
        20:  { value: '80px' },
        24:  { value: '96px' },
        32:  { value: '128px' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '0px' },
        md:   { value: '0px' },
        lg:   { value: '0px' },
        full: { value: '0px' },
      },

      shadows: {
        none: { value: 'none' },
        sm:   { value: 'none' },
        md:   { value: 'none' },
        lg:   { value: 'none' },
      },

      sizes: {
        content:   { value: '1100px' },
        sidebar:   { value: '320px' },
        quotebox:  { value: '720px' },
        rowHeight: { value: '44px' },
      },

      borders: {
        hairline: { value: '1px solid' },
      },

      zIndex: {
        base:    { value: '0' },
        raised:  { value: '10' },
        nav:     { value: '100' },
        overlay: { value: '200' },
      },
    },

    semanticTokens: {
      colors: {
        /* ── Page backgrounds ── */
        bg: {
          value: {
            base:   '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },
        bgDeep: {
          value: {
            base:   '{colors.stone.900}',
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base:   '{colors.stone.700}',
            _light: '{colors.stone.50}',
          },
        },
        bgMuted: {
          value: {
            base:   '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        bgSubtle: {
          value: {
            base:   '{colors.stone.800}',
            _light: '{colors.stone.50}',
          },
        },

        /* ── Band-specific backgrounds ── */
        bgBandDark: {
          value: {
            base:   '{colors.stone.900}',
            _light: '{colors.stone.800}',
          },
        },
        bgBandWarm: {
          value: {
            base:   '{colors.stone.700}',
            _light: '{colors.stone.100}',
          },
        },
        bgBandLight: {
          value: {
            base:   '{colors.stone.800}',
            _light: '{colors.stone.50}',
          },
        },
        bgBandStone: {
          value: {
            base:   '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        bgBandFooter: {
          value: {
            base:   '{colors.stone.900}',
            _light: '{colors.stone.700}',
          },
        },

        /* ── Text ── */
        text: {
          value: {
            base:   '{colors.stone.50}',
            _light: '{colors.stone.700}',
          },
        },
        textSecondary: {
          value: {
            base:   '{colors.stone.200}',
            _light: '{colors.stone.500}',
          },
        },
        textMuted: {
          value: {
            base:   '{colors.stone.300}',
            _light: '{colors.stone.400}',
          },
        },
        textOnDark: {
          value: {
            base:   '{colors.stone.50}',
            _light: '{colors.stone.50}',
          },
        },
        textSecondaryOnDark: {
          value: {
            base:   '{colors.stone.200}',
            _light: '{colors.stone.200}',
          },
        },
        textMutedOnDark: {
          value: {
            base:   '{colors.stone.300}',
            _light: '{colors.stone.300}',
          },
        },

        /* ── Accent ── */
        accent: {
          value: {
            base:   '{colors.amber.DEFAULT}',
            _light: '{colors.amber.DEFAULT}',
          },
        },
        accentLight: {
          value: {
            base:   '{colors.amber.light}',
            _light: '{colors.amber.light}',
          },
        },
        accentDark: {
          value: {
            base:   '{colors.amber.dark}',
            _light: '{colors.amber.dark}',
          },
        },
        accentGlow: {
          value: {
            base:   '{colors.amber.glow}',
            _light: '{colors.amber.glow}',
          },
        },

        /* ── Borders ── */
        border: {
          value: {
            base:   '{colors.stone.600}',
            _light: '{colors.stone.200}',
          },
        },
        borderSubtle: {
          value: {
            base:   '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        borderOnDark: {
          value: {
            base:   '{colors.stone.300}',
            _light: '{colors.stone.300}',
          },
        },
      },
    },
  },
})