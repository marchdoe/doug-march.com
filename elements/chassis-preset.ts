import { definePreset } from '@pandacss/dev'

/**
 * Generated from elements/chassis/unbounded-figtree.js by scripts/utils/chassis.js.
 * Listed LAST in panda.config.ts so its fonts + fontSizes win over any values
 * the Token Designer emits in elements/preset.ts.
 *
 * Do not edit by hand — overwritten on every daily redesign.
 */
export const chassisPreset = definePreset({
  name: 'chassis',
  // Orchestrator-owned. `extend` deep-merges into the Art Director's
  // globalCss.body instead of replacing it. See scripts/utils/chassis.js.
  globalCss: {
    extend: {
      body: { fontFamily: 'body' },
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          display: { value: "Unbounded, Arial, sans-serif" },
          body: { value: "Figtree, system-ui, -apple-system, sans-serif" },
        },
        fontSizes: {
          '2xs': { value: "0.702rem" },
          xs: { value: "0.79rem" },
          sm: { value: "0.889rem" },
          base: { value: "1rem" },
          md: { value: "1.5rem" },
          lg: { value: "2.25rem" },
          xl: { value: "3.375rem" },
          '2xl': { value: "5.063rem" },
          '3xl': { value: "7.594rem" },
          '4xl': { value: "11.391rem" },
          '5xl': { value: "17.086rem" },
          hero: { value: "clamp(5.063rem, 4.219rem + 3.75vw, 7.594rem)" },
        },
      },
    },
  },
})
