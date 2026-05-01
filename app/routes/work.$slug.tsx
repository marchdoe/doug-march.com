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
      <Box maxW="1200px" mx="auto" px={{ base: '16', md: '32', lg: '48' }} py="64">
        <Box fontFamily="heading" fontSize="28px" fontWeight="700" color="{colors.neutral.800}" letterSpacing="tight">
          Project not found
        </Box>
      </Box>
    )
  }

  return (
    <Box maxW="1200px" mx="auto" px={{ base: '16', md: '32', lg: '48' }} width="100%">
      <Grid
        gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        columnGap="0"
      >
        {/* Main Content */}
        <Box
          py="40"
          pr={{ base: '0', lg: '32' }}
          borderRight={{ base: 'none', lg: '1px solid {colors.neutral.200}' }}
        >
          {/* Header */}
          <Box mb="40" pb="32" borderBottom="1px solid {colors.neutral.800}">
            <Flex gap="16" mb="16" align="center">
              <Box fontFamily="body" fontSize="12px" letterSpacing="wide" color="{colors.neutral.500}">
                {project.type}
              </Box>
              <Box fontFamily="mono" fontSize="12px" color="{colors.neutral.400}" fontVariantNumeric="tabular-nums">
                {project.year}
              </Box>
            </Flex>
            <Box
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: '28px', md: '37px', lg: '50px' }}
              lineHeight="tight"
              letterSpacing="tight"
              color="{colors.neutral.800}"
              mb="16"
            >
              {project.title}
            </Box>
            {project.role && (
              <Box fontFamily="body" fontSize="14px" letterSpacing="wide" color="{colors.neutral.500}">
                {project.role}
              </Box>
            )}
          </Box>

          {/* Problem */}
          {project.problem && (
            <Box mb="32">
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="12"
              >
                Problem
              </Box>
              <Box fontFamily="body" fontSize="16px" lineHeight="normal" color="{colors.neutral.600}" maxW="600px">
                {project.problem}
              </Box>
            </Box>
          )}

          {/* Approach */}
          {project.approach && (
            <Box mb="32">
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="12"
              >
                Approach
              </Box>
              <Box fontFamily="body" fontSize="16px" lineHeight="normal" color="{colors.neutral.600}" maxW="600px">
                {project.approach}
              </Box>
            </Box>
          )}

          {/* Outcome */}
          {project.outcome && (
            <Box mb="32">
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="12"
              >
                Outcome
              </Box>
              <Box fontFamily="body" fontSize="16px" lineHeight="normal" color="{colors.neutral.600}" maxW="600px">
                {project.outcome}
              </Box>
            </Box>
          )}

          {/* Description (for lightweight projects) */}
          {project.description && !project.problem && (
            <Box mb="32">
              <Box fontFamily="body" fontSize="16px" lineHeight="normal" color="{colors.neutral.600}" maxW="600px">
                {project.description}
              </Box>
            </Box>
          )}
        </Box>

        {/* Sidebar Meta */}
        <Box
          py="40"
          pl={{ base: '0', lg: '24' }}
          borderTop={{ base: '1px solid {colors.neutral.200}', lg: 'none' }}
        >
          {/* Links */}
          {(project.externalUrl || project.liveUrl || project.githubUrl) && (
            <Box mb="32">
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="16"
                pb="8"
                borderBottom="1px solid {colors.neutral.800}"
              >
                Links
              </Box>
              {(project.externalUrl || project.liveUrl) && (
                <a
                  href={project.externalUrl || project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    display: 'block',
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: '{colors.accent.DEFAULT}',
                    textDecoration: 'none',
                    py: '8',
                    minHeight: '44px',
                    _hover: { textDecoration: 'underline' },
                    _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
                  })}
                >
                  Visit site ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    display: 'block',
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: '{colors.accent.DEFAULT}',
                    textDecoration: 'none',
                    py: '8',
                    minHeight: '44px',
                    _hover: { textDecoration: 'underline' },
                    _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
                  })}
                >
                  GitHub ↗
                </a>
              )}
            </Box>
          )}

          {/* Stack */}
          {project.stack && project.stack.length > 0 && (
            <Box mb="32">
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="16"
                pb="8"
                borderBottom="1px solid {colors.neutral.800}"
              >
                Stack
              </Box>
              <Flex gap="8" flexWrap="wrap">
                {project.stack.map((tech) => (
                  <Box
                    key={tech}
                    fontFamily="mono"
                    fontSize="12px"
                    color="{colors.neutral.600}"
                    px="12"
                    py="4"
                    border="1px solid {colors.neutral.200}"
                    borderRadius="sm"
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            </Box>
          )}

          {/* Back link */}
          <a
            href="/"
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: 'wider',
              color: '{colors.neutral.500}',
              textDecoration: 'none',
              minHeight: '44px',
              _hover: { color: '{colors.neutral.800}' },
              _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
            })}
          >
            ← All work
          </a>
        </Box>
      </Grid>
    </Box>
  )
}