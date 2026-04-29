import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box p="3xl" maxW="1200px" mx="auto">
        <Box fontSize="21px" fontFamily="heading" color="text">
          Project not found.
        </Box>
        <Box mt="md">
          <a
            href="/"
            className={css({
              fontSize: '14px',
              fontFamily: 'body',
              color: 'accent',
              padding: 'sm',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accent-light' },
              _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
            })}
          >
            ← Back to work
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <Box maxW="1200px" mx="auto" w="100%">
      <Grid
        className={css({
          gridTemplateColumns: { base: '1fr', lg: '2fr 1fr' },
        })}
      >
        {/* Main content */}
        <Box
          className={css({
            borderRight: { base: 'none', lg: '1px solid' },
            borderColor: 'border',
            p: { base: 'lg', md: '2xl', lg: '3xl 2xl' },
          })}
        >
          {/* Breadcrumb */}
          <Flex gap="sm" align="center" mb="3xl">
            <a
              href="/"
              className={css({
                fontSize: '12px',
                fontFamily: 'body',
                color: 'text-muted',
                letterSpacing: 'wider',
                textDecoration: 'none',
                padding: 'sm',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: 'accent-light' },
                _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
              })}
            >
              Work
            </a>
            <Box fontSize="12px" color="text-muted">/</Box>
            <Box fontSize="12px" fontFamily="body" color="text-secondary" letterSpacing="wider">
              {project.title}
            </Box>
          </Flex>

          {/* Title block */}
          <Box borderTop="2px solid" borderColor="accent" pt="lg" mb="3xl">
            <Box
              fontSize="clamp(28px, 5vw, 50px)"
              fontFamily="heading"
              fontWeight="semibold"
              lineHeight="tight"
              letterSpacing="tight"
              color="text"
              mb="md"
            >
              {project.title}
            </Box>
            <Flex gap="lg" flexWrap="wrap">
              <Box fontSize="12px" fontFamily="body" color="text-muted" letterSpacing="widest" textTransform="uppercase">
                {project.type}
              </Box>
              <Box fontSize="12px" fontFamily="mono" color="text-muted" letterSpacing="wider">
                {project.year}
              </Box>
              {project.role && (
                <Box fontSize="12px" fontFamily="body" color="text-muted" letterSpacing="wider">
                  {project.role}
                </Box>
              )}
            </Flex>
          </Box>

          {/* Problem */}
          {project.problem && (
            <Box mb="xl">
              <Box
                fontSize="11px"
                letterSpacing="widest"
                color="text-muted"
                fontFamily="body"
                textTransform="uppercase"
                mb="sm"
              >
                Problem
              </Box>
              <Box
                fontSize="16px"
                fontFamily="body"
                lineHeight="normal"
                color="text-secondary"
                maxW="600px"
              >
                {project.problem}
              </Box>
            </Box>
          )}

          {/* Approach */}
          {project.approach && (
            <Box mb="xl">
              <Box
                fontSize="11px"
                letterSpacing="widest"
                color="text-muted"
                fontFamily="body"
                textTransform="uppercase"
                mb="sm"
              >
                Approach
              </Box>
              <Box
                fontSize="16px"
                fontFamily="body"
                lineHeight="normal"
                color="text-secondary"
                maxW="600px"
              >
                {project.approach}
              </Box>
            </Box>
          )}

          {/* Outcome */}
          {project.outcome && (
            <Box mb="xl">
              <Box
                fontSize="11px"
                letterSpacing="widest"
                color="text-muted"
                fontFamily="body"
                textTransform="uppercase"
                mb="sm"
              >
                Outcome
              </Box>
              <Box
                fontSize="16px"
                fontFamily="body"
                lineHeight="normal"
                color="text-secondary"
                maxW="600px"
              >
                {project.outcome}
              </Box>
            </Box>
          )}

          {/* Description for lightweight projects */}
          {project.description && (
            <Box mb="xl">
              <Box
                fontSize="16px"
                fontFamily="body"
                lineHeight="normal"
                color="text-secondary"
                maxW="600px"
              >
                {project.description}
              </Box>
            </Box>
          )}
        </Box>

        {/* Sidebar metadata */}
        <Box
          className={css({
            p: { base: 'lg', md: '2xl', lg: '3xl lg' },
          })}
        >
          <Box pb="md" mb="xl" borderBottom="1px solid" borderColor="border">
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              Details
            </Box>
          </Box>

          {/* Stack */}
          {project.stack && project.stack.length > 0 && (
            <Box mb="xl">
              <Box
                fontSize="9px"
                letterSpacing="widest"
                color="text-muted"
                fontFamily="body"
                textTransform="uppercase"
                mb="sm"
              >
                Stack
              </Box>
              <Flex gap="sm" flexWrap="wrap">
                {project.stack.map((tech) => (
                  <Box
                    key={tech}
                    px="sm"
                    py="xs"
                    fontSize="12px"
                    fontFamily="mono"
                    color="text-secondary"
                    border="1px solid"
                    borderColor="border-subtle"
                    borderRadius="2px"
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            </Box>
          )}

          {/* Links */}
          <Box>
            {(project.externalUrl || project.liveUrl) && (
              <Box mb="md">
                <Box
                  fontSize="9px"
                  letterSpacing="widest"
                  color="text-muted"
                  fontFamily="body"
                  textTransform="uppercase"
                  mb="sm"
                >
                  Links
                </Box>
                {project.liveUrl && (
                  <Box mb="sm">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css({
                        fontSize: '14px',
                        fontFamily: 'body',
                        color: 'accent',
                        padding: 'sm',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        _hover: { color: 'accent-light' },
                        _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
                      })}
                    >
                      Live Site →
                    </a>
                  </Box>
                )}
                {project.externalUrl && (
                  <Box mb="sm">
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css({
                        fontSize: '14px',
                        fontFamily: 'body',
                        color: 'accent',
                        padding: 'sm',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        _hover: { color: 'accent-light' },
                        _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
                      })}
                    >
                      View Project →
                    </a>
                  </Box>
                )}
                {project.githubUrl && (
                  <Box>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={css({
                        fontSize: '14px',
                        fontFamily: 'body',
                        color: 'accent',
                        padding: 'sm',
                        minHeight: '44px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        _hover: { color: 'accent-light' },
                        _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
                      })}
                    >
                      GitHub →
                    </a>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Back link */}
          <Box mt="3xl" pt="md" borderTop="1px solid" borderColor="border">
            <a
              href="/"
              className={css({
                fontSize: '12px',
                fontFamily: 'body',
                color: 'text-muted',
                letterSpacing: 'wider',
                textDecoration: 'none',
                padding: 'sm',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: 'accent-light' },
                _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
              })}
            >
              ← All Work
            </a>
          </Box>
        </Box>
      </Grid>

      {/* Footer */}
      <Box borderTop="1px solid" borderColor="border" px={{ base: 'lg', md: '2xl' }} py="lg">
        <Flex
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          flexDirection={{ base: 'column', md: 'row' }}
          gap="md"
        >
          <Flex gap="lg" align="center">
            <Box fontSize="12px" fontFamily="body" color="text-muted" letterSpacing="wider">
              © 2026
            </Box>
            <a
              href="/archive"
              className={css({
                fontSize: '12px',
                fontFamily: 'body',
                color: 'text-muted',
                letterSpacing: 'wider',
                textDecoration: 'none',
                padding: 'sm',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: 'accent-light' },
                _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
              })}
            >
              Archive
            </a>
          </Flex>
          <Box textAlign={{ base: 'left', md: 'right' }}>
            <Box fontSize="9px" fontFamily="body" letterSpacing="wider" color="text-muted">
              DET 2 · MIN 5
            </Box>
            <Box fontSize="9px" fontFamily="heading" fontStyle="italic" color="#76718A" mt="xs">
              noted.
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}