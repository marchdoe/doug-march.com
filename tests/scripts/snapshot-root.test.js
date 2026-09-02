/**
 * captureSnapshot(date, buildId, { root }) must write under the caller's
 * root, not the module's own ROOT (#314). Before the fix it always wrote to
 * `archive/<date>/build-<id>/site/`, so a caller passing a temp root (a test,
 * or a future dry-run) still landed pages inside the working tree.
 *
 * vite and playwright are never exercised here — `child_process.spawn` and
 * `fetch` are stubbed so this is a fast, deterministic test of the write
 * path, not of the crawl.
 */
import { EventEmitter } from 'node:events'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { tempRepoRoot } from '../helpers/tmp.js'

vi.mock('node:child_process', () => ({
  spawn: vi.fn(() => {
    const child = new EventEmitter()
    child.pid = 999999
    child.stderr = new EventEmitter()
    child.kill = vi.fn()
    return child
  }),
}))

const { captureSnapshot } = await import('../../scripts/utils/snapshot.js')

describe('captureSnapshot({ root })', () => {
  let root
  let originalFetch

  beforeEach(async () => {
    root = await tempRepoRoot('dm-snapshot-root-')
    originalFetch = global.fetch
    global.fetch = vi.fn(async (url) => ({
      ok: true,
      text: async () => `<html><body>fake ${url}</body></html>`,
    }))
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('writes the build-specific snapshot under the given root', async () => {
    const date = '2099-02-01'
    const buildId = '123'
    await captureSnapshot(date, buildId, { root })

    const buildSiteDir = path.join(root, 'archive', date, `build-${buildId}`, 'site')
    const files = await readdir(buildSiteDir)
    expect(files).toContain('index.html')
    expect(files).toContain('about.html')

    const indexHtml = await readFile(path.join(buildSiteDir, 'index.html'), 'utf8')
    expect(indexHtml).toContain('fake')
  })

  it('also writes the top-level "latest" copy under the given root', async () => {
    const date = '2099-02-02'
    const buildId = '124'
    await captureSnapshot(date, buildId, { root })

    const latestSiteDir = path.join(root, 'archive', date, 'site')
    const files = await readdir(latestSiteDir)
    expect(files).toContain('index.html')
  })
})
