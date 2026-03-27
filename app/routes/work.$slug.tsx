import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div style={{ backgroundColor: '#EEE8DF', minHeight: '80vh' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '128px 48px',
        }}>
          <div style={{
            fontSize: '9px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#907A5C',
            fontFamily: '"DM Sans", sans-serif',
            marginBottom: '20px',
          }}>
            404
          </div>
          <h1 style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '38px',
            fontWeight: 500,
            color: '#2D241A',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}>
            Project not found
          </h1>
          <a href="/" style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
            color: '#E8950E',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}>
            ← Back to work
          </a>
        </div>
      </div>
    )
  }

  const hasFullDepth = project.depth === 'full'

  return (
    <div>

      {/* ── Band 1: Project Header ── */}
      <div style={{
        backgroundColor: '#19130D',
        padding: '80px 48px 88px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <a href="/" style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: '#6A5840',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '40px',
          }}>
            ← Work
          </a>

          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '11px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#907A5C',
            }}>
              {project.type}
            </span>
            <span style={{ color: '#6A5840', fontSize: '10px' }}>·</span>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '11px',
              color: '#907A5C',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {project.year}
            </span>
          </div>

          <h1 style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: 500,
            color: '#F8F5F0',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '32px',
          }}>
            {project.title}
          </h1>

          {project.role && (
            <div style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '14px',
              color: '#B5A98D',
              letterSpacing: '0.02em',
            }}>
              {project.role}
            </div>
          )}
        </div>
      </div>

      {/* ── Band 2: Problem + Approach ── */}
      {(project.problem || project.approach || project.description) && (
        <div style={{
          backgroundColor: '#EEE8DF',
          padding: '96px 48px',
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: hasFullDepth && project.problem && project.approach ? '1fr 1fr' : '1fr',
            gap: '80px',
            alignItems: 'start',
          }}>
            {(project.problem || project.description) && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '28px',
                }}>
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#907A5C',
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    {project.problem ? 'Problem' : 'About'}
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
                </div>
                <p style={{
                  fontFamily: '"Lora", serif',
                  fontSize: '18px',
                  color: '#48392C',
                  lineHeight: 1.65,
                }}>
                  {project.problem || project.description}
                </p>
              </div>
            )}

            {project.approach && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '28px',
                }}>
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#907A5C',
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    Approach
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
                </div>
                <p style={{
                  fontFamily: '"Lora", serif',
                  fontSize: '16px',
                  color: '#6A5840',
                  lineHeight: 1.65,
                }}>
                  {project.approach}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Band 3: Outcome + Stack ── */}
      {(project.outcome || (project.stack && project.stack.length > 0)) && (
        <div style={{
          backgroundColor: '#F8F5F0',
          padding: '96px 48px',
          borderTop: '1px solid #D8CEBD',
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: project.outcome && project.stack ? '1fr 1fr' : '1fr',
            gap: '80px',
            alignItems: 'start',
          }}>
            {project.outcome && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '28px',
                }}>
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#907A5C',
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    Outcome
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
                </div>
                <p style={{
                  fontFamily: '"Lora", serif',
                  fontSize: '16px',
                  color: '#6A5840',
                  lineHeight: 1.65,
                }}>
                  {project.outcome}
                </p>
              </div>
            )}

            {project.stack && project.stack.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '28px',
                }}>
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#907A5C',
                    fontFamily: '"DM Sans", sans-serif',
                  }}>
                    Stack
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D8CEBD' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '12px',
                        color: '#6A5840',
                        backgroundColor: '#EEE8DF',
                        border: '1px solid #D8CEBD',
                        padding: '6px 12px',
                        letterSpacing: '0.03em',
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
      )}

      {/* ── Links Band (if external/live/github) ── */}
      {(project.liveUrl || project.githubUrl || project.externalUrl) && (
        <div style={{
          backgroundColor: '#D8CEBD',
          padding: '64px 48px',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center',
            }}>
              {(project.liveUrl || project.externalUrl) && (
                <a
                  href={project.liveUrl || project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2D241A',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #907A5C',
                    paddingBottom: '2px',
                  }}
                >
                  View Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '14px',
                    color: '#6A5840',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #B5A98D',
                    paddingBottom: '2px',
                  }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

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
            <a href="/" className="footer-link">All Work</a>
            <a href="/about" className="footer-link">About</a>
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