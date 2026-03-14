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
        // Blizzard palette — desaturated ice blues and stark whites
        ink: {
          50:  { value: '#F8FAFC' },
          100: { value: '#F1F5F9' },
          200: { value: '#CBD5E1' },
          300: { value: '#94A3B8' },
          400: { value: '#64748B' },
          500: { value: '#475569' },
          600: { value: '#334155' },
          700: { value: '#94A3B8' },
          800: { value: '#E2E8F0' },
          900: { value: '#0F172A' },
        },
        // Whiteout backgrounds — barely-there off-whites
        void: {
          100: { value: '#FAFBFD' },
          200: { value: '#F5F7FA' },
          300: { value: '#EFF2F7' },
          400: { value: '#E2E8F0' },
          500: { value: '#CBD5E1' },
        },
        cyan: {
          400: { value: '#7AADC4' },
          500: { value: '#5A9AB5' },
          600: { value: '#3B82A8' },
          glow: { value: 'rgba(59,130,168,0.06)' },
        },
        green: {
          400: { value: '#6BA368' },
          500: { value: '#5C9459' },
          dim:  { value: 'rgba(92,148,89,0.08)' },
        },
        blue: {
          400: { value: '#6B8EB5' },
          500: { value: '#7A9EC5' },
          dim:  { value: 'rgba(107,142,181,0.10)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
      },
      fontSizes: {
        '2xs': { value: '0.5rem'  },
        xs:    { value: '0.58rem' },
        sm:    { value: '0.65rem' },
        base:  { value: '0.75rem' },
        md:    { value: '0.85rem' },
        lg:    { value: '1.1rem'  },
        xl:    { value: '2.2rem'  },
        '2xl': { value: '3rem'   },
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '-0.02em' },
        wide:   { value: '0.08em'  },
        wider:  { value: '0.14em'  },
        widest: { value: '0.18em'  },
      },
      lineHeights: {
        tight:  { value: '1'   },
        snug:   { value: '1.3' },
        normal: { value: '1.6' },
      },
      spacing: {
        1:  { value: '0.2rem'  },
        2:  { value: '0.4rem'  },
        3:  { value: '0.6rem'  },
        4:  { value: '0.8rem'  },
        5:  { value: '1rem'    },
        6:  { value: '1.2rem'  },
        8:  { value: '1.6rem'  },
        10: { value: '2rem'    },
        12: { value: '2.5rem'  },
      },
      durations: {
        fast: { value: '0.2s'  },
        base: { value: '0.35s' },
        slow: { value: '0.6s'  },
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
