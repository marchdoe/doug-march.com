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
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'a': {
      color: 'accent',
      textDecoration: 'none',
      _hover: {
        color: 'accentBright',
        textDecoration: 'underline',
      },
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    'p': {
      lineHeight: 'normal',
    },
    '::selection': {
      background: '{colors.aqua.500}',
      color: '{colors.pure.white}',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Aqua primary — H:205°, clearwater cyan-blue, decisive
        aqua: {
          50:  { value: '#EFF9FD' },
          100: { value: '#D5EFF8' },
          200: { value: '#A8DDF1' },
          300: { value: '#6CC7E8' },
          400: { value: '#2AADD9' },
          500: { value: '#0D90C0' },
          600: { value: '#0A72A0' },
          700: { value: '#085A82' },
          800: { value: '#054263' },
          900: { value: '#022840' },
        },
        // Stone neutral — tinted toward H:205°, chroma ~0.01
        stone: {
          50:  { value: '#F5F8FA' },
          100: { value: '#E7EFF3' },
          200: { value: '#CCD9DF' },
          300: { value: '#9AB2BC' },
          400: { value: '#668A97' },
          500: { value: '#426878' },
          600: { value: '#2D4F5E' },
          700: { value: '#1D3844' },
          800: { value: '#11222A' },
          900: { value: '#091519' },
        },
        // Pure references
        pure: {
          white: { value: '#FFFFFF' },
          black: { value: '#022840' },
        },
      },

      spacing: {
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '16px' },
        4: { value: '24px' },
        5: { value: '32px' },
        6: { value: '48px' },
        7: { value: '64px' },
        8: { value: '96px' },
        9: { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.1' },
        normal: { value: '1.5' },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },
        normal:  { value: '0em' },
        wide:    { value: '0.05em' },
        wider:   { value: '0.08em' },
        widest:  { value: '0.15em' },
      },

      radii: {
        none: { value: '0' },
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
        // Backgrounds
        bg: {
          value: { base: '{colors.stone.900}', _light: '{colors.stone.50}' },
        },
        bgCard: {
          value: { base: '{colors.stone.800}', _light: '{colors.pure.white}' },
        },
        bgHero: {
          value: { base: '{colors.aqua.600}', _light: '{colors.aqua.600}' },
        },
        bgSignal: {
          value: { base: '{colors.stone.800}', _light: '{colors.stone.100}' },
        },
        bgAbout: {
          value: { base: '{colors.stone.900}', _light: '{colors.stone.50}' },
        },

        // Text
        text: {
          value: { base: '{colors.stone.50}', _light: '{colors.stone.900}' },
        },
        textSecondary: {
          value: { base: '{colors.stone.200}', _light: '{colors.stone.600}' },
        },
        textMuted: {
          value: { base: '{colors.stone.400}', _light: '{colors.stone.500}' },
        },
        textOnHero: {
          value: { base: '{colors.pure.white}', _light: '{colors.pure.white}' },
        },
        textOnHeroMuted: {
          value: { base: '{colors.aqua.200}', _light: '{colors.aqua.100}' },
        },

        // Accents
        accent: {
          value: { base: '{colors.aqua.400}', _light: '{colors.aqua.600}' },
        },
        accentBright: {
          value: { base: '{colors.aqua.300}', _light: '{colors.aqua.500}' },
        },
        accentHero: {
          value: { base: '{colors.aqua.200}', _light: '{colors.aqua.100}' },
        },

        // Borders
        border: {
          value: { base: '{colors.stone.700}', _light: '{colors.stone.200}' },
        },
        borderSubtle: {
          value: { base: '{colors.stone.800}', _light: '{colors.stone.100}' },
        },
      },
    },
  },
})