import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        className={css({
          fontFamily: 'space-grotesk',
          fontSize: '21px',
          color: 'text-heading',
          paddingTop: '32px',
        })}
      >
        Project not found.
      </Box>
    )
  }

  return (
    <>
      {/* Header */}
      <Box mb="48px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '16px',
          })}
        >
          {project.type} · {project.year}
        </Box>
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: 'clamp(28px, 4vw, 37px)',
            fontWeight: 'bold',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text-heading',
            marginBottom: '16px',
          })}
        >
          {project.title}
        </Box>
        {project.role && (
          <Box
            className={css({
              fontFamily: 'work-sans',
              fontSize: '16px',
              color: 'text-muted',
            })}
          >
            {project.role}
          </Box>
        )}
      </Box>

      {/* Content sections */}
      <VStack gap="48px" align="stretch">
        {project.problem && (
          <Box>
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '11px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '12px',
              })}
            >
              Problem
            </Box>
            <Box
              className={css({
                fontFamily: 'work-sans',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
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
                fontFamily: 'space-grotesk',
                fontSize: '11px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '12px',
              })}
            >
              Approach
            </Box>
            <Box
              className={css({
                fontFamily: 'work-sans',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
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
                fontFamily: 'space-grotesk',
                fontSize: '11px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '12px',
              })}
            >
              Outcome
            </Box>
            <Box
              className={css({
                fontFamily: 'work-sans',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
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
                fontFamily: 'work-sans',
                fontSize: '16px',
                lineHeight: 'normal',
                color: 'text-secondary',
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
                fontFamily: 'space-grotesk',
                fontSize: '11px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '12px',
              })}
            >
              Stack
            </Box>
            <Flex gap="8px" flexWrap="wrap">
              {project.stack.map((tech) => (
                <Box
                  key={tech}
                  className={css({
                    fontFamily: 'space-grotesk',
                    fontSize: '13px',
                    color: 'secondary',
                    background: 'rgba(126, 175, 196, 0.20)',
                    borderRadius: 'sm',
                    padding: '4px 10px',
                    letterSpacing: 'widest',
                    fontWeight: 'semibold',
                  })}
                >
                  {tech}
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </VStack>

      {/* External links */}
      <Flex gap="24px" mt="64px" pt="24px" borderTop="1px solid" borderColor="border">
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '14px',
              color: 'accent',
              textDecoration: 'none',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accent-dark' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
            })}
          >
            Visit Site →
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '14px',
              color: 'accent',
              textDecoration: 'none',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accent-dark' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
            })}
          >
            Live →
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '14px',
              color: 'accent',
              textDecoration: 'none',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              _hover: { color: 'accent-dark' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '2px',
              },
            })}
          >
            GitHub →
          </a>
        )}
        <a
          href="/"
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '14px',
            color: 'text-muted',
            textDecoration: 'none',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            _hover: { color: 'text-heading' },
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '2px',
            },
          })}
        >
          ← All Work
        </a>
      </Flex>
    </>
  )
}