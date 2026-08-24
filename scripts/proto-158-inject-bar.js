#!/usr/bin/env node
/**
 * PROTOTYPE — issue #158. Throwaway.
 *
 * Injects three variants of the archive frame into copies of real snapshots,
 * so the bar can be judged sitting on top of designs it was not made for.
 *
 * The bar must survive as plain HTML + CSS: a sealed snapshot's /assets/*.js
 * are 404 (see #156), so nothing here may depend on a script running.
 *
 * Output: public/_proto-158/<variant>/<date>/  — served by the dev server.
 * Run: node scripts/proto-158-inject-bar.js
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, cpSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'

const PUB = 'public/archive'
const OUT = 'public/_proto-158'

/**
 * Days chosen for maximum visual disagreement, by the background that actually
 * renders. Resolving `--colors-bg` naively reads the `.light` block, which is
 * wrong: the theme-init script does not survive capture (0 of 120 snapshots
 * carry it), so no class is ever applied and the unscoped rules win.
 * Effective spread across 118 snapshots: 18 light, 100 dark.
 */
const DAYS = [
  { date: '2026-06-10', note: 'near-black void  #01070e  L=0.002' },
  { date: '2026-06-15', note: 'paper white      #fafaf8  L=0.955' },
  { date: '2026-07-17', note: 'saturated green  #07724a  L=0.126' },
  { date: '2026-08-23', note: 'newest date — exercises the no-next-day end of range' },
]

const PAGES = ['index.html', 'about.html']

const allDates = readdirSync(PUB)
  .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && existsSync(join(PUB, d, 'index.html')))
  .sort()

/** #158: prev/next must skip gaps, and go dead at the ends of the range. */
function neighbours(date) {
  const i = allDates.indexOf(date)
  return { prev: i > 0 ? allDates[i - 1] : null, next: i < allDates.length - 1 ? allDates[i + 1] : null }
}

function pretty(d) {
  return new Date(`${d}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// The fixed neutral identity, matching the archive.* tokens from #157.
const INK = '#e8e8ea'
const DIM = '#8a8a93'
const GROUND = 'rgba(14,14,16,0.92)'
const LINE = 'rgba(255,255,255,0.14)'

const BASE_CSS = `
.pf,.pf *{box-sizing:border-box}
.pf{position:fixed;z-index:2147483647;font:12px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;
  letter-spacing:.04em;color:${INK};-webkit-font-smoothing:antialiased}
.pf a{color:${INK};text-decoration:none;white-space:nowrap}
.pf a:hover{text-decoration:underline}
.pf .dead{color:${DIM};opacity:.45;pointer-events:none}
.pf .sep{color:${DIM};opacity:.5}
.pf .date{color:${DIM}}
`

/** A — full-width top rail. Always visible. Displaces the design instead of covering it. */
function variantA({ date, prev, next }) {
  return {
    css: `${BASE_CSS}
html{scroll-padding-top:44px}
body{padding-top:44px!important}
.pf-a{top:0;left:0;right:0;height:44px;display:flex;align-items:center;gap:14px;
  padding:0 16px;background:${GROUND};backdrop-filter:blur(14px);
  border-bottom:1px solid ${LINE}}
.pf-a .grow{flex:1}
`,
    html: `<div class="pf pf-a">
  <a href="/archive">← All 123 designs</a>
  <span class="sep">/</span>
  <span class="date">${pretty(date)}</span>
  <span class="grow"></span>
  ${prev ? `<a href="/archive/${prev}/">← ${prev}</a>` : `<span class="dead">← earliest</span>`}
  ${next ? `<a href="/archive/${next}/">${next} →</a>` : `<span class="dead">latest →</span>`}
  <span class="sep">/</span>
  <a href="/how/${date}">How this was made</a>
</div>`,
  }
}

/** B — bottom-centre pill. Always visible, overlays rather than displacing. */
function variantB({ date, prev, next }) {
  return {
    css: `${BASE_CSS}
.pf-b{bottom:18px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:12px;
  padding:9px 14px;background:${GROUND};backdrop-filter:blur(14px);
  border:1px solid ${LINE};border-radius:999px;box-shadow:0 8px 30px rgba(0,0,0,.4);
  max-width:calc(100vw - 32px);overflow:hidden}
`,
    html: `<div class="pf pf-b">
  <a href="/archive">← Archive</a>
  <span class="sep">/</span>
  ${prev ? `<a href="/archive/${prev}/" title="${prev}">←</a>` : `<span class="dead">←</span>`}
  <span class="date">${pretty(date)}</span>
  ${next ? `<a href="/archive/${next}/" title="${next}">→</a>` : `<span class="dead">→</span>`}
  <span class="sep">/</span>
  <a href="/how/${date}">How</a>
</div>`,
  }
}

/**
 * C — hairline that expands on hover or keyboard focus. CSS-only, no JS,
 * because a sealed snapshot cannot run any.
 */
function variantC({ date, prev, next }) {
  return {
    css: `${BASE_CSS}
.pf-c{top:0;left:0;right:0;height:6px;overflow:hidden;
  background:${GROUND};border-bottom:1px solid ${LINE};
  transition:height .18s ease}
.pf-c:hover,.pf-c:focus-within{height:44px}
.pf-c .row{height:44px;display:flex;align-items:center;gap:14px;padding:0 16px;
  opacity:0;transition:opacity .18s ease}
.pf-c:hover .row,.pf-c:focus-within .row{opacity:1}
.pf-c .grow{flex:1}
.pf-c .grip{position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:54px;height:6px;background:${DIM};opacity:.55;border-radius:0 0 3px 3px}
.pf-c:hover .grip,.pf-c:focus-within .grip{opacity:0}
`,
    html: `<div class="pf pf-c">
  <span class="grip"></span>
  <div class="row">
    <a href="/archive">← All 123 designs</a>
    <span class="sep">/</span>
    <span class="date">${pretty(date)}</span>
    <span class="grow"></span>
    ${prev ? `<a href="/archive/${prev}/">← ${prev}</a>` : `<span class="dead">← earliest</span>`}
    ${next ? `<a href="/archive/${next}/">${next} →</a>` : `<span class="dead">latest →</span>`}
    <span class="sep">/</span>
    <a href="/how/${date}">How this was made</a>
  </div>
</div>`,
  }
}

const VARIANTS = { A: variantA, B: variantB, C: variantC }

if (existsSync(OUT)) rmSync(OUT, { recursive: true })

let written = 0
for (const [key, build] of Object.entries(VARIANTS)) {
  for (const { date } of DAYS) {
    const src = join(PUB, date)
    if (!existsSync(src)) {
      console.warn(`  skip ${date} — no snapshot`)
      continue
    }
    const dst = join(OUT, key, date)
    mkdirSync(dirname(dst), { recursive: true })
    cpSync(src, dst, { recursive: true })

    const { prev, next } = neighbours(date)
    const { css, html } = build({ date, prev, next })

    for (const page of PAGES) {
      const p = join(dst, page)
      if (!existsSync(p)) continue
      let t = readFileSync(p, 'utf8')
      // Inject last so the frame's rules win without !important games.
      t = t.replace(/<\/head>/i, `<style id="proto-frame">${css}</style></head>`)
      t = t.replace(/<\/body>/i, `${html}</body>`)
      writeFileSync(p, t, 'utf8')
      written++
    }
  }
}
console.log(`injected frame into ${written} pages across ${Object.keys(VARIANTS).length} variants`)
console.log(`open: /_proto-158/<A|B|C>/<date>/index.html`)
for (const d of DAYS) console.log(`  ${d.date}  ${d.note}`)
