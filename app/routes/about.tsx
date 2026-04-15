import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div>
      {/* Header band — continues dark from Sidebar */}
      <div style={{ background: '#1A1610' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '64px 48px 80px',
          }}
        >
          <div
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              color: '#695F50',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            About
          </div>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(37px, 5vw, 64px)',
              fontWeight: 700,
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: '#EEE8D8',
              margin: '0 0 32px 0',
            }}
          >
            {identity.name}
          </h1>
          <p
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '18px',
              fontWeight: 300,
              color: '#B5AC97',
              lineHeight: '1.62',
              maxWidth: '640px',
              margin: '0',
            }}
          >
            {identity.statement}
          </p>
        </div>
      </div>

      {/* Role / Identity */}
      <div style={{ background: '#F9F6EE' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 48px',
          }}
        >
          <div
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              color: '#695F50',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Identity
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#8C8373',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Role
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '21px',
                  fontWeight: 400,
                  color: '#2D2820',
                  lineHeight: '1.3',
                }}
              >
                {identity.role}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#8C8373',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Focus
              </div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: '#4A4238',
                  lineHeight: '1.62',
                }}
              >
                {personal.currentFocus}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: '#EEE8D8' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 48px',
          }}
        >
          <div
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              color: '#695F50',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Experience
          </div>

          <div style={{ borderTop: '1px solid #D9D1BC' }}>
            {timeline.map((entry, i) => (
              <div
                key={`${entry.year}-${entry.company}-${i}`}
                style={{
                  display: 'flex',
                  gap: '48px',
                  padding: '24px 0',
                  borderBottom: '1px solid #D9D1BC',
                }}
              >
                {/* Year column — fixed width for alignment */}
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#8C8373',
                    minWidth: '140px',
                    flexShrink: 0,
                    paddingTop: '3px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {entry.year}
                  {entry.current && (
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'Source Sans 3, sans-serif',
                        fontSize: '9px',
                        color: '#5E8C55',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginTop: '4px',
                      }}
                    >
                      current
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2D2820',
                      marginBottom: '4px',
                    }}
                  >
                    {entry.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#695F50',
                      marginBottom: '8px',
                    }}
                  >
                    {entry.company}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#8C8373',
                      lineHeight: '1.62',
                    }}
                  >
                    {entry.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginTop: '48px' }}>
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: '#695F50',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Education
            </div>
            <div
              style={{
                display: 'flex',
                gap: '48px',
                padding: '24px 0',
                borderTop: '1px solid #D9D1BC',
                borderBottom: '1px solid #D9D1BC',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  color: '#8C8373',
                  minWidth: '140px',
                  flexShrink: 0,
                  paddingTop: '3px',
                }}
              >
                {education.years}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2D2820',
                    marginBottom: '4px',
                  }}
                >
                  {education.school}
                </div>
                <div
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#695F50',
                  }}
                >
                  {education.degree} · {education.concentration}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div style={{ background: '#F2EDE2' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '80px 48px',
          }}
        >
          <div
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              color: '#695F50',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Capabilities
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '64px',
            }}
          >
            {capabilities.map(cap => (
              <span
                key={cap}
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#4A4238',
                  background: '#D9D1BC',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  letterSpacing: '0.02em',
                }}
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Personal */}
          <div
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '9px',
              fontWeight: 600,
              color: '#695F50',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Personal
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              borderTop: '1px solid #D9D1BC',
              paddingTop: '40px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#8C8373',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Sport
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '21px',
                  fontWeight: 400,
                  color: '#2D2820',
                }}
              >
                {personal.sport}
              </div>
              {personal.holesInOne > 0 && (
                <div
                  style={{
                    fontFamily: 'Source Sans 3, sans-serif',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#695F50',
                    marginTop: '8px',
                  }}
                >
                  {personal.holesInOne} hole{personal.holesInOne !== 1 ? 's' : ''} in one
                </div>
              )}
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#8C8373',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Teams
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {personal.teams.map(team => (
                  <div
                    key={team}
                    style={{
                      fontFamily: 'Source Sans 3, sans-serif',
                      fontSize: '16px',
                      fontWeight: 300,
                      color: '#4A4238',
                    }}
                  >
                    {team}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#8C8373',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Currently
              </div>
              <div
                style={{
                  fontFamily: 'Source Sans 3, sans-serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: '#4A4238',
                  lineHeight: '1.62',
                }}
              >
                {personal.currentFocus}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}