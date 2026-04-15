import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div>
        <div style={{ background: '#1A1610' }}>
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '80px 48px 96px',
            }}
          >
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: '#695F50',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              404
            </div>
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '50px',
                fontWeight: 700,
                lineHeight: '1.05',
                color: '#EEE8D8',
                margin: '0 0 24px 0',
              }}
            >
              Project not found
            </h1>
            <a
              href="/"
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                color: '#AABFA4',
                letterSpacing: '0.04em',
              }}
            >
              ← Back to work
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const externalLink = project.externalUrl || project.liveUrl

  return (
    <div>
      {/* Project header band — dark, continues from Sidebar */}
      <div style={{ background: '#1A1610' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '64px 48px 80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <a
              href="/"
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '12px',
                color: '#695F50',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              ← Work
            </a>
            <span style={{ color: '#695F50', fontSize: '12px' }}>·</span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: '#5E8C55',
                letterSpacing: '0.08em',
              }}
            >
              {project.type}
            </span>
            <span style={{ color: '#695F50', fontSize: '12px' }}>·</span>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: '#695F50',
                letterSpacing: '0.04em',
              }}
            >
              {project.year}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(37px, 5.5vw, 72px)',
              fontWeight: 700,
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: '#EEE8D8',
              margin: '0 0 32px 0',
            }}
          >
            {project.title}
          </h1>

          {project.role && (
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 300,
                color: '#B5AC97',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              {project.role}
            </div>
          )}

          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#EEE8D8',
                background: '#5E8C55',
                padding: '12px 28px',
                borderRadius: '3px',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Visit Site →
            </a>
          )}
        </div>
      </div>

      {/* Problem statement */}
      {project.problem && (
        <div style={{ background: '#F9F6EE' }}>
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '80px 48px',
            }}
          >
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: '#695F50',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              The Problem
            </div>
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '21px',
                fontWeight: 400,
                lineHeight: '1.5',
                color: '#2D2820',
                margin: '0',
              }}
            >
              {project.problem}
            </p>
          </div>
        </div>
      )}

      {/* Approach */}
      {project.approach && (
        <div style={{ background: '#EEE8D8' }}>
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '80px 48px',
            }}
          >
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: '#695F50',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              Approach
            </div>
            <p
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: '1.62',
                color: '#4A4238',
                margin: '0',
              }}
            >
              {project.approach}
            </p>
          </div>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div style={{ background: '#F2EDE2' }}>
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '80px 48px',
            }}
          >
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: '#695F50',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              Outcome
            </div>
            <p
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: '1.62',
                color: '#4A4238',
                margin: '0',
              }}
            >
              {project.outcome}
            </p>
          </div>
        </div>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <div style={{ background: '#F9F6EE' }}>
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '64px 48px',
            }}
          >
            <div
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                color: '#695F50',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.stack.map(tech => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '13px',
                    color: '#4A4238',
                    background: '#D9D1BC',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description fallback for lightweight / experiment projects */}
      {project.description && !project.problem && (
        <div style={{ background: '#F9F6EE' }}>
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '80px 48px',
            }}
          >
            <p
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: '1.62',
                color: '#4A4238',
                margin: '0',
              }}
            >
              {project.description}
            </p>
          </div>
        </div>
      )}

      {/* Navigation band — next/back */}
      <div style={{ background: '#3A5E34' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: 'Source Sans 3, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#AABFA4',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            ← All Work
          </a>
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#EEE8D8',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Open Live Site →
            </a>
          )}
          {project.githubUrl && !externalLink && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Source Sans 3, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#EEE8D8',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              View on GitHub →
            </a>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}