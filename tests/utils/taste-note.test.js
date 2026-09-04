import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ROOT } from '../../scripts/utils/file-manager.js'
import {
  appendTasteNote,
  renderTasteNoteEntry,
  SECTION_HEADING,
  TasteFileShapeError,
  wrapEntry,
} from '../../scripts/utils/taste-note.js'

let dir
let filePath

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'taste-note-'))
  filePath = path.join(dir, 'taste.md')
})
afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

const MINIMAL_FILE = [
  '# Owner Taste Memory',
  '',
  'Permanent, hand-curated. Edit by hand; the pipeline never writes to this',
  'file.',
  '',
  '## Gold standards — the execution bar',
  '',
  '- **2026-04-28, drenched terracotta Specimen.** A single hue committed',
  '  across the viewport.',
  '',
  '## Standing complaints — do not repeat',
  '',
  '- **Header keeps breaking.** Called out three ratings running.',
  '',
].join('\n')

describe('renderTasteNoteEntry', () => {
  it('renders date, hero, chassis, composition and the sentence as one entry', () => {
    const entry = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: 'Select a busy man.',
      chassisId: 'unbounded-figtree',
      compositionColumns: 'two-asymmetric',
      sentence: 'Loved the reversed gold flood',
      evidencePath: 'docs/evidence/canary/2026-09-04-1532',
    })
    expect(entry).toBe(
      '**2026-09-04, local canary — "Select a busy man." (unbounded-figtree, two-asymmetric).**' +
        ' Loved the reversed gold flood. Evidence: docs/evidence/canary/2026-09-04-1532.'
    )
  })

  it('degrades gracefully when hero/chassis/composition are unknown', () => {
    const entry = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: null,
      chassisId: null,
      compositionColumns: null,
      sentence: 'Reacted to a lost night.',
    })
    expect(entry).toBe('**2026-09-04, local canary.** Reacted to a lost night.')
  })

  it('does not double up a sentence that already ends in punctuation', () => {
    const entry = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: null,
      chassisId: null,
      compositionColumns: null,
      sentence: 'Already punctuated!',
    })
    expect(entry).toBe('**2026-09-04, local canary.** Already punctuated!')
  })

  it('collapses internal newlines in the sentence to spaces', () => {
    const entry = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: null,
      chassisId: null,
      compositionColumns: null,
      sentence: 'Line one\nline two',
    })
    expect(entry).toBe('**2026-09-04, local canary.** Line one line two.')
  })

  it('throws on a malformed date', () => {
    expect(() => renderTasteNoteEntry({ date: 'not-a-date', sentence: 'x' })).toThrow(/YYYY-MM-DD/)
  })

  it('throws on an empty sentence', () => {
    expect(() => renderTasteNoteEntry({ date: '2026-09-04', sentence: '   ' })).toThrow(
      /sentence is required/
    )
  })
})

describe('wrapEntry', () => {
  it('keeps a short entry on one line with the bullet prefix', () => {
    expect(wrapEntry('short entry')).toEqual(['- short entry'])
  })

  it('wraps a long entry with a two-space hanging indent', () => {
    const long = Array.from({ length: 20 }, (_, i) => `word${i}`).join(' ')
    const lines = wrapEntry(long)
    expect(lines.length).toBeGreaterThan(1)
    expect(lines[0].startsWith('- ')).toBe(true)
    for (const line of lines.slice(1)) expect(line.startsWith('  ')).toBe(true)
    // Every word survives the wrap, in order, with nothing dropped.
    expect(
      lines
        .join(' ')
        .replace(/^- /, '')
        .replace(/\s{2,}/g, ' ')
    ).toContain('word19')
  })
})

