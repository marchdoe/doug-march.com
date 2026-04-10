import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
    }}>
      <span style={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '9px',
        fontWeight: 300,
        color: '#849690',
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        whiteSpace: 'nowrap' as const,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#CDD9D5' }} />
    </div>
  )
}

function AboutPage() {
  return (
    <>
      {/* Identity */}
      <section style={{ marginBottom: '72px' }}>
        <h1 style={{
          fontFamily: '"Fraunces", serif',
          fontSize: '37px',
          fontWeight: 300,
          color: '#2D3E39',
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          marginBottom: '16px',
        }}>
          {identity.name}
        </h1>
        <div style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '9px',
          fontWeight: 300,
          color: '#849690',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '24px',
        }}>
          {identity.role}
        </div>
        <p style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '16px',
          fontWeight: 400,
          color: '#435651',
          lineHeight: 1.55,
          maxWidth: '540px',
        }}>
          {identity.statement}
        </p>
      </section>

      {/* Timeline */}
      <section style={{ marginBottom: '64px' }}>
        <SectionDivider label="Experience" />
        <div>
          {timeline.map((entry, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '32px',
                padding: '20px 0',
                borderBottom: '1px solid #CDD9D5',
              }}
            >
              <div style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '12px',
                fontWeight: 300,
                color: '#849690',
                minWidth: '120px',
                flexShrink: 0,
                paddingTop: '3px',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1.4,
              }}>
                {entry.year}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: '"Fraunces", serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#2D3E39',
                  lineHeight: 1.2,
                  marginBottom: '3px',
                }}>
                  {entry.role}
                </div>
                <div style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#5E726C',
                  marginBottom: entry.description ? '8px' : '0',
                }}>
                  {entry.company}
                  {entry.current && (
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '9px',
                      fontWeight: 300,
                      color: '#5D8A69',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      Current
                    </span>
                  )}
                </div>
                {entry.description && (
                  <div style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: '#849690',
                    lineHeight: 1.55,
                  }}>
                    {entry.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ marginBottom: '64px' }}>
        <SectionDivider label="Capabilities" />
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          {capabilities.map((cap) => (
            <span
              key={cap}
              style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '12px',
                fontWeight: 300,
                color: '#5E726C',
                background: '#EEF5F1',
                padding: '5px 12px',
                borderRadius: '2px',
                border: '1px solid #CDD9D5',
                lineHeight: 1.4,
              }}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section style={{ marginBottom: '64px' }}>
        <SectionDivider label="Education" />
        <div style={{
          display: 'flex',
          gap: '32px',
          padding: '20px 0',
          borderBottom: '1px solid #CDD9D5',
        }}>
          <div style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '12px',
            fontWeight: 300,
            color: '#849690',
            minWidth: '120px',
            flexShrink: 0,
            paddingTop: '3px',
          }}>
            {education.years}
          </div>
          <div>
            <div style={{
              fontFamily: '"Fraunces", serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#2D3E39',
              lineHeight: 1.2,
              marginBottom: '4px',
            }}>
              {education.school}
            </div>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              color: '#5E726C',
            }}>
              {education.degree}
            </div>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              color: '#849690',
              marginTop: '2px',
            }}>
              {education.concentration}
            </div>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section>
        <SectionDivider label="Personal" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: '#849690',
              minWidth: '120px',
              flexShrink: 0,
            }}>
              Currently
            </span>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#5E726C',
              lineHeight: 1.5,
            }}>
              {personal.currentFocus}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: '#849690',
              minWidth: '120px',
              flexShrink: 0,
            }}>
              Sport
            </span>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#5E726C',
            }}>
              {personal.sport}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: '#849690',
              minWidth: '120px',
              flexShrink: 0,
            }}>
              Holes in one
            </span>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#5E726C',
            }}>
              {personal.holesInOne}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: '#849690',
              minWidth: '120px',
              flexShrink: 0,
            }}>
              Teams
            </span>
            <span style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              color: '#5E726C',
            }}>
              {personal.teams.join(', ')}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}