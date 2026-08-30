import { describe, it, expect, vi } from 'vitest'
import { runStaticChecks, STATIC_CHECK_PATHS } from '../../scripts/utils/build-validator.js'

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
