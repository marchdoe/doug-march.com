import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export interface ArchiveDetail {
  date: string
  archetype: string
  brief: string
  signalsBrief: string
  preset: string
  rationale: string
  filesChanged: string[]
  hasScreenshot: boolean
  buildId: string
  trace: string
}

export const Route = createFileRoute('/archive/$date')({
  component: ArchiveDetailPage,
})

/* ---------------------------------------------------------------------------
 * Preset parser — extracts colors, fonts, and font sizes from the raw
 * TypeScript preset string using regex.
 * ------------------------------------------------------------------------- */

interface ParsedTokens {
  colors: { name: string; hex: string }[]
  fonts: string[]
  fontSizes: { name: string; value: string }[]
}

function parsePreset(preset: string): ParsedTokens {
  const colors: ParsedTokens['colors'] = []
  const fonts: string[] = []
  const fontSizes: ParsedTokens['fontSizes'] = []

  // Colors: match key-value pairs like  primary: '#AABBCC'  or  bg: '#FFF'
  // Also handles nested objects like  primary: { value: '#AABBCC' }
  const colorHexRe = /(\w[\w-]*):\s*['{"]?(#[0-9A-Fa-f]{3,8})['"}\s,]/g
  let m: RegExpExecArray | null
  const seen = new Set<string>()
  while ((m = colorHexRe.exec(preset)) !== null) {
    const name = m[1]
    const hex = m[2]
    const key = `${name}-${hex}`
    if (!seen.has(key)) {
      seen.add(key)
      colors.push({ name, hex })
    }
  }

  // Fonts: look for font family values
  const fontRe = /fonts[\s\S]*?value:\s*'([^']+)'/g
  while ((m = fontRe.exec(preset)) !== null) {
    if (!fonts.includes(m[1])) fonts.push(m[1])
  }

  // Also catch fontFamily patterns
  const fontFamilyRe = /fontFamily[^:]*:\s*['"]([^'"]+)['"]/g
  while ((m = fontFamilyRe.exec(preset)) !== null) {
    if (!fonts.includes(m[1])) fonts.push(m[1])
  }

  // Font sizes: key-value pairs in a fontSizes block
  const fontSizeBlock = preset.match(/fontSizes[\s\S]*?\{([\s\S]*?)\}/)?.[1]
  if (fontSizeBlock) {
    const sizeRe = /(\w+):\s*['"]([^'"]+)['"]/g
    while ((m = sizeRe.exec(fontSizeBlock)) !== null) {
      fontSizes.push({ name: m[1], value: m[2] })
    }
  }

  return { colors, fonts, fontSizes }
}

/* ---------------------------------------------------------------------------
 * Signals parser — splits markdown on ## headings into sections.
 * ------------------------------------------------------------------------- */

interface SignalSection {
  heading: string
  body: string
}

function parseSignals(md: string): SignalSection[] {
  const sections: SignalSection[] = []
  const parts = md.split(/^## /m).filter(Boolean)
  for (const part of parts) {
    const newline = part.indexOf('\n')
    if (newline === -1) {
      sections.push({ heading: part.trim(), body: '' })
    } else {
      sections.push({
        heading: part.slice(0, newline).trim(),
        body: part.slice(newline + 1).trim(),
      })
    }
  }
  return sections
}

/* ---------------------------------------------------------------------------
 * Date formatting
 * ------------------------------------------------------------------------- */

function formatDate(date: string): string {
  try {
    const d = new Date(date + 'T12:00:00')
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

function ArchiveDetailPage() {
  const { date } = Route.useParams()
  const [detail, setDetail] = useState<ArchiveDetail | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`/archive/${date}/detail.json`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setDetail(data); else setError(true) })
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

  const tokens = detail.preset ? parsePreset(detail.preset) : null
  const signals = detail.signalsBrief ? parseSignals(detail.signalsBrief) : null

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
        {detail.archetype && (
          <p
            style={{
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              fontSize: 12,
              color: 'var(--colors-text-dim, #888)',
              marginBottom: 8,
            }}
          >
            {detail.archetype}
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

        {!detail.preset ? (
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
            {tokens && tokens.colors.length > 0 && (
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
                  {tokens.colors.map((c, i) => (
                    <div
                      key={i}
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

            {/* Fonts */}
            {tokens && tokens.fonts.length > 0 && (
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
                  {tokens.fonts.map((font, i) => (
                    <div key={i}>
                      <p
                        style={{
                          fontSize: 20,
                          fontFamily: font,
                          color: 'var(--colors-text, #111)',
                          marginBottom: 4,
                        }}
                      >
                        {font}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: 'var(--colors-text-dim, #999)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {font}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Font sizes */}
            {tokens && tokens.fontSizes.length > 0 && (
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
                  {tokens.fontSizes.map((s, i) => (
                    <span
                      key={i}
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

        {!detail.signalsBrief ? (
          <p
            style={{
              fontSize: 14,
              color: 'var(--colors-text-dim, #999)',
              fontStyle: 'italic',
            }}
          >
            Signals brief not available for this build.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {signals?.map((section, i) => (
              <div key={i}>
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
            src={`/archive/${detail.date}.png`}
            alt={`Screenshot of ${detail.archetype} design from ${detail.date}`}
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
          href={`/archive/${detail.date}/index.html`}
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
