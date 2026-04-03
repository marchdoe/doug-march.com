import { createFileRoute } from '@tanstack/react-router'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const ABOUT_STYLES = `
  .timeline-row {
    display: flex;
    gap: 0;
    padding: 16px 0;
    border-bottom: 1px solid #E8EBE1;
    transition: background 200ms ease;
  }
  .timeline-row:last-child {
    border-bottom: none;
  }
  .timeline-role {
    font-family: Switzer, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #2D3224;
    transition: color 300ms ease;
  }
  .timeline-row:hover .timeline-role {
    color: #C26535;
  }
  .section-label {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .section-label-text {
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 9px;
    color: #8A9280;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 500;
    white-space: nowrap;
  }
  .section-label-rule {
    flex: 1;
    height: 1px;
    background: #D2D6C8;
  }
`

// ─── Section Label Helper ─────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="section-label">
      <span className="section-label-text">{label}</span>
      <span className="section-label-rule" />
    </div>
  )
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <>
      <style>{ABOUT_STYLES}</style>
      <div
        style={{
          maxWidth: '1296px',
          margin: '0 auto',
          padding: '40px 48px 80px',
        }}
      >
        {/* ── Identity Header ── */}
        <div style={{ marginBottom: '48px' }}>
          <h1
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: '37px',
              fontWeight: 400,
              color: '#1D2219',
              letterSpacing: '-0.025em',
              lineHeight: 1.0,
              marginBottom: '10px',
            }}
          >
            {identity.name}
          </h1>
          <div
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '14px',
              color: '#636B56',
              letterSpacing: '0.04em',
              marginBottom: '20px',
            }}
          >
            {identity.role}
          </div>
          <div
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '16px',
              color: '#484F3C',
              lineHeight: 1.6,
              maxWidth: '560px',
            }}
          >
            {identity.statement}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          style={{ height: '1px', background: '#D2D6C8', marginBottom: '48px' }}
        />

        {/* ── Two-Column Layout: Timeline | Aside ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '7fr 5fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* ── Left: Timeline + Education ── */}
          <div>
            <SectionLabel label="Experience" />
            <div>
              {timeline.map((entry, i) => (
                <div key={`${entry.year}-${entry.company}-${i}`} className="timeline-row">
                  {/* Year — fixed-width column so ranges and single years align */}
                  <div
                    style={{
                      minWidth: '120px',
                      flexShrink: 0,
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#8A9280',
                      letterSpacing: '-0.01em',
                      paddingTop: '2px',
                      lineHeight: 1.4,
                    }}
                  >
                    {entry.year}
                  </div>

                  {/* Role + Company + Description */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '8px',
                        flexWrap: 'wrap' as const,
                        marginBottom: '3px',
                      }}
                    >
                      <span className="timeline-role">{entry.role}</span>
                      <span
                        style={{
                          fontFamily: '"IBM Plex Sans", sans-serif',
                          fontSize: '12px',
                          color: '#636B56',
                          letterSpacing: '0em',
                        }}
                      >
                        {entry.company}
                      </span>
                      {entry.current && (
                        <span
                          style={{
                            fontFamily: '"IBM Plex Sans", sans-serif',
                            fontSize: '9px',
                            color: '#C26535',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase' as const,
                          }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: '"IBM Plex Sans", sans-serif',
                        fontSize: '13px',
                        color: '#636B56',
                        lineHeight: 1.6,
                      }}
                    >
                      {entry.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            {education && (
              <div style={{ marginTop: '40px' }}>
                <SectionLabel label="Education" />
                <div style={{ display: 'flex', gap: '0' }}>
                  <div
                    style={{
                      minWidth: '120px',
                      flexShrink: 0,
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#8A9280',
                      letterSpacing: '-0.01em',
                      paddingTop: '2px',
                    }}
                  >
                    {education.years}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Switzer, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#2D3224',
                        marginBottom: '2px',
                      }}
                    >
                      {education.school}
                    </div>
                    <div
                      style={{
                        fontFamily: '"IBM Plex Sans", sans-serif',
                        fontSize: '12px',
                        color: '#636B56',
                      }}
                    >
                      {education.degree} · {education.concentration}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Capabilities + Personal ── */}
          <div>
            {/* Capabilities */}
            <div style={{ marginBottom: '40px' }}>
              <SectionLabel label="Capabilities" />
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {capabilities.map((cap) => (
                  <span
                    key={cap}
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#484F3C',
                      background: '#E8EBE1',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal */}
            <div>
              <SectionLabel label="Personal" />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {/* Sport */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '12px 0',
                    borderBottom: '1px solid #E8EBE1',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#8A9280',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Sport
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#484F3C',
                    }}
                  >
                    {personal.sport}
                  </span>
                </div>

                {/* Holes in one */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #E8EBE1',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#8A9280',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Holes in one
                  </span>
                  <span
                    style={{
                      fontFamily: 'Switzer, sans-serif',
                      fontSize: '21px',
                      fontWeight: 300,
                      color: '#C26535',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.0,
                    }}
                  >
                    {personal.holesInOne}
                  </span>
                </div>

                {/* Teams */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '12px 0',
                    borderBottom: '1px solid #E8EBE1',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#8A9280',
                      letterSpacing: '0.04em',
                      flexShrink: 0,
                    }}
                  >
                    Teams
                  </span>
                  <div style={{ textAlign: 'right' as const }}>
                    {personal.teams.map((team) => (
                      <div
                        key={team}
                        style={{
                          fontFamily: '"IBM Plex Sans", sans-serif',
                          fontSize: '13px',
                          color: '#484F3C',
                          lineHeight: 1.6,
                        }}
                      >
                        {team}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current focus */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '12px 0',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#8A9280',
                      letterSpacing: '0.04em',
                      flexShrink: 0,
                    }}
                  >
                    Current focus
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#484F3C',
                      textAlign: 'right' as const,
                      lineHeight: 1.5,
                    }}
                  >
                    {personal.currentFocus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}