#!/usr/bin/env node

/**
 * Pin each page's inline scripts by hash, in a `<meta>` CSP the build controls.
 *
 * `vercel.json` sends `script-src 'self' 'unsafe-inline'` for the whole site.
 * That header is static, but the stream barrier TanStack emits in every
 * prerendered page embeds a build timestamp and hashed asset paths, so no
 * fixed header value can hash it and static hosting cannot mint a per-request
 * nonce. The build knows the exact bytes it wrote, though, at the moment it
 * writes them — so this step reads each page back, refuses to ship any inline
 * script it doesn't recognize by name, and writes a per-page
 * `Content-Security-Policy` meta that pins exactly the scripts that page has.
 * Browsers enforce the intersection of the header and the meta, so the header
 * stays the outer bound and this is the real fence. See issue #332.
 *
 * Known shapes, and only these three are ever accepted:
 *   - theme-init:              THEME_INIT_SCRIPT, verbatim, from
 *                              scripts/templates/__root.tsx.template
 *   - tsr-scroll-restoration:  TanStack's scroll-restoration script
 *   - tsr-stream-barrier:      TanStack's `$tsr` stream barrier (the one that
 *                              differs every build)
 *
 * `dist/client/404.html` is copied verbatim from `public/404.html` — a
 * deliberately static page (see the comment on `notFoundComponent` in
 * `__root.tsx.template`) that carries no script of any kind. It is skipped
 * here for the same reason `archive/<date>/` is: there is nothing on it for
 * this step to pin, and the site header already covers it.
 *
 * @module
 */

import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { isMain } from './utils/cli.js'
import { ROOT } from './utils/file-manager.js'

/** Matches an inline `<script>` element: tag, attributes, body, close tag. */
const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi

/** Matches an existing CSP meta tag, so re-running this step is idempotent. */
const CSP_META = /<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/gi

const HEAD_OPEN = /<head[^>]*>/i

let themeInitScriptCache = null

/**
 * Read `THEME_INIT_SCRIPT` out of the template, verbatim, rather than
 * duplicating its text here where the two copies could drift.
 *
 * @param {{ root?: string }} [options]
 * @returns {string}
 */
export function readThemeInitScript({ root = ROOT } = {}) {
  const templatePath = path.join(root, 'scripts/templates/__root.tsx.template')
  const source = readFileSync(templatePath, 'utf8')
  const match = source.match(/const THEME_INIT_SCRIPT = `([\s\S]*?)`\n/)
  if (!match) {
    throw new Error(`THEME_INIT_SCRIPT not found in ${templatePath}`)
  }
  return match[1]
}

function themeInitScript() {
  if (themeInitScriptCache === null) themeInitScriptCache = readThemeInitScript()
  return themeInitScriptCache
}

/**
 * Every inline `<script>` in `html` — one without a `src` attribute, since a
 * script that loads from a URL has nothing inline to pin.
 *
 * `application/json` and `application/ld+json` scripts never execute, so they
 * are kept out of `scripts` (the allowlist has nothing to say about them) but
 * still returned, in `jsonScripts`, so a caller auditing a page can see them.
 *
 * @param {string} html
 * @returns {{
 *   scripts: Array<{ attrs: string, body: string, start: number, end: number }>,
 *   jsonScripts: Array<{ attrs: string, body: string, start: number, end: number }>,
 * }}
 */
