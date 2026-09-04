/**
 * The `pnpm taste` writer: appends one dated entry to `signals/taste.md`'s
 * "Local canary notes" section without disturbing anything the owner has
 * hand-curated.
 *
 * `signals/taste.md` is the one durable, all-time taste channel — read
 * whole into every Art Director prompt (`buildTasteMemoryBlock`) and never
 * pruned. Its header says "Edit by hand; the pipeline never writes to this
 * file," and its Gold standards / Standing complaints sections are the
 * owner's own prose, curated over months. This module never touches either:
 * it owns exactly one section, always the same one, and only ever inserts —
 * never rewrites a line it didn't just add. See `assertExpectedShape` below
 * for the one check that stands between "append" and "guess and corrupt."
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

/** Prose wraps to roughly this width, matching the rest of the file. */
const WRAP_WIDTH = 78

const H1 = '# Owner Taste Memory'

/** The one section this module ever writes to. */
export const SECTION_HEADING = '## Local canary notes'

const SECTION_INTRO_LINES = [
  'Appended by `pnpm taste` after a $0 local canary run — dev tier',
  '(Sonnet directs, not the Opus of a shipped night). Newest first. A note',
  'that keeps proving out belongs in Gold standards or Standing complaints',
  'above — move it there and delete it from here, by hand.',
]

/** The target file isn't in the shape this writer knows how to extend safely. */
export class TasteFileShapeError extends Error {}

/**
 * Word-wrap `text` into a bullet entry: `- ` on the first line, two-space
 * hanging indent on the rest, each line at most `WRAP_WIDTH` columns (a
 * single word longer than that is left to overflow rather than split).
 * @param {string} text
 * @returns {string[]} lines, with no trailing newline
 */
export function wrapEntry(text) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ['- ']

  const lines = []
  let current = '- '
  let currentIsEmpty = true
  for (const word of words) {
    const candidate = currentIsEmpty ? current + word : `${current} ${word}`
    if (!currentIsEmpty && candidate.length > WRAP_WIDTH) {
      lines.push(current)
      current = `  ${word}`
      currentIsEmpty = false
    } else {
      current = candidate
      currentIsEmpty = false
    }
  }
  lines.push(current)
  return lines
}

/**
 * Render one taste-note entry as it will appear in `signals/taste.md`:
 * `- **<date>, local canary — "<hero>" (<chassis>, <composition>).** <sentence>
 *   Evidence: <path>.`, wrapped and word-broken like the file's own entries.
 *
 * Any of `heroCopy`, `chassisId`, `compositionColumns` may be null (a run
 * that failed before the Art Director committed to a design has none of
 * them) — the identity clause just gets shorter, never fabricated.
 *
 * @param {object} args
 * @param {string} args.date `YYYY-MM-DD`
 * @param {string|null} args.heroCopy
 * @param {string|null} args.chassisId
 * @param {string|null} args.compositionColumns
 * @param {string} args.sentence the owner's own reaction, verbatim
 * @param {string|null} [args.evidencePath] repo-relative path to the run's evidence
 * @returns {string} the full entry text (unwrapped, one logical line)
 */
export function renderTasteNoteEntry({
  date,
  heroCopy,
  chassisId,
  compositionColumns,
  sentence,
  evidencePath = null,
}) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`renderTasteNoteEntry: date must be YYYY-MM-DD, got ${JSON.stringify(date)}`)
  }
  if (!sentence?.trim()) {
    throw new Error('renderTasteNoteEntry: sentence is required')
  }

  const idBits = []
  if (heroCopy) idBits.push(`"${heroCopy.trim()}"`)
  const tags = [chassisId, compositionColumns].filter(Boolean)
  if (tags.length > 0) idBits.push(`(${tags.join(', ')})`)

  let label = `${date}, local canary`
  if (idBits.length > 0) label += ` — ${idBits.join(' ')}`

  let body = sentence.trim().replace(/\s+/g, ' ')
  if (!/[.!?]$/.test(body)) body += '.'
  if (evidencePath) body += ` Evidence: ${evidencePath}.`

  return `**${label}.** ${body}`
}

/**
 * The file must open with the expected H1 — refuse rather than guess at an
 * unfamiliar file.
 * @param {string[]} lines
 */
