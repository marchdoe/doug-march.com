import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      fontFeatureSettings: '"kern", "liga"',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    p: { margin: '0' },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 140ms ease',
    },
    'a:hover': { color: 'accent' },
    '*': { boxSizing: 'border-box' },
  },
  conditions: {
    light: '[data-theme=light] &',
    dark: '[data-theme=dark] &',
    hover: '&:hover',
  },
  theme: {
    tokens: {
      colors: {
        gold: {
          50: { value: '#FEF9E6' },
          100: { value: '#FCEFB8' },
          200: { value: '#FADF7E' },
          300: { value: '#F7CB3F' },
          400: { value: '#F4B90A' },
          500: { value: '#DA9E00' },
          600: { value: '#B07E00' },
          700: { value: '#855E00' },
          800: { value: '#5C4000' },
          900: { value: '#362600' },
        },
        sand: {
          50: { value: '#FAF7EF' },
          100: { value: '#F1EBDA' },
          200: { value: '#E2D8BF' },
          300: { value: '#C9BB97' },
          400: { value: '#A38F63' },
          500: { value: '#7A6A41' },
          600: { value: '#574B2C' },
          700: { value: '#3A311C' },
          800: { value: '#221D10' },
          900: { value: '#16130B' },
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
        tight: { value: '0.92' },
        snug: { value: '1.1' },
        normal: { value: '1.5' },
        loose: { value: '1.7' },
      },
      letterSpacings: {
        tight: { value: '-0.01em' },
        normal: { value: '0' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
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
        bold: { value: '800' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.sand.900}', _light: '{colors.sand.50}' },
        },
        surface: {
          value: { base: '{colors.sand.800}', _light: '{colors.sand.100}' },
        },
        field: {
          value: { base: '{colors.gold.400}', _light: '{colors.gold.400}' },
        },
        fieldInk: {
          value: { base: '{colors.sand.900}', _light: '{colors.sand.900}' },
        },
        text: {
          value: { base: '{colors.sand.50}', _light: '{colors.sand.900}' },
        },
        textMuted: {
          value: { base: '{colors.sand.300}', _light: '{colors.sand.500}' },
        },
        accent: {
          value: { base: '{colors.gold.400}', _light: '{colors.gold.500}' },
        },
        accentText: {
          value: { base: '{colors.sand.900}', _light: '{colors.sand.900}' },
        },
        border: {
          value: { base: '{colors.sand.700}', _light: '{colors.sand.200}' },
        },
      },
    },
  },
})