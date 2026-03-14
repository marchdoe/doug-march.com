import { test, expect } from '@playwright/test'

// Runs against PREVIEW_URL (Vercel preview deploy, or localhost:4173 for local preview)
// Usage: PREVIEW_URL=https://your-preview.vercel.app pnpm test:e2e:site

test.describe('site health', () => {
  test('home page loads without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    const response = await page.goto('/')
    expect(response?.status()).toBeLessThan(500)
    await expect(page).not.toHaveURL(/\/error/)
    expect(errors).toHaveLength(0)
  })

  test('about page loads without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    const response = await page.goto('/about')
    expect(response?.status()).toBeLessThan(500)
    await expect(page).not.toHaveURL(/\/error/)
    expect(errors).toHaveLength(0)
  })

  test('work slug page loads without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    const response = await page.goto('/work/spaceman')
    expect(response?.status()).toBeLessThan(500)
    await expect(page).not.toHaveURL(/\/error/)
    expect(errors).toHaveLength(0)
  })

  test('elements page loads without errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    const response = await page.goto('/elements')
    expect(response?.status()).toBeLessThan(500)
    await expect(page).not.toHaveURL(/\/error/)
    expect(errors).toHaveLength(0)
  })
})
