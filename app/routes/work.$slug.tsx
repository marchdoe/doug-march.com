import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '5vh 5vw' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            letterSpacing: '-0.02em',
          })}
        >
          Not Found
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            color: 'textSecondary',
            marginTop: '24px',
          })}
        >
          No project matches this slug.
        </p>
        <a
          href="/"
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            color: 'accent',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
            marginTop: '16px',
            _hover: { color: 'accentLight' },
            transition: 'color 200ms ease',
          })}
        >
          ← Back
        </a>
      </div>
    )
  }

  return (
    <div className={css({ padding: '5vh 5vw', maxWidth: '1200px' })}>
      {/* Header */}
      <div className={css({ marginBottom: '64px' })}>
        <a
          href="/"
          className={css({
            fontFamily: 'mono',
            fontSize: '11px',
            color: 'textMuted',
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
            marginBottom: '24px',
            _hover: { color: 'accentLight' },
            transition: 'color 200ms ease',
          })}
        >
          ← Back
        </a>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 8vw, 112px)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          })}
        >
          {project.title}
        </h1>
        <div
          className={css({
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap',
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
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
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                color: 'accent',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: 'accentLight' },
                transition: 'color 200ms ease',
              })}
            >
              Visit ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                color: 'accent',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: 'accentLight' },
                transition: 'color 200ms ease',
              })}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '200px 1fr' },
          gap: '48px',
        })}
      >
        {/* Meta Column */}
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '32px' })}>
          {project.role && (
            <div>
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '10px',
                  fontVariant: 'all-small-caps',
                  letterSpacing: '0.12em',
                  color: 'textMuted',
                  display: 'block',
                  marginBottom: '4px',
                })}
              >
                Role
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  color: 'textSecondary',
                })}
              >
                {project.role}
              </span>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <div>
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '10px',
                  fontVariant: 'all-small-caps',
                  letterSpacing: '0.12em',
                  color: 'textMuted',
                  display: 'block',
                  marginBottom: '8px',
                })}
              >
                Stack
              </span>
              <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className={css({
                      fontFamily: 'mono',
                      fontSize: '11px',
                      color: 'textSecondary',
                      border: '1px solid',
                      borderColor: 'border',
                      padding: '4px 8px',
                    })}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '48px' })}>
          {project.problem && (
            <div>
              <h2
                className={css({
                  fontFamily: 'mono',
                  fontSize: '10px',
                  fontVariant: 'all-small-caps',
                  letterSpacing: '0.15em',
                  color: 'textMuted',
                  marginBottom: '12px',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  paddingBottom: '8px',
                })}
              >
                Problem
              </h2>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '65ch',
                })}
              >
                {project.problem}
              </p>
            </div>
          )}
          {project.approach && (
            <div>
              <h2
                className={css({
                  fontFamily: 'mono',
                  fontSize: '10px',
                  fontVariant: 'all-small-caps',
                  letterSpacing: '0.15em',
                  color: 'textMuted',
                  marginBottom: '12px',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  paddingBottom: '8px',
                })}
              >
                Approach
              </h2>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '65ch',
                })}
              >
                {project.approach}
              </p>
            </div>
          )}
          {project.outcome && (
            <div>
              <h2
                className={css({
                  fontFamily: 'mono',
                  fontSize: '10px',
                  fontVariant: 'all-small-caps',
                  letterSpacing: '0.15em',
                  color: 'textMuted',
                  marginBottom: '12px',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  paddingBottom: '8px',
                })}
              >
                Outcome
              </h2>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '65ch',
                })}
              >
                {project.outcome}
              </p>
            </div>
          )}
          {project.description && (
            <div>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  maxWidth: '65ch',
                })}
              >
                {project.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '16px',
          marginTop: '96px',
        })}
      >
        <a
          href="/archive"
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            color: 'textMuted',
            _hover: { color: 'accentLight' },
            transition: 'color 200ms ease',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}