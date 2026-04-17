import { createFileRoute } from '@tanstack/react-router'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionMarker = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '9px',
  color: '#78947A',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  marginBottom: '32px',
}

const indexLabel = {
  position: 'absolute' as const,
  left: '28px',
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '9px',
  color: '#A9BBAA',
  letterSpacing: '0.05em',
}

function AboutPage() {
  return (
    <div>
      {/* Section 01: Identity */}
      <div
        style={{
          position: 'relative',
          padding: '80px 56px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '80px' }}>01</span>

        <div style={sectionMarker}>About</div>

        <h1
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 600,
            fontSize: '37px',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            color: '#192B1A',
            marginBottom: '24px',
          }}
        >
          {identity.name}
        </h1>

        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            color: '#78947A',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          {identity.role}
        </div>

        <p
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: '21px',
            fontWeight: 300,
            color: '#3D5C3F',
            lineHeight: '1.55',
            maxWidth: '520px',
          }}
        >
          {identity.statement}
        </p>
      </div>

      {/* Section 02: Timeline */}
      <div
        style={{
          position: 'relative',
          padding: '56px 56px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '56px' }}>02</span>

        <div style={sectionMarker}>Experience</div>

        <div>
          {timeline.map((entry, i) => (
            <div
              key={entry.year + entry.company + i}
              style={{
                display: 'flex',
                gap: '32px',
                padding: '20px 0',
                borderBottom: '1px solid #E5EDE6',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '12px',
                  color: '#78947A',
                  letterSpacing: '0.05em',
                  minWidth: '120px',
                  flexShrink: 0,
                  paddingTop: '2px',
                  lineHeight: '1.55',
                }}
              >
                {entry.year}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '12px',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#192B1A',
                      lineHeight: '1.15',
                    }}
                  >
                    {entry.role}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Source Sans 3", sans-serif',
                      fontSize: '14px',
                      color: '#519A58',
                    }}
                  >
                    {entry.company}
                  </div>
                  {entry.current && (
                    <div
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '9px',
                        color: '#519A58',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        border: '1px solid #519A58',
                        padding: '1px 6px',
                      }}
                    >
                      Current
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: '"Source Sans 3", sans-serif',
                    fontSize: '14px',
                    color: '#78947A',
                    lineHeight: '1.55',
                  }}
                >
                  {entry.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginTop: '40px' }}>
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '9px',
              color: '#A9BBAA',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Education
          </div>
          <div
            style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                color: '#78947A',
                minWidth: '120px',
                flexShrink: 0,
              }}
            >
              {education.years}
            </div>
            <div>
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#192B1A',
                  marginBottom: '4px',
                }}
              >
                {education.school}
              </div>
              <div
                style={{
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontSize: '14px',
                  color: '#78947A',
                }}
              >
                {education.degree} &middot; {education.concentration}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 03: Capabilities */}
      <div
        style={{
          position: 'relative',
          padding: '64px 56px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '64px' }}>03</span>

        <div style={sectionMarker}>Capabilities</div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {capabilities.map((cap) => (
            <div
              key={cap}
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                color: '#3D5C3F',
                background: '#EAEEEB',
                padding: '6px 12px',
                letterSpacing: '0.05em',
                border: '1px solid #CDD9CE',
                borderRadius: '0px',
              }}
            >
              {cap}
            </div>
          ))}
        </div>
      </div>

      {/* Section 04: Personal */}
      <div
        style={{
          position: 'relative',
          padding: '64px 56px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '64px' }}>04</span>

        <div style={sectionMarker}>Personal</div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            maxWidth: '560px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                color: '#A9BBAA',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Sport
            </div>
            <div
              style={{
                fontFamily: '"Source Sans 3", sans-serif',
                fontSize: '16px',
                color: '#192B1A',
              }}
            >
              {personal.sport}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                color: '#A9BBAA',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Holes in One
            </div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 600,
                fontSize: '28px',
                color: '#192B1A',
                lineHeight: '1.05',
              }}
            >
              {personal.holesInOne}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                color: '#A9BBAA',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Teams
            </div>
            <div
              style={{
                fontFamily: '"Source Sans 3", sans-serif',
                fontSize: '14px',
                color: '#3D5C3F',
                lineHeight: '1.55',
              }}
            >
              {personal.teams.join(', ')}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9px',
                color: '#A9BBAA',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Current Focus
            </div>
            <div
              style={{
                fontFamily: '"Source Sans 3", sans-serif',
                fontSize: '14px',
                color: '#3D5C3F',
                lineHeight: '1.55',
              }}
            >
              {personal.currentFocus}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '28px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '9px',
            color: '#A9BBAA',
            letterSpacing: '0.12em',
          }}
        >
          doug-march.com &nbsp;·&nbsp; 2026
        </span>
        <a
          href="/archive"
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: '12px',
            color: '#78947A',
            textDecoration: 'none',
          }}
        >
          archive
        </a>
      </div>
    </div>
  )
}