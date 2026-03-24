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
      fontSize: '15px',
    },
    body: {
      fontFamily: 'mono',
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  conditions: {
    extend: {
      light: '.light &, [data-theme=light] &',
    },
  },
  theme: {
    tokens: {
      colors: {
        // High-contrast emergency palette — stark blacks, sharp whites, warning reds
        ink: {
          50:  { value: '#FFFFFF' },
          100: { value: '#F0F0F0' },
          200: { value: '#B0B0B0' },
          300: { value: '#808080' },
          400: { value: '#606060' },
          500: { value: '#404040' },
          600: { value: '#282828' },
          700: { value: '#909090' },
          800: { value: '#D0D0D0' },
          900: { value: '#000000' },
        },
        // Pitch-dark backgrounds — near-black with cool undertone
        void: {
          100: { value: '#0A0A0A' },
          200: { value: '#080808' },
          300: { value: '#050505' },
          400: { value: '#1A1A1A' },
          500: { value: '#2A2A2A' },
        },
        cyan: {
          400: { value: '#FF3333' },
          500: { value: '#E60000' },
          600: { value: '#CC0000' },
          glow: { value: 'rgba(230,0,0,0.12)' },
        },
        green: {
          400: { value: '#FF4444' },
          500: { value: '#CC2222' },
          dim:  { value: 'rgba(204,34,34,0.15)' },
        },
        blue: {
          400: { value: '#FF2020' },
          500: { value: '#FF3838' },
          dim:  { value: 'rgba(255,32,32,0.12)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
      },
      fontSizes: {
        '2xs': { value: '0.42rem' },
        xs:    { value: '0.5rem'  },
        sm:    { value: '0.58rem' },
        base:  { value: '0.65rem' },
        md:    { value: '0.72rem' },
        lg:    { value: '0.9rem'  },
        xl:    { value: '1.8rem'  },
        '2xl': { value: '2.4rem'  },
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '-0.04em' },
        wide:   { value: '0.04em'  },
        wider:  { value: '0.08em'  },
        widest: { value: '0.12em'  },
      },
      lineHeights: {
        tight:  { value: '0.95' },
        snug:   { value: '1.15' },
        normal: { value: '1.35' },
      },
      spacing: {
        1:  { value: '0.12rem' },
        2:  { value: '0.25rem' },
        3:  { value: '0.38rem' },
        4:  { value: '0.5rem'  },
        5:  { value: '0.65rem' },
        6:  { value: '0.8rem'  },
        8:  { value: '1rem'    },
        10: { value: '1.3rem'  },
        12: { value: '1.6rem'  },
      },
      durations: {
        fast: { value: '0.1s'  },
        base: { value: '0.2s'  },
        slow: { value: '0.35s' },
      },
      easings: {
        default: { value: 'ease' },
        out:     { value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.void.300}', _light: '{colors.void.300}' } },
          side:    { value: { base: '{colors.void.200}', _light: '{colors.void.200}' } },
          card:    { value: { base: '{colors.void.100}', _light: '{colors.void.100}' } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.void.400}', _light: '{colors.void.400}' } },
          mid:     { value: { base: '{colors.void.500}', _light: '{colors.void.500}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.ink.50}',   _light: '{colors.ink.50}' } },
          mid:     { value: { base: '{colors.ink.200}',  _light: '{colors.ink.200}' } },
          dim:     { value: { base: '{colors.ink.400}',  _light: '{colors.ink.400}' } },
        },
        accent: {
          DEFAULT: { value: { base: '{colors.cyan.600}', _light: '{colors.cyan.600}' } },
          dim:     { value: { base: '{colors.cyan.500}', _light: '{colors.cyan.500}' } },
          glow:    { value: { base: '{colors.cyan.glow}', _light: '{colors.cyan.glow}' } },
        },
        logo: {
          blue:     { value: { base: '{colors.blue.500}',  _light: '{colors.blue.400}'     } },
          blueDim:  { value: { base: '{colors.blue.dim}',  _light: '{colors.blue.dim}'     } },
          green:    { value: { base: '{colors.green.500}', _light: '{colors.green.400}'     } },
          greenDim: { value: { base: '{colors.green.dim}', _light: '{colors.green.dim}'    } },
        },
      },
    },
  },
})
