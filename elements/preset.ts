import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    extend: {
      _light: '.light &',
      _dark: '.dark &',
    },
  },

  globalCss: {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      fontFamily: 'body',
      background: 'bg',
      color: 'text',
      lineHeight: 'normal',
      minHeight: '100vh',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
  },

  theme: {
    tokens: {
      colors: {
        // Cold neutral scale — hue 222°, 5–8% saturation
        // Left panel (dark hemisphere)
        cold: {
          50: { value: '#F2F3F8' },
          100: { value: '#E2E5EF' },
          200: { value: '#C3C8D9' },
          300: { value: '#9AA0BC' },
          400: { value: '#6D7490' },
          500: { value: '#4D5471' },
          600: { value: '#333A52' },
          700: { value: '#1F2640' },
          800: { value: '#141929' },
          900: { value: '#0B0D18' },
        },

        // Warm neutral scale — hue 45°, 5–8% saturation
        // Right panel (lit crescent)
        warm: {
          50: { value: '#FAFAF4' },
          100: { value: '#F5F3E8' },
          200: { value: '#EAE6D2' },
          300: { value: '#D4CDAB' },
          400: { value: '#B8AF88' },
          500: { value: '#908660' },
          600: { value: '#6B6040' },
          700: { value: '#453D24' },
          800: { value: '#2A2514' },
          900: { value: '#171408' },
        },

        // Accent — Opening Day warmth, hue 32° (spring amber-orange)
        // Reserved exclusively for the countdown element
        accent: {
          light: { value: '#F2BC8E' },
          DEFAULT: { value: '#E07A35' },
          dark: { value: '#B05820' },
          glow: { value: 'rgba(224, 122, 53, 0.10)' },
        },

        // Secondary accent — market/spring sage, hue 152°
        // Used only for +/- market value display
        sage: {
          DEFAULT: { value: '#4A8C6A' },
          muted: { value: 'rgba(74, 140, 106, 0.15)' },
        },
      },

      fonts: {
        // Spectral: editorial serif — reclines, assumes you'll sit with it
        // Left panel, body copy, pull quotes
        spectral: { value: "'Spectral', Georgia, 'Times New Roman', serif" },
        // Oswald: condensed sans — inclines, already standing up
        // Right panel, scores, countdown, metadata strips
        oswald: { value: "'Oswald', 'Arial Narrow', Arial, sans-serif" },
        // Semantic aliases
        body: { value: "'Spectral', Georgia, 'Times New Roman', serif" },
        heading: { value: "'Oswald', 'Arial Narrow', Arial, sans-serif" },
      },

      // Perfect Fourth scale (1.333 ratio, base 16px)
      // Steps: 9 · 12 · 16 · 21 · 28 · 37 · 50
      fontSizes: {
        '2xs': { value: '0.5625rem' },  // 9px  — wire-copy annotations, music reference
        xs:    { value: '0.75rem' },    // 12px — secondary metadata, tucked signals
        sm:    { value: '1rem' },       // 16px — nav items, small labels
        base:  { value: '1rem' },       // 16px — body text (left panel copy)
        md:    { value: '1.3125rem' },  // 21px — scores, subheadings, Bodhidharma quote
        lg:    { value: '1.75rem' },    // 28px — name, section display
        xl:    { value: '2.3125rem' },  // 37px — Opening Day "2 DAYS"
        '2xl': { value: '3.125rem' },   // 50px — hero/display if used
      },

      lineHeights: {
        tight:  { value: '1.05' },  // Oswald display headings (right panel)
        snug:   { value: '1.20' },  // Spectral headings (left panel)
        normal: { value: '1.55' },  // Body text, standard reading
        loose:  { value: '1.80' },  // Bodhidharma quote — earns its stillness
      },

      letterSpacings: {
        tight:   { value: '-0.025em' },  // Large display Oswald (xl, 2xl)
        normal:  { value: '0em' },       // Body text, both panels
        wide:    { value: '0.04em' },    // Nav items, role labels
        wider:   { value: '0.08em' },    // All-caps section labels, left panel
        widest:  { value: '0.14em' },    // Tiny metadata strips (weather, market)
      },

      // Spacing scale — every layout value derives from here
      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '10': { value: '40px' },  // Bodhidharma zone vertical padding
        '11': { value: '44px' },  // Work row height
        '12': { value: '48px' },  // Signal gap between major right-panel elements
        '13': { value: '52px' },  // Panel inner padding (top/bottom)
        '14': { value: '56px' },  // Generous zone separator
        '16': { value: '64px' },
        '24': { value: '96px' },  // Right panel bottom padding
      },

      radii: {
        none:  { value: '0px' },  // Default — no softening on either panel
        badge: { value: '2px' },  // Barely perceptible, right panel warm bg only
      },

      // Shadows: intentionally empty.
      // "Held breath before a season turns" — shadows break the stillness.
      shadows: {},

      // Borders: no border tokens for panel division.
      // The background collision IS the only line that exists.
      borders: {
        subtle: { value: '1px solid' },  // For work list rows only (right panel)
      },
    },

    semanticTokens: {
      colors: {
        // ── Page-level defaults (dark = cold panel as baseline) ──────────────

        bg: {
          value: {
            base: '{colors.cold.800}',
            _dark: '{colors.cold.800}',
            _light: '{colors.warm.100}',
          },
        },

        text: {
          value: {
            base: '{colors.cold.100}',
            _dark: '{colors.cold.100}',
            _light: '{colors.cold.700}',
          },
        },

        textSecondary: {
          value: {
            base: '{colors.cold.300}',
            _dark: '{colors.cold.300}',
            _light: '{colors.cold.500}',
          },
        },

        textMuted: {
          value: {
            base: '{colors.cold.400}',
            _dark: '{colors.cold.400}',
            _light: '{colors.warm.400}',
          },
        },

        accent: {
          value: '{colors.accent.DEFAULT}',
        },

        border: {
          value: {
            base: '{colors.cold.700}',
            _dark: '{colors.cold.700}',
            _light: '{colors.warm.200}',
          },
        },

        bgCard: {
          value: {
            base: '{colors.cold.700}',
            _dark: '{colors.cold.700}',
            _light: '{colors.warm.200}',
          },
        },

        bgSubtle: {
          value: {
            base: '{colors.cold.900}',
            _dark: '{colors.cold.900}',
            _light: '{colors.warm.50}',
          },
        },

        // ── Left panel — dark cold hemisphere (fixed, sticky) ───────────────
        // background: cold.800 (#141929)

        bgLeft: {
          value: '{colors.cold.800}',
        },

        bgCardLeft: {
          value: '{colors.cold.700}',
        },

        textLeft: {
          value: '{colors.cold.100}',
        },

        textLeftSecondary: {
          value: '{colors.cold.300}',
        },

        textLeftMuted: {
          value: '{colors.cold.400}',
        },

        // ── Right panel — warm lit crescent (scrollable) ─────────────────────
        // background: warm.100 (#F5F3E8)

        bgRight: {
          value: '{colors.warm.100}',
        },

        bgCardRight: {
          value: '{colors.warm.200}',
        },

        textRight: {
          value: '{colors.cold.700}',
        },

        textRightSecondary: {
          value: '{colors.cold.500}',
        },

        textRightMuted: {
          value: '{colors.warm.400}',
        },

        borderRight: {
          value: '{colors.warm.200}',
        },

        // ── Signal-specific tokens ────────────────────────────────────────────

        // Opening Day — the only eager element; amber-orange warmth
        accentOpeningDay: {
          value: '{colors.accent.DEFAULT}',
        },

        accentOpeningDayLight: {
          value: '{colors.accent.light}',
        },

        accentOpeningDayGlow: {
          value: '{colors.accent.glow}',
        },

        // Market data — quiet confidence, no commentary needed
        marketGreen: {
          value: '{colors.sage.DEFAULT}',
        },

        marketGreenMuted: {
          value: '{colors.sage.muted}',
        },
      },
    },
  },
})