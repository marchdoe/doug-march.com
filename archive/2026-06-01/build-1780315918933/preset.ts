import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontOpticalSizing: 'auto',
      margin: '0',
      padding: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 0.1s ease',
      '&:hover': {
        color: 'accentBright',
      },
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '0',
      lineHeight: 'tight',
      fontWeight: 'bold',
    },
    p: {
      margin: '0',
      lineHeight: 'normal',
    },
    'img, svg, video': {
      display: 'block',
      maxWidth: '100%',
    },
    '::selection': {
      background: 'accentMuted',
      color: 'text',
    },
  },

  conditions: {
    _light: '[data-theme=light] &, .light &',
    _dark: '[data-theme=dark] &, .dark &',
    _hover: '&:hover',
    _focus: '&:focus-visible',
    _active: '&:active',
    _disabled: '&:disabled, &[aria-disabled=true]',
  },

  theme: {
    tokens: {
      colors: {
        // Vivid magenta-purple primary (H:305°)
        magenta: {
          '50':  { value: '#FDF0FC' },
          '100': { value: '#FAD9F7' },
          '200': { value: '#F5AFF0' },
          '300': { value: '#EC78E6' },
          '400': { value: '#E048D8' },
          '500': { value: '#C820BF' },
          '600': { value: '#A01098' },
          '700': { value: '#780870' },
          '800': { value: '#500050' },
          '900': { value: '#2D0030' },
        },
        // Amethyst-stone neutrals (violet-tinted toward H:290°)
        stone: {
          '50':  { value: '#FAF8FC' },
          '100': { value: '#F2EFF6' },
          '200': { value: '#E3DFEC' },
          '300': { value: '#CBBFDA' },
          '400': { value: '#B09EC3' },
          '500': { value: '#8B7AAA' },
          '600': { value: '#665888' },
          '700': { value: '#4A3D6A' },
          '800': { value: '#312548' },
          '900': { value: '#1A1520' },
        },
      },

      spacing: {
        '1':  { value: '4px'   },
        '2':  { value: '8px'   },
        '3':  { value: '12px'  },
        '4':  { value: '16px'  },
        '5':  { value: '24px'  },
        '6':  { value: '32px'  },
        '7':  { value: '48px'  },
        '8':  { value: '64px'  },
        '9':  { value: '96px'  },
        '10': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.95' },
        snug:   { value: '1.2'  },
        normal: { value: '1.5'  },
        loose:  { value: '1.75' },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em'     },
        wide:    { value: '0.05em'  },
        wider:   { value: '0.08em'  },
        widest:  { value: '0.15em'  },
      },

      radii: {
        none: { value: '0px'    },
        sm:   { value: '2px'    },
        md:   { value: '4px'    },
        lg:   { value: '8px'    },
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
          value: {
            base: '{colors.stone.50}',
            _dark: '{colors.stone.900}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.stone.100}',
            _dark: '{colors.stone.800}',
          },
        },
        bgElevated: {
          value: {
            base: '{colors.stone.50}',
            _dark: '{colors.stone.700}',
          },
        },
        bgInverse: {
          value: '{colors.stone.900}',
        },
        bgAccent: {
          value: {
            base: '{colors.magenta.50}',
            _dark: '{colors.magenta.900}',
          },
        },

        // Text
        text: {
          value: {
            base: '{colors.stone.900}',
            _dark: '{colors.stone.50}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.stone.700}',
            _dark: '{colors.stone.300}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.stone.500}',
            _dark: '{colors.stone.400}',
          },
        },
        textInverse: {
          value: {
            base: '{colors.stone.50}',
            _dark: '{colors.stone.900}',
          },
        },

        // Accent — magenta family
        // accent (magenta.600): ≈6.3:1 on stone.50 — passes AA at all sizes
        accent: {
          value: {
            base: '{colors.magenta.600}',
            _dark: '{colors.magenta.400}',
          },
        },
        // accentBright (magenta.500): ≈4.3:1 on stone.50 — passes AA at large/display sizes (18px+)
        accentBright: {
          value: {
            base: '{colors.magenta.500}',
            _dark: '{colors.magenta.300}',
          },
        },
        // accentDisplay: for hero and index row names at display scale
        accentDisplay: {
          value: {
            base: '{colors.magenta.500}',
            _dark: '{colors.magenta.400}',
          },
        },
        accentMuted: {
          value: {
            base: '{colors.magenta.100}',
            _dark: '{colors.magenta.900}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.magenta.700}',
            _dark: '{colors.magenta.600}',
          },
        },

        // Borders and rules
        border: {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.700}',
          },
        },
        borderStrong: {
          value: {
            base: '{colors.stone.300}',
            _dark: '{colors.stone.600}',
          },
        },
        // rule: 1px catalog row/column dividers
        rule: {
          value: {
            base: '{colors.stone.200}',
            _dark: '{colors.stone.700}',
          },
        },
        // ruleHeavy: 2px header separator
        ruleHeavy: {
          value: {
            base: '{colors.stone.900}',
            _dark: '{colors.stone.50}',
          },
        },
      },
    },
  },
})