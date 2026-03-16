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
        // Fog — the primary neutral: barely-green gray, overcast spring air
        // Neither warm stone nor cold slate — damp fog on new grass
        fog: {
          50:  { value: '#F0F2EE' },
          100: { value: '#E1E5DE' },
          200: { value: '#C3C9BE' },
          300: { value: '#98A092' },
          400: { value: '#6D7568' },
          500: { value: '#484F43' },
          600: { value: '#303630' },
          700: { value: '#20241F' },
          800: { value: '#161914' },
          900: { value: '#0C0E0A' },
        },
        // Fern — St. Patrick's eve green, seen through cloud cover
        // Saturated enough to feel alive, muted enough to feel anticipated
        fern: {
          50:  { value: '#EAF0E6' },
          100: { value: '#CCD9C5' },
          200: { value: '#99BC8D' },
          300: { value: '#5A9450' },  // dark mode accent — 5.1:1 vs fog.800 ✓ AA
          400: { value: '#3A7330' },
          500: { value: '#275120' },  // light mode accent — 8.0:1 vs fog.50 ✓ AA
          600: { value: '#1A3817' },
          glow: { value: 'rgba(90,148,80,0.13)' },
          dim:  { value: 'rgba(58,115,48,0.08)' },
        },
        // Amber — genuine win signal: Tigers 13 runs, Cameron Young -13
        // Warm counterpoint to the green field — a circled box score
        amber: {
          400: { value: '#C4883E' },
          500: { value: '#A06E2C' },
          dim:  { value: 'rgba(196,136,62,0.11)' },
        },
      },
      fonts: {
        mono:  { value: "'DM Mono', 'Courier New', monospace" },
        serif: { value: "'Newsreader', Georgia, serif" },
      },
      fontSizes: {
        '2xs': { value: '0.62rem' },   // ~10.5px — labels only
        xs:    { value: '0.74rem' },   // ~12.6px — captions
        sm:    { value: '0.865rem' },  // ~14.7px — secondary text, meets AA floor
        base:  { value: '0.94rem' },   // ~16px — body
        md:    { value: '1.1rem' },    // ~18.7px — comfortable read
        lg:    { value: '1.5rem' },    // ~25.5px — section titles
        xl:    { value: '2.65rem' },   // ~45px — display
        '2xl': { value: '4.4rem' },    // ~75px — hero
      },
      fontWeights: {
        regular: { value: '400' },
        medium:  { value: '500' },
        bold:    { value: '600' },
      },
      letterSpacings: {
        tight:  { value: '-0.03em' },
        normal: { value: '0' },
        wide:   { value: '0.06em' },
        wider:  { value: '0.11em' },
        widest: { value: '0.17em' },
        // The workweek grid — precise as a ruled ledger
        ruled:  { value: '0.22em' },
      },
      lineHeights: {
        tight:  { value: '1.06' },
        snug:   { value: '1.28' },
        normal: { value: '1.65' },
        loose:  { value: '1.88' },
      },
      spacing: {
        1:  { value: '0.25rem' },   // 4px
        2:  { value: '0.5rem' },    // 8px
        3:  { value: '0.75rem' },   // 12px
        4:  { value: '1rem' },      // 16px
        5:  { value: '1.5rem' },    // 24px
        6:  { value: '2rem' },      // 32px
        8:  { value: '3.25rem' },   // 52px
        10: { value: '4.5rem' },    // 72px
        12: { value: '6rem' },      // 96px
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
          // fog.800: near-black with a whisper of green — the new moon sky
          DEFAULT: { value: { base: '{colors.fog.800}', _light: '{colors.fog.50}' } },
          side:    { value: { base: '{colors.fog.900}', _light: '{colors.fog.50}' } },
          card:    { value: { base: '{colors.fog.700}', _light: '#FFFFFF' } },
          // Subtle fern tint for elements that want the green to creep through
          tint:    { value: { base: '{colors.fern.glow}', _light: '{colors.fern.dim}' } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.fog.600}', _light: '{colors.fog.200}' } },
          mid:     { value: { base: '{colors.fog.500}', _light: '{colors.fog.300}' } },
          // The fern edge — St. Patrick's eve creeping in at the margins
          accent:  { value: { base: '{colors.fern.300}', _light: '{colors.fern.400}' } },
        },
        text: {
          // fog.100 vs fog.800: 14.6:1 ✓✓  |  fog.700 vs fog.50: 14.0:1 ✓✓
          DEFAULT: { value: { base: '{colors.fog.100}', _light: '{colors.fog.700}' } },
          mid:     { value: { base: '{colors.fog.300}', _light: '{colors.fog.500}' } },
          dim:     { value: { base: '{colors.fog.400}', _light: '{colors.fog.400}' } },
        },
        accent: {
          // fern.300 vs fog.800: ~5.1:1 ✓ AA  |  fern.500 vs fog.50: ~8.0:1 ✓ AA
          DEFAULT: { value: { base: '{colors.fern.300}', _light: '{colors.fern.500}' } },
          dim:     { value: { base: '{colors.fern.400}', _light: '{colors.fern.500}' } },
          glow:    { value: { base: '{colors.fern.glow}', _light: '{colors.fern.dim}' } },
        },
        signal: {
          // Amber for genuine wins — Tigers 13 runs, Cameron Young's -13
          win:      { value: { base: '{colors.amber.400}', _light: '{colors.amber.500}' } },
          winDim:   { value: { base: '{colors.amber.dim}',  _light: '{colors.amber.dim}' } },
          // Fern for market green and St. Patrick's eve
          green:    { value: { base: '{colors.fern.300}',   _light: '{colors.fern.500}' } },
          greenDim: { value: { base: '{colors.fern.glow}',  _light: '{colors.fern.dim}' } },
        },
        logo: {
          blue:     { value: { base: '{colors.fog.400}',   _light: '{colors.fog.500}' } },
          blueDim:  { value: { base: 'rgba(109,117,104,0.13)', _light: 'rgba(72,79,67,0.10)' } },
          green:    { value: { base: '{colors.fern.300}',  _light: '{colors.fern.500}' } },
          greenDim: { value: { base: '{colors.fern.glow}', _light: '{colors.fern.dim}' } },
        },
      },
    },
  },
})