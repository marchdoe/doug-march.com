import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box padding={{ base: '6 4', md: '8 6vw' }}>
        <p className={css({ fontSize: 'md', color: 'textSecondary' })}>Project not found.</p>
      </Box>
    )
  }

  const titleWords = project.title.split(' ')

  return (
    <Box padding={{ base: '6 4', md: '8 6vw' }} display="flex" flexDirection="column" gap="6">
      <h1
        className={css({
          fontFamily: 'display',
          textTransform: 'uppercase',
          fontSize: 'clamp(40px, 9vw, 140px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          maxWidth: '20ch',
        })}
      >
        {titleWords.map((word, i) => (
          <span key={`${word}-${i}`} className={i === titleWords.length - 1 ? css({ color: 'accent' }) : undefined}>
            {i > 0 ? ' ' : ''}{word}
          </span>
        ))}
      </h1>

      <Flex gap="4" wrap="wrap" fontSize="xs" letterSpacing="widest" textTransform="uppercase" color="textMuted">
        {project.role && <span>{project.role}</span>}
        <span>{project.type}</span>
        <span>{project.year}</span>
      </Flex>

      {project.problem && (
        <p className={css({ fontSize: 'md', lineHeight: 'normal', color: 'textSecondary', maxWidth: '62ch' })}>
          {project.problem}
        </p>
      )}

      {project.approach && (
        <Box>
          <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>
            Approach
          </h2>
          <p className={css({ fontSize: 'base', lineHeight: 'normal', color: 'text', maxWidth: '62ch' })}>{project.approach}</p>
        </Box>
      )}

      {project.outcome && (
        <Box>
          <h2 className={css({ fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>
            Outcome
          </h2>
          <p className={css({ fontSize: 'base', lineHeight: 'normal', color: 'text', maxWidth: '62ch' })}>{project.outcome}</p>
        </Box>
      )}

      {project.stack && project.stack.length > 0 && (
        <Flex wrap="wrap" gap="2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={css({
                fontSize: '2xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'text',
                background: 'bgCard',
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'sm',
                padding: '2 3',
              })}
            >
              {tech}
            </span>
          ))}
        </Flex>
      )}

      <Flex gap="4" wrap="wrap">
        {(project.liveUrl || project.externalUrl) && (
          <a
            href={project.liveUrl ?? project.externalUrl}
            className={css({
              display: 'inline-block',
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'accent',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'sm',
              padding: '2 4',
              _hover: { borderColor: 'accent' },
            })}
          >
            Visit Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              display: 'inline-block',
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text',
              border: '1px solid',
              borderColor: 'border',
              borderRadius: 'sm',
              padding: '2 4',
              _hover: { borderColor: 'accent', color: 'accent' },
            })}
          >
            Source
          </a>
        )}
      </Flex>
    </Box>
  )
}