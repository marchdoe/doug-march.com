import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

const label = css({
  fontFamily: 'heading',
  fontSize: 'xs',
  color: 'textMuted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  fontWeight: '600',
  display: 'block',
  marginBottom: '3',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: 'base',
  fontWeight: '300',
  color: 'textSecondary',
  lineHeight: 'normal',
  maxWidth: '600px',
})

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '64px 24px',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px',
              color: '#4B6478',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '24px',
            }}
          >
            <a href="/" className="nav-link">← Work</a>
          </span>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '37px',
              fontWeight: 700,
              color: '#4B6478',
            }}
          >
            Project not found
          </h1>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        }}
      >

        {/* Back nav */}
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px',
              color: '#4B6478',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              transition: 'color 150ms ease',
            }}
            className="nav-link"
          >
            ← All Work
          </a>
        </div>

        {/* Hero zone */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              background: '#192535',
              padding: '48px 56px',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '9px',
                color: project.featured ? '#A8C040' : '#4B6478',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              {project.featured ? 'Featured · ' : ''}{project.type}
            </span>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#EEF2F8',
                marginBottom: '32px',
              }}
            >
              {project.title}
            </h1>
            {project.problem && (
              <p className={bodyText} style={{ fontSize: '18px', lineHeight: 1.75 }}>
                {project.problem}
              </p>
            )}
          </div>

          {/* Meta sidebar */}
          <div
            style={{
              background: '#192535',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
            }}
          >
            <div>
              <span className={label}>Year</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '21px',
                  fontWeight: 600,
                  color: '#EEF2F8',
                  letterSpacing: '-0.01em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {project.year}
              </span>
            </div>

            {project.role && (
              <div>
                <span className={label}>Role</span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#93A8BC',
                    lineHeight: 1.55,
                    display: 'block',
                  }}
                >
                  {project.role}
                </span>
              </div>
            )}

            {project.stack && project.stack.length > 0 && (
              <div>
                <span className={label}>Stack</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '10px',
                        color: '#4B6478',
                        padding: '3px 8px',
                        border: '1px solid #1F3346',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '9px',
                    color: '#A8C040',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '10px 16px',
                    border: '1px solid #7A9022',
                    textAlign: 'center',
                    transition: 'all 150ms ease',
                    display: 'block',
                  }}
                >
                  View Live →
                </a>
              )}
              {project.externalUrl && !project.liveUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '9px',
                    color: '#A8C040',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '10px 16px',
                    border: '1px solid #7A9022',
                    textAlign: 'center',
                    transition: 'all 150ms ease',
                    display: 'block',
                  }}
                >
                  View Project →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '9px',
                    color: '#4B6478',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '10px 16px',
                    border: '1px solid #1F3346',
                    textAlign: 'center',
                    transition: 'all 150ms ease',
                    display: 'block',
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content bands */}
        {(project.approach || project.outcome) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: project.approach && project.outcome ? '1fr 1fr' : '1fr',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            {project.approach && (
              <div
                style={{
                  background: '#192535',
                  padding: '36px 40px',
                  boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
                }}
              >
                <span className={label}>Approach</span>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#93A8BC',
                    lineHeight: 1.55,
                  }}
                >
                  {project.approach}
                </p>
              </div>
            )}
            {project.outcome && (
              <div
                style={{
                  background: '#192535',
                  padding: '36px 40px',
                  borderLeft: '2px solid #4AA494',
                  boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
                }}
              >
                <span className={label}>Outcome</span>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#93A8BC',
                    lineHeight: 1.55,
                  }}
                >
                  {project.outcome}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description fallback */}
        {project.description && !project.approach && (
          <div
            style={{
              background: '#192535',
              padding: '36px 40px',
              marginBottom: '16px',
              boxShadow: '0 2px 4px rgba(8,18,26,0.7), 0 6px 16px rgba(8,18,26,0.45)',
            }}
          >
            <span className={label}>About</span>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#93A8BC',
                lineHeight: 1.55,
                maxWidth: '680px',
              }}
            >
              {project.description}
            </p>
          </div>
        )}

        {/* Footer nav */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid #1F3346',
            marginTop: '16px',
          }}
        >
          <a href="/" className="nav-link">← Back to Work</a>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '9px',
              color: '#1F3346',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Doug March
          </span>
        </div>

      </div>
    </main>
  )
}