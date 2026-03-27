import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div>

      {/* ── Band 1: Identity Header ── */}
      <div style={{
        backgroundColor: '#19130D',
        padding: '80px 48px 88px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6A5840',
            fontFamily: '"DM Sans", sans-serif',
            marginBottom: '20px',
          }}>
            {identity.role}
          </div>
          <h1 style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 500,
            color: '#F8F5F0',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
          }}>
            {identity.name}
          </h1>
          <p style={{
            fontFamily: '"Lora", serif',
            fontSize: '21px',
            lineHeight: 1.55,
            color: '#D8CEBD',
            maxWidth: '600px',
          }}>
            {identity.statement}
          </p>
        </div>
      </div>

      {/* ── Band 2: Timeline ── */}
      <div style={{
        backgroundColor: '#EEE8DF',
        padding: '96px 48px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}>
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#907A5C',
              fontFamily: '"DM Sans", sans-serif',
            }}>
              Career
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
          </div>

          <div>
            {timeline.map((entry, i) => (
              <div
                key={`${entry.year}-${entry.company}-${i}`}
                className="timeline-entry"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '40px',
                  padding: '32px 0',
                }}
              >
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '12px',
                  color: entry.current ? '#E8950E' : '#907A5C',
                  letterSpacing: '0.05em',
                  paddingTop: '2px',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {entry.year}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <span style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#2D241A',
                    }}>
                      {entry.role}
                    </span>
                    {entry.current && (
                      <span style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '9px',
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: '#E8950E',
                        border: '1px solid #E8950E',
                        padding: '2px 6px',
                      }}>
                        Now
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    color: '#907A5C',
                    marginBottom: '8px',
                    letterSpacing: '0.02em',
                  }}>
                    {entry.company}
                  </div>
                  <p style={{
                    fontFamily: '"Lora", serif',
                    fontSize: '15px',
                    color: '#6A5840',
                    lineHeight: 1.55,
                  }}>
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          {education && (
            <div style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid #D8CEBD' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '32px',
              }}>
                <span style={{
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#907A5C',
                  fontFamily: '"DM Sans", sans-serif',
                }}>
                  Education
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '40px' }}>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '12px',
                  color: '#907A5C',
                  letterSpacing: '0.05em',
                }}>
                  {education.years}
                </div>
                <div>
                  <div style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#2D241A',
                    marginBottom: '4px',
                  }}>
                    {education.degree}
                  </div>
                  <div style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    color: '#907A5C',
                    marginBottom: '4px',
                  }}>
                    {education.school}
                  </div>
                  {education.concentration && (
                    <div style={{
                      fontFamily: '"Lora", serif',
                      fontSize: '14px',
                      fontStyle: 'italic',
                      color: '#6A5840',
                    }}>
                      {education.concentration}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Band 3: Capabilities + Personal ── */}
      <div style={{
        backgroundColor: '#F8F5F0',
        padding: '96px 48px',
        borderTop: '1px solid #D8CEBD',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}>
          {/* Capabilities */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}>
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#907A5C',
                fontFamily: '"DM Sans", sans-serif',
              }}>
                Capabilities
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {capabilities.map((cap) => (
                <span key={cap} className="capability-tag">
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Personal */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}>
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#907A5C',
                fontFamily: '"DM Sans", sans-serif',
              }}>
                Personal
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#907A5C',
                  marginBottom: '6px',
                }}>
                  Currently
                </div>
                <p style={{
                  fontFamily: '"Lora", serif',
                  fontSize: '15px',
                  color: '#6A5840',
                  lineHeight: 1.55,
                }}>
                  {personal.currentFocus}
                </p>
              </div>
              <div>
                <div style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#907A5C',
                  marginBottom: '6px',
                }}>
                  Sport
                </div>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '15px',
                  color: '#2D241A',
                }}>
                  {personal.sport}
                  {personal.holesInOne > 0 && (
                    <span style={{ color: '#907A5C', fontSize: '13px', marginLeft: '8px' }}>
                      {personal.holesInOne} hole{personal.holesInOne > 1 ? 's' : ''} in one
                    </span>
                  )}
                </p>
              </div>
              {personal.teams && personal.teams.length > 0 && (
                <div>
                  <div style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#907A5C',
                    marginBottom: '6px',
                  }}>
                    Teams
                  </div>
                  <p style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '15px',
                    color: '#2D241A',
                  }}>
                    {personal.teams.join(' · ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        backgroundColor: '#2D241A',
        padding: '64px 48px',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
          <div style={{ display: 'flex', gap: '48px', alignItems: 'baseline' }}>
            <a href="/" style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              color: '#B5A98D',
              textDecoration: 'none',
            }}>
              Doug March
            </a>
            <a href="/" className="footer-link">Work</a>
          </div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: '#6A5840',
          }}>
            {new Date().getFullYear()}
          </div>
        </div>
      </div>

    </div>
  )
}