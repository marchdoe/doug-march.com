import { chromium } from '@playwright/test'

const CHECKS = {
  horizontalScroll: () =>
    document.documentElement.scrollWidth > window.innerWidth,
  clippedElements: () => {
    const vw = window.innerWidth
    const out = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.right > vw + 1) {
        out.push({
          tag: el.tagName,
          text: (el.textContent || '').trim().slice(0, 50),
          right: Math.round(r.right),
        })
      }
    }
    return out
  },
  headerOverlap: () => {
    const header = document.querySelector('header') || document.querySelector('nav')
    if (!header) return []
    const kids = [...header.children].map(el => ({ el, r: el.getBoundingClientRect() }))
    const overlaps = []
    for (let i = 0; i < kids.length; i++) {
      for (let j = i + 1; j < kids.length; j++) {
        const a = kids[i].r, b = kids[j].r
        const xOverlap = !(a.right <= b.left || b.right <= a.left)
        const yOverlap = !(a.bottom <= b.top || b.bottom <= a.top)
        if (xOverlap && yOverlap) {
          overlaps.push({
            a: kids[i].el.tagName + (kids[i].el.className ? '.' + kids[i].el.className : ''),
            b: kids[j].el.tagName + (kids[j].el.className ? '.' + kids[j].el.className : ''),
          })
        }
      }
    }
    return overlaps
  },
  bodyTextSize: () => {
    const root = document.querySelector('main') || document.body
    let min = Infinity
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let n
    while ((n = walker.nextNode())) {
      const text = (n.textContent || '').trim()
      if (text.length < 8) continue
      const parent = n.parentElement
      if (!parent) continue
      const fs = parseFloat(getComputedStyle(parent).fontSize)
      if (fs && fs < min) min = fs
    }
    if (min === Infinity) return { min: null, passing: true }
    return { min: Math.round(min * 10) / 10, passing: min >= 16 }
  },
  tapTargetFailures: (viewportWidth) => {
    if (viewportWidth > 768) return []
    const selectors = 'a[href], button, [role="button"], input[type="button"], input[type="submit"]'
    const out = []
    for (const el of document.querySelectorAll(selectors)) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.width < 44 || r.height < 44) {
        out.push({
          tag: el.tagName,
          text: (el.textContent || '').trim().slice(0, 30),
          w: Math.round(r.width),
          h: Math.round(r.height),
        })
      }
    }
    return out
  },
  lineLengthFailures: () => {
    // Approximate: chars per paragraph / rendered line count.
    // Rendered lines ≈ clientHeight / computed line-height.
    const out = []
    for (const p of document.querySelectorAll('p')) {
      const text = (p.textContent || '').trim()
      if (text.length < 100) continue
      const cs = getComputedStyle(p)
      const lh = parseFloat(cs.lineHeight) ||
                 (parseFloat(cs.fontSize) * 1.5)
      const lines = Math.max(1, Math.round(p.clientHeight / lh))
      const avgChars = text.length / lines
      if (avgChars > 75) {
        out.push({
          chars: text.length,
          lines,
          avgPerLine: Math.round(avgChars),
          excerpt: text.slice(0, 40),
        })
      }
    }
    return out
  },
}

/**
 * Score a URL across viewports.
 * Each check runs in the page context after setting viewport.
 *
 * @param {string} url
 * @param {Array<{name, width, height}>} viewports
 * @param {object} [opts]
 * @param {import('@playwright/test').Browser} [opts.browser] - optional
 *   externally-managed browser (tests reuse one; production launches its own)
 * @returns {Promise<object>} metrics
 */
export async function scoreResponsive(url, viewports, opts = {}) {
  const ownBrowser = !opts.browser
  const browser = opts.browser || (await chromium.launch({ headless: true }))

  try {
    const page = await browser.newPage()
    const viewportResults = {}

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      const checks = {}
      for (const [name, fn] of Object.entries(CHECKS)) {
        // Pass viewport width as second arg — most checks ignore it.
        checks[name] = await page.evaluate(
          ([fnStr, vw]) => {
            // eslint-disable-next-line no-new-func
            const f = new Function('return ' + fnStr)()
            return f(vw)
          },
          [fn.toString(), vp.width]
        )
      }

      viewportResults[vp.name] = {
        width: vp.width,
        height: vp.height,
        checks,
      }
    }

    await page.close()
    return { viewports: viewportResults }
  } finally {
    if (ownBrowser) await browser.close()
  }
}
