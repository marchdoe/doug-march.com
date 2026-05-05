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
      <Box py="16">
        <Box fontSize="lg" fontFamily="heading" fontWeight="bold" color="text">
          Project not found
        </Box>
        <Box mt="4">
          <a
            href="/"
            className={css({
              fontSize: 'sm',
              color: 'accent',
              textDecoration: 'underline',
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Back to home
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* Header */}
      <Box mb="12" pb="12" borderBottom="1px solid" borderColor="border">
        <Box
          fontSize="2xs"
          fontFamily="body"
          fontWeight="semibold"
          letterSpacing="wider"
          textTransform="uppercase"
          color="text-disabled"
          mb="4"
        >
          {project.type} · {project.year}
        </Box>
        <Box
          fontSize="clamp(28px, 4vw, 42px)"
          fontFamily="heading"
          fontWeight="bold"
          lineHeight="snug"
          letterSpacing="tight"
          color="text"
          mb="4"
        >
          {project.title}
        </Box>
        {project.role && (
          <Box fontSize="sm" fontFamily="body" color="text-secondary">
            {project.role}
          </Box>
        )}
      </Box>

      {/* Problem */}
      {project.problem && (
        <Box mb="12">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            mb="3"
          >
            Problem
          </Box>
          <Box fontSize="base" fontFamily="body" color="text-secondary" lineHeight="normal" maxW="600px">
            {project.problem}
          </Box>
        </Box>
      )}

      {/* Approach */}
      {project.approach && (
        <Box mb="12">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            mb="3"
          >
            Approach
          </Box>
          <Box fontSize="base" fontFamily="body" color="text-secondary" lineHeight="normal" maxW="600px">
            {project.approach}
          </Box>
        </Box>
      )}

      {/* Outcome */}
      {project.outcome && (
        <Box mb="12">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            mb="3"
          >
            Outcome
          </Box>
          <Box fontSize="base" fontFamily="body" color="text-secondary" lineHeight="normal" maxW="600px">
            {project.outcome}
          </Box>
        </Box>
      )}

      {/* Description (for experiments) */}
      {project.description && !project.problem && (
        <Box mb="12">
          <Box fontSize="base" fontFamily="body" color="text-secondary" lineHeight="normal" maxW="600px">
            {project.description}
          </Box>
        </Box>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <Box mb="12">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            mb="3"
          >
            Stack
          </Box>
          <Flex gap="2" flexWrap="wrap">
            {project.stack.map((tech) => (
              <Box
                key={tech}
                px="3"
                py="1"
                fontSize="xs"
                fontFamily="body"
                color="text-muted"
                background="bg"
                border="1px solid"
                borderColor="border"
                borderRadius="base"
              >
                {tech}
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {/* Links */}
      <Flex gap="6" mb="12">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: 'sm',
              fontFamily: 'body',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'underline',
              padding: '4px 0',
              _hover: { color: 'accent-dark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Live Site →
          </a>
        )}
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: 'sm',
              fontFamily: 'body',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'underline',
              padding: '4px 0',
              _hover: { color: 'accent-dark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Visit →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: 'sm',
              fontFamily: 'body',
              fontWeight: 'medium',
              color: 'accent',
              textDecoration: 'underline',
              padding: '4px 0',
              _hover: { color: 'accent-dark' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            GitHub →
          </a>
        )}
      </Flex>

      {/* Back */}
      <Box pt="6" borderTop="1px solid" borderColor="border">
        <a
          href="/"
          className={css({
            fontSize: 'sm',
            fontFamily: 'body',
            color: 'text-muted',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back to index
        </a>
      </Box>
    </>
  )
}