import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    light: '&',
    dark: '@media (prefers-color-scheme: dark)',
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          '50': { value: '#F3F5EE' },
          '100': { value: '#E8EBE1' },
          '200': { value: '#D2D6C8' },
          '300': { value: '#AFB6A3' },
          '400': { value: '#8A9280' },
          '500': { value: '#636B56' },
          '600': { value: '#484F3C' },
          '700': { value: '#2D3224' },
          '800': { value: '#181D11' },
          '900': { value: '#0D110A' },
        },
        rust: {
          light: { value: '#DBA882' },
          DEFAULT: { value: '#C26535' },
          dark: { value: '#9A4A1C' },
        },
      },

      fonts: {
        heading: { value: 'Switzer, sans-serif' },
        body: { value: '"IBM Plex Sans", sans-serif' },
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
        tight: { value: '1.0' },
        snug: { value: '1.2' },
        normal: { value: '1.6' },
        loose: { value: '1.85' },
      },

      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '-0.01em' },
      },

      spacing: {
        '0': { value: '0' },
        '1': { value: '4px' },
        '2': { value: '8px' },
        '3': { value: '12px' },
        '4': { value: '16px' },
        '5': { value: '20px' },
        '6': { value: '24px' },
        '7': { value: '28px' },
        '8': { value: '32px' },
        '9': { value: '36px' },
        '10': { value: '40px' },
        '11': { value: '44px' },
        '12': { value: '48px' },
        '13': { value: '52px' },
        '14': { value: '56px' },
        '15': { value: '60px' },
        '16': { value: '64px' },
        '18': { value: '72px' },
        '20': { value: '80px' },
      },

      sizes: {
        full: { value: '100%' },
        screen: { value: '100vw' },
        min: { value: 'min-content' },
        max: { value: 'max-content' },
        fit: { value: 'fit-content' },
      },

      durations: {
        fast: { value: '150ms' },
        normal: { value: '300ms' },
        slow: { value: '500ms' },
      },

      easings: {
        default: { value: 'ease' },
        in: { value: 'ease-in' },
        out: { value: 'ease-out' },
        inOut: { value: 'ease-in-out' },
        spring: { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.50}',
            _light: '{colors.stone.50}',
          },
        },
        'bg.card': {
          value: {
            base: '#FAFAF8',
            _light: '#FAFAF8',
          },
        },
        text: {
          value: {
            base: '#1D2219',
            _light: '#1D2219',
          },
        },
        'text.secondary': {
          value: {
            base: '{colors.stone.600}',
            _light: '{colors.stone.600}',
          },
        },
        'text.muted': {
          value: {
            base: '{colors.stone.500}',
            _light: '{colors.stone.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.rust.DEFAULT}',
            _light: '{colors.rust.DEFAULT}',
          },
        },
        'accent.light': {
          value: {
            base: '{colors.rust.light}',
            _light: '{colors.rust.light}',
          },
        },
        'accent.dark': {
          value: {
            base: '{colors.rust.dark}',
            _light: '{colors.rust.dark}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.200}',
            _light: '{colors.stone.200}',
          },
        },
        'border.subtle': {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.300}',
          },
        },
        shadow: {
          value: {
            base: 'rgba(13, 17, 10, 0.14)',
            _light: 'rgba(13, 17, 10, 0.14)',
          },
        },
      },
    },
  },

  globalCss: {
    '*': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
    html: {
      fontSize: '16px',
      fontFamily: 'body',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      background: 'bg',
      color: 'text',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: '400',
      lineHeight: 'snug',
      color: 'text',
      margin: '0',
      padding: '0',
    },
    h1: {
      fontSize: '2xl',
      letterSpacing: 'tight',
    },
    h2: {
      fontSize: 'xl',
      letterSpacing: 'tight',
    },
    h3: {
      fontSize: 'lg',
      letterSpacing: 'normal',
    },
    h4: {
      fontSize: 'md',
      letterSpacing: 'normal',
    },
    h5: {
      fontSize: 'sm',
      letterSpacing: 'wide',
    },
    h6: {
      fontSize: 'xs',
      letterSpacing: 'wider',
    },
    p: {
      margin: '0',
      lineHeight: 'normal',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    'a:hover': {
      color: 'text',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
    },
    button: {
      fontFamily: 'body',
      fontSize: 'base',
      fontWeight: '400',
      border: '1px solid',
      borderColor: 'border',
      background: 'bg.card',
      color: 'text',
      cursor: 'pointer',
      padding: '12px 16px',
      transition: 'all 0.3s ease',
    },
    'button:hover': {
      borderColor: 'accent',
    },
    'input, textarea, select': {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      padding: '12px 16px',
      border: '1px solid',
      borderColor: 'border',
      background: 'bg.card',
      color: 'text',
      transition: 'border-color 0.3s ease',
    },
    'input:focus, textarea:focus, select:focus': {
      outline: 'none',
      borderColor: 'accent',
    },
  },
})