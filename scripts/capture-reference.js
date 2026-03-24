#!/usr/bin/env node
/**
 * Standalone script to capture a PNG screenshot of the running dev server
 * and save it to references/.
 *
 * Usage: node scripts/capture-reference.js --port=5173 --output=references/own-2026-03-20-123.png
 *
 * Runs as a child process from vite.config.ts middleware so Vite never
 * tries to bundle playwright.
 */

import { chromium } from '@playwright/test'
import { writeFileSync } from 'fs'

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v]
  })
)

const port = args.port || '5173'
const output = args.output

if (!output) {
  console.error('Missing --output argument')
  process.exit(1)
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(`http://localhost:${port}/`, { waitUntil: 'load', timeout: 15000 })
await page.waitForTimeout(1500) // wait for fonts/CSS
const screenshot = await page.screenshot({ type: 'png', fullPage: false })
await browser.close()

writeFileSync(output, screenshot)
console.log(`screenshot saved: ${output}`)
