import { defineConfig, devices } from '@playwright/test'

// In CI: set PREVIEW_URL to Vercel preview deploy URL
// Locally: run `pnpm build && pnpm preview` or set PREVIEW_URL=http://localhost:3000
const PREVIEW_URL = process.env.PREVIEW_URL || 'http://localhost:3000'
const DEV_PORT = 3001
const DEV_URL = `http://localhost:${DEV_PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
  },
  webServer: {
    command: `pnpm exec vite --port ${DEV_PORT}`,
    port: DEV_PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  projects: [
    {
      name: 'site-health',
      testMatch: '**/site-health.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: PREVIEW_URL,
      },
    },
    {
      name: 'dev-panel',
      testMatch: '**/dev-panel.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: DEV_URL,
      },
    },
  ],
})
