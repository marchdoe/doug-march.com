import { describe, expect, it } from 'vitest'
import {
  buildScreenshotCriticBlocks,
  MAX_SCREENSHOT_CRITIC_IMAGES,
} from '../../../scripts/agents/screenshot-critic.js'

const baseCtx = {
  enrichedBrief: 'the brief',
  screenshotBuffer: {
    jpeg: Buffer.from([0xff, 0xd8, 0xff]),
    darkJpeg: Buffer.from([0xff, 0xd8, 0xfe]),
  },
}

describe('buildScreenshotCriticBlocks', () => {
  it('carries light + dark image blocks with no mockup or reference', () => {
    const blocks = buildScreenshotCriticBlocks(baseCtx)
    const images = blocks.filter((b) => b.type === 'image')
    expect(images).toHaveLength(2)
  })

  it('adds a mockup image block when a mockup screenshot is provided', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      mockupScreenshot: { jpeg: Buffer.from([0x01]) },
    })
    expect(blocks.filter((b) => b.type === 'image')).toHaveLength(3)
    expect(blocks.some((b) => b.type === 'text' && b.text.includes('APPROVED MOCKUP'))).toBe(true)
  })

  it('adds the best-rated reference as a fourth image, labeled, PNG media type', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      mockupScreenshot: { jpeg: Buffer.from([0x01]) },
      bestReference: { buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]), description: 'ref' },
    })
    const images = blocks.filter((b) => b.type === 'image')
    expect(images).toHaveLength(4)
    expect(images[images.length - 1].source.media_type).toBe('image/png')
    expect(blocks.some((b) => b.type === 'text' && b.text.includes("owner's highest-rated"))).toBe(
      true
    )
  })

  it('degrades gracefully with no reference: no extra block, no image added', () => {
    const blocks = buildScreenshotCriticBlocks({ ...baseCtx, bestReference: null })
    expect(blocks.filter((b) => b.type === 'image')).toHaveLength(2)
    expect(blocks.some((b) => b.type === 'text' && b.text.includes('highest-rated'))).toBe(false)
  })

  it('never exceeds MAX_SCREENSHOT_CRITIC_IMAGES even when a reference is present', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      mockupScreenshot: { jpeg: Buffer.from([0x01]) },
      bestReference: { buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]), description: 'ref' },
    })
    expect(blocks.filter((b) => b.type === 'image').length).toBeLessThanOrEqual(
      MAX_SCREENSHOT_CRITIC_IMAGES
    )
  })

  it('includes design references as text when provided', () => {
    const blocks = buildScreenshotCriticBlocks({ ...baseCtx, references: 'reference notes' })
    const text = blocks
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    expect(text).toContain('reference notes')
  })

  it('carries the measured faults as text, ahead of every image', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      measuredFaults: '## Measured layout faults\n\n- [error] /experiments at 1440px: 657px wider',
    })
    const firstImage = blocks.findIndex((b) => b.type === 'image')
    const faultsAt = blocks.findIndex((b) => b.type === 'text' && b.text.includes('657px wider'))
    expect(faultsAt).toBeGreaterThan(-1)
    // The model should read what is already established before it starts
    // forming opinions from a downscaled JPEG.
    expect(faultsAt).toBeLessThan(firstImage)
  })

  it('omits the faults block entirely when nothing was measured wrong', () => {
    const blocks = buildScreenshotCriticBlocks({ ...baseCtx, measuredFaults: '' })
    expect(blocks.some((b) => b.type === 'text' && b.text.includes('Measured layout faults'))).toBe(
      false
    )
  })

  it('adds route captures as PNG, announced once', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      routeShots: [
        { label: 'A project page (/work/spaceman):', png: Buffer.from([0x89, 0x50]) },
        { label: 'The share card (/og):', png: Buffer.from([0x89, 0x51]) },
      ],
    })
    const images = blocks.filter((b) => b.type === 'image')
    expect(images).toHaveLength(4)
    expect(images.slice(2).every((i) => i.source.media_type === 'image/png')).toBe(true)
    const announcements = blocks.filter(
      (b) => b.type === 'text' && b.text.includes('Other surfaces this build rewrote')
    )
    expect(announcements).toHaveLength(1)
  })

  it('drops route captures rather than crowding out the calibration reference', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      mockupScreenshot: { jpeg: Buffer.from([0x01]) },
      routeShots: [
        { label: 'one:', png: Buffer.from([0x01]) },
        { label: 'two:', png: Buffer.from([0x02]) },
        { label: 'three:', png: Buffer.from([0x03]) },
        { label: 'four:', png: Buffer.from([0x04]) },
      ],
      bestReference: { buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]), description: 'ref' },
    })
    const images = blocks.filter((b) => b.type === 'image')
    expect(images).toHaveLength(MAX_SCREENSHOT_CRITIC_IMAGES)
    // The reference is the last image, so calibration survives the squeeze.
    expect(images[images.length - 1].source.data).toBe(
      Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString('base64')
    )
  })

  it('fits mockup, both schemes, both header crops, two routes and a reference exactly', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      screenshotBuffer: { ...baseCtx.screenshotBuffer, headerJpeg: Buffer.from([0x05]) },
      mockupScreenshot: { jpeg: Buffer.from([0x01]), headerJpeg: Buffer.from([0x06]) },
      routeShots: [
        { label: 'A project page (/work/spaceman):', png: Buffer.from([0x02]) },
        { label: 'The share card (/og):', png: Buffer.from([0x03]) },
      ],
      bestReference: { buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]), description: 'ref' },
    })
    const images = blocks.filter((b) => b.type === 'image')
    expect(images).toHaveLength(8)
    expect(MAX_SCREENSHOT_CRITIC_IMAGES).toBe(8)
    // Crops come before route shots, route shots before the reference — the
    // drop order when the ceiling binds is the reverse of this.
    const labels = blocks.filter((b) => b.type === 'text').map((b) => b.text)
    const at = (needle) => labels.findIndex((t) => t.includes(needle))
    expect(at('RENDERED page')).toBeLessThan(at('Other surfaces'))
    expect(at('Other surfaces')).toBeLessThan(at('highest-rated'))
  })

  it('never inlines screenshot bytes as base64 text', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...baseCtx,
      mockupScreenshot: { jpeg: Buffer.from([0x01]) },
      bestReference: { buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]), description: 'ref' },
    })
    const text = blocks
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    expect(text).not.toContain('base64')
  })
})
