import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MAX_TASTE_MEMORY_BYTES, buildTasteMemoryBlock } from '../../scripts/utils/taste-memory.js'

describe('buildTasteMemoryBlock', () => {
  let root
  beforeEach(() => {
    root = mkdtempSync(path.join(tmpdir(), 'taste-memory-'))
  })
  afterEach(() => {
    rmSync(root, { recursive: true, force: true })
  })

  it('returns "" when signals/taste.md is absent', () => {
    expect(buildTasteMemoryBlock(root)).toBe('')
  })

  it('returns "" when signals/taste.md is empty', () => {
    mkdirSync(path.join(root, 'signals'), { recursive: true })
    writeFileSync(path.join(root, 'signals', 'taste.md'), '   \n  ')
    expect(buildTasteMemoryBlock(root)).toBe('')
  })

  it('wraps present content in the Owner Taste Memory heading', () => {
    mkdirSync(path.join(root, 'signals'), { recursive: true })
    writeFileSync(
      path.join(root, 'signals', 'taste.md'),
      '## Gold standard\n\nDrenched terracotta.'
    )
    const block = buildTasteMemoryBlock(root)
    expect(block).toContain('## Owner Taste Memory (permanent — these override recent trends)')
    expect(block).toContain('Drenched terracotta.')
  })

  it('truncates content over the cap and appends a note', () => {
    mkdirSync(path.join(root, 'signals'), { recursive: true })
    const big = 'x'.repeat(MAX_TASTE_MEMORY_BYTES + 2000)
    writeFileSync(path.join(root, 'signals', 'taste.md'), big)
    const block = buildTasteMemoryBlock(root)
    expect(Buffer.byteLength(block, 'utf8')).toBeLessThan(MAX_TASTE_MEMORY_BYTES + 2000)
    expect(block).toContain('truncated')
    expect(block).toContain('signals/taste.md exceeds')
  })

  // The real file was 5,638 bytes against a 3KB cap on 2026-09-04, which cut
  // five standing complaints and the grade ledger out of every Art Director
  // prompt. The cap has to stay ahead of the file it exists to carry.
  it('carries the whole of the real taste file', () => {
    const real = readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), '../../signals/taste.md'),
      'utf8'
    )
    mkdirSync(path.join(root, 'signals'), { recursive: true })
    writeFileSync(path.join(root, 'signals', 'taste.md'), real)
    const block = buildTasteMemoryBlock(root)
    expect(block).not.toContain('truncated')
    expect(block).toContain(real.trimEnd().split('\n').at(-1))
  })

  it('does not truncate content under the cap', () => {
    mkdirSync(path.join(root, 'signals'), { recursive: true })
    const content = 'A short taste note.'
    writeFileSync(path.join(root, 'signals', 'taste.md'), content)
    const block = buildTasteMemoryBlock(root)
    expect(block).not.toContain('truncated')
    expect(block).toContain(content)
  })
})
