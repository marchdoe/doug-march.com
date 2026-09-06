/**
 * The pure half of "a repair is a patch" (#432, ADR 0001): the brief the
 * engineer reads, the merge of its reply over the files on disk, and the two
 * disk helpers around them. The swarm-level behaviour is in
 * tests/pipeline/swarm-repair.test.js.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { parseDelimiterResponse } from '../../scripts/utils/delimiter-parser.js'
import {
  deleteFiles,
  engineerOwnedPaths,
  loadRepairBriefTemplate,
  mergeEngineerPatch,
  readOwnedFiles,
  renderRepairBrief,
} from '../../scripts/utils/engineer-patch.js'
import { tempRepoRoot, writeUnder } from '../helpers/tmp.js'

const OWNERSHIP = {
  'elements/preset.ts': 'art-director',
  'app/components/Layout.tsx': 'react-engineer',
  'app/components/Sidebar.tsx': 'react-engineer',
}

const owned = [
  { path: 'app/components/Layout.tsx', content: 'export function Layout() {}\n' },
  { path: 'app/components/Sidebar.tsx', content: 'export function Sidebar() {}\n' },
  { path: 'app/routes/index.tsx', content: 'export const Route = null\n' },
]

describe('parseDelimiterResponse with keepEmptyFiles', () => {
  const raw = [
    '===FILE:app/components/Layout.tsx===',
    'export function Layout() {}',
    '===FILE:app/components/Ledger.tsx===',
    '',
    '===FILE:app/routes/og.tsx===',
    '===RATIONALE===',
    'patched',
  ].join('\n')

  it('drops an empty block by default, as every full generation always has', () => {
    expect(parseDelimiterResponse(raw).files.map((f) => f.path)).toEqual([
      'app/components/Layout.tsx',
    ])
  })

  it('keeps an empty block as a file with empty content when asked', () => {
    const { files, rationale } = parseDelimiterResponse(raw, { keepEmptyFiles: true })
    expect(files).toEqual([
      { path: 'app/components/Layout.tsx', content: 'export function Layout() {}' },
      { path: 'app/components/Ledger.tsx', content: '' },
      { path: 'app/routes/og.tsx', content: '' },
    ])
    expect(rationale).toBe('patched')
  })
})

describe('engineerOwnedPaths', () => {
  it("leaves out the Art Director's preset and the orchestrator's files", () => {
    const written = new Set([
      'elements/preset.ts',
      'elements/chassis-preset.ts',
      'app/routes/__root.tsx',
      'app/components/BrandLockup.tsx',
      'app/components/Layout.tsx',
      'app/components/Invented.tsx',
    ])
    expect(engineerOwnedPaths(written, OWNERSHIP)).toEqual([
      'app/components/Layout.tsx',
      'app/components/Invented.tsx',
    ])
  })
})

describe('readOwnedFiles', () => {
  it('reads what is on disk in write order and skips a path since deleted', async () => {
    const root = await tempRepoRoot()
    writeUnder(root, 'elements/preset.ts', 'preset')
    writeUnder(root, 'app/components/Sidebar.tsx', 'sidebar')
    writeUnder(root, 'app/components/Layout.tsx', 'layout')
    const written = new Set([
      'elements/preset.ts',
      'app/components/Sidebar.tsx',
      'app/components/Gone.tsx',
      'app/components/Layout.tsx',
    ])
    expect(await readOwnedFiles(written, OWNERSHIP, { root })).toEqual([
      { path: 'app/components/Sidebar.tsx', content: 'sidebar' },
      { path: 'app/components/Layout.tsx', content: 'layout' },
    ])
  })
})

describe('renderRepairBrief', () => {
  it('prints every owned file in full and carries the report verbatim', async () => {
    const template = await loadRepairBriefTemplate()
    const errors = "app/components/Layout.tsx(12,7): error TS2322: Type 'string'.\n"
    const brief = renderRepairBrief(template, { owned, errors })

    expect(brief.startsWith('# Repair brief')).toBe(true)
    for (const f of owned) {
      expect(brief).toContain(
        `--- ${f.path} ---\n${f.content.replace(/\n$/, '')}\n--- end ${f.path} ---`
      )
    }
    expect(brief).toContain(errors.trim())
    expect(brief).toContain('Return ONLY the files that must change')
    expect(brief).toContain('===FILE:path===')
    expect(brief).not.toContain('{{')
  })

  it('says so when nothing has been written yet', async () => {
    const template = await loadRepairBriefTemplate()
    expect(renderRepairBrief(template, { owned: [], errors: 'x' })).toContain('(none written yet)')
  })

  it('refuses a template without its placeholders', async () => {
    const root = await tempRepoRoot()
    writeUnder(root, 'scripts/prompts/react-engineer-repair.md', '# Repair brief\n\n{{FILES}}\n')
    await expect(loadRepairBriefTemplate({ root })).rejects.toThrow('{{ERRORS}}')
  })
})

describe('mergeEngineerPatch', () => {
  it('replaces the owned file at a path, keeps the rest, appends a new file', () => {
    const reply = [
      { path: 'app/components/Layout.tsx', content: 'patched\n' },
      { path: 'app/components/New.tsx', content: 'new\n' },
    ]
    const merged = mergeEngineerPatch(owned, reply)
    expect(merged.files).toEqual([
      { path: 'app/components/Layout.tsx', content: 'patched\n' },
      owned[1],
      owned[2],
      { path: 'app/components/New.tsx', content: 'new\n' },
    ])
    expect(merged.writes).toEqual(reply)
    expect(merged.deletes).toEqual([])
    expect(merged.ignoredDeletes).toEqual([])
  })

  it('an empty block deletes an owned file and is ignored for a path not owned', () => {
    const reply = [
      { path: 'app/components/Sidebar.tsx', content: '' },
      { path: 'app/components/Elsewhere.tsx', content: '' },
    ]
    const merged = mergeEngineerPatch(owned, reply)
    expect(merged.files.map((f) => f.path)).toEqual([
      'app/components/Layout.tsx',
      'app/routes/index.tsx',
    ])
    expect(merged.writes).toEqual([])
    expect(merged.deletes).toEqual(['app/components/Sidebar.tsx'])
    expect(merged.ignoredDeletes).toEqual(['app/components/Elsewhere.tsx'])
  })

  it('an empty reply changes nothing', () => {
    expect(mergeEngineerPatch(owned, []).files).toEqual(owned)
  })
})

describe('deleteFiles', () => {
  it('removes the files, skips one already gone, and refuses a path outside the allowlist', async () => {
    const root = await tempRepoRoot()
    writeUnder(root, 'app/components/generated/Ledger.tsx', 'x')
    writeUnder(root, 'app/content/projects.ts', 'hands off')
    writeUnder(root, 'app/components/SectionHead.tsx', 'hand-written')

    const removed = await deleteFiles(
      ['app/components/generated/Ledger.tsx', 'app/components/generated/Missing.tsx'],
      { root }
    )
    expect(removed).toEqual(['app/components/generated/Ledger.tsx'])
    expect(existsSync(path.join(root, 'app/components/generated/Ledger.tsx'))).toBe(false)

    await expect(deleteFiles(['app/content/projects.ts'], { root })).rejects.toThrow(
      'Forbidden directory write'
    )
    expect(readFileSync(path.join(root, 'app/content/projects.ts'), 'utf8')).toBe('hands off')
    // A hand-written component beside generated/ is off the allowlist (#448).
    await expect(deleteFiles(['app/components/SectionHead.tsx'], { root })).rejects.toThrow(
      /allowlist/
    )
    expect(existsSync(path.join(root, 'app/components/SectionHead.tsx'))).toBe(true)
  })
})
