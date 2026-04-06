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
      fontFamily: 'body',
      fontSize: '20px',
      lineHeight: '1.55',
    },
    body: {
      fontFamily: 'body',
      background: 'bg',
      color: 'text',
      lineHeight: '1.55',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      color: 'textHeading',
      lineHeight: '1.05',
      letterSpacing: '-0.025em',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'code, pre, kbd': {
      fontFamily: 'mono',
    },
  },

  theme: {
    tokens: {
      fonts: {
        heading: { value: '"DM Sans", sans-serif' },
        body: { value: '"IBM Plex Sans", sans-serif' },
        mono: { value: '"IBM Plex Mono", monospace' },
      },

      fontSizes: {
        '2xs': { value: '0.625rem' },
        xs:   { value: '0.8125rem' },
        sm:   { value: '1rem' },
        base: { value: '1.25rem' },
        md:   { value: '1.5625rem' },
        lg:   { value: '1.9375rem' },
        xl:   { value: '2.4375rem' },
        '2xl':{ value: '3.0625rem' },
      },

      fontWeights: {
        light:    { value: '300' },
        regular:  { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '700' },
      },

      lineHeights: {
        tight:  { value: '1.05' },
        snug:   { value: '1.20' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.025em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.12em' },
      },

      colors: {
        neutral: {
          50:  { value: '#F2F7F9' },
          100: { value: '#E5EDF1' },
          200: { value: '#C8D8DF' },
          300: { value: '#9DB6C0' },
          400: { value: '#6B8E9E' },
          500: { value: '#446878' },
          600: { value: '#2C4F5D' },
          700: { value: '#183848' },
          800: { value: '#0C2230' },
          900: { value: '#06141C' },
        },
        sage: {
          light:   { value: '#89C8A2' },
          default: { value: '#4A9A6C' },
          dark:    { value: '#2D6B49' },
          glow:    { value: 'rgba(74, 154, 108, 0.10)' },
        },
        parchment: {
          default: { value: '#C4AD8A' },
        },
        featuredBand: {
          bg: { value: '#EEF4F6' },
        },
      },

      spacing: {
        '0':  { value: '0px' },
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '20px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '10': { value: '40px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      sizes: {
        contentMax:      { value: '1080px' },
        navHeight:       { value: '64px' },
        rowHeight:       { value: '48px' },
        bandHeroMin:     { value: '52vh' },
        bandFeaturedMin: { value: '55vh' },
        footerHeight:    { value: '200px' },
        asideMaxWidth:   { value: '220px' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        full: { value: '9999px' },
      },

      shadows: {
        card: { value: '0 2px 8px rgba(24, 56, 72, 0.07)' },
        none: { value: 'none' },
      },

      borders: {
        subtle: { value: '1px solid #C8D8DF' },
        none:   { value: 'none' },
      },

      zIndex: {
        base:  { value: '0' },
        above: { value: '10' },
        nav:   { value: '100' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.neutral.800}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.700}',
          },
        },
        bgHero: {
          value: {
            base: '{colors.neutral.700}',
            _dark: '{colors.neutral.900}',
          },
        },
        bgFeatured: {
          value: {
            base: '{colors.featuredBand.bg}',
            _dark: '{colors.neutral.800}',
          },
        },
        bgIndex: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.neutral.800}',
          },
        },
        bgWriting: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.700}',
          },
        },
        bgFooter: {
          value: {
            base: '{colors.neutral.800}',
            _dark: '{colors.neutral.900}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.600}',
            _dark: '{colors.neutral.100}',
          },
        },
        textHeading: {
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
        textHero: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.100}',
          },
        },
        textHeroSecondary: {
          value: {
            base: '{colors.neutral.300}',
            _dark: '{colors.neutral.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.sage.default}',
            _dark: '{colors.sage.light}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.sage.dark}',
            _dark: '{colors.sage.default}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.sage.light}',
            _dark: '{colors.sage.default}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.200}',
            _dark: '{colors.neutral.600}',
          },
        },
        editorial: {
          value: {
            base: '{colors.parchment.default}',
            _dark: '{colors.parchment.default}',
          },
        },
        rowHover: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.700}',
          },
        },
      },
    },
  },
})