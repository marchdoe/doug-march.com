import { RECOGNIZED_HOSTS } from './site-origin.js'
import { localDateString } from './local-time.js'
import { spawnSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { ROOT } from './file-manager.js'
import { STEP_BUDGETS } from './budgets.js'
import { checkTokenExistence } from './token-existence.js'
import { checkTokenResolution, readReachableSources } from './token-gate.js'
import { MUTABLE_FILES, ORCHESTRATOR_FILES } from './site-context.js'
import { MARK_PATH_FINGERPRINTS, lockupIsDeclared } from './brand-lockup.js'
import {
  SEMANTIC_COLOR_NAMES,
  checkPresetContract,
  findOffContractColorValues,
} from './semantic-contract.js'

/**
 * Does any of `sources` wire up a mailto link to `email`?
 *
 * Two spellings count, because the source is TSX and the contract asks the
 * engineer to BIND the address rather than type it: an interpolated
 * `mailto:${identity.email}` never contains the literal address, so a plain
 * substring test would reject the very authoring style the prompt requires.
 * A hardcoded but correct address still passes — the question this answers is
 * whether a visitor can mail Doug, not which syntax got them there.
 *
 * @param {string[]} sources - file contents to search
 * @param {string} email - the canonical address from identity.email
 * @returns {boolean}
 */
export function contactLinkPresent(sources, email) {
  const literal = `mailto:${email}`
  const bound = /mailto:\$\{[^}]*\bidentity\.email\b[^}]*\}/
  return sources.some((src) => src.includes(literal) || bound.test(src))
}

/**
 * Contact addresses at one of our own domains that are NOT the canonical one.
 *
 * {@link contactLinkPresent} asks whether anything links to the right address.
 * It cannot see a second link pointing at the wrong one, and that is exactly
 * what shipped: Footer.tsx bound `identity.email` while Sidebar.tsx still
 * hardcoded `hello@doug-march.com`, so the check passed while the live site
 * advertised two addresses, one of which has no MX records and silently
 * discards mail.
 *
 * Scoped to our own hosts on purpose. A `mailto:` to some other domain is
 * somebody else's address and none of this check's business.
 *
 * @param {string[]} sources - file contents to search
 * @param {string} email - the canonical address from identity.email
 * @param {string[]} hosts - every host that has ever been ours
 * @returns {string[]} stale addresses found, deduped
 */
