import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const FONT_HEADING = '"Syne", sans-serif'
const FONT_BODY = '"IBM Plex Sans", sans-serif'
const FONT_MONO = '"IBM Plex Mono", monospace'

function ColLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: FONT_HEADING,
      fontWeight: 600,
      fontSize: '9px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color: '#676A59',
    }}>
      {children}
    </span>
  )
}

function SectionLabel({ children, color = '#676A59' }: { children: string; color?: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '36px',
      borderTop: '1px solid #D3D5C6',
    }}>
      <span style={{
        fontFamily: FONT_HEADING,
        fontWeight: 600,
        fontSize: '9px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color,
      }}>
        {children}
      </span>
    </div>
  )
}

function HomePage() {
  return (
    <div style={{ backgroundColor: '#F4F5ED' }}>
      {/* Column labels bar */}
      <div style={{
        borderBottom: '1px solid #D3D5C6',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        height: '36px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 36px 0 40px',
          borderRight: '1px solid #D3D5C6',
        }}>
          <ColLabel>Work</ColLabel>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          borderRight: '1px solid #D3D5C6',
        }}>
          <ColLabel>Leaderboard</ColLabel>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
        }}>
          <ColLabel>Signals</ColLabel>
        </div>
      </div>

      {/* Main editorial grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 88px)',
      }}>

        {/* ── PRIMARY COLUMN: Work ── */}
        <div style={{ padding: '32px 36px 48px 40px' }}>

          {/* Featured project */}
          {featuredProject && (
            <div style={{
              marginBottom: '0',
              paddingBottom: '36px',
              borderBottom: '1px solid #D3D5C6',
            }}>
              <div style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C4992E',
                marginBottom: '14px',
              }}>
                Featured
              </div>

              <a
                href={featuredProject.externalUrl || featuredProject.liveUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="work-link"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <h1
                  className="work-title"
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 700,
                    fontSize: '50px',
                    lineHeight: '1.08',
                    letterSpacing: '-0.025em',
                    color: '#1D1F13',
                    marginBottom: '20px',
                    margin: '0 0 20px 0',
                    padding: 0,
                  }}
                >
                  {featuredProject.title}
                </h1>
              </a>

              {featuredProject.problem && (
                <p style={{
                  fontFamily: FONT_BODY,
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1.58',
                  color: '#4C4F3F',
                  maxWidth: '520px',
                  margin: '0 0 14px 0',
                  padding: 0,
                }}>
                  {featuredProject.problem}
                </p>
              )}

              <div style={{
                fontFamily: FONT_BODY,
                fontSize: '11px',
                color: '#8C8F7E',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                display: 'flex',
                gap: '10px',
              }}>
                <span>{featuredProject.type}</span>
                <span>·</span>
                <span>{featuredProject.year}</span>
                {featuredProject.role && (
                  <>
                    <span>·</span>
                    <span>{featuredProject.role}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Selected Work */}
          <SectionLabel>Selected Work</SectionLabel>

          {selectedWork.map((project) => (
            <div
              key={project.slug}
              style={{
                paddingBottom: '24px',
                paddingTop: '20px',
                borderBottom: '1px solid #D3D5C6',
              }}
            >
              <a
                href={`/work/${project.slug}`}
                className="work-link"
                style={{ textDecoration: 'none', display: 'block', marginBottom: '8px' }}
              >
                <span
                  className="work-title"
                  style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 600,
                    fontSize: '21px',
                    lineHeight: '1.22',
                    letterSpacing: '-0.025em',
                    color: '#1D1F13',
                    display: 'block',
                  }}
                >
                  {project.title}
                </span>
              </a>

              {project.problem && (
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: '14px',
                  lineHeight: '1.58',
                  color: '#676A59',
                  margin: '0 0 10px 0',
                  padding: 0,
                  maxWidth: '500px',
                }}>
                  {project.problem}
                </p>
              )}

              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                fontFamily: FONT_BODY,
                fontSize: '11px',
                color: '#8C8F7E',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                <span>{project.type}</span>
                <span>·</span>
                <span>{project.year}</span>
                {project.role && (
                  <>
                    <span>·</span>
                    <span>{project.role}</span>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Experiments */}
          <SectionLabel>Experiments</SectionLabel>

          {experiments.map((exp, i) => (
            <div
              key={exp.slug}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '14px 0',
                borderBottom: `1px solid ${i === experiments.length - 1 ? '#D3D5C6' : '#E9EAE0'}`,
                gap: '12px',
              }}
            >
              <div style={{ flex: 1 }}>
                <a
                  href={`/work/${exp.slug}`}
                  className="work-link"
                  style={{ textDecoration: 'none' }}
                >
                  <span
                    className="work-title"
                    style={{
                      fontFamily: FONT_HEADING,
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#1D1F13',
                      display: 'block',
                      marginBottom: exp.description ? '4px' : '0',
                    }}
                  >
                    {exp.title}
                  </span>
                </a>
                {exp.description && (
                  <p style={{
                    fontFamily: FONT_BODY,
                    fontSize: '13px',
                    color: '#676A59',
                    lineHeight: '1.58',
                    margin: 0,
                    padding: 0,
                  }}>
                    {exp.description}
                  </p>
                )}
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <span style={{
                  fontFamily: FONT_MONO,
                  fontSize: '12px',
                  color: '#8C8F7E',
                }}>
                  {exp.year}
                </span>
              </div>
            </div>
          ))}

          {/* Quote */}
          <div style={{
            marginTop: '52px',
            paddingLeft: '16px',
            borderLeft: '2px solid #C4992E',
          }}>
            <p style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '21px',
              lineHeight: '1.22',
              color: '#1D1F13',
              margin: 0,
              padding: 0,
            }}>
              Better to live until you die
            </p>
          </div>
        </div>

        {/* ── SECONDARY COLUMN: Leaderboard ── */}
        <div style={{
          padding: '32px 24px 48px 24px',
          borderLeft: '1px solid #D3D5C6',
        }}>
          {/* LEADERBOARD section label — ochre, first in column */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '36px',
          }}>
            <span style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#C4992E',
            }}>
              Leaderboard
            </span>
          </div>

          {/* Tournament sub-header */}
          <div style={{
            fontFamily: FONT_MONO,
            fontSize: '10px',
            color: '#676A59',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            lineHeight: '1.4',
          }}>
            VALERO TEXAS OPEN · FINAL
          </div>

          {/* Player rows */}
          {[
            { name: 'J.J. Spaun', score: '-17', leader: true },
            { name: 'D. McCarthy', score: '-16', close: true },
            { name: 'A. Eckroat', score: '-16', close: true },
            { name: 'S. Lowry', score: '-16', close: true },
          ].map((player) => (
            <div
              key={player.name}
              className="lb-row"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '40px',
                borderBottom: '1px solid #E9EAE0',
                paddingLeft: '2px',
                paddingRight: '2px',
              }}
            >
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: '14px',
                color: '#4C4F3F',
              }}>
                {player.name}
              </span>
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: '14px',
                color: player.leader ? '#4F8646' : '#4C4F3F',
                fontWeight: player.leader ? 500 : 400,
              }}>
                {player.score}
              </span>
            </div>
          ))}

          {/* Masters teaser */}
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #D3D5C6',
          }}>
            <div style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#676A59',
              marginBottom: '10px',
            }}>
              Augusta · Thursday
            </div>
            <p style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontSize: '13px',
              lineHeight: '1.58',
              color: '#676A59',
              margin: 0,
              padding: 0,
            }}>
              The Masters begins Thursday at Augusta National. Spaun carries momentum into the week. One tournament ends; the next one's already in the air.
            </p>
          </div>
        </div>

        {/* ── TERTIARY COLUMN: Results + Reading ── */}
        <div style={{
          padding: '32px 24px 48px 24px',
          borderLeft: '1px solid #D3D5C6',
        }}>
          {/* RESULTS — first in column, no border-top */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '36px',
          }}>
            <span style={{
              fontFamily: FONT_HEADING,
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#676A59',
            }}>
              Results
            </span>
          </div>

          {/* Score rows */}
          <div
            className="results-row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '40px',
              borderBottom: '1px solid #E9EAE0',
            }}
          >
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              color: '#4C4F3F',
              letterSpacing: '0.03em',
            }}>
              DET PISTONS
            </span>
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              color: '#676A59',
            }}>
              107 — 123
            </span>
          </div>

          <div
            className="results-row"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '40px',
              borderBottom: '1px solid #D3D5C6',
            }}
          >
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              color: '#4C4F3F',
              letterSpacing: '0.03em',
            }}>
              DET TIGERS
            </span>
            <span style={{
              fontFamily: FONT_MONO,
              fontSize: '12px',
              color: '#676A59',
            }}>
              3 — 7
            </span>
          </div>

          {/* READING section */}
          <SectionLabel>Reading</SectionLabel>

          {[
            { title: 'Ghost Pepper', pts: '384 pts' },
            { title: 'GPU History', pts: '90 pts' },
            { title: 'Rice Farming', pts: '166 pts' },
          ].map((item, i) => (
            <div
              key={item.title}
              className="hn-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '40px',
                borderBottom: `1px solid ${i === 2 ? '#D3D5C6' : '#E9EAE0'}`,
                cursor: 'default',
              }}
            >
              <span
                className="hn-title"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '12px',
                  color: '#4C4F3F',
                }}
              >
                {item.title}
              </span>
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: '12px',
                color: '#676A59',
              }}>
                {item.pts}
              </span>
            </div>
          ))}

          {/* Ambient note */}
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #D3D5C6',
          }}>
            <p style={{
              fontFamily: FONT_BODY,
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '1.78',
              color: '#8C8F7E',
              margin: 0,
              padding: 0,
            }}>
              12.7 hrs daylight · Last quarter moon · Spring, Midwest
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}