import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    extend: {
      light: '.light &',
      dark: '.dark &',
    },
  },

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
    },
    html: {
      minHeight: '100vh',
    },
    body: {
      fontFamily: 'body',
      background: 'bg',
      color: 'text',
      fontSize: 'base',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'text',
    },
    a: {
      color: 'text',
      textDecoration: 'none',
    },
    'a:hover': {
      color: 'accent',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    '::selection': {
      background: 'accentLight',
      color: 'text',
    },
  },

  theme: {
    tokens: {
      colors: {
        // ── Hay neutral palette (hue 58°, saturation 5–8%) ──────────────
        hay: {
          50:  { value: '#F5F3EB' }, // near-white parchment tint
          100: { value: '#EDEAD9' }, // light — faint warm vellum
          200: { value: '#D8D4C2' }, // borders, hairline rules
          300: { value: '#ADAA9A' }, // disabled / subdued
          400: { value: '#858273' }, // placeholder text
          500: { value: '#5F5C4E' }, // secondary annotations
          600: { value: '#433F34' }, // secondary text body
          700: { value: '#2A2720' }, // primary body text (dark-mode variant)
          800: { value: '#161410' }, // masthead background
          900: { value: '#0C0B09' }, // deepest background
        },

        // ── Harvest gold accent (hue 58°, high saturation) ──────────────
        gold: {
          light:   { value: '#DDD59E' }, // tinted bg, hover states
          DEFAULT: { value: '#B8A83A' }, // buttons, dateline band border, links
          dark:    { value: '#7C7120' }, // pressed states, emphasis
          glow:    { value: 'rgba(184, 168, 58, 0.12)' }, // subtle overlays
        },

        // ── Spring green secondary accent (hue 138°) ─────────────────────
        green: {
          light:   { value: '#8DC4A5' }, // light fill, seasonal labels
          DEFAULT: { value: '#4A8C6A' }, // Tigers win left-border, botanical
          dark:    { value: '#2D5C45' }, // pressed / deep emphasis
        },

        // ── Named surface / text colors (from spec) ──────────────────────
        parchment:    { value: '#EDE9DA' }, // page background — the tonal fulcrum
        card:         { value: '#E5E1CF' }, // card surface — one step darker than page
        mastheadBg:   { value: '#161410' }, // dark warm near-black
        ink:          { value: '#1E1C15' }, // primary text — warm near-black
        inkSecondary: { value: '#4A4738' }, // secondary editorial body
        inkMuted:     { value: '#7E7B6C' }, // annotations, metadata, datelines
      },

      fonts: {
        heading: { value: "'Fraunces', Georgia, 'Times New Roman', serif" },
        body:    { value: "'Outfit', system-ui, -apple-system, sans-serif" },
      },

      fontSizes: {
        '2xs': { value: '0.4375rem' }, //  7px — extreme micro labels
        xs:    { value: '0.5625rem' }, //  9px — metadata, dateline labels
        sm:    { value: '0.75rem'   }, // 12px — secondary body, captions
        base:  { value: '1rem'      }, // 16px — primary body
        md:    { value: '1.3125rem' }, // 21px — subheads, callout numerics
        lg:    { value: '1.75rem'   }, // 28px — section headings, score display
        xl:    { value: '2.3125rem' }, // 37px — masthead headline
        '2xl': { value: '3.125rem'  }, // 50px — display only (sparse use)
      },

      lineHeights: {
        tight:  { value: '1.05' }, // large display headings only
        snug:   { value: '1.2'  }, // subheads and callout numerics
        normal: { value: '1.55' }, // body text — the breathing quality
        loose:  { value: '1.75' }, // Rumi quote and pull text — generosity encoded
      },

      letterSpacings: {
        tight:   { value: '-0.025em' }, // Fraunces display at 37px+
        normal:  { value: '0em'      }, // body text at 16px
        wide:    { value: '0.04em'   }, // secondary labels, bylines, attribution
        wider:   { value: '0.08em'   }, // column section headers (WORK, SIGNALS)
        widest:  { value: '0.14em'   }, // masthead nav, dateline uppercase labels
      },

      spacing: {
        0:  { value: '0px'  },
        1:  { value: '4px'  },
        2:  { value: '8px'  },
        3:  { value: '12px' },
        4:  { value: '16px' },
        5:  { value: '20px' },
        6:  { value: '24px' },
        7:  { value: '28px' },
        8:  { value: '32px' },
        9:  { value: '36px' },
        10: { value: '40px' },
        11: { value: '44px' }, // work list row height
        12: { value: '48px' }, // dateline band height
        13: { value: '52px' }, // masthead height
        16: { value: '64px' },
      },

      radii: {
        none: { value: '0px' }, // cards, tags — editorial flat edges
        sm:   { value: '2px' }, // buttons — barely softened
      },

      borderWidths: {
        thin:   { value: '1px' }, // all column separators and hairlines
        accent: { value: '3px' }, // Tigers win left accent bar
      },

      sizes: {
        full:       { value: '100%'   },
        maxContent: { value: '1200px' }, // broadsheet max-width
        masthead:   { value: '52px'   }, // masthead band height
        dateline:   { value: '48px'   }, // dateline band height
        aboveFold:  { value: '64vh'   }, // above-fold editorial zone
      },

      zIndex: {
        base:     { value: '0'   },
        elevated: { value: '10'  },
        overlay:  { value: '100' },
      },
    },

    semanticTokens: {
      colors: {
        // ── Page backgrounds ─────────────────────────────────────────────
        bg: {
          value: {
            base:  '{colors.parchment}',  // warm parchment — the tonal fulcrum
            _dark: '{colors.hay.800}',    // deep warm near-black
          },
        },
        bgCard: {
          value: {
            base:  '{colors.card}',      // one step darker than page bg
            _dark: '{colors.hay.700}',   // lifted dark surface
          },
        },
        bgSubtle: {
          value: {
            base:  '{colors.hay.50}',    // lightest tint for nested sections
            _dark: '{colors.hay.900}',   // deepest dark
          },
        },
        bgMasthead: {
          value: '{colors.mastheadBg}',  // always dark — editorial authority
        },
        bgDateline: {
          // gold-tinted mid-page band — expressed as a direct rgba value
          // (the dateline band is always this warm gold tint regardless of mode)
          value: 'rgba(184, 168, 58, 0.14)',
        },
        bgRow: {
          // work list row hover — barely-there gold wash
          value: 'rgba(184, 168, 58, 0.08)',
        },

        // ── Text hierarchy ───────────────────────────────────────────────
        text: {
          value: {
            base:  '{colors.ink}',       // #1E1C15 — warm near-black (~10:1 on parchment)
            _dark: '{colors.hay.50}',    // #F5F3EB — near-white on dark bg
          },
        },
        textSecondary: {
          value: {
            base:  '{colors.inkSecondary}', // #4A4738 — secondary editorial body
            _dark: '{colors.hay.200}',      // softer on dark
          },
        },
        textMuted: {
          value: {
            base:  '{colors.inkMuted}',  // #7E7B6C — annotations, metadata
            _dark: '{colors.hay.400}',   // mid-grey on dark
          },
        },
        // Text for use directly on the dark masthead band
        textOnDark: {
          value: '{colors.hay.200}',     // #D8D4C2 — nav items on dark masthead
        },
        textOnDarkMuted: {
          value: '{colors.hay.400}',     // #858273 — secondary nav, subtitles on dark
        },
        textOnDarkDim: {
          value: '{colors.hay.500}',     // #5F5C4E — whispered annotations on dark
        },

        // ── Harvest gold accent ──────────────────────────────────────────
        accent: {
          value: '{colors.gold.DEFAULT}', // #B8A83A — full saturation, used sparingly
        },
        accentLight: {
          value: '{colors.gold.light}',   // #DDD59E — hover states, tinted fills
        },
        accentDark: {
          value: '{colors.gold.dark}',    // #7C7120 — pressed, deep emphasis
        },

        // ── Spring green secondary accent (wins / botanical) ─────────────
        signal: {
          value: '{colors.green.DEFAULT}', // #4A8C6A — Tigers win left-border
        },
        signalLight: {
          value: '{colors.green.light}',   // #8DC4A5 — seasonal labels
        },
        signalDark: {
          value: '{colors.green.dark}',    // #2D5C45 — deep signal emphasis
        },

        // ── Borders ──────────────────────────────────────────────────────
        border: {
          value: {
            base:  '{colors.hay.200}',   // #D8D4C2 — all column separators, hairlines
            _dark: '{colors.hay.600}',   // #433F34 — dark mode dividers
          },
        },
        borderAccent: {
          value: '{colors.gold.DEFAULT}', // #B8A83A — dateline band top/bottom border
        },
        borderSubtle: {
          value: {
            base:  '{colors.hay.100}',   // faintest hairline
            _dark: '{colors.hay.700}',
          },
        },
      },
    },
  },
})