export function inlineScripts(html) {
  const scripts = []
  const jsonScripts = []
  for (const match of html.matchAll(SCRIPT_TAG)) {
    const [raw, attrs] = match
    if (/\bsrc\s*=/i.test(attrs)) continue
    const entry = {
      attrs,
      body: normalizeScriptBody(match[2]),
      start: match.index,
      end: match.index + raw.length,
    }
    if (/\btype\s*=\s*["']application\/(?:json|ld\+json)["']/i.test(attrs)) {
      jsonScripts.push(entry)
    } else {
      scripts.push(entry)
    }
  }
  return { scripts, jsonScripts }
}

const NUL = String.fromCharCode(0)

/**
 * The HTML parsing spec requires every conforming parser to replace a literal
 * NUL byte (U+0000) anywhere in the input stream with U+FFFD REPLACEMENT
 * CHARACTER before it reaches script content — see "Preprocessing the input
 * stream" in the HTML Standard. TanStack's stream barrier embeds one where
 * the root route's dehydrated id would otherwise go, so a hash taken over the
 * raw file bytes does not match the hash a browser computes over what it
 * actually parsed, and CSP silently blocks the very script this step exists
 * to allow. Found by hand: a page pinned without this normalization loaded
 * clean in every automated check, then failed with a live CSP violation the
 * moment a real browser executed it. Matching what a browser hashes is the
 * one thing `cspHash`'s doc comment promises, so the fix belongs here, not in
 * a rendered exception to it.
 *
 * @param {string} body
 * @returns {string}
 */
function normalizeScriptBody(body) {
  return body.split(NUL).join('\uFFFD')
}

/**
 * Which of the three known shapes an inline script is, or `null` if it is
 * none of them — the signal `pinHtml` uses to refuse a build.
 *
 * @param {{ attrs: string, body: string }} script
 * @returns {'theme-init' | 'tsr-scroll-restoration' | 'tsr-stream-barrier' | null}
 */
export function classifyScript({ attrs, body }) {
  if (body === themeInitScript()) return 'theme-init'
  if (body.includes('tsr-scroll-restoration')) return 'tsr-scroll-restoration'
  if (/class=["']\$tsr["']/.test(attrs) || /id=["']\$tsr-stream-barrier["']/.test(attrs)) {
    return 'tsr-stream-barrier'
  }
  return null
}

/**
 * The CSP `sha256-` source for a script body — hashed exactly as written, no
 * trimming, because that is what a browser hashes.
 *
 * @param {string} body
 * @returns {string}
 */
export function cspHash(body) {
  const digest = createHash('sha256').update(body, 'utf8').digest('base64')
  return `sha256-${digest}`
}

/**
 * Pin one page: classify its inline scripts, hash the ones the allowlist
 * recognizes, and inject a `Content-Security-Policy` meta — the first child
 * of `<head>`, ahead of every script and preload — carrying exactly those
 * hashes. Idempotent: re-running on already-pinned HTML replaces the old meta
 * with the same one, rather than stacking a second.
 *
 * @param {string} html
 * @returns {{
 *   html: string,
 *   hashes: string[],
 *   rejected: Array<{ start: number, end: number, preview: string }>,
 * }}
 */
export function pinHtml(html) {
  const { scripts } = inlineScripts(html)

  const hashes = []
  const seenHashes = new Set()
  const rejected = []

  for (const script of scripts) {
    const kind = classifyScript(script)
    if (kind === null) {
      rejected.push({
        start: script.start,
        end: script.end,
        preview: html.slice(script.start, script.start + 120),
      })
      continue
    }
    const hash = cspHash(script.body)
    if (!seenHashes.has(hash)) {
      seenHashes.add(hash)
      hashes.push(hash)
    }
  }

  const headOpenMatch = html.match(HEAD_OPEN)
  if (!headOpenMatch) {
    throw new Error('pinHtml: no <head> element found')
  }
  const headOpenEnd = headOpenMatch.index + headOpenMatch[0].length
  const headCloseIndex = html.indexOf('</head>', headOpenEnd)
  if (headCloseIndex === -1) {
    throw new Error('pinHtml: no </head> found')
  }

  const before = html.slice(0, headOpenEnd)
  const headInner = html.slice(headOpenEnd, headCloseIndex).replace(CSP_META, '')
  const after = html.slice(headCloseIndex)

  const sources = ["'self'", ...hashes.map((h) => `'${h}'`)].join(' ')
  const metaTag = `<meta http-equiv="Content-Security-Policy" content="script-src ${sources}">`

  return { html: `${before}${metaTag}${headInner}${after}`, hashes, rejected }
}

/**
 * Is `relativePath` (forward-slash, relative to `dist/client`) one this step
 * should pin?
 *
 * Skips `archive/<date>/…`, the preserved snapshots covered by their own
 * script-forbidding CSP header, and `404.html`, the static page with no
 * script at all.
 *
 * @param {string} relativePath
 * @returns {boolean}
 */
export function shouldPin(relativePath) {
  const segments = relativePath.split('/')
  if (segments[0] === 'archive' && segments.length > 2) return false
  if (relativePath === '404.html') return false
  return true
}

/**
 * Walk `dist/client`, pin every eligible HTML file, and report the outcome.
 *
 * Nothing is written if any file has a rejected script: a build the allowlist
 * refuses should fail clean rather than ship half-pinned.
 *
 * @param {{ root?: string }} [options]
 * @returns {{
 *   success: boolean,
 *   files: Array<{ file: string, hashCount: number }>,
 *   rejected: Array<{ file: string, start: number, end: number, preview: string }>,
 * }}
 */
export function pinBuildOutput({ root = ROOT } = {}) {
  const distClient = path.join(root, 'dist/client')
  const relativePaths = readdirSync(distClient, { recursive: true })
    .filter((p) => p.endsWith('.html') && shouldPin(p))
    .sort()

  const writes = []
  const files = []
  const allRejected = []

  for (const relativePath of relativePaths) {
    const filePath = path.join(distClient, relativePath)
    const html = readFileSync(filePath, 'utf8')
    const { html: pinned, hashes, rejected } = pinHtml(html)
    files.push({ file: relativePath, hashCount: hashes.length })
    writes.push({ filePath, pinned })
    for (const r of rejected) allRejected.push({ file: relativePath, ...r })
  }

  if (allRejected.length > 0) {
    return { success: false, files, rejected: allRejected }
  }

  for (const { filePath, pinned } of writes) {
    writeFileSync(filePath, pinned, 'utf8')
  }

  return { success: true, files, rejected: [] }
}

function main() {
  const start = Date.now()
  const { success, files, rejected } = pinBuildOutput()

  for (const { file, hashCount } of files) {
    console.log(`  ${file}: ${hashCount} hash${hashCount === 1 ? '' : 'es'}`)
  }

  if (!success) {
    console.error(`[pin-inline-scripts] refused ${rejected.length} inline script(s):`)
    for (const r of rejected) {
      console.error(`  ${r.file}:${r.start} — ${JSON.stringify(r.preview)}`)
    }
    process.exit(1)
  }

  console.log(`[pin-inline-scripts] pinned ${files.length} file(s) in ${Date.now() - start}ms`)
}

if (isMain(import.meta.url)) {
  main()
}
