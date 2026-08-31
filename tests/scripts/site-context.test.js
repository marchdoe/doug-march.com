// tests/scripts/site-context.test.js
import { describe, it, expect } from 'vitest'
import {
  MUTABLE_FILES,
  ORCHESTRATOR_FILES,
  ENGINEER_FILES,
} from '../../scripts/utils/site-context.js'

describe('file groups', () => {
  it('ORCHESTRATOR_FILES holds the three generated files, never agent-authored', () => {
    expect(ORCHESTRATOR_FILES).toEqual([
      'app/routes/__root.tsx',
      'elements/chassis-preset.ts',
      'app/components/BrandLockup.tsx',
    ])
  })

  it("ENGINEER_FILES is everything mutable that is not the preset or the orchestrator's", () => {
    for (const f of ENGINEER_FILES) {
      expect(MUTABLE_FILES).toContain(f)
      expect(f).not.toBe('elements/preset.ts')
      expect(ORCHESTRATOR_FILES).not.toContain(f)
    }
    expect(ENGINEER_FILES.length + ORCHESTRATOR_FILES.length + 1).toBe(MUTABLE_FILES.length)
  })

  it('tripwire: 5 component files and 4 route files reach the engineer', () => {
    // Fails on purpose when a file joins or leaves the engineer's set. Was 11
    // until #216 dropped the six components no route had imported since March.
    expect(ENGINEER_FILES.filter((f) => f.startsWith('app/components/'))).toHaveLength(5)
    expect(ENGINEER_FILES.filter((f) => f.startsWith('app/routes/'))).toHaveLength(4)
  })
})
