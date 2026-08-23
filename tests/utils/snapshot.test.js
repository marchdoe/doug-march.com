import { describe, it, expect } from 'vitest'
import { computeDownscaleDimensions } from '../../scripts/utils/snapshot.js'

describe('computeDownscaleDimensions', () => {
  it('scales a full-res capture down to the target width, preserving aspect ratio', () => {
    expect(computeDownscaleDimensions(1280, 900, 1024)).toEqual({ width: 1024, height: 720 })
  })

  it('scales a wider mockup capture down proportionally', () => {
    expect(computeDownscaleDimensions(1440, 900, 1024)).toEqual({ width: 1024, height: 640 })
  })

  it('never upscales a source already narrower than the target', () => {
    expect(computeDownscaleDimensions(800, 600, 1024)).toEqual({ width: 800, height: 600 })
  })

  it('defaults the target width to the critic-bound ceiling (1024)', () => {
    expect(computeDownscaleDimensions(1280, 900)).toEqual({ width: 1024, height: 720 })
  })
})
