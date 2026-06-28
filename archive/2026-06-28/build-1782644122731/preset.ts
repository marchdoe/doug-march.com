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
      fontSize: '16px',
      scrollBehavior: 'smooth',
    },
    body: {
      background: 'bg',
      color: 'text',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'opacity 0.2s ease',
    },
    'a:hover': {
      opacity: '0.75',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 'bold',
      lineHeight: 'tight',
      margin: '0',
      padding: '0',
    },
    p: {
      margin: '0',
      padding: '0',
    },
    'ul, ol': {
      margin: '0',
      padding: '0',
      listStyle: 'none',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    button: {
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: '0',
    },
  },

  conditions: {
    _light: '[data-color-mode=light] &',
    _dark: '[data-color-mode=dark] &, &',
    _hover: '&:hover',
  },

  theme: {
    tokens: {
      colors: {
        // Primary: burnt orange / terracotta — H:22°
        // The only open corridor in the color mandate is 10–42°
        orange: {
          50:  { value: '#FFF3EE' },
          100: { value: '#FFE4D6' },
          200: { value: '#FFC5AC' },
          300: { value: '#FFA07A' },
          400: { value: '#FF7A4D' },
          500: { value: '#F05428' },
          600: { value: '#C43D14' },
          700: { value: '#962D0A' },
          800: { value: '#6A1E05' },
          900: { value: '#3C0E01' },
        },

        // Neutral: warm taupe — tinted toward H:22°, very low chroma
        taupe: {
          50:  { value: '#FAF3F0' },
          100: { value: '#EEE3DC' },
          200: { value: '#DACAC0' },
          300: { value: '#D0BEB4' },
          400: { value: '#B09080' },
          500: { value: '#9C8578' },
          600: { value: '#6A4E44' },
          700: { value: '#4A332E' },
          800: { value: '#2D1C17' },
          900: { value: '#180B08' },
        },

        // Background scale: near-void darks, faintly orange-tinted
        night: {
          100: { value: '#2E1510' },
          200: { value: '#240F0B' },
          300: { value: '#1C0D09' },
          400: { value: '#140806' },
          500: { value: '#0D0503' },
          600: { value: '#080302' },
        },
      },

      spacing: {
        '1': { value: '4px'   },
        '2': { value: '8px'   },
        '3': { value: '16px'  },
        '4': { value: '24px'  },
        '5': { value: '32px'  },
        '6': { value: '48px'  },
        '7': { value: '64px'  },
        '8': { value: '96px'  },
        '9': { value: '128px' },
      },

      lineHeights: {
        tight:  { value: '0.88' },
        snug:   { value: '1.15' },
        normal: { value: '1.5'  },
        loose:  { value: '1.8'  },
      },

      letterSpacings: {
        tight:   { value: '-0.03em' },
        normal:  { value: '0em'     },
        wide:    { value: '0.05em'  },
        wider:   { value: '0.1em'   },
        widest:  { value: '0.2em'   },
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
        bold:     { value: '800' },
      },
    },

    semanticTokens: {
      colors: {
        // Page surface
        bg: {
          value: {
            base:   '{colors.night.400}',
            _light: '{colors.taupe.50}',
          },
        },
        bgCard: {
          value: {
            base:   '{colors.night.300}',
            _light: '{colors.taupe.100}',
          },
        },
        bgSubtle: {
          value: {
            base:   '{colors.night.200}',
            _light: '{colors.taupe.100}',
          },
        },
        bgElevated: {
          value: {
            base:   '{colors.night.100}',
            _light: '{colors.taupe.200}',
          },
        },

        // Text hierarchy
        text: {
          value: {
            base:   '{colors.taupe.50}',
            _light: '{colors.taupe.900}',
          },
        },
        textSecondary: {
          value: {
            base:   '{colors.taupe.300}',
            _light: '{colors.taupe.600}',
          },
        },
        textMuted: {
          value: {
            base:   '{colors.taupe.500}',
            _light: '{colors.taupe.400}',
          },
        },

        // Accent: burnt orange
        accent: {
          value: {
            base:   '{colors.orange.500}',
            _light: '{colors.orange.600}',
          },
        },
        accentLight: {
          value: {
            base:   '{colors.orange.300}',
            _light: '{colors.orange.400}',
          },
        },
        accentStrong: {
          value: {
            base:   '{colors.orange.400}',
            _light: '{colors.orange.700}',
          },
        },

        // Borders
        border: {
          value: {
            base:   '{colors.taupe.700}',
            _light: '{colors.taupe.200}',
          },
        },
        borderSubtle: {
          value: {
            base:   '{colors.night.100}',
            _light: '{colors.taupe.100}',
          },
        },
      },
    },
  },
})