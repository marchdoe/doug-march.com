import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div style={{ padding: '64px 5vw', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Spectral', serif",
            fontSize: '2rem',
            color: '#f2f4f0',
          }}
        >
          Project not found
        </h1>
        <a
          href="/"
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            color: '#76e035',
            fontSize: '0.9rem',
            marginTop: '16px',
            display: 'inline-block',
          }}
        >
          ← Back to home
        </a>
      </div>
    )
  }

  return (
    <div style={{ padding: '0 5vw' }}>
      {/* Project Header */}
      <div
        style={{
          paddingTop: '48px',
          paddingBottom: '32px',
          borderBottom: '1px solid #2c362a',
        }}
      >
        <p
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontSize: '0.8rem',
            color: '#7d8c77',
            margin: '0 0 12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {project.type} · {project.year}
        </p>
        <h1
          style={{
            fontFamily: "'Spectral', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4vw, 4.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: '#f2f4f0',
            margin: '0 0 16px',
          }}
        >
          {project.title}
        </h1>
        {project.role && (
          <p
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: '0.875rem',
              fontVariantCaps: 'all-small-caps',
              letterSpacing: '0.12em',
              color: '#76e035',
              margin: 0,
            }}
          >
            {project.role}
          </p>
        )}
      </div>

      {/* Project Body */}
      <div className="project-body">
        <div className="project-main" style={{ paddingTop: '32px' }}>
          {project.problem && (
            <div style={{ marginBottom: '32px' }}>
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
                PROBLEM
              </p>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.55,
                  color: '#f2f4f0',
                  margin: 0,
                  maxWidth: '65ch',
                }}
              >
                {project.problem}
              </p>
            </div>
          )}

          {project.approach && (
            <div style={{ marginBottom: '32px' }}>
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
                APPROACH
              </p>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.55,
                  color: '#f2f4f0',
                  margin: 0,
                  maxWidth: '65ch',
                }}
              >
                {project.approach}
              </p>
            </div>
          )}

          {project.outcome && (
            <div style={{ marginBottom: '32px' }}>
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
                OUTCOME
              </p>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.55,
                  color: '#f2f4f0',
                  margin: 0,
                  maxWidth: '65ch',
                }}
              >
                {project.outcome}
              </p>
            </div>
          )}

          {project.description && !project.problem && (
            <div style={{ marginBottom: '32px' }}>
              <p
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.55,
                  color: '#f2f4f0',
                  margin: 0,
                  maxWidth: '65ch',
                }}
              >
                {project.description}
              </p>
            </div>
          )}
        </div>

        {/* Side meta */}
        <div className="project-side" style={{ paddingTop: '32px' }}>
          {project.stack && project.stack.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
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
                STACK
              </p>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#2c362a',
                  marginBottom: '12px',
                }}
              />
              {project.stack.map((tech, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: '#f2f4f0',
                    margin: '0 0 6px',
                  }}
                >
                  {tech}
                </p>
              ))}
            </div>
          )}

          {/* Links */}
          <div>
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
              LINKS
            </p>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: '#2c362a',
                marginBottom: '12px',
              }}
            />
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: '#76e035',
                  display: 'block',
                  padding: '6px 0',
                  textDecoration: 'none',
                }}
              >
                Visit site ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: '#76e035',
                  display: 'block',
                  padding: '6px 0',
                  textDecoration: 'none',
                }}
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                style={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: '#76e035',
                  display: 'block',
                  padding: '6px 0',
                  textDecoration: 'none',
                }}
              >
                GitHub ↗
              </a>
            )}
            <a
              href="/"
              style={{
                fontFamily: "'Albert Sans', sans-serif",
                fontSize: '0.85rem',
                color: '#a8b4a2',
                display: 'block',
                padding: '6px 0',
                marginTop: '12px',
                textDecoration: 'none',
              }}
            >
              ← All work
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .project-body {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 0;
        }
        .project-main {
          padding-right: 4vw;
          border-right: 1px solid #2c362a;
        }
        .project-side {
          padding-left: 4vw;
        }
        .project-side a:hover {
          text-decoration: underline !important;
        }
        .project-side a:focus-visible {
          outline: 2px solid #76e035;
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .project-body {
            grid-template-columns: 1fr;
          }
          .project-main {
            padding-right: 0;
            border-right: none;
            border-bottom: 1px solid #2c362a;
            padding-bottom: 32px;
          }
          .project-side {
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  )
}