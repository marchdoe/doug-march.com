import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  
  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: '#F2F0F5' },
          100: { value: '#E5E2EC' },
          200: { value: '#CAC7D4' },
          300: { value: '#9E9AAD' },
          400: { value: '#76718A' },
          500: { value: '#504C61' },
          600: { value: '#393644' },
          700: { value: '#222029' },
          800: { value: '#141320' },
          900: { value: '#09080B' },
        },
        moss: {
          light: { value: '#86C99A' },
          default: { value: '#4A8B60' },
          dark: { value: '#2B5C3A' },
          glow: { value: 'rgba(74, 139, 96, 0.12)' },
        },
      },
      
      spacing: {
        0: { value: '0px' },
        px: { value: '1px' },
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '16px' },
        lg: { value: '24px' },
        xl: { value: '32px' },
        '2xl': { value: '40px' },
        '3xl': { value: '48px' },
        '4xl': { value: '64px' },
        '5xl': { value: '96px' },
        '6xl': { value: '120px' },
      },
      
      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.18' },
        normal: { value: '1.62' },
        loose: { value: '1.85' },
      },
      
      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '+0.06em' },
        wider: { value: '+0.10em' },
        widest: { value: '+0.15em' },
      },
      
      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
      },
      
      fontWeights: {
        regular: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
      
      borders: {
        hairline: { value: '1px solid {colors.neutral.700}' },
        'hairline-subtle': { value: '1px solid rgba(34, 32, 41, 0.4)' },
        accent: { value: '2px solid {colors.moss.default}' },
      },
      
      transitions: {
        fast: { value: 'all 110ms ease' },
        base: { value: 'all 140ms ease' },
      },
    },
    
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.neutral.900}',
            _light: '{colors.neutral.50}',
          },
        },
        'bg-secondary': {
          value: {
            base: '{colors.neutral.800}',
            _light: '{colors.neutral.100}',
          },
        },
        text: {
          value: {
            base: '#F0EDF6',
            _light: '{colors.neutral.600}',
          },
        },
        'text-secondary': {
          value: {
            base: '{colors.neutral.300}',
            _light: '{colors.neutral.500}',
          },
        },
        'text-muted': {
          value: {
            base: '{colors.neutral.500}',
            _light: '{colors.neutral.400}',
          },
        },
        accent: {
          value: {
            base: '{colors.moss.default}',
            _light: '{colors.moss.default}',
          },
        },
        'accent-light': {
          value: {
            base: '{colors.moss.light}',
            _light: '{colors.moss.light}',
          },
        },
        'accent-dark': {
          value: {
            base: '{colors.moss.dark}',
            _light: '{colors.moss.dark}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.200}',
          },
        },
        'border-subtle': {
          value: {
            base: 'rgba(34, 32, 41, 0.4)',
            _light: 'rgba(202, 199, 212, 0.3)',
          },
        },
      },
    },
  },
  
  globalCss: {
    body: {
      fontFamily: 'serif',
      bg: 'bg',
      color: 'text',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'semibold',
      lineHeight: 'snug',
      color: 'text',
      letterSpacing: 'tight',
    },
    a: {
      color: 'accent',
      transition: 'base',
      textDecoration: 'none',
      _hover: {
        color: 'accent-light',
        textDecoration: 'underline',
        textDecorationColor: 'accent',
        textUnderlineOffset: '4px',
      },
      _focus: {
        outline: '1.5px solid',
        outlineColor: 'accent',
        outlineOffset: '3px',
      },
    },
  },
  
  conditions: {
    extend: {
      _light: '&[data-color-mode="light"]',
    },
  },
})