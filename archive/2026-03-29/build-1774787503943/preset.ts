import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    html: {
      colorScheme: 'light dark',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      letterSpacing: 'wide',
      color: 'text-primary',
      backgroundColor: 'page-bg',
      margin: 0,
      padding: 0,
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'snug',
      letterSpacing: 'tight',
      color: 'text-primary',
      margin: 0,
    },
    h1: {
      fontSize: '2xl',
    },
    h2: {
      fontSize: 'xl',
    },
    h3: {
      fontSize: 'lg',
    },
    'h4, h5, h6': {
      fontSize: 'md',
    },
    a: {
      color: 'text-primary',
      transition: 'color 200ms ease',
      _hover: {
        color: 'accent',
        textDecoration: 'underline',
      },
    },
    'p, li, td': {
      lineHeight: 'normal',
      letterSpacing: 'wide',
    },
  },

  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: '#F3F2EC' },
          100: { value: '#E3E2D8' },
          200: { value: '#C8C6BA' },
          300: { value: '#A3A193' },
          400: { value: '#7D7C6E' },
          500: { value: '#565549' },
          600: { value: '#3A3933' },
          700: { value: '#252420' },
          800: { value: '#171714' },
          900: { value: '#0D0D0A' },
        },
        accent: {
          light: { value: '#B8BE6A' },
          DEFAULT: { value: '#8A9416' },
          dark: { value: '#626A0D' },
          glow: { value: 'rgba(138, 148, 22, 0.12)' },
        },
        secondary: {
          sage: { value: '#5C8A62' },
        },
      },
      fonts: {
        heading: { value: '"DM Serif Display", serif' },
        body: { value: '"Work Sans", sans-serif' },
      },
      fontSizes: {
        '2xs': { value: '9px' },
        xs: { value: '12px' },
        sm: { value: '14px' },
        base: { value: '16px' },
        md: { value: '21px' },
        lg: { value: '28px' },
        xl: { value: '37px' },
        '2xl': { value: '50px' },
      },
      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.2' },
        normal: { value: '1.65' },
        loose: { value: '1.88' },
      },
      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
      },
      spacing: {
        '4': { value: '4px' },
        '8': { value: '8px' },
        '16': { value: '16px' },
        '24': { value: '24px' },
        '32': { value: '32px' },
        '48': { value: '48px' },
        '64': { value: '64px' },
        '80': { value: '80px' },
        '96': { value: '96px' },
        '128': { value: '128px' },
      },
      radii: {
        card: { value: '4px' },
        button: { value: '3px' },
        tag: { value: '2px' },
      },
    },

    semanticTokens: {
      colors: {
        'page-bg': {
          value: {
            base: '#171714',
            _light: '#F3F2EC',
          },
        },
        'card-bg': {
          value: {
            base: '#1E1D17',
            _light: '#E3E2D8',
          },
        },
        'hero-bg': {
          value: {
            base: '#0D0D0A',
            _light: '#F3F2EC',
          },
        },
        'text-primary': {
          value: {
            base: '#EDE8D9',
            _light: '#252420',
          },
        },
        'text-secondary': {
          value: {
            base: '#A3A193',
            _light: '#3A3933',
          },
        },
        'text-muted': {
          value: {
            base: '#7D7C6E',
            _light: '#565549',
          },
        },
        accent: {
          value: {
            base: '{colors.accent.DEFAULT}',
            _light: '{colors.accent.DEFAULT}',
          },
        },
        'accent-light': {
          value: {
            base: '{colors.accent.light}',
            _light: '{colors.accent.light}',
          },
        },
        'accent-dark': {
          value: {
            base: '{colors.accent.dark}',
            _light: '{colors.accent.dark}',
          },
        },
        border: {
          value: {
            base: '#3A3933',
            _light: '#C8C6BA',
          },
        },
        sage: {
          value: {
            base: '{colors.secondary.sage}',
            _light: '{colors.secondary.sage}',
          },
        },
      },
    },
  },

  conditions: {
    light: '.light &',
    dark: '.dark &',
  },
})