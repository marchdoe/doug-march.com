import { definePreset } from '@pandacss/dev'

export const elementsPreset = definePreset({
  name: 'elements',

  conditions: {
    extend: {
      _light: '.light &, [data-theme="light"] &',
      _dark: '.dark &, [data-theme="dark"] &',
    },
  },

  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      fontSize: '16px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'base',
      fontWeight: '400',
      lineHeight: 'normal',
      background: 'bg',
      color: 'text',
      margin: '0',
      padding: '0',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      lineHeight: 'tight',
      letterSpacing: 'tight',
      color: 'text',
      margin: '0',
    },
    p: {
      margin: '0',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      transition: 'color 120ms ease',
    },
    'a:hover': {
      color: 'accentDark',
    },
    'img, video': {
      display: 'block',
      maxWidth: '100%',
    },
  },

  theme: {
    extend: {
      tokens: {
        colors: {
          // Primary neutral — spring green-gray, hue 108°, saturation 8–14%
          green: {
            50:  { value: '#f1f5ef', description: 'Page background' },
            100: { value: '#e4ece1', description: 'Card / section alt bg' },
            200: { value: '#c9d5c4', description: 'Borders, hairlines' },
            300: { value: '#a3b49d', description: 'Muted text, disabled' },
            400: { value: '#7c8e76', description: 'Placeholder' },
            500: { value: '#596658', description: 'Secondary text' },
            600: { value: '#3f4a3d', description: 'Body text' },
            700: { value: '#2a322a', description: 'Heading text / footer bg' },
            800: { value: '#191e19', description: 'Dark band bg' },
            900: { value: '#0e120e', description: 'Deepest bg' },
          },
          // Accent — warm amber, hue 35°
          amber: {
            100: { value: '#f4d99b', description: 'Amber light — hover states, tinted fills' },
            500: { value: '#c97d1e', description: 'Amber default — buttons, links, active' },
            700: { value: '#8f560f', description: 'Amber dark — pressed, emphasis' },
            glow: { value: 'rgba(201, 125, 30, 0.09)', description: 'Amber glow overlay' },
          },
          // Secondary accent — muted terracotta, hue 12°
          terracotta: {
            500: { value: '#b8674e', description: 'Loss/deflation signal — Pistons' },
          },
          // Section alt bg — midpoint between green.50 and green.100
          spring: {
            alt: { value: '#eaf0e6', description: 'Alternating scroll beat bg' },
          },
        },

        fonts: {
          heading: { value: "'Syne', sans-serif" },
          body: { value: "'Work Sans', sans-serif" },
        },

        // Perfect Fourth scale (1.333), base 16px
        fontSizes: {
          '2xs': { value: '0.5625rem',  description: '9px — micro labels, index headers' },
          xs:   { value: '0.75rem',    description: '12px — meta, nav, attribution' },
          sm:   { value: '0.875rem',   description: '14px — body minimum, item text' },
          base: { value: '1rem',       description: '16px — body text' },
          md:   { value: '1.3125rem',  description: '21px — role / subheading' },
          lg:   { value: '1.75rem',    description: '28px — quote, section heads' },
          xl:   { value: '2.3125rem',  description: '37px — display sub' },
          '2xl':{ value: '3.125rem',   description: '50px — hero name' },
        },

        lineHeights: {
          tight:  { value: '1.05',  description: 'Display headings — Radiohead compression' },
          snug:   { value: '1.25',  description: 'Subheadings, compact text' },
          normal: { value: '1.62',  description: 'Body text — generous spring air' },
          loose:  { value: '1.88',  description: 'Quote / signal sections — Wet Leg breathing room' },
        },

        letterSpacings: {
          tight:   { value: '-0.025em', description: '2xl and xl headings' },
          normal:  { value: '-0.008em', description: 'md headings' },
          wide:    { value: '0.045em',  description: 'Section labels' },
          wider:   { value: '0.09em',   description: 'Index column headers, meta annotations' },
          widest:  { value: '0.15em',   description: 'Nav links, micro-labels' },
        },

        // Spacing scale — 4px base unit
        spacing: {
          1:  { value: '4px' },
          2:  { value: '8px' },
          3:  { value: '12px' },
          4:  { value: '16px' },
          6:  { value: '24px' },
          8:  { value: '32px' },
          12: { value: '48px' },
          16: { value: '64px' },
          20: { value: '80px' },
          24: { value: '96px' },
        },

        radii: {
          none:   { value: '0px', description: 'Cards, tags — architectural, no softness' },
          button: { value: '2px', description: 'Buttons, inputs — minimal rounding only' },
        },

        // No shadows — spring light diffuses harshness
        shadows: {
          none: { value: 'none' },
        },

        // Z-index scale
        zIndex: {
          base:    { value: '0' },
          raised:  { value: '10' },
          overlay: { value: '50' },
          nav:     { value: '100' },
          modal:   { value: '200' },
        },

        // Transition durations
        durations: {
          fast:   { value: '120ms' },
          base:   { value: '150ms' },
          slow:   { value: '200ms' },
        },
      },

      semanticTokens: {
        colors: {
          // Backgrounds
          bg: {
            value: {
              base: '{colors.green.50}',
              _dark: '{colors.green.800}',
            },
          },
          bgAlt: {
            value: {
              base: '{colors.spring.alt}',
              _dark: '{colors.green.900}',
            },
          },
          bgCard: {
            value: {
              base: '{colors.green.100}',
              _dark: '{colors.green.700}',
            },
          },
          bgFooter: {
            value: {
              base: '{colors.green.700}',
              _dark: '{colors.green.900}',
            },
          },
          bgNav: {
            value: {
              base: 'rgba(241, 245, 239, 0.95)',
              _dark: 'rgba(25, 30, 25, 0.95)',
            },
          },

          // Text hierarchy
          text: {
            value: {
              base: '{colors.green.700}',
              _dark: '{colors.green.100}',
            },
          },
          textSecondary: {
            value: {
              base: '{colors.green.500}',
              _dark: '{colors.green.300}',
            },
          },
          textMuted: {
            value: {
              base: '{colors.green.300}',
              _dark: '{colors.green.500}',
            },
          },
          textReversed: {
            value: {
              base: '{colors.green.100}',
              _dark: '{colors.green.700}',
            },
          },
          textBody: {
            value: {
              base: '{colors.green.600}',
              _dark: '{colors.green.200}',
            },
          },

          // Accent
          accent: {
            value: {
              base: '{colors.amber.500}',
              _dark: '{colors.amber.500}',
            },
          },
          accentLight: {
            value: {
              base: '{colors.amber.100}',
              _dark: '{colors.amber.100}',
            },
          },
          accentDark: {
            value: {
              base: '{colors.amber.700}',
              _dark: '{colors.amber.700}',
            },
          },
          accentGlow: {
            value: {
              base: '{colors.amber.glow}',
              _dark: '{colors.amber.glow}',
            },
          },

          // Borders
          border: {
            value: {
              base: '{colors.green.200}',
              _dark: '{colors.green.600}',
            },
          },
          borderSubtle: {
            value: {
              base: '{colors.green.100}',
              _dark: '{colors.green.700}',
            },
          },

          // Signal — terracotta for loss/deflation
          signal: {
            value: {
              base: '{colors.terracotta.500}',
              _dark: '{colors.terracotta.500}',
            },
          },
        },
      },
    },
  },
})