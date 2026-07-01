import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: '120px 5vw', textAlign: 'center' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '48px', fontWeight: 'black', color: 'accent', textTransform: 'uppercase', marginBottom: '16px' })}>
          Not Found
        </h1>
        <a href="/" className={css({ fontFamily: 'body', fontSize: '16px', color: 'accent', _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' } })}>
          Back
        </a>
      </div>
    )
  }

  return (
    <div className={css({ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '100px 5vw 120px' })}>
      {/* Title */}
      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'black',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          textTransform: 'uppercase',
          color: 'accent',
          marginBottom: '16px',
        })}
      >
        {project.title}
      </h1>

      {/* Meta row */}
      <div
        className={css({
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
          fontFamily: 'body',
          fontSize: '13px',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
        })}
      >
        <span className={css({ color: 'textMuted' })}>{project.type}</span>
        <span className={css({ color: 'textMuted' })}>·</span>
        <span className={css({ color: 'textMuted' })}>{project.year}</span>
        {project.role && (
          <>
            <span className={css({ color: 'textMuted' })}>·</span>
            <span className={css({ color: 'textSecondary' })}>{project.role}</span>
          </>
        )}
      </div>

      {/* Problem */}
      {project.problem && (
        <section className={css({ marginBottom: '48px' })}>
          <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '14px', letterSpacing: 'wider', textTransform: 'uppercase', color: 'textMuted', marginBottom: '16px' })}>
            Problem
          </h2>
          <p className={css({ fontFamily: 'body', fontSize: '18px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.problem}
          </p>
        </section>
      )}

      {/* Approach */}
      {project.approach && (
        <section className={css({ marginBottom: '48px' })}>
          <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '14px', letterSpacing: 'wider', textTransform: 'uppercase', color: 'textMuted', marginBottom: '16px' })}>
            Approach
          </h2>
          <p className={css({ fontFamily: 'body', fontSize: '18px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.approach}
          </p>
        </section>
      )}

      {/* Outcome */}
      {project.outcome && (
        <section className={css({ marginBottom: '48px' })}>
          <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '14px', letterSpacing: 'wider', textTransform: 'uppercase', color: 'textMuted', marginBottom: '16px' })}>
            Outcome
          </h2>
          <p className={css({ fontFamily: 'body', fontSize: '18px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.outcome}
          </p>
        </section>
      )}

      {/* Description (for experiments) */}
      {project.description && !project.problem && (
        <section className={css({ marginBottom: '48px' })}>
          <p className={css({ fontFamily: 'body', fontSize: '18px', lineHeight: 'normal', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.description}
          </p>
        </section>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <section className={css({ marginBottom: '48px' })}>
          <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '14px', letterSpacing: 'wider', textTransform: 'uppercase', color: 'textMuted', marginBottom: '16px' })}>
            Stack
          </h2>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={css({
                  fontFamily: 'body',
                  fontSize: '13px',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'textSecondary',
                  padding: '6px 12px',
                  border: '1px solid',
                  borderColor: 'border',
                })}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <div className={css({ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '48px' })}>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '12px 24px',
              border: '1px solid',
              borderColor: 'accent',
              _hover: { background: 'accent', color: 'bg' },
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
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'accent',
              textDecoration: 'none',
              padding: '12px 24px',
              border: '1px solid',
              borderColor: 'accent',
              _hover: { background: 'accent', color: 'bg' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            View Live →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textSecondary',
              textDecoration: 'none',
              padding: '12px 24px',
              border: '1px solid',
              borderColor: 'border',
              _hover: { borderColor: 'accent', color: 'accent' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
            })}
          >
            GitHub
          </a>
        )}
      </div>

      {/* Back */}
      <a
        href="/"
        className={css({
          fontFamily: 'body',
          fontSize: '13px',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          textDecoration: 'none',
          _hover: { color: 'accent' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
        })}
      >
        ← Back
      </a>
    </div>
  )
}