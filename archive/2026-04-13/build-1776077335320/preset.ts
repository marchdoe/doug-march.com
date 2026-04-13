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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'sm',
      lineHeight: 'normal',
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'snug',
      letterSpacing: 'tight',
      color: 'textHeading',
    },
    a: {
      color: 'textSecondary',
      textDecoration: 'none',
      transition: 'color 200ms ease',
    },
    'a:hover': {
      color: 'accent',
    },
    'p': {
      lineHeight: 'normal',
      maxWidth: '72ch',
    },
  },

  theme: {
    tokens: {
      fonts: {
        heading: { value: '"Syne", sans-serif' },
        body: { value: '"DM Sans", sans-serif' },
        mono: { value: '"JetBrains Mono", monospace' },
      },

      fontSizes: {
        '2xs': { value: '9px' },
        xs:   { value: '12px' },
        sm:   { value: '16px' },
        base: { value: '21px' },
        md:   { value: '28px' },
        lg:   { value: '37px' },
        xl:   { value: '50px' },
        '2xl':{ value: 'clamp(80px, 13vw, 160px)' },
      },

      fontWeights: {
        light:    { value: '300' },
        regular:  { value: '400' },
        medium:   { value: '500' },
        bold:     { value: '700' },
        extrabold:{ value: '800' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.65' },
        loose:  { value: '1.85' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.18em' },
      },

      colors: {
        // Sage neutral scale (H:105°, desaturated)
        sage: {
          50:  { value: '#F2F4EF' },
          100: { value: '#E4E9DF' },
          200: { value: '#C8D1C2' },
          300: { value: '#9DAA97' },
          400: { value: '#728A6D' },
          500: { value: '#4A5E45' },
          600: { value: '#354030' },
          700: { value: '#202B1D' },
          800: { value: '#121A10' },
          900: { value: '#090E07' },
        },

        // Teal accent (H:175°)
        teal: {
          light:   { value: '#8EC9C4' },
          DEFAULT: { value: '#2B8880' },
          dark:    { value: '#1A5E59' },
          glow:    { value: '#2B88801A' },
        },

        // Warm taupe secondary (H:30°)
        taupe: {
          DEFAULT: { value: '#9E7B5A' },
          dark:    { value: '#7A5E42' },
        },

        // Surfaces
        surface: {
          page:    { value: '#F2F4EF' },
          card:    { value: '#FAFBF8' },
          nav:     { value: '#E4E9DF' },
        },
      },

      spacing: {
        '0':  { value: '0px' },
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '24px' },
        '6':  { value: '32px' },
        '7':  { value: '48px' },
        '8':  { value: '64px' },
        '9':  { value: '96px' },
        '10': { value: '128px' },
      },

      radii: {
        none:   { value: '0px' },
        subtle: { value: '2px' },
        sm:     { value: '4px' },
        md:     { value: '8px' },
      },

      borders: {
        hairline: { value: '1px solid' },
      },

      sizes: {
        contentWide:   { value: '1100px' },
        contentNarrow: { value: '720px' },
        contentBody:   { value: '480px' },
        navHeight:     { value: '48px' },
        rowHeight:     { value: '48px' },
      },

      zIndex: {
        base:    { value: '0' },
        raised:  { value: '10' },
        overlay: { value: '100' },
        nav:     { value: '200' },
      },
    },

    semanticTokens: {
      colors: {
        // Backgrounds
        bg: {
          value: {
            base: '{colors.sage.800}',
            _light: '{colors.surface.page}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.sage.700}',
            _light: '{colors.surface.card}',
          },
        },
        bgNav: {
          value: {
            base: '{colors.sage.900}',
            _light: '{colors.surface.nav}',
          },
        },
        bgHover: {
          value: {
            base: '{colors.sage.700}',
            _light: '{colors.sage.100}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.sage.100}',
            _light: '{colors.sage.700}',
          },
        },
        textHeading: {
          value: {
            base: '{colors.sage.50}',
            _light: '{colors.sage.700}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.sage.300}',
            _light: '{colors.sage.500}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.sage.400}',
            _light: '{colors.sage.400}',
          },
        },
        textDisabled: {
          value: {
            base: '{colors.sage.500}',
            _light: '{colors.sage.300}',
          },
        },

        // Accent
        accent: {
          value: {
            base: '{colors.teal.light}',
            _light: '{colors.teal.DEFAULT}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.teal.DEFAULT}',
            _light: '{colors.teal.dark}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.teal.glow}',
            _light: '{colors.teal.glow}',
          },
        },

        // Secondary accent (taupe — links, scores)
        link: {
          value: {
            base: '{colors.taupe.DEFAULT}',
            _light: '{colors.taupe.DEFAULT}',
          },
        },
        linkHover: {
          value: {
            base: '{colors.taupe.dark}',
            _light: '{colors.taupe.dark}',
          },
        },

        // Borders
        border: {
          value: {
            base: '{colors.sage.600}',
            _light: '{colors.sage.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.sage.700}',
            _light: '{colors.sage.100}',
          },
        },
      },
    },
  },
})