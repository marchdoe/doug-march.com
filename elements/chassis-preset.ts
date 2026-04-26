import { definePreset } from '@pandacss/dev'

/**
 * Generated from elements/chassis/playfair-outfit.js by scripts/utils/chassis.js.
 * Listed LAST in panda.config.ts so its fonts + fontSizes win over any values
 * the Token Designer emits in elements/preset.ts.
 *
 * Do not edit by hand — overwritten on every daily redesign.
 */
export const chassisPreset = definePreset({
  name: 'chassis',
  theme: {
    extend: {
      tokens: {
        fonts: {
          display: { value: "\"Playfair Display\", Georgia, \"Times New Roman\", serif" },
          body: { value: "Outfit, system-ui, -apple-system, sans-serif" },
        },
        fontSizes: {
          '2xs': { value: "0.625rem" },
          xs: { value: "0.625rem" },
          sm: { value: "0.75rem" },
          base: { value: "1rem" },
          md: { value: "1.333rem" },
          lg: { value: "1.777rem" },
          xl: { value: "2.369rem" },
          '2xl': { value: "3.157rem" },
        },
      },
    },
  },
})
