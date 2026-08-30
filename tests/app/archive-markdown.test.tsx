// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { ArchiveMarkdown } from '../../app/components/ArchiveMarkdown'

/**
 * `/how/<date>` printed the Art Director's brief verbatim: `### 2. Typography`,
 * `- **Hero phrase**`, backticked hex codes. Roughly 5KB of it on each of 25
 * pages. See #212.
 *
 * These assert the markdown actually becomes elements, because "it looks better
 * now" is not a thing a test can check and the failure mode is silent: a broken
 * renderer degrades to the exact raw text it replaced.
 */
describe('ArchiveMarkdown', () => {
  afterEach(cleanup)

  it('renders bold as an element, not literal asterisks', () => {
    render(<ArchiveMarkdown>{'**Primary hue** is magenta'}</ArchiveMarkdown>)
    expect(screen.getByText('Primary hue').tagName).toBe('STRONG')
    expect(document.body.textContent).not.toContain('**')
  })

  it('renders bullets as list items', () => {
    render(<ArchiveMarkdown>{'- one\n- two\n- three'}</ArchiveMarkdown>)
    expect(document.querySelectorAll('li')).toHaveLength(3)
    expect(document.body.textContent).not.toMatch(/^\s*-\s/m)
  })

  it('nests sub-bullets rather than flattening them', () => {
    // 54 of 122 dates use nested bullets. Flattening loses the hierarchy that
    // makes a spec readable.
    render(<ArchiveMarkdown>{'- parent\n  - child\n  - child two'}</ArchiveMarkdown>)
    const nested = document.querySelectorAll('li ul li')
    expect(nested).toHaveLength(2)
  })

  it('renders inline code, which is how every hex value appears', () => {
    render(<ArchiveMarkdown>{'background `#1B0912` deep plum'}</ArchiveMarkdown>)
    expect(screen.getByText('#1B0912').tagName).toBe('CODE')
    expect(document.body.textContent).not.toContain('`')
  })

  it('renders fenced blocks as pre, not as a paragraph', () => {
    render(<ArchiveMarkdown>{'```\ndisplay: grid;\ngap: 2vw;\n```'}</ArchiveMarkdown>)
    expect(document.querySelector('pre')).not.toBeNull()
  })

  it('renders tables, which need remark-gfm', () => {
    // Only 2 dates of 122. GFM was left out at first, and without it the table
    // collapsed into one run-on line of pipes. Enabled after seeing 2026-07-04.
    render(
      <ArchiveMarkdown>{'| Zone | Content |\n|---|---|\n| A | Hero phrase |'}</ArchiveMarkdown>
    )
    expect(document.querySelector('table')).not.toBeNull()
    expect(screen.getByText('Zone').tagName).toBe('TH')
    expect(screen.getByText('Hero phrase').tagName).toBe('TD')
  })

  it("maps the brief's ### onto a label, not a heading", () => {
    // The page already owns its h1/h2 outline. A brief section promoting itself
    // to a real heading would fight it.
    render(<ArchiveMarkdown>{'### 2. Typography'}</ArchiveMarkdown>)
    expect(document.querySelector('h1, h2, h3, h4')).toBeNull()
    expect(screen.getByText('2. Typography')).toBeTruthy()
  })

  it('escapes raw HTML rather than executing it', () => {
    // This is agent output. PR #129 already had to close a prompt-injection hole
    // in the ratings path; nothing here trusts the string.
    render(<ArchiveMarkdown>{'<img src=x onerror="alert(1)"> and <b>bold</b>'}</ArchiveMarkdown>)
    expect(document.querySelector('img')).toBeNull()
    expect(document.querySelector('b')).toBeNull()
  })

  it('drops javascript: URLs', () => {
    render(<ArchiveMarkdown>{'[click](javascript:alert(1))'}</ArchiveMarkdown>)
    const a = document.querySelector('a')
    expect(a?.getAttribute('href') ?? '').not.toContain('javascript:')
  })
})
