/**
 * The width the critics are shown a phone at, against the width the gate
 * measures one at.
 *
 * `snapshot.js` cannot import `surface-gate.js` — the dependency runs the
 * other way — so the phone rung is written down twice. If the two ever
 * disagree, a critic approves a composition at a width no gate measured, which
 * is the shape of the failure this whole change is about.
 */
import { describe, expect, it } from 'vitest'
import { CRITIC_MOBILE_VIEWPORT } from '../../../scripts/utils/snapshot.js'
import { VIEWPORT_RUNGS } from '../../../scripts/utils/surface-gate.js'

describe('the phone the critics see', () => {
  it('is the rung the surface gate measures', () => {
    const rung = VIEWPORT_RUNGS.find((v) => v.name === 'mobile')
    expect(rung).toBeDefined()
    expect(CRITIC_MOBILE_VIEWPORT).toEqual({ width: rung.width, height: rung.height })
  })

  it('is 360 wide, so it is a phone and not a narrow desktop', () => {
    expect(CRITIC_MOBILE_VIEWPORT.width).toBe(360)
  })
})
