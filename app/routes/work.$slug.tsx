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
      <Box
        as="main"
        className={css({
          paddingX: { base: '6', md: '12', lg: '24' },
          paddingY: '20',
          fontFamily: 'body',
          color: 'textSecondary',
        })}
      >
        Project not found.
      </Box>
    )
  }

  return (
    <Box
      as="main"
      className={css({
        paddingX: { base: '6', md: '12', lg: '24' },
        paddingY: { base: '10', md: '14', lg: '20' },
      })}
    >
      <Box
        className={css({
          fontFamily: 'body',
          fontSize: 'xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          marginBottom: '4',
        })}
      >
        {project.type} · {project.year}
      </Box>

      <h1
        className={css({
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: 'clamp(32px, 5.5vw, 80px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          marginBottom: '8',
        })}
      >
        {project.title}
      </h1>

      {project.problem && (
        <p
          className={css({
            fontFamily: 'heading',
            fontWeight: 'semibold',
            fontSize: { base: 'lg', md: 'xl' },
            lineHeight: 'snug',
            color: 'accentGlow',
            maxWidth: '60ch',
            marginBottom: '10',
          })}
        >
          {project.problem}
        </p>
      )}

      {(project.liveUrl || project.externalUrl) && (
        <a
          href={project.liveUrl ?? project.externalUrl}
          className={css({
            display: 'inline-block',
            border: '1px solid',
            borderColor: 'border.accent',
            borderRadius: '0',
            padding: '3',
            fontFamily: 'body',
            fontSize: 'xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '12',
            _hover: { color: 'accentGlow', borderColor: 'accentGlow' },
          })}
        >
          Visit live site ↗
        </a>
      )}

      <Box className={css({ maxWidth: '65ch', color: 'textSecondary', fontFamily: 'body', fontSize: 'md', lineHeight: 'normal' })}>
        {project.approach && (
          <Box className={css({ marginBottom: '6' })}>
            <Box className={css({ color: 'text', fontWeight: 'semibold', marginBottom: '1' })}>Approach</Box>
            {project.approach}
          </Box>
        )}
        {project.outcome && (
          <Box className={css({ marginBottom: '6' })}>
            <Box className={css({ color: 'text', fontWeight: 'semibold', marginBottom: '1' })}>Outcome</Box>
            {project.outcome}
          </Box>
        )}
      </Box>

      {project.stack && project.stack.length > 0 && (
        <Flex
          wrap="wrap"
          gap="4"
          className={css({
            marginTop: '10',
            paddingTop: '4',
            borderTop: '1px solid',
            borderColor: 'border',
            fontFamily: 'body',
            fontSize: '2xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
          })}
        >
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </Flex>
      )}
    </Box>
  )
}