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
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
      textWrap: 'balance',
    },
    p: {
      textWrap: 'pretty',
    },
    'img, video, svg': {
      display: 'block',
      maxWidth: '100%',
    },
    'button, input, select, textarea': {
      font: 'inherit',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
    _disabled: '&:disabled, &[aria-disabled=true]',
  },

  theme: {
    tokens: {
      colors: {
        // Seafoam family — H:158°, teal-mint, emergent spring
        seafoam: {
          50:  { value: '#EDFBF5' },
          100: { value: '#C8F1E3' },
          200: { value: '#95E2CA' },
          300: { value: '#54CCA9' },
          400: { value: '#22B88A' },
          500: { value: '#169970' },
          600: { value: '#107A58' },
          700: { value: '#0B5B41' },
          800: { value: '#073D2B' },
          900: { value: '#042015' },
        },

        // Stone neutral — tinted toward H:158°, seafoam-teal cast
        stone: {
          50:  { value: '#F3F9F7' },
          100: { value: '#E4F0EC' },
          200: { value: '#CAE2D9' },
          300: { value: '#A4C5BC' },
          400: { value: '#7DA69C' },
          500: { value: '#5D8880' },
          600: { value: '#446B63' },
          700: { value: '#2E5047' },
          800: { value: '#1A3530' },
          900: { value: '#0B1D1A' },
        },

        // Ink — very dark near-black, barely tinted toward seafoam
        ink: {
          900: { value: '#071410' },
          800: { value: '#0E2420' },
          700: { value: '#163530' },
        },
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '3':  { value: '12px' },
        '4':  { value: '16px' },
        '5':  { value: '20px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '10': { value: '40px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '32': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.9' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
        widest:  { value: '0.15em' },
      },

      radii: {
        none: { value: '0' },
        sm:   { value: '2px' },
        md:   { value: '6px' },
        lg:   { value: '12px' },
        full: { value: '9999px' },
      },

      fontWeights: {
        light:     { value: '300' },
        normal:    { value: '400' },
        medium:    { value: '500' },
        semibold:  { value: '600' },
        bold:      { value: '700' },
        extrabold: { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        // Base surfaces — dark mode default
        bg: {
          value: {
            base: '{colors.ink.900}',
            _light: '{colors.stone.50}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.50}',
            _light: '{colors.stone.900}',
          },
        },
        'text-secondary': {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.600}',
          },
        },
        'text-muted': {
          value: {
            base: '{colors.stone.500}',
            _light: '{colors.stone.500}',
          },
        },

        // Accent — seafoam.400 as the single committed accent
        accent: {
          value: '{colors.seafoam.400}',
        },
        'accent-dim': {
          value: {
            base: '{colors.seafoam.700}',
            _light: '{colors.seafoam.600}',
          },
        },
        'accent-bright': {
          value: '{colors.seafoam.300}',
        },
        'on-accent': {
          value: '{colors.ink.900}',
        },

        // Borders
        border: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        'border-subtle': {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.100}',
          },
        },

        // Surfaces for cards and elevated elements
        'surface-1': {
          value: {
            base: '{colors.ink.800}',
            _light: '{colors.stone.100}',
          },
        },
        'surface-2': {
          value: {
            base: '{colors.ink.700}',
            _light: '{colors.seafoam.50}',
          },
        },

        // Band-specific semantic tokens for Stack archetype
        'band-hero-bg': {
          value: '{colors.ink.900}',
        },
        'band-signal-bg': {
          value: '{colors.seafoam.400}',
        },
        'band-signal-text': {
          value: '{colors.ink.900}',
        },
        'band-work-bg': {
          value: '{colors.stone.50}',
        },
        'band-work-text': {
          value: '{colors.stone.900}',
        },
        'band-about-bg': {
          value: '{colors.stone.800}',
        },
        'band-about-text': {
          value: '{colors.stone.50}',
        },
      },
    },
  },
})