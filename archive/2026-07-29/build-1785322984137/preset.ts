import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      fontKerning: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 140ms ease',
    },
    'a:hover': {
      color: 'accent',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
      fontWeight: 'normal',
      textWrap: 'balance',
      lineHeight: 'tight',
    },
    p: {
      textWrap: 'pretty',
    },
    '::selection': {
      background: '{colors.magenta.400}',
      color: '{colors.plum.900}',
    },
  },
  conditions: {
    light: '&:is(.light *, [data-theme="light"] *)',
    dark: '&:is(.dark *, [data-theme="dark"] *)',
    hover: '&:hover',
  },
  theme: {
    tokens: {
      colors: {
        magenta: {
          50: { value: '#FDE7F1' },
          100: { value: '#FBC9E0' },
          200: { value: '#F79BC5' },
          300: { value: '#F266A6' },
          400: { value: '#F0308A' },
          500: { value: '#D01571' },
          600: { value: '#A81056' },
          700: { value: '#7C0B41' },
          800: { value: '#52072B' },
          900: { value: '#2E0417' },
        },
        plum: {
          50: { value: '#FBEAF2' },
          100: { value: '#F3D5E2' },
          200: { value: '#E3B0C8' },
          300: { value: '#CC86A8' },
          400: { value: '#A85C82' },
          500: { value: '#7E405E' },
          600: { value: '#5C2C44' },
          700: { value: '#421E31' },
          800: { value: '#2B1220' },
          900: { value: '#1B0912' },
        },
        glow: {
          value: '#FF8FC7',
        },
      },
      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '16px' },
        4: { value: '24px' },
        5: { value: '32px' },
        6: { value: '48px' },
        7: { value: '64px' },
        8: { value: '96px' },
        9: { value: '128px' },
      },
      lineHeights: {
        tight: { value: '1.02' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.015em' },
        normal: { value: '0' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },
      radii: {
        none: { value: '0' },
        sm: { value: '0' },
        md: { value: '0' },
        lg: { value: '0' },
        full: { value: '9999px' },
      },
      fontWeights: {
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.plum.900}', _light: '{colors.plum.50}' },
        },
        surface: {
          value: { base: '{colors.plum.800}', _light: '{colors.plum.100}' },
        },
        panel: {
          value: { base: '#220C18', _light: '#FFFFFF' },
        },
        text: {
          value: { base: '{colors.plum.50}', _light: '{colors.plum.900}' },
        },
        textMuted: {
          value: { base: '{colors.plum.300}', _light: '{colors.plum.500}' },
        },
        textSubtle: {
          value: { base: '{colors.plum.400}', _light: '{colors.plum.400}' },
        },
        accent: {
          value: { base: '{colors.magenta.400}', _light: '{colors.magenta.500}' },
        },
        accentGlow: {
          value: { base: '{colors.glow}', _light: '{colors.magenta.400}' },
        },
        border: {
          value: { base: '{colors.plum.700}', _light: '{colors.plum.200}' },
        },
      },
    },
  },
})