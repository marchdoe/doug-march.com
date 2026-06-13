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
      height: '100%',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
      fontOpticalSizing: 'auto',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: '1',
      letterSpacing: '-0.03em',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.18s ease',
    },
    'a:hover': {
      color: 'accentHover',
    },
    '::selection': {
      backgroundColor: '#00D4A044',
      color: '#E5FBF4',
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
  },

  conditions: {
    _light: '.light &, [data-theme="light"] &',
    _dark: '.dark &, [data-theme="dark"] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        teal: {
          50:  { value: '#E5FBF4' },
          100: { value: '#BDEEE1' },
          200: { value: '#88E4CF' },
          300: { value: '#44D5B7' },
          400: { value: '#00D4A0' },
          500: { value: '#00B888' },
          600: { value: '#009870' },
          700: { value: '#007557' },
          800: { value: '#00523D' },
          900: { value: '#002F22' },
        },
        sage: {
          50:  { value: '#F0FAF6' },
          100: { value: '#DAEEE7' },
          200: { value: '#B9DDD2' },
          300: { value: '#8EC5B5' },
          400: { value: '#62A899' },
          500: { value: '#468B7C' },
          600: { value: '#346F63' },
          700: { value: '#26534A' },
          800: { value: '#183832' },
          900: { value: '#0E201C' },
        },
        void: {
          50:  { value: '#060E0B' },
          100: { value: '#091510' },
          200: { value: '#0E1E19' },
          300: { value: '#152A23' },
          400: { value: '#1D352D' },
          500: { value: '#264039' },
          600: { value: '#304D46' },
        },
      },
      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },
      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.04em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.18em' },
      },
      radii: {
        none: { value: '0px' },
        sm:   { value: '2px' },
        md:   { value: '4px' },
        lg:   { value: '8px' },
        full: { value: '9999px' },
      },
      fontWeights: {
        light:    { value: '300' },
        normal:   { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '700' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.void.50}' },
        },
        bgCard: {
          value: { base: '{colors.void.200}' },
        },
        bgPanel: {
          value: { base: '{colors.void.100}' },
        },
        bgHighlight: {
          value: { base: '{colors.void.400}' },
        },
        bgHover: {
          value: { base: '{colors.void.300}' },
        },
        text: {
          value: { base: '{colors.teal.50}' },
        },
        textSecondary: {
          value: { base: '{colors.sage.300}' },
        },
        textMuted: {
          value: { base: '{colors.sage.600}' },
        },
        accent: {
          value: { base: '{colors.teal.400}' },
        },
        accentHover: {
          value: { base: '{colors.teal.300}' },
        },
        accentDark: {
          value: { base: '{colors.teal.600}' },
        },
        accentGlow: {
          value: { base: '{colors.teal.500}' },
        },
        border: {
          value: { base: '{colors.void.400}' },
        },
        borderSubtle: {
          value: { base: '{colors.void.300}' },
        },
      },
    },
  },
})