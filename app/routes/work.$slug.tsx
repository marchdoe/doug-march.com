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
      <Box
        padding={{ base: '32px 24px', md: '64px 56px' }}
        maxWidth="720px"
      >
        <Box fontSize="21px" fontFamily="heading" fontWeight="semibold" color="text">
          Project not found
        </Box>
        <Box marginTop="16px">
          <a
            href="/"
            className={css({
              color: 'accent',
              fontSize: '16px',
              _hover: { textDecoration: 'underline' },
              _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
            })}
          >
            ← Back to work
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      padding={{ base: '32px 24px 64px', md: '64px 56px 96px 56px' }}
      maxWidth="720px"
    >
      {/* Header */}
      <Box marginBottom="48px">
        <a
          href="/"
          className={css({
            fontSize: '14px',
            fontFamily: 'body',
            color: 'text-muted',
            textDecoration: 'none',
            _hover: { color: 'accent', textDecoration: 'underline' },
            _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '44px',
          })}
        >
          ← Back
        </a>
      </Box>

      <Box marginBottom="48px">
        <Flex gap="16px" align="baseline" marginBottom="16px">
          <Box fontSize="12px" fontFamily="heading" color="text-muted" letterSpacing="wide">
            {project.type}
          </Box>
          <Box
            fontSize="12px"
            fontFamily="mono"
            color="text-muted"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {project.year}
          </Box>
        </Flex>
        <Box
          fontSize="clamp(28px, 3vw, 37px)"
          fontFamily="heading"
          fontWeight="semibold"
          color="text"
          lineHeight="snug"
          marginBottom="24px"
        >
          {project.title}
        </Box>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontSize: '14px',
              fontFamily: 'body',
              color: 'accent',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
              _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
            })}
          >
            Visit site ↗
          </a>
        )}
      </Box>

      {/* Details */}
      <VStack gap="48px" align="stretch">
        {project.role && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Role
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text" lineHeight="normal">
              {project.role}
            </Box>
          </Box>
        )}

        {project.problem && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Problem
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="normal" maxWidth="560px">
              {project.problem}
            </Box>
          </Box>
        )}

        {project.approach && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Approach
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="normal" maxWidth="560px">
              {project.approach}
            </Box>
          </Box>
        )}

        {project.outcome && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Outcome
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="normal" maxWidth="560px">
              {project.outcome}
            </Box>
          </Box>
        )}

        {project.description && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Description
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="normal" maxWidth="560px">
              {project.description}
            </Box>
          </Box>
        )}

        {project.stack && project.stack.length > 0 && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Stack
            </Box>
            <Flex gap="8px" flexWrap="wrap">
              {project.stack.map((tech) => (
                <Box
                  key={tech}
                  paddingX="12px"
                  paddingY="6px"
                  fontSize="14px"
                  fontFamily="body"
                  color="text-secondary"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="sm"
                >
                  {tech}
                </Box>
              ))}
            </Flex>
          </Box>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <Box>
            <Box
              fontSize="10px"
              fontFamily="heading"
              fontWeight="medium"
              letterSpacing="widest"
              textTransform="uppercase"
              color="text-muted"
              borderTop="1px solid"
              borderColor="border-muted"
              paddingTop="20px"
              marginBottom="16px"
            >
              Links
            </Box>
            <Flex gap="24px">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontSize: '14px',
                    fontFamily: 'body',
                    color: 'accent',
                    textDecoration: 'none',
                    _hover: { textDecoration: 'underline' },
                    _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  })}
                >
                  Live site ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontSize: '14px',
                    fontFamily: 'body',
                    color: 'accent',
                    textDecoration: 'none',
                    _hover: { textDecoration: 'underline' },
                    _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  })}
                >
                  GitHub ↗
                </a>
              )}
            </Flex>
          </Box>
        )}
      </VStack>

      {/* Footer */}
      <Box
        marginTop="96px"
        borderTop="1px solid"
        borderColor="border"
        paddingTop="24px"
        fontSize="12px"
        fontFamily="body"
        color="text-muted"
      >
        <Flex justify="space-between" align="center">
          <a
            href="/"
            className={css({
              color: 'text-muted',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline', color: 'accent' },
              _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            })}
          >
            ← All work
          </a>
          <a
            href="/archive"
            className={css({
              color: 'text-muted',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline', color: 'accent' },
              _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}