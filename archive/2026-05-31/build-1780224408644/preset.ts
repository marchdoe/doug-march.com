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
      lineHeight: 'normal',
      fontOpticalSizing: 'auto',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: 'wide',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease, opacity 0.15s ease',
    },
    'a:hover': {
      opacity: '0.75',
    },
    p: {
      lineHeight: 'normal',
    },
    'img, video': {
      display: 'block',
      maxWidth: '100%',
    },
    'button, input, select, textarea': {
      font: 'inherit',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },

  theme: {
    tokens: {
      colors: {
        // Primary accent family: acid chartreuse, H≈78°
        chartreuse: {
          50:  { value: '#F8FDE6' },
          100: { value: '#EEFABD' },
          200: { value: '#E0F58A' },
          300: { value: '#CAEC4C' },
          400: { value: '#B8E000' },
          500: { value: '#8DB300' },
          600: { value: '#688600' },
          700: { value: '#4D6400' },
          800: { value: '#334300' },
          900: { value: '#1A2100' },
        },
        // Neutral family: void, tinted toward H≈78° yellow-green
        void: {
          50:  { value: '#F2F5E4' },
          100: { value: '#E2E8C8' },
          200: { value: '#C8D2A4' },
          300: { value: '#AABA7E' },
          400: { value: '#8E9F5C' },
          500: { value: '#74833E' },
          600: { value: '#596728' },
          700: { value: '#404C18' },
          800: { value: '#28310A' },
          900: { value: '#141904' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.9' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.7' },
      },

      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.06em' },
        wider:   { value: '0.10em' },
        widest:  { value: '0.15em' },
      },

      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light:    { value: '300' },
        normal:   { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        // Surfaces
        bg: {
          value: {
            base:   '{colors.void.900}',
            _light: '{colors.void.50}',
          },
        },
        surface: {
          value: {
            base:   '{colors.void.800}',
            _light: '{colors.void.100}',
          },
        },
        surfaceRaised: {
          value: {
            base:   '{colors.void.700}',
            _light: '{colors.void.200}',
          },
        },
        // Text
        text: {
          value: {
            base:   '{colors.void.50}',
            _light: '{colors.void.900}',
          },
        },
        textSecondary: {
          value: {
            base:   '{colors.void.300}',
            _light: '{colors.void.600}',
          },
        },
        textMuted: {
          value: {
            base:   '{colors.void.400}',
            _light: '{colors.void.500}',
          },
        },
        // Accent
        accent: {
          value: {
            base:   '{colors.chartreuse.400}',
            _light: '{colors.chartreuse.600}',
          },
        },
        accentSubtle: {
          value: {
            base:   '{colors.chartreuse.800}',
            _light: '{colors.chartreuse.100}',
          },
        },
        accentBright: {
          value: {
            base:   '{colors.chartreuse.300}',
            _light: '{colors.chartreuse.500}',
          },
        },
        // Borders
        border: {
          value: {
            base:   '{colors.void.700}',
            _light: '{colors.void.200}',
          },
        },
        borderAccent: {
          value: {
            base:   '{colors.chartreuse.400}',
            _light: '{colors.chartreuse.500}',
          },
        },
        borderSubtle: {
          value: {
            base:   '{colors.void.800}',
            _light: '{colors.void.100}',
          },
        },
      },
    },
  },
})