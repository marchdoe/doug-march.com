import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({ padding: { base: '8 6', md: '16 24' } })}>
        <p className={css({ color: 'textSecondary' })}>Project not found.</p>
        <a href="/" className={css({ color: 'accentGlow' })}>
          ← Back home
        </a>
      </div>
    )
  }

  const link = project.liveUrl || project.externalUrl || project.githubUrl

  return (
    <div className={css({ padding: { base: '8 6', md: '12 16', lg: '16 24' } })}>
      <p
        className={css({
          fontFamily: 'mono',
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          color: 'textMuted',
          marginBottom: '3',
        })}
      >
        {project.type} · {project.year}
      </p>
      <h1
        className={css({
          fontFamily: 'display',
          textTransform: 'uppercase',
          color: 'text',
          lineHeight: 'tight',
          marginBottom: '8',
        })}
        style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
      >
        {project.title}
      </h1>

      <div
        className={css({
          display: 'grid',
          gap: '8',
          maxWidth: '68ch',
          borderTop: '1px solid',
          borderColor: 'border',
          paddingTop: '8',
        })}
      >
        {project.problem && (
          <div>
            <h2 className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'textMuted', marginBottom: '2' })}>
              Problem
            </h2>
            <p className={css({ color: 'textSecondary', fontSize: 'md', lineHeight: 'normal' })}>{project.problem}</p>
          </div>
        )}
        {project.approach && (
          <div>
            <h2 className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'textMuted', marginBottom: '2' })}>
              Approach
            </h2>
            <p className={css({ color: 'textSecondary', fontSize: 'md', lineHeight: 'normal' })}>{project.approach}</p>
          </div>
        )}
        {project.outcome && (
          <div>
            <h2 className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'textMuted', marginBottom: '2' })}>
              Outcome
            </h2>
            <p className={css({ color: 'textSecondary', fontSize: 'md', lineHeight: 'normal' })}>{project.outcome}</p>
          </div>
        )}
      </div>

      {project.stack && project.stack.length > 0 && (
        <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', marginTop: '8' })}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={css({
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'full',
                padding: '2 4',
                fontSize: 'xs',
                color: 'textSecondary',
              })}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {link && (
        <a
          href={link}
          className={css({
            display: 'inline-block',
            marginTop: '10',
            fontSize: 'sm',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'accentGlow',
            borderBottom: '1px solid',
            borderColor: 'accent',
            paddingBottom: '1',
            _hover: { color: 'accent' },
          })}
        >
          Visit ↗
        </a>
      )}
    </div>
  )
}