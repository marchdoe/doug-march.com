import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { type RecordField, absenceNote } from '../lib/archive-era'
import { signalLines } from '../lib/archive-signals'
import { css } from '../../styled-system/css'
import type { ArchiveRecord, ArchiveTokens, JsonValue } from '../types/archive-record'

type ArchiveDetail = ArchiveRecord & { hasScreenshot: boolean; pages?: number }

export const Route = createFileRoute('/how/$date')({
  component: HowPage,
})

/**
 * The explainer — #159.
 *
 * A day's build read as a sequence, not an inventory. The sections are named
 * for what happened in order — the day arrived, a brief was written, a color
 * was chosen — because that is what the record is: a morning's work, in the
 * order it was done.
 *
 * The brief leads, never the color. Color is absent on 31 of 123 dates, and a
 * color-led hero on those days is a grey slab. Signals (107) and tokens (106)
 * are better covered than color (92).
 *
 * The preserved design is linked, never embedded. A live frame of that day's
 * site inside this page would put two identities on one screen, and this page's
 * whole job is to be the fixed one.
 *
 * Colors arrive at render time and Panda extracts styles statically, so each
 * swatch passes its value as a CSS custom property that a static class reads.
 * That is the one thing `style` is used for here.
 */

/* ------------------------------------------------------------------ readers */

interface Swatch {
  name: string
  hex: string
}

/**
 * Ramps kept as ramps, so a scale reads as a scale rather than a pile.
 *
 * Not every color token is a ramp: a one-off like `glow: { value: '#FF8FC7' }`
 * unwraps to a bare string, and iterating that yields one swatch per character.
 */
function ramps(tokens: ArchiveTokens | null): { name: string; stops: Swatch[] }[] {
  if (!tokens) return []
  const out: { name: string; stops: Swatch[] }[] = []
  for (const [name, stops] of Object.entries(tokens.colors.ramps)) {
    if (typeof stops === 'string') {
      out.push({ name, stops: [{ name, hex: stops }] })
      continue
    }
    const scale = Object.entries(stops)
      .filter((e): e is [string, string] => typeof e[1] === 'string')
      .map(([stop, hex]) => ({ name: stop, hex }))
    if (scale.length) out.push({ name, stops: scale })
  }
  return out
}

/** A token group flattened to name/value pairs, or [] when the era had none. */
function pairs(tokens: ArchiveTokens | null, group: string): { name: string; value: string }[] {
  const block = tokens?.[group]
  if (!block || typeof block !== 'object') return []
  return Object.entries(block as Record<string, unknown>)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
    .map(([name, value]) => ({ name, value }))
}

/** The Art Director's headings, which changed vocabulary in 2026-05. */
const BRIEF_LABELS: Record<string, string> = {
  visualSpecification: 'Visual specification',
  signalIntegration: 'Signal integration',
  selfCheck: 'Self-check',
  rationale: 'Rationale',
  compositionRationale: 'Composition rationale',
  mood: 'Mood',
  compositionDirection: 'Composition direction',
  typographyDirection: 'Typography direction',
  paletteDirection: 'Palette direction',
}

function briefSections(adBrief: Record<string, string> | null) {
  if (!adBrief) return []
  return Object.entries(adBrief)
    .filter(([, bodyText]) => typeof bodyText === 'string' && bodyText.trim())
    .map(([key, bodyText]) => ({ heading: BRIEF_LABELS[key] ?? key, body: bodyText }))
}

function formatDate(date: string): string {
  try {
    return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return date
  }
}

const asRecord = (v: JsonValue | null | undefined): Record<string, JsonValue> | null =>
  typeof v === 'object' && v !== null && !Array.isArray(v) ? v : null

/* ------------------------------------------------------------------- styles */

const page = css({
  minHeight: '100vh',
  background: 'archive.bg',
  color: 'archive.text',
  fontFamily: 'archive.mono',
  fontSize: 'archive.body',
})

const masthead = css({
  borderBottom: '1px solid',
  borderColor: 'archive.line',
  padding: { base: '32px 20px 26px', md: '48px 48px 32px' },
})

const back = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '20px',
  _hover: { color: 'archive.text' },
})

const dateLine = css({
  fontFamily: 'archive.sans',
  fontSize: { base: 'archive.title', md: 'archive.display' },
  lineHeight: '1.15',
  fontWeight: 'normal',
  letterSpacing: '-0.01em',
})

const columns = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', lg: '240px minmax(0, 1fr)' },
  gap: { base: '32px', lg: '56px' },
  padding: { base: '28px 20px 96px', md: '40px 48px 120px' },
  maxWidth: '1180px',
  alignItems: 'start',
})

