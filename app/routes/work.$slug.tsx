import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: { base: '8', md: 'clamp(2rem, 5vw, 5rem)' },
        })}
      >
        <p className={css({ fontFamily: 'body', color: 'textMuted', fontSize: 'md' })}>
          Project not found.
        </p>
      </Box>
    )
  }

  const link = project.liveUrl || project.externalUrl || project.githubUrl

  return (
    <Box
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: { base: '8', md: 'clamp(2rem, 5vw, 5rem)' },
        maxWidth: '72ch',
      })}
    >
      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '6',
        })}
      >
        {project.type} · {project.year}
      </p>

      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          lineHeight: 'snug',
          letterSpacing: 'tight',
          color: 'text',
          margin: '0 0 1.5rem',
        })}
      >
        {project.title}
      </h1>

      {project.problem && (
        <p
          className={css({
            fontFamily: 'body',
            fontSize: 'lg',
            lineHeight: 'loose',
            color: 'textSecondary',
            marginBottom: '4',
          })}
        >
          {project.problem}
        </p>
      )}

      {project.approach && (
        <p
          className={css({
            fontFamily: 'body',
            fontSize: 'sm',
            lineHeight: 'loose',
            color: 'textMuted',
            marginBottom: '2',
          })}
        >
          {project.approach}
        </p>
      )}

      {project.outcome && (
        <p
          className={css({
            fontFamily: 'body',
            fontSize: 'sm',
            lineHeight: 'loose',
            color: 'textMuted',
            marginBottom: '6',
          })}
        >
          {project.outcome}
        </p>
      )}

      {link && (
        <a
          href={link}
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'sm',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            textShadow: '0 0 40px {colors.accentGlow}',
            marginTop: '4',
            display: 'inline-block',
          })}
        >
          View Live →
        </a>
      )}
    </Box>
  )
}