function assertExpectedShape(lines) {
  const firstContentIdx = lines.findIndex((l) => l.trim() !== '')
  if (firstContentIdx === -1 || lines[firstContentIdx].trim() !== H1) {
    throw new TasteFileShapeError(
      `expected the file to open with "${H1}" — refusing to guess at an unfamiliar file`
    )
  }
}

/**
 * The line index of `SECTION_HEADING`, or -1 if it isn't there yet. Refuses
 * — never guesses — when it appears more than once (nothing here would
 * know which copy is the live one).
 * @param {string[]} lines
 * @returns {number}
 */
function findSectionHeadingIndex(lines) {
  const headingIdxs = []
  lines.forEach((l, i) => {
    if (l === SECTION_HEADING) headingIdxs.push(i)
  })
  if (headingIdxs.length > 1) {
    throw new TasteFileShapeError(
      `found ${headingIdxs.length} "${SECTION_HEADING}" headings — refusing to guess which one is live`
    )
  }
  return headingIdxs.length === 0 ? -1 : headingIdxs[0]
}

/** The line index of the next top-level `## ` heading after `sectionStart`, or EOF. */
function findSectionEnd(lines, sectionStart) {
  for (let i = sectionStart + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) return i
  }
  return lines.length
}

/**
 * Newest-first: insert above the first existing bullet in the section, or
 * — if the section exists but is somehow still empty — at its end. Never
 * past the file's own trailing-newline marker (the empty string
 * `split('\n')` leaves as its last element).
 */
function findInsertPoint(lines, sectionStart, sectionEnd) {
  for (let i = sectionStart + 1; i < sectionEnd; i++) {
    if (lines[i].startsWith('- ')) return i
  }
  if (sectionEnd === lines.length && lines.at(-1) === '') return lines.length - 1
  return sectionEnd
}

/**
 * Where a new entry belongs in `lines` (the file split on `\n`), and
 * whether "Local canary notes" already exists.
 * @param {string[]} lines
 * @returns {{ exists: false } | { exists: true, insertAt: number }}
 */
function planInsertion(lines) {
  assertExpectedShape(lines)
  const sectionStart = findSectionHeadingIndex(lines)
  if (sectionStart === -1) return { exists: false }
  const sectionEnd = findSectionEnd(lines, sectionStart)
  return { exists: true, insertAt: findInsertPoint(lines, sectionStart, sectionEnd) }
}

/**
 * Append `entryText` to `filePath`'s "Local canary notes" section, creating
 * the section (at the end of the file, after everything the owner has
 * already written) the first time this is ever called. Idempotent: if the
 * exact same entry is already present, this is a no-op rather than a
 * duplicate.
 *
 * Guarantee: every byte of the file outside the inserted lines is
 * untouched — this never re-serializes the document, only splices new
 * lines into a computed position, so the owner's own formatting survives
 * exactly as written.
 *
 * @param {object} args
 * @param {string} args.filePath
 * @param {string} args.entryText from {@link renderTasteNoteEntry}
 * @returns {{ status: 'appended' | 'duplicate' }}
 */
export function appendTasteNote({ filePath, entryText }) {
  if (!existsSync(filePath)) {
    throw new TasteFileShapeError(`${filePath} does not exist`)
  }
  const raw = readFileSync(filePath, 'utf8')
  const entryLines = wrapEntry(entryText)
  const entryBlock = entryLines.join('\n')

  if (raw.includes(entryBlock)) {
    return { status: 'duplicate' }
  }

  const lines = raw.split('\n')
  const plan = planInsertion(lines)

  let nextLines
  if (!plan.exists) {
    const hadTrailingNewline = lines.at(-1) === ''
    const body = hadTrailingNewline ? lines.slice(0, -1) : lines
    nextLines = [...body, '', SECTION_HEADING, '', ...SECTION_INTRO_LINES, '', ...entryLines]
    if (hadTrailingNewline) nextLines.push('')
  } else {
    nextLines = lines.slice()
    nextLines.splice(plan.insertAt, 0, ...entryLines)
  }

  writeFileSync(filePath, nextLines.join('\n'), 'utf8')
  return { status: 'appended' }
}
