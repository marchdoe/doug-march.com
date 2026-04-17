import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const sectionMarker = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '9px',
  color: '#78947A',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  marginBottom: '24px',
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div
        style={{
          padding: '80px 56px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '9px',
            color: '#A9BBAA',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 600,
            fontSize: '37px',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            color: '#192B1A',
            marginBottom: '24px',
          }}
        >
          Project not found
        </h1>
        <a
          href="/"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            color: '#519A58',
            letterSpacing: '0.08em',
          }}
        >
          ← Back home
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          position: 'relative',
          padding: '80px 56px 64px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <a
            href="/"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '9px',
              color: '#A9BBAA',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            ← Work
          </a>
        </div>

        <div
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '9px',
            color: '#78947A',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {project.type} &nbsp;·&nbsp; {project.year}
        </div>

        <h1
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 600,
            fontSize: '50px',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            color: '#192B1A',
            marginBottom: '24px',
          }}
        >
          {project.title}
        </h1>

        {project.role && (
          <div
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '12px',
              color: '#78947A',
              letterSpacing: '0.08em',
              marginBottom: '24px',
            }}
          >
            {project.role}
          </div>
        )}

        {/* Live links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                color: '#519A58',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                borderLeft: '3px solid #519A58',
                paddingLeft: '12px',
              }}
            >
              Live site →
            </a>
          )}
          {project.externalUrl && !project.liveUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                color: '#519A58',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                borderLeft: '3px solid #519A58',
                paddingLeft: '12px',
              }}
            >
              Visit →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                color: '#78947A',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>

      {/* Problem / Description */}
      {(project.problem || project.description) && (
        <div
          style={{
            position: 'relative',
            padding: '64px 56px',
            borderBottom: '1px solid #CDD9CE',
            boxSizing: 'border-box',
          }}
        >
          <div style={sectionMarker}>Problem</div>
          <p
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '21px',
              fontWeight: 300,
              color: '#3D5C3F',
              lineHeight: '1.55',
              maxWidth: '520px',
            }}
          >
            {project.problem || project.description}
          </p>
        </div>
      )}

      {/* Approach */}
      {project.approach && (
        <div
          style={{
            padding: '64px 56px',
            borderBottom: '1px solid #CDD9CE',
            boxSizing: 'border-box',
          }}
        >
          <div style={sectionMarker}>Approach</div>
          <p
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '16px',
              color: '#192B1A',
              lineHeight: '1.55',
              maxWidth: '560px',
            }}
          >
            {project.approach}
          </p>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div
          style={{
            padding: '64px 56px',
            borderBottom: '1px solid #CDD9CE',
            boxSizing: 'border-box',
          }}
        >
          <div style={sectionMarker}>Outcome</div>
          <p
            style={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '16px',
              color: '#192B1A',
              lineHeight: '1.55',
              maxWidth: '560px',
            }}
          >
            {project.outcome}
          </p>
        </div>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div
          style={{
            padding: '48px 56px',
            borderBottom: '1px solid #CDD9CE',
            boxSizing: 'border-box',
          }}
        >
          <div style={sectionMarker}>Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map((tech) => (
              <div
                key={tech}
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '12px',
                  color: '#3D5C3F',
                  background: '#EAEEEB',
                  padding: '6px 12px',
                  letterSpacing: '0.05em',
                  border: '1px solid #CDD9CE',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: '28px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            color: '#78947A',
            letterSpacing: '0.08em',
            textDecoration: 'none',
          }}
        >
          ← All Work
        </a>
        <a
          href="/archive"
          style={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: '12px',
            color: '#78947A',
            textDecoration: 'none',
          }}
        >
          archive
        </a>
      </div>
    </div>
  )
}