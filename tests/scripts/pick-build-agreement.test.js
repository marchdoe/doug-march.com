/**
 * Every reader of "which build shipped" has to agree with `pickBuild`.
 *
 * #317: `pickBuild` in archive-record.js is the one correct rule. Three other
 * copies existed at various points and took the newest build dir instead —
 * the root cause of #308. This builds one date with the shape that exposes
 * that bug (an earlier draft, the build that actually shipped, and a failed
 * and a pre-snapshot dir that must be ignored outright) and checks that
 * `pickBuild`, `readRecentBuilds`, `readUniquenessHistory`, and
 * `shippedBuildDir` all land on the same build.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { pickBuild } from '../../scripts/utils/archive-record.js'
import { readRecentBuilds } from '../../scripts/utils/recent-builds.js'
import { readUniquenessHistory } from '../../scripts/utils/read-uniqueness-history.js'
import { shippedBuildDir } from '../../scripts/build-fixtures-from-archive.js'

const DATE = '2026-08-30'
const SHIPPED_BRIEF = 'the design that went live'

let root
let archiveDir
let dateDir

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'pick-build-agreement-'))
  archiveDir = path.join(root, 'archive')
  dateDir = path.join(archiveDir, DATE)

  const writeBuild = (name, brief, files = {}) => {
    const dir = path.join(dateDir, name)
    mkdirSync(dir, { recursive: true })
    writeFileSync(path.join(dir, 'brief.md'), brief, 'utf8')
    for (const [file, content] of Object.entries(files)) {
      writeFileSync(path.join(dir, file), content, 'utf8')
    }
  }

  mkdirSync(dateDir, { recursive: true })
  writeFileSync(path.join(dateDir, 'brief.md'), SHIPPED_BRIEF, 'utf8')

  writeBuild('build-1', 'an earlier draft that never shipped')
  writeBuild('build-2', SHIPPED_BRIEF, { 'lane.json': JSON.stringify({ laneId: 'the-one' }) })
  writeBuild('build-failed-3', SHIPPED_BRIEF, { 'lane.json': JSON.stringify({ laneId: 'failed' }) })
  writeBuild('build-pre-4', SHIPPED_BRIEF, { 'lane.json': JSON.stringify({ laneId: 'pre' }) })
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

describe('the shipped build, agreed on by every reader', () => {
  it('pickBuild names build-2, ignoring the failed and pre-snapshot dirs', () => {
    const picked = pickBuild(dateDir)
    expect(picked.buildId).toBe('2')
    expect(picked.buildDir).toBe(path.join(dateDir, 'build-2'))
  })

  it('readRecentBuilds agrees', () => {
    const [build] = readRecentBuilds(archiveDir, { lookbackDays: 5 })
    expect(build.buildDir).toBe(path.join(dateDir, 'build-2'))
  })

  it('readUniquenessHistory agrees', async () => {
    const [entry] = await readUniquenessHistory({ root })
    expect(entry.lane).toBe('the-one')
  })

  it('shippedBuildDir agrees', () => {
    expect(shippedBuildDir(DATE, { archiveDir })).toBe(path.join(dateDir, 'build-2'))
  })
})
