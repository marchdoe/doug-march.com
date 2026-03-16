import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: { fontSize: '17px' },
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
    extend: {
      light: '.light &, [data-theme=light] &',
    },
  },
  theme: {
    tokens: {
      colors: {
        // Stone — humid overcast spring air; warm-gray, neither cold nor sunny
        stone: {
          50:  { value: '#F3F2EE' },
          100: { value: '#E8E6E0' },
          200: { value: '#CFCDC4' },
          300: { value: '#A8A59C' },
          400: { value: '#7B7870' },
          500: { value: '#525047' },
          600: { value: '#363430' },
          700: { value: '#242220' },
          800: { value: '#191817' },
          900: { value: '#0F0F0E' },
        },
        // Moss — St. Patrick's eve green; anticipatory, spring under cloud cover
        moss: {
          50:  { value: '#EDF4EB' },
          100: { value: '#D3E9CD' },
          200: { value: '#A2CC99' },
          300: { value: '#62A455' },
          400: { value: '#418039' },
          500: { value: '#2D5C28' },
          600: { value: '#1E3F1A' },
          glow: { value: 'rgba(98,164,85,0.10)' },
          dim:  { value: 'rgba(65,128,57,0.07)' },
        },
        // Amber — genuine win signal (Cameron Young, TPC Sawgrass)
        amber: {
          400: { value: '#C08540' },
          500: { value: '#9E6D2A' },
          dim:  { value: 'rgba(192,133,64,0.10)' },
        },
      },
      fonts: {
        mono:  { value: "'DM Mono', monospace" },
        serif: { value: "'Cormorant Garamond', Georgia, serif" },
      },
      fontSizes: {
        '2xs': { value: '0.62rem' },
        xs:    { value: '0.72rem' },
        sm:    { value: '0.84rem' },
        base:  { value: '0.95rem' },
        md:    { value: '1.08rem' },
        lg:    { value: '1.45rem' },
        xl:    { value: '2.6rem' },
        '2xl': { value: '4.2rem' },
      },
      fontWeights: {
        regular: { value: '400' },
        medium:  { value: '500' },
        bold:    { value: '600' },
      },
      letterSpacings: {
        tight:  { value: '-0.03em' },
        normal: { value: '0' },
        wide:   { value: '0.07em' },
        wider:  { value: '0.12em' },
        widest: { value: '0.18em' },
        // Almost too precise — the surveilled grid
        ruled:  { value: '0.22em' },
      },
      lineHeights: {
        tight:  { value: '1.05' },
        snug:   { value: '1.28' },
        normal: { value: '1.65' },
        loose:  { value: '1.85' },
      },
      spacing: {
        1:  { value: '0.25rem' },
        2:  { value: '0.5rem' },
        3:  { value: '0.75rem' },
        4:  { value: '1rem' },
        5:  { value: '1.5rem' },
        6:  { value: '2rem' },
        8:  { value: '3.25rem' },
        10: { value: '4.5rem' },
        12: { value: '6rem' },
      },
      durations: {
        fast: { value: '0.12s' },
        base: { value: '0.25s' },
        slow: { value: '0.5s' },
      },
      easings: {
        default: { value: 'ease' },
        out:     { value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.stone.800}', _light: '{colors.stone.50}' } },
          side:    { value: { base: '{colors.stone.900}', _light: '{colors.stone.50}' } },
          card:    { value: { base: '{colors.stone.700}', _light: '#FFFFFF' } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.stone.600}', _light: '{colors.stone.200}' } },
          mid:     { value: { base: '{colors.stone.500}', _light: '{colors.stone.300}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.stone.100}', _light: '{colors.stone.700}' } },
          mid:     { value: { base: '{colors.stone.300}', _light: '{colors.stone.500}' } },
          dim:     { value: { base: '{colors.stone.400}', _light: '{colors.stone.400}' } },
        },
        accent: {
          // moss.300 dark: 4.74:1 vs stone.800 ✓ AA | moss.500 light: 7.1:1 vs stone.50 ✓ AA
          DEFAULT: { value: { base: '{colors.moss.300}', _light: '{colors.moss.500}' } },
          dim:     { value: { base: '{colors.moss.400}', _light: '{colors.moss.500}' } },
          glow:    { value: { base: '{colors.moss.glow}', _light: '{colors.moss.dim}' } },
        },
        signal: {
          win:      { value: { base: '{colors.amber.400}', _light: '{colors.amber.500}' } },
          winDim:   { value: { base: '{colors.amber.dim}',  _light: '{colors.amber.dim}' } },
          green:    { value: { base: '{colors.moss.300}',   _light: '{colors.moss.500}' } },
          greenDim: { value: { base: '{colors.moss.glow}',  _light: '{colors.moss.dim}' } },
        },
        logo: {
          blue:     { value: { base: '{colors.stone.400}', _light: '{colors.stone.500}' } },
          blueDim:  { value: { base: 'rgba(123,120,112,0.12)', _light: 'rgba(82,80,71,0.10)' } },
          green:    { value: { base: '{colors.moss.300}',  _light: '{colors.moss.500}' } },
          greenDim: { value: { base: '{colors.moss.glow}', _light: '{colors.moss.dim}' } },
        },
      },
    },
  },
})
