import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    html: {
      fontSize: '16px',
    },
    body: {
      fontFamily: 'work-sans',
      fontSize: 'base',
      lineHeight: 'normal',
      color: 'text',
      background: 'bg',
      fontWeight: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'space-grotesk',
      fontWeight: 'bold',
      lineHeight: 'snug',
      letterSpacing: 'tight',
      color: 'text-heading',
    },
    a: {
      color: 'accent',
      transitionProperty: 'color',
      transitionDuration: '120ms',
      transitionTimingFunction: 'ease',
      _hover: {
        color: 'accent-hover',
      },
    },
  },

  theme: {
    tokens: {
      colors: {
        // Primary Neutral Palette (H:65° warm amber-gold)
        neutral: {
          50: { value: '#F9F9F4' },
          100: { value: '#F2F2EB' },
          200: { value: '#DDDDD4' },
          300: { value: '#BEBFB4' },
          400: { value: '#9A9B8D' },
          500: { value: '#70715F' },
          600: { value: '#4A4B3C' },
          700: { value: '#2D2E22' },
          800: { value: '#191A12' },
          900: { value: '#0C0C08' },
        },

        // Primary Accent - Spring Green (H:128°)
        accent: {
          light: { value: '#89C992' },
          default: { value: '#2F8C3D' },
          dark: { value: '#1A5C27' },
          glow: { value: 'rgba(47, 140, 61, 0.10)' },
        },

        // Secondary Accent - Cool Slate Teal (H:200°)
        secondary: {
          light: { value: '#7EAFC4' },
          default: { value: '#307091' },
        },
      },

      spacing: {
        0: { value: '0px' },
        4: { value: '4px' },
        8: { value: '8px' },
        16: { value: '16px' },
        24: { value: '24px' },
        32: { value: '32px' },
        48: { value: '48px' },
        56: { value: '56px' },
        64: { value: '64px' },
        80: { value: '80px' },
        96: { value: '96px' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.20' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '0em' },
        wide: { value: '+0.04em' },
        wider: { value: '+0.08em' },
        widest: { value: '+0.14em' },
      },

      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
        base: { value: '4px' },
      },

      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        // Page and card backgrounds
        bg: { value: '{colors.neutral.50}' },
        'bg-card': { value: '{colors.neutral.100}' },
        'bg-panel': { value: '#EDEDE5' },

        // Text colors
        text: { value: '{colors.neutral.700}' },
        'text-heading': { value: '{colors.neutral.700}' },
        'text-secondary': { value: '{colors.neutral.600}' },
        'text-muted': { value: '{colors.neutral.500}' },
        'text-light': { value: '{colors.neutral.400}' },

        // Border colors
        border: { value: '{colors.neutral.200}' },
        'border-subtle': { value: '{colors.neutral.300}' },

        // Primary accent (spring green)
        accent: { value: '{colors.accent.default}' },
        'accent-light': { value: '{colors.accent.light}' },
        'accent-dark': { value: '{colors.accent.dark}' },
        'accent-hover': { value: '{colors.accent.dark}' },
        'accent-glow': { value: '{colors.accent.glow}' },

        // Secondary accent (slate teal)
        secondary: { value: '{colors.secondary.default}' },
        'secondary-light': { value: '{colors.secondary.light}' },
      },
    },
  },
})