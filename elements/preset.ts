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
      fontFamily: 'serif',
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
        ink: {
          50:  { value: '#F5F2ED' },
          100: { value: '#E8E3DA' },
          200: { value: '#D4CEC3' },
          300: { value: '#A8A196' },
          400: { value: '#7A746A' },
          500: { value: '#5C564E' },
          600: { value: '#3E3A34' },
          700: { value: '#A8A196' },
          800: { value: '#DDD8CE' },
          900: { value: '#1A1714' },
        },
        void: {
          100: { value: '#0D0A08' },
          200: { value: '#110E0B' },
          300: { value: '#16120F' },
          400: { value: '#221E1A' },
          500: { value: '#2E2924' },
        },
        cyan: {
          400: { value: '#8B1A1A' },
          500: { value: '#A02020' },
          600: { value: '#C41E3A' },
          glow: { value: 'rgba(196,30,58,0.08)' },
        },
        green: {
          400: { value: '#6B5E4F' },
          500: { value: '#7D6F5E' },
          dim:  { value: 'rgba(125,111,94,0.10)' },
        },
        blue: {
          400: { value: '#5C554D' },
          500: { value: '#6E665E' },
          dim:  { value: 'rgba(110,102,94,0.12)' },
        },
      },
      fonts: {
        mono: { value: "'Space Mono', monospace" },
        serif: { value: "'Instrument Serif', serif" },
      },
      fontSizes: {
        '2xs': { value: '0.6rem' },
        xs:    { value: '0.7rem' },
        sm:    { value: '0.8rem' },
        base:  { value: '0.95rem' },
        md:    { value: '1.1rem' },
        lg:    { value: '1.5rem' },
        xl:    { value: '3rem' },
        '2xl': { value: '4.5rem' },
      },
      fontWeights: {
        regular: { value: '400' },
        bold:    { value: '700' },
      },
      letterSpacings: {
        tight:  { value: '-0.04em' },
        wide:   { value: '0.1em' },
        wider:  { value: '0.16em' },
        widest: { value: '0.24em' },
      },
      lineHeights: {
        tight:  { value: '1.0' },
        snug:   { value: '1.35' },
        normal: { value: '1.8' },
      },
      spacing: {
        1:  { value: '0.25rem' },
        2:  { value: '0.5rem' },
        3:  { value: '0.75rem' },
        4:  { value: '1rem' },
        5:  { value: '1.5rem' },
        6:  { value: '2rem' },
        8:  { value: '3.5rem' },
        10: { value: '5rem' },
        12: { value: '7rem' },
      },
      durations: {
        fast: { value: '0.15s' },
        base: { value: '0.3s' },
        slow: { value: '0.6s' },
      },
      easings: {
        default: { value: 'ease' },
        out:     { value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.void.300}', _light: '{colors.ink.50}' } },
          side:    { value: { base: '{colors.void.200}', _light: '{colors.ink.50}' } },
          card:    { value: { base: '{colors.void.100}', _light: '#FFFFFF' } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.void.400}', _light: '{colors.ink.200}' } },
          mid:     { value: { base: '{colors.void.500}', _light: '{colors.ink.300}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.ink.800}', _light: '{colors.ink.900}' } },
          mid:     { value: { base: '{colors.ink.700}', _light: '{colors.ink.600}' } },
          dim:     { value: { base: '{colors.ink.500}', _light: '{colors.ink.400}' } },
        },
        accent: {
          DEFAULT: { value: { base: '{colors.cyan.600}', _light: '{colors.cyan.400}' } },
          dim:     { value: { base: '{colors.cyan.500}', _light: '{colors.cyan.500}' } },
          glow:    { value: { base: '{colors.cyan.glow}', _light: 'rgba(139,26,26,0.06)' } },
        },
        logo: {
          blue:     { value: { base: '{colors.blue.500}', _light: '{colors.blue.400}' } },
          blueDim:  { value: { base: '{colors.blue.dim}', _light: 'rgba(92,85,77,0.15)' } },
          green:    { value: { base: '{colors.green.500}', _light: '{colors.green.400}' } },
          greenDim: { value: { base: '{colors.green.dim}', _light: 'rgba(107,94,79,0.08)' } },
        },
      },
    },
  },
})
