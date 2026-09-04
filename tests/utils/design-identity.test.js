import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  compositionLabel,
  findEvidenceDate,
  findShippedBuildDir,
  readDesignIdentity,
} from '../../scripts/utils/design-identity.js'

let root
beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'design-identity-'))
})
afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

const artDirectorTrace = (overrides = {}) => ({
  steps: [
    { name: 'signals-loaded', output: {} },
    {
      name: 'art-director',
      output: {
        hero_copy: 'Select a busy man.',
        chassisId: 'unbounded-figtree',
        composition: { columns: 'two-asymmetric', axis: 'horizontal' },
        ...overrides,
      },
    },
  ],
})

describe('readDesignIdentity', () => {
  it('reads hero copy, chassis and composition off the art-director step', () => {
    mkdirSync(root, { recursive: true })
    writeFileSync(path.join(root, 'trace.json'), JSON.stringify(artDirectorTrace()))
    expect(readDesignIdentity(root)).toEqual({
      heroCopy: 'Select a busy man.',
      chassisId: 'unbounded-figtree',
      composition: { columns: 'two-asymmetric', axis: 'horizontal' },
    })
  })

  it('returns all-null when trace.json is missing', () => {
    expect(readDesignIdentity(root)).toEqual({
      heroCopy: null,
      chassisId: null,
      composition: null,
    })
  })

  it('returns all-null when trace.json is corrupt', () => {
    writeFileSync(path.join(root, 'trace.json'), '{not json')
    expect(readDesignIdentity(root)).toEqual({
      heroCopy: null,
      chassisId: null,
      composition: null,
    })
  })

  it('returns all-null when the trace never reached art-director', () => {
    writeFileSync(
      path.join(root, 'trace.json'),
      JSON.stringify({ steps: [{ name: 'signals-loaded', output: {} }] })
    )
    expect(readDesignIdentity(root)).toEqual({
      heroCopy: null,
      chassisId: null,
      composition: null,
    })
  })
})

describe('compositionLabel', () => {
  it('is the columns axis', () => {
    expect(compositionLabel({ columns: 'two-asymmetric', axis: 'horizontal' })).toBe(
      'two-asymmetric'
    )
  })

  it('is null when composition is null or has no columns axis', () => {
    expect(compositionLabel(null)).toBeNull()
    expect(compositionLabel({ axis: 'horizontal' })).toBeNull()
  })
})

describe('findShippedBuildDir', () => {
  it('finds the build-<id> directory under archive/<date>/', () => {
    const buildDir = path.join(root, 'archive', '2026-09-04', 'build-123')
    mkdirSync(buildDir, { recursive: true })
    expect(findShippedBuildDir(root)).toBe(buildDir)
  })

  it('ignores build-failed-* and build-pre-* directories', () => {
    mkdirSync(path.join(root, 'archive', '2026-09-04', 'build-failed-123'), { recursive: true })
    mkdirSync(path.join(root, 'archive', '2026-09-04', 'build-pre-123'), { recursive: true })
    expect(findShippedBuildDir(root)).toBeNull()
  })

  it('returns null when there is no archive dir at all', () => {
    expect(findShippedBuildDir(root)).toBeNull()
  })
})

describe('findEvidenceDate', () => {
  it('reads the YYYY-MM-DD directory name under archive/', () => {
    mkdirSync(path.join(root, 'archive', '2026-09-04'), { recursive: true })
    expect(findEvidenceDate(root)).toBe('2026-09-04')
  })

  it('returns null when there is no archive dir', () => {
    expect(findEvidenceDate(root)).toBeNull()
  })
})