describe('appendTasteNote', () => {
  it('creates the section on the first call and inserts the entry', () => {
    writeFileSync(filePath, MINIMAL_FILE, 'utf8')
    const entryText = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: 'Select a busy man.',
      chassisId: 'unbounded-figtree',
      compositionColumns: 'two-asymmetric',
      sentence: 'Loved the flood.',
    })
    const result = appendTasteNote({ filePath, entryText })
    expect(result.status).toBe('appended')

    const out = readFileSync(filePath, 'utf8')
    expect(out).toContain(SECTION_HEADING)
    expect(out).toContain('Select a busy man.')
    expect(out).toContain('Loved the flood.')
    // The section is the last thing in the file.
    expect(out.trim().endsWith('Loved the flood.')).toBe(true)
  })

  it('leaves every existing byte of the file untouched', () => {
    writeFileSync(filePath, MINIMAL_FILE, 'utf8')
    const entryText = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: null,
      chassisId: null,
      compositionColumns: null,
      sentence: 'A reaction.',
    })
    appendTasteNote({ filePath, entryText })
    const out = readFileSync(filePath, 'utf8')
    expect(out.startsWith(MINIMAL_FILE)).toBe(true)
  })

  it('is idempotent: appending the exact same entry twice does not duplicate it', () => {
    writeFileSync(filePath, MINIMAL_FILE, 'utf8')
    const entryText = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: null,
      chassisId: null,
      compositionColumns: null,
      sentence: 'Same reaction twice.',
    })
    const first = appendTasteNote({ filePath, entryText })
    const second = appendTasteNote({ filePath, entryText })
    expect(first.status).toBe('appended')
    expect(second.status).toBe('duplicate')

    const out = readFileSync(filePath, 'utf8')
    const occurrences = out.split('Same reaction twice.').length - 1
    expect(occurrences).toBe(1)
  })

  it('inserts a second, different entry newest-first, above the first', () => {
    writeFileSync(filePath, MINIMAL_FILE, 'utf8')
    appendTasteNote({
      filePath,
      entryText: renderTasteNoteEntry({
        date: '2026-09-03',
        heroCopy: null,
        chassisId: null,
        compositionColumns: null,
        sentence: 'Older reaction.',
      }),
    })
    appendTasteNote({
      filePath,
      entryText: renderTasteNoteEntry({
        date: '2026-09-04',
        heroCopy: null,
        chassisId: null,
        compositionColumns: null,
        sentence: 'Newer reaction.',
      }),
    })
    const out = readFileSync(filePath, 'utf8')
    expect(out.indexOf('Newer reaction.')).toBeLessThan(out.indexOf('Older reaction.'))
  })

  it('refuses when the file does not open with the expected H1', () => {
    writeFileSync(filePath, 'not the right file at all\n', 'utf8')
    expect(() =>
      appendTasteNote({
        filePath,
        entryText: renderTasteNoteEntry({
          date: '2026-09-04',
          heroCopy: null,
          chassisId: null,
          compositionColumns: null,
          sentence: 'x',
        }),
      })
    ).toThrow(TasteFileShapeError)

    // Refusal must not touch the file at all.
    expect(readFileSync(filePath, 'utf8')).toBe('not the right file at all\n')
  })

  it('refuses when the section heading appears more than once', () => {
    const doubled = `${MINIMAL_FILE}\n${SECTION_HEADING}\n\n- old entry\n\n${SECTION_HEADING}\n\n- another\n`
    writeFileSync(filePath, doubled, 'utf8')
    expect(() =>
      appendTasteNote({
        filePath,
        entryText: renderTasteNoteEntry({
          date: '2026-09-04',
          heroCopy: null,
          chassisId: null,
          compositionColumns: null,
          sentence: 'x',
        }),
      })
    ).toThrow(TasteFileShapeError)
    expect(readFileSync(filePath, 'utf8')).toBe(doubled)
  })

  it('throws (rather than silently no-op) when the target file does not exist', () => {
    expect(() =>
      appendTasteNote({
        filePath: path.join(dir, 'missing.md'),
        entryText: 'x',
      })
    ).toThrow(TasteFileShapeError)
  })
})

describe('appendTasteNote against a temp copy of the real signals/taste.md', () => {
  let realCopyPath

  beforeEach(() => {
    realCopyPath = path.join(dir, 'real-taste.md')
    const real = readFileSync(path.join(ROOT, 'signals', 'taste.md'), 'utf8')
    writeFileSync(realCopyPath, real, 'utf8')
  })

  it('appends a new entry and leaves every existing byte identical', () => {
    const before = readFileSync(realCopyPath, 'utf8')
    const entryText = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: 'Select a busy man.',
      chassisId: 'unbounded-figtree',
      compositionColumns: 'two-asymmetric',
      sentence: 'Loved the reversed gold flood; the ledger felt cluttered.',
      evidencePath: 'docs/evidence/canary/2026-09-04-1532',
    })
    const result = appendTasteNote({ filePath: realCopyPath, entryText })
    expect(result.status).toBe('appended')

    const after = readFileSync(realCopyPath, 'utf8')
    expect(after.startsWith(before)).toBe(true)
    expect(after).toContain(SECTION_HEADING)
    expect(after).toContain('Select a busy man.')

    // What every existing entry says survives verbatim, including the
    // ledger that already trails the file.
    expect(after).toContain('drenched terracotta Specimen (risk 8)')
    expect(after).toContain('2026-07-23 — C — "header a lot better"')
  })
})

describe('a written entry, as buildTasteMemoryBlock will present it to the Art Director', () => {
  it('reaches the prompt verbatim when the file is under the byte cap', async () => {
    const { buildTasteMemoryBlock } = await import('../../scripts/utils/taste-memory.js')
    const { mkdirSync, copyFileSync } = await import('node:fs')

    writeFileSync(filePath, MINIMAL_FILE, 'utf8')
    const entryText = renderTasteNoteEntry({
      date: '2026-09-04',
      heroCopy: 'Select a busy man.',
      chassisId: 'unbounded-figtree',
      compositionColumns: 'two-asymmetric',
      sentence: 'Loved the reversed gold flood.',
      evidencePath: 'docs/evidence/canary/2026-09-04-1532',
    })
    appendTasteNote({ filePath, entryText })

    // buildTasteMemoryBlock reads <root>/signals/taste.md by convention.
    const fakeRoot = path.join(dir, 'fake-root')
    mkdirSync(path.join(fakeRoot, 'signals'), { recursive: true })
    copyFileSync(filePath, path.join(fakeRoot, 'signals', 'taste.md'))

    const block = buildTasteMemoryBlock(fakeRoot)
    // The writer wraps long entries across lines (matching the file's own
    // style), so compare against whitespace-collapsed prose rather than an
    // exact substring that could straddle a wrap boundary.
    const flat = block.replace(/\s+/g, ' ')
    expect(block).toContain('## Owner Taste Memory (permanent — these override recent trends)')
    expect(block).toContain(SECTION_HEADING)
    expect(flat).toContain(
      'local canary — "Select a busy man." (unbounded-figtree, two-asymmetric)'
    )
    expect(flat).toContain('Loved the reversed gold flood.')
    expect(flat).toContain('Evidence: docs/evidence/canary/2026-09-04-1532.')
    expect(block).not.toContain('truncated')
  })
})
