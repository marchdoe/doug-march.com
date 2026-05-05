import { definePreset } from "@pandacss/dev";

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    body: {
      backgroundColor: 'bg',
      color: 'text',
      lineHeight: 'normal',
    },
    a: {
      color: 'accent',
    },
  },

  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: '#F2F2F6' },
          100: { value: '#E4E4EC' },
          200: { value: '#C8C8D8' },
          300: { value: '#A4A4BC' },
          400: { value: '#7E7E9C' },
          500: { value: '#5A5A7A' },
          600: { value: '#3C3C58' },
          700: { value: '#242438' },
          800: { value: '#12121E' },
          900: { value: '#08080E' },
        },
        accent: {
          light: { value: '#8EDCA8' },
          DEFAULT: { value: '#1CC963' },
          dark: { value: '#0E7A3C' },
          glow: { value: '#1CC96318' },
        },
      },

      spacing: {
        2: { value: '2px' },
        4: { value: '4px' },
        8: { value: '8px' },
        12: { value: '12px' },
        16: { value: '16px' },
        20: { value: '20px' },
        24: { value: '24px' },
        28: { value: '28px' },
        32: { value: '32px' },
        36: { value: '36px' },
        40: { value: '40px' },
        44: { value: '44px' },
        48: { value: '48px' },
        52: { value: '52px' },
        56: { value: '56px' },
        60: { value: '60px' },
        64: { value: '64px' },
        72: { value: '72px' },
        80: { value: '80px' },
        96: { value: '96px' },
        120: { value: '120px' },
        144: { value: '144px' },
        160: { value: '160px' },
        192: { value: '192px' },
        240: { value: '240px' },
      },

      fontWeights: {
        300: { value: '300' },
        400: { value: '400' },
        500: { value: '500' },
        600: { value: '600' },
        700: { value: '700' },
      },

      lineHeights: {
        tight: { value: '1.05' },
        snug: { value: '1.2' },
        normal: { value: '1.55' },
        loose: { value: '1.75' },
      },

      letterSpacings: {
        tight: { value: '-0.025em' },
        normal: { value: '0em' },
        wide: { value: '0.04em' },
        wider: { value: '0.08em' },
        widest: { value: '0.12em' },
      },

      radii: {
        none: { value: '0px' },
        sm: { value: '2px' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.neutral.800}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.800}',
            _dark: '{colors.neutral.50}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.600}',
            _dark: '{colors.neutral.200}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.500}',
            _dark: '{colors.neutral.400}',
          },
        },
        accent: {
          value: '{colors.accent.DEFAULT}',
        },
        accentLight: {
          value: '{colors.accent.light}',
        },
        accentDark: {
          value: '{colors.accent.dark}',
        },
        accentGlow: {
          value: '{colors.accent.glow}',
        },
        border: {
          value: {
            base: '{colors.neutral.200}',
            _dark: '{colors.neutral.600}',
          },
        },
        borderLight: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.neutral.700}',
          },
        },
        card: {
          value: {
            base: '#FFFFFF',
            _dark: '{colors.neutral.700}',
          },
        },
      },
    },
  },
});