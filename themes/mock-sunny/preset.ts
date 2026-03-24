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
      fontSize: '20px',
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
        // Golden hour palette — warm ambers and honeyed tones
        ink: {
          50:  { value: '#FFF8E7' },
          100: { value: '#FCEFD0' },
          200: { value: '#E8C97A' },
          300: { value: '#C4983E' },
          400: { value: '#9A7435' },
          500: { value: '#6B4E28' },
          600: { value: '#4A3520' },
          700: { value: '#C4983E' },
          800: { value: '#F0DBA8' },
          900: { value: '#2C1D0E' },
        },
        // Warm parchment backgrounds
        void: {
          100: { value: '#FFFCF5' },
          200: { value: '#FFF7E8' },
          300: { value: '#FFF0D4' },
          400: { value: '#F5DEB3' },
          500: { value: '#E8C97A' },
        },
        cyan: {
          400: { value: '#E8942A' },
          500: { value: '#D4800F' },
          600: { value: '#B86E0A' },
          glow: { value: 'rgba(232,148,42,0.08)' },
        },
        green: {
          400: { value: '#A8873A' },
          500: { value: '#8B6F2A' },
          dim:  { value: 'rgba(168,135,58,0.10)' },
        },
        blue: {
          400: { value: '#C47A2A' },
          500: { value: '#D48A3A' },
          dim:  { value: 'rgba(196,122,42,0.12)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
      },
      fontSizes: {
        '2xs': { value: '0.6rem'  },
        xs:    { value: '0.7rem'  },
        sm:    { value: '0.8rem'  },
        base:  { value: '0.9rem'  },
        md:    { value: '1rem'    },
        lg:    { value: '1.3rem'  },
        xl:    { value: '2.6rem'  },
        '2xl': { value: '3.6rem'  },
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '0em'    },
        wide:   { value: '0.1em'  },
        wider:  { value: '0.16em' },
        widest: { value: '0.22em' },
      },
      lineHeights: {
        tight:  { value: '1.1' },
        snug:   { value: '1.4' },
        normal: { value: '1.8' },
      },
      spacing: {
        1:  { value: '0.3rem'  },
        2:  { value: '0.6rem'  },
        3:  { value: '0.9rem'  },
        4:  { value: '1.2rem'  },
        5:  { value: '1.5rem'  },
        6:  { value: '1.8rem'  },
        8:  { value: '2.4rem'  },
        10: { value: '3rem'    },
        12: { value: '3.8rem'  },
      },
      durations: {
        fast: { value: '0.25s' },
        base: { value: '0.45s' },
        slow: { value: '0.8s'  },
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
          DEFAULT: { value: { base: '{colors.ink.900}',  _light: '{colors.ink.900}' } },
          mid:     { value: { base: '{colors.ink.600}',  _light: '{colors.ink.600}' } },
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
