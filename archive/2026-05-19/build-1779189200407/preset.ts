import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      fontWeight: 'bold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accent-dark',
      textDecoration: 'underline',
    },
    p: {
      margin: '0',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &, .light &',
    _dark: '[data-color-mode=dark] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        teal: {
          50:  { value: '#F0FAF7' },
          100: { value: '#D6F3EC' },
          200: { value: '#AAEADA' },
          300: { value: '#6FD7C0' },
          400: { value: '#38BEA5' },
          500: { value: '#0F9E85' },
          600: { value: '#0B8470' },
          700: { value: '#086A5A' },
          800: { value: '#065248' },
          900: { value: '#04342C' },
        },
        stone: {
          50:  { value: '#F4F9F7' },
          100: { value: '#E8F3EF' },
          200: { value: '#D0E8E0' },
          300: { value: '#A8CEC3' },
          400: { value: '#7BB3A6' },
          500: { value: '#589488' },
          600: { value: '#3E756B' },
          700: { value: '#2B5850' },
          800: { value: '#1A3B35' },
          900: { value: '#0A201C' },
        },
      },
      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '24px' },
        '6':  { value: '32px' },
        '7':  { value: '48px' },
        '8':  { value: '64px' },
        '9':  { value: '96px' },
        '10': { value: '128px' },
      },
      lineHeights: {
        tight:  { value: '0.9' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.8' },
      },
      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.2em' },
      },
      radii: {
        none: { value: '0' },
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
          value: { base: '{colors.stone.50}' },
        },
        'bg-card': {
          value: { base: '{colors.stone.100}' },
        },
        'bg-signal': {
          value: { base: '{colors.teal.800}' },
        },
        'bg-footer': {
          value: { base: '{colors.teal.900}' },
        },
        'bg-subtle': {
          value: { base: '{colors.stone.200}' },
        },
        text: {
          value: { base: '{colors.stone.900}' },
        },
        'text-secondary': {
          value: { base: '{colors.stone.700}' },
        },
        'text-muted': {
          value: { base: '{colors.stone.500}' },
        },
        'text-on-signal': {
          value: { base: '{colors.teal.100}' },
        },
        'text-on-footer': {
          value: { base: '{colors.teal.200}' },
        },
        accent: {
          value: { base: '{colors.teal.500}' },
        },
        'accent-light': {
          value: { base: '{colors.teal.300}' },
        },
        'accent-dark': {
          value: { base: '{colors.teal.700}' },
        },
        'accent-glow': {
          value: { base: '{colors.teal.400}' },
        },
        border: {
          value: { base: '{colors.stone.200}' },
        },
        'border-strong': {
          value: { base: '{colors.teal.400}' },
        },
        'border-subtle': {
          value: { base: '{colors.stone.100}' },
        },
      },
    },
  },
})