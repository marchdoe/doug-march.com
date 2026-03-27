import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div>

      {/* ── Band 1: Opening Day Declaration ── */}
      <div className="band-pad" style={{
        backgroundColor: '#19130D',
        padding: '72px 48px 80px',
        minHeight: '38vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6A5840',
            fontFamily: '"DM Sans", sans-serif',
            marginBottom: '20px',
          }}>
            March 26, 2026
          </div>
          <h1
            className="opening-day-hed"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 'clamp(52px, 9vw, 100px)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#E8950E',
              lineHeight: 0.95,
              marginBottom: '28px',
            }}
          >
            Opening Day
          </h1>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '12px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: '#B5A98D',
          }}>
            First Pitch · The Ritual Returns
          </p>
        </div>
      </div>

      {/* ── Band 2: Identity + Work ── */}
      <div className="band-pad" style={{
        backgroundColor: '#EEE8DF',
        padding: '96px 48px',
      }}>
        <div
          className="band-inner-grid"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '72px',
            alignItems: 'start',
          }}
        >
          {/* Left: Identity + Featured Project */}
          <div>
            {/* Identity */}
            <div style={{ marginBottom: '72px' }}>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#907A5C',
                fontFamily: '"DM Sans", sans-serif',
                marginBottom: '20px',
              }}>
                Product Designer &amp; Developer
              </div>
              <p style={{
                fontFamily: '"Lora", serif',
                fontSize: '21px',
                lineHeight: 1.55,
                color: '#48392C',
                maxWidth: '560px',
              }}>
                {identity.statement}
              </p>
            </div>

            {/* Featured Project */}
            {featuredProject && (
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
                    Featured
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
                </div>

                <a
                  className="project-link"
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  target={featuredProject.externalUrl ? '_blank' : undefined}
                  rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                >
                  <h2 style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 'clamp(38px, 5vw, 60px)',
                    fontWeight: 600,
                    color: '#2D241A',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    marginBottom: '28px',
                    transition: 'color 0.2s',
                  }}>
                    {featuredProject.title}
                  </h2>
                </a>

                {featuredProject.problem && (
                  <p style={{
                    fontFamily: '"Lora", serif',
                    fontSize: '16px',
                    color: '#6A5840',
                    lineHeight: 1.55,
                    maxWidth: '520px',
                    marginBottom: '24px',
                  }}>
                    {featuredProject.problem}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#907A5C',
                  }}>
                    {featuredProject.type}
                  </span>
                  <span style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    backgroundColor: '#B5A98D',
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: '#907A5C',
                  }}>
                    {featuredProject.year}
                  </span>
                  {featuredProject.externalUrl && (
                    <>
                      <span style={{
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        backgroundColor: '#B5A98D',
                        display: 'inline-block',
                      }} />
                      <a
                        href={featuredProject.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: '11px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#E8950E',
                          textDecoration: 'none',
                        }}
                      >
                        View Project ↗
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Work List */}
          <div>
            {/* Selected Work */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#907A5C',
                fontFamily: '"DM Sans", sans-serif',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid #D8CEBD',
              }}>
                Selected Work
              </div>
              {selectedWork.map((project) => (
                <a
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="work-row"
                >
                  <span
                    className="work-row-title"
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#2D241A',
                      transition: 'color 0.2s',
                    }}
                  >
                    {project.title}
                  </span>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    color: '#907A5C',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {project.year}
                  </span>
                </a>
              ))}
            </div>

            {/* Experiments */}
            <div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#907A5C',
                fontFamily: '"DM Sans", sans-serif',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid #D8CEBD',
              }}>
                Experiments
              </div>
              {experiments.map((exp) => (
                <a
                  key={exp.slug}
                  href={exp.externalUrl || exp.liveUrl || `/work/${exp.slug}`}
                  target={exp.externalUrl || exp.liveUrl ? '_blank' : undefined}
                  rel={exp.externalUrl || exp.liveUrl ? 'noopener noreferrer' : undefined}
                  className="exp-row"
                >
                  <span
                    className="exp-row-title"
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '14px',
                      color: '#48392C',
                      transition: 'color 0.2s',
                    }}
                  >
                    {exp.title}
                  </span>
                  <span style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '11px',
                    color: '#907A5C',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {exp.year}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Band 3: Signals Triptych ── */}
      <div className="band-pad" style={{
        backgroundColor: '#F8F5F0',
        padding: '72px 48px',
        borderTop: '1px solid #D8CEBD',
        borderBottom: '1px solid #D8CEBD',
      }}>
        <div
          className="signals-grid"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0',
          }}
        >
          {/* Golf */}
          <div style={{ paddingRight: '48px', borderRight: '1px solid #D8CEBD' }}>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#907A5C',
              fontFamily: '"DM Sans", sans-serif',
              marginBottom: '24px',
            }}>
              Houston Open
            </div>
            <div className="leaderboard-row">
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#2D241A' }}>
                Burns
              </span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: 600, color: '#2D241A' }}>
                  −5
                </span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '11px', color: '#907A5C', letterSpacing: '0.05em' }}>
                  R3
                </span>
              </div>
            </div>
            <div style={{ height: '1px', backgroundColor: '#D8CEBD', margin: '0' }} />
            <div className="leaderboard-row">
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#2D241A' }}>
                Waring
              </span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: 600, color: '#2D241A' }}>
                  −5
                </span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '11px', color: '#907A5C', letterSpacing: '0.05em' }}>
                  R3
                </span>
              </div>
            </div>
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '9px',
              color: '#907A5C',
              letterSpacing: '0.10em',
              marginTop: '16px',
            }}>
              Tied for the lead
            </p>
          </div>

          {/* Weather */}
          <div style={{ paddingLeft: '48px', paddingRight: '48px', borderRight: '1px solid #D8CEBD' }}>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#907A5C',
              fontFamily: '"DM Sans", sans-serif',
              marginBottom: '24px',
            }}>
              Weather
            </div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '38px',
              fontWeight: 600,
              color: '#2D241A',
              lineHeight: 1,
              marginBottom: '16px',
            }}>
              73°
            </div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '12px',
              color: '#6A5840',
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}>
              Sunny · SW Wind · 38% hum
            </div>
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '9px',
              color: '#907A5C',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '20px',
            }}>
              Late March, no clouds — the palette on the page
            </div>
          </div>

          {/* Editorial Aside */}
          <div style={{ paddingLeft: '48px' }}>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#907A5C',
              fontFamily: '"DM Sans", sans-serif',
              marginBottom: '24px',
            }}>
              Noted
            </div>
            <p style={{
              fontFamily: '"Lora", serif',
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#6A5840',
              lineHeight: 1.55,
            }}>
              Disney's Sora contract — a billion dollars, cancelled on Opening Day. Some closures have a certain timing.
            </p>
          </div>
        </div>
      </div>

      {/* ── Band 4: Pull Quote ── */}
      <div className="band-pad" style={{
        backgroundColor: '#D8CEBD',
        padding: '128px 48px',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <blockquote style={{
            fontFamily: '"Lora", serif',
            fontSize: 'clamp(28px, 4vw, 50px)',
            fontStyle: 'italic',
            color: '#2D241A',
            lineHeight: 1.85,
            margin: 0,
          }}>
            Closing your eyes and listening to silence is self-care.
          </blockquote>
          <div style={{
            marginTop: '48px',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '12px',
            color: '#907A5C',
            letterSpacing: '0.10em',
          }}>
            — March 26, 2026
          </div>
        </div>
      </div>

      {/* ── Band 5: Footer ── */}
      <div className="band-pad" style={{
        backgroundColor: '#2D241A',
        padding: '64px 48px',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '32px',
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
            <a href="/about" className="footer-link">About</a>
          </div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: '#B5A98D',
          }}>
            S&amp;P +0.56%
          </div>
        </div>
      </div>

    </div>
  )
}