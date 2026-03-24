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
  readFileGroup,
} from '../../scripts/utils/site-context.js'

describe('file group constants', () => {
  it('TOKEN_FILES contains preset.ts and __root.tsx', () => {
    expect(TOKEN_FILES).toEqual([
      'elements/preset.ts',
      'app/routes/__root.tsx',
    ])
  })

  it('LAYOUT_FILES contains Layout.tsx and 3 route files', () => {
    expect(LAYOUT_FILES).toEqual([
      'app/components/Layout.tsx',
      'app/routes/index.tsx',
      'app/routes/about.tsx',
      'app/routes/work.$slug.tsx',
    ])
  })

  it('SIDEBAR_FILES contains only Sidebar.tsx', () => {
    expect(SIDEBAR_FILES).toEqual(['app/components/Sidebar.tsx'])
  })

  it('FOOTER_FILES contains only MobileFooter.tsx', () => {
    expect(FOOTER_FILES).toEqual(['app/components/MobileFooter.tsx'])
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
    const combined = [...TOKEN_FILES, ...STRUCTURE_FILES, ...COMPONENT_FILES]
    expect(combined.sort()).toEqual([...MUTABLE_FILES].sort())
  })

  it('no file appears in more than one group', () => {
    const all = [...TOKEN_FILES, ...STRUCTURE_FILES, ...COMPONENT_FILES]
    const unique = new Set(all)
    expect(unique.size).toBe(all.length)
  })
})

describe('readFileGroup', () => {
  it('reads existing files and returns path + content', async () => {
    const files = await readFileGroup(['elements/preset.ts'])
    expect(files).toHaveLength(1)
    expect(files[0].path).toBe('elements/preset.ts')
    expect(files[0].content).toContain('definePreset')
  })

  it('skips files that do not exist', async () => {
    const files = await readFileGroup(['nonexistent/file.ts', 'elements/preset.ts'])
    expect(files).toHaveLength(1)
  })
})
