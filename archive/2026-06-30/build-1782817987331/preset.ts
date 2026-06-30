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
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontOpticalSizing: 'auto',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      margin: '0',
    },
    p: {
      margin: '0',
    },
    '::selection': {
      backgroundColor: 'accent',
      color: 'textInverse',
    },
  },

  conditions: {
    _light: '[data-theme="light"] &, .light &',
    _dark: '[data-theme="dark"] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        // Vivid electric verdure — primary green scale, H≈117°
        // Sits inside color mandate's open zone 102°–125°
        green: {
          50:  { value: '#EFFFED' },
          100: { value: '#D4FFD0' },
          200: { value: '#A9FF9F' },
          300: { value: '#6BF761' },
          400: { value: '#3AEC2E' },
          500: { value: '#19D413' }, // HERO BAND BACKGROUND — H:117°, S:89%, L:45%
          600: { value: '#10A50B' },
          700: { value: '#0D7D09' },
          800: { value: '#0A5C07' },
          900: { value: '#073D05' },
        },
        // Deep forest near-blacks — dark band background family
        forest: {
          50:  { value: '#E8FFF0' },
          100: { value: '#C2F5D8' },
          200: { value: '#89E8B6' },
          300: { value: '#47D48F' },
          400: { value: '#16B866' },
          500: { value: '#0A924F' },
          600: { value: '#076F3B' },
          700: { value: '#054F2A' },
          800: { value: '#02300A' },
          900: { value: '#011509' }, // DARK BAND BACKGROUND — near-void forest
        },
        // Green-tinted neutrals — cohesion without obviousness, H≈120°, chroma ≈0.01
        stone: {
          50:  { value: '#F3FFF6' },
          100: { value: '#E2F5E8' },
          200: { value: '#C4E8CF' },
          300: { value: '#95CCB0' },
          400: { value: '#66AB90' },
          500: { value: '#44896E' },
          600: { value: '#2E6A52' },
          700: { value: '#1C4D3A' },
          800: { value: '#0F3325' },
          900: { value: '#081B13' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '10': { value: '40px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight:   { value: '0.88' },
        snug:    { value: '1.1' },
        normal:  { value: '1.5' },
        relaxed: { value: '1.65' },
        loose:   { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.16em' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        xl:   { value: '16px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light:     { value: '300' },
        normal:    { value: '400' },
        medium:    { value: '500' },
        semibold:  { value: '600' },
        bold:      { value: '700' },
        extrabold: { value: '800' },
        black:     { value: '900' },
      },
    },

    semanticTokens: {
      colors: {
        // Page background — deep forest near-black for content bands
        bg: {
          value: {
            base:   '{colors.forest.900}',
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base:   '{colors.forest.800}',
            _light: '{colors.stone.100}',
          },
        },
        // Hero band drench — vivid electric verdure
        bgHero: {
          value: {
            base:   '{colors.green.500}',
            _light: '{colors.green.500}',
          },
        },
        // Signals/alternate band — one shade lighter than page bg
        bgAlt: {
          value: {
            base:   '{colors.stone.900}',
            _light: '{colors.stone.100}',
          },
        },
        bgSubtle: {
          value: {
            base:   '{colors.forest.800}',
            _light: '{colors.stone.100}',
          },
        },

        // Text on dark bands
        text: {
          value: {
            base:   '{colors.stone.50}',
            _light: '{colors.forest.900}',
          },
        },
        textSecondary: {
          value: {
            base:   '{colors.stone.300}',
            _light: '{colors.stone.600}',
          },
        },
        textMuted: {
          value: {
            base:   '{colors.stone.500}',
            _light: '{colors.stone.400}',
          },
        },
        // Text ON the vivid green hero band (deep forest for contrast)
        textInverse: {
          value: {
            base:   '{colors.forest.900}',
            _light: '{colors.forest.900}',
          },
        },

        // Accent — bright green in dark context, darker green in light
        accent: {
          value: {
            base:   '{colors.green.400}',
            _light: '{colors.green.600}',
          },
        },
        accentLight: {
          value: {
            base:   '{colors.green.300}',
            _light: '{colors.green.500}',
          },
        },
        accentDark: {
          value: {
            base:   '{colors.green.600}',
            _light: '{colors.green.700}',
          },
        },

        // Borders
        border: {
          value: {
            base:   '{colors.forest.700}',
            _light: '{colors.stone.200}',
          },
        },
        borderSubtle: {
          value: {
            base:   '{colors.forest.800}',
            _light: '{colors.stone.100}',
          },
        },
      },
    },
  },
})