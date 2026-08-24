import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { renderRootTemplate } from '../../scripts/utils/chassis.js'

const TEMPLATE = resolve(process.cwd(), 'scripts/templates/__root.tsx.template')

describe('renderRootTemplate — archive link (#155)', () => {
  it('substitutes the count into the rendered source', () => {
    const src = renderRootTemplate('https://fonts.example/x', '', 123)
    expect(src).toContain('Archive — 123 designs')
    expect(src).not.toContain('{{ARCHIVE_COUNT}}')
  })

  it('renders the link outside <Layout>, where no agent can delete it', () => {
    const src = renderRootTemplate('https://fonts.example/x', '', 7)
    const layoutClose = src.indexOf('</Layout>')
    const link = src.indexOf('data-archive-link')
    expect(layoutClose).toBeGreaterThan(-1)
    expect(link).toBeGreaterThan(layoutClose)
  })

  it('points at /archive', () => {
    expect(renderRootTemplate('u', '', 1)).toContain('href="/archive"')
  })

  it('defaults the count rather than leaving a raw placeholder', () => {
    const src = renderRootTemplate('u')
    expect(src).toContain('Archive — 0 designs')
  })

  it('throws when the template loses the placeholder', () => {
    // Guards against a future template edit silently dropping the link.
    const raw = readFileSync(TEMPLATE, 'utf8')
    expect(raw).toContain('{{ARCHIVE_COUNT}}')
    expect(raw).toContain('{{OG_META}}')
    expect(raw).toContain('{{GOOGLE_FONTS_URL}}')
  })

  it('uses only tokens that survive a nightly preset rewrite', () => {
    // textMuted is absent from ~1 preset in 5; text/bg/accent are near-universal.
    const raw = readFileSync(TEMPLATE, 'utf8')
    const block = raw.slice(raw.indexOf('const archiveLink'), raw.indexOf('export const Route'))
    expect(block).not.toContain('textMuted')
    expect(block).not.toContain('textSecondary')
    expect(block).toContain("color: 'text'")
    expect(block).toContain("background: 'bg'")
  })
})
