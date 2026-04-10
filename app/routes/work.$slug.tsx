import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div>
        <div style={{ marginBottom: '40px' }}>
          <a href="/" className="back-link">← Work</a>
        </div>
        <p style={{
          fontFamily: '"Fraunces", serif',
          fontSize: '28px',
          fontWeight: 300,
          color: '#2D3E39',
          lineHeight: 1.2,
          marginBottom: '16px',
        }}>
          Project not found.
        </p>
        <a href="/" className="dim-link">Return to index</a>
      </div>
    )
  }

  return (
    <>
      {/* Back */}
      <div style={{ marginBottom: '48px' }}>
        <a href="/" className="back-link">← Work</a>
      </div>

      {/* Header */}
      <header style={{
        paddingBottom: '40px',
        borderBottom: '1px solid #CDD9D5',
        marginBottom: '48px',
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'baseline',
          marginBottom: '16px',
        }}>
          <span style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '9px',
            fontWeight: 300,
            color: '#849690',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            {project.type}
          </span>
          <span style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '9px',
            fontWeight: 300,
            color: '#AAB9B4',
            letterSpacing: '0.08em',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {project.year}
          </span>
        </div>

        <h1 style={{
          fontFamily: '"Fraunces", serif',
          fontSize: '37px',
          fontWeight: 300,
          color: '#2D3E39',
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          marginBottom: '16px',
        }}>
          {project.title}
        </h1>

        {project.role && (
          <div style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '14px',
            fontWeight: 300,
            color: '#5E726C',
            letterSpacing: '0.02em',
          }}>
            {project.role}
          </div>
        )}
      </header>

      {/* Body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

        {project.problem && (
          <section>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '9px',
              fontWeight: 300,
              color: '#849690',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Problem
            </div>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#435651',
              lineHeight: 1.55,
              maxWidth: '560px',
            }}>
              {project.problem}
            </p>
          </section>
        )}

        {project.approach && (
          <section>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '9px',
              fontWeight: 300,
              color: '#849690',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Approach
            </div>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#435651',
              lineHeight: 1.55,
              maxWidth: '560px',
            }}>
              {project.approach}
            </p>
          </section>
        )}

        {project.outcome && (
          <section>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '9px',
              fontWeight: 300,
              color: '#849690',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Outcome
            </div>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#435651',
              lineHeight: 1.55,
              maxWidth: '560px',
            }}>
              {project.outcome}
            </p>
          </section>
        )}

        {project.description && !project.problem && (
          <section>
            <p style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#435651',
              lineHeight: 1.55,
              maxWidth: '560px',
            }}>
              {project.description}
            </p>
          </section>
        )}

        {project.stack && project.stack.length > 0 && (
          <section>
            <div style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: '9px',
              fontWeight: 300,
              color: '#849690',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: '12px',
                    fontWeight: 300,
                    color: '#5E726C',
                    background: '#EEF5F1',
                    padding: '5px 12px',
                    borderRadius: '2px',
                    border: '1px solid #CDD9D5',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        {(project.liveUrl || project.externalUrl || project.githubUrl) && (
          <section style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            paddingTop: '8px',
            borderTop: '1px solid #CDD9D5',
          }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-cta-link"
              >
                View live →
              </a>
            )}
            {project.externalUrl && !project.liveUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-cta-link"
              >
                View project →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                GitHub →
              </a>
            )}
          </section>
        )}

      </div>
    </>
  )
}