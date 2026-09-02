import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import {
  COLOR_PROPS,
  SEMANTIC_COLORS,
  SEMANTIC_COLOR_NAMES,
  checkPresetContract,
  findOffContractColorValues,
  formatSemanticContractForArtDirector,
  formatSemanticContractForPrompt,
  parsePresetSemanticColors,
} from '../../scripts/utils/semantic-contract.js'

// Named REPO, not ROOT: tests-do-not-mutate-archive.test.js reads `resolve(ROOT,
// 'elements/...')` as a test writing fixtures into the repo. These two only read.
const REPO = resolve(import.meta.dirname, '../..')

/** A preset defining exactly the contract, in the shape the Art Director writes. */
function presetWith(names) {
  const entries = names
    .map(
      (n) => `        ${n}: { value: { base: '{colors.sand.900}', _light: '{colors.sand.50}' } },`
    )
    .join('\n')
  return `import { definePreset } from '@pandacss/dev'
export const elementsPreset = definePreset({
  name: 'elements',
  theme: {
    tokens: { colors: { sand: { 50: { value: '#fff' }, 900: { value: '#000' } } } },
    semanticTokens: {
      colors: {
${entries}
      },
    },
  },
})`
}

describe('SEMANTIC_COLORS', () => {
  it('is between 12 and 15 names', () => {
    expect(SEMANTIC_COLOR_NAMES.length).toBeGreaterThanOrEqual(12)
    expect(SEMANTIC_COLOR_NAMES.length).toBeLessThanOrEqual(15)
  })

  it('has no duplicates', () => {
    expect(new Set(SEMANTIC_COLOR_NAMES).size).toBe(SEMANTIC_COLOR_NAMES.length)
  })

  it('documents a role for every name', () => {
    for (const { name, role } of SEMANTIC_COLORS) {
      expect(role, `${name} has no role`).toBeTruthy()
      expect(role.length).toBeGreaterThan(20)
    }
  })

  it('keeps the four names every archived preset defines', () => {
    for (const name of ['bg', 'text', 'accent', 'border']) {
      expect(SEMANTIC_COLOR_NAMES).toContain(name)
    }
  })
})

describe('parsePresetSemanticColors', () => {
  it('reads the top-level names in file order', () => {
    expect(parsePresetSemanticColors(presetWith(['bg', 'text', 'accent']))).toEqual([
      'bg',
      'text',
      'accent',
    ])
  })

  it('ignores the nested value objects', () => {
    const names = parsePresetSemanticColors(presetWith(SEMANTIC_COLOR_NAMES))
    expect(names).toEqual([...SEMANTIC_COLOR_NAMES])
  })

  it('reads quoted keys', () => {
    const source = `semanticTokens: { colors: { 'bg': { value: '#000' }, "text": { value: '#fff' } } }`
    expect(parsePresetSemanticColors(source)).toEqual(['bg', 'text'])
  })

  it('is empty for a preset with no semantic colors', () => {
    expect(parsePresetSemanticColors('export const x = 1')).toEqual([])
    expect(parsePresetSemanticColors('semanticTokens: { fonts: {} }')).toEqual([])
  })

  it('is not thrown off by a comment holding an unbalanced brace (#318)', () => {
    const source = `semanticTokens: {
      colors: {
        /* legacy note: this used to read { base: '#000' } */
        bg: { value: '#000' },
        text: { value: '#fff' },
      },
    }`
    expect(parsePresetSemanticColors(source)).toEqual(['bg', 'text'])
  })
})

describe('checkPresetContract', () => {
  it('passes a preset defining exactly the contract', () => {
    const r = checkPresetContract(presetWith(SEMANTIC_COLOR_NAMES))
    expect(r.ok).toBe(true)
    expect(r.missing).toEqual([])
    expect(r.extra).toEqual([])
  })

  it('reports a missing name', () => {
    const r = checkPresetContract(presetWith(SEMANTIC_COLOR_NAMES.filter((n) => n !== 'textFaint')))
    expect(r.ok).toBe(false)
    expect(r.missing).toEqual(['textFaint'])
  })

  it('reports exactly the one real missing name, not all fifteen, when a comment in the block holds an unbalanced brace (#318)', () => {
    const names = SEMANTIC_COLOR_NAMES.filter((n) => n !== 'textFaint')
    const entries = names
      .map(
        (n) => `        ${n}: { value: { base: '{colors.sand.900}', _light: '{colors.sand.50}' } },`
      )
      .join('\n')
    const source = `import { definePreset } from '@pandacss/dev'
export const elementsPreset = definePreset({
  name: 'elements',
  theme: {
    tokens: { colors: { sand: { 50: { value: '#fff' }, 900: { value: '#000' } } } },
    semanticTokens: {
      colors: {
        /* legacy note: this role used to read { base: '#000' } */
${entries}
      },
    },
  },
})`
    const r = checkPresetContract(source)
    expect(r.missing).toEqual(['textFaint'])
    expect(r.extra).toEqual([])
  })

  it('reports an invented name, which is the drift this exists to stop', () => {
    const r = checkPresetContract(presetWith([...SEMANTIC_COLOR_NAMES, 'bgSpine']))
    expect(r.ok).toBe(false)
    expect(r.extra).toEqual(['bgSpine'])
    expect(r.missing).toEqual([])
  })

  it("rejects last night's set, which defined nine of the fifteen", () => {
    const lastNight = [
      'bg',
      'surface',
      'field',
      'fieldInk',
      'text',
      'textMuted',
      'accent',
      'accentText',
      'border',
    ]
    const r = checkPresetContract(presetWith(lastNight))
    expect(r.ok).toBe(false)
    expect(r.missing).toContain('bgAlt')
    expect(r.missing).toContain('textFaint')
  })

  it('accepts the preset on disk, so the branch passes its own gate', () => {
    const source = readFileSync(resolve(REPO, 'elements/preset.ts'), 'utf8')
    expect(checkPresetContract(source)).toMatchObject({ ok: true, missing: [], extra: [] })
  })
})

