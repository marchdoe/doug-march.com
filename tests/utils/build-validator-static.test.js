import { readFileSync } from 'node:fs'
import { describe, it, expect, vi } from 'vitest'
import {
  runStaticChecks,
  STATIC_CHECK_PATHS,
  formatGeneratedFile,
} from '../../scripts/utils/build-validator.js'

/** A spawnSync stand-in keyed on the tool being invoked. */
function fakeSpawn({ biome = {}, tsc = {} } = {}) {
  const calls = []
  const spawn = vi.fn((cmd, args) => {
    calls.push([cmd, ...args])
    const tool = args[1]
    const r = tool === 'biome' ? biome : tsc
    return { status: r.status ?? 0, stdout: r.stdout ?? '', stderr: r.stderr ?? '' }
  })
  return { spawn, calls }
}

describe('runStaticChecks', () => {
  it('passes when both tools are clean', () => {
    const { spawn } = fakeSpawn()
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result).toEqual({ success: true })
  })

  it('auto-fixes formatting and reports what it fixed', () => {
    const { spawn } = fakeSpawn({ biome: { stdout: 'Checked 40 files in 9ms. Fixed 8 files.' } })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.success).toBe(true)
    expect(result.fixed).toBe('Fixed 8 files')
  })

  it('runs biome with --write over the paths the nightly stages', () => {
    const { spawn, calls } = fakeSpawn()
    runStaticChecks({ spawn, root: '/repo' })
    const biomeCall = calls.find((c) => c.includes('biome'))
    expect(biomeCall).toContain('--write')
    for (const p of STATIC_CHECK_PATHS) expect(biomeCall).toContain(p)
    expect(STATIC_CHECK_PATHS).toEqual(['app/components', 'app/routes'])
  })

  it('fails on lint errors that survive the auto-fix, with the output attached', () => {
    const { spawn } = fakeSpawn({
      biome: {
        status: 1,
        stdout: 'app/routes/__root.tsx:120:9 lint/a11y/useAnchorContent\n  ✖ Found 1 error.',
      },
    })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.success).toBe(false)
    expect(result.error).toContain('biome')
    expect(result.error).toContain('app/routes/__root.tsx')
  })

  it('fails on type errors, with the file path the retry routing needs', () => {
    const { spawn } = fakeSpawn({
      tsc: {
        status: 2,
        stdout:
          "app/routes/__root.tsx(4,10): error TS6133: 'styled' is declared but its value is never read.",
      },
    })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.success).toBe(false)
    expect(result.error).toContain('tsc --noEmit')
    // identifyFailingAgent matches FILE_OWNERSHIP paths by substring, so the
    // path must survive into the error string verbatim.
    expect(result.error).toContain('app/routes/__root.tsx')
  })

  it('runs both tools even when the first fails, so one retry sees everything', () => {
    const { spawn, calls } = fakeSpawn({
      biome: { status: 1, stdout: 'lint error' },
      tsc: { status: 2, stdout: 'type error' },
    })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(calls.some((c) => c.includes('biome'))).toBe(true)
    expect(calls.some((c) => c.includes('tsc'))).toBe(true)
    expect(result.error).toContain('lint error')
    expect(result.error).toContain('type error')
  })

  it('tells the engineer formatting is already handled', () => {
    const { spawn } = fakeSpawn({
      biome: { stdout: 'Fixed 3 files.' },
      tsc: { status: 2, stdout: 'app/components/Layout.tsx(1,1): error' },
    })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.fixed).toBe('Fixed 3 files')
    expect(result.error).toContain('formatting has already been corrected')
  })

  it('caps each tool output so a runaway log cannot swamp the retry prompt', () => {
    const { spawn } = fakeSpawn({ tsc: { status: 2, stdout: 'x'.repeat(10000) } })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.error.length).toBeLessThan(3500)
  })
})

describe('formatGeneratedFile', () => {
  /** A spawnSync stand-in that records the call and returns a fixed result. */
  function fakeSpawn({ status = 0, stdout = '', stderr = '' } = {}) {
    const calls = []
    const spawn = vi.fn((cmd, args) => {
      calls.push([cmd, ...args])
      return { status, stdout, stderr }
    })
    return { spawn, calls }
  }

  it('runs biome format --write on the given path', () => {
    const { spawn, calls } = fakeSpawn()
    formatGeneratedFile('app/routes/__root.tsx', { spawn, root: '/repo' })
    expect(calls).toEqual([['pnpm', 'exec', 'biome', 'format', '--write', 'app/routes/__root.tsx']])
  })

  it('returns success on a clean exit', () => {
    const { spawn } = fakeSpawn()
    const result = formatGeneratedFile('app/routes/__root.tsx', { spawn, root: '/repo' })
    expect(result).toEqual({ success: true, output: '' })
  })

  it('returns success: false without throwing on a non-zero exit', () => {
    const { spawn } = fakeSpawn({ status: 1, stderr: 'biome: could not parse file' })
    expect(() =>
      formatGeneratedFile('app/components/BrandLockup.tsx', { spawn, root: '/repo' })
    ).not.toThrow()
    const result = formatGeneratedFile('app/components/BrandLockup.tsx', { spawn, root: '/repo' })
    expect(result.success).toBe(false)
    expect(result.output).toContain('could not parse file')
  })
})

describe("the build log lands under the run's own Eastern date", () => {
  // #311: two build-log writes derived the date from `new Date().toISOString()`
  // (UTC) while every other path in the run, including the archive directory
  // the log is written beside, keys the day on America/New_York. Between
  // 20:00 and 23:59 Eastern the two disagree, so the log landed in tomorrow's
  // archive dir while the rest of the run wrote to today's.
  const SOURCE = readFileSync(
    new URL('../../scripts/utils/build-validator.js', import.meta.url),
    'utf8'
  )

  it('never derives the build-log date from toISOString()', () => {
    expect(SOURCE).not.toMatch(/toISOString\(\)\.slice\(0, 10\)/)
  })

  it('validateBuild accepts a date and defaults it from localDateString', () => {
    expect(SOURCE).toMatch(
      /export function validateBuild\(\{\s*root = ROOT,\s*shell = null,\s*date = localDateString\(new Date\(\)\),\s*\} = \{\}\)/
    )
  })
})
