import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section
        className={css({
          paddingTop: '120px',
          padding: '120px 6vw 80px',
          background: 'bg',
          minHeight: '60vh',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 'bold',
            lineHeight: 'tight',
            color: 'text',
            marginBottom: '16px',
          })}
        >
          NOT FOUND
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            color: 'textSecondary',
          })}
        >
          No project with slug "{slug}" exists.
        </p>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            marginTop: '24px',
            display: 'inline-block',
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          ← Back to work
        </a>
      </section>
    )
  }

  return (
    <>
      {/* Project Hero */}
      <section
        className={css({
          paddingTop: '120px',
          padding: '120px 6vw 80px',
          background: 'bg',
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: '0.18em',
            color: 'textMuted',
            textTransform: 'uppercase',
            marginBottom: '24px',
          })}
        >
          {project.type} · {project.year}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(36px, 8vw, 96px)',
            fontWeight: 'bold',
            lineHeight: 'tight',
            color: 'text',
            marginBottom: '32px',
          })}
        >
          {project.title}
        </h1>
        {project.role && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'accent',
              letterSpacing: '0.05em',
              marginBottom: '16px',
            })}
          >
            {project.role}
          </p>
        )}
      </section>

      {/* Project Content */}
      <section
        className={css({
          padding: '80px 6vw',
          background: 'bgCard',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '48px',
            padding: '48px 6vw',
          },
        })}
      >
        <div>
          {project.problem && (
            <div className={css({ marginBottom: '40px' })}>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'medium',
                  letterSpacing: '0.18em',
                  color: 'textMuted',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                })}
              >
                PROBLEM
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: 'textSecondary',
                  maxWidth: '55ch',
                  letterSpacing: '0.01em',
                })}
              >
                {project.problem}
              </p>
            </div>
          )}
          {project.approach && (
            <div className={css({ marginBottom: '40px' })}>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'medium',
                  letterSpacing: '0.18em',
                  color: 'textMuted',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                })}
              >
                APPROACH
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: 'textSecondary',
                  maxWidth: '55ch',
                  letterSpacing: '0.01em',
                })}
              >
                {project.approach}
              </p>
            </div>
          )}
        </div>
        <div>
          {project.outcome && (
            <div className={css({ marginBottom: '40px' })}>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'medium',
                  letterSpacing: '0.18em',
                  color: 'textMuted',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                })}
              >
                OUTCOME
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: 'textSecondary',
                  maxWidth: '55ch',
                  letterSpacing: '0.01em',
                })}
              >
                {project.outcome}
              </p>
            </div>
          )}
          {project.description && (
            <div className={css({ marginBottom: '40px' })}>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'medium',
                  letterSpacing: '0.18em',
                  color: 'textMuted',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                })}
              >
                DESCRIPTION
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: '1.65',
                  color: 'textSecondary',
                  maxWidth: '55ch',
                  letterSpacing: '0.01em',
                })}
              >
                {project.description}
              </p>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '11px',
                  fontWeight: 'medium',
                  letterSpacing: '0.18em',
                  color: 'textMuted',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                })}
              >
                STACK
              </p>
              <div
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                })}
              >
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '13px',
                      color: 'textSecondary',
                      padding: '4px 10px',
                      border: '1px solid',
                      borderColor: 'border',
                      borderRadius: 'sm',
                    })}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Links */}
      <section
        className={css({
          padding: '48px 6vw',
          background: 'bg',
          borderTop: '1px solid',
          borderColor: 'border',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: 'medium',
            color: 'textSecondary',
            textDecoration: 'none',
            _hover: { color: 'text', textDecoration: 'underline' },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          ← All Work
        </a>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            Visit Site ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            GitHub ↗
          </a>
        )}
      </section>

      {/* Footer */}
      <footer
        className={css({
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6vw',
          background: 'bg',
          borderTop: '1px solid',
          borderColor: 'border',
          '@media (max-width: 768px)': {
            height: 'auto',
            padding: '16px 6vw',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
          },
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'textMuted',
          })}
        >
          © 2026 DOUG MARCH
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: '0.14em',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'textSecondary', textDecoration: 'underline' },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          ARCHIVE
        </a>
      </footer>
    </>
  )
}