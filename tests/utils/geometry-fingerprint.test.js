import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import {
  CENTER_SATURATION,
  CLASS_WEIGHTS,
  ELEMENT_CLASSES,
  FINGERPRINT_VERSION,
  boxDistance,
  centerDistance,
  classDistance,
  fingerprintDistance,
  geometryNovelty,
  iou,
} from '../../scripts/utils/geometry-fingerprint.js'

/**
 * Today's real silhouette, read off the built 2026-08-30 home page at 1440x900:
 * gold field on the left with the mark and the hero, data column on the right
 * with the nav. Every number here came out of the live DOM.
 */
const TODAY = {
  version: 1,
  viewport: { width: 1440, height: 900 },
  elements: [
    { class: 'hero', x: 0.0667, y: 0.3418, w: 0.4397, h: 0.3847 },
    { class: 'nav', x: 0.6411, y: 0.1067, w: 0.2922, h: 0.1644 },
    { class: 'mark', x: 0.0667, y: 0.1067, w: 0.0401, h: 0.0533 },
    { class: 'section', x: 0, y: 0, w: 0.5745, h: 1 },
    { class: 'section', x: 0.5745, y: 0, w: 0.4255, h: 2.5471 },
  ],
}

/** The same page flipped across the vertical centre line. */
const MIRRORED = {
  ...TODAY,
  elements: TODAY.elements.map((e) => ({ ...e, x: 1 - e.x - e.w })),
}

const box = (x, y, w, h) => ({ x, y, w, h })

describe('iou', () => {
  it('is 1 for the same box', () => {
    expect(iou(box(0.1, 0.1, 0.4, 0.2), box(0.1, 0.1, 0.4, 0.2))).toBeCloseTo(1)
  })

  it('is 0 for boxes that do not touch', () => {
    expect(iou(box(0, 0, 0.2, 0.2), box(0.5, 0.5, 0.2, 0.2))).toBe(0)
  })

  it('is the overlap over the union for a half-overlap', () => {
    // Two unit-quarter boxes sharing half their area.
    expect(iou(box(0, 0, 0.4, 0.4), box(0.2, 0, 0.4, 0.4))).toBeCloseTo(0.5 / 1.5)
  })

  it('is 0 rather than NaN for a zero-area box', () => {
    expect(iou(box(0, 0, 0, 0), box(0, 0, 0, 0))).toBe(0)
  })
})

describe('centerDistance', () => {
  it('is 0 for concentric boxes', () => {
    expect(centerDistance(box(0.2, 0.2, 0.4, 0.4), box(0.3, 0.3, 0.2, 0.2))).toBe(0)
  })

  it('saturates once a centre moves half a viewport', () => {
    expect(centerDistance(box(0, 0, 0.1, 0.1), box(CENTER_SATURATION, 0, 0.1, 0.1))).toBe(1)
    expect(centerDistance(box(0, 0, 0.1, 0.1), box(0.9, 0, 0.1, 0.1))).toBe(1)
  })

  it('is proportional below saturation', () => {
    expect(centerDistance(box(0, 0, 0.1, 0.1), box(0.25, 0, 0.1, 0.1))).toBeCloseTo(0.5)
  })
})

describe('boxDistance', () => {
  it('is 0 for an identical box', () => {
    expect(boxDistance(box(0.1, 0.2, 0.3, 0.4), box(0.1, 0.2, 0.3, 0.4))).toBeCloseTo(0)
  })

  it('is 1 for boxes that neither overlap nor sit close', () => {
    expect(boxDistance(box(0, 0, 0.2, 0.2), box(0.8, 0.8, 0.2, 0.2))).toBeCloseTo(1)
  })

  it('sees a size change even when the centre does not move', () => {
    const grown = boxDistance(box(0.4, 0.4, 0.2, 0.2), box(0.25, 0.25, 0.5, 0.5))
    expect(grown).toBeGreaterThan(0.2)
    expect(grown).toBeLessThan(0.5)
  })
})

describe('classDistance', () => {
  it('is null when neither side has the class', () => {
    expect(classDistance([], [])).toBeNull()
  })

  it('is 1 when one side has the class and the other does not', () => {
    expect(classDistance([box(0.1, 0.1, 0.2, 0.2)], [])).toBe(1)
    expect(classDistance([], [box(0.1, 0.1, 0.2, 0.2)])).toBe(1)
  })

  it('pairs each box with its nearest partner regardless of order', () => {
    const a = [box(0, 0, 0.2, 0.2), box(0.8, 0.8, 0.2, 0.2)]
    const b = [box(0.8, 0.8, 0.2, 0.2), box(0, 0, 0.2, 0.2)]
    expect(classDistance(a, b)).toBeCloseTo(0)
  })

  it('charges for a box that vanished', () => {
    const a = [box(0, 0, 0.2, 0.2), box(0.5, 0.5, 0.2, 0.2)]
    const b = [box(0, 0, 0.2, 0.2)]
    // One perfect match, one unmatched box at maximum distance.
    expect(classDistance(a, b)).toBeCloseTo(0.5)
    expect(classDistance(b, a)).toBeCloseTo(0.5)
  })
})

