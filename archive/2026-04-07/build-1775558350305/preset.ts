import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',
  staticCss: {
    css: [
      {
        properties: {
          display: ['flex', 'grid', 'block', 'inline-block'],
          position: ['relative', 'absolute', 'fixed'],
          width: ['100%', '100vw'],
          height: ['100%', '100vh', 'auto'],
        },
      },
    ],
  },
  theme: {
    tokens: {
      colors: {
        neutral: {
          '50': { value: '#F4F5ED' },
          '100': { value: '#E9EAE0' },
          '200': { value: '#D3D5C6' },
          '300': { value: '#B2B5A2' },
          '400': { value: '#8C8F7E' },
          '500': { value: '#676A59' },
          '600': { value: '#4C4F3F' },
          '700': { value: '#323427' },
          '800': { value: '#1D1F13' },
          '900': { value: '#10110A' },
        },
        ochre: {
          light: { value: '#EAD080' },
          default: { value: '#C4992E' },
          dark: { value: '#8A6B10' },
          glow: { value: 'rgba(196, 153, 46, 0.08)' },
        },
        green: {
          default: { value: '#4F8646' },
        },
      },
      fontFamilies: {
        heading: { value: '"Syne", sans-serif' },
        body: { value: '"IBM Plex Sans", sans-serif' },
        mono: { value: '"IBM Plex Mono", monospace' },
      },
      fontSizes: {
        '2xs': { value: '9px' },
        'xs': { value: '12px' },
        'sm': { value: '14px' },
        'base': { value: '16px' },
        'md': { value: '21px' },
        'lg': { value: '28px' },
        'xl': { value: '37px' },
        '2xl': { value: '50px' },
      },
      lineHeights: {
        tight: { value: '1.08' },
        snug: { value: '1.22' },
        normal: { value: '1.58' },
        loose: { value: '1.78' },
      },
      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.03em' },
        wider: { value: '0.07em' },
        widest: { value: '0.12em' },
      },
      spacing: {
        '0': { value: '0px' },
        '2': { value: '2px' },
        '4': { value: '4px' },
        '8': { value: '8px' },
        '12': { value: '12px' },
        '16': { value: '16px' },
        '24': { value: '24px' },
        '32': { value: '32px' },
        '36': { value: '36px' },
        '40': { value: '40px' },
        '48': { value: '48px' },
        '52': { value: '52px' },
        '64': { value: '64px' },
        '96': { value: '96px' },
      },
      borderWidths: {
        '0': { value: '0px' },
        '1px': { value: '1px' },
        '2px': { value: '2px' },
      },
      borderRadius: {
        '0': { value: '0px' },
        '2px': { value: '2px' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.neutral.50}',
          },
        },
        'bg.card': {
          value: {
            base: '{colors.neutral.50}',
          },
        },
        'bg.secondary': {
          value: {
            base: '{colors.neutral.100}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.800}',
          },
        },
        'text.secondary': {
          value: {
            base: '{colors.neutral.600}',
          },
        },
        'text.muted': {
          value: {
            base: '{colors.neutral.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.ochre.default}',
          },
        },
        'accent.light': {
          value: {
            base: '{colors.ochre.light}',
          },
        },
        'accent.dark': {
          value: {
            base: '{colors.ochre.dark}',
          },
        },
        border: {
          value: {
            base: '{colors.neutral.200}',
          },
        },
        'border.subtle': {
          value: {
            base: '{colors.neutral.100}',
          },
        },
      },
    },
  },
  globalCss: {
    html: {
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      lineHeight: 'normal',
      color: 'text',
      backgroundColor: 'bg',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: '600',
      margin: '0',
      padding: '0',
      lineHeight: 'tight',
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
      letterSpacing: 'wide',
    },
    p: {
      margin: '0',
      padding: '0',
    },
    a: {
      color: 'text',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    code: {
      fontFamily: 'mono',
    },
    table: {
      borderCollapse: 'collapse',
    },
    'th, td': {
      padding: '0',
      margin: '0',
    },
  },
})