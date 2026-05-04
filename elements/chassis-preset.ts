import { definePreset } from '@pandacss/dev'

/**
 * Generated from elements/chassis/space-grotesk-work-sans.js by scripts/utils/chassis.js.
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
          heading: { value: "\"Space Grotesk\", system-ui, sans-serif" },
          body: { value: "\"Work Sans\", system-ui, -apple-system, sans-serif" },
        },
        fontSizes: {
          '2xs': { value: "0.625rem" },
          xs: { value: "0.694rem" },
          sm: { value: "0.833rem" },
          base: { value: "1rem" },
          md: { value: "1.2rem" },
          lg: { value: "1.44rem" },
          xl: { value: "1.728rem" },
          '2xl': { value: "2.074rem" },
        },
      },
    },
  },
})
