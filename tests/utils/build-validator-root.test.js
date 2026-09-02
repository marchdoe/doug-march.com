import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { validateBuildOutput } from '../../scripts/utils/build-validator.js'
import { ROOT } from '../../scripts/utils/file-manager.js'

/**
 * `validateBuildOutput` used to hardcode `resolve(ROOT, 'dist/client')` and
 * pass `root: ROOT` straight into `checkTokenResolution`, ignoring any root a
 * caller injected (#312). A test could not point either check at a temp tree
 * — they always read the real repo's `dist/client`, which does not exist in
 * this checkout, so the token-resolution check silently no-opped instead of
 * reporting anything.
 *
 * This seeds a complete fake build — a healthy shell, JS and CSS bundles, and
 * a component tree reachable from `app/routes` — in a temp directory, with a
 * bogus `width: '11'` in the one MUTABLE file it reaches. If `root` is
 * actually threaded through, the check reads that temp tree and reports it.
 */
function seedBuild() {
  const root = mkdtempSync(path.join(tmpdir(), 'build-validator-root-'))
  const distClient = path.join(root, 'dist', 'client')
  const assets = path.join(distClient, 'assets')
  mkdirSync(assets, { recursive: true })
  mkdirSync(path.join(root, 'app', 'routes'), { recursive: true })
  mkdirSync(path.join(root, 'app', 'components'), { recursive: true })
  mkdirSync(path.join(root, 'styled-system', 'tokens'), { recursive: true })

  writeFileSync(
    path.join(distClient, '_shell.html'),
    `<!doctype html><html><head></head><body>${'x'.repeat(600)}<script type="module" src="/assets/app.js"></script></body></html>`
  )
  writeFileSync(path.join(assets, 'app.js'), 'console.log("app")')
  // Padded well past the 2KB floor with harmless, fully-resolved CSS.
  writeFileSync(path.join(assets, 'app.css'), '.filler{color:red}'.repeat(200))

  // No numeric spacing or sizes key, matching the real preset's shape — a
  // bare number on either scale is a miss.
  writeFileSync(
    path.join(root, 'styled-system', 'tokens', 'index.mjs'),
    'export const tokens = {\n' +
      '  "spacing.1": { "value": "4px" },\n' +
      '  "sizes.full": { "value": "100%" }\n' +
      '}\n'
  )

  writeFileSync(
    path.join(root, 'app', 'routes', 'index.tsx'),
    "import { Sidebar } from '../components/Sidebar'\nexport function Index() { return <Sidebar /> }\n"
  )
  writeFileSync(
    path.join(root, 'app', 'components', 'Sidebar.tsx'),
    "export function Sidebar() { return <div className={css({ width: '11' })} /> }\n"
  )

  return root
}

describe('validateBuildOutput reads the injected root (#312)', () => {
  let root
  beforeEach(() => {
    root = seedBuild()
  })
  afterEach(() => {
    rmSync(root, { recursive: true, force: true })
  })

  it('reports a bare-number miss from the temp tree, not the real repo', () => {
    const result = validateBuildOutput({ root })
    expect(result.success).toBe(false)
    expect(result.errors.join('\n')).toContain("width: '11'")

    // The real checkout has no dist/client at all (no build has run here);
    // proves the check above read the temp tree, not this one, and that
    // seeding the fixture never touched the real repo.
    expect(existsSync(path.join(ROOT, 'dist', 'client'))).toBe(false)
  })
})
