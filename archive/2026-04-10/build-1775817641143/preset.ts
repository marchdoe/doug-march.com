import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      background: 'bg',
      color: 'text',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'textHeading',
    },
    a: {
      color: 'textSecondary',
      textDecoration: 'none',
      transition: 'color 180ms ease',
    },
    'a:hover': {
      color: 'text',
    },
    'p': {
      lineHeight: 'normal',
    },
    'table': {
      borderCollapse: 'collapse',
    },
    'input, button, select, textarea': {
      fontFamily: 'body',
    },
  },

  conditions: {
    light: '[data-color-mode=light] &, .light &',
    dark: '[data-color-mode=dark] &, .dark &',
  },

  theme: {
    tokens: {
      colors: {
        // Neutral palette — H=160°, S=6–9%, teal-tinted
        neutral: {
          50:  { value: '#F3F8F5' },
          100: { value: '#E7EFEC' },
          200: { value: '#CDD9D5' },
          300: { value: '#AAB9B4' },
          400: { value: '#849690' },
          500: { value: '#5E726C' },
          600: { value: '#435651' },
          700: { value: '#2D3E39' },
          800: { value: '#1A2622' },
          900: { value: '#0F1714' },
        },
        // Amber accent — H=38°, strategic warmth
        amber: {
          light:   { value: '#F2C96A' },
          DEFAULT: { value: '#C4840A' },
          dark:    { value: '#8A5B00' },
          glow:    { value: 'rgba(196, 132, 10, 0.08)' },
        },
        // Sage secondary — H=138°, win states and hover
        sage: {
          DEFAULT: { value: '#5D8A69' },
          light:   { value: '#8AB896' },
        },
        // Panel differentiation
        panel: {
          left:  { value: '#EEF5F1' },
          right: { value: '#F3F8F5' },
        },
        white: { value: '#FFFFFF' },
        transparent: { value: 'transparent' },
      },

      fonts: {
        heading: { value: "'Fraunces', Georgia, 'Times New Roman', serif" },
        body:    { value: "'Outfit', system-ui, -apple-system, sans-serif" },
        mono:    { value: "'JetBrains Mono', 'Fira Code', monospace" },
      },

      // Perfect Fourth (1.333) scale, base 16px
      fontSizes: {
        '2xs': { value: '9px' },
        xs:    { value: '12px' },
        sm:    { value: '14px' },
        base:  { value: '16px' },
        md:    { value: '21px' },
        lg:    { value: '28px' },
        xl:    { value: '37px' },
        '2xl': { value: '50px' },
      },

      fontWeights: {
        light:    { value: '300' },
        regular:  { value: '400' },
        semibold: { value: '600' },
      },

      lineHeights: {
        tight:  { value: '1.05' },
        snug:   { value: '1.2' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.025em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.12em' },
      },

      // 4px base spacing scale
      spacing: {
        px:   { value: '1px' },
        '0':  { value: '0px' },
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '20px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '10': { value: '40px' },
        '12': { value: '48px' },
        '14': { value: '56px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '28': { value: '112px' },
        '32': { value: '128px' },
      },

      radii: {
        none:  { value: '0px' },
        sm:    { value: '2px' },
        md:    { value: '4px' },
        full:  { value: '9999px' },
      },

      shadows: {
        card:  { value: '0 1px 4px rgba(15, 23, 20, 0.06)' },
        none:  { value: 'none' },
      },

      sizes: {
        siteMax:         { value: '1240px' },
        leftPanelMin:    { value: '320px' },
        rightContentMax: { value: '640px' },
        rowHeight:       { value: '44px' },
        panelFull:       { value: '100vh' },
      },

      zIndex: {
        base:    { value: '0' },
        above:   { value: '1' },
        fixed:   { value: '10' },
        overlay: { value: '100' },
      },

      durations: {
        fast:   { value: '120ms' },
        normal: { value: '180ms' },
        slow:   { value: '300ms' },
      },

      easings: {
        ease:    { value: 'ease' },
        easeIn:  { value: 'ease-in' },
        easeOut: { value: 'ease-out' },
      },

      borders: {
        hairline: { value: '1px solid' },
        none:     { value: 'none' },
      },

      opacity: {
        0:   { value: '0' },
        30:  { value: '0.30' },
        50:  { value: '0.50' },
        60:  { value: '0.60' },
        70:  { value: '0.70' },
        100: { value: '1' },
      },
    },

    semanticTokens: {
      colors: {
        // — Backgrounds —
        bg: {
          value: { base: '{colors.neutral.50}', _dark: '{colors.neutral.800}' },
        },
        bgPanel: {
          value: { base: '{colors.panel.left}', _dark: '{colors.neutral.900}' },
        },
        bgCard: {
          value: { base: '{colors.white}', _dark: '{colors.neutral.700}' },
        },
        bgHover: {
          value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.700}' },
        },
        bgSubtle: {
          value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.800}' },
        },

        // — Text —
        text: {
          value: { base: '{colors.neutral.600}', _dark: '{colors.neutral.200}' },
        },
        textHeading: {
          value: { base: '{colors.neutral.700}', _dark: '{colors.neutral.50}' },
        },
        textSecondary: {
          value: { base: '{colors.neutral.500}', _dark: '{colors.neutral.400}' },
        },
        textMuted: {
          value: { base: '{colors.neutral.400}', _dark: '{colors.neutral.500}' },
        },
        textDisabled: {
          value: { base: '{colors.neutral.300}', _dark: '{colors.neutral.600}' },
        },

        // — Accent (amber) —
        accent: {
          value: { base: '{colors.amber.DEFAULT}', _dark: '{colors.amber.light}' },
        },
        accentLight: {
          value: { base: '{colors.amber.light}', _dark: '{colors.amber.DEFAULT}' },
        },
        accentDark: {
          value: { base: '{colors.amber.dark}', _dark: '{colors.amber.DEFAULT}' },
        },
        accentGlow: {
          value: { base: '{colors.amber.glow}', _dark: '{colors.amber.glow}' },
        },

        // — Secondary accent (sage) —
        sage: {
          value: { base: '{colors.sage.DEFAULT}', _dark: '{colors.sage.light}' },
        },

        // — Borders —
        border: {
          value: { base: '{colors.neutral.200}', _dark: '{colors.neutral.700}' },
        },
        borderSubtle: {
          value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.800}' },
        },
        borderStrong: {
          value: { base: '{colors.neutral.300}', _dark: '{colors.neutral.600}' },
        },

        // — Interactive —
        navText: {
          value: { base: '{colors.neutral.500}', _dark: '{colors.neutral.400}' },
        },
        navActive: {
          value: { base: '{colors.amber.DEFAULT}', _dark: '{colors.amber.light}' },
        },
        linkHover: {
          value: { base: '{colors.neutral.700}', _dark: '{colors.neutral.100}' },
        },

        // — Signal-specific —
        scoreWin: {
          value: { base: '{colors.sage.DEFAULT}', _dark: '{colors.sage.light}' },
        },
        scoreLoss: {
          value: { base: '{colors.neutral.300}', _dark: '{colors.neutral.600}' },
        },
        leaderScore: {
          value: { base: '{colors.amber.DEFAULT}', _dark: '{colors.amber.light}' },
        },
        quoteRule: {
          value: { base: '{colors.amber.DEFAULT}', _dark: '{colors.amber.light}' },
        },
      },
    },
  },
})