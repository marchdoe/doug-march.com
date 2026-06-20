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
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
      margin: '0',
      padding: '0',
    },
    'img, video': {
      maxWidth: '100%',
      display: 'block',
    },
    'p': {
      lineHeight: 'normal',
    },
  },

  conditions: {
    _light: '[data-theme=light] &, .light &',
    _dark: '[data-theme=dark] &, .dark &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Amber primary scale — H:28°, peak summer light
        amber: {
          50:  { value: '#FFF8E8' },
          100: { value: '#FFF0C5' },
          200: { value: '#FFE08A' },
          300: { value: '#FFCC4D' },
          400: { value: '#F5B020' },
          500: { value: '#E09000' },
          600: { value: '#C07500' },
          700: { value: '#985800' },
          800: { value: '#703C00' },
          900: { value: '#4A2600' },
        },
        // Warm charcoal neutrals — tinted amber, never pure black
        charcoal: {
          50:  { value: '#FAF5E8' },
          100: { value: '#F0E6CC' },
          200: { value: '#D8C89A' },
          300: { value: '#BC9E68' },
          400: { value: '#9A7540' },
          500: { value: '#7A5020' },
          600: { value: '#5C3200' },
          700: { value: '#3D1C00' },
          800: { value: '#2A1000' },
          900: { value: '#140C00' },
        },
        // Gold accent — blazing amber at full saturation
        gold: {
          light: { value: '#FFD060' },
          base:  { value: '#F5A020' },
          dark:  { value: '#C07800' },
          glow:  { value: 'rgba(245, 160, 32, 0.18)' },
        },
      },

      spacing: {
        '4':   { value: '4px' },
        '8':   { value: '8px' },
        '16':  { value: '16px' },
        '24':  { value: '24px' },
        '32':  { value: '32px' },
        '48':  { value: '48px' },
        '64':  { value: '64px' },
        '96':  { value: '96px' },
        '128': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.55' },
        loose:  { value: '1.75' },
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
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.charcoal.900}',
            _light: '{colors.charcoal.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.charcoal.800}',
            _light: '{colors.charcoal.100}',
          },
        },
        bgSidebar: {
          value: {
            base: '{colors.charcoal.800}',
            _light: '{colors.charcoal.100}',
          },
        },
        bgElevated: {
          value: {
            base: '{colors.charcoal.700}',
            _light: '{colors.charcoal.200}',
          },
        },
        text: {
          value: {
            base: '{colors.charcoal.50}',
            _light: '{colors.charcoal.900}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.charcoal.200}',
            _light: '{colors.charcoal.700}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.charcoal.400}',
            _light: '{colors.charcoal.500}',
          },
        },
        accent: {
          value: {
            base: '{colors.gold.base}',
            _light: '{colors.amber.600}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.gold.light}',
            _light: '{colors.amber.400}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.gold.dark}',
            _light: '{colors.amber.700}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.gold.glow}',
            _light: '{colors.gold.glow}',
          },
        },
        border: {
          value: {
            base: '{colors.charcoal.700}',
            _light: '{colors.charcoal.200}',
          },
        },
        borderAccent: {
          value: {
            base: '{colors.gold.base}',
            _light: '{colors.amber.500}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.charcoal.800}',
            _light: '{colors.charcoal.100}',
          },
        },
      },
    },
  },
})