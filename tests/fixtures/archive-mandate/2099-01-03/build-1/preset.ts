import { definePreset } from '@pandacss/dev'
export const elementsPreset = definePreset({
  name: 'elements',
  theme: { tokens: { colors: {
    neutral: { 500: { value: '#8A7F70' } },
    accent: { DEFAULT: { value: '#8C6B44' } }
  }}}
})
