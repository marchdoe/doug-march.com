import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <Box fontFamily="body" maxWidth="1200px" mx="auto" px="12" py="16">
        <Box
          fontSize="xs"
          fontFamily="body"
          fontWeight="500"
          color="textMuted"
          letterSpacing="wider"
          textTransform="uppercase"
          mb="4"
        >
          404
        </Box>
        <Box
          fontSize="lg"
          fontFamily="heading"
          fontWeight="700"
          color="text"
          lineHeight="tight"
          mb="6"
        >
          Project not found.
        </Box>
        <a href="/" className={css({ textDecoration: 'none' })}>
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="500"
            color="textMuted"
            letterSpacing="wider"
            textTransform="uppercase"
            _hover={{ color: 'accent' }}
          >
            ← All Work
          </Box>
        </a>
      </Box>
    )
  }

  return (
    <Box fontFamily="body">

      {/* ── PROJECT HEADER BAND ──────────────────────────────── */}
      <Box
        width="100%"
        background="bgMasthead"
        py="10"
        px="12"
        borderBottom="1px solid"
        style={{ borderBottomColor: '#2A2720' }}
      >
        <Box maxWidth="1200px" mx="auto">
          {/* Back link */}
          <a href="/" className={css({ textDecoration: 'none' })}>
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textOnDarkDim"
              letterSpacing="wider"
              textTransform="uppercase"
              mb="6"
              display="block"
              _hover={{ color: 'accentLight' }}
            >
              ← All Work
            </Box>
          </a>

          {/* Type + year */}
          <Flex gap="3" align="center" mb="3">
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textOnDarkMuted"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {project.type}
            </Box>
            <Box fontSize="xs" color="textOnDarkDim">·</Box>
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="400"
              color="textOnDarkDim"
              fontVariantNumeric="tabular-nums"
            >
              {project.year}
            </Box>
          </Flex>

          {/* Title */}
          <Box
            fontSize="xl"
            fontFamily="heading"
            fontWeight="700"
            color="textOnDark"
            lineHeight="tight"
            letterSpacing="tight"
            mb="4"
          >
            {project.title}
          </Box>

          {/* Role */}
          {project.role && (
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textOnDarkMuted"
              letterSpacing="wide"
            >
              {project.role}
            </Box>
          )}
        </Box>
      </Box>

      {/* ── PROJECT BODY ─────────────────────────────────────── */}
      <Box maxWidth="1200px" mx="auto" width="100%">
        <Box
          display="grid"
          gridTemplateColumns="2fr 1fr"
        >
          {/* Main content column */}
          <Box
            py="10"
            px="7"
            paddingLeft="12"
            borderRight="1px solid"
            borderColor="border"
          >

            {/* Problem */}
            {project.problem && (
              <Box mb="8">
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="500"
                  color="textMuted"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  mb="3"
                >
                  Problem
                </Box>
                <Box
                  fontSize="md"
                  fontFamily="heading"
                  fontWeight="400"
                  color="text"
                  lineHeight="normal"
                  maxWidth="520px"
                >
                  {project.problem}
                </Box>
              </Box>
            )}

            {/* Approach */}
            {project.approach && (
              <Box mb="8" pt="6" borderTop="1px solid" borderColor="border">
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="500"
                  color="textMuted"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  mb="3"
                >
                  Approach
                </Box>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  fontWeight="400"
                  color="textSecondary"
                  lineHeight="normal"
                  maxWidth="520px"
                >
                  {project.approach}
                </Box>
              </Box>
            )}

            {/* Outcome */}
            {project.outcome && (
              <Box mb="8" pt="6" borderTop="1px solid" borderColor="border">
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="500"
                  color="textMuted"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  mb="3"
                >
                  Outcome
                </Box>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  fontWeight="400"
                  color="textSecondary"
                  lineHeight="normal"
                  maxWidth="520px"
                >
                  {project.outcome}
                </Box>
              </Box>
            )}

            {/* Description fallback */}
            {!project.problem && !project.approach && !project.outcome && project.description && (
              <Box mb="8">
                <Box
                  fontSize="base"
                  fontFamily="body"
                  fontWeight="400"
                  color="textSecondary"
                  lineHeight="normal"
                  maxWidth="520px"
                >
                  {project.description}
                </Box>
              </Box>
            )}

            {/* Stack */}
            {project.stack && project.stack.length > 0 && (
              <Box pt="6" borderTop="1px solid" borderColor="border">
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="500"
                  color="textMuted"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  mb="3"
                >
                  Stack
                </Box>
                <Box display="flex" flexWrap="wrap" gap="2">
                  {project.stack.map(tech => (
                    <Box
                      key={tech}
                      px="3"
                      py="1"
                      fontSize="xs"
                      fontFamily="body"
                      fontWeight="400"
                      color="textSecondary"
                      background="bgCard"
                      border="1px solid"
                      borderColor="border"
                      borderRadius="none"
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Sidebar column */}
          <Box py="10" px="8">

            {/* External links */}
            <Box mb="8">
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="500"
                color="textMuted"
                letterSpacing="wider"
                textTransform="uppercase"
                mb="4"
              >
                Links
              </Box>

              <VStack gap="3" align="stretch">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={css({ textDecoration: 'none' })}>
                    <Box
                      fontSize="sm"
                      fontFamily="body"
                      fontWeight="400"
                      color="textSecondary"
                      py="3"
                      borderBottom="1px solid"
                      borderColor="border"
                      _hover={{ color: 'accent' }}
                    >
                      Live Site →
                    </Box>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={css({ textDecoration: 'none' })}>
                    <Box
                      fontSize="sm"
                      fontFamily="body"
                      fontWeight="400"
                      color="textSecondary"
                      py="3"
                      borderBottom="1px solid"
                      borderColor="border"
                      _hover={{ color: 'accent' }}
                    >
                      GitHub →
                    </Box>
                  </a>
                )}
                {project.externalUrl && (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={css({ textDecoration: 'none' })}>
                    <Box
                      fontSize="sm"
                      fontFamily="body"
                      fontWeight="400"
                      color="textSecondary"
                      py="3"
                      borderBottom="1px solid"
                      borderColor="border"
                      _hover={{ color: 'accent' }}
                    >
                      View Project →
                    </Box>
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && !project.externalUrl && (
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    fontWeight="300"
                    color="textMuted"
                    fontStyle="italic"
                  >
                    No public links.
                  </Box>
                )}
              </VStack>
            </Box>

            {/* Meta */}
            <Box>
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="500"
                color="textMuted"
                letterSpacing="wider"
                textTransform="uppercase"
                mb="4"
              >
                Project Info
              </Box>

              <VStack gap="0" align="stretch">
                <Flex justify="space-between" py="3" borderBottom="1px solid" borderColor="border">
                  <Box fontSize="xs" fontFamily="body" color="textMuted" letterSpacing="wide" textTransform="uppercase">Year</Box>
                  <Box fontSize="xs" fontFamily="body" color="textSecondary" fontVariantNumeric="tabular-nums">{project.year}</Box>
                </Flex>
                <Flex justify="space-between" py="3" borderBottom="1px solid" borderColor="border">
                  <Box fontSize="xs" fontFamily="body" color="textMuted" letterSpacing="wide" textTransform="uppercase">Type</Box>
                  <Box fontSize="xs" fontFamily="body" color="textSecondary">{project.type}</Box>
                </Flex>
                {project.role && (
                  <Flex justify="space-between" align="flex-start" py="3" borderBottom="1px solid" borderColor="border" gap="4">
                    <Box fontSize="xs" fontFamily="body" color="textMuted" letterSpacing="wide" textTransform="uppercase" flexShrink="0">Role</Box>
                    <Box fontSize="xs" fontFamily="body" color="textSecondary" textAlign="right">{project.role}</Box>
                  </Flex>
                )}
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <Box
        width="100%"
        background="bgMasthead"
        borderTop="1px solid"
        style={{ borderTopColor: '#2A2720' }}
        py="6"
        px="12"
      >
        <Flex maxWidth="1200px" mx="auto" justify="space-between" align="center">
          <Box fontSize="xs" fontFamily="body" fontWeight="400" color="textOnDarkMuted">
            Doug March · 2026
          </Box>
          <Flex gap="6">
            <a href="/" className={css({ textDecoration: 'none' })}>
              <Box fontSize="xs" fontFamily="body" fontWeight="500" color="textOnDarkMuted" letterSpacing="wider" textTransform="uppercase" _hover={{ color: 'accentLight' }}>
                Work
              </Box>
            </a>
            <a href="/about" className={css({ textDecoration: 'none' })}>
              <Box fontSize="xs" fontFamily="body" fontWeight="500" color="textOnDarkMuted" letterSpacing="wider" textTransform="uppercase" _hover={{ color: 'accentLight' }}>
                About
              </Box>
            </a>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}