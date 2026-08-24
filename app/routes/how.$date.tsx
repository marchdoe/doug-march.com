import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import type { ArchiveRecord, ArchiveTokens } from '../types/archive-record'

type ArchiveDetail = ArchiveRecord & { hasScreenshot: boolean }

export const Route = createFileRoute('/how/$date')({
  component: HowPage,
})

/* ---------------------------------------------------------------------------
 * Record readers — the parsing happened once, at build time, into record.json.
 * ------------------------------------------------------------------------- */

interface Swatch {
  name: string
  hex: string
}

/**
 * Every stop of every ramp, in the order the preset declared them.
 *
 * Not every colour token is a ramp: a one-off like `glow: { value: '#FF8FC7' }`
 * unwraps to a bare string, and iterating that yields one swatch per character.
 */
function swatches(tokens: ArchiveTokens | null): Swatch[] {
  if (!tokens) return []
  const out: Swatch[] = []
  for (const [ramp, stops] of Object.entries(tokens.colors.ramps)) {
    if (typeof stops === 'string') {
      out.push({ name: ramp, hex: stops })
      continue
    }
    for (const [stop, hex] of Object.entries(stops)) {
      if (typeof hex === 'string') out.push({ name: `${ramp}.${stop}`, hex })
    }
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
  visualSpecification: 'Visual Specification',
  signalIntegration: 'Signal Integration',
  selfCheck: 'Self-Check',
  rationale: 'Rationale',
  compositionRationale: 'Composition Rationale',
  mood: 'Mood',
  compositionDirection: 'Composition Direction',
  typographyDirection: 'Typography Direction',
  paletteDirection: 'Palette Direction',
}

function briefSections(adBrief: Record<string, string> | null) {
  if (!adBrief) return []
  return Object.entries(adBrief).map(([key, body]) => ({
    heading: BRIEF_LABELS[key] ?? key,
    body,
  }))
}

/* ---------------------------------------------------------------------------
 * Date formatting
 * ------------------------------------------------------------------------- */

function formatDate(date: string): string {
  try {
    const d = new Date(`${date}T12:00:00`)
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return date
  }
}

/* ---------------------------------------------------------------------------
 * Page component
 * ------------------------------------------------------------------------- */

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
      <div style={{ padding: '80px 48px', maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 16, color: 'var(--colors-text, #111)' }}>
          Archive entry not found
        </h2>
        <Link to="/archive" style={{ color: 'var(--colors-accent, #666)', textDecoration: 'none' }}>
          ← Back to Archive
        </Link>
      </div>
    )
  }

  if (!detail) return null

  const colors = swatches(detail.tokens)
  const fonts = pairs(detail.tokens, 'fonts')
  const fontSizes = pairs(detail.tokens, 'fontSizes')
  const sections = briefSections(detail.adBrief)

  return (
    <>
      {/* ── Section 1: Design Brief ─────────────────────────────────── */}
      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '120px 48px 80px',
        }}
      >
        {(detail.legacyArchetype ?? detail.chassis) && (
          <p
            style={{
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              fontSize: 12,
              color: 'var(--colors-text-dim, #888)',
              marginBottom: 8,
            }}
          >
            {detail.legacyArchetype ?? detail.chassis}
          </p>
        )}

        <time
          dateTime={detail.date}
          style={{
            display: 'block',
            fontSize: 13,
            color: 'var(--colors-text-dim, #999)',
            fontVariantNumeric: 'tabular-nums',
            marginBottom: 32,
          }}
        >
          {formatDate(detail.date)}
        </time>

        {detail.brief && (
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              lineHeight: 1.45,
              color: 'var(--colors-text, #111)',
              marginBottom: 32,
              maxWidth: 640,
            }}
          >
            {detail.brief}
          </h1>
        )}

        {detail.rationale && (
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--colors-text-dim, #555)',
              maxWidth: 640,
            }}
          >
            {detail.rationale.split('\n\n').map((para, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static string split, rendered once, never reordered.
              <p key={i} style={{ marginBottom: 16 }}>
                {para}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 2: Tokens ───────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 48px 64px',
        }}
      >
        <p
          style={{
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            fontSize: 12,
            color: 'var(--colors-text-dim, #888)',
            marginBottom: 24,
          }}
        >
          TOKENS
        </p>

        {!detail.tokens ? (
          <p
            style={{
              fontSize: 14,
              color: 'var(--colors-text-dim, #999)',
              fontStyle: 'italic',
            }}
          >
            Tokens not available for this build.
          </p>
        ) : (
          <>
            {/* Color swatches */}
            {colors.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--colors-text, #111)',
                    marginBottom: 12,
                  }}
                >
                  Colors
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  {colors.map((c) => (
                    <div
                      key={`${c.name}-${c.hex}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 6,
                          backgroundColor: c.hex,
                          border: '1px solid var(--colors-border, #e0e0e0)',
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          color: 'var(--colors-text-dim, #999)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {c.hex}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: 'var(--colors-text-dim, #aaa)',
                        }}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Typography — the preset holds no fonts on most nights; the
                chassis is what names the type pairing. */}
            {(detail.chassis || fonts.length > 0) && (
              <div style={{ marginBottom: 32 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--colors-text, #111)',
                    marginBottom: 12,
                  }}
                >
                  Typography
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {detail.chassis && (
                    <p
                      style={{
                        fontSize: 20,
                        color: 'var(--colors-text, #111)',
                      }}
                    >
                      {detail.chassis}
                    </p>
                  )}
                  {fonts.map((font) => (
                    <p
                      key={font.name}
                      style={{
                        fontSize: 12,
                        color: 'var(--colors-text-dim, #999)',
                        fontFamily: 'monospace',
                      }}
                    >
                      {font.name}: {font.value}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Font sizes */}
            {fontSizes.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--colors-text, #111)',
                    marginBottom: 12,
                  }}
                >
                  Scale
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px 24px',
                  }}
                >
                  {fontSizes.map((s) => (
                    <span
                      key={s.name}
                      style={{
                        fontSize: 13,
                        color: 'var(--colors-text-dim, #777)',
                        fontFamily: 'monospace',
                      }}
                    >
                      {s.name}: {s.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Section 3: Signals ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 48px 64px',
        }}
      >
        <p
          style={{
            fontVariant: 'all-small-caps',
            letterSpacing: '0.15em',
            fontSize: 12,
            color: 'var(--colors-text-dim, #888)',
            marginBottom: 24,
          }}
        >
          SIGNALS
        </p>

        {sections.length === 0 ? (
          <p
            style={{
              fontSize: 14,
              color: 'var(--colors-text-dim, #999)',
              fontStyle: 'italic',
            }}
          >
            The Art Director's brief was not kept for this build.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {sections.map((section) => (
              <div key={section.heading}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--colors-text, #111)',
                    marginBottom: 8,
                  }}
                >
                  {section.heading}
                </p>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'var(--colors-text-dim, #666)',
                  }}
                >
                  {section.body.split('\n\n').map((para, j) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static string split, rendered once, never reordered.
                    <p key={j} style={{ marginBottom: 10 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Screenshot ──────────────────────────────────────── */}
      {detail.hasScreenshot && (
        <section
          style={{
            maxWidth: 720,
            margin: '0 auto',
            padding: '0 48px 48px',
          }}
        >
          <p
            style={{
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              fontSize: 12,
              color: 'var(--colors-text-dim, #888)',
              marginBottom: 24,
            }}
          >
            PREVIEW
          </p>
          <img
            src={`/archive-data/${detail.date}.png`}
            alt={`Screenshot of the design from ${detail.date}`}
            style={{
              width: '100%',
              border: '1px solid var(--colors-border, #e0e0e0)',
              borderRadius: 4,
            }}
          />
        </section>
      )}

      {/* ── Section 4: Actions ──────────────────────────────────────── */}
      <section
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 48px 120px',
          display: 'flex',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <Link
          to="/archive"
          style={{
            fontSize: 14,
            color: 'var(--colors-accent, #666)',
            textDecoration: 'none',
          }}
        >
          ← Back to Archive
        </Link>
        <a
          href={`/archive/${detail.date}/`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 14,
            color: 'var(--colors-accent, #666)',
            textDecoration: 'none',
          }}
        >
          View archived site ↗
        </a>
      </section>
    </>
  )
}
