import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      <div className="broadsheet-content">
        {/* COLUMN 1 — Hero Quote + Featured + Selected Work */}
        <div className="col-main">
          <div style={{ paddingTop: '64px' }}>
            {/* Hero Quote */}
            <blockquote
              style={{
                fontFamily: "'Spectral', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 3.6vw, 5.2rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#f2f4f0',
                margin: 0,
                padding: 0,
                maxWidth: '100%',
                textWrap: 'balance' as any,
              }}
            >
              Follow the man who seeks the truth; run from the man who has found it.
            </blockquote>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                margin: '24px 0 16px',
              }}
            />

            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontSize: '0.875rem',
                fontVariantCaps: 'all-small-caps',
                letterSpacing: '0.12em',
                color: '#76e035',
                margin: '0 0 24px',
              }}
            >
              — VÁCLAV HAVEL
            </p>

            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontSize: '0.9rem',
                lineHeight: 1.55,
                color: '#a8b4a2',
                margin: '0 0 48px',
                maxWidth: '60ch',
              }}
            >
              Czech playwright, dissident, and first president of the Czech Republic.
              Havel spent decades resisting totalitarian certainty — systems that
              claimed to have found the truth and punished those who kept seeking it.
            </p>

            {/* Featured Project */}
            {featuredProject && (
              <div style={{ marginBottom: '48px' }}>
                <p
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#a8b4a2',
                    margin: '0 0 16px',
                  }}
                >
                  FEATURED
                </p>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: '#2c362a',
                    marginBottom: '16px',
                  }}
                />
                <a
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  className="project-link"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderLeft: '3px solid transparent',
                    paddingLeft: '12px',
                    marginLeft: '-15px',
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Spectral', serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1.5rem, 2vw, 2.4rem)',
                      lineHeight: 1.15,
                      color: '#f2f4f0',
                      margin: '0 0 8px',
                    }}
                  >
                    {featuredProject.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Albert Sans', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.55,
                      color: '#a8b4a2',
                      margin: 0,
                      maxWidth: '55ch',
                    }}
                  >
                    {featuredProject.problem}
                  </p>
                  <span
                    style={{
                      fontFamily: "'Albert Sans', sans-serif",
                      fontSize: '0.8rem',
                      color: '#76e035',
                      display: 'inline-block',
                      marginTop: '8px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {featuredProject.type} · {featuredProject.year} ↗
                  </span>
                </a>
              </div>
            )}

            {/* Selected Work */}
            <div>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#a8b4a2',
                  margin: '0 0 16px',
                }}
              >
                SELECTED WORK
              </p>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#2c362a',
                  marginBottom: '0',
                }}
              />
              {selectedWork.map((project) => (
                <a
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="project-link"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    textDecoration: 'none',
                    padding: '12px 0 12px 12px',
                    borderBottom: '1px solid #2c362a',
                    borderLeft: '3px solid transparent',
                    marginLeft: '-15px',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Spectral', serif",
                      fontSize: '1.15rem',
                      color: '#f2f4f0',
                    }}
                  >
                    {project.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Albert Sans', sans-serif",
                      fontSize: '0.8rem',
                      color: '#7d8c77',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {project.type} · {project.year}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* VERTICAL RULE 1 */}
        <div className="col-rule" />

        {/* COLUMN 2 — Dispatches */}
        <div className="col-side">
          <div style={{ paddingTop: '40px' }}>
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8b4a2',
                margin: '0 0 12px',
              }}
            >
              DISPATCHES
            </p>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                marginBottom: '16px',
              }}
            />

            {[
              {
                headline: 'GitLost: AI Agent Leaks Private Repos via Prompt Injection',
                score: 342,
                author: 'sec_research',
              },
              {
                headline: 'Tenda Router Firmware Contains Intentional Backdoor',
                score: 287,
                author: 'network_sec',
              },
              {
                headline: 'Building a ZFS NAS from Scratch in 2026',
                score: 198,
                author: 'sysadmin42',
              },
            ].map((story, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: i < 2 ? '1px solid #1c241a' : 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                    color: '#f2f4f0',
                    margin: '0 0 6px',
                  }}
                >
                  {story.headline}
                </p>
                <p
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.8rem',
                    color: '#7d8c77',
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      color: '#76e035',
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 500,
                    }}
                  >
                    {story.score}
                  </span>
                  {' · '}
                  {story.author}
                </p>
              </div>
            ))}

            {/* Experiments */}
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8b4a2',
                margin: '32px 0 12px',
              }}
            >
              EXPERIMENTS
            </p>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                marginBottom: '0',
              }}
            />
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                className="project-link"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  textDecoration: 'none',
                  padding: '10px 0 10px 10px',
                  borderBottom: '1px solid #1c241a',
                  borderLeft: '3px solid transparent',
                  marginLeft: '-13px',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.9rem',
                    color: '#f2f4f0',
                  }}
                >
                  {exp.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.75rem',
                    color: '#7d8c77',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {exp.year}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* VERTICAL RULE 2 */}
        <div className="col-rule" />

        {/* COLUMN 3 — Last Night / Signals */}
        <div className="col-side">
          <div style={{ paddingTop: '40px' }}>
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8b4a2',
                margin: '0 0 12px',
              }}
            >
              LAST NIGHT
            </p>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                marginBottom: '16px',
              }}
            />

            {/* Tigers Score */}
            <div style={{ marginBottom: '24px' }}>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  color: '#f2f4f0',
                  margin: '0 0 4px',
                  letterSpacing: '0.02em',
                }}
              >
                DET{' '}
                <span style={{ color: '#76e035' }}>6</span>
                {' · 2'}
              </p>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.8rem',
                  color: '#7d8c77',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                W · Final
              </p>
            </div>

            {/* Golf */}
            <div style={{ marginBottom: '24px' }}>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: '#f2f4f0',
                  margin: '0 0 4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                GENESIS SCOTTISH OPEN
              </p>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  color: '#7d8c77',
                  margin: 0,
                }}
              >
                Scheduled · No leaders yet
              </p>
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                margin: '24px 0',
              }}
            />

            {/* Identity */}
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a8b4a2',
                margin: '0 0 12px',
              }}
            >
              COLOPHON
            </p>
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontSize: '0.85rem',
                lineHeight: 1.55,
                color: '#a8b4a2',
                margin: '0 0 24px',
                maxWidth: '40ch',
              }}
            >
              Product Designer &amp; Developer. This site rebuilds itself every morning
              from environmental signals — no templates, no fixed state.
            </p>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                margin: '0 0 24px',
              }}
            />

            {/* Music */}
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontSize: '0.8rem',
                color: '#7d8c77',
                margin: '0 0 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 500,
              }}
            >
              LISTENING
            </p>
            <p
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontSize: '0.8rem',
                color: '#a8b4a2',
                margin: 0,
              }}
            >
              Guided by Voices · Wet Leg
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .broadsheet-content {
          display: grid;
          grid-template-columns: 3fr 1px 1fr 1px 1fr;
          padding: 0 5vw;
          column-gap: 0;
          min-height: calc(100vh - 112px);
        }
        .col-main {
          padding-right: 4vw;
        }
        .col-side {
          padding-left: 4vw;
          padding-right: 0;
        }
        .col-rule {
          width: 1px;
          background: #2c362a;
          min-height: 100%;
        }
        .project-link {
          transition: border-color 180ms ease, color 180ms ease;
        }
        .project-link:hover {
          border-left-color: #76e035 !important;
          text-decoration: none !important;
        }
        .project-link:focus-visible {
          outline: 2px solid #76e035;
          outline-offset: 2px;
        }

        @media (max-width: 1024px) {
          .broadsheet-content {
            grid-template-columns: 1fr 1px 1fr;
          }
          .broadsheet-content > .col-side:last-child,
          .broadsheet-content > .col-rule:last-child {
            display: none;
          }
          .col-main {
            padding-right: 3vw;
          }
          .col-side {
            padding-left: 3vw;
          }
        }

        @media (max-width: 768px) {
          .broadsheet-content {
            grid-template-columns: 1fr;
            padding: 0 6vw;
          }
          .col-rule {
            display: none;
          }
          .col-main {
            padding-right: 0;
          }
          .col-side {
            padding-left: 0;
            border-top: 1px solid #2c362a;
          }
          .broadsheet-content > .col-side:last-child {
            display: block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-link {
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}