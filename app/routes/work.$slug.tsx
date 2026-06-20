import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '96px 6vw', textAlign: 'center' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: 'clamp(32px, 5vw, 64px)', color: 'accent', marginBottom: '16px' })}>
          NOT FOUND
        </h1>
        <a href="/" className={css({ fontFamily: 'body', fontSize: '16px', color: 'accent', _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>
          Back to work
        </a>
      </div>
    )
  }

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '2px',
        width: '100vw',
        minHeight: '100vh',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '0',
        },
      })}
    >
      {/* Project hero */}
      <div
        className={css({
          gridColumn: '1 / 9',
          padding: '8vw 6vw 4vw',
          background: 'bg',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          minHeight: '50vh',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '64px 24px 32px',
            minHeight: '40vh',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
          })}
        >
          {project.type} · {project.year}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 9vw, 140px)',
            lineHeight: 'tight',
            letterSpacing: '-0.03em',
            color: 'accent',
          })}
        >
          {project.title}
        </h1>
      </div>

      {/* Project meta sidebar */}
      <div
        className={css({
          gridColumn: '9 / 13',
          padding: '48px 28px',
          background: 'bgCard',
          borderTop: '2px solid',
          borderColor: 'borderAccent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '24px',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '32px 24px',
          },
        })}
      >
        {project.role && (
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4px' })}>
              ROLE
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text' })}>
              {project.role}
            </p>
          </div>
        )}
        {project.stack && project.stack.length > 0 && (
          <div>
            <p className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
              STACK
            </p>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '6px' })}>
              {project.stack.map((s) => (
                <span
                  key={s}
                  className={css({
                    fontFamily: 'body',
                    fontSize: '12px',
                    color: 'textSecondary',
                    padding: '4px 8px',
                    border: '1px solid',
                    borderColor: 'border',
                  })}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {(project.externalUrl || project.liveUrl) && (
          <a
            href={project.externalUrl || project.liveUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'none',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              padding: '12px 0',
              borderBottom: '2px solid',
              borderColor: 'accent',
              display: 'inline-block',
              _hover: { textDecoration: 'none!', opacity: 0.8 },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            VISIT SITE →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'textSecondary',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            GitHub →
          </a>
        )}
      </div>

      {/* Project content */}
      <div
        className={css({
          gridColumn: '1 / 8',
          padding: '48px 6vw 96px',
          background: 'bg',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            padding: '32px 24px 64px',
          },
        })}
      >
        {project.problem && (
          <div className={css({ marginBottom: '48px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '12px', borderTop: '2px solid', borderColor: 'borderAccent', paddingTop: '16px' })}>
              PROBLEM
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '18px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '60ch' })}>
              {project.problem}
            </p>
          </div>
        )}
        {project.approach && (
          <div className={css({ marginBottom: '48px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '12px' })}>
              APPROACH
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '60ch' })}>
              {project.approach}
            </p>
          </div>
        )}
        {project.outcome && (
          <div className={css({ marginBottom: '48px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '12px' })}>
              OUTCOME
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '60ch' })}>
              {project.outcome}
            </p>
          </div>
        )}
        {project.description && !project.problem && (
          <div className={css({ marginBottom: '48px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '60ch' })}>
              {project.description}
            </p>
          </div>
        )}
      </div>

      {/* Empty right block for balance */}
      <div
        className={css({
          gridColumn: '8 / 13',
          background: 'bgCard',
          minHeight: '200px',
          '@media (max-width: 768px)': {
            display: 'none',
          },
        })}
      />

      {/* Back link footer */}
      <div
        className={css({
          gridColumn: '1 / -1',
          padding: '24px 6vw',
          background: 'bgCard',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            padding: '24px',
          },
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            textDecoration: 'none',
            _hover: { textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back to work
        </a>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </div>
    </div>
  )
}