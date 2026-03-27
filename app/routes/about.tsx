import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionLabel = css({
  fontFamily: 'heading',
  fontSize: 'xs',
  color: 'textMuted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  fontWeight: '600',
  display: 'block',
  marginBottom: '6',
})

function AboutPage() {
  return (
    <main>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        {/* Statement band */}
        <div
          style={{
            background: '#192535',
            padding: '48px 56px',
            marginBottom: '16px',
            boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px',
              color: '#4B6478',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {identity.role}
          </p>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4vw, 50px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#EEF2F8',
              marginBottom: '28px',
              maxWidth: '800px',
            }}
          >
            {identity.name}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px',
              fontWeight: 300,
              color: '#93A8BC',
              lineHeight: 1.75,
              maxWidth: '640px',
            }}
          >
            {identity.statement}
          </p>
        </div>

        {/* Two-column zone: Timeline + Sidebar info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '16px',
          }}
        >
          {/* Timeline */}
          <div
            style={{
              background: '#192535',
              padding: '36px 40px',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
            }}
          >
            <span className={sectionLabel}>Timeline</span>
            <div>
              {timeline.map((entry) => (
                <div
                  key={entry.year + entry.company}
                  style={{
                    display: 'flex',
                    gap: '32px',
                    padding: '16px 0',
                    borderBottom: '1px solid #1F3346',
                  }}
                >
                  <div
                    style={{
                      minWidth: '52px',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '11px',
                        color: entry.current ? '#A8C040' : '#4B6478',
                        letterSpacing: '0.08em',
                        fontVariantNumeric: 'tabular-nums',
                        fontWeight: entry.current ? 600 : 400,
                      }}
                    >
                      {entry.year}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#EEF2F8',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {entry.role}
                      </span>
                      {entry.current && (
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '8px',
                            color: '#A8C040',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            padding: '2px 6px',
                            border: '1px solid #7A9022',
                          }}
                        >
                          Now
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '13px',
                        color: '#4AA494',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      {entry.company}
                    </span>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#4B6478',
                        lineHeight: 1.55,
                      }}
                    >
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            {education && (
              <div style={{ marginTop: '32px' }}>
                <span className={sectionLabel}>Education</span>
                <div
                  style={{
                    display: 'flex',
                    gap: '32px',
                    paddingTop: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '11px',
                      color: '#4B6478',
                      letterSpacing: '0.08em',
                      minWidth: '52px',
                      flexShrink: 0,
                    }}
                  >
                    {education.years}
                  </span>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#EEF2F8',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      {education.school}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '13px',
                        color: '#4B6478',
                      }}
                    >
                      {education.degree} — {education.concentration}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Capabilities + Personal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Capabilities */}
            <div
              style={{
                background: '#192535',
                padding: '28px 28px',
                boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
              }}
            >
              <span className={sectionLabel}>Capabilities</span>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {capabilities.map((cap) => (
                  <span
                    key={cap}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '12px',
                      fontWeight: 300,
                      color: '#93A8BC',
                      padding: '4px 10px',
                      border: '1px solid #1F3346',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal */}
            <div
              style={{
                background: '#192535',
                padding: '28px 28px',
                boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
              }}
            >
              <span className={sectionLabel}>Personal</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderBottom: '1px solid #1F3346', paddingBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '9px',
                      color: '#4B6478',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Currently
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#93A8BC',
                      lineHeight: 1.55,
                    }}
                  >
                    {personal.currentFocus}
                  </span>
                </div>
                <div style={{ borderBottom: '1px solid #1F3346', paddingBottom: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '9px',
                      color: '#4B6478',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Teams
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#93A8BC',
                    }}
                  >
                    {personal.teams.join(', ')}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '9px',
                      color: '#4B6478',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    {personal.sport}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#93A8BC',
                    }}
                  >
                    {personal.holesInOne} hole{personal.holesInOne !== 1 ? 's' : ''} in one
                  </span>
                </div>
              </div>
            </div>

            {/* Quote panel */}
            <div
              style={{
                padding: '28px',
                borderLeft: '1px solid #1F3346',
                flex: 1,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: '13px',
                  color: '#4B6478',
                  lineHeight: 1.75,
                  letterSpacing: '0.04em',
                  fontStyle: 'italic',
                }}
              >
                Even if you persuade me,<br />you won't persuade me.
              </p>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '9px',
                  color: '#344D62',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '12px',
                }}
              >
                Aristophanes
              </span>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}