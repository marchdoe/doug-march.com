import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box padding="4xl">
        <Box fontSize="lg" fontFamily="heading" fontWeight="bold" color="text">
          Project not found
        </Box>
        <Box marginTop="lg">
          <a href="/" className={css({ color: 'accent', fontSize: 'base', _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' } })}>
            Back to home
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* Header */}
      <Box marginBottom="3xl">
        <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="accent" letterSpacing="widest" textTransform="uppercase" marginBottom="md">
          {project.type} · {project.year}
        </Box>
        <Box
          fontSize="lg"
          fontFamily="heading"
          fontWeight="bold"
          color="text"
          lineHeight="snug"
          marginBottom="xl"
          className={css({
            '@media (max-width: 767px)': {
              fontSize: 'md',
            },
          })}
        >
          {project.title}
        </Box>
        {project.role && (
          <Box fontSize="base" fontFamily="body" color="textSecondary" marginBottom="sm">
            <Box as="span" fontWeight="medium" color="textMuted" fontSize="sm" letterSpacing="wider" textTransform="uppercase">Role: </Box>
            {project.role}
          </Box>
        )}
      </Box>

      {/* Problem */}
      {project.problem && (
        <Box marginBottom="3xl" paddingBottom="3xl" borderBottom="1px solid" borderColor="border">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase" marginBottom="md">
            Problem
          </Box>
          <Box fontSize="base" fontFamily="body" color="textSecondary" lineHeight="normal" maxWidth="600px">
            {project.problem}
          </Box>
        </Box>
      )}

      {/* Approach */}
      {project.approach && (
        <Box marginBottom="3xl" paddingBottom="3xl" borderBottom="1px solid" borderColor="border">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase" marginBottom="md">
            Approach
          </Box>
          <Box fontSize="base" fontFamily="body" color="textSecondary" lineHeight="normal" maxWidth="600px">
            {project.approach}
          </Box>
        </Box>
      )}

      {/* Outcome */}
      {project.outcome && (
        <Box marginBottom="3xl" paddingBottom="3xl" borderBottom="1px solid" borderColor="border">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase" marginBottom="md">
            Outcome
          </Box>
          <Box fontSize="base" fontFamily="body" color="textSecondary" lineHeight="normal" maxWidth="600px">
            {project.outcome}
          </Box>
        </Box>
      )}

      {/* Description (for lightweight projects) */}
      {project.description && !project.problem && (
        <Box marginBottom="3xl" paddingBottom="3xl" borderBottom="1px solid" borderColor="border">
          <Box fontSize="base" fontFamily="body" color="textSecondary" lineHeight="normal" maxWidth="600px">
            {project.description}
          </Box>
        </Box>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <Box marginBottom="3xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase" marginBottom="md">
            Stack
          </Box>
          <Flex gap="sm" flexWrap="wrap">
            {project.stack.map((tech) => (
              <Box
                key={tech}
                paddingX="md"
                paddingY="xs"
                fontSize="sm"
                fontFamily="mono"
                color="textSecondary"
                background="bg"
                borderRadius="xs"
                border="1px solid"
                borderColor="border"
              >
                {tech}
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* External Links */}
      <Flex gap="xl" flexWrap="wrap" marginBottom="3xl">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: 'sm',
              fontFamily: 'heading',
              fontWeight: 'medium',
              color: 'accent',
              letterSpacing: 'wider',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accentDark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
            })}
          >
            Visit Site →
          </a>
        )}
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: 'sm',
              fontFamily: 'heading',
              fontWeight: 'medium',
              color: 'accent',
              letterSpacing: 'wider',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accentDark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
            })}
          >
            Visit Site →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: 'sm',
              fontFamily: 'heading',
              fontWeight: 'medium',
              color: 'accent',
              letterSpacing: 'wider',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accentDark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
            })}
          >
            GitHub →
          </a>
        )}
      </Flex>

      {/* Back */}
      <Box paddingTop="xl" borderTop="1px solid" borderColor="border">
        <a href="/" className={css({
          fontSize: 'sm',
          fontFamily: 'heading',
          fontWeight: 'medium',
          color: 'textMuted',
          textDecoration: 'none',
          letterSpacing: 'wider',
          minHeight: '44px',
          display: 'inline-flex',
          alignItems: 'center',
          _hover: { color: 'accent' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
        })}>
          ← Back to work
        </a>
      </Box>
    </>
  )
}