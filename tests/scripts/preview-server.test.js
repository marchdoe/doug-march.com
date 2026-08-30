/**
 * The visual gates depend on knowing when `vite preview` is ready.
 *
 * On 2026-08-30 the run shipped a design that no critic looked at. Three
 * launchers, two readiness strategies, same machine, same seconds:
 *
 *   captureSnapshot        polled HTTP        -> 9 pages saved
 *   captureScreenshot      scraped stdout     -> Preview server timeout
 *   captureRouteScreenshot scraped stdout     -> Preview server timeout
 *
 * Vite prints no `Local:` banner when stdout is not a TTY, so in CI the string
 * never arrives. All three failures are non-blocking, so the run reported
 * success with no screenshot critic, no OG card and no responsive metrics.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const src = readFileSync(path.join(ROOT, 'scripts/utils/snapshot.js'), 'utf8')

/** Source with comments stripped — a rule a comment can satisfy is not a rule. */
const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

describe('preview server readiness', () => {
  it('never decides readiness by reading stdout', () => {
    expect(code).not.toContain("includes('Local:')")
    expect(code).not.toMatch(/Preview server timeout/)
  })

  it('asks the server over HTTP instead', () => {
    expect(code).toMatch(/await fetch\(`\$\{baseUrl\}\/`\)/)
  })

  it('starts the server in exactly one place', () => {
    // Three copies is how the two strategies drifted apart in the first place.
    const spawns = code.match(/spawn\(/g) ?? []
    expect(spawns).toHaveLength(1)
  })

  it('spawns the vite binary rather than npx', () => {
    // child.kill() on npx kills the wrapper and leaves vite running; a run
    // that captures snapshot + screenshot + OG could leave servers behind.
    expect(code).not.toMatch(/spawn\(\s*'npx'/)
    expect(code).toMatch(/node_modules['"],\s*['"]\.bin['"],\s*['"]vite/)
  })

  it('kills the process group, not just the direct child', () => {
    expect(code).toMatch(/process\.kill\(-server\.pid/)
    expect(code).toContain('detached: true')
  })

  it('fails fast when the server exits instead of waiting out the timeout', () => {
    // A port collision or a missing dist/ should say so, not burn 30 seconds.
    expect(code).toMatch(/exited with code/)
  })

  it('exports the helper so all three callers share it', () => {
    expect(code).toMatch(/export async function withPreviewServer/)
  })
})