describe('fingerprintDistance', () => {
  it('is 0 against itself', () => {
    expect(fingerprintDistance(TODAY, TODAY)).toBeCloseTo(0)
  })

  it('is high against the same page mirrored', () => {
    expect(fingerprintDistance(TODAY, MIRRORED)).toBeGreaterThan(0.8)
  })

  it('is null when either side has no elements', () => {
    expect(fingerprintDistance(TODAY, { elements: [] })).toBeNull()
    expect(fingerprintDistance(null, TODAY)).toBeNull()
  })

  it('scores a hero that moved without touching anything else', () => {
    const moved = {
      ...TODAY,
      elements: TODAY.elements.map((e) =>
        e.class === 'hero' ? { ...e, x: 0.52, y: 0.05 } : { ...e }
      ),
    }
    const d = fingerprintDistance(TODAY, moved)
    // Only the hero moved, so the distance is bounded by the hero's weight.
    expect(d).toBeGreaterThan(0.1)
    expect(d).toBeLessThanOrEqual(CLASS_WEIGHTS.hero + 1e-9)
  })

  it('renormalizes over the classes both pages have', () => {
    const noMark = { ...TODAY, elements: TODAY.elements.filter((e) => e.class !== 'mark') }
    // Dropping the mark from both sides leaves the other three classes deciding.
    expect(fingerprintDistance(noMark, noMark)).toBeCloseTo(0)
  })

  it('lists every class it weights', () => {
    expect(ELEMENT_CLASSES).toEqual(['hero', 'section', 'nav', 'mark'])
  })

  it('stamps the version the module exports', () => {
    // collectGeometry is serialized into the page and cannot read module scope,
    // so it writes the number as a literal. Keep the two from drifting.
    const source = readFileSync(
      resolve(import.meta.dirname, '../../scripts/utils/geometry-fingerprint.js'),
      'utf8'
    )
    expect(source).toContain(`version: ${FINGERPRINT_VERSION},`)
  })
})

describe('geometryNovelty', () => {
  it('scores ~0 against a window holding the same silhouette', () => {
    const r = geometryNovelty(TODAY, [{ date: '2026-08-29', fingerprint: TODAY }])
    expect(r.score).toBeLessThan(0.01)
    expect(r.nearest).toBe('2026-08-29')
    expect(r.compared).toBe(1)
  })

  it('scores high against a mirrored silhouette', () => {
    const r = geometryNovelty(TODAY, [{ date: '2026-08-29', fingerprint: MIRRORED }])
    expect(r.score).toBeGreaterThan(0.8)
  })

  it('takes the nearest neighbour, not the mean', () => {
    const r = geometryNovelty(TODAY, [
      { date: '2026-08-28', fingerprint: MIRRORED },
      { date: '2026-08-29', fingerprint: TODAY },
    ])
    expect(r.score).toBeLessThan(0.01)
    expect(r.nearest).toBe('2026-08-29')
    expect(r.compared).toBe(2)
  })

  it('is null when the build has no fingerprint', () => {
    expect(geometryNovelty(null, [{ date: 'x', fingerprint: TODAY }])).toEqual({
      raw: null,
      score: null,
      nearest: null,
      compared: 0,
    })
  })

  it('is null when no build in the window has one', () => {
    const r = geometryNovelty(TODAY, [{ date: '2026-07-29' }, { date: '2026-07-27' }])
    expect(r.score).toBeNull()
    expect(r.compared).toBe(0)
  })

  it('skips history entries with an empty fingerprint rather than scoring them as distant', () => {
    const r = geometryNovelty(TODAY, [
      { date: '2026-08-28', fingerprint: { elements: [] } },
      { date: '2026-08-29', fingerprint: MIRRORED },
    ])
    expect(r.compared).toBe(1)
    expect(r.nearest).toBe('2026-08-29')
  })

  it('skips a history entry from a different FINGERPRINT_VERSION (#320)', () => {
    // Comparing across a version bump measures a change in what was
    // collected, not a change in the design — that distance is meaningless.
    const otherVersion = { ...TODAY, version: FINGERPRINT_VERSION + 1 }
    const r = geometryNovelty(TODAY, [
      { date: '2026-08-28', fingerprint: otherVersion },
      { date: '2026-08-29', fingerprint: { ...TODAY, version: FINGERPRINT_VERSION } },
    ])
    expect(r.compared).toBe(1)
    expect(r.nearest).toBe('2026-08-29')
  })

  it('skips a history entry with no version field at all (#320)', () => {
    const noVersion = { ...TODAY }
    delete noVersion.version
    const r = geometryNovelty(TODAY, [{ date: '2026-08-28', fingerprint: noVersion }])
    expect(r.compared).toBe(0)
    expect(r.score).toBeNull()
  })
})
