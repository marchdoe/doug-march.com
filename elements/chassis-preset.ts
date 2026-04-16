import { definePreset } from '@pandacss/dev'

/**
 * Typography chassis preset. Owns fonts + fontSizes only; everything else
 * lives in elements/preset.ts authored by the Token Designer agent.
 *
 * Listed LAST in panda.config.ts so its tokens win over any fonts/fontSizes
 * the Token Designer accidentally emits in elements/preset.ts. This is the
 * structural defense that makes "AI authoring + curated typography" safe.
 *
 * Initial state matches the Playfair Display + Outfit pairing that was live
 * before the chassis system landed. The orchestrator overwrites this file
 * on every daily redesign, regenerated from the Director-chosen chassis.
 */
export const chassisPreset = definePreset({
  name: 'chassis',
  theme: {
    extend: {
      tokens: {
        fonts: {
          display: { value: '"Playfair Display", Georgia, "Times New Roman", serif' },
          body:    { value: 'Outfit, system-ui, -apple-system, sans-serif' },
        },
        fontSizes: {
          '2xs': { value: '10px' },
          xs:    { value: '12px' },
          sm:    { value: '13px' },
          base:  { value: '16px' },
          md:    { value: '21px' },
          lg:    { value: '34px' },
          xl:    { value: '56px' },
          '2xl': { value: '88px' },
        },
      },
    },
  },
})