const rail = css({
  position: { base: 'static', lg: 'sticky' },
  top: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  fontSize: 'archive.micro',
})

const railRow = css({ display: 'flex', flexDirection: 'column', gap: '4px' })

const railKey = css({
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'archive.faint',
})

const railValue = css({ color: 'archive.text', fontSize: 'archive.small', wordBreak: 'break-word' })

const openDesign = css({
  display: 'block',
  textAlign: 'center',
  border: '1px solid',
  borderColor: 'archive.line',
  color: 'archive.text',
  textDecoration: 'none',
  padding: '11px 12px',
  fontSize: 'archive.micro',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  transition: 'background 0.15s ease, color 0.15s ease',
  _hover: { background: 'archive.text', color: 'archive.bg' },
})

/**
 * Code-split. The markdown parser is only needed by this route, and the main
 * chunk is 268KB before it.
 */
const ArchiveMarkdown = lazy(() =>
  import('../components/ArchiveMarkdown').then((m) => ({ default: m.ArchiveMarkdown }))
)

const bodyCol = css({ display: 'flex', flexDirection: 'column', gap: '52px', minWidth: 0 })

const section = css({ minWidth: 0 })

const stepLabel = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'archive.faint',
  marginBottom: '10px',
})

const stepTitle = css({
  fontFamily: 'archive.sans',
  fontSize: 'archive.lead',
  fontWeight: 'normal',
  marginBottom: '18px',
  color: 'archive.text',
})

const prose = css({
  fontFamily: 'archive.sans',
  fontSize: 'archive.body',
  lineHeight: '1.75',
  color: 'archive.text',
  maxWidth: '68ch',
  whiteSpace: 'pre-wrap',
})

const specDetails = css({
  marginTop: '26px',
  borderTop: '1px solid',
  borderColor: 'archive.line',
  paddingTop: '14px',
  maxWidth: '68ch',
})

const specSummary = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  cursor: 'pointer',
  userSelect: 'none',
  paddingY: '4px',
  _hover: { color: 'archive.text' },
})

const specBody = css({ marginTop: '12px' })

const absent = css({
  fontSize: 'archive.small',
  color: 'archive.faint',
  fontStyle: 'italic',
  maxWidth: '60ch',
  lineHeight: '1.6',
})

const subhead = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'archive.dim',
  marginTop: '26px',
  marginBottom: '10px',
})

const defList = css({ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '72ch' })

const defRow = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: '132px minmax(0, 1fr)' },
  gap: { base: '2px', sm: '16px' },
  alignItems: 'baseline',
  paddingBottom: '10px',
  borderBottom: '1px solid',
  borderColor: 'archive.lineSoft',
})

const defKey = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'archive.dim',
})

const defValue = css({ fontSize: 'archive.small', color: 'archive.text', minWidth: 0 })

const defEmpty = css({ fontSize: 'archive.small', color: 'archive.faint', fontStyle: 'italic' })

const rampRow = css({ marginBottom: '18px' })

const rampName = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.12em',
  color: 'archive.dim',
  marginBottom: '6px',
})

const rampStops = css({ display: 'flex', flexWrap: 'wrap', gap: '2px' })

const stop = css({
  width: '64px',
  minHeight: '56px',
  background: 'var(--stop)',
  border: '1px solid',
  borderColor: 'archive.lineSoft',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: '2px',
  padding: '4px',
  fontSize: '9px',
  lineHeight: '1.3',
  color: 'archive.text',
})

const stopMeta = css({
  background: 'archive.bg',
  padding: '1px 3px',
  alignSelf: 'flex-start',
  opacity: 0.92,
})

const heroSwatch = css({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '18px',
})

const heroChip = css({
  width: '54px',
  height: '54px',
  flexShrink: 0,
  background: 'var(--hero)',
  border: '1px solid',
  borderColor: 'archive.line',
})

const signalGrid = css({ display: 'flex', flexDirection: 'column', gap: '9px', maxWidth: '76ch' })

const signalRow = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', sm: '128px minmax(0, 1fr)' },
  gap: { base: '2px', sm: '16px' },
  alignItems: 'baseline',
  paddingBottom: '9px',
  borderBottom: '1px solid',
  borderColor: 'archive.lineSoft',
})

const signalName = css({
  fontSize: 'archive.micro',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'archive.dim',
})

const signalText = css({ fontSize: 'archive.small', color: 'archive.text', minWidth: 0 })
const signalNone = css({ fontSize: 'archive.small', color: 'archive.faint', fontStyle: 'italic' })

