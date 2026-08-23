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
