import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

// ─── Project Background Gradients ─────────────────────────────────────────────

const PROJECT_BG: Record<string, string> = {
  spaceman:      'linear-gradient(160deg, #0D110A 0%, #181D11 45%, #2D3224 100%)',
  fishsticks:    'linear-gradient(160deg, #181D11 0%, #2D3224 100%)',
  '15th-club':   'linear-gradient(160deg, #2D3224 0%, #484F3C 100%)',
  'doug-march':  'linear-gradient(145deg, #484F3C 0%, #636B56 55%, #8A9280 100%)',
  teeturn:       'linear-gradient(160deg, #9A4A1C 0%, #C26535 100%)',
  politweets:    'linear-gradient(160deg, #8A9280 0%, #AFB6A3 100%)',
  twittertale:   'linear-gradient(160deg, #636B56 0%, #8A9280 100%)',
}

function bgForSlug(slug: string): string {
  return PROJECT_BG[slug] ?? 'linear-gradient(160deg, #181D11, #2D3224)'
}

// ─── Work Page ────────────────────────────────────────────────────────────────

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        style={{
          maxWidth: '1296px',
          margin: '0 auto',
          padding: '40px 48px 80px',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '12px',
            color: '#636B56',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            display: 'inline-block',
            marginBottom: '48px',
            transition: 'color 300ms ease',
          }}
        >
          ← Work
        </a>
        <div
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: '37px',
            fontWeight: 400,
            color: '#8A9280',
            letterSpacing: '-0.025em',
          }}
        >
          Project not found.
        </div>
      </div>
    )
  }

  const liveHref = project.liveUrl || project.externalUrl

  return (
    <div
      style={{
        maxWidth: '1296px',
        margin: '0 auto',
        padding: '40px 48px 80px',
      }}
    >
      {/* ── Back link ── */}
      <a
        href="/"
        style={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '12px',
          color: '#636B56',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          display: 'inline-block',
          marginBottom: '48px',
          transition: 'color 300ms ease',
        }}
      >
        ← Work
      </a>

      {/* ── Project Header ── */}
      <div style={{ marginBottom: '40px' }}>
        {/* Type label */}
        <div
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '9px',
            color: '#8A9280',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            marginBottom: '12px',
          }}
        >
          {project.type}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'Switzer, sans-serif',
            fontSize: '50px',
            fontWeight: 400,
            color: '#1D2219',
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            marginBottom: '20px',
          }}
        >
          {project.title}
        </h1>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '8px 20px',
            alignItems: 'baseline',
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '12px',
            color: '#8A9280',
            letterSpacing: '-0.01em',
          }}
        >
          <span>{project.year}</span>
          {project.role && (
            <>
              <span style={{ color: '#D2D6C8' }}>·</span>
              <span>{project.role}</span>
            </>
          )}
          {liveHref && (
            <>
              <span style={{ color: '#D2D6C8' }}>·</span>
              <a
                href={liveHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#C26535',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                Live site →
              </a>
            </>
          )}
          {project.githubUrl && (
            <>
              <span style={{ color: '#D2D6C8' }}>·</span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#636B56',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
              >
                GitHub →
              </a>
            </>
          )}
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{ height: '1px', background: '#D2D6C8', marginBottom: '48px' }}
      />

      {/* ── Visual Surface ── */}
      <div
        style={{
          height: '400px',
          background: bgForSlug(slug),
          filter: 'contrast(1.08) saturate(0.90)',
          marginBottom: '48px',
        }}
      />

      {/* ── Content Grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '7fr 5fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* Main narrative */}
        <div>
          {project.problem && (
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '9px',
                    color: '#8A9280',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    fontWeight: 500,
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  Problem
                </span>
                <div style={{ flex: 1, height: '1px', background: '#D2D6C8' }} />
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '16px',
                  color: '#2D3224',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                }}
              >
                {project.problem}
              </div>
            </div>
          )}

          {project.approach && (
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '9px',
                    color: '#8A9280',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    fontWeight: 500,
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  Approach
                </span>
                <div style={{ flex: 1, height: '1px', background: '#D2D6C8' }} />
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '16px',
                  color: '#484F3C',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                }}
              >
                {project.approach}
              </div>
            </div>
          )}

          {project.outcome && (
            <div style={{ marginBottom: '36px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '9px',
                    color: '#8A9280',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    fontWeight: 500,
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  Outcome
                </span>
                <div style={{ flex: 1, height: '1px', background: '#D2D6C8' }} />
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '16px',
                  color: '#484F3C',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                }}
              >
                {project.outcome}
              </div>
            </div>
          )}

          {/* Fallback: description for lightweight projects */}
          {project.description && !project.problem && !project.approach && !project.outcome && (
            <div
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '16px',
                color: '#484F3C',
                lineHeight: 1.6,
                maxWidth: '560px',
              }}
            >
              {project.description}
            </div>
          )}
        </div>

        {/* Aside: stack */}
        <div>
          {project.stack && project.stack.length > 0 && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '9px',
                    color: '#8A9280',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    fontWeight: 500,
                  }}
                >
                  Stack
                </span>
                <div style={{ flex: 1, height: '1px', background: '#D2D6C8' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '12px',
                      color: '#484F3C',
                      background: '#E8EBE1',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}