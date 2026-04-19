import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdtemp, rm, stat } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { screenshotViewports } from '../../scripts/utils/viewport-screenshotter.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLEAN = `file://${path.join(__dirname, '../fixtures/responsive/clean.html')}`

describe('viewport-screenshotter', () => {
  let outDir
  beforeAll(async () => {
    outDir = await mkdtemp(path.join(tmpdir(), 'vpscreen-'))
  })
  afterAll(async () => {
    await rm(outDir, { recursive: true, force: true })
  })

  it('writes one PNG per viewport', async () => {
    const viewports = [
      { name: 'mobile', width: 360, height: 640 },
      { name: 'tablet', width: 768, height: 1024 },
    ]
    const results = await screenshotViewports(CLEAN, viewports, outDir)
    expect(results.length).toBe(2)
    for (const r of results) {
      const s = await stat(r.path)
      expect(s.size).toBeGreaterThan(500)
      expect(r.path.endsWith(`${r.name}.png`)).toBe(true)
    }
  }, 30_000)
})
