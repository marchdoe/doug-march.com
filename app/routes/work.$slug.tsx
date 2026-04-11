import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const label: React.CSSProperties = {
  fontSize: '9px',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: '400',
  color: '#6B8599',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}
const divider: React.CSSProperties = { borderTop: '1px solid rgba(150, 170, 187, 0.08)' }
const sectionWrap: React.CSSProperties = {
  width: '100%',
  maxWidth: '720px',
  padding: '64px 48px',
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0D1822',
        gap: '16px',
      }}>
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '50px',
          fontWeight: '700',
          letterSpacing: '-0.03em',
          color: '#2E3E4D',
          lineHeight: 1.05,
        }}>
          404
        </div>
        <div style={{
          fontFamily: '"Work Sans", sans-serif',
          fontSize: '16px',
          fontWeight: '300',
          color: '#6B8599',
        }}>
          Project not found.
        </div>
        <a href="/" className="u-line" style={{
          marginTop: '16px',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '12px',
          color: '#6B8599',
          letterSpacing: '0.08em',
          textDecoration: 'none',
        }}>
          ← back to work
        </a>
      </div>
    )
  }

  const sections = [
    { key: 'problem', heading: 'Problem', content: project.problem },
    { key: 'approach', heading: 'Approach', content: project.approach },
    { key: 'outcome', heading: 'Outcome', content: project.outcome },
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      background: '#0D1822',
      minHeight: '100vh',
      paddingTop: '96px',
    }}>

      {/* Back */}
      <div style={{ width: '100%', maxWidth: '720px', padding: '0 48px 24px' }}>
        <a href="/" className="u-line" style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '12px',
          color: '#6B8599',
          letterSpacing: '0.08em',
          textDecoration: 'none',
        }}>
          ← work
        </a>
      </div>

      {/* Project Header */}
      <div style={{ ...sectionWrap, ...divider }}>
        <div style={{ ...label, color: '#C34B22', marginBottom: '24px' }}>
          {project.type}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}
        </div>

        <h1 style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '50px',
          fontWeight: '700',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#DFE7F1',
          margin: '0 0 16px 0',
        }}>
          {project.title}
        </h1>

        {project.role && (
          <div style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '16px',
            fontWeight: '400',
            color: '#96AABB',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}>
            {project.role}
          </div>
        )}

        {(project.liveUrl || project.externalUrl) && (
          <a
            href={project.liveUrl || project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="u-line"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '12px',
              color: '#C34B22',
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}
          >
            Visit project →
          </a>
        )}

        {project.description && !project.problem && (
          <p style={{
            fontFamily: '"Work Sans", sans-serif',
            fontSize: '16px',
            fontWeight: '300',
            color: '#96AABB',
            lineHeight: 1.75,
            maxWidth: '540px',
            margin: '24px 0 0 0',
          }}>
            {project.description}
          </p>
        )}
      </div>

      {/* Content Sections */}
      {sections.map(({ key, heading, content }) =>
        content ? (
          <div key={key} style={{ ...sectionWrap, ...divider }}>
            <div style={{ ...label, marginBottom: '24px' }}>{heading}</div>
            <p style={{
              fontFamily: '"Work Sans", sans-serif',
              fontSize: '16px',
              fontWeight: '300',
              color: '#96AABB',
              lineHeight: 1.75,
              maxWidth: '540px',
              margin: 0,
            }}>
              {content}
            </p>
          </div>
        ) : null
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div style={{ ...sectionWrap, ...divider }}>
          <div style={{ ...label, marginBottom: '24px' }}>Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map((tech) => (
              <div key={tech} style={{
                padding: '6px 12px',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '12px',
                color: '#96AABB',
                letterSpacing: '0.04em',
                background: 'rgba(27, 42, 55, 0.9)',
                border: '1px solid rgba(150, 170, 187, 0.10)',
                borderRadius: '0',
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GitHub link if present */}
      {project.githubUrl && (
        <div style={{ ...sectionWrap, ...divider }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="u-line"
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '12px',
              color: '#6B8599',
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}
          >
            View on GitHub →
          </a>
        </div>
      )}

      {/* Footer */}
      <div style={{ ...sectionWrap, ...divider, marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '12px',
            color: '#485F70',
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}>
            ← All work
          </a>
          <a href="/archive" style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '12px',
            color: '#485F70',
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}>
            Archive
          </a>
        </div>
      </div>

    </div>
  )
}