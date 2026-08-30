// tests/scripts/site-context.test.js
import { describe, it, expect } from 'vitest'
import {
  MUTABLE_FILES,
  TOKEN_FILES,
  LAYOUT_FILES,
  SIDEBAR_FILES,
  FOOTER_FILES,
  STRUCTURE_FILES,
  COMPONENT_FILES,
  ORCHESTRATOR_FILES,
} from '../../scripts/utils/site-context.js'

describe('file group constants', () => {
  it('TOKEN_FILES contains only preset.ts (chassis owns __root.tsx + chassis-preset.ts)', () => {
    expect(TOKEN_FILES).toEqual(['elements/preset.ts'])
  })

  it('ORCHESTRATOR_FILES contains the three generated files (never agent-authored)', () => {
    expect(ORCHESTRATOR_FILES).toEqual([
      'app/routes/__root.tsx',
      'elements/chassis-preset.ts',
      'app/components/BrandLockup.tsx',
    ])
  })

  it('LAYOUT_FILES contains Layout.tsx and 4 route files (og.tsx is the engineer-authored share card)', () => {
    expect(LAYOUT_FILES).toEqual([
      'app/components/Layout.tsx',
      'app/routes/index.tsx',
      'app/routes/about.tsx',
      'app/routes/work.$slug.tsx',
      'app/routes/og.tsx',
    ])
  })

  it('SIDEBAR_FILES contains only Sidebar.tsx', () => {
    expect(SIDEBAR_FILES).toEqual(['app/components/Sidebar.tsx'])
  })

  it('FOOTER_FILES is empty (MobileFooter removed from mutable files)', () => {
    expect(FOOTER_FILES).toEqual([])
  })

  it('STRUCTURE_FILES equals LAYOUT + SIDEBAR + FOOTER', () => {
    expect(STRUCTURE_FILES).toEqual([...LAYOUT_FILES, ...SIDEBAR_FILES, ...FOOTER_FILES])
  })

  it('COMPONENT_FILES contains all 9 component files', () => {
    expect(COMPONENT_FILES).toHaveLength(9)
    expect(COMPONENT_FILES).toContain('app/components/FeaturedProject.tsx')
    expect(COMPONENT_FILES).toContain('app/components/Personal.tsx')
  })

  it('all groups combined equal MUTABLE_FILES', () => {
    const combined = [...TOKEN_FILES, ...STRUCTURE_FILES, ...COMPONENT_FILES, ...ORCHESTRATOR_FILES]
    expect(combined.sort()).toEqual([...MUTABLE_FILES].sort())
  })

  it('no file appears in more than one group', () => {
    const all = [...TOKEN_FILES, ...STRUCTURE_FILES, ...COMPONENT_FILES, ...ORCHESTRATOR_FILES]
    const unique = new Set(all)
    expect(unique.size).toBe(all.length)
  })
})
