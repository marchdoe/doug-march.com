/**
 * Capture a static HTML snapshot of the portfolio site.
 *
 * Starts `vite preview` on a temporary port, crawls each portfolio route,
 * inlines CSS, strips JS, rewrites nav links, and saves self-contained HTML files.
 *
 * @module
 */

import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { ROOT } from './file-manager.js'

/**
 * Inline CSS, strip JavaScript, and rewrite nav links for self-contained browsing.
 * @param {string} html - raw HTML from the server
 * @param {string} baseUrl - e.g. "http://localhost:14321"
 * @returns {Promise<string>} processed HTML
 */
async function processHtml(html, baseUrl) {
  // 1. Inline CSS: find <link rel="stylesheet" href="..."> tags
  //    Fetch each CSS URL from the running server, replace <link> with <style>
  const cssLinkRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi
  let processed = html
  const cssLinks = [...html.matchAll(cssLinkRegex)]
  for (const match of cssLinks) {
    const cssUrl = match[1]
    const fullUrl = cssUrl.startsWith('http') ? cssUrl : `${baseUrl}${cssUrl}`
    // Skip Google Fonts CSS (keep as external link)
    if (fullUrl.includes('fonts.googleapis.com')) continue
    try {
      const cssResp = await fetch(fullUrl)
      const cssText = await cssResp.text()
      processed = processed.replace(match[0], `<style>${cssText}</style>`)
    } catch {
      // Leave the link tag if fetch fails
    }
  }

  // 2. Remove all <script> tags and their contents
  processed = processed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // 3. Rewrite nav links for self-contained browsing
  processed = processed.replace(/href="\/"(?=[^a-z])/g, 'href="index.html"')
  processed = processed.replace(/href="\/about"/g, 'href="about.html"')
  processed = processed.replace(/href="\/work\/([^"]+)"/g, 'href="work/$1.html"')

  return processed
}

/**
 * Poll a URL until it returns HTTP 200.
 * @param {string} url
 * @param {number} timeoutMs
 * @param {number} intervalMs
 * @returns {Promise<void>}
 */
async function waitForServer(url, timeoutMs = 15000, intervalMs = 500) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const resp = await fetch(url)
      if (resp.ok) return
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, intervalMs))
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`)
}

/**
 * Capture a static HTML snapshot of every portfolio route.
 *
 * Starts vite preview, crawls routes, processes HTML, and writes files
 * to `archive/<date>/site/`.
 *
 * @param {string} date - archive date string, e.g. "2026-03-16"
 * @returns {Promise<void>}
 */
export async function captureSnapshot(date, buildId) {
  const port = 14000 + Math.floor(Math.random() * 1000)
  const baseUrl = `http://localhost:${port}`

  const child = spawn('npx', ['vite', 'preview', '--port', String(port)], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  try {
    console.log('  capturing snapshot...')

    // Wait for vite preview to be ready
    await waitForServer(`${baseUrl}/`)

    // Read project slugs from the source file
    const projectsSrc = await readFile(path.join(ROOT, 'app/content/projects.ts'), 'utf8')
    const slugs = [...projectsSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

    const routes = [
      { url: '/', file: 'index.html' },
      { url: '/about', file: 'about.html' },
      ...slugs.map((s) => ({ url: `/work/${s}`, file: `work/${s}.html` })),
    ]

    // Crawl each route
    for (const route of routes) {
      try {
        const resp = await fetch(`${baseUrl}${route.url}`)
        if (!resp.ok) {
          console.warn(`  snapshot: skipping ${route.url} (HTTP ${resp.status})`)
          route.html = null
          continue
        }
        const html = await resp.text()
        route.html = await processHtml(html, baseUrl)
      } catch (err) {
        console.warn(`  snapshot: skipping ${route.url} (${err.message})`)
        route.html = null
      }
    }

    // Save files — to build-specific directory if buildId provided, otherwise top-level
    const baseDir = buildId
      ? path.join(ROOT, 'archive', date, `build-${buildId}`)
      : path.join(ROOT, 'archive', date)
    const siteDir = path.join(baseDir, 'site')
    await mkdir(siteDir, { recursive: true })
    await mkdir(path.join(siteDir, 'work'), { recursive: true })

    // Also save to top-level site/ for backwards compatibility
    if (buildId) {
      const latestSiteDir = path.join(ROOT, 'archive', date, 'site')
      await mkdir(latestSiteDir, { recursive: true })
      await mkdir(path.join(latestSiteDir, 'work'), { recursive: true })
      for (const route of routes) {
        if (route.html === null) continue
        await writeFile(path.join(latestSiteDir, route.file), route.html, 'utf8')
      }
    }

    let saved = 0
    for (const route of routes) {
      if (route.html === null) continue
      const filePath = path.join(siteDir, route.file)
      await writeFile(filePath, route.html, 'utf8')
      console.log(`  snapshot: ${route.file}`)
      saved++
    }

    console.log(`  snapshot: ${saved} pages saved`)
  } finally {
    child.kill()
  }
}

/**
 * Capture a PNG screenshot of the rendered homepage.
 * Spins up a Vite preview server and uses Playwright to render and screenshot.
 *
 * Returns both encodings from one render: PNG for archive/public artifacts,
 * JPEG (q70) for critic prompts. Gradient-heavy designs produce ~900KB PNGs;
 * two of those base64'd made a 1.6MB critic prompt that the model answered
 * with 0 bytes (2026-07-10 run 2). The JPEG is typically 5-10x smaller.
 *
 * @param {number} [port] - Optional port if server is already running
 * @returns {Promise<{png: Buffer, jpeg: Buffer}>} image buffers
 */
export async function captureScreenshot(port) {
  const { chromium } = await import('playwright')

  let server = null
  let serverPort = port

  if (!serverPort) {
    serverPort = 14000 + Math.floor(Math.random() * 1000)
    server = spawn('npx', ['vite', 'preview', '--port', String(serverPort)], {
      cwd: ROOT,
      stdio: 'pipe',
    })

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Preview server timeout')), 15000)
      server.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('Local:')) {
          clearTimeout(timeout)
          resolve()
        }
      })
      server.on('error', (err) => {
        clearTimeout(timeout)
        reject(err)
      })
    })
  }

  try {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
    await page.goto(`http://localhost:${serverPort}/`, {
      waitUntil: 'networkidle',
    })
    await page.waitForTimeout(1000) // wait for fonts
    const png = await page.screenshot({ type: 'png', fullPage: false })
    const jpeg = await page.screenshot({ type: 'jpeg', quality: 70, fullPage: false })

    // Second capture with the OPPOSITE color scheme. The theme init script
    // follows prefers-color-scheme, so a headless capture only ever showed
    // the light variant — on days where the AD's canonical field is dark
    // (2026-07-10 run 2: "teal glowing out of near-black"), the critic was
    // judging a mode nobody art-directed. colorScheme must be set at page
    // creation, before the init script reads matchMedia.
    const darkPage = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      colorScheme: 'dark',
    })
    await darkPage.goto(`http://localhost:${serverPort}/`, { waitUntil: 'networkidle' })
    await darkPage.waitForTimeout(1000)
    const darkPng = await darkPage.screenshot({ type: 'png', fullPage: false })
    const darkJpeg = await darkPage.screenshot({ type: 'jpeg', quality: 70, fullPage: false })

    await browser.close()
    return { png, jpeg, darkPng, darkJpeg }
  } finally {
    if (server) server.kill()
  }
}

