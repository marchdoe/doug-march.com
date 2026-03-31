import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    html: {
      colorScheme: 'dark light',
    },
    body: {
      fontFamily: '{fonts.body}',
      fontSize: '{fontSizes.base}',
      lineHeight: '{lineHeights.normal}',
      color: '{colors.text}',
      backgroundColor: '{colors.bg}',
      letterSpacing: '{letterSpacings.normal}',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: '{fonts.heading}',
      lineHeight: '{lineHeights.snug}',
      fontWeight: '700',
      margin: '0',
    },
    'h1': {
      fontSize: '{fontSizes.xl}',
      letterSpacing: '{letterSpacings.tight}',
    },
    'h2': {
      fontSize: '{fontSizes.lg}',
    },
    'h3': {
      fontSize: '{fontSizes.md}',
    },
    'h4, h5, h6': {
      fontSize: '{fontSizes.base}',
    },
    'p': {
      margin: '0',
    },
    'a': {
      color: '{colors.accent}',
      textDecoration: 'none',
      transitionProperty: 'color, opacity',
      transitionDuration: '0.2s',
      '&:hover': {
        color: '{colors.accentLight}',
      },
    },
    'button': {
      fontFamily: '{fonts.heading}',
      fontSize: '{fontSizes.base}',
      fontWeight: '500',
      letterSpacing: '{letterSpacings.wider}',
      border: 'none',
      cursor: 'pointer',
      transitionProperty: 'all',
      transitionDuration: '0.2s',
      borderRadius: '{borderRadius.xs}',
    },
    'code': {
      fontFamily: '{fonts.body}',
      fontSize: '{fontSizes.sm}',
    },
  },

  theme: {
    tokens: {
      colors: {
        neutral: {
          '50': { value: '#EFF3F7' },
          '100': { value: '#DCE5EF' },
          '200': { value: '#BDC9D6' },
          '300': { value: '#92A6B8' },
          '400': { value: '#677E93' },
          '500': { value: '#445E70' },
          '600': { value: '#2C4055' },
          '700': { value: '#19293A' },
          '800': { value: '#0E1C28' },
          '900': { value: '#070F16' },
        },
        accent: {
          light: { value: '#7DC49A' },
          default: { value: '#2FA865' },
          dark: { value: '#1A7043' },
        },
      },
      fonts: {
        heading: { value: 'Space Grotesk, sans-serif' },
        body: { value: 'JetBrains Mono, monospace' },
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
        'display': { value: 'clamp(44px, 8vw, 67px)' },
      },
      lineHeights: {
        'tight': { value: '0.95' },
        'snug': { value: '1.15' },
        'normal': { value: '1.65' },
        'loose': { value: '1.85' },
      },
      letterSpacings: {
        'tight': { value: '-0.04em' },
        'normal': { value: '0em' },
        'wide': { value: '0.06em' },
        'wider': { value: '0.10em' },
        'widest': { value: '0.18em' },
      },
      spacing: {
        '0': { value: '0px' },
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
        '12': { value: '48px' },
        '14': { value: '56px' },
        '16': { value: '64px' },
        '20': { value: '80px' },
        '24': { value: '96px' },
        '28': { value: '112px' },
        '32': { value: '128px' },
      },
      borderRadius: {
        'none': { value: '0px' },
        'xs': { value: '2px' },
        'sm': { value: '4px' },
        'md': { value: '8px' },
        'lg': { value: '12px' },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: '#0A1520',
            _light: '#FFFFFF',
          },
        },
        bgCard: {
          value: {
            base: '#111F2E',
            _light: '{colors.neutral.50}',
          },
        },
        text: {
          value: {
            base: '{colors.neutral.50}',
            _light: '{colors.neutral.700}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.neutral.300}',
            _light: '{colors.neutral.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.neutral.500}',
            _light: '{colors.neutral.400}',
          },
        },
        textDisabled: {
          value: {
            base: '{colors.neutral.400}',
            _light: '{colors.neutral.300}',
          },
        },
        accent: {
          value: '{colors.accent.default}',
        },
        accentLight: {
          value: '{colors.accent.light}',
        },
        accentDark: {
          value: '{colors.accent.dark}',
        },
        border: {
          value: {
            base: '{colors.neutral.600}',
            _light: '{colors.neutral.200}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.neutral.700}',
            _light: '{colors.neutral.100}',
          },
        },
      },
    },
  },
})