import { describe, expect, it } from 'vitest'

import { tempDir, writeUnder } from '../helpers/tmp.js'
import {
  formatPatternPropsForPrompt,
  parsePatternInterface,
  readPatternProps,
} from '../../scripts/utils/pattern-props.js'

// Two fixture patterns, shaped exactly like Panda's real codegen output for
// hstack and stack (styled-system/patterns/*.d.ts) — including the
// irregular hstack→HStack casing that toComponentName has to special-case,
// and one prop (Stack's `gap`) that maps to itself so the formatter's
// self-mapping omission is exercised too. `jsx/index.d.ts` re-exports both
// plus a non-pattern module, the way the real file re-exports `factory`
// alongside every pattern — readPatternProps must not turn that into a
// third "component".
const HSTACK_DTS = `/* eslint-disable */
import type { SystemStyleObject } from '../types/index';
import type { SystemProperties } from '../types/style-props';
import type { DistributiveOmit } from '../types/system-types';

export interface HstackProperties {
   justify?: SystemProperties["justifyContent"]
	gap?: SystemProperties["gap"]
}

interface HstackStyles extends HstackProperties, DistributiveOmit<SystemStyleObject, keyof HstackProperties > {}

interface HstackPatternFn {
  (styles?: HstackStyles): string
  raw: (styles?: HstackStyles) => SystemStyleObject
}

export declare const hstack: HstackPatternFn;
`

const STACK_DTS = `/* eslint-disable */
import type { SystemStyleObject } from '../types/index';
import type { SystemProperties } from '../types/style-props';
import type { DistributiveOmit } from '../types/system-types';

export interface StackProperties {
   align?: SystemProperties["alignItems"]
	justify?: SystemProperties["justifyContent"]
	direction?: SystemProperties["flexDirection"]
	gap?: SystemProperties["gap"]
}

interface StackStyles extends StackProperties, DistributiveOmit<SystemStyleObject, keyof StackProperties > {}

interface StackPatternFn {
  (styles?: StackStyles): string
  raw: (styles?: StackStyles) => SystemStyleObject
}

export declare const stack: StackPatternFn;
`

const JSX_INDEX_DTS = `/* eslint-disable */
export * from './factory';
export * from './stack';
export * from './hstack';
export type { HTMLStyledProps, StyledComponent } from '../types/jsx';
`

async function seedFixture() {
  const root = await tempDir('dm-pattern-props-')
  writeUnder(root, 'styled-system/patterns/hstack.d.ts', HSTACK_DTS)
  writeUnder(root, 'styled-system/patterns/stack.d.ts', STACK_DTS)
  writeUnder(root, 'styled-system/jsx/index.d.ts', JSX_INDEX_DTS)
  return root
}

describe('parsePatternInterface', () => {
  it('parses a SystemProperties prop into its CSS property', () => {
    expect(parsePatternInterface(HSTACK_DTS)).toEqual([
      { name: 'justify', mapsTo: 'justifyContent' },
      { name: 'gap', mapsTo: 'gap' },
    ])
  })

  it('parses every prop of a multi-prop interface, in declaration order', () => {
    expect(parsePatternInterface(STACK_DTS)).toEqual([
      { name: 'align', mapsTo: 'alignItems' },
      { name: 'justify', mapsTo: 'justifyContent' },
      { name: 'direction', mapsTo: 'flexDirection' },
      { name: 'gap', mapsTo: 'gap' },
    ])
  })

  it('returns an empty array for a source with no Properties interface', () => {
    expect(parsePatternInterface('export declare const box: unknown;')).toEqual([])
  })
})

describe('readPatternProps', () => {
  it('reads only the patterns jsx/index.d.ts re-exports, in its order', async () => {
    const root = await seedFixture()
    const patterns = readPatternProps(root)
    expect(patterns.map((p) => p.baseName)).toEqual(['stack', 'hstack'])
  })

  it('names hstack HStack — the one PascalCase exception plain capitalizing misses', async () => {
    const root = await seedFixture()
    const [, hstack] = readPatternProps(root)
    expect(hstack.component).toBe('HStack')
  })

  it('gives HStack only justify and gap, never align', async () => {
    const root = await seedFixture()
    const hstack = readPatternProps(root).find((p) => p.baseName === 'hstack')
    expect(hstack.props.map((p) => p.name)).toEqual(['justify', 'gap'])
  })

  it('does not turn a non-pattern jsx re-export (factory) into a component', async () => {
    const root = await seedFixture()
    const patterns = readPatternProps(root)
    expect(patterns.find((p) => p.baseName === 'factory')).toBeUndefined()
    expect(patterns).toHaveLength(2)
  })
})

describe('formatPatternPropsForPrompt', () => {
  it('lists HStack with gap and justify, and never attributes align to it', () => {
    const rendered = formatPatternPropsForPrompt(readPatternPropsFromFixtureSync())
    const hstackLine = rendered.split('\n').find((l) => l.startsWith('- `HStack`'))
    expect(hstackLine).toContain('justify')
    expect(hstackLine).toContain('gap')
    expect(hstackLine).not.toContain('align')
  })

  it('omits the arrow for a prop that maps to a same-named CSS property', () => {
    const rendered = formatPatternPropsForPrompt(readPatternPropsFromFixtureSync())
    const hstackLine = rendered.split('\n').find((l) => l.startsWith('- `HStack`'))
    // gap -> gap: shown bare, not as `gap` (→ `gap`)
    expect(hstackLine).toContain('`gap`')
    expect(hstackLine).not.toContain('(→ `gap`)')
  })

  it('shows the arrow for a prop that maps to a differently-named CSS property', () => {
    const rendered = formatPatternPropsForPrompt(readPatternPropsFromFixtureSync())
    const stackLine = rendered.split('\n').find((l) => l.startsWith('- `Stack`'))
    expect(stackLine).toContain('`align` (→ `alignItems`)')
    expect(stackLine).toContain('`direction` (→ `flexDirection`)')
  })

  it('states the as-prop and plain-anchor-link rules', () => {
    const rendered = formatPatternPropsForPrompt(readPatternPropsFromFixtureSync())
    expect(rendered).toMatch(/`as`.*does not change which props/)
    expect(rendered).toContain('<a href="/">')
  })

  it('marks a prop-less component rather than rendering an empty line', () => {
    const rendered = formatPatternPropsForPrompt([{ component: 'Box', baseName: 'box', props: [] }])
    expect(rendered).toContain('`Box` — no pattern props')
  })
})

/** Synchronous fixture for describe blocks that don't need a fresh temp dir per test. */
function readPatternPropsFromFixtureSync() {
  return [
    { component: 'Stack', baseName: 'stack', props: parsePatternInterface(STACK_DTS) },
    { component: 'HStack', baseName: 'hstack', props: parsePatternInterface(HSTACK_DTS) },
  ]
}
