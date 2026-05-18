import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '16 6vw' })}>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: 'clamp(36px, 5vw, 72px)',
          color: 'textHero',
          textTransform: 'uppercase',
        })}>NOT FOUND</h1>
        <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'textSecondary', marginTop: '4' })}>
          This project doesn't exist.
        </p>
        <a href="/" className={css({
          fontFamily: 'body',
          fontSize: '14px',
          color: 'accent',
          marginTop: '4',
          display: 'inline-block',
          padding: '2',
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
        })}>← Back</a>
      </div>
    )
  }

  return (
    <div className={css({ padding: '8 6vw', maxWidth: '1000px' })}>
      <a href="/" className={css({
        fontFamily: 'body',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'textLabel',
        display: 'inline-block',
        marginBottom: '8',
        padding: '2',
        _hover: { color: 'accentLight' },
        _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
      })}>← BACK</a>

      <h1 className={css({
        fontFamily: 'display',
        fontSize: 'clamp(36px, 5vw, 72px)',
        lineHeight: 'tight',
        color: 'textHero',
        textTransform: 'uppercase',
        marginBottom: '4',
      })}>{project.title}</h1>

      <div className={css({
        display: 'flex',
        gap: '4',
        marginBottom: '8',
        flexWrap: 'wrap',
      })}>
        <span className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel', letterSpacing: '0.1em', textTransform: 'uppercase' })}>{project.type}</span>
        <span className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted' })}>·</span>
        <span className={css({ fontFamily: 'body', fontSize: '12px', color: 'textLabel' })}>{project.year}</span>
      </div>

      {project.role && (
        <div className={css({ marginBottom: '6' })}>
          <h2 className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>ROLE</h2>
          <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', maxWidth: '65ch' })}>{project.role}</p>
        </div>
      )}

      {project.problem && (
        <div className={css({ marginBottom: '6' })}>
          <h2 className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>PROBLEM</h2>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text', maxWidth: '65ch' })}>{project.problem}</p>
        </div>
      )}

      {project.approach && (
        <div className={css({ marginBottom: '6' })}>
          <h2 className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>APPROACH</h2>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text', maxWidth: '65ch' })}>{project.approach}</p>
        </div>
      )}

      {project.outcome && (
        <div className={css({ marginBottom: '6' })}>
          <h2 className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>OUTCOME</h2>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text', maxWidth: '65ch' })}>{project.outcome}</p>
        </div>
      )}

      {project.stack && project.stack.length > 0 && (
        <div className={css({ marginBottom: '6' })}>
          <h2 className={css({ fontFamily: 'body', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>STACK</h2>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2' })}>
            {project.stack.map((tech, i) => (
              <span key={i} className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSecondary',
                padding: '1 3',
                border: '1px solid',
                borderColor: 'border',
              })}>{tech}</span>
            ))}
          </div>
        </div>
      )}

      {project.description && (
        <div className={css({ marginBottom: '6' })}>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'normal', color: 'text', maxWidth: '65ch' })}>{project.description}</p>
        </div>
      )}

      <div className={css({ display: 'flex', gap: '4', marginTop: '8', flexWrap: 'wrap' })}>
        {project.externalUrl && (
          <a href={project.externalUrl} className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            padding: '2 4',
            border: '1px solid',
            borderColor: 'accent',
            _hover: { color: 'accentLight', borderColor: 'accentLight' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>Visit Site →</a>
        )}
        {project.liveUrl && !project.externalUrl && (
          <a href={project.liveUrl} className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            padding: '2 4',
            border: '1px solid',
            borderColor: 'accent',
            _hover: { color: 'accentLight', borderColor: 'accentLight' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>Live →</a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'textSecondary',
            padding: '2 4',
            border: '1px solid',
            borderColor: 'border',
            _hover: { color: 'accentLight', borderColor: 'accentLight' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}>GitHub →</a>
        )}
      </div>
    </div>
  )
}