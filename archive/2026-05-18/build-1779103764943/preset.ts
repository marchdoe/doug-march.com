import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      fontOpticalSizing: 'auto',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      minHeight: '100vh',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
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
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 180ms ease',
    },
    'a:hover': {
      color: 'accentLight',
      textDecoration: 'underline',
    },
    '::selection': {
      background: 'accentGlow',
      color: 'textHero',
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
        // Primary: amber-gold, H:35°
        amber: {
          50:  { value: '#FFF8EE' },
          100: { value: '#FFECD0' },
          200: { value: '#FFD49A' },
          300: { value: '#FFB85A' },
          400: { value: '#F99820' },
          500: { value: '#E87C08' },
          600: { value: '#C56206' },
          700: { value: '#964904' },
          800: { value: '#6A3303' },
          900: { value: '#411F01' },
          950: { value: '#280F00' },
        },
        // Neutral: stone, amber-tinted H:30°
        stone: {
          50:  { value: '#FAF8F4' },
          100: { value: '#EDE8E0' },
          200: { value: '#D6CFC4' },
          300: { value: '#B8AFA3' },
          400: { value: '#928880' },
          500: { value: '#706760' },
          600: { value: '#544C46' },
          700: { value: '#3A3430' },
          800: { value: '#252018' },
          900: { value: '#161210' },
          950: { value: '#0E0A06' },
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
        tight:  { value: '0.9' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.8' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.1em' },
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
        // Backgrounds
        bg: {
          value: {
            base: '{colors.stone.950}',
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.stone.900}',
            _light: '{colors.stone.100}',
          },
        },
        bgSubtle: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.200}',
          },
        },
        bgStrip: {
          value: {
            base: '{colors.stone.900}',
            _light: '{colors.amber.50}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.amber.100}',
            _light: '{colors.stone.900}',
          },
        },
        textHero: {
          value: {
            base: '{colors.amber.300}',
            _light: '{colors.amber.700}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.stone.500}',
            _light: '{colors.stone.400}',
          },
        },
        textLabel: {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.500}',
          },
        },

        // Accent
        accent: {
          value: {
            base: '{colors.amber.500}',
            _light: '{colors.amber.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.amber.300}',
            _light: '{colors.amber.500}',
          },
        },
        accentDim: {
          value: {
            base: '{colors.amber.700}',
            _light: '{colors.amber.200}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.amber.900}',
            _light: '{colors.amber.100}',
          },
        },

        // Borders
        border: {
          value: {
            base: '{colors.stone.800}',
            _light: '{colors.stone.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.300}',
          },
        },

        // Semantic sport colors
        win: {
          value: {
            base: '{colors.amber.400}',
            _light: '{colors.amber.600}',
          },
        },
        loss: {
          value: {
            base: '{colors.stone.400}',
            _light: '{colors.stone.500}',
          },
        },
      },
    },
  },
})