import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '96px 5vw', minHeight: '100vh' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '2rem', color: 'text' })}>Project not found</h1>
        <a href="/" className={css({ color: 'accent', fontSize: '14px', padding: '10px 0', display: 'inline-block' })}>← Back home</a>
      </div>
    )
  }

  return (
    <div className={css({
      minHeight: '100vh',
      padding: '96px 5vw 96px',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      columnGap: '16px',
      rowGap: '0',
    })}>
      {/* Title zone */}
      <div className={css({
        gridColumn: '1 / 8',
        paddingBottom: '48px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
        },
      })}>
        <p className={css({
          fontFamily: 'body',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '12px',
        })}>{project.type} · {project.year}</p>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(2rem, 4.5vw, 4rem)',
          fontWeight: '600',
          color: 'text',
          lineHeight: '1.1',
          marginBottom: '24px',
        })}>{project.title}</h1>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '10px 0',
              display: 'inline-block',
              _hover: { textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Visit Site →
          </a>
        )}
      </div>

      {/* Meta — right column */}
      <div className={css({
        gridColumn: '9 / 13',
        paddingBottom: '48px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
        },
      })}>
        {project.role && (
          <div className={css({ marginBottom: '20px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '10px', fontWeight: '500', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4px' })}>Role</p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', lineHeight: '1.5' })}>{project.role}</p>
          </div>
        )}
        {project.stack && project.stack.length > 0 && (
          <div className={css({ marginBottom: '20px' })}>
            <p className={css({ fontFamily: 'body', fontSize: '10px', fontWeight: '500', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '4px' })}>Stack</p>
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary', lineHeight: '1.5' })}>{project.stack.join(', ')}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={css({
        gridColumn: '1 / 8',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        paddingBottom: '64px',
        '@media (max-width: 768px)': {
          gridColumn: '1 / 13',
        },
      })}>
        {project.problem && (
          <div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '8px',
            })}>Problem</p>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              lineHeight: '1.6',
              maxWidth: '60ch',
            })}>{project.problem}</p>
          </div>
        )}
        {project.approach && (
          <div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '8px',
            })}>Approach</p>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              lineHeight: '1.6',
              maxWidth: '60ch',
            })}>{project.approach}</p>
          </div>
        )}
        {project.outcome && (
          <div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '8px',
            })}>Outcome</p>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              lineHeight: '1.6',
              maxWidth: '60ch',
            })}>{project.outcome}</p>
          </div>
        )}
        {project.description && (
          <div>
            <p className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text',
              lineHeight: '1.6',
              maxWidth: '60ch',
            })}>{project.description}</p>
          </div>
        )}
      </div>

      {/* Back link */}
      <div className={css({
        gridColumn: '1 / 13',
        paddingTop: '32px',
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
      })}>
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          fontWeight: '500',
          color: 'accent',
          textDecoration: 'none',
          padding: '10px 0',
          _hover: { textDecoration: 'underline' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>← All Work</a>
        <a href="/archive" className={css({
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          textDecoration: 'none',
          padding: '10px 0',
          _hover: { color: 'textSecondary' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>Archive</a>
      </div>
    </div>
  )
}