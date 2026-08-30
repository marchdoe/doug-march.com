import { test, expect } from '@playwright/test'

// Runs against the Vite dev server playwright.config.ts starts for the
// dev-panel project. Usage: pnpm test:e2e:dev
//
// No fixed sleeps: every assertion below is a locator wait with its own
// timeout, so a slow server makes the test wait, not fail — and a fast one
// makes it fast. The old `waitForTimeout(1000)` on every test did neither.

test.describe('/dev panel', () => {
  test('loads without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(String(err)))

    await page.goto('/dev')
    // The panel is client-rendered; wait for something it draws rather than
    // for the network to go quiet, which says nothing about React.
    await expect(page.getByText('SIGNALS').first()).toBeVisible({ timeout: 10000 })
    expect(errors).toEqual([])
  })

  test('shows signals data', async ({ page }) => {
    await page.goto('/dev')
    await expect(page.getByText('SIGNALS').first()).toBeVisible({ timeout: 10000 })
  })

  test('shows the archive section', async ({ page }) => {
    await page.goto('/dev')
    await expect(page.getByText('Archive').first()).toBeVisible({ timeout: 10000 })
  })

  test('offers to run the pipeline', async ({ page }) => {
    await page.goto('/dev')
    await expect(page.getByText('Run Pipeline').first()).toBeVisible({ timeout: 10000 })
  })
})
