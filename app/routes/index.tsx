import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

// ─── Reusable CSS classes ────────────────────────────────────────────────────

const sectionLabel = css({
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '13px',
  fontWeight: '500',
  color: '#4A9A6C',
  letterSpacing: '0.04em',
  marginBottom: '32px',
  display: 'block',
})

const workRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
  borderBottom: '1px solid #C8D8DF',
  textDecoration: 'none',
  transition: 'background-color 120ms ease',
  paddingLeft: '0',
  paddingRight: '0',
  _hover: {
    backgroundColor: '#E5EDF1',
  },
})

// ─── Page ────────────────────────────────────────────────────────────────────

function HomePage() {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

      {/* ── Band 1: Hero Identity (dark — seamless with sidebar) ── */}
      <div style={{ background: '#183848', width: '100%' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 48px 88px' }}>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '49px',
              fontWeight: 600,
              color: '#E5EDF1',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Doug March
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '25px',
              fontWeight: 400,
              color: '#9DB6C0',
              lineHeight: 1.2,
              marginBottom: '40px',
            }}
          >
            Product Designer &amp; Developer
          </div>
          <div
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              color: '#6B8E9E',
              letterSpacing: '0.08em',
            }}
          >
            {dateStr}
          </div>
        </div>
      </div>

      {/* ── Band 2: Featured Work (spring-breath light) ── */}
      <div
        style={{
          background: '#EEF4F6',
          width: '100%',
          minHeight: '55vh',
          boxSizing: 'border-box',
          padding: '96px 48px',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <span className={sectionLabel}>featured work</span>

          {featuredProject && (
            <div>
              {/* HN / AI signal — monospace tech whisper */}
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '12px',
                  color: '#6B8E9E',
                  marginBottom: '28px',
                  letterSpacing: '0em',
                }}
              >
                {featuredProject.stack && featuredProject.stack.length > 0
                  ? `→ built with: ${featuredProject.stack.join(' · ')}`
                  : '→ built with: node · llm-orchestration · postgres'}
              </div>

              {/* Project title */}
              <a
                href={
                  featuredProject.liveUrl ||
                  featuredProject.externalUrl ||
                  `/work/${featuredProject.slug}`
                }
                target={
                  featuredProject.liveUrl || featuredProject.externalUrl
                    ? '_blank'
                    : undefined
                }
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '39px',
                    fontWeight: 600,
                    color: '#183848',
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                    marginBottom: '24px',
                    transition: 'color 120ms ease',
                  }}
                >
                  {featuredProject.title}
                </div>
              </a>

              {/* Problem statement */}
              {featuredProject.problem && (
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#446878',
                    lineHeight: 1.55,
                    maxWidth: '640px',
                    marginBottom: '36px',
                  }}
                >
                  {featuredProject.problem}
                </div>
              )}

              {/* Meta row */}
              <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '13px',
                    color: '#6B8E9E',
                    letterSpacing: '0.08em',
                  }}
                >
                  {featuredProject.year}
                </span>
                <span
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '13px',
                    color: '#6B8E9E',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {featuredProject.type}
                </span>
                {(featuredProject.liveUrl || featuredProject.externalUrl) && (
                  <a
                    href={featuredProject.liveUrl || featuredProject.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#4A9A6C',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                    }}
                  >
                    view project →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Band 3: Work Index ── */}
      <div
        style={{
          background: '#F2F7F9',
          width: '100%',
          padding: '80px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

          {/* Selected work */}
          <span className={sectionLabel}>work</span>
          <div style={{ marginBottom: '56px' }}>
            {selectedWork.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={workRow}
              >
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#183848',
                    flex: 1,
                  }}
                >
                  {project.title}
                </span>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#6B8E9E',
                    }}
                  >
                    {project.type}
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '13px',
                      color: '#6B8E9E',
                      minWidth: '40px',
                      textAlign: 'right',
                    }}
                  >
                    {project.year}
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#4A9A6C',
                      minWidth: '16px',
                    }}
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Experiments */}
          <span className={sectionLabel}>experiments</span>
          <div>
            {experiments.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={workRow}
              >
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#2C4F5D',
                    flex: 1,
                  }}
                >
                  {project.title}
                </span>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#6B8E9E',
                      maxWidth: '240px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {project.type}
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '13px',
                      color: '#6B8E9E',
                      minWidth: '40px',
                      textAlign: 'right',
                    }}
                  >
                    {project.year}
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#C8D8DF',
                      minWidth: '16px',
                    }}
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Band 4: Signals ── */}
      <div
        style={{
          background: '#EAF0F3',
          width: '100%',
          padding: '80px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <span className={sectionLabel}>signals</span>

          <div style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>

            {/* Melville epigraph */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr',
                  position: 'relative',
                }}
              >
                {/* Green left rule */}
                <div
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '4px',
                    bottom: '4px',
                    width: '2px',
                    background: '#4A9A6C',
                  }}
                />
                {/* Spacer column */}
                <div />
                {/* Quote content */}
                <div>
                  <div
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '25px',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: '#446878',
                      lineHeight: 1.75,
                      marginBottom: '12px',
                    }}
                  >
                    I'll go to it laughing.
                  </div>
                  <div
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#6B8E9E',
                    }}
                  >
                    — Melville
                  </div>
                </div>
              </div>
            </div>

            {/* Detroit aside — editorial, dismissive */}
            <div style={{ minWidth: '220px', maxWidth: '220px' }}>
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '13px',
                  color: '#C4AD8A',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}
              >
                Monday results
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '11px',
                  color: '#6B8E9E',
                  lineHeight: 1.75,
                }}
              >
                DET vs BOS&nbsp;&nbsp;L&nbsp;&nbsp;4–5<br />
                DET vs MIA&nbsp;&nbsp;L&nbsp;&nbsp;3–5
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Band 5: Footer ── */}
      <div
        style={{
          background: '#0C2230',
          width: '100%',
          minHeight: '200px',
          padding: '48px',
          boxSizing: 'border-box',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '104px',
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#E5EDF1',
                  marginBottom: '16px',
                  letterSpacing: '0.04em',
                }}
              >
                Doug March
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[
                  { href: '/', label: 'work' },
                  { href: '/about', label: 'about' },
                  { href: '/archive', label: 'archive' },
                ].map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      color: '#9DB6C0',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '13px',
                color: '#9DB6C0',
                textAlign: 'right',
              }}
            >
              Product Designer &amp; Developer
            </div>
          </div>

          {/* Bottom row — Masters note + copyright */}
          <div style={{ marginTop: '40px' }}>
            <div
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '11px',
                fontWeight: 300,
                color: '#9DB6C0',
                marginBottom: '4px',
              }}
            >
              Masters · April 10
            </div>
            <div
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '11px',
                color: '#446878',
              }}
            >
              © 2026 Doug March
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}