import { spawnSync } from 'child_process'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { ROOT } from './file-manager.js'
import { MUTABLE_FILES } from './site-context.js'

/**
 * Pre-build validation: check for known bad patterns in generated code.
 * Catches issues that `pnpm build` misses but break SSR at runtime.
 *
 * @returns {{ success: boolean, error?: string }}
 */
export function validateGenerated() {
  const errors = []

  // Check 1: Circular token references in preset.ts
  // e.g., fonts.heading: '{fonts.heading}' creates an infinite loop in PandaCSS
  try {
    const presetPath = resolve(ROOT, 'elements/preset.ts')
    const preset = readFileSync(presetPath, 'utf8')

    const semanticStart = preset.indexOf('semanticTokens')
    if (semanticStart > -1) {
      const semanticSection = preset.slice(semanticStart)

      // Check for self-referencing tokens: '{tokenCategory.tokenName}' where the
      // surrounding context is defining that same tokenCategory.tokenName
      // This catches: fonts: { heading: { value: '{fonts.heading}' } }
      const selfRefPatterns = [
        { category: 'fonts', pattern: /'\{fonts\.(\w+)\}'/g },
        { category: 'fontSizes', pattern: /'\{fontSizes\.(\w+)\}'/g },
        { category: 'fontWeights', pattern: /'\{fontWeights\.(\w+)\}'/g },
        { category: 'lineHeights', pattern: /'\{lineHeights\.(\w+)\}'/g },
        { category: 'letterSpacings', pattern: /'\{letterSpacings\.(\w+)\}'/g },
      ]

      for (const { category, pattern } of selfRefPatterns) {
        // Find if this category appears in semantic tokens
        const catRegex = new RegExp(`${category}\\s*:\\s*\\{`, 'g')
        let catMatch
        while ((catMatch = catRegex.exec(semanticSection)) !== null) {
          // Get the block content (rough — find matching brace)
          const blockStart = catMatch.index
          let depth = 0
          let blockEnd = blockStart
          for (let i = catMatch.index + catMatch[0].length - 1; i < semanticSection.length; i++) {
            if (semanticSection[i] === '{') depth++
            if (semanticSection[i] === '}') depth--
            if (depth === 0) { blockEnd = i; break }
          }
          const block = semanticSection.slice(blockStart, blockEnd + 1)

          // Check for self-references within this block
          let refMatch
          const localPattern = new RegExp(`'\\{${category}\\.(\\w+)\\}'`, 'g')
          while ((refMatch = localPattern.exec(block)) !== null) {
            const tokenName = refMatch[1]
            // Check if this token name appears as a key in this block
            if (block.match(new RegExp(`${tokenName}\\s*:`))) {
              errors.push(`Circular token: semanticTokens.${category}.${tokenName} references '{${category}.${tokenName}}' (self-reference breaks PandaCSS)`)
            }
          }
        }
      }
    }
  } catch (err) {
    // If we can't read preset.ts, that's a bigger problem — build will catch it
  }

  // Check 2: Non-type imports of React types in component files
  // e.g., import { ReactNode } from 'react' breaks SSR — must be import type { ReactNode }
  // Dynamically scan all .tsx files in app/components/ (designer may create any components)
  let componentFiles = []
  try {
    componentFiles = readdirSync(resolve(ROOT, 'app/components'))
      .filter(f => f.endsWith('.tsx'))
      .map(f => `app/components/${f}`)
  } catch {
    componentFiles = ['app/components/Layout.tsx', 'app/components/Sidebar.tsx']
  }

  const reactTypes = ['ReactNode', 'ReactElement', 'FC', 'PropsWithChildren', 'CSSProperties', 'MouseEvent', 'ChangeEvent', 'FormEvent']

  for (const file of componentFiles) {
    try {
      const content = readFileSync(resolve(ROOT, file), 'utf8')
      // Match: import { ReactNode } from 'react' (NOT import type { ReactNode })
      const importMatch = content.match(/^import\s+\{([^}]+)\}\s+from\s+['"]react['"]/m)
      if (importMatch) {
        const imports = importMatch[1].split(',').map(s => s.trim())
        const typeImports = imports.filter(i => reactTypes.includes(i))
        if (typeImports.length > 0) {
          errors.push(`${file}: import { ${typeImports.join(', ')} } from 'react' must use 'import type' — breaks SSR`)
        }
      }
    } catch {
      // File doesn't exist or can't be read — skip
    }
  }

  // Check 3: __root.tsx must render <Scripts /> in the body
  // Without it, client JS never loads and all route content renders empty
  try {
    const rootContent = readFileSync(resolve(ROOT, 'app/routes/__root.tsx'), 'utf8')
    if (!rootContent.includes('Scripts')) {
      errors.push('app/routes/__root.tsx: missing <Scripts /> — client JS will not load and routes will render empty. Import Scripts from @tanstack/react-router and render it in the body.')
    }
  } catch {}

  // Check 4: Route files must NOT import or use Layout
  // __root.tsx already wraps all routes in <Layout> — importing it again creates double headers
  const routeFiles = [
    'app/routes/index.tsx',
    'app/routes/about.tsx',
    'app/routes/work.$slug.tsx',
  ]

  for (const file of routeFiles) {
    try {
      const content = readFileSync(resolve(ROOT, file), 'utf8')
      if (content.includes("from '../components/Layout'") || content.includes('from "../components/Layout"')) {
        errors.push(`${file}: imports Layout — routes must NOT import Layout (already provided by __root.tsx). This creates a double header.`)
      }
    } catch {
      // File doesn't exist — skip
    }
  }

  // Check 5: Scan generated code for security-sensitive patterns.
  // AI output is untrusted — a compromised or prompt-injected agent can
  // emit code that exfiltrates data, runs arbitrary scripts, or loads
  // third-party resources. This is the second line of defense after
  // signal sanitization in collect-signals.js.
  const DANGEROUS_PATTERNS = [
    { name: 'fetch() call', regex: /\bfetch\s*\(/, severity: 'blocks network exfiltration' },
    { name: 'XMLHttpRequest', regex: /\bXMLHttpRequest\b/, severity: 'blocks network exfiltration' },
    { name: 'sendBeacon', regex: /\bnavigator\.sendBeacon\b/, severity: 'blocks network exfiltration' },
    { name: 'WebSocket', regex: /\bnew\s+WebSocket\b/, severity: 'blocks network exfiltration' },
    { name: 'EventSource', regex: /\bnew\s+EventSource\b/, severity: 'blocks network exfiltration' },
    { name: 'eval()', regex: /\beval\s*\(/, severity: 'blocks arbitrary code execution' },
    { name: 'new Function()', regex: /\bnew\s+Function\s*\(/, severity: 'blocks arbitrary code execution' },
    { name: 'dynamic import()', regex: /\bimport\s*\(\s*[`'"]/, severity: 'blocks arbitrary module loading' },
    { name: 'dangerouslySetInnerHTML', regex: /dangerouslySetInnerHTML/, severity: 'blocks XSS' },
    { name: 'document.write', regex: /document\.write\s*\(/, severity: 'blocks XSS' },
    { name: 'innerHTML assignment', regex: /\.innerHTML\s*=/, severity: 'blocks XSS' },
    { name: 'script tag', regex: /<script[\s>]/i, severity: 'blocks inline scripts' },
    { name: 'javascript: URL', regex: /javascript:/i, severity: 'blocks XSS via URL' },
    // onerror/onclick as HTML attributes only (not JS property assignments like es.onerror = fn)
    { name: 'inline onerror attribute', regex: /\sonerror\s*=\s*["']/i, severity: 'blocks inline event handlers' },
    { name: 'inline onclick attribute', regex: /\sonclick\s*=\s*["']/i, severity: 'blocks inline event handlers' },
    { name: 'atob/btoa', regex: /\b(?:atob|btoa)\s*\(/, severity: 'blocks obfuscated payloads' },
  ]

  // Per-file exceptions for legitimate current uses in AI-generated files.
  // Keep this small and explicit — every exception is an increase in
  // attack surface. Non-mutable files (archive.tsx, elements.tsx, dev.tsx)
  // are not scanned at all, so no exception is needed for them.
  const PATTERN_EXCEPTIONS = {
    // __root.tsx contains the theme-init script (dark mode detection on
    // first paint). The AI must preserve this pattern when regenerating.
    // The content of the script is validated separately via the THEME_INIT_SCRIPT
    // check in Check 3.
    'app/routes/__root.tsx': ['script tag'],
  }

  // Allowlist of domains permitted in URL strings in generated code.
  // Fonts and project-owned URLs only. Any other domain is flagged.
  const ALLOWED_URL_HOSTS = new Set([
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'spaceman.llc',
    'getfishsticks.com',
    '15th.club',
    'doug-march.com',
  ])

  // Files to scan: only AI-generated mutable files. Hand-maintained
  // files like elements.tsx, archive.tsx, archive.$date.tsx, dev.tsx are
  // excluded — they have different trust boundaries.
  // Plus any components/ files the designer may have added beyond the
  // canonical list (dynamically discovered).
  const filesToScan = [...MUTABLE_FILES]
  try {
    const componentsDir = resolve(ROOT, 'app/components')
    for (const f of readdirSync(componentsDir)) {
      if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue
      const relPath = `app/components/${f}`
      if (!filesToScan.includes(relPath)) filesToScan.push(relPath)
    }
  } catch {}

  for (const file of filesToScan) {
    let content
    try {
      content = readFileSync(resolve(ROOT, file), 'utf8')
    } catch {
      continue
    }

    // Strip comments so patterns in comments don't trigger false positives.
    // Only strip standalone line comments (start of line + whitespace) to
    // avoid breaking URLs like https:// — a trailing comment rarely contains
    // a dangerous pattern that isn't also in the code itself.
    const stripped = content
      .replace(/\/\*[\s\S]*?\*\//g, '')    // block comments
      .replace(/^\s*\/\/[^\n]*/gm, '')     // standalone line comments only

    const fileExceptions = PATTERN_EXCEPTIONS[file] || []

    for (const { name, regex, severity } of DANGEROUS_PATTERNS) {
      if (fileExceptions.includes(name)) continue
      if (regex.test(stripped)) {
        errors.push(`${file}: contains ${name} (${severity})`)
      }
    }

    // Check all URLs in the code against allowlist
    const urlMatches = stripped.matchAll(/https?:\/\/([a-zA-Z0-9.-]+)/g)
    for (const match of urlMatches) {
      const host = match[1].toLowerCase()
      if (!ALLOWED_URL_HOSTS.has(host)) {
        errors.push(`${file}: contains disallowed URL to ${host} (only ${[...ALLOWED_URL_HOSTS].join(', ')} are allowed)`)
      }
    }
  }

  if (errors.length > 0) {
    const errorMsg = 'Pre-build validation failed:\n' + errors.map(e => `  - ${e}`).join('\n')
    console.log('  pre-build validation failed')
    for (const e of errors) console.log(`  ✗ ${e}`)
    return { success: false, error: errorMsg }
  }

  console.log('  pre-build validation passed')
  return { success: true }
}

/**
 * Run `pnpm build` in the repo root.
 * Returns { success: true } on success.
 * Returns { success: false, error: string } on failure.
 * The error string contains the last 3000 chars of combined stderr+stdout.
 *
 * @returns {{ success: boolean, error?: string }}
 */
export function validateBuild() {
  // Run pre-build checks first
  const preCheck = validateGenerated()
  if (!preCheck.success) {
    return preCheck
  }

  console.log('  running pnpm build...')

  const result = spawnSync('pnpm', ['build'], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 120000, // 2 minute timeout
  })

  if (result.status === 0) {
    console.log('  build succeeded')
    return { success: true }
  }

  const combined = (result.stderr ?? '') + (result.stdout ?? '')
  const error = combined.slice(-3000) // last 3000 chars

  console.log('  build failed')
  console.log('  --- last 500 chars of build output ---')
  console.log(combined.slice(-500))
  console.log('  ---')

  return { success: false, error }
}
