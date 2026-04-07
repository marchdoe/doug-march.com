import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const FONT_HEADING = '"Syne", sans-serif'
const FONT_BODY = '"IBM Plex Sans", sans-serif'
const FONT_MONO = '"IBM Plex Mono", monospace'

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '36px',
        borderTop: '1px solid #D3D5C6',
      }}>
        <span style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: '#676A59',
        }}>
          {label}
        </span>
      </div>
      <div style={{ padding: '16px 0 28px 0', borderBottom: '1px solid #D3D5C6' }}>
        {children}
      </div>
    </div>
  )
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 40px',
        backgroundColor: '#F4F5ED',
        minHeight: 'calc(100vh - 52px)',
      }}>
        <div style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#C4992E',
          marginBottom: '16px',
        }}>
          404
        </div>
        <h1 style={{
          fontFamily: FONT_HEADING,
          fontWeight: 700,
          fontSize: '37px',
          lineHeight: '1.08',
          letterSpacing: '-0.025em',
          color: '#1D1F13',
          margin: '0 0 16px 0',
        }}>
          Project not found
        </h1>
        <a href="/" style={{
          fontFamily: FONT_BODY,
          fontSize: '14px',
          color: '#C4992E',
          textDecoration: 'none',
          letterSpacing: '0.03em',
        }}>
          ← Return to work
        </a>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F4F5ED', minHeight: 'calc(100vh - 52px)' }}>
      {/* Project header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 40px 36px 40px',
        borderBottom: '1px solid #D3D5C6',
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <a href="/" style={{
            fontFamily: FONT_BODY,
            fontSize: '11px',
            color: '#676A59',
            textDecoration: 'none',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}>
            ← Work
          </a>
        </div>

        {/* Type label */}
        <div style={{
          fontFamily: FONT_HEADING,
          fontWeight: 600,
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#C4992E',
          marginBottom: '14px',
        }}>
          {project.type}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: FONT_HEADING,
          fontWeight: 700,
          fontSize: '50px',
          lineHeight: '1.08',
          letterSpacing: '-0.025em',
          color: '#1D1F13',
          margin: '0 0 24px 0',
          padding: 0,
        }}>
          {project.title}
        </h1>

        {/* Meta row */}
        <div style={{
          display: 'flex',
          gap: '0',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Year', value: String(project.year) },
            project.role ? { label: 'Role', value: project.role } : null,
          ].filter(Boolean).map((item, i) => (
            <div key={item!.label} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              paddingRight: '32px',
            }}>
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: '11px',
                color: '#8C8F7E',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                {item!.label}
              </span>
              <span style={{
                fontFamily: FONT_MONO,
                fontSize: '13px',
                color: '#4C4F3F',
              }}>
                {item!.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Project body — 2-column: content + meta */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
      }}>

        {/* Left: main content */}
        <div style={{ padding: '0 36px 64px 40px', borderRight: '1px solid #D3D5C6' }}>

          {project.problem && (
            <SectionBlock label="Problem">
              <p style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.58',
                color: '#4C4F3F',
                margin: 0,
                padding: 0,
                maxWidth: '560px',
              }}>
                {project.problem}
              </p>
            </SectionBlock>
          )}

          {project.approach && (
            <SectionBlock label="Approach">
              <p style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.58',
                color: '#4C4F3F',
                margin: 0,
                padding: 0,
                maxWidth: '560px',
              }}>
                {project.approach}
              </p>
            </SectionBlock>
          )}

          {project.outcome && (
            <SectionBlock label="Outcome">
              <p style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.58',
                color: '#4C4F3F',
                margin: 0,
                padding: 0,
                maxWidth: '560px',
              }}>
                {project.outcome}
              </p>
            </SectionBlock>
          )}

          {project.description && !project.problem && (
            <SectionBlock label="About">
              <p style={{
                fontFamily: FONT_BODY,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.58',
                color: '#4C4F3F',
                margin: 0,
                padding: 0,
                maxWidth: '560px',
              }}>
                {project.description}
              </p>
            </SectionBlock>
          )}
        </div>

        {/* Right: meta sidebar */}
        <div style={{ padding: '0 24px 64px 32px' }}>

          {/* Stack */}
          {project.stack && project.stack.length > 0 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '36px',
                borderBottom: '1px solid #D3D5C6',
              }}>
                <span style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: '#676A59',
                }}>
                  Stack
                </span>
              </div>

              <div style={{
                paddingTop: '16px',
                paddingBottom: '28px',
                borderBottom: '1px solid #D3D5C6',
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '0',
              }}>
                {project.stack.map((tech) => (
                  <div
                    key={tech}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: '13px',
                      color: '#4C4F3F',
                      padding: '8px 0',
                      borderBottom: '1px solid #E9EAE0',
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(project.liveUrl || project.githubUrl || project.externalUrl) && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '36px',
                borderBottom: '1px solid #D3D5C6',
              }}>
                <span style={{
                  fontFamily: FONT_HEADING,
                  fontWeight: 600,
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: '#676A59',
                }}>
                  Links
                </span>
              </div>

              <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {(project.liveUrl || project.externalUrl) && (
                  <a
                    href={project.liveUrl || project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '13px',
                      color: '#C4992E',
                      textDecoration: 'none',
                      letterSpacing: '0.03em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
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
                      fontFamily: FONT_BODY,
                      fontSize: '13px',
                      color: '#676A59',
                      textDecoration: 'none',
                      letterSpacing: '0.03em',
                    }}
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Navigation to other projects */}
          <div style={{ marginTop: '48px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: '36px',
              borderBottom: '1px solid #D3D5C6',
            }}>
              <span style={{
                fontFamily: FONT_HEADING,
                fontWeight: 600,
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                color: '#676A59',
              }}>
                More Work
              </span>
            </div>

            {projects
              .filter((p) => p.slug !== slug)
              .slice(0, 4)
              .map((p) => (
                <a
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #E9EAE0',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{
                    fontFamily: FONT_HEADING,
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1D1F13',
                  }}>
                    {p.title}
                  </span>
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: '11px',
                    color: '#8C8F7E',
                  }}>
                    {p.year}
                  </span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}