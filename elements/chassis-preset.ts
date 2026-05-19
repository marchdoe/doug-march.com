import { definePreset } from '@pandacss/dev'

/**
 * Generated from elements/chassis/big-shoulders-atkinson.js by scripts/utils/chassis.js.
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
          display: { value: "\"Big Shoulders Display\", Impact, \"Arial Narrow\", sans-serif" },
          body: { value: "\"Atkinson Hyperlegible\", system-ui, -apple-system, sans-serif" },
        },
        fontSizes: {
          '2xs': { value: "0.625rem" },
          xs: { value: "0.625rem" },
          sm: { value: "0.625rem" },
          base: { value: "1rem" },
          md: { value: "1.618rem" },
          lg: { value: "2.618rem" },
          xl: { value: "4.236rem" },
          '2xl': { value: "6.854rem" },
        },
      },
    },
  },
})
