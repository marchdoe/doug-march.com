import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*, *::before, *::after': { boxSizing: 'border-box', margin: '0', padding: '0' },
    html: { fontSize: '16px' },
    body: {
      fontFamily: 'serif',
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: { color: 'inherit', textDecoration: 'none' },
  },
  conditions: {
    extend: { light: '.light &, [data-theme=light] &' },
  },
  theme: {
    tokens: {
      colors: {
        fog: {
          50:  { value: '#eef0ea' },
          100: { value: '#dce4d4' },
          200: { value: '#c0ccb7' },
          300: { value: '#9aab90' },
          400: { value: '#8a9a80' },
          500: { value: '#5e6e56' },
          600: { value: '#3d4e38' },
          700: { value: '#263025' },
          800: { value: '#171b14' },
          850: { value: '#0f1310' },
          900: { value: '#090c07' },
        },
        sage: {
          100: { value: '#c4d9c6' },
          200: { value: '#97c09b' },
          300: { value: '#70a878' },
          400: { value: '#4d7d53' },
          500: { value: '#325040' },
          shamrock: { value: '#5a8e62' },
          glow:  { value: 'rgba(112,168,120,0.09)' },
          faint: { value: 'rgba(112,168,120,0.05)' },
        },
      },
      fonts: {
        mono:  { value: "'IBM Plex Mono', monospace" },
        serif: { value: "'Spectral', serif" },
      },
      fontSizes: {
        '2xs': { value: '0.75rem' },
        xs:    { value: '0.8125rem' },
        sm:    { value: '0.875rem' },
        base:  { value: '1rem' },
        md:    { value: '1.125rem' },
        lg:    { value: '1.375rem' },
        xl:    { value: '2.25rem' },
        '2xl': { value: '3.5rem' },
      },
      fontWeights: { regular: { value: '400' }, bold: { value: '700' } },
      letterSpacings: {
        tight:  { value: '-0.02em' },
        wide:   { value: '0.05em' },
        wider:  { value: '0.09em' },
        widest: { value: '0.14em' },
      },
      lineHeights: {
        tight:  { value: '1.1' },
        snug:   { value: '1.45' },
        normal: { value: '1.65' },
      },
      spacing: {
        1:  { value: '0.25rem' },
        2:  { value: '0.5rem' },
        3:  { value: '0.75rem' },
        4:  { value: '1rem' },
        5:  { value: '1.5rem' },
        6:  { value: '2rem' },
        8:  { value: '3rem' },
        10: { value: '5rem' },
        12: { value: '7rem' },
      },
      durations: { fast: { value: '0.12s' }, base: { value: '0.25s' }, slow: { value: '0.5s' } },
      easings: { default: { value: 'ease' }, out: { value: 'cubic-bezier(0.0, 0, 0.2, 1)' } },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.fog.900}', _light: '{colors.fog.50}' } },
          side:    { value: { base: '{colors.fog.850}', _light: '{colors.fog.100}' } },
          card:    { value: { base: '{colors.fog.800}', _light: '#ffffff' } },
        },
        border: {
          DEFAULT: { value: { base: 'rgba(138,154,128,0.07)', _light: '{colors.fog.200}' } },
          mid:     { value: { base: 'rgba(138,154,128,0.13)', _light: '{colors.fog.300}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.fog.100}', _light: '{colors.fog.700}' } },
          mid:     { value: { base: '{colors.fog.200}', _light: '{colors.fog.600}' } },
          dim:     { value: { base: '{colors.fog.400}', _light: '{colors.fog.500}' } },
        },
        accent: {
          DEFAULT: { value: { base: '{colors.sage.300}', _light: '{colors.sage.400}' } },
          dim:     { value: { base: '{colors.sage.400}', _light: '{colors.sage.300}' } },
          glow:    { value: { base: '{colors.sage.faint}', _light: '{colors.sage.glow}' } },
        },
        logo: {
          blue:     { value: { base: '{colors.fog.400}', _light: '{colors.fog.500}' } },
          blueDim:  { value: { base: 'rgba(138,154,128,0.1)', _light: 'rgba(138,154,128,0.1)' } },
          green:    { value: { base: '{colors.sage.300}', _light: '{colors.sage.400}' } },
          greenDim: { value: { base: '{colors.sage.faint}', _light: '{colors.sage.glow}' } },
        },
      },
    },
  },
})
