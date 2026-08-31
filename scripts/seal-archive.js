#!/usr/bin/env node
/**
 * Seal every archived page: rewrite escaping links, inject the frame.
 *
 * One traversal of public/archive/**\/*.html applying scripts/utils/archive-seal.js.
 * Idempotent — re-running rewrites nothing, which is what makes it safe to run
 * from the nightly pipeline and from CI.
 *
 *   node scripts/seal-archive.js            seal in place
 *   node scripts/seal-archive.js --check    exit 1 if anything would change
 *   node scripts/seal-archive.js --date=... seal one day
 */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { sealPage } from './utils/archive-seal.js'
import { isMain } from './utils/cli.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ARCHIVE_ROOT = path.join(ROOT, 'public', 'archive')

const DATE_DIR = /^\d{4}-\d{2}-\d{2}$/

async function walkHtml(dir, base = '') {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      out.push(...(await walkHtml(path.join(dir, entry.name), rel)))
    } else if (entry.name.endsWith('.html')) {
      out.push(rel)
    }
  }
  return out
}

/** @returns {Promise<Map<string, string[]>>} date → page paths within that snapshot */
export async function listSnapshots(archiveRoot = ARCHIVE_ROOT) {
  const snapshots = new Map()
  let entries
  try {
    entries = await readdir(archiveRoot, { withFileTypes: true })
  } catch {
    return snapshots
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || !DATE_DIR.test(entry.name)) continue
    const pages = await walkHtml(path.join(archiveRoot, entry.name))
    if (pages.length) snapshots.set(entry.name, pages.sort())
  }
  return new Map([...snapshots].sort(([a], [b]) => a.localeCompare(b)))
}

export async function sealArchive({ archiveRoot = ARCHIVE_ROOT, check = false, only = null } = {}) {
  const snapshots = await listSnapshots(archiveRoot)
  const dates = [...snapshots.keys()]

  const changed = []
  let scanned = 0

  for (const [i, date] of dates.entries()) {
    if (only && date !== only) continue
    const prev = i > 0 ? dates[i - 1] : null
    const next = i < dates.length - 1 ? dates[i + 1] : null

    for (const relPath of snapshots.get(date)) {
      const file = path.join(archiveRoot, date, relPath)
      const before = await readFile(file, 'utf8')
      const after = sealPage(before, { date, relPath, prev, next })
      scanned += 1
      if (after === before) continue
      changed.push(path.relative(ROOT, file))
      if (!check) await writeFile(file, after, 'utf8')
    }
  }

  return { dates: dates.length, scanned, changed }
}

if (isMain(import.meta.url)) {
  const check = process.argv.includes('--check')
  const dateArg = process.argv.find((a) => a.startsWith('--date='))
  const only = dateArg ? dateArg.slice('--date='.length) : null

  const { dates, scanned, changed } = await sealArchive({ check, only })

  if (check) {
    if (changed.length) {
      console.error(`unsealed: ${changed.length} of ${scanned} pages across ${dates} dates`)
      for (const f of changed.slice(0, 20)) console.error(`  ${f}`)
      if (changed.length > 20) console.error(`  ... and ${changed.length - 20} more`)
      process.exit(1)
    }
    console.log(`sealed: ${scanned} pages across ${dates} dates, nothing to change`)
  } else {
    console.log(`sealed ${changed.length} of ${scanned} pages across ${dates} dates`)
  }
}
