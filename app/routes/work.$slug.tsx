import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '96px 6vw' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: '700',
            lineHeight: '0.88',
            color: 'heroText',
            textTransform: 'uppercase',
          })}
        >
          Not Found
        </h1>
      </div>
    )
  }

  return (
    <div className={css({ padding: '96px 6vw 96px', maxWidth: '1200px' })}>
      {/* Project header */}
      <header className={css({ marginBottom: '64px' })}>
        <div
          className={css({
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '24px',
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              letterSpacing: '0.10em',
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
              letterSpacing: '0.10em',
              color: 'textMuted',
            })}
          >
            {project.year}
          </span>
        </div>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 10vw, 120px)',
            fontWeight: '700',
            lineHeight: '0.88',
            letterSpacing: '-0.02em',
            color: 'heroText',
            textTransform: 'uppercase',
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
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'textMuted',
            })}
          >
            {project.role}
          </p>
        )}
      </header>

      {/* Project body */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gap: '24px',
          '@media (max-width: 640px)': {
            gridTemplateColumns: '1fr',
            gap: '16px',
          },
        })}
      >
        {project.problem && (
          <>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                paddingTop: '4px',
              })}
            >
              Problem
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'textSecondary',
                maxWidth: '60ch',
                paddingBottom: '24px',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              {project.problem}
            </p>
          </>
        )}
        {project.approach && (
          <>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                paddingTop: '28px',
              })}
            >
              Approach
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'textSecondary',
                maxWidth: '60ch',
                paddingTop: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              {project.approach}
            </p>
          </>
        )}
        {project.outcome && (
          <>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                paddingTop: '28px',
              })}
            >
              Outcome
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'textSecondary',
                maxWidth: '60ch',
                paddingTop: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              {project.outcome}
            </p>
          </>
        )}
        {project.description && !project.problem && (
          <>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                paddingTop: '4px',
              })}
            >
              About
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: '1.5',
                color: 'textSecondary',
                maxWidth: '60ch',
                paddingBottom: '24px',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              {project.description}
            </p>
          </>
        )}
        {project.stack && project.stack.length > 0 && (
          <>
            <span
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'textMuted',
                paddingTop: '28px',
              })}
            >
              Stack
            </span>
            <div
              className={css({
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                paddingTop: '24px',
              })}
            >
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    color: 'textSecondary',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Links */}
      <div className={css({ marginTop: '64px', display: 'flex', gap: '24px', flexWrap: 'wrap' })}>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid',
              borderColor: 'accent',
              _hover: { color: 'accentLight' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            Visit Site ↗
          </a>
        )}
        {project.liveUrl && !project.externalUrl && (
          <a
            href={project.liveUrl}
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid',
              borderColor: 'accent',
              _hover: { color: 'accentLight' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid',
              borderColor: 'accent',
              _hover: { color: 'accentLight' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            GitHub ↗
          </a>
        )}
      </div>

      {/* Footer */}
      <footer
        className={css({
          marginTop: '96px',
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
          })}
        >
          ← All Work
        </a>
        <a
          href="/archive"
          className={css({
            fontFamily: 'mono',
            fontSize: '12px',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '12px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
          })}
        >
          Archive
        </a>
      </footer>
    </div>
  )
}