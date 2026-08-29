/**
 * sealArchive() over a temp tree — the traversal, not the rewrite.
 *
 * The rewrite rules are covered in tests/utils/archive-seal.test.js and the
 * committed corpus is covered in archive-seal-corpus.test.js. What is left, and
 * what only a real directory can show, is which files get visited, how prev/next
 * are wired across the run, and whether a second pass is genuinely a no-op.
 */

import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { listSnapshots, sealArchive } from '../../scripts/seal-archive.js'

const PAGE = (body = '') =>
  `<!DOCTYPE html><html><head><style>body{color:#111}</style></head><body>${body}</body></html>`

let root

async function write(rel, html) {
  const file = path.join(root, rel)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
}

const read = (rel) => readFile(path.join(root, rel), 'utf8')

beforeEach(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'seal-archive-'))
})

afterEach(async () => {
  await rm(root, { recursive: true, force: true })
})

describe('listSnapshots', () => {
  it('finds every page in a snapshot, including work/', async () => {
    await write('2026-05-01/index.html', PAGE())
    await write('2026-05-01/about.html', PAGE())
    await write('2026-05-01/work/spaceman.html', PAGE())

    const snapshots = await listSnapshots(root)
    expect(snapshots.get('2026-05-01')).toEqual(['about.html', 'index.html', 'work/spaceman.html'])
  })

  it('walks a nested date directory rather than skipping it', async () => {
    // Until 2026-08-29 this asserted the opposite: listSnapshots carried a
    // hardcoded exclusion for `2026-04-14/archive`, the copy of the archive
    // index that day captured of itself. That directory has been deleted (167
    // duplicates removed, 15 crawl artifacts moved to
    // archive/2026-04-14/crawl-artifacts/), so the exclusion went with it.
    // Nothing in public/archive/ nests a date under a date any more, and if
    // something ever does again it should be sealed, not silently skipped.
    await write('2026-04-14/index.html', PAGE())
    await write('2026-04-14/archive/2026-03-31/index.html', PAGE())

    const snapshots = await listSnapshots(root)
    expect(snapshots.get('2026-04-14')).toEqual(['archive/2026-03-31/index.html', 'index.html'])
  })

  it('ignores directories that are not dates', async () => {
    await write('2026-05-01/index.html', PAGE())
    await write('_data/index.html', PAGE())

    expect([...(await listSnapshots(root)).keys()]).toEqual(['2026-05-01'])
  })

  it('returns dates in order, so prev/next can be read off the list', async () => {
    for (const d of ['2026-05-10', '2026-05-01', '2026-05-05'])
      await write(`${d}/index.html`, PAGE())
    expect([...(await listSnapshots(root)).keys()]).toEqual([
      '2026-05-01',
      '2026-05-05',
      '2026-05-10',
    ])
  })
})

describe('sealArchive', () => {
  beforeEach(async () => {
    for (const d of ['2026-05-01', '2026-05-05', '2026-05-10']) {
      await write(`${d}/index.html`, PAGE('<a href="/about">About</a>'))
      await write(`${d}/work/spaceman.html`, PAGE('<a href="/#work">Work</a>'))
    }
  })

  it('seals every page it finds', async () => {
    const { dates, scanned, changed } = await sealArchive({ archiveRoot: root })
    expect(dates).toBe(3)
    expect(scanned).toBe(6)
    expect(changed).toHaveLength(6)
  })

  it('wires prev and next across the run, skipping the gaps between builds', async () => {
    await sealArchive({ archiveRoot: root })
    const middle = await read('2026-05-05/index.html')
    expect(middle).toContain('href="/archive/2026-05-01/"')
    expect(middle).toContain('href="/archive/2026-05-10/"')
  })

  it('goes dead at the ends rather than pointing at a day that does not exist', async () => {
    await sealArchive({ archiveRoot: root })
    const first = await read('2026-05-01/index.html')
    const last = await read('2026-05-10/index.html')
    expect(first).not.toContain('Previous build')
    expect(first).toContain('href="/archive/2026-05-05/"')
    expect(last).not.toContain('Next build')
    expect(last).toContain('href="/archive/2026-05-05/"')
  })

  it('resolves relative to the page, so work/ climbs out', async () => {
    await sealArchive({ archiveRoot: root })
    expect(await read('2026-05-05/work/spaceman.html')).toContain('href="../index.html#work"')
    expect(await read('2026-05-05/index.html')).toContain('href="about.html"')
  })

  it('is idempotent — a second pass changes nothing', async () => {
    await sealArchive({ archiveRoot: root })
    const after = await sealArchive({ archiveRoot: root })
    expect(after.changed).toEqual([])
    expect(after.scanned).toBe(6)
  })

  it('reports without writing under --check', async () => {
    const before = await read('2026-05-05/index.html')
    const { changed } = await sealArchive({ archiveRoot: root, check: true })
    expect(changed).toHaveLength(6)
    expect(await read('2026-05-05/index.html')).toBe(before)
  })

  it('seals one day when asked, leaving the rest alone', async () => {
    const untouched = await read('2026-05-10/index.html')
    const { changed } = await sealArchive({ archiveRoot: root, only: '2026-05-05' })
    expect(changed).toHaveLength(2)
    expect(await read('2026-05-05/index.html')).toContain('data-archive-frame')
    expect(await read('2026-05-10/index.html')).toBe(untouched)
  })

  it('gives a new day a prev arrow and hands the old last day a next one', async () => {
    await sealArchive({ archiveRoot: root })
    expect(await read('2026-05-10/index.html')).not.toContain('Next build')

    // A build lands. Resealing is what turns yesterday's dead arrow live.
    await write('2026-05-12/index.html', PAGE('<a href="/about">About</a>'))
    await sealArchive({ archiveRoot: root })

    expect(await read('2026-05-10/index.html')).toContain('href="/archive/2026-05-12/"')
    expect(await read('2026-05-12/index.html')).toContain('href="/archive/2026-05-10/"')
  })

  it('does not fall over on an archive that does not exist yet', async () => {
    const { dates, scanned } = await sealArchive({ archiveRoot: path.join(root, 'nope') })
    expect(dates).toBe(0)
    expect(scanned).toBe(0)
  })
})
