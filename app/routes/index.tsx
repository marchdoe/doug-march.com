import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const projectRowLink = css({
  display: 'block',
  textDecoration: 'none',
  transition: 'background 150ms ease',
  _hover: {
    background: '#EAEEEB',
    textDecoration: 'none',
  },
})

const indexLabel = {
  position: 'absolute' as const,
  left: '28px',
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '9px',
  color: '#A9BBAA',
  letterSpacing: '0.05em',
}

const sectionMarker = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '9px',
  color: '#78947A',
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  marginBottom: '32px',
}

function HomePage() {
  return (
    <div>
      {/* Section 01: Featured Project */}
      <div
        style={{
          position: 'relative',
          padding: '80px 56px',
          borderBottom: '1px solid #CDD9CE',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '80px' }}>01</span>

        <div style={sectionMarker}>Featured</div>

        {featuredProject && (
          <>
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
              rel={
                featuredProject.liveUrl || featuredProject.externalUrl
                  ? 'noopener noreferrer'
                  : undefined
              }
              style={{ textDecoration: 'none' }}
            >
              <h1
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 600,
                  fontSize: '50px',
                  lineHeight: '1.05',
                  letterSpacing: '-0.02em',
                  color: '#192B1A',
                  marginBottom: '24px',
                  transition: 'color 150ms ease',
                }}
              >
                {featuredProject.title}
              </h1>
            </a>

            {featuredProject.problem && (
              <p
                style={{
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontSize: '21px',
                  color: '#3D5C3F',
                  lineHeight: '1.55',
                  maxWidth: '520px',
                  marginBottom: '32px',
                  fontWeight: 300,
                }}
              >
                {featuredProject.problem}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                borderLeft: '3px solid #519A58',
                paddingLeft: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '12px',
                  color: '#78947A',
                  letterSpacing: '0.08em',
                }}
              >
                {featuredProject.year}
              </span>
              {featuredProject.role && (
                <span
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '12px',
                    color: '#78947A',
                    letterSpacing: '0.08em',
                  }}
                >
                  {featuredProject.role}
                </span>
              )}
              {(featuredProject.liveUrl || featuredProject.externalUrl) && (
                <a
                  href={
                    featuredProject.liveUrl || featuredProject.externalUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '12px',
                    color: '#519A58',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                  }}
                >
                  Visit →
                </a>
              )}
            </div>
          </>
        )}
      </div>

      {/* Section 02: Selected Work */}
      <div
        style={{
          position: 'relative',
          padding: '56px 56px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '56px' }}>02</span>

        <div style={sectionMarker}>Selected Work</div>

        <div>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={projectRowLink}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '20px 8px',
                  borderBottom: '1px solid #CDD9CE',
                  gap: '24px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 600,
                      fontSize: '21px',
                      lineHeight: '1.15',
                      color: '#192B1A',
                      marginBottom: '8px',
                    }}
                  >
                    {project.title}
                  </div>
                  {project.problem && (
                    <div
                      style={{
                        fontFamily: '"Source Sans 3", sans-serif',
                        fontSize: '14px',
                        color: '#78947A',
                        lineHeight: '1.55',
                        maxWidth: '460px',
                      }}
                    >
                      {project.problem}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                    flexShrink: 0,
                    paddingTop: '4px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '12px',
                      color: '#78947A',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {project.year}
                  </span>
                  <span
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '9px',
                      color: '#A9BBAA',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.type}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Section 03: Experiments */}
      <div
        style={{
          position: 'relative',
          padding: '64px 56px',
          borderBottom: '1px solid #CDD9CE',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ ...indexLabel, top: '64px' }}>03</span>

        <div style={sectionMarker}>Experiments</div>

        <div>
          {experiments.map((exp) => (
            <div
              key={exp.slug}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '14px 0',
                borderBottom: '1px solid #E5EDE6',
                gap: '16px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '16px',
                    color: '#3D5C3F',
                    marginBottom: '4px',
                    lineHeight: '1.15',
                  }}
                >
                  {exp.title}
                </div>
                {exp.description && (
                  <div
                    style={{
                      fontFamily: '"Source Sans 3", sans-serif',
                      fontSize: '14px',
                      color: '#78947A',
                      lineHeight: '1.55',
                    }}
                  >
                    {exp.description}
                  </div>
                )}
              </div>
              <div
                style={{
                  flexShrink: 0,
                  textAlign: 'right',
                  paddingTop: '2px',
                }}
              >
                <span
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '12px',
                    color: '#A9BBAA',
                    letterSpacing: '0.05em',
                  }}
                >
                  {exp.year}
                </span>
                <div
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '9px',
                    color: '#CDD9CE',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '3px',
                  }}
                >
                  {exp.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '28px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '9px',
            color: '#A9BBAA',
            letterSpacing: '0.12em',
          }}
        >
          doug-march.com &nbsp;·&nbsp; 2026
        </span>
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