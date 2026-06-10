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
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontFeatureSettings: '"kern" 1, "liga" 1, "tnum" 1',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
      '&:hover': {
        color: 'accentLight',
      },
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      color: 'text',
    },
    'p': {
      lineHeight: 'normal',
      color: 'text',
    },
    '::selection': {
      background: '#00B8E0',
      color: '#01070E',
    },
  },
  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
  },
  theme: {
    tokens: {
      colors: {
        // Signal cyan — primary accent (H:198°)
        cyan: {
          '50':  { value: '#EAF9FD' },
          '100': { value: '#C4EFF9' },
          '200': { value: '#86E0F4' },
          '300': { value: '#3CCCEC' },
          '400': { value: '#00B8E0' },
          '500': { value: '#0099BF' },
          '600': { value: '#007A9A' },
          '700': { value: '#005C74' },
          '800': { value: '#003D4E' },
          '900': { value: '#001F2A' },
        },
        // Deep slate — neutral family tinted toward H:198°
        slate: {
          '50':  { value: '#EDF5FA' },
          '100': { value: '#D2E8F2' },
          '200': { value: '#A6CDE2' },
          '300': { value: '#74AECF' },
          '400': { value: '#4A8EAF' },
          '500': { value: '#336F8A' },
          '600': { value: '#22546C' },
          '700': { value: '#163C50' },
          '800': { value: '#0C2534' },
          '900': { value: '#05101C' },
        },
        // Abyss — near-void page backgrounds tinted H:198°
        abyss: {
          '50':  { value: '#E6EFF5' },
          '100': { value: '#C0D4E0' },
          '200': { value: '#85AABF' },
          '300': { value: '#47809A' },
          '400': { value: '#1C5872' },
          '500': { value: '#083650' },
          '600': { value: '#042030' },
          '700': { value: '#021420' },
          '800': { value: '#010C16' },
          '900': { value: '#01070E' },
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
        none:   { value: '1' },
        tight:  { value: '0.92' },
        snug:   { value: '1.15' },
        normal: { value: '1.55' },
        loose:  { value: '1.8' },
      },
      letterSpacings: {
        tight:   { value: '-0.04em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.10em' },
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
        black:    { value: '900' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: { base: '{colors.abyss.900}' },
        },
        bgCard: {
          value: { base: '{colors.abyss.800}' },
        },
        bgSidebar: {
          value: { base: '{colors.abyss.700}' },
        },
        text: {
          value: { base: '{colors.slate.50}' },
        },
        textSecondary: {
          value: { base: '{colors.slate.200}' },
        },
        textMuted: {
          value: { base: '{colors.slate.400}' },
        },
        accent: {
          value: { base: '{colors.cyan.400}' },
        },
        accentLight: {
          value: { base: '{colors.cyan.300}' },
        },
        accentDark: {
          value: { base: '{colors.cyan.600}' },
        },
        border: {
          value: { base: '{colors.abyss.600}' },
        },
        borderSubtle: {
          value: { base: '{colors.abyss.700}' },
        },
      },
    },
  },
})