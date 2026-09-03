/**
 * #432: a local run's rollback deleted app/components/Ledger.tsx — a tracked
 * file the engineer overwrote that was never on MUTABLE_FILES, so
 * originalBackup had no entry for it and cleanupOrphans treated it as a
 * brand-new orphan. writeFiles(..., { backup }) fixes this by capturing any
 * file it's about to overwrite at write time, so the swarm's originalBackup
 * map ends up correct even for paths outside the canonical snapshot.
 *
 * design-agents.js itself isn't touched here (out of scope for this change —
 * the lead wires `backup: originalBackup` into its writeFiles/writeEngineerFiles
 * call sites separately); this exercises the same sequence — an initial
 * backup() snapshot, a write to a path outside it, then restore() +
 * cleanupOrphans() on rollback — using the real file-manager functions
 * directly, the way the swarm uses them.
 */
import { describe, beforeEach, it, expect } from 'vitest'
import { readFile } from 'node:fs/promises'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { backup, writeFiles, restore, cleanupOrphans } from '../../scripts/utils/file-manager.js'
import { tempRepoRoot, writeUnder } from '../helpers/tmp.js'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

describe('swarm-shaped rollback: untracked file overwritten mid-run', () => {
  const canonical = 'app/components/ProjectRow.tsx' // stands in for a MUTABLE_FILES entry
  const untracked = 'app/components/Ledger.tsx' // tracked on disk, not on MUTABLE_FILES
  let root

  beforeEach(async () => {
    root = await tempRepoRoot('dm-swarm-backup-')
    writeUnder(root, canonical, 'canonical before')
    writeUnder(root, untracked, 'ledger before')
  })

  it('restores the untracked file instead of deleting it on rollback', async () => {
    // The run's snapshot only covers the canonical mutable list, same as
    // `backup(MUTABLE_FILES, { root })` in design-agents.js.
    const originalBackup = await backup([canonical], { root })
    expect(originalBackup.has(untracked)).toBe(false)

    // The engineer writes both the canonical file and the untracked one.
    const written = await writeFiles(
      [
        { path: canonical, content: 'canonical after' },
        { path: untracked, content: 'ledger clobbered' },
      ],
      { root, backup: originalBackup }
    )

    // Write-time capture means the map now knows about the untracked file.
    expect(originalBackup.get(untracked)).toBe('ledger before')

    // Rollback, same order as design-agents.js: cleanupOrphans then restore.
    await cleanupOrphans(written, originalBackup, { root })
    await restore(originalBackup, { root })

    expect(readFileSync(path.join(root, canonical), 'utf8')).toBe('canonical before')
    expect(readFileSync(path.join(root, untracked), 'utf8')).toBe('ledger before')
  })

  it('still cleans up a genuinely new path the engineer invented', async () => {
    const invented = 'app/components/BrandNew.tsx'
    const originalBackup = await backup([canonical], { root })

    const written = await writeFiles([{ path: invented, content: 'new' }], {
      root,
      backup: originalBackup,
    })

    expect(originalBackup.get(invented)).toBeNull()

    await cleanupOrphans(written, originalBackup, { root })
    await restore(originalBackup, { root })

    expect(existsSync(path.join(root, invented))).toBe(false)
  })
})

describe('app/content/projects.ts re-exports its content types (#432)', () => {
  it('re-exports Project and Client from ./types', async () => {
    const src = await readFile(path.join(REPO, 'app/content/projects.ts'), 'utf8')
    expect(src).toMatch(/export type \{[^}]*\bProject\b[^}]*\}\s*from\s*'\.\/types'/)
    expect(src).toMatch(/export type \{[^}]*\bClient\b[^}]*\}\s*from\s*'\.\/types'/)
  })

  it('does not silently drop the value exports the re-export sits alongside', async () => {
    const { projects, featuredProject, selectedWork, experiments } = await import(
      '../../app/content/projects.ts'
    )
    expect(projects).toBeDefined()
    expect(featuredProject).toBeDefined()
    expect(selectedWork).toBeDefined()
    expect(experiments).toBeDefined()
  })
})
