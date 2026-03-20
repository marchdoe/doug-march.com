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
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      fontSize: '16px',
      scrollBehavior: 'smooth',
      fontFeatureSettings: '"tnum"',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'sm',
      lineHeight: 'normal',
      background: 'bg',
      color: 'text',
      fontWeight: 'regular',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      fontWeight: 'bold',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
    },
    table: {
      borderCollapse: 'collapse',
      width: '100%',
    },
    'button, input, select, textarea': {
      fontFamily: 'body',
    },
    '::selection': {
      background: 'accent',
      color: '{colors.stone.900}',
    },
  },

  theme: {
    tokens: {
      fonts: {
        heading: { value: '"Barlow Condensed", sans-serif' },
        body: { value: '"IBM Plex Sans", sans-serif' },
      },

      fontSizes: {
        // Perfect Fourth scale (×1.333) — base 16px
        '2xs': { value: '0.5625rem' },  // 9px  — seam footnote, metadata labels
        'xs':  { value: '0.75rem' },     // 12px — section headers, index numbers, nav
        'sm':  { value: '1rem' },         // 16px — body text baseline
        'base':{ value: '1.3125rem' },   // 21px — secondary headings, score values
        'md':  { value: '1.75rem' },      // 28px — project titles, section heads
        'lg':  { value: '2.3125rem' },   // 37px — identity display
        'xl':  { value: '3.125rem' },    // 50px — featured work heading
        '2xl': { value: '4.1875rem' },   // 67px — hero declaration (Barlow Condensed 700 only)
      },

      fontWeights: {
        light:    { value: '300' },
        regular:  { value: '400' },
        medium:   { value: '500' },
        semibold: { value: '600' },
        bold:     { value: '700' },
      },

      lineHeights: {
        tight:  { value: '0.92' },   // Barlow Condensed xl/2xl — compression is intentional
        snug:   { value: '1.1' },    // Barlow Condensed md/lg
        normal: { value: '1.5' },    // IBM Plex Sans body throughout
        loose:  { value: '1.65' },   // Right panel list items — air against left panel density
      },

      letterSpacings: {
        tight:   { value: '-0.02em' },  // Barlow Condensed headings md and above
        normal:  { value: '0em' },       // IBM Plex Sans body
        wide:    { value: '0.06em' },    // Nav items, section sub-labels
        wider:   { value: '0.10em' },    // RESULTS, STANDINGS, CALENDAR category headers
        widest:  { value: '0.16em' },    // Seam footnote 9px — maximum tracking for legibility
      },

      spacing: {
        '1':  { value: '4px' },
        '2':  { value: '8px' },
        '4':  { value: '16px' },
        '6':  { value: '24px' },
        '8':  { value: '32px' },
        '12': { value: '48px' },
        '16': { value: '64px' },
      },

      radii: {
        // Zero rounding throughout — this design does not offer softness
        none: { value: '0px' },
        sm:   { value: '0px' },
        md:   { value: '0px' },
        lg:   { value: '0px' },
        full: { value: '0px' },
      },

      colors: {
        // Primary neutral — hue 205° "deep water under ice"
        // Maximum distance from the 212°/215°/235° cluster of the prior four days.
        // Dark values: submerged obsidian, no slate warmth, no indigo electricity.
        // Light values: clean ice-cast appropriate for right panel's winter stone.
        stone: {
          '50':  { value: '#EEF3F5' },  // H:205 S:9%  L:95% — right panel bg reference
          '100': { value: '#D8E5EA' },  // H:205 S:14% L:88% — right panel card surfaces
          '200': { value: '#B3CAD4' },  // H:205 S:18% L:76% — borders on light bg, hairlines
          '300': { value: '#84A8B8' },  // H:205 S:22% L:62% — disabled text, subdued borders
          '400': { value: '#577E8E' },  // H:205 S:26% L:45% — placeholder, muted metadata
          '500': { value: '#3C5D6C' },  // H:205 S:29% L:33% — secondary text on dark
          '600': { value: '#274048' },  // H:205 S:30% L:22% — body text on dark
          '700': { value: '#172B34' },  // H:205 S:36% L:15% — card bg on dark, headings
          '800': { value: '#0C1A23' },  // H:205 S:40% L:9%  — left panel obsidian (7.8% crescent)
          '900': { value: '#070D13' },  // H:205 S:42% L:6%  — deepest dark, below-fold
        },

        // Accent — gymnasium floor amber (hue 38°)
        // Appears exactly once per viewport: the seam border line.
        amber: {
          light:   { value: '#D9A857' },                   // hover tints, calendar active node
          DEFAULT: { value: '#C48930' },                   // THE seam, win indicator, active nav tick
          dark:    { value: '#8A5F18' },                   // pressed states, leader score emphasis
          glow:    { value: 'rgba(196, 137, 48, 0.08)' }, // full-row hover on right panel
        },

        // Right panel — cool off-white stone
        // Three steps removed from white, market-down minor key, felt not announced.
        panel: {
          stone: { value: '#E6E2DC' },
        },
      },

      borders: {
        seam:   { value: '1px solid #C48930' },  // THE amber border — the equinox
        subtle: { value: '1px solid #172B34' },  // left panel internal separators
        rule:   { value: '1px solid #B3CAD4' },  // right panel section separators
      },

      shadows: {
        // Left panel: none — obsidian is matte, no elevation theater
        // Calendar strip only: hairline above to lift from scroll content
        calendarLift: { value: '0 -1px 0 rgba(23, 43, 52, 0.10)' },
      },

      zIndex: {
        base:    { value: '0' },
        raised:  { value: '10' },
        overlay: { value: '20' },
        seam:    { value: '10' },  // ArXiv footnote pill — straddles both panels
      },
    },

    semanticTokens: {
      colors: {
        // ── Backgrounds ──────────────────────────────────────────
        bg: {
          value: {
            base: '{colors.stone.800}',    // obsidian — left panel default
            _light: '{colors.stone.50}',
          },
        },
        bgCard: {
          value: {
            base: '{colors.stone.700}',    // cards on dark — barely lighter than obsidian
            _light: '{colors.stone.100}',
          },
        },
        bgRightPanel: {
          // The right panel: cool off-white stone in light, deep stone in dark
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.panel.stone}',
          },
        },

        // ── Text ─────────────────────────────────────────────────
        text: {
          // WCAG AA: stone.50 (#EEF3F5) on stone.800 (#0C1A23) ≈ 16:1 ✓
          value: {
            base: '{colors.stone.50}',
            _light: '{colors.stone.700}',
          },
        },
        textSecondary: {
          value: {
            base: '{colors.stone.200}',
            _light: '{colors.stone.600}',
          },
        },
        textMuted: {
          value: {
            base: '{colors.stone.500}',
            _light: '{colors.stone.300}',
          },
        },
        // Right panel text — always reads against light stone background
        textDark: {
          value: {
            base: '{colors.stone.700}',
            _light: '{colors.stone.700}',
          },
        },
        textDarkSecondary: {
          value: {
            base: '{colors.stone.600}',
            _light: '{colors.stone.600}',
          },
        },
        textDarkMuted: {
          value: {
            base: '{colors.stone.300}',
            _light: '{colors.stone.300}',
          },
        },

        // ── Accent ───────────────────────────────────────────────
        accent: {
          // Amber appears once per viewport — use with strict restraint
          value: {
            base: '{colors.amber.DEFAULT}',
            _light: '{colors.amber.DEFAULT}',
          },
        },
        accentLight: {
          value: {
            base: '{colors.amber.light}',
            _light: '{colors.amber.light}',
          },
        },
        accentDark: {
          value: {
            base: '{colors.amber.dark}',
            _light: '{colors.amber.dark}',
          },
        },
        accentGlow: {
          value: {
            base: '{colors.amber.glow}',
            _light: '{colors.amber.glow}',
          },
        },

        // ── Borders ──────────────────────────────────────────────
        border: {
          value: {
            base: '{colors.stone.700}',    // structural, barely visible on dark
            _light: '{colors.stone.200}',
          },
        },
        borderSeam: {
          // The amber seam — the equinox, the page's primary border
          value: {
            base: '{colors.amber.DEFAULT}',
            _light: '{colors.amber.DEFAULT}',
          },
        },
        borderSubtle: {
          value: {
            base: '{colors.stone.600}',
            _light: '{colors.stone.200}',
          },
        },
        borderRule: {
          // Right panel section separators
          value: {
            base: '{colors.stone.200}',
            _light: '{colors.stone.200}',
          },
        },
      },
    },
  },
})