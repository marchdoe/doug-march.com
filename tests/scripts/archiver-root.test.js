/**
 * archive({ root }) must thread that root into captureSnapshot and
 * sealArchive, not only into its own writes (#314).
 *
 * Before the fix, captureSnapshot(dateStr, buildId) ran with no root and
 * fell back to the module's own ROOT, and sealArchive() ran with no
 * archiveRoot and defaulted to `<repo>/public/archive` — so a caller that
 * passed a temp root (a test, or a future dry run) still had its snapshot
 * and seal steps reach into the real working tree.
 */
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tempRepoRoot } from '../helpers/tmp.js'

const captureSnapshotMock = vi.fn().mockResolvedValue(undefined)
vi.mock('../../scripts/utils/snapshot.js', () => ({
  captureSnapshot: (...args) => captureSnapshotMock(...args),
}))

const sealArchiveMock = vi.fn().mockResolvedValue({ dates: 0, scanned: 0, changed: [] })
vi.mock('../../scripts/seal-archive.js', () => ({
  sealArchive: (...args) => sealArchiveMock(...args),
}))

const { archive } = await import('../../scripts/utils/archiver.js')

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const REPO_PUBLIC_ARCHIVE = path.join(REPO_ROOT, 'public', 'archive')

/** relative path -> mtimeMs, for every file under the repo's real public/archive/. */
function fingerprintRepoArchive() {
  const out = new Map()
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else out.set(path.relative(REPO_PUBLIC_ARCHIVE, full), statSync(full).mtimeMs)
    }
  }
  walk(REPO_PUBLIC_ARCHIVE)
  return out
}

describe('archive({ root }) — threading into captureSnapshot and sealArchive', () => {
  let root

  beforeEach(async () => {
    root = await tempRepoRoot('dm-archiver-root-')
    captureSnapshotMock.mockClear()
    sealArchiveMock.mockClear()
  })

  it('passes the same root to captureSnapshot', async () => {
    const date = '2099-04-01'
    await archive(date, { date }, 'r', 'b', [], {}, null, null, {}, { root: root })

    expect(captureSnapshotMock).toHaveBeenCalledTimes(1)
    const [calledDate, , options] = captureSnapshotMock.mock.calls[0]
    expect(calledDate).toBe(date)
    expect(options).toEqual({ root: root })
  })

  it('derives archiveRoot from the same root for sealArchive', async () => {
    const date = '2099-04-02'
    await archive(date, { date }, 'r', 'b', [], {}, null, null, {}, { root: root })

    expect(sealArchiveMock).toHaveBeenCalledTimes(1)
    expect(sealArchiveMock).toHaveBeenCalledWith({
      archiveRoot: path.join(root, 'public', 'archive'),
    })
  })

  it("does not touch the repo checkout's real public/archive/", async () => {
    const before = fingerprintRepoArchive()
    const date = '2099-04-03'
    await archive(date, { date }, 'r', 'b', [], {}, null, null, {}, { root: root })
    const after = fingerprintRepoArchive()
    expect(after).toEqual(before)
  })
})
