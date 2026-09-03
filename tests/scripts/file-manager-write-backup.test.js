import { describe, beforeEach, it, expect } from 'vitest'
import { writeFiles, restore, cleanupOrphans } from '../../scripts/utils/file-manager.js'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { tempRepoRoot, writeUnder } from '../helpers/tmp.js'

// #432: writeFiles(..., { backup }) captures the pre-write state of any file
// it's about to overwrite, at write time, if that file isn't already in the
// map. This is what makes restore() and cleanupOrphans() correct for a path
// the engineer writes outside the caller's original MUTABLE_FILES snapshot —
// without it, a tracked-but-unlisted file the engineer overwrites looks like
// a brand-new orphan and gets deleted on rollback instead of restored.
describe('writeFiles({ backup }) captures pre-write state', () => {
  const unlisted = 'app/components/generated/Unlisted.tsx'
  const fresh = 'app/components/generated/BrandNew.tsx'
  let root

  beforeEach(async () => {
    root = await tempRepoRoot('dm-write-backup-')
    writeUnder(root, unlisted, 'original content')
  })

  it('captures an existing unlisted file into the map on first write', async () => {
    const map = new Map()

    await writeFiles([{ path: unlisted, content: 'overwritten once' }], { root, backup: map })

    expect(map.get(unlisted)).toBe('original content')
    expect(readFileSync(path.join(root, unlisted), 'utf8')).toBe('overwritten once')
  })

  it('does not clobber the captured entry on a second write to the same path', async () => {
    const map = new Map()

    await writeFiles([{ path: unlisted, content: 'overwritten once' }], { root, backup: map })
    await writeFiles([{ path: unlisted, content: 'overwritten twice' }], { root, backup: map })

    expect(map.get(unlisted)).toBe('original content')
    expect(readFileSync(path.join(root, unlisted), 'utf8')).toBe('overwritten twice')
  })

  it('records null for a file that did not exist before the write', async () => {
    const map = new Map()

    await writeFiles([{ path: fresh, content: 'new file' }], { root, backup: map })

    expect(map.get(fresh)).toBeNull()
    expect(readFileSync(path.join(root, fresh), 'utf8')).toBe('new file')
  })

  it('leaves the map untouched when no backup option is passed', async () => {
    await writeFiles([{ path: unlisted, content: 'overwritten' }], { root })

    expect(readFileSync(path.join(root, unlisted), 'utf8')).toBe('overwritten')
  })

  it('restore then cleanupOrphans correctly reverses both writes', async () => {
    const map = new Map()

    await writeFiles(
      [
        { path: unlisted, content: 'overwritten' },
        { path: fresh, content: 'new file' },
      ],
      { root, backup: map }
    )
    const written = new Set([unlisted, fresh])

    await restore(map, { root })
    await cleanupOrphans(written, map, { root })

    expect(readFileSync(path.join(root, unlisted), 'utf8')).toBe('original content')
    expect(existsSync(path.join(root, fresh))).toBe(false)
  })
})