export function staleContactAddresses(sources, email, hosts) {
  const found = new Set()
  for (const src of sources) {
    for (const m of src.matchAll(/mailto:([^"'`\s>)]+)/g)) {
      const addr = m[1]
      if (addr === email) continue
      if (addr.includes('${')) continue // an interpolation, resolved at runtime
      const domain = addr.split('@')[1]
      if (domain && hosts.includes(domain)) found.add(addr)
    }
  }
  return [...found]
}

/**
 * Source files under `app/` that no route can reach.
 *
 * The orphans #216 owns: roughly thirty components in `app/components/` that
 * nothing imports any more, which Panda still scans and emits CSS for. They are
 * worth reporting and never worth failing a nightly run over, so the semantic
 * contract check warns on them.
 *
 * @param {string} root repo root
 * @param {Map<string, string>} reachable output of readReachableSources
 * @returns {string[]} repo-relative paths
 */
function unreachableSources(root, reachable) {
  const out = []
  const walk = (dir) => {
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = resolve(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.tsx?$/.test(entry.name) && !reachable.has(full)) {
        out.push(
          full
            .slice(root.length + 1)
            .split(sep)
            .join('/')
        )
      }
    }
  }
  walk(resolve(root, 'app'))
  return out.sort()
}

/**
 * Pre-build validation: check for known bad patterns in generated code.
 * Catches issues that `pnpm build` misses but break SSR at runtime.
 *
 * @returns {{ success: boolean, error?: string }}
 */
/**
 * @param {{ root?: string, shell?: object|null }} [options] where to scan, and
 *   the day's parsed SHELL declaration. `shell` is what turns the
 *   "declared a lockup, rendered nothing" check on; omit it and that one
 *   check is skipped, which is what every caller outside the nightly run wants.
 *   Tests pass a temp tree: this used to be scanned against the real ROOT,
 *   which meant two test files dropped fixtures into app/components/ while
 *   vitest ran files in parallel, and the scan swept up whatever the nightly
 *   had left in the working tree. Six assertions were written as
 *   `if (!result.success) expect(...).not.toContain(...)` to survive that —
 *   they silently skipped on any checkout with an unrelated validator error.
 */
export function validateGenerated({ root = ROOT, shell = null } = {}) {
  const errors = []

  // Check 1: Circular token references in preset.ts
  // e.g., fonts.heading: '{fonts.heading}' creates an infinite loop in PandaCSS
  try {
    const presetPath = resolve(root, 'elements/preset.ts')
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
    componentFiles = readdirSync(resolve(root, 'app/components'))
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
      const content = readFileSync(resolve(root, file), 'utf8')
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
    const rootContent = readFileSync(resolve(root, 'app/routes/__root.tsx'), 'utf8')
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
    const routesDir = resolve(root, 'app/routes')
    const routeFiles = readdirSync(routesDir)
      .filter((f) => f.endsWith('.tsx') && f !== '__root.tsx')
      .map((f) => `app/routes/${f}`)

    for (const file of routeFiles) {
      try {
        const content = readFileSync(resolve(root, file), 'utf8')
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
    // The script's content is not validated here — only that a theme init script exists.
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
    // Every recognized site host, not just today's: archived designs and
    // hand-written links may reference either side of a domain move.
    ...RECOGNIZED_HOSTS,
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
    const componentsDir = resolve(root, 'app/components')
    for (const f of readdirSync(componentsDir)) {
      if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue
      const relPath = `app/components/${f}`
      if (!filesToScan.includes(relPath)) filesToScan.push(relPath)
    }
  } catch {}

  for (const file of filesToScan) {
    let content
    try {
      content = readFileSync(resolve(root, file), 'utf8')
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

  // Check 6: the contact address must survive the night.
  //
  // It has no other enforcement. `identity.email` in app/content/about.ts is
  // the source of truth, but nothing makes the engineer bind it, and on
  // 2026-08-29 the build silently replaced Sidebar.tsx's `mailto:` with a
  // `/#contact` page anchor while Footer.tsx kept a link — so a per-file rule
  // would have false-positived. The site-wide question is the real one: can a
  // visitor mail Doug at all?
  //
  // Read the address as text rather than importing about.ts: this is a plain
  // .js script and node is pinned to 22.15.1, where type stripping is still
  // behind a flag. Same regex-over-the-source idiom site-context.js uses for
  // projects.ts.
  //
  // Two spellings count, because the source is TSX and the prompt asks the
  // engineer to BIND the address rather than type it: an interpolated
  // `mailto:${identity.email}` never contains the literal address, so a plain
  // substring test would fail the very authoring style the contract requires.
  let contactEmail = null
  try {
    const aboutSrc = readFileSync(resolve(root, 'app/content/about.ts'), 'utf8')
    contactEmail = aboutSrc.match(/email:\s*'([^']+)'/)?.[1] ?? null
  } catch {}

  if (!contactEmail) {
    errors.push(
      'app/content/about.ts: no `email` field on identity — it is the source of ' +
        'truth for the contact address and Check 6 cannot run without it'
    )
  } else {
    const sources = filesToScan.map((file) => {
      try {
        return readFileSync(resolve(root, file), 'utf8')
      } catch {
        return ''
      }
    })
    if (!contactLinkPresent(sources, contactEmail)) {
      errors.push(
        `no file links to mailto:${contactEmail} — bind it from identity.email ` +
          `(app/content/about.ts); scanned ${filesToScan.length} files`
      )
    }

    // A present-and-correct link does not mean there is no second, wrong one.
    const stale = staleContactAddresses(sources, contactEmail, RECOGNIZED_HOSTS)
    if (stale.length > 0) {
      errors.push(
        `stale contact address(es) at our own domains: ${stale.join(', ')} — ` +
          `the canonical address is ${contactEmail} (identity.email in ` +
          `app/content/about.ts). Bind it rather than hardcoding.`
      )
    }
  }

  // Check 7: nobody draws the brand mark but BrandLockup.
  //
  // The mark had no owner. Every night the engineer built one from
  // logo-mono.svg or from pasted path data, and it kept shipping wrong: gone
  // entirely on 2026-07-10, "a gray box" on 2026-07-22, 11px against a 44px
  // mockup on 2026-08-30. Five leftover attempts still sit in app/components/.
  // app/components/BrandLockup.tsx is generated by the orchestrator every run
  // from scripts/templates/BrandLockup.tsx.template; these three rules are what
  // stop a sixth attempt from appearing beside it. See #254.
  //
  // Scanned against the files a route can actually reach, the same orphan
  // filter the token gate uses. The five leftovers are real and they are
  // exactly this failure, but no page renders them and #216 owns deleting
  // them — failing tonight's build over a file nobody sees would kill a run
  // that was fine.
  const LOCKUP_OWNER = 'app/components/BrandLockup.tsx'
  try {
    const reachable = readReachableSources(root)
    const engineerSources = []
    for (const [absPath, source] of reachable) {
      const rel = absPath
        .slice(root.length + 1)
        .split(sep)
        .join('/')
      if (rel === LOCKUP_OWNER) continue
      engineerSources.push([rel, source])
    }

    for (const [rel, source] of engineerSources) {
      if (/from\s+['"][^'"]*\/logo(?:-mono)?\.svg['"]/.test(source)) {
        errors.push(
          `${rel}: imports the logo SVG directly — the mark is owned by ${LOCKUP_OWNER}. ` +
            `Render <BrandLockup variant=... mode=... /> instead; it carries both color modes.`
        )
      }
      const collapsed = source.replace(/\s+/g, ' ')
      const pasted = MARK_PATH_FINGERPRINTS.filter((fragment) => collapsed.includes(fragment))
      if (pasted.length > 0) {
        errors.push(
          `${rel}: contains the brand mark's path data inline (matched ${pasted.join(', ')}) — ` +
            `the mark is drawn once, in ${LOCKUP_OWNER}. Render <BrandLockup /> instead of redrawing it.`
        )
      }
    }

    // The declaration says a lockup is on the page. Something has to render it.
    if (lockupIsDeclared(shell)) {
      const rendered = engineerSources.some(([, source]) => /<BrandLockup[\s/>]/.test(source))
      if (!rendered) {
        errors.push(
          `SHELL declares brand_lockup: ${shell.brand_lockup}, but no file renders <BrandLockup /> — ` +
            `the declared lockup is not on the page. Scanned ${engineerSources.length} reachable files.`
        )
      }
    }
  } catch (err) {
    console.warn(`  brand lockup check skipped: ${err.message}`)
  }

  // Check 8: the frozen semantic colour contract (#255).
  //
  // Eight consecutive presets defined eight different semantic sets, so the
  // engineer either named a token that did not exist that night or gave up on
  // the semantic layer and reached into the palette — `sand.300` and
  // `gold.800` throughout 2026-08-30's Layout.tsx. A raw scale step resolves,
  // so no gate saw it, and it pins an ink to a value the day's design cannot
  // move. scripts/utils/semantic-contract.js is the one list; this enforces it
  // from both sides.
  //
  // (a) The preset defines the contract, all of it and nothing else. Extras are
  //     rejected as firmly as omissions: an extra name is a role the engineer
  //     cannot rely on tomorrow, and it is what leaves a component behind
  //     referencing a name the next night no longer defines.
  try {
    const presetSource = readFileSync(resolve(root, 'elements/preset.ts'), 'utf8')
    const contract = checkPresetContract(presetSource)
    if (contract.missing.length > 0) {
      errors.push(
        `elements/preset.ts: semanticTokens.colors is missing ${contract.missing.join(', ')} — ` +
          `the semantic set is frozen at ${SEMANTIC_COLOR_NAMES.length} names and every one must be ` +
          'defined. Map the missing role onto the palette this design already has.'
      )
    }
    if (contract.extra.length > 0) {
      errors.push(
        `elements/preset.ts: semanticTokens.colors defines ${contract.extra.join(', ')}, which is ` +
          `not in the frozen set (${SEMANTIC_COLOR_NAMES.join(', ')}). A name invented for one ` +
          'night is a name the next build cannot use. Map that colour onto one of the canonical roles.'
      )
    }
  } catch {
    // An unreadable preset is a bigger problem and check 1 already says so.
  }

  // (b) Engineer TSX names the contract and nothing else in a colour position.
  //
  //     Scoped the way the token gate and the lockup rules are: a finding in a
  //     file the nightly agents own blocks, and a finding in an orphan (#216) or
  //     a hand-maintained file warns. The error string is handed to a React
  //     Engineer retry, and a finding in a file the agent may not open would
  //     burn that retry and then fail the run anyway.
  try {
    const reachable = readReachableSources(root)
    const relOf = (absPath) =>
      absPath
        .slice(root.length + 1)
        .split(sep)
        .join('/')
    const owned = new Set(MUTABLE_FILES.filter((f) => !ORCHESTRATOR_FILES.includes(f)))
    const describe = (rel, findings) =>
      `${rel}: ${findings.map((f) => `${f.prop}: '${f.value}'`).join(', ')} — not in the frozen ` +
      `semantic set (${SEMANTIC_COLOR_NAMES.join(', ')}). A raw palette step resolves and still ` +
      "pins the colour to one scale value the day's design cannot move; use the semantic role."

    const offContract = []
    for (const [absPath, source] of reachable) {
      const findings = findOffContractColorValues(source)
      if (findings.length > 0) offContract.push([relOf(absPath), findings, true])
    }
    for (const rel of unreachableSources(root, reachable)) {
      const findings = findOffContractColorValues(readFileSync(resolve(root, rel), 'utf8'))
      if (findings.length > 0) offContract.push([rel, findings, false])
    }

    const warnings = []
    for (const [rel, findings, isReachable] of offContract) {
      if (isReachable && owned.has(rel)) errors.push(describe(rel, findings))
      else warnings.push(describe(rel, findings))
    }
    for (const w of warnings.slice(0, 8)) {
      console.warn(`  ⚠ ${w} (not a file the nightly agents own or render, so not blocking)`)
    }
    if (warnings.length > 8) {
      console.warn(`  ⚠ ${warnings.length - 8} more off-contract colour reference(s) not shown`)
    }
  } catch (err) {
    console.warn(`  semantic colour contract check skipped: ${err.message}`)
  }

  // Check: token references that resolve to nothing.
  //
  // Panda emits an unknown token as the bare string, so `color: 'panel'`
  // becomes `color: panel`, the browser drops the declaration, and the element
  // renders with its inherited value. Nothing throws. The only token check
  // above this one is for circular semantic references; a name that was never
  // defined passes everything.
  //
  // A warning, not an error, deliberately: the agent currently emits
  // `fontFamily: 'mono'` on most nights and the chassis defines only
  // display/body, so blocking on it today would fail every run before the
  // prompt is taught otherwise. Making it blocking is changing `console.warn`
  // to `errors.push` — worth doing once a green run confirms a clean baseline.
  try {
    const unknownTokens = checkTokenExistence({ root: ROOT, files: MUTABLE_FILES })
    for (const { file, prop, value, category } of unknownTokens) {
      console.warn(
        `  ⚠ ${file}: ${prop}: '${value}' is not a token (no ${category}.${value}) — Panda emits the bare string and the browser drops the declaration`
      )
    }
    if (unknownTokens.length === 0) console.log('  token references all resolve')
  } catch (err) {
    console.warn(`  token existence check skipped: ${err.message}`)
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
export function validateBuild({ shell = null, date = localDateString(new Date()) } = {}) {
  // Run pre-build checks first
  const preCheck = validateGenerated({ shell })
  if (!preCheck.success) {
    return preCheck
  }

  console.log('  running pnpm build...')

  const result = spawnSync('pnpm', ['build'], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: STEP_BUDGETS.buildMs,
  })

  if (result.status !== 0) {
    const combined = (result.stderr ?? '') + (result.stdout ?? '')

    // 1. Write the FULL combined output to disk for post-mortem diagnosis.
    //    The 3000-char tail returned to callers truncated the real Vite /
    //    @tanstack/router-plugin error last time the pipeline failed; this
    //    preserves the complete log alongside the archive tree.
    // Every other path in the run keys the day on America/New_York, not
    // UTC — use the caller's run date so the build log lands beside the
    // rest of that day's archive instead of a UTC-shifted neighbor (#311).
    const today = date
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
      // Same run date as the non-zero-exit path above (#311).
      const today = date
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

  // Compiles and renders is not the same as passes CI. See runStaticChecks.
  const statics = runStaticChecks()
  if (!statics.success) return statics

  console.log('  build succeeded')
  return { success: true }
}

/**
 * Paths the static checks cover. The same ones the nightly's push step
 * stages, so what gets checked is exactly what would reach main. `elements/`
 * is not here because the nightly does not write it: the two generated
 * presets are the only files a run may touch, and codegen validates those on
 * write. Biome excludes exactly those two and lints the hand-written chassis
 * catalogue like any other source.
 */
export const STATIC_CHECK_PATHS = ['app/components', 'app/routes']

/**
 * Lint, format and typecheck what the agents wrote.
 *
 * The nightly validated its output by building it, and Vite transpiles with
 * esbuild: no type checking, and formatting is checked nowhere. So on
 * 2026-08-30 it pushed an unused import and eight unformatted files straight
 * to main, and every PR opened afterwards showed Lint and Typecheck red for a
 * reason that was not in the PR (#251). CI runs both tools — on pull requests,
 * which the nightly never opens.
 *
 * Shape, decided in #251: formatting is auto-fixed, because it is not a
 * design decision and the engineer should not spend a retry on it. Whatever
 * remains after that — a genuine lint error, a type error — fails the build
 * the same way a compile error does, so it reaches the React Engineer as a
 * retry with the tool output attached. Both tools run even if the first
 * fails, so one retry sees everything.
 *
 * Cheap: biome under a second, tsc about one. The run budgets sixty minutes.
 *
 * @param {{ spawn?: typeof spawnSync, root?: string }} [deps] injectable for tests
 * @returns {{ success: boolean, error?: string, fixed?: string }}
 */
export function runStaticChecks({ spawn = spawnSync, root = ROOT } = {}) {
  const opts = { cwd: root, encoding: 'utf8', timeout: STEP_BUDGETS.staticCheckMs }
  const combined = (r) => (r.stdout ?? '') + (r.stderr ?? '')
  const failures = []

  console.log('  running biome check --write...')
  const biome = spawn('pnpm', ['exec', 'biome', 'check', '--write', ...STATIC_CHECK_PATHS], opts)
  const biomeOut = combined(biome)
  // Biome reports what it changed; keep that line so the log says the
  // formatting fix happened rather than leaving it to be inferred.
  const fixed = biomeOut.match(/Fixed \d+ files?/)?.[0]
  if (fixed) console.log(`  biome: ${fixed}`)
  if (biome.status !== 0) {
    failures.push(`Lint errors remain after auto-fix (biome):\n${biomeOut.trim().slice(-3000)}`)
  }

  console.log('  running tsc --noEmit...')
  const tsc = spawn('pnpm', ['exec', 'tsc', '--noEmit'], opts)
  if (tsc.status !== 0) {
    failures.push(`Type errors (tsc --noEmit):\n${combined(tsc).trim().slice(-3000)}`)
  }

  if (failures.length) {
    console.log('  static checks failed')
    return {
      success: false,
      ...(fixed ? { fixed } : {}),
      error: [
        'The build compiled but does not pass the checks CI runs on main.',
        'Fix every error listed below; formatting has already been corrected.',
        '',
        ...failures,
      ].join('\n'),
    }
  }

  console.log('  static checks passed')
  return { success: true, ...(fixed ? { fixed } : {}) }
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

  // Check 5: every token name in the emitted CSS actually resolved.
  //
  // A build can exit 0, produce a healthy 30KB stylesheet, and still ship
  // `font-size:5xl` — Panda passes an unknown token through as a literal and
  // the browser drops the declaration. On 2026-08-30 that put the home hero at
  // 32px on mobile against an approved 64px mockup, and nothing noticed. See
  // scripts/utils/token-gate.js and #252.
  try {
    const gate = checkTokenResolution({ root: ROOT, ownedFiles: MUTABLE_FILES })
    for (const w of gate.warnings) {
      const what =
        w.kind === 'numeric'
          ? `is not a ${w.category} token, so Panda shipped ${w.value}px`
          : 'does not resolve to any token'
      console.warn(
        `  ⚠ ${w.files.join(', ')}: ${w.property}: '${w.authoredValue ?? w.value}' ${what}` +
          ' (not a file the nightly agents own, so not blocking)'
      )
    }
    if (!gate.ok) errors.push(gate.error)
    else if (gate.warnings.length === 0) console.log('  every token in the emitted CSS resolved')
  } catch (err) {
    // A gate that throws must not be the reason a good build is thrown away.
    console.warn(`  token resolution gate skipped: ${err.message}`)
  }

  return { success: errors.length === 0, errors }
}
