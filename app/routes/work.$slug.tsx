import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Sidebar />
        <div className={css({ padding: '80px 6vw' })}>
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: 'text',
            })}
          >
            Project not found
          </h1>
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'accent',
              marginTop: '24px',
              display: 'inline-block',
              _hover: { color: 'accentLight' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            ← Back
          </a>
        </div>
      </>
    )
  }

  return (
    <>
      <Sidebar />

      {/* Hero band */}
      <section
        className={css({
          padding: '80px 6vw 64px',
          background: 'bg',
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
            })}
          >
            {project.type}
          </span>
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              color: 'textMuted',
            })}
          >
            {project.year}
          </span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '24px',
          })}
        >
          {project.title}
        </h1>
        {project.problem && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 'normal',
              color: 'textSecondary',
              maxWidth: '65ch',
            })}
          >
            {project.problem}
          </p>
        )}
        {project.description && !project.problem && (
          <p
            className={css({
              fontFamily: 'body',
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 'normal',
              color: 'textSecondary',
              maxWidth: '65ch',
            })}
          >
            {project.description}
          </p>
        )}
      </section>

      {/* Detail band */}
      <section
        className={css({
          padding: '64px 6vw',
          background: 'bgCard',
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '32px',
            },
          })}
        >
          {project.role && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  marginBottom: '8px',
                })}
              >
                Role
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '50ch',
                })}
              >
                {project.role}
              </p>
            </div>
          )}
          {project.approach && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  marginBottom: '8px',
                })}
              >
                Approach
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '50ch',
                })}
              >
                {project.approach}
              </p>
            </div>
          )}
          {project.outcome && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  marginBottom: '8px',
                })}
              >
                Outcome
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'text',
                  maxWidth: '50ch',
                })}
              >
                {project.outcome}
              </p>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMuted',
                  marginBottom: '8px',
                })}
              >
                Stack
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
                      padding: '4px 12px',
                      border: '1px solid',
                      borderColor: 'border',
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

      {/* Links band */}
      <section
        className={css({
          padding: '48px 6vw',
          background: 'bg',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
        })}
      >
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'accent',
              padding: '12px 24px',
              border: '1px solid',
              borderColor: 'accent',
              textDecoration: 'none',
              _hover: { background: 'accent', color: 'textInverse' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            Visit Site →
          </a>
        )}
        {project.liveUrl && !project.externalUrl && (
          <a
            href={project.liveUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'accent',
              padding: '12px 24px',
              border: '1px solid',
              borderColor: 'accent',
              textDecoration: 'none',
              _hover: { background: 'accent', color: 'textInverse' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            Live →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              padding: '12px 24px',
              border: '1px solid',
              borderColor: 'border',
              textDecoration: 'none',
              _hover: { color: 'accent', borderColor: 'accent' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            GitHub
          </a>
        )}
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            padding: '12px 24px',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
          })}
        >
          ← All Work
        </a>
      </section>

      {/* Footer */}
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '24px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start',
          },
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
          })}
        >
          Doug March
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}