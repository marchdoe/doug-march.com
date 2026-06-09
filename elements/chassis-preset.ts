import { definePreset } from '@pandacss/dev'

/**
 * Generated from elements/chassis/bebas-plex.js by scripts/utils/chassis.js.
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
          display: { value: "\"Bebas Neue\", Oswald, Impact, sans-serif" },
          body: { value: "\"IBM Plex Sans\", system-ui, -apple-system, sans-serif" },
        },
        fontSizes: {
          '2xs': { value: "0.625rem" },
          xs: { value: "0.625rem" },
          sm: { value: "0.667rem" },
          base: { value: "1rem" },
          md: { value: "1.5rem" },
          lg: { value: "2.25rem" },
          xl: { value: "3.375rem" },
          '2xl': { value: "5.063rem" },
        },
      },
    },
  },
})
