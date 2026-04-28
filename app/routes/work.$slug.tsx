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
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={css({ minHeight: 'calc(80vh - 56px)', padding: '64px 32px' })}
      >
        <Box>
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'semibold',
              fontSize: 'clamp(1.5rem, 3vw, 2.313rem)',
              color: '{colors.neutral.700}',
              marginBottom: '16px',
            })}
          >
            Project not found
          </Box>
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '1rem',
              color: '{colors.celadon.default}',
              textDecoration: 'none',
              _hover: { color: '{colors.celadon.dark}' },
              _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
            })}
          >
            ← Back home
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      {/* Hero */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        className={css({
          minHeight: 'calc(60vh - 56px)',
          padding: '96px 32px',
          backgroundColor: '#FAFAF6',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
          },
        })}
      >
        <Box maxWidth="760px" width="100%">
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: '{colors.neutral.400}',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              marginBottom: '32px',
              _hover: { color: '{colors.celadon.default}' },
              _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
            })}
          >
            ← BACK
          </a>
          <Flex gap="16" alignItems="baseline" marginBottom="24px" flexWrap="wrap">
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '{colors.neutral.400}',
                textTransform: 'uppercase',
              })}
            >
              {project.type}
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '{colors.neutral.400}',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {project.year}
            </Box>
          </Flex>
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'semibold',
              fontSize: 'clamp(1.75rem, 4vw, 3.125rem)',
              lineHeight: '1.10',
              color: '{colors.neutral.700}',
              marginBottom: '24px',
            })}
          >
            {project.title}
          </Box>
          {project.role && (
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '0.875rem',
                color: '{colors.neutral.500}',
                marginBottom: '8px',
              })}
            >
              Role: {project.role}
            </Box>
          )}
        </Box>
      </Box>

      {/* Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '96px 32px',
          backgroundColor: '{colors.neutral.50}',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
          },
        })}
      >
        <Box maxWidth="760px" width="100%">
          <VStack gap="48" width="100%" alignItems="stretch">
            {project.problem && (
              <Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: '{colors.neutral.400}',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  })}
                >
                  Problem
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '1rem',
                    lineHeight: '1.60',
                    color: '{colors.neutral.600}',
                    maxWidth: '600px',
                  })}
                >
                  {project.problem}
                </Box>
              </Box>
            )}

            {project.approach && (
              <Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: '{colors.neutral.400}',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  })}
                >
                  Approach
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '1rem',
                    lineHeight: '1.60',
                    color: '{colors.neutral.600}',
                    maxWidth: '600px',
                  })}
                >
                  {project.approach}
                </Box>
              </Box>
            )}

            {project.outcome && (
              <Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: '{colors.neutral.400}',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  })}
                >
                  Outcome
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '1rem',
                    lineHeight: '1.60',
                    color: '{colors.neutral.600}',
                    maxWidth: '600px',
                  })}
                >
                  {project.outcome}
                </Box>
              </Box>
            )}

            {project.description && (
              <Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '1rem',
                    lineHeight: '1.60',
                    color: '{colors.neutral.600}',
                    maxWidth: '600px',
                  })}
                >
                  {project.description}
                </Box>
              </Box>
            )}

            {project.stack && project.stack.length > 0 && (
              <Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    color: '{colors.neutral.400}',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  })}
                >
                  Stack
                </Box>
                <Flex flexWrap="wrap" gap="8">
                  {project.stack.map((tech) => (
                    <Box
                      key={tech}
                      className={css({
                        fontFamily: 'body',
                        fontSize: '0.8125rem',
                        color: '{colors.neutral.500}',
                        backgroundColor: 'rgba(90, 173, 165, 0.08)',
                        padding: '8px 16px',
                        borderRadius: 'xs',
                        border: '1px solid {colors.neutral.200}',
                      })}
                    >
                      {tech}
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}

            {(project.externalUrl || project.liveUrl || project.githubUrl) && (
              <Flex gap="16" flexWrap="wrap">
                {(project.externalUrl || project.liveUrl) && (
                  <a
                    href={project.externalUrl || project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontFamily: 'body',
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                      color: '#FAFAF6',
                      backgroundColor: '{colors.celadon.default}',
                      padding: '12px 24px',
                      borderRadius: '3px',
                      minHeight: '44px',
                      textDecoration: 'none',
                      transition: 'background-color 200ms ease',
                      _hover: { backgroundColor: '{colors.celadon.dark}' },
                      _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
                    })}
                  >
                    Visit Site ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontFamily: 'body',
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                      color: '{colors.celadon.default}',
                      padding: '12px 24px',
                      border: '1px solid {colors.celadon.default}',
                      borderRadius: '3px',
                      minHeight: '44px',
                      textDecoration: 'none',
                      transition: 'background-color 200ms ease, color 200ms ease',
                      _hover: { backgroundColor: '{colors.celadon.default}', color: '#FAFAF6' },
                      _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
                    })}
                  >
                    GitHub ↗
                  </a>
                )}
              </Flex>
            )}
          </VStack>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '64px 48px',
          backgroundColor: '{colors.neutral.900}',
          '@media (max-width: 767px)': {
            padding: '48px 24px',
          },
        })}
      >
        <Flex
          maxWidth="760px"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="16"
        >
          <Box className={css({ fontFamily: 'body', fontSize: '0.75rem', letterSpacing: '0.08em', color: '{colors.neutral.400}' })}>
            © 2026 Doug March
          </Box>
          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: '{colors.neutral.400}',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _hover: { color: '{colors.neutral.200}' },
              _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}