/**
 * Screenshot a local self-contained HTML file (the Mockup Designer's
 * mockup.html) without any server. External font links still load over
 * the network.
 *
 * @param {string} filePath - absolute path to the HTML file
 * @param {{ width?: number, height?: number }} [opts]
 * @returns {Promise<{png: Buffer, jpeg: Buffer}>} image buffers — PNG for
 *   archives, JPEG (q70) for critic prompts (see captureScreenshot)
 */
export async function captureHtmlFileScreenshot(filePath, { width = 1440, height = 900 } = {}) {
  const { chromium } = await import('playwright')
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width, height } })
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000) // fonts
    const png = await page.screenshot({ type: 'png', fullPage: false })
    const jpeg = await page.screenshot({ type: 'jpeg', quality: 70, fullPage: false })
    return { png, jpeg }
  } finally {
    await browser.close()
  }
}

/**
 * Capture a PNG screenshot of an arbitrary route on the built site.
 *
 * Spins up a Vite preview server (unless a port is supplied), renders the
 * route at the given viewport, and screenshots it. Used to capture the
 * runtime-generated /og card at the canonical 1200x630 OG dimensions.
 *
 * @param {string} route - route path, e.g. "/og"
 * @param {{ port?: number, width?: number, height?: number }} [opts]
 * @returns {Promise<Buffer>} PNG image buffer
 */
export async function captureRouteScreenshot(route, { port, width = 1200, height = 630 } = {}) {
  const { chromium } = await import('playwright')

  let server = null
  let serverPort = port

  if (!serverPort) {
    serverPort = 14000 + Math.floor(Math.random() * 1000)
    server = spawn('npx', ['vite', 'preview', '--port', String(serverPort)], {
      cwd: ROOT,
      stdio: 'pipe',
    })

    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Preview server timeout')), 15000)
      server.stdout.on('data', (chunk) => {
        if (chunk.toString().includes('Local:')) {
          clearTimeout(timeout)
          resolve()
        }
      })
      server.on('error', (err) => {
        clearTimeout(timeout)
        reject(err)
      })
    })
  }

  let browser = null
  try {
    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({ viewport: { width, height } })
    const response = await page.goto(`http://localhost:${serverPort}${route}`, {
      waitUntil: 'networkidle',
    })
    // Guard against capturing a 404 page. /og is unlinked, so it is never
    // prerendered or build-validated — if the engineer omitted og.tsx, the
    // route serves the notFound component. Throwing here lets the caller's
    // best-effort catch skip writing a broken share card.
    if (response && !response.ok()) {
      throw new Error(`route ${route} returned HTTP ${response.status()}`)
    }
    await page.waitForTimeout(1000) // wait for fonts
    return await page.screenshot({ type: 'png', fullPage: false })
  } finally {
    if (browser) await browser.close()
    if (server) server.kill()
  }
}
