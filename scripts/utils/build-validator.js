import { spawnSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
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
      const selfRefCategories = [
        'fonts',
        'fontSizes',
        'fontWeights',
        'lineHeights',
        'letterSpacings',
      ]

      for (const category of selfRefCategories) {
        // Find if this category appears in semantic tokens
        const catRegex = new RegExp(`${category}\\s*:\\s*\\{`, 'g')
        for (const catMatch of semanticSection.matchAll(catRegex)) {
          // Get the block content (rough — find matching brace)
          const blockStart = catMatch.index
          let depth = 0
          let blockEnd = blockStart
          for (let i = catMatch.index + catMatch[0].length - 1; i < semanticSection.length; i++) {
            if (semanticSection[i] === '{') depth++
            if (semanticSection[i] === '}') depth--
            if (depth === 0) {
              blockEnd = i
              break
            }
          }
          const block = semanticSection.slice(blockStart, blockEnd + 1)

          // Check for self-references within this block
          const localPattern = new RegExp(`'\\{${category}\\.(\\w+)\\}'`, 'g')
          for (const refMatch of block.matchAll(localPattern)) {
            const tokenName = refMatch[1]
            // Check if this token name appears as a key in this block
            if (block.match(new RegExp(`${tokenName}\\s*:`))) {
              errors.push(
                `Circular token: semanticTokens.${category}.${tokenName} references '{${category}.${tokenName}}' (self-reference breaks PandaCSS)`
              )
            }
          }
        }
      }
    }
  } catch {
    // If we can't read preset.ts, that's a bigger problem — build will catch it
  }

  // Check 2: Non-type imports of React types in component files
  // e.g., import { ReactNode } from 'react' breaks SSR — must be import type { ReactNode }
  // Dynamically scan all .tsx files in app/components/ (designer may create any components)
  let componentFiles = []
  try {
    componentFiles = readdirSync(resolve(ROOT, 'app/components'))
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => `app/components/${f}`)
  } catch {
    componentFiles = ['app/components/Layout.tsx', 'app/components/Sidebar.tsx']
  }

  const reactTypes = [
    'ReactNode',
    'ReactElement',
    'FC',
    'PropsWithChildren',
    'CSSProperties',
    'MouseEvent',
    'ChangeEvent',
    'FormEvent',
  ]

  for (const file of componentFiles) {
    try {
      const content = readFileSync(resolve(ROOT, file), 'utf8')
      // Match ALL value imports from 'react' (not just the first one).
      // The old .match() with no /g flag only caught the first occurrence,
      // missing subsequent imports that AI often splits across multiple lines.
      // Explicitly excludes `import type { ... } from 'react'` since those
      // are correct.
      const importRegex = /^import\s+\{([^}]+)\}\s+from\s+['"]react['"]/gm
      for (const importMatch of content.matchAll(importRegex)) {
        const imports = importMatch[1].split(',').map((s) => s.trim())
        const typeImports = imports.filter((i) => reactTypes.includes(i))
        if (typeImports.length > 0) {
          errors.push(
            `${file}: import { ${typeImports.join(', ')} } from 'react' must use 'import type' — breaks SSR`
          )
        }
      }
    } catch {
      // File doesn't exist or can't be read — skip
    }
  }

  // Check 3: __root.tsx must import Scripts and ScrollRestoration from
  // @tanstack/react-router AND render them. Previously we just did a
  // substring check for "Scripts" which would pass on a fake local
  // `function Scripts() { return null }` — that breaks SPA hydration
  // but satisfies the old regex.
  try {
    const rootContent = readFileSync(resolve(ROOT, 'app/routes/__root.tsx'), 'utf8')
    // Must import Scripts from the router package (not a fake local definition)
    const routerImport = rootContent.match(
      /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@tanstack\/react-router['"]/
    )
    if (!routerImport) {
      errors.push('app/routes/__root.tsx: no import from @tanstack/react-router')
    } else {
      const imports = routerImport[1].split(',').map((s) => s.trim())
      if (!imports.includes('Scripts')) {
        errors.push(
          'app/routes/__root.tsx: Scripts not imported from @tanstack/react-router — client JS will not load and routes will render empty'
        )
      }
    }
    // Must render <Scripts /> or <Scripts/> somewhere (JSX usage)
    if (!/<Scripts\s*\/?>/m.test(rootContent)) {
      errors.push(
        'app/routes/__root.tsx: <Scripts /> not rendered in JSX — client JS will not load'
      )
    }
    // Reject fake local definitions that satisfy other checks
    if (/function\s+Scripts\s*\(\s*\)/.test(rootContent)) {
      errors.push(
        'app/routes/__root.tsx: has a local `function Scripts()` definition — must use the import from @tanstack/react-router'
      )
    }
    // head() must declare UTF-8 charset. Without it, em-dashes, smart
    // quotes, and other non-ASCII bytes from signals/briefs render as
    // Mojibake (`â€"` etc.) in the browser.
    if (!/charSet\s*:\s*['"]utf-8['"]/i.test(rootContent)) {
      errors.push(
        'app/routes/__root.tsx: head() missing meta charSet "utf-8" — non-ASCII characters will render as Mojibake'
      )
    }
  } catch {}

  // Check 4: Route files must NOT import or use Layout. __root.tsx already
  // wraps all routes in <Layout> — importing it again creates double headers.
  // Dynamically scan every .tsx in app/routes/ so newly-added routes are
  // covered (the old hardcoded list missed anything new).
  try {
    const routesDir = resolve(ROOT, 'app/routes')
    const routeFiles = readdirSync(routesDir)
      .filter((f) => f.endsWith('.tsx') && f !== '__root.tsx')
      .map((f) => `app/routes/${f}`)

    for (const file of routeFiles) {
      try {
        const content = readFileSync(resolve(ROOT, file), 'utf8')
        if (/from\s+['"]\.\.\/components\/Layout['"]/.test(content)) {
          errors.push(
            `${file}: imports Layout — routes must NOT import Layout (already provided by __root.tsx). This creates a double header.`
          )
        }
      } catch {}
    }
  } catch {}

  // Check 5: Scan generated code for security-sensitive patterns.
  // AI output is untrusted — a compromised or prompt-injected agent can
  // emit code that exfiltrates data, runs arbitrary scripts, or loads
  // third-party resources. This is the second line of defense after
  // signal sanitization in collect-signals.js.
  const DANGEROUS_PATTERNS = [
    { name: 'fetch() call', regex: /\bfetch\s*\(/, severity: 'blocks network exfiltration' },
    {
      name: 'XMLHttpRequest',
      regex: /\bXMLHttpRequest\b/,
      severity: 'blocks network exfiltration',
    },
    {
      name: 'sendBeacon',
      regex: /\bnavigator\.sendBeacon\b/,
      severity: 'blocks network exfiltration',
    },
    { name: 'WebSocket', regex: /\bnew\s+WebSocket\b/, severity: 'blocks network exfiltration' },
    {
      name: 'EventSource',
      regex: /\bnew\s+EventSource\b/,
      severity: 'blocks network exfiltration',
    },
    { name: 'eval()', regex: /\beval\s*\(/, severity: 'blocks arbitrary code execution' },
    {
      name: 'new Function()',
      regex: /\bnew\s+Function\s*\(/,
      severity: 'blocks arbitrary code execution',
    },
    {
      name: 'dynamic import()',
      regex: /\bimport\s*\(\s*[`'"]/,
      severity: 'blocks arbitrary module loading',
    },
    { name: 'dangerouslySetInnerHTML', regex: /dangerouslySetInnerHTML/, severity: 'blocks XSS' },
    { name: 'document.write', regex: /document\.write\s*\(/, severity: 'blocks XSS' },
    { name: 'innerHTML assignment', regex: /\.innerHTML\s*=/, severity: 'blocks XSS' },
    { name: 'script tag', regex: /<script[\s>]/i, severity: 'blocks inline scripts' },
    { name: 'javascript: URL', regex: /javascript:/i, severity: 'blocks XSS via URL' },
    // onerror/onclick as HTML attributes only (not JS property assignments like es.onerror = fn)
    {
      name: 'inline onerror attribute',
      regex: /\sonerror\s*=\s*["']/i,
      severity: 'blocks inline event handlers',
    },
    {
      name: 'inline onclick attribute',
      regex: /\sonclick\s*=\s*["']/i,
      severity: 'blocks inline event handlers',
    },
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
  // Fonts, project-owned URLs, and XML namespace identifiers. Any other
  // domain is flagged.
  const ALLOWED_URL_HOSTS = new Set([
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'spaceman.llc',
    'getfishsticks.com',
    '15th.club',
    'doug-march.com',
    'github.com',
    // XML namespace URIs that appear in xmlns / xmlns:xlink attributes on
    // inline SVG. These are identifiers, not fetchable URLs — no network
    // request is ever made to them, and inline SVG without xmlns can fail
    // to render in some environments.
    'www.w3.org',
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
      .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
      .replace(/^\s*\/\/[^\n]*/gm, '') // standalone line comments only

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
        errors.push(
          `${file}: contains disallowed URL to ${host} (only ${[...ALLOWED_URL_HOSTS].join(', ')} are allowed)`
        )
      }
    }
  }

  if (errors.length > 0) {
    const errorMsg = `Pre-build validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
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
 *
 * On failure:
 *   1. The FULL combined stdout+stderr is written to
 *      `archive/<today>/last-build-output.txt` (overwritten each attempt)
 *      so future diagnostics have the untruncated log.
 *   2. The last ~2000 chars of combined output are printed to the console.
 *   3. If the output contains a line matching `/^Error: /m` (typical
 *      `@tanstack/router-plugin` configResolved crashes surface the real
 *      error this way, often hundreds of lines ABOVE the tail), that line
 *      is hoisted to the top of the returned `error` string so callers see
 *      it first.
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

  if (result.status !== 0) {
    const combined = (result.stderr ?? '') + (result.stdout ?? '')

    // 1. Write the FULL combined output to disk for post-mortem diagnosis.
    //    The 3000-char tail returned to callers truncated the real Vite /
    //    @tanstack/router-plugin error last time the pipeline failed; this
    //    preserves the complete log alongside the archive tree.
    const today = new Date().toISOString().slice(0, 10)
    const outputDir = resolve(ROOT, 'archive', today)
    const outputPath = resolve(outputDir, 'last-build-output.txt')
    try {
      mkdirSync(outputDir, { recursive: true })
      writeFileSync(outputPath, combined, 'utf8')
      console.log(
        `  full build output written to archive/${today}/last-build-output.txt (${combined.length} chars)`
      )
    } catch (writeErr) {
      console.warn(`  could not write full build output to ${outputPath}: ${writeErr.message}`)
    }

    // 3. Surface `@tanstack/router-plugin` / Vite `Error: …` lines that
    //    would otherwise be buried above the stack trace tail.
    const errorLineMatch = combined.match(/^Error: .*$/m)
    const headline = errorLineMatch ? errorLineMatch[0] : null

    const tail = combined.slice(-3000)
    const error = headline
      ? `${headline}\n\n---\n(last 3000 chars of build output follows)\n---\n\n${tail}`
      : tail

    console.log('  build failed')
    if (headline) {
      console.log(`  headline: ${headline}`)
    }
    console.log('  --- last 2000 chars of build output ---')
    console.log(combined.slice(-2000))
    console.log('  ---')

    return { success: false, error }
  }

  // Build exited 0 — but that doesn't mean the output is usable.
  // An AI designer can produce a preset that compiles but renders blank
  // pages, or an __root.tsx that omits Scripts so the page never hydrates.
  // Run smoke checks on the built output before declaring success.
  const smokeCheck = validateBuildOutput()
  if (!smokeCheck.success) {
    console.log('  build output smoke check failed')
    for (const e of smokeCheck.errors) console.log(`  ✗ ${e}`)
    const combined = (result.stderr ?? '') + (result.stdout ?? '')
    // Build exited 0 but produced unusable output. Persist the full build log
    // too — a status-0-but-no-shell failure is otherwise invisible (the
    // non-zero path above is the only other place this gets written).
    try {
      const today = new Date().toISOString().slice(0, 10)
      const outputDir = resolve(ROOT, 'archive', today)
      mkdirSync(outputDir, { recursive: true })
      writeFileSync(resolve(outputDir, 'last-build-output.txt'), combined, 'utf8')
      console.log(
        `  full build output written to archive/${today}/last-build-output.txt (${combined.length} chars)`
      )
    } catch (writeErr) {
      console.warn(`  could not write full build output: ${writeErr.message}`)
    }
    // A status-0 build with missing shell output almost always means the
    // prerender step crashed — i.e. the app COMPILED but threw when
    // server-rendered (2026-07-10: "Unhandled rejection: Failed to fetch /:
    // Internal Server Error"). The retry agent can only fix what it can see,
    // so surface the runtime error lines and the log tail, not just the
    // missing-file symptom.
    const runtimeErrorLines = combined
      .split('\n')
      .filter((l) =>
        /unhandled rejection|internal server error|prerender.*(fail|error)|^\s*error/i.test(l)
      )
      .slice(-6)
    const errorParts = [
      'Build output smoke check failed:',
      smokeCheck.errors.map((e) => `  - ${e}`).join('\n'),
    ]
    if (runtimeErrorLines.length) {
      errorParts.push(
        '\nThe build COMPILED but the app crashed during prerender (server-side render). Runtime error lines from the build log:',
        runtimeErrorLines.join('\n'),
        '\nThis usually means SSR-unsafe code (window/document/localStorage accessed at module scope or unconditionally during render) in a route or component file — the server bundle loads EVERY route module, so one unsafe file breaks every page.'
      )
    }
    errorParts.push(`\n--- last 1500 chars of build output ---\n${combined.slice(-1500)}`)
    return { success: false, error: errorParts.join('\n') }
  }

  console.log('  build succeeded')
  return { success: true }
}

/**
 * Post-build smoke checks: verify the built output is actually usable.
 * Runs after `pnpm build` exits 0 but before we declare success.
 *
 * Catches cases where the build compiles but produces unusable output —
 * blank pages, missing asset bundles, or a SPA shell with no scripts.
 *
 * @returns {{ success: boolean, errors: string[] }}
 */
export function validateBuildOutput() {
  const errors = []
  const distClient = resolve(ROOT, 'dist/client')

  // Check 1: dist/client must exist
  try {
    const entries = readdirSync(distClient)
    if (entries.length === 0) {
      errors.push('dist/client/ is empty — build produced no output')
      return { success: false, errors }
    }
  } catch (err) {
    errors.push(`dist/client/ does not exist: ${err.message}`)
    return { success: false, errors }
  }

  // Check 2: SPA shell HTML must exist and contain expected markers
  const shellPath = resolve(distClient, '_shell.html')
  const indexPath = resolve(distClient, 'index.html')
  let shellHtml = ''
  try {
    shellHtml = readFileSync(existsSync(shellPath) ? shellPath : indexPath, 'utf8')
  } catch {
    errors.push('dist/client/_shell.html and index.html are both missing')
    return { success: false, errors }
  }

  if (shellHtml.length < 500) {
    errors.push(
      `SPA shell HTML is suspiciously small (${shellHtml.length} bytes) — likely empty or malformed`
    )
  }

  // Must load client JS for hydration
  if (!shellHtml.includes('<script') && !shellHtml.includes('modulepreload')) {
    errors.push('SPA shell has no <script> or modulepreload tags — client JS will not load')
  }

  // Must have a root/mount point
  if (!shellHtml.match(/<body[^>]*>/)) {
    errors.push('SPA shell has no <body> tag')
  }

  // Check 3: asset bundles must exist
  const assetsDir = resolve(distClient, 'assets')
  try {
    const assets = readdirSync(assetsDir)
    const hasJS = assets.some((f) => f.endsWith('.js'))
    const cssFiles = assets.filter((f) => f.endsWith('.css'))
    if (!hasJS) errors.push('dist/client/assets/ has no .js bundles')
    if (cssFiles.length === 0) {
      errors.push('dist/client/assets/ has no .css bundles')
    } else {
      // Check 4: CSS bundle must contain meaningful content. A preset with
      // empty globalCss + no semantic tokens still emits utility CSS from
      // component usage, but the total stays under ~1KB. Healthy builds
      // produce 5-15KB. The 2KB floor catches "preset produced no CSS"
      // without false positives on legitimately small builds.
      const totalCssBytes = cssFiles.reduce(
        (sum, f) => sum + statSync(resolve(assetsDir, f)).size,
        0
      )
      const MIN_CSS_BYTES = 2000
      if (totalCssBytes < MIN_CSS_BYTES) {
        errors.push(
          `CSS bundles total only ${totalCssBytes} bytes (minimum ${MIN_CSS_BYTES}). ` +
            'The preset likely produced no globalCss or semanticTokens — site will render unstyled.'
        )
      }
    }
  } catch (err) {
    errors.push(`dist/client/assets/ missing or unreadable: ${err.message}`)
  }

  return { success: errors.length === 0, errors }
}
