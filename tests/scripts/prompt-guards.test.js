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

describe('logo-mono.svg', () => {
  it('exists and uses currentColor exclusively (no hardcoded colors)', () => {
    const svg = readFileSync(path.join(promptDir, '..', '..', 'app', 'assets', 'logo-mono.svg'), 'utf8')
    expect(svg).toContain('currentColor')
    expect(svg).not.toMatch(/#[0-9a-fA-F]{3,8}\b|rgb\(/)
  })
})