describe('findOffContractColorValues', () => {
  it('finds a raw palette step, which resolves and still pins the colour', () => {
    expect(findOffContractColorValues(`css({ color: 'sand.300' })`)).toEqual([
      { prop: 'color', value: 'sand.300' },
    ])
  })

  it('finds an off-contract semantic name', () => {
    expect(findOffContractColorValues(`css({ background: 'bgCard' })`)).toEqual([
      { prop: 'background', value: 'bgCard' },
    ])
  })

  it('accepts every canonical name', () => {
    const source = SEMANTIC_COLOR_NAMES.map((n) => `css({ color: '${n}' })`).join('\n')
    expect(findOffContractColorValues(source)).toEqual([])
  })

  it('reads the Panda shorthands and the JSX prop spelling', () => {
    expect(findOffContractColorValues(`css({ bg: 'gold.400' })`)).toEqual([
      { prop: 'bg', value: 'gold.400' },
    ])
    expect(findOffContractColorValues(`<Box borderColor="sand.700" />`)).toEqual([
      { prop: 'borderColor', value: 'sand.700' },
    ])
  })

  it('leaves raw CSS alone — a hex paints, and a build should not die over one', () => {
    const source = `
      css({ color: '#ff0000' })
      css({ background: 'rgb(0 0 0 / 40%)' })
      css({ background: 'linear-gradient(90deg, #000, #fff)' })
      css({ color: 'var(--custom)' })
      css({ fill: 'currentColor' })
      css({ stroke: 'none' })
      css({ background: 'transparent' })
      css({ color: 'white' })
    `
    expect(findOffContractColorValues(source)).toEqual([])
  })

  it('ignores non-colour properties', () => {
    expect(findOffContractColorValues(`css({ fontSize: '5xl', width: '11' })`)).toEqual([])
  })

  it('reports each distinct pair once', () => {
    const source = `css({ color: 'sand.300' }); css({ color: 'sand.300' })`
    expect(findOffContractColorValues(source)).toHaveLength(1)
  })

  it('covers the colour props Panda actually emits', () => {
    for (const prop of ['color', 'background', 'bg', 'borderColor', 'fill', 'stroke']) {
      expect(COLOR_PROPS).toContain(prop)
    }
  })

  it('ignores a raw palette step mentioned only in a comment (#310)', () => {
    const source = "// historic: color: 'sand.300' was the old ink\n"
    expect(findOffContractColorValues(source)).toEqual([])
  })

  it('still reports a real off-contract value alongside an explanatory comment', () => {
    const source = "// historic: color: 'sand.300' was the old ink\ncss({ color: 'sand.300' })"
    expect(findOffContractColorValues(source)).toEqual([{ prop: 'color', value: 'sand.300' }])
  })

  it('does not let a `//` inside a string hide a real value that follows', () => {
    const source = "const url = 'https://example.com'; css({ color: 'sand.300' })"
    expect(findOffContractColorValues(source)).toEqual([{ prop: 'color', value: 'sand.300' }])
  })
})

describe('the generated prompt copy', () => {
  it('names every token in both variants', () => {
    const engineer = formatSemanticContractForPrompt()
    const director = formatSemanticContractForArtDirector()
    for (const name of SEMANTIC_COLOR_NAMES) {
      expect(engineer, `engineer copy omits ${name}`).toContain(`\`${name}\``)
      expect(director, `art director copy omits ${name}`).toContain(`\`${name}\``)
    }
  })

  it('agrees with the module on how many names there are', () => {
    const count = String(SEMANTIC_COLOR_NAMES.length)
    expect(formatSemanticContractForPrompt()).toContain(count)
    expect(formatSemanticContractForArtDirector()).toContain(count)
  })
})

describe('the prompts that document the contract', () => {
  const files = [
    'scripts/prompts/design-system-reference.md',
    'scripts/prompts/react-engineer.md',
    'scripts/prompts/art-director.md',
  ]

  it.each(files)('%s carries the placeholder rather than a hand-written list', (file) => {
    const source = readFileSync(resolve(REPO, file), 'utf8')
    expect(source).toContain('{{SEMANTIC_COLOR_CONTRACT}}')
  })

  it.each(files)('%s names no token the contract does not define', (file) => {
    const source = readFileSync(resolve(REPO, file), 'utf8')
    // The names react-engineer.md listed for months and no preset ever defined.
    for (const ghost of ['bg.side', 'text.mid', 'accent.glow', 'border.accent', 'bg.card']) {
      expect(source, `${file} still names ${ghost}`).not.toContain(ghost)
    }
  })
})
