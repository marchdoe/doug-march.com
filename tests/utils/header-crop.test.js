import { describe, it, expect } from 'vitest'
import { DEFAULT_HEADER_CROP_HEIGHT, headerCropRegion } from '../../scripts/utils/snapshot.js'
import { buildMockupCriticBlocks } from '../../scripts/agents/mockup-critic.js'
import {
  MAX_SCREENSHOT_CRITIC_IMAGES,
  buildScreenshotCriticBlocks,
} from '../../scripts/agents/screenshot-critic.js'

const VIEWPORT = { width: 1440, height: 900 }
const buf = (n) => Buffer.from(n)

describe('headerCropRegion', () => {
  it('takes a top band for a top bar', () => {
    expect(headerCropRegion('top-bar', { ...VIEWPORT, declaredHeightPx: 96 })).toEqual({
      x: 0,
      y: 0,
      width: 1440,
      height: 182,
    })
  })

  it('never goes below the default band, however short the header claims to be', () => {
    const r = headerCropRegion('top-bar', { ...VIEWPORT, declaredHeightPx: 40 })
    expect(r.height).toBe(DEFAULT_HEADER_CROP_HEIGHT)
  })

  it('leaves room under the declared height so an overflowing header is visible', () => {
    const r = headerCropRegion('top-bar', { ...VIEWPORT, declaredHeightPx: 300 })
    expect(r.height).toBeGreaterThan(300)
  })

  it('never asks for more than the viewport', () => {
    const r = headerCropRegion('top-bar', { ...VIEWPORT, declaredHeightPx: 800 })
    expect(r.height).toBeLessThanOrEqual(VIEWPORT.height)
  })

  it('crops a vertical rail for a marginal header, not a horizontal band', () => {
    const left = headerCropRegion('left-rail', VIEWPORT)
    expect(left).toEqual({ x: 0, y: 0, width: 490, height: 900 })
    const right = headerCropRegion('right-margin', VIEWPORT)
    expect(right.height).toBe(900)
    expect(right.x + right.width).toBe(1440)
  })

  it('crops the foot for a footer-only header', () => {
    const r = headerCropRegion('footer-only', { ...VIEWPORT, declaredHeightPx: 96 })
    expect(r.y + r.height).toBe(900)
    expect(r.width).toBe(1440)
  })

  it('still takes the top band when there is no nav — the brand is usually still there', () => {
    expect(headerCropRegion('none', VIEWPORT).y).toBe(0)
    expect(headerCropRegion(null, VIEWPORT).height).toBe(DEFAULT_HEADER_CROP_HEIGHT)
  })

  it('falls back to a 1440x900 viewport when none is given', () => {
    expect(headerCropRegion('top-bar')).toEqual({ x: 0, y: 0, width: 1440, height: 160 })
  })
})

describe('buildMockupCriticBlocks — the header crop', () => {
  const base = {
    screenshotBuffer: buf('page'),
    enrichedBrief: 'brief',
    measurables: 'canvas_utilization_min: 70',
    shell: 'brand_lockup: horizontal-md',
  }

  it('sends the header declaration and the crop as a second image', () => {
    const blocks = buildMockupCriticBlocks({
      ...base,
      header: 'placement: top-bar\nmark_px: 44',
      headerCrop: buf('crop'),
    })
    expect(blocks.filter((b) => b.type === 'image')).toHaveLength(2)
    const text = blocks
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    expect(text).toContain('## Header Declaration')
    expect(text).toContain('mark_px: 44')
    expect(text).toMatch(/2x crop of the header region/)
  })

  it('drops to one image when the crop failed, rather than failing the round', () => {
    const blocks = buildMockupCriticBlocks({
      ...base,
      header: 'placement: corner',
      headerCrop: null,
    })
    expect(blocks.filter((b) => b.type === 'image')).toHaveLength(1)
    expect(blocks.every((b) => b !== null)).toBe(true)
  })

  it('omits the header section entirely when nothing declared one', () => {
    const blocks = buildMockupCriticBlocks(base)
    const text = blocks
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    expect(text).not.toContain('## Header Declaration')
  })
})

describe('buildScreenshotCriticBlocks — the two header crops', () => {
  const base = {
    enrichedBrief: 'brief',
    screenshotBuffer: { jpeg: buf('light'), darkJpeg: buf('dark'), headerJpeg: buf('render-crop') },
    mockupScreenshot: { jpeg: buf('mockup'), headerJpeg: buf('mockup-crop') },
  }

  it('sends mockup, light, dark, and both header crops in order', () => {
    const blocks = buildScreenshotCriticBlocks({ ...base, header: 'mark_px: 44' })
    const images = blocks.filter((b) => b.type === 'image')
    expect(images).toHaveLength(5)
    expect(images.map((b) => Buffer.from(b.source.data, 'base64').toString())).toEqual([
      'mockup',
      'light',
      'dark',
      'mockup-crop',
      'render-crop',
    ])
  })

  it('carries the header declaration as text', () => {
    const text = buildScreenshotCriticBlocks({ ...base, header: 'mark_px: 44' })
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    expect(text).toContain('## Header Declaration')
    expect(text).toContain('mark_px: 44')
  })

  it('keeps the crops when a calibration reference would push past the ceiling', () => {
    const blocks = buildScreenshotCriticBlocks({
      ...base,
      header: 'mark_px: 44',
      bestReference: { buffer: buf('reference'), description: 'grade A' },
    })
    const images = blocks.filter((b) => b.type === 'image')
    expect(images.length).toBeLessThanOrEqual(MAX_SCREENSHOT_CRITIC_IMAGES)
    expect(images.map((b) => Buffer.from(b.source.data, 'base64').toString())).toContain(
      'render-crop'
    )
  })

  it('omits a crop that failed to capture without dropping the rest', () => {
    const blocks = buildScreenshotCriticBlocks({
      enrichedBrief: 'brief',
      screenshotBuffer: { jpeg: buf('light'), darkJpeg: buf('dark'), headerJpeg: null },
      mockupScreenshot: { jpeg: buf('mockup'), headerJpeg: null },
    })
    expect(blocks.filter((b) => b.type === 'image')).toHaveLength(3)
    expect(blocks.every((b) => b !== null)).toBe(true)
  })
})