const fileList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const notFound = css({
  minHeight: '100vh',
  background: 'archive.bg',
  color: 'archive.text',
  fontFamily: 'archive.mono',
  fontSize: 'archive.body',
  padding: '96px 24px',
  textAlign: 'center',
})

/* ---------------------------------------------------------------- component */

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className={section}>
      <p className={stepLabel}>{n}</p>
      <h2 className={stepTitle}>{title}</h2>
      {children}
    </section>
  )
}

function Absent({ field, era, noun }: { field: RecordField; era: string | null; noun: string }) {
  return <p className={absent}>{absenceNote(field, era, noun)}</p>
}

function RailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className={railRow}>
      <span className={railKey}>{label}</span>
      <span className={railValue}>{value}</span>
    </div>
  )
}

function HowPage() {
  const { date } = Route.useParams()
  const [detail, setDetail] = useState<ArchiveDetail | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/archive-data/${date}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setDetail(data)
        else setError(true)
      })
      .catch(() => setError(true))
  }, [date])

  if (error) {
    return (
      <div className={notFound}>
        <p>Nothing archived for {date}.</p>
        <p>
          <a href="/archive" className={back}>
            ← The archive
          </a>
        </p>
      </div>
    )
  }

  if (!detail) return null

  const era = detail.era
  const scheme = asRecord(detail.colorScheme as JsonValue)
  const hue = asRecord(scheme?.primary_hue)
  const colorRamps = ramps(detail.tokens)
  const stopCount = colorRamps.reduce((n, r) => n + r.stops.length, 0)
  const fonts = pairs(detail.tokens, 'fonts')
  const fontSizes = pairs(detail.tokens, 'fontSizes')
  const sections = briefSections(detail.adBrief)
  const signals = signalLines(detail.signals as Record<string, JsonValue> | null)
  const composition = asRecord(detail.composition as JsonValue)
  const lane = asRecord(detail.lane as JsonValue)
  const shell = asRecord(detail.shell as JsonValue)
  const hasDesign = (detail.pages ?? 0) > 0

  const heroHex =
    hue && typeof hue.h === 'number' && typeof hue.s === 'number' && typeof hue.l === 'number'
      ? `hsl(${hue.h} ${hue.s}% ${hue.l}%)`
      : null

  return (
    <div className={page}>
      <header className={masthead}>
        <a href="/archive" className={back}>
          ← The archive
        </a>
        <h1 className={dateLine}>{formatDate(date)}</h1>
      </header>

      <div className={columns}>
        <aside className={rail}>
          {hasDesign ? (
            <a href={`/archive/${date}/`} className={openDesign}>
              Open the design
            </a>
          ) : (
            <p className={absent}>
              The record for this day survived; the pages did not. There is no design to open.
            </p>
          )}

          <RailRow label="Era" value={era} />
          <RailRow label="Chassis" value={detail.chassis} />
          <RailRow label="Archetype" value={detail.legacyArchetype} />
          <RailRow label="Mood" value={(scheme?.mood_word as string) ?? null} />
          <RailRow label="Color" value={(hue?.name as string) ?? heroHex} />
          <RailRow label="Build" value={detail.buildId} />
          <RailRow label="Attempts" value={detail.attempts ? String(detail.attempts) : null} />
          {detail.cost?.total_usd != null ? (
            <RailRow
              label="Cost"
              value={`$${Number(detail.cost.total_usd).toFixed(2)}${
                detail.cost.estimated ? ' est.' : ''
              }`}
            />
          ) : null}
        </aside>

        <div className={bodyCol}>
          <Step n="01" title="The day arrived">
            {signals.length === 0 ? (
              <Absent field="signals" era={era} noun="record of the day" />
            ) : (
              <div className={signalGrid}>
                {signals.map((s) => (
                  <div key={s.provider} className={signalRow}>
                    <span className={signalName}>{s.label}</span>
                    <span className={s.empty ? signalNone : signalText}>{s.summary}</span>
                  </div>
                ))}
              </div>
            )}
          </Step>

          <Step n="02" title="A brief was written">
            {detail.brief ? (
              <p className={prose}>{detail.brief}</p>
            ) : (
              <Absent field="brief" era={era} noun="brief" />
            )}
            {detail.rationale ? (
              <>
                <p className={subhead}>Why</p>
                <Suspense fallback={<p className={prose}>{detail.rationale}</p>}>
                  <ArchiveMarkdown>{detail.rationale}</ArchiveMarkdown>
                </Suspense>
              </>
            ) : null}
            {sections.length > 0 && (
              <details className={specDetails}>
                <summary className={specSummary}>
                  The full specification ({sections.length} sections)
                </summary>
                <div className={specBody}>
                  {sections.map((s) => (
                    <div key={s.heading}>
                      <p className={subhead}>{s.heading}</p>
                      <Suspense fallback={<p className={prose}>{s.body}</p>}>
                        <ArchiveMarkdown>{s.body}</ArchiveMarkdown>
                      </Suspense>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </Step>

          <Step n="03" title="A color was chosen">
            {!scheme ? (
              <Absent field="colorScheme" era={era} noun="color direction" />
            ) : (
              <>
                {heroHex ? (
                  <div className={heroSwatch}>
                    <div
                      className={heroChip}
                      style={{ '--hero': heroHex } as React.CSSProperties}
                    />
                    <div>
                      <p className={defValue}>{(hue?.name as string) ?? heroHex}</p>
                      <p className={defEmpty}>{heroHex}</p>
                    </div>
                  </div>
                ) : null}
                {typeof scheme.color_story === 'string' && scheme.color_story ? (
                  <p className={prose}>{scheme.color_story}</p>
                ) : null}
              </>
            )}
          </Step>

          <Step n="04" title="Tokens were generated">
            {colorRamps.length === 0 && fonts.length === 0 && fontSizes.length === 0 ? (
              <Absent field="tokens" era={era} noun="token set" />
            ) : (
              <>
                {colorRamps.length ? (
                  <>
                    <p className={subhead}>
                      Color — {colorRamps.length} ramps, {stopCount} stops
                    </p>
                    {colorRamps.map((r) => (
                      <div key={r.name} className={rampRow}>
                        <p className={rampName}>{r.name}</p>
                        <div className={rampStops}>
                          {r.stops.map((s) => (
                            <div
                              key={`${r.name}.${s.name}`}
                              className={stop}
                              style={{ '--stop': s.hex } as React.CSSProperties}
                              title={`${r.name}.${s.name} — ${s.hex}`}
                            >
                              <span className={stopMeta}>{s.name}</span>
                              <span className={stopMeta}>{s.hex}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}

                {fonts.length ? (
                  <>
                    <p className={subhead}>Type</p>
                    <div className={defList}>
                      {fonts.map((f) => (
                        <div key={f.name} className={defRow}>
                          <span className={defKey}>{f.name}</span>
                          <span className={defValue}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {fontSizes.length ? (
                  <>
                    <p className={subhead}>Scale</p>
                    <div className={defList}>
                      {fontSizes.map((f) => (
                        <div key={f.name} className={defRow}>
                          <span className={defKey}>{f.name}</span>
                          <span className={defValue}>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </Step>

          <Step n="05" title="A composition was decided">
            {!composition && !lane && !shell ? (
              <Absent field="composition" era={era} noun="composition grammar" />
            ) : (
              <div className={defList}>
                {composition
                  ? Object.entries(composition).map(([k, v]) => (
                      <div key={k} className={defRow}>
                        <span className={defKey}>{k.replace(/_/g, ' ')}</span>
                        <span className={defValue}>{String(v)}</span>
                      </div>
                    ))
                  : null}
                {lane?.name ? (
                  <div className={defRow}>
                    <span className={defKey}>Lane</span>
                    <span className={defValue}>{String(lane.name)}</span>
                  </div>
                ) : null}
                {shell
                  ? Object.entries(shell).map(([k, v]) => (
                      <div key={`shell-${k}`} className={defRow}>
                        <span className={defKey}>{k.replace(/_/g, ' ')}</span>
                        <span className={defValue}>{String(v)}</span>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </Step>

          <Step n="06" title="It was built">
            <div className={defList}>
              <div className={defRow}>
                <span className={defKey}>Attempts</span>
                <span className={detail.attempts ? defValue : defEmpty}>
                  {detail.attempts ? detail.attempts : 'not logged'}
                </span>
              </div>
              <div className={defRow}>
                <span className={defKey}>Files changed</span>
                {detail.filesChanged?.length ? (
                  <span className={`${defValue} ${fileList}`}>
                    {detail.filesChanged.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </span>
                ) : (
                  <span className={defEmpty}>not logged</span>
                )}
              </div>
              <div className={defRow}>
                <span className={defKey}>Pages kept</span>
                <span className={hasDesign ? defValue : defEmpty}>
                  {hasDesign ? detail.pages : 'none — the capture did not survive'}
                </span>
              </div>
            </div>
          </Step>
        </div>
      </div>
    </div>
  )
}
