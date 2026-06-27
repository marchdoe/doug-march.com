import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box padding="6vw" paddingTop="120px">
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            lineHeight: 'snug',
            color: 'text',
          })}
        >
          Not found.
        </h1>
      </Box>
    )
  }

  return (
    <Box padding="6vw" paddingTop={{ base: '80px', md: '120px' }}>
      {/* Header */}
      <Box marginBottom={{ base: '48px', md: '96px' }}>
        <Flex
          gap="16px"
          align="baseline"
          marginBottom="16px"
          wrap="wrap"
        >
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'normal',
              fontSize: '14px',
              color: 'textMuted',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
            })}
          >
            {project.type}
          </span>
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'normal',
              fontSize: '14px',
              color: 'textMuted',
              letterSpacing: 'wider',
            })}
          >
            {project.year}
          </span>
        </Flex>

        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '24px',
          })}
        >
          {project.title}
        </h1>

        {project.role && (
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: '16px',
              color: 'accent',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              marginBottom: '16px',
            })}
          >
            {project.role}
          </p>
        )}
      </Box>

      {/* Content sections */}
      <Box maxWidth="720px">
        {project.problem && (
          <Box marginBottom="48px">
            <h2
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
                paddingBottom: '12px',
              })}
            >
              PROBLEM
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.problem}
            </p>
          </Box>
        )}

        {project.approach && (
          <Box marginBottom="48px">
            <h2
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
                paddingBottom: '12px',
              })}
            >
              APPROACH
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.approach}
            </p>
          </Box>
        )}

        {project.outcome && (
          <Box marginBottom="48px">
            <h2
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
                paddingBottom: '12px',
              })}
            >
              OUTCOME
            </h2>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.outcome}
            </p>
          </Box>
        )}

        {project.description && (
          <Box marginBottom="48px">
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'textSecondary',
                maxWidth: '65ch',
              })}
            >
              {project.description}
            </p>
          </Box>
        )}

        {project.stack && project.stack.length > 0 && (
          <Box marginBottom="48px">
            <h2
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                marginBottom: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
                paddingBottom: '12px',
              })}
            >
              STACK
            </h2>
            <Flex wrap="wrap" gap="8px">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'normal',
                    fontSize: '14px',
                    color: 'textSecondary',
                    padding: '8px 16px',
                    border: '1px solid',
                    borderColor: 'border',
                    letterSpacing: 'wide',
                  })}
                >
                  {tech}
                </span>
              ))}
            </Flex>
          </Box>
        )}

        {/* Links */}
        <Flex gap="24px" wrap="wrap" marginTop="48px">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '14px',
                color: 'accent',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                padding: '12px 24px',
                border: '1px solid',
                borderColor: 'accent',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                _hover: { color: 'accentLight', borderColor: 'accentLight', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Visit Site ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '14px',
                color: 'accent',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                padding: '12px 24px',
                border: '1px solid',
                borderColor: 'accent',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                _hover: { color: 'accentLight', borderColor: 'accentLight', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '14px',
                color: 'accent',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                padding: '12px 24px',
                border: '1px solid',
                borderColor: 'accent',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                _hover: { color: 'accentLight', borderColor: 'accentLight', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              GitHub ↗
            </a>
          )}
        </Flex>
      </Box>

      {/* Footer */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="16px"
        marginTop="96px"
      >
        <Flex justify="space-between" align="center">
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              color: 'textMuted',
              _hover: { color: 'accentLight', textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            })}
          >
            ← Back
          </a>
          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              color: 'textMuted',
              letterSpacing: 'wider',
              _hover: { color: 'accentLight', textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}