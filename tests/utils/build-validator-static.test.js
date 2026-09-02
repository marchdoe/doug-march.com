import { readFileSync } from 'node:fs'
import { describe, it, expect, vi } from 'vitest'
import {
  runStaticChecks,
  STATIC_CHECK_PATHS,
  formatGeneratedFile,
  summarizeFallowAudit,
} from '../../scripts/utils/build-validator.js'

/** What a clean `fallow audit --format json` prints, reduced to what is read. */
const FALLOW_PASS = JSON.stringify({ verdict: 'pass', complexity: { findings: [] }, dead_code: {} })

/** A spawnSync stand-in keyed on the tool being invoked. */
function fakeSpawn({ biome = {}, tsc = {}, fallow = { stdout: FALLOW_PASS } } = {}) {
  const calls = []
  const spawn = vi.fn((cmd, args) => {
    calls.push([cmd, ...args])
    const tool = args[1]
    const r = tool === 'biome' ? biome : tool === 'tsc' ? tsc : fallow
    return { status: r.status ?? 0, stdout: r.stdout ?? '', stderr: r.stderr ?? '' }
  })
  return { spawn, calls }
}

// The 2026-09-02 nightly's finding, as the audit reported it, beside an
// inherited one from the same file and an unused export the engineer added.
const FALLOW_FAIL = JSON.stringify({
  verdict: 'fail',
  attribution: { gate: 'new-only', complexity_introduced: 1, dead_code_introduced: 1 },
  complexity: {
    findings: [
      {
        path: 'app/routes/work.$slug.tsx',
        name: 'WorkDetailPage',
        line: 8,
        cyclomatic: 18,
        cognitive: 12,
        line_count: 321,
        crap: 342,
        exceeded: 'crap',
        introduced: true,
      },
      {
        path: 'app/components/BrandLockup.tsx',
        name: 'Mark',
        line: 166,
        cyclomatic: 9,
        cognitive: 15,
        line_count: 40,
        crap: 90,
        exceeded: 'crap',
        introduced: false,
      },
    ],
  },
  dead_code: {
    unused_exports: [
      { path: 'app/components/Hero.tsx', export_name: 'HeroProps', line: 3, introduced: true },
      {
        path: 'app/components/BrandLockup.tsx',
        export_name: 'BrandLockupMode',
        line: 43,
        introduced: false,
      },
    ],
  },
})

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

  it('runs the architecture audit against HEAD, as JSON', () => {
    const { spawn, calls } = fakeSpawn()
    runStaticChecks({ spawn, root: '/repo' })
    const fallowCall = calls.find((c) => c.includes('fallow'))
    expect(fallowCall).toEqual([
      'pnpm',
      'exec',
      'fallow',
      'audit',
      '--base',
      'HEAD',
      '--format',
      'json',
    ])
  })

  it('fails on an introduced audit finding, naming the function and its file', () => {
    const { spawn } = fakeSpawn({ fallow: { status: 1, stdout: FALLOW_FAIL } })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.success).toBe(false)
    expect(result.error).toContain('app/routes/work.$slug.tsx:8 WorkDetailPage')
    expect(result.error).toContain('321 lines')
    expect(result.error).toContain('app/components/Hero.tsx:3 export HeroProps')
  })

  it('leaves inherited findings out of what the engineer is told', () => {
    const { spawn } = fakeSpawn({ fallow: { status: 1, stdout: FALLOW_FAIL } })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.error).not.toContain('Mark')
    expect(result.error).not.toContain('BrandLockupMode')
  })

  it('does not gate on audit output it cannot read', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { spawn } = fakeSpawn({ fallow: { status: 1, stdout: 'fallow: panicked' } })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result).toEqual({ success: true })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('could not be read'))
    warn.mockRestore()
  })

  it('caps each tool output so a runaway log cannot swamp the retry prompt', () => {
    const { spawn } = fakeSpawn({ tsc: { status: 2, stdout: 'x'.repeat(10000) } })
    const result = runStaticChecks({ spawn, root: '/repo' })
    expect(result.error.length).toBeLessThan(3500)
  })
})

describe('summarizeFallowAudit', () => {
  it('skips whatever pnpm prints before the JSON', () => {
    expect(summarizeFallowAudit(`✓ Lockfile passes supply-chain policies\n${FALLOW_PASS}`)).toEqual(
      {}
    )
  })

  it('is silent on a passing verdict', () => {
    expect(summarizeFallowAudit(FALLOW_PASS)).toEqual({})
  })

  it('still says something when a failing verdict has no introduced finding it can name', () => {
    const report = JSON.stringify({ verdict: 'fail', attribution: { duplication_introduced: 1 } })
    expect(summarizeFallowAudit(report).error).toContain('duplication_introduced')
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
