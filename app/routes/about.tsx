import { createFileRoute } from '@tanstack/react-router'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const FONT_HEADING = '"Syne", sans-serif'
const FONT_BODY = '"IBM Plex Sans", sans-serif'
const FONT_MONO = '"IBM Plex Mono", monospace'

function AboutPage() {
  return (
    <div style={{ backgroundColor: '#F4F5ED' }}>
      {/* Page header band */}
      <div style={{
        borderBottom: '1px solid #D3D5C6',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 40px 36px 40px',
      }}>
        <div style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#C4992E',
          marginBottom: '16px',
        }}>
          About
        </div>

        <h1 style={{
          fontFamily: FONT_HEADING,
          fontWeight: 700,
          fontSize: '50px',
          lineHeight: '1.08',
          letterSpacing: '-0.025em',
          color: '#1D1F13',
          margin: '0 0 8px 0',
          padding: 0,
        }}>
          {identity.name}
        </h1>

        <div style={{
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: '16px',
          color: '#676A59',
          letterSpacing: '0.03em',
          marginBottom: '24px',
        }}>
          {identity.role}
        </div>

        <p style={{
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: '21px',
          lineHeight: '1.22',
          color: '#4C4F3F',
          maxWidth: '680px',
          margin: 0,
          padding: 0,
        }}>
          {identity.statement}
        </p>
      </div>

      {/* Two-column editorial area */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        minHeight: 'calc(100vh - 52px - 140px)',
      }}>

        {/* LEFT: Timeline */}
        <div style={{ padding: '0 36px 48px 40px', borderRight: '1px solid #D3D5C6' }}>

          {/* Timeline section label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '36px',
            borderBottom: '1px solid #D3D5C6',
          }}>
            <span style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#676A59',
            }}>
              Experience
            </span>
          </div>

          {timeline.map((entry, i) => (
            <div
              key={`${entry.year}-${entry.company}`}
              style={{
                display: 'flex',
                gap: '0',
                padding: '20px 0',
                borderBottom: '1px solid #E9EAE0',
              }}
            >
              {/* Year column — fixed width so ranges and singles align */}
              <div style={{
                flexShrink: 0,
                width: '140px',
                paddingRight: '24px',
              }}>
                <span style={{
                  fontFamily: FONT_MONO,
                  fontSize: '12px',
                  color: entry.current ? '#C4992E' : '#8C8F7E',
                  lineHeight: '1.58',
                  display: 'block',
                  whiteSpace: 'nowrap',
                }}>
                  {entry.year}
                </span>
              </div>

              {/* Role + company + description */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: entry.current ? 600 : 600,
                    fontSize: '16px',
                    color: entry.current ? '#1D1F13' : '#1D1F13',
                    lineHeight: '1.22',
                  }}>
                    {entry.role}
                  </span>
                  {entry.current && (
                    <span style={{
                      fontFamily: FONT_BODY,
                      fontSize: '9px',
                      color: '#C4992E',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      border: '1px solid #C4992E',
                      padding: '1px 5px',
                      lineHeight: '1.6',
                    }}>
                      Now
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: FONT_BODY,
                  fontSize: '14px',
                  color: '#676A59',
                  marginBottom: '6px',
                }}>
                  {entry.company}
                </div>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: '13px',
                  lineHeight: '1.58',
                  color: '#8C8F7E',
                  margin: 0,
                  padding: 0,
                }}>
                  {entry.description}
                </p>
              </div>
            </div>
          ))}

          {/* Education */}
          <div style={{
            padding: '20px 0',
            borderBottom: '1px solid #E9EAE0',
            display: 'flex',
            gap: '0',
          }}>
            <div style={{ flexShrink: 0, width: '140px', paddingRight: '24px' }}>
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: '12px',
                color: '#8C8F7E',
              }}>
                {education.years}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: '16px',
                color: '#1D1F13',
                marginBottom: '4px',
              }}>
                {education.degree}
              </div>
              <div style={{
                fontFamily: FONT_BODY,
                fontSize: '14px',
                color: '#676A59',
                marginBottom: '4px',
              }}>
                {education.school}
              </div>
              <div style={{
                fontFamily: FONT_BODY,
                fontSize: '13px',
                color: '#8C8F7E',
              }}>
                {education.concentration}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Capabilities + Personal */}
        <div style={{ padding: '0 24px 48px 32px' }}>

          {/* Capabilities section label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '36px',
            borderBottom: '1px solid #D3D5C6',
          }}>
            <span style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#676A59',
            }}>
              Capabilities
            </span>
          </div>

          <div style={{
            paddingTop: '20px',
            paddingBottom: '32px',
            borderBottom: '1px solid #D3D5C6',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {capabilities.map((cap) => (
              <span
                key={cap}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '12px',
                  color: '#4C4F3F',
                  backgroundColor: '#E9EAE0',
                  padding: '4px 10px',
                  letterSpacing: '0.03em',
                }}
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Personal section label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '36px',
            borderBottom: '1px solid #D3D5C6',
          }}>
            <span style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#676A59',
            }}>
              Personal
            </span>
          </div>

          <div style={{ paddingTop: '20px' }}>
            {[
              {
                label: 'Sport',
                value: personal.sport,
              },
              {
                label: 'Teams',
                value: personal.teams.join(', '),
              },
              {
                label: 'Holes in One',
                value: String(personal.holesInOne),
              },
              {
                label: 'Currently',
                value: personal.currentFocus,
              },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '12px 0',
                  borderBottom: '1px solid #E9EAE0',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: '88px',
                  fontFamily: FONT_MONO,
                  fontSize: '11px',
                  color: '#8C8F7E',
                  letterSpacing: '0.05em',
                  paddingTop: '1px',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: FONT_BODY,
                  fontSize: '14px',
                  color: '#4C4F3F',
                  lineHeight: '1.58',
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}