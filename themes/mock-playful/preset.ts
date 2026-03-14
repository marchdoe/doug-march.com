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
      fontSize: '18px',
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
        // Electric neon palette — deep purples, hot pinks, acid greens
        ink: {
          50:  { value: '#F5EEFF' },
          100: { value: '#E8D5FF' },
          200: { value: '#C9A0F0' },
          300: { value: '#A06CD4' },
          400: { value: '#7E4EB8' },
          500: { value: '#5C3494' },
          600: { value: '#3D1F6E' },
          700: { value: '#B088D4' },
          800: { value: '#DCC5F0' },
          900: { value: '#1A0A30' },
        },
        // Deep indigo/purple backgrounds
        void: {
          100: { value: '#16082E' },
          200: { value: '#120624' },
          300: { value: '#0E041C' },
          400: { value: '#241448' },
          500: { value: '#362060' },
        },
        cyan: {
          400: { value: '#FF4DA6' },
          500: { value: '#E6338F' },
          600: { value: '#CC1A78' },
          glow: { value: 'rgba(255,77,166,0.10)' },
        },
        green: {
          400: { value: '#39FF7F' },
          500: { value: '#20E066' },
          dim:  { value: 'rgba(57,255,127,0.10)' },
        },
        blue: {
          400: { value: '#A855F7' },
          500: { value: '#B86BFF' },
          dim:  { value: 'rgba(168,85,247,0.12)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
      },
      fontSizes: {
        '2xs': { value: '0.48rem' },
        xs:    { value: '0.56rem' },
        sm:    { value: '0.68rem' },
        base:  { value: '0.78rem' },
        md:    { value: '0.92rem' },
        lg:    { value: '1.2rem'  },
        xl:    { value: '2.5rem'  },
        '2xl': { value: '3.4rem'  },
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '-0.01em' },
        wide:   { value: '0.06em'  },
        wider:  { value: '0.12em'  },
        widest: { value: '0.20em'  },
      },
      lineHeights: {
        tight:  { value: '1.05' },
        snug:   { value: '1.35' },
        normal: { value: '1.65' },
      },
      spacing: {
        1:  { value: '0.22rem' },
        2:  { value: '0.45rem' },
        3:  { value: '0.7rem'  },
        4:  { value: '0.95rem' },
        5:  { value: '1.2rem'  },
        6:  { value: '1.5rem'  },
        8:  { value: '2rem'    },
        10: { value: '2.5rem'  },
        12: { value: '3.2rem'  },
      },
      durations: {
        fast: { value: '0.15s' },
        base: { value: '0.3s'  },
        slow: { value: '0.5s'  },
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
