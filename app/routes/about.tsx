import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const OBSIDIAN    = '#0C1A23'
const CARD_DARK   = '#172B34'
const STONE_LIGHT = '#E6E2DC'
const AMBER       = '#C48930'
const TEXT_P      = '#EEF3F5'
const TEXT_S      = '#B3CAD4'
const TEXT_M      = '#577E8E'
const DARK_P      = '#172B34'
const DARK_S      = '#274048'
const DARK_M      = '#84A8B8'
const BORDER_RULE = '#B3CAD4'

const BC  = '"Barlow Condensed", sans-serif'
const IPS = '"IBM Plex Sans", sans-serif'

const PAGE_STYLES = `
  .about-nav-link div {
    transition: border-left-color 150ms ease, color 150ms ease, padding-left 150ms ease;
  }
  .about-nav-link:hover div {
    border-left-color: #C48930 !important;
    color: #EEF3F5 !important;
    padding-left: 12px !important;
  }
  .about-right-scroll { scrollbar-width: none; }
  .about-right-scroll::-webkit-scrollbar { display: none; }
  .cap-tag:hover { background: rgba(196,137,48,0.08) !important; }
`

function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '38% 1fr',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: IPS,
        position: 'relative',
      }}>

        {/* Left panel */}
        <div style={{
          height: '100vh',
          overflow: 'hidden',
          background: OBSIDIAN,
          borderRight: `1px solid ${AMBER}`,
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Back to work */}
          <div style={{ flexShrink: 0, marginBottom: '32px' }}>
            <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: BC,
                fontSize: '0.5625rem',
                fontWeight: 400,
                letterSpacing: '0.10em',
                color: TEXT_M,
                textTransform: 'uppercase',
              }}>← WORK</span>
            </a>
          </div>

          {/* Identity */}
          <div style={{
            flexShrink: 0,
            paddingBottom: '28px',
            borderBottom: `1px solid ${CARD_DARK}`,
          }}>
            <div style={{
              fontFamily: BC,
              fontSize: '3.125rem',
              fontWeight: 700,
              lineHeight: '0.92',
              letterSpacing: '-0.02em',
              color: TEXT_P,
              textTransform: 'uppercase',
            }}>
              DOUG<br />MARCH
            </div>
            <div style={{
              marginTop: '12px',
              fontFamily: IPS,
              fontSize: '0.5625rem',
              fontWeight: 300,
              letterSpacing: '0.10em',
              color: TEXT_S,
              textTransform: 'uppercase',
            }}>
              {identity.role}
            </div>
          </div>

          {/* Nav */}
          <nav style={{
            flexShrink: 0,
            padding: '20px 0',
            borderBottom: `1px solid ${CARD_DARK}`,
          }}>
            {[
              { label: 'WORK',  href: '/'      },
              { label: 'ABOUT', href: '/about' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="about-nav-link" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: BC,
                  fontSize: '0.75rem',
                  fontWeight: label === 'ABOUT' ? 600 : 400,
                  letterSpacing: '0.06em',
                  color: label === 'ABOUT' ? TEXT_P : TEXT_S,
                  textTransform: 'uppercase',
                  paddingLeft: label === 'ABOUT' ? '12px' : '14px',
                  borderLeft: label === 'ABOUT' ? `2px solid ${AMBER}` : '2px solid transparent',
                }}>
                  {label}
                </div>
              </a>
            ))}
          </nav>

          {/* Statement */}
          <div style={{
            flex: 1,
            paddingTop: '24px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}>
            <div style={{
              fontFamily: IPS,
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: '1.65',
              color: TEXT_S,
              letterSpacing: '0.01em',
            }}>
              {identity.statement}
            </div>

            {/* Personal data */}
            <div style={{ marginTop: '32px' }}>
              {[
                { label: 'SPORT',   value: personal.sport },
                { label: 'TEAMS',   value: personal.teams.join(' · ') },
                { label: 'FOCUS',   value: personal.currentFocus },
                { label: 'ACE',     value: `${personal.holesInOne} hole${personal.holesInOne !== 1 ? 's' : ''} in one` },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '12px',
                  borderBottom: `1px solid ${CARD_DARK}`,
                  marginBottom: '12px',
                }}>
                  <span style={{
                    fontFamily: IPS,
                    fontSize: '0.5625rem',
                    fontWeight: 500,
                    letterSpacing: '0.10em',
                    color: TEXT_M,
                    textTransform: 'uppercase',
                    minWidth: '48px',
                    flexShrink: 0,
                    paddingTop: '1px',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: IPS,
                    fontSize: '0.75rem',
                    fontWeight: 300,
                    color: TEXT_S,
                    lineHeight: '1.5',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            flexShrink: 0,
            paddingTop: '20px',
            borderTop: `1px solid ${CARD_DARK}`,
          }}>
            <div style={{
              fontFamily: IPS,
              fontSize: '0.5625rem',
              fontWeight: 300,
              letterSpacing: '0.10em',
              color: TEXT_M,
              textTransform: 'uppercase',
            }}>
              2026 · Doug March
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="about-right-scroll" style={{
          height: '100vh',
          overflowY: 'auto',
          background: STONE_LIGHT,
          padding: '48px 40px',
        }}>
          <div style={{ maxWidth: '540px' }}>

            {/* Section: Experience */}
            <RightSectionHeader label="EXPERIENCE" />
            <div style={{ marginBottom: '48px' }}>
              {timeline.map((entry, i) => (
                <div key={`${entry.year}-${entry.company}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr',
                  gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: i < timeline.length - 1 ? `1px solid rgba(132, 168, 184, 0.3)` : 'none',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    fontFamily: IPS,
                    fontSize: '0.5625rem',
                    fontWeight: 400,
                    color: DARK_M,
                    fontVariantNumeric: 'tabular-nums',
                    paddingTop: '3px',
                    letterSpacing: '0.04em',
                  }}>
                    {entry.year}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: BC,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: DARK_P,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.1',
                      marginBottom: '3px',
                    }}>
                      {entry.role}
                    </div>
                    <div style={{
                      fontFamily: IPS,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: DARK_S,
                      letterSpacing: '0.04em',
                      marginBottom: '6px',
                    }}>
                      {entry.company}
                      {entry.current && (
                        <span style={{
                          marginLeft: '8px',
                          fontFamily: IPS,
                          fontSize: '0.5625rem',
                          fontWeight: 500,
                          color: AMBER,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}>NOW</span>
                      )}
                    </div>
                    <div style={{
                      fontFamily: IPS,
                      fontSize: '0.75rem',
                      fontWeight: 300,
                      color: DARK_S,
                      lineHeight: '1.65',
                    }}>
                      {entry.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Section: Capabilities */}
            <RightSectionHeader label="CAPABILITIES" />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '48px',
            }}>
              {capabilities.map((cap) => (
                <div
                  key={cap}
                  className="cap-tag"
                  style={{
                    fontFamily: IPS,
                    fontSize: '0.5625rem',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    color: DARK_S,
                    textTransform: 'uppercase',
                    padding: '5px 10px',
                    border: `1px solid ${BORDER_RULE}`,
                    background: 'transparent',
                    transition: 'background 150ms ease',
                  }}
                >
                  {cap}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function RightSectionHeader({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    }}>
      <span style={{
        fontFamily: IPS,
        fontSize: '0.5625rem',
        fontWeight: 500,
        letterSpacing: '0.10em',
        color: DARK_M,
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: BORDER_RULE }} />
    </div>
  )
}