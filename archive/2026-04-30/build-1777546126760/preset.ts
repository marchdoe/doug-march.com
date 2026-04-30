import { definePreset } from "@pandacss/dev";

export const elementsPreset = definePreset({
  name: "elements",

  globalCss: {
    body: {
      background: "bg",
      color: "text",
      lineHeight: "normal",
      letterSpacing: "wide",
    },
    a: {
      color: "accent",
      textDecoration: "none",
    },
    "h1, h2, h3, h4, h5, h6": {
      color: "text",
      letterSpacing: "normal",
    },
  },

  conditions: {
    light: "&",
    dark: "@media (prefers-color-scheme: dark)",
  },

  theme: {
    tokens: {
      colors: {
        neutral: {
          50: { value: "#F8F5F6" },
          100: { value: "#EBE8EA" },
          200: { value: "#D4CDD1" },
          300: { value: "#AFA6AB" },
          400: { value: "#877F84" },
          500: { value: "#645B60" },
          600: { value: "#453C42" },
          700: { value: "#2D252B" },
          800: { value: "#1B141A" },
          900: { value: "#0E0B0D" },
        },
        sage: {
          light: { value: "#8FBB91" },
          DEFAULT: { value: "#3D7D40" },
          dark: { value: "#265429" },
          glow: { value: "rgba(61, 125, 64, 0.08)" },
        },
        mustard: {
          DEFAULT: { value: "#C2891C" },
        },
      },
      spacing: {
        4: { value: "4px" },
        8: { value: "8px" },
        16: { value: "16px" },
        24: { value: "24px" },
        32: { value: "32px" },
        44: { value: "44px" },
        48: { value: "48px" },
        64: { value: "64px" },
        80: { value: "80px" },
        96: { value: "96px" },
      },
      fontWeights: {
        light: { value: "300" },
        normal: { value: "400" },
        medium: { value: "500" },
        bold: { value: "700" },
      },
      lineHeights: {
        tight: { value: "1.05" },
        snug: { value: "1.20" },
        normal: { value: "1.62" },
        loose: { value: "1.88" },
      },
      letterSpacings: {
        tight: { value: "-0.025em" },
        normal: { value: "-0.010em" },
        wide: { value: "0.030em" },
        wider: { value: "0.065em" },
        widest: { value: "0.100em" },
      },
      radii: {
        none: { value: "0px" },
        sm: { value: "2px" },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: "{colors.neutral.50}",
            _dark: "{colors.neutral.900}",
          },
        },
        "bg-card": {
          value: {
            base: "{colors.neutral.100}",
            _dark: "{colors.neutral.800}",
          },
        },
        text: {
          value: {
            base: "{colors.neutral.700}",
            _dark: "{colors.neutral.100}",
          },
        },
        "text-secondary": {
          value: {
            base: "{colors.neutral.500}",
            _dark: "{colors.neutral.300}",
          },
        },
        "text-muted": {
          value: {
            base: "{colors.neutral.400}",
            _dark: "{colors.neutral.400}",
          },
        },
        border: {
          value: {
            base: "{colors.neutral.200}",
            _dark: "{colors.neutral.600}",
          },
        },
        accent: {
          value: {
            base: "{colors.sage.DEFAULT}",
            _dark: "{colors.sage.light}",
          },
        },
        "accent-mustard": {
          value: {
            base: "{colors.mustard.DEFAULT}",
            _dark: "{colors.mustard.DEFAULT}",
          },
        },
      },
    },
  },
});