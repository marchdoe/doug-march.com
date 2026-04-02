import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    light: '&:is(.light &)',
    dark: '&:is(.dark &)',
  },

  theme: {
    tokens: {
      colors: {
        stone: {
          50: { value: '#F0F7F3' },
          100: { value: '#E0EEE7' },
          200: { value: '#C1DDCA' },
          300: { value: '#92BFAA' },
          400: { value: '#628E74' },
          500: { value: '#3F644F' },
          600: { value: '#2A4636' },
          700: { value: '#182E23' },
          800: { value: '#0E1E17' },
          900: { value: '#08120E' },
        },
        spring: {
          light: { value: '#72DA8E' },
          DEFAULT: { value: '#2CC95C' },
          dark: { value: '#1A8B3D' },
          glow: { value: 'rgba(44, 201, 92, 0.12)' },
        },
        dawn: {
          DEFAULT: { value: '#C4D52A' },
        },
        tigers: {
          DEFAULT: { value: '#C86438' },
        },
      },
      fonts: {
        heading: { value: "'Fraunces', serif" },
        body: { value: "'Outfit', sans-serif" },
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
        snug: { value: '1.25' },
        normal: { value: '1.58' },
        loose: { value: '1.78' },
      },
      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.045em' },
        wider: { value: '0.08em' },
        widest: { value: '0.14em' },
      },
      spacing: {
        xs: { value: '4px' },
        sm: { value: '8px' },
        md: { value: '16px' },
        lg: { value: '24px' },
        xl: { value: '32px' },
        '2xl': { value: '48px' },
        '3xl': { value: '64px' },
      },
      radii: {
        sharp: { value: '0px' },
        card: { value: '2px' },
        button: { value: '3px' },
      },
      sizing: {
        max: { value: '1200px' },
        hero: { value: '68vh' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.stone.900}',
            _light: '{colors.stone.50}',
          },
        },
        'bg.card': {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.50}',
          },
        },
        'bg.secondary': {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.100}',
          },
        },
        text: {
          value: {
            base: '{colors.stone.50}',
            _light: '{colors.stone.700}',
          },
        },
        'text.secondary': {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.400}',
          },
        },
        'text.muted': {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.500}',
          },
        },
        border: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.200}',
          },
        },
        accent: {
          value: '{colors.spring.DEFAULT}',
        },
        'accent.light': {
          value: '{colors.spring.light}',
        },
        'accent.dark': {
          value: '{colors.spring.dark}',
        },
        'accent.glow': {
          value: '{colors.spring.glow}',
        },
        secondary: {
          value: '{colors.dawn.DEFAULT}',
        },
        signal: {
          value: '{colors.tigers.DEFAULT}',
        },
      },
    },
  },

  globalCss: {
    html: {
      colorScheme: 'dark',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      margin: '0',
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
    p: {
      margin: '0',
    },
    a: {
      color: 'text',
      transition: 'color 120ms ease',
      _hover: {
        color: 'accent',
      },
    },
    'hr, [role="separator"]': {
      borderColor: 'border',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRight: 'none',
      borderTop: 'none',
    },
  },
})