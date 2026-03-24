import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    extend: {
      light: '.light &',
      dark: '.dark &',
    },
  },

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
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
      color: 'text',
      minHeight: '100vh',
      margin: '0',
      padding: '0',
      background: 'linear-gradient(to right, #D8DCE2 0%, #E6E9ED 45%, #F0F2F5 100%)',
      _dark: {
        background: 'linear-gradient(to right, #070C10 0%, #0A1118 45%, #131B22 100%)',
      },
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'heading',
      margin: '0',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accentHover',
      textDecoration: 'underline',
    },
  },

  theme: {
    tokens: {
      colors: {
        // Chrome neutral scale — hue 207°, saturation 4-8%
        // Near-achromatic: the cold is felt, not seen
        chrome: {
          50: { value: '#F0F2F5' },   // page background base
          100: { value: '#E5E8EC' },  // card backgrounds, subtle fills
          200: { value: '#CBD1D8' },  // borders, rules
          300: { value: '#A3ACB5' },  // disabled states
          400: { value: '#798490' },  // placeholder, muted text
          500: { value: '#536270' },  // secondary text
          600: { value: '#38444F' },  // body text in light mode
          700: { value: '#222C36' },  // headings, annotation text
          800: { value: '#131B22' },  // deep text, near-black, dark bg
          900: { value: '#0A1118' },  // specimen type — the darkest stamp
        },

        // Ember accent — hue 18° (red-orange scoreboard)
        // The only warmth on the page. One 148px rectangle of defiant spring.
        ember: {
          light: { value: '#F0906A' },
          DEFAULT: { value: '#D94C14' },
          dark: { value: '#8D2C07' },
          glow: { value: 'rgba(217, 76, 20, 0.12)' },
        },

        white: { value: '#FFFFFF' },
      },

      fonts: {
        // Syne — industrial without being Brutalist, flat terminals,
        // wheat-pasted not typeset. Wet Leg's jagged charm.
        heading: { value: "'Syne', sans-serif" },
        // Work Sans — neutral enough to disappear as annotation.
        // Radiohead's precision in the footnotes around the monument.
        body: { value: "'Work Sans', sans-serif" },
      },

      fontSizes: {
        // Perfect Fifth (1.500) ratio, base 16px
        // Extreme ratio for Specimen — the gap between display and annotation IS the system
        '2xs': { value: '0.4375rem' },  // 7px  — micro labels only
        xs:    { value: '0.6875rem' },  // 11px — annotation strip, captions
        sm:    { value: '1rem' },       // 16px — body, annotation copy
        base:  { value: '1rem' },       // 16px — body baseline
        md:    { value: '1.5rem' },     // 24px — subheadings
        lg:    { value: '2.25rem' },    // 36px — section display
        xl:    { value: '3.375rem' },   // 54px — large display
        '2xl': { value: '5.0625rem' },  // 81px — display headline
        // Specimen hero lives beyond the scale as a CSS clamp in components:
        // font-size: clamp(96px, 17vw, 232px) — the monument itself
      },

      fontWeights: {
        light:   { value: '300' },
        regular: { value: '400' },
        bold:    { value: '700' },
        black:   { value: '800' },
      },

      lineHeights: {
        tight:  { value: '0.85' },  // specimen hero — letters leaning on each other for warmth
        snug:   { value: '1.1' },   // secondary display
        normal: { value: '1.5' },   // body / annotation
        loose:  { value: '1.72' },  // captions with breathing room
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },  // specimen hero — industrial compression
        normal:  { value: '0em' },
        wide:    { value: '0.06em' },
        wider:   { value: '0.12em' },   // weather / moon metadata
        widest:  { value: '0.22em' },   // labels, attribution, category tags
      },

      spacing: {
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
      },

      radii: {
        // Hard edges everywhere — the brief is explicit.
        // Chrome in winter light has no soft corners.
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },

      sizes: {
        xs:   { value: '320px' },
        sm:   { value: '480px' },
        md:   { value: '768px' },
        lg:   { value: '1024px' },
        xl:   { value: '1200px' },
        '2xl':{ value: '1440px' },
        full: { value: '100%' },
      },

      zIndex: {
        base:    { value: '0' },
        raised:  { value: '10' },
        overlay: { value: '100' },
        modal:   { value: '200' },
        toast:   { value: '300' },
      },
    },

    semanticTokens: {
      colors: {
        // Background tokens
        bg: {
          value: {
            base: '{colors.chrome.50}',
            _dark: '{colors.chrome.900}',
          },
        },
        bgCard: {
          value: {
            base: '#F5F6F8',
            _dark: '{colors.chrome.800}',
          },
        },

        // Text tokens — WCAG AA compliant
        // chrome.900 (#0A1118) on chrome.50 (#F0F2F5) = ~18:1 ✓
        // chrome.100 (#E5E8EC) on chrome.900 (#0A1118) = ~17:1 ✓
        text: {
          value: {
            base: '{colors.chrome.900}',
            _dark: '{colors.chrome.100}',
          },
        },
        heading: {
          value: {
            base: '{colors.chrome.900}',
            _dark: '{colors.chrome.50}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.chrome.600}',
            _dark: '{colors.chrome.400}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.chrome.400}',
            _dark: '{colors.chrome.500}',
          },
        },

        // Border tokens — single horizontal rule is the only line ornament
        border: {
          value: {
            base: '{colors.chrome.200}',
            _dark: '{colors.chrome.700}',
          },
        },

        // Accent tokens — ember heat, appears only where the brief demands
        accent: {
          value: {
            base: '{colors.ember.DEFAULT}',
            _dark: '{colors.ember.light}',
          },
        },
        accentHover: {
          value: {
            base: '{colors.ember.dark}',
            _dark: '{colors.ember.DEFAULT}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.ember.glow}',
            _dark: '{colors.ember.glow}',
          },
        },
        accentText: {
          value: {
            base: '{colors.white}',
            _dark: '{colors.white}',
          },
        },
        accentBg: {
          value: {
            base: '{colors.ember.DEFAULT}',
            _dark: '{colors.ember.DEFAULT}',
          },
        },
        accentBgHover: {
          value: {
            base: '{colors.ember.dark}',
            _dark: '{colors.ember.dark}',
          },
        },
      },
    },
  },
})