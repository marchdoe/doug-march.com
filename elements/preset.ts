import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  theme: {
    tokens: {
      colors: {
        // ink: blue family. Lower = lighter. Covers dark-mode text + light-mode backgrounds.
        ink: {
          50:  { value: '#F2F7FC' },
          100: { value: '#E8EFF8' },
          200: { value: '#C4D4E8' },
          300: { value: '#A8BECE' },
          400: { value: '#5A7A95' },
          500: { value: '#3E6882' },
          600: { value: '#2D5070' },
          700: { value: '#7AADC4' },
          800: { value: '#D4E8F8' },
          900: { value: '#0D1F30' },
        },
        // void: dark-mode backgrounds and borders only
        void: {
          100: { value: '#070F1E' },
          200: { value: '#040913' },
          300: { value: '#050C18' },
          400: { value: '#0A1828' },
          500: { value: '#0D2040' },
        },
        cyan: {
          400: { value: '#006E96' },
          500: { value: '#2090A8' },
          600: { value: '#00E5FF' },
          glow: { value: 'rgba(0,229,255,0.08)' },
        },
        green: {
          400: { value: '#4AAE3A' },
          500: { value: '#5CBE4A' },
          dim:  { value: 'rgba(92,190,74,0.10)' },
        },
        blue: {
          400: { value: '#3A7FC4' },
          500: { value: '#4A8FD4' },
          dim:  { value: 'rgba(74,143,212,0.12)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
      },
      fontSizes: {
        '2xs': { value: '0.48rem' },
        xs:    { value: '0.52rem' },
        sm:    { value: '0.6rem'  },
        base:  { value: '0.7rem'  },
        md:    { value: '0.8rem'  },
        lg:    { value: '1rem'    },
        xl:    { value: '1.9rem'  },
        '2xl': { value: '2.5rem'  },
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '-0.03em' },
        wide:   { value: '0.06em'  },
        wider:  { value: '0.1em'   },
        widest: { value: '0.12em'  },
      },
      lineHeights: {
        tight:  { value: '1'   },
        snug:   { value: '1.3' },
        normal: { value: '1.8' },
      },
      spacing: {
        1:  { value: '0.25rem' },
        2:  { value: '0.5rem'  },
        3:  { value: '0.75rem' },
        4:  { value: '1rem'    },
        5:  { value: '1.25rem' },
        6:  { value: '1.5rem'  },
        8:  { value: '2rem'    },
        10: { value: '2.5rem'  },
        12: { value: '3rem'    },
      },
      durations: {
        fast: { value: '0.15s' },
        base: { value: '0.25s' },
        slow: { value: '0.4s'  },
      },
      easings: {
        default: { value: 'ease' },
        out:     { value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.void.300}', _light: '{colors.ink.50}'  } },
          side:    { value: { base: '{colors.void.200}', _light: '{colors.ink.100}' } },
          card:    { value: { base: '{colors.void.100}', _light: '#FFFFFF'          } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.void.400}', _light: '{colors.ink.200}' } },
          mid:     { value: { base: '{colors.void.500}', _light: '{colors.ink.300}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.ink.800}',  _light: '{colors.ink.900}' } },
          mid:     { value: { base: '{colors.ink.700}',  _light: '{colors.ink.600}' } },
          dim:     { value: { base: '{colors.ink.500}',  _light: '{colors.ink.400}' } },
        },
        accent: {
          DEFAULT: { value: { base: '{colors.cyan.600}', _light: '{colors.cyan.400}' } },
          dim:     { value: { base: '{colors.cyan.500}', _light: '{colors.cyan.500}' } },
          glow:    { value: { base: '{colors.cyan.glow}', _light: 'rgba(0,110,150,0.08)' } },
        },
        logo: {
          blue:     { value: { base: '{colors.blue.500}',  _light: '{colors.blue.400}'         } },
          blueDim:  { value: { base: '{colors.blue.dim}',  _light: 'rgba(58,127,196,0.12)'     } },
          green:    { value: { base: '{colors.green.500}', _light: '{colors.green.400}'         } },
          greenDim: { value: { base: '{colors.green.dim}', _light: 'rgba(74,174,58,0.12)'       } },
        },
      },
    },
  },
})
