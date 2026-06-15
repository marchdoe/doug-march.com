import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ width: '88vw', maxWidth: '1440px', margin: '0 auto', paddingTop: '128px', paddingBottom: '128px' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '32px', fontWeight: 'bold', color: 'text' })}>Project not found</h1>
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '16px',
          color: 'accent',
          marginTop: '16px',
          display: 'inline-block',
          _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>← Back home</a>
      </div>
    )
  }

  return (
    <div className={css({ width: '88vw', maxWidth: '1440px', margin: '0 auto' })}>
      {/* Hero */}
      <section className={css({
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '96px',
        paddingBottom: '64px',
      })}>
        <span className={css({
          fontFamily: 'body',
          fontSize: '11px',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '16px',
          display: 'block',
        })}>{project.type} · {project.year}</span>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 'bold',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
        })}>{project.title}</h1>
        {project.role && (
          <p className={css({
            fontFamily: 'body',
            fontSize: '16px',
            color: 'textSecondary',
            marginTop: '16px',
          })}>Role: {project.role}</p>
        )}
        <div className={css({ width: '48px', height: '2px', background: 'accent', marginTop: '32px' })} />
      </section>

      {/* Details */}
      <section className={css({
        paddingBottom: '96px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '64px',
        '@media (max-width: 640px)': {
          gridTemplateColumns: '1fr',
          gap: '48px',
        },
      })}>
        {project.problem && (
          <div>
            <span className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              marginBottom: '12px',
            })}>Problem</span>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text',
              maxWidth: '65ch',
            })}>{project.problem}</p>
          </div>
        )}

        {project.approach && (
          <div>
            <span className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              marginBottom: '12px',
            })}>Approach</span>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text',
              maxWidth: '65ch',
            })}>{project.approach}</p>
          </div>
        )}

        {project.outcome && (
          <div>
            <span className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              marginBottom: '12px',
            })}>Outcome</span>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text',
              maxWidth: '65ch',
            })}>{project.outcome}</p>
          </div>
        )}

        {project.description && !project.problem && (
          <div>
            <span className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              marginBottom: '12px',
            })}>Description</span>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              lineHeight: 'normal',
              color: 'text',
              maxWidth: '65ch',
            })}>{project.description}</p>
          </div>
        )}
      </section>

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <section className={css({
          paddingTop: '48px',
          paddingBottom: '64px',
          borderTop: '1px solid',
          borderColor: 'border',
        })}>
          <span className={css({
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'medium',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            display: 'block',
            marginBottom: '16px',
          })}>Stack</span>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
            {project.stack.map((tech) => (
              <span key={tech} className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSecondary',
                padding: '6px 14px',
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'sm',
              })}>{tech}</span>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <section className={css({
        paddingTop: '48px',
        paddingBottom: '96px',
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
      })}>
        {project.externalUrl && (
          <a href={project.externalUrl} className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: 'medium',
            color: 'accent',
            textDecoration: 'none',
            padding: '12px 24px',
            border: '1px solid',
            borderColor: 'borderAccent',
            borderRadius: 'sm',
            _hover: { background: 'accentSubtle' },
            _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>Visit site →</a>
        )}
        {project.liveUrl && project.liveUrl !== project.externalUrl && (
          <a href={project.liveUrl} className={css({
            fontFamily: 'body',
            fontSize: '14px',
            fontWeight: 'medium',
            color: 'accent',
            textDecoration: 'none',
            padding: '12px 24px',
            border: '1px solid',
            borderColor: 'borderAccent',
            borderRadius: 'sm',
            _hover: { background: 'accentSubtle' },
            _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>Live demo →</a>
        )}
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '14px',
          fontWeight: 'medium',
          color: 'textSecondary',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '1px solid',
          borderColor: 'border',
          borderRadius: 'sm',
          _hover: { color: 'text' },
          _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>← All work</a>
      </section>

      <footer className={css({
        paddingTop: '32px',
        paddingBottom: '48px',
        borderTop: '1px solid',
        borderColor: 'border',
      })}>
        <a href="/archive" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          textDecoration: 'none',
          _hover: { color: 'accent' },
          _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>Archive</a>
      </footer>
    </div>
  )
}