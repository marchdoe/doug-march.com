import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const promptDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'scripts', 'prompts')
const read = (f) => readFileSync(path.join(promptDir, f), 'utf8')

describe('brand-contract.md load-bearing directives', () => {
  const contract = () => read('brand-contract.md')
  it('declares the geometry untouchable', () => {
    expect(contract()).toMatch(/geometry .*(untouchable|never|must not)/i)
  })
  it('enumerates the lockup variants', () => {
    const c = contract()
    expect(c).toContain('mark-only')
    expect(c).toContain('horizontal')
    expect(c).toContain('stacked')
  })
  it('restricts color to exactly two modes', () => {
    const c = contract()
    expect(c).toContain('original')
    expect(c).toContain('single-color')
    expect(c).toMatch(/two modes|exactly two/i)
  })
})

describe('art-director.md output contract', () => {
  const ad = () => read('art-director.md')
  it('requires the MEASURABLES block', () => {
    expect(ad()).toContain('===MEASURABLES===')
    expect(ad()).toContain('canvas_utilization_min')
  })
  it('requires the SHELL block', () => {
    expect(ad()).toContain('===SHELL===')
    expect(ad()).toContain('brand_color_mode')
  })
})

describe('mockup-designer.md load-bearing directives', () => {
  const md = () => read('mockup-designer.md')
  it('outputs a single self-contained mockup.html', () => {
    expect(md()).toContain('===FILE:mockup.html===')
    expect(md()).toContain('===INTERIOR_NOTES===')
  })
  it('contains the execution rubric with the dead-background metric', () => {
    expect(md()).toMatch(/30%.*(dead|unused|untreated)/i)
  })
  it('has the seed anchor placeholder', () => {
    expect(md()).toContain('<!-- SEED_ANCHOR -->')
  })
  it('forbids the generic shell', () => {
    expect(md()).toMatch(/logo top-left.*nav top-right/i)
  })
})

describe('logo-mono.svg', () => {
  it('exists and uses currentColor exclusively (no hardcoded colors)', () => {
    const svg = readFileSync(path.join(promptDir, '..', '..', 'app', 'assets', 'logo-mono.svg'), 'utf8')
    expect(svg).toContain('currentColor')
    // Allowlist: every paint value must be none or currentColor — catches
    // named colors (fill="white") that a hex/rgb blocklist would miss.
    const paints = [...svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)].map(m => m[1])
    expect(paints.length).toBeGreaterThan(0)
    expect(paints.every(p => p === 'none' || p === 'currentColor')).toBe(true)
  })
})
