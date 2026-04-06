import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        style={{
          background: '#F2F7F9',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '39px',
            fontWeight: 600,
            color: '#183848',
            letterSpacing: '-0.025em',
            marginBottom: '16px',
          }}
        >
          Not found.
        </div>
        <a
          href="/"
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '13px',
            color: '#4A9A6C',
            textDecoration: 'none',
            letterSpacing: '0.04em',
          }}
        >
          ← back to work
        </a>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

      {/* ── Project header (dark band) ── */}
      <div style={{ background: '#183848', width: '100%' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '48px 48px 72px' }}>

          {/* Back link */}
          <a
            href="/"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '13px',
              color: '#9DB6C0',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              display: 'block',
              marginBottom: '40px',
            }}
          >
            ← work
          </a>

          {/* Type label */}
          <div
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '13px',
              color: '#6B8E9E',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {project.type}
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '49px',
              fontWeight: 600,
              color: '#E5EDF1',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '24px',
            }}
          >
            {project.title}
          </div>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '13px',
                color: '#9DB6C0',
                letterSpacing: '0.08em',
              }}
            >
              {project.year}
            </span>
            {project.role && (
              <span
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: '13px',
                  color: '#9DB6C0',
                  letterSpacing: '0.04em',
                }}
              >
                {project.role}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Project content ── */}
      <div
        style={{
          background: '#F2F7F9',
          width: '100%',
          flex: 1,
          padding: '80px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ maxWidth: '720px' }}>

            {/* Problem */}
            {project.problem && (
              <div style={{ marginBottom: '56px' }}>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4A9A6C',
                    letterSpacing: '0.04em',
                    marginBottom: '16px',
                  }}
                >
                  problem
                </div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#2C4F5D',
                    lineHeight: 1.55,
                  }}
                >
                  {project.problem}
                </div>
              </div>
            )}

            {/* Description (for lightweight entries without problem field) */}
            {!project.problem && project.description && (
              <div style={{ marginBottom: '56px' }}>
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#2C4F5D',
                    lineHeight: 1.55,
                  }}
                >
                  {project.description}
                </div>
              </div>
            )}

            {/* Approach */}
            {project.approach && (
              <div style={{ marginBottom: '56px' }}>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4A9A6C',
                    letterSpacing: '0.04em',
                    marginBottom: '16px',
                  }}
                >
                  approach
                </div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#2C4F5D',
                    lineHeight: 1.55,
                  }}
                >
                  {project.approach}
                </div>
              </div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <div style={{ marginBottom: '56px' }}>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4A9A6C',
                    letterSpacing: '0.04em',
                    marginBottom: '16px',
                  }}
                >
                  outcome
                </div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#2C4F5D',
                    lineHeight: 1.55,
                  }}
                >
                  {project.outcome}
                </div>
              </div>
            )}

            {/* Stack */}
            {project.stack && project.stack.length > 0 && (
              <div style={{ marginBottom: '56px' }}>
                <div
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4A9A6C',
                    letterSpacing: '0.04em',
                    marginBottom: '16px',
                  }}
                >
                  stack
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '13px',
                        color: '#446878',
                        background: '#EAF0F3',
                        border: '1px solid #C8D8DF',
                        borderRadius: '2px',
                        padding: '4px 12px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* External links */}
            {(project.liveUrl || project.externalUrl || project.githubUrl) && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                {(project.liveUrl || project.externalUrl) && (
                  <a
                    href={project.liveUrl || project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#4A9A6C',
                      textDecoration: 'none',
                      border: '1px solid #4A9A6C',
                      borderRadius: '4px',
                      padding: '8px 18px',
                      letterSpacing: '0.04em',
                      transition: 'background-color 120ms ease, color 120ms ease',
                      display: 'inline-block',
                    }}
                  >
                    view project →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#446878',
                      textDecoration: 'none',
                      border: '1px solid #C8D8DF',
                      borderRadius: '4px',
                      padding: '8px 18px',
                      letterSpacing: '0.04em',
                      display: 'inline-block',
                    }}
                  >
                    github →
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          background: '#0C2230',
          width: '100%',
          padding: '48px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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
            <div
              style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '11px',
                fontWeight: 300,
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