import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    body: {
      background: 'bg',
      color: 'text',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      _hover: {
        opacity: '0.8',
        textDecoration: 'underline',
      },
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: '1',
    },
  },

  conditions: {
    _light: { selector: '[data-theme=light] &, .light &' },
    _dark: { selector: '[data-theme=dark] &, .dark &' },
    _hover: { selector: '&:hover' },
  },

  theme: {
    tokens: {
      colors: {
        violet: {
          50:  { value: '#F4F0FA' },
          100: { value: '#E8E1F5' },
          200: { value: '#CFBEF0' },
          300: { value: '#B094E0' },
          400: { value: '#9468CC' },
          500: { value: '#7A44B8' },
          600: { value: '#5E2BA0' },
          700: { value: '#441685' },
          800: { value: '#2C0A65' },
          900: { value: '#1A0450' },
        },
        neutral: {
          50:  { value: '#F4F0FA' },
          100: { value: '#E8E1F5' },
          200: { value: '#CFC5E8' },
          300: { value: '#B0A3D0' },
          400: { value: '#8E7FB5' },
          500: { value: '#6E6095' },
          600: { value: '#52467A' },
          700: { value: '#382F5C' },
          800: { value: '#211A3D' },
          900: { value: '#0D0812' },
        },
        accent: {
          light:   { value: '#C084FF' },
          default: { value: '#9B40FF' },
          dark:    { value: '#6A1FBF' },
          glow:    { value: '#9B40FF33' },
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
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.15em' },
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
          value: { base: '{colors.neutral.900}', _light: '{colors.neutral.50}' },
        },
        'bg.card': {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        'bg.sidebar': {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.100}' },
        },
        text: {
          value: { base: '{colors.neutral.50}', _light: '{colors.neutral.900}' },
        },
        'text.secondary': {
          value: { base: '{colors.neutral.300}', _light: '{colors.neutral.700}' },
        },
        'text.muted': {
          value: { base: '{colors.neutral.400}', _light: '{colors.neutral.500}' },
        },
        accent: {
          value: { base: '{colors.accent.light}', _light: '{colors.accent.dark}' },
        },
        border: {
          value: { base: '{colors.neutral.800}', _light: '{colors.neutral.200}' },
        },
      },
    },
  },
})