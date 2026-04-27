import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
    },
    body: {
      backgroundColor: 'bg',
      color: 'text',
      lineHeight: 'normal',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 'snug',
      fontWeight: 'semibold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
  },

  theme: {
    tokens: {
      colors: {
        // Neutral palette - green-tinted (H:120°, S:5-10%)
        stone: {
          50: { value: '#F1F3F1' },
          100: { value: '#E4E7E4' },
          200: { value: '#C8D0C8' },
          300: { value: '#9FAD9F' },
          400: { value: '#738C73' },
          500: { value: '#506250' },
          600: { value: '#3B453B' },
          700: { value: '#202C20' },
          800: { value: '#0E1B0E' },
          900: { value: '#041004' },
        },

        // Primary accent - saturated green (H:120°, S:64%, L:38%)
        green: {
          light: { value: '#94DB94' },
          base: { value: '#22A022' },
          dark: { value: '#107010' },
        },

        // Secondary accent - muted violet (H:300°, S:20%, L:55%)
        violet: {
          light: { value: '#CFBECF' },
          base: { value: '#A375A3' },
        },
      },

      spacing: {
        0: { value: '0px' },
        1: { value: '4px' },
        2: { value: '8px' },
        3: { value: '12px' },
        4: { value: '16px' },
        6: { value: '24px' },
        8: { value: '32px' },
        12: { value: '48px' },
        16: { value: '64px' },
        20: { value: '80px' },
        24: { value: '96px' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.15' },
        normal: { value: '1.60' },
        loose: { value: '1.78' },
      },

      letterSpacings: {
        tight: { value: '-0.03em' },
        normal: { value: '-0.01em' },
        wide: { value: '0.01em' },
        wider: { value: '0.06em' },
        widest: { value: '0.12em' },
      },

      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
        base: { value: '3px' },
        md: { value: '4px' },
        lg: { value: '6px' },
      },

      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
    },

    semanticTokens: {
      colors: {
        // Light band text colors
        text: { value: '{colors.stone.700}' },
        textSecondary: { value: '{colors.stone.600}' },
        textMuted: { value: '{colors.stone.500}' },

        // Dark band text colors
        textOnDark: { value: '{colors.stone.50}' },
        textSecondaryOnDark: { value: '{colors.stone.200}' },
        textMutedOnDark: { value: '{colors.stone.300}' },

        // Backgrounds
        bg: { value: '{colors.stone.50}' },
        bgCard: { value: '#F7F8F7' },

        // Band-specific backgrounds
        bandHero: { value: '{colors.stone.800}' },
        bandFeatured: { value: '{colors.stone.100}' },
        bandIndex: { value: '{colors.stone.50}' },
        bandEditorial: { value: '{colors.stone.700}' },
        bandFooter: { value: '{colors.stone.900}' },

        // Accents
        accent: { value: '{colors.green.base}' },
        accentLight: { value: '{colors.green.light}' },
        accentDark: { value: '{colors.green.dark}' },

        // Secondary accent
        secondary: { value: '{colors.violet.base}' },
        secondaryLight: { value: '{colors.violet.light}' },

        // Borders
        border: { value: '{colors.stone.200}' },
        borderOnDark: { value: '{colors.stone.600}' },
      },
    },
  },
})