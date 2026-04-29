import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Box maxW="1200px" mx="auto" w="100%">
      {/* Three-column broadsheet grid */}
      <Grid
        className={css({
          gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '2fr 1.1fr 0.9fr' },
          minHeight: { base: 'auto', lg: 'calc(100vh - 64px)' },
        })}
      >
        {/* PRIMARY COLUMN */}
        <Box
          className={css({
            borderRight: { base: 'none', lg: '1px solid' },
            borderBottom: { base: '1px solid', lg: 'none' },
            borderColor: 'border',
            p: { base: 'lg', md: '2xl', lg: '3xl 2xl' },
          })}
        >
          {/* Column label */}
          <Box
            pb="md"
            mb="xl"
            borderBottom="1px solid"
            borderColor="border"
          >
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              Creative Direction
            </Box>
          </Box>

          {/* Featured project */}
          {featuredProject && (
            <Box
              className={css({
                pl: { base: '0', lg: '11%' },
                maxW: { base: '100%', lg: '78%' },
                minHeight: { base: 'auto', lg: '45vh' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              })}
            >
              <Box
                borderTop="2px solid"
                borderColor="accent"
                pt="lg"
              >
                <Box
                  fontSize="clamp(28px, 4vw, 37px)"
                  fontFamily="heading"
                  fontWeight="semibold"
                  lineHeight="tight"
                  letterSpacing="tight"
                  color="text"
                  mb="md"
                >
                  {featuredProject.title}
                </Box>
                <Box
                  fontSize="16px"
                  fontFamily="body"
                  lineHeight="normal"
                  color="text-secondary"
                  mb="lg"
                  maxW="600px"
                >
                  {featuredProject.problem}
                </Box>
                {featuredProject.externalUrl && (
                  <a
                    href={featuredProject.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      fontSize: '12px',
                      fontFamily: 'body',
                      letterSpacing: 'wider',
                      color: 'accent',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'sm',
                      padding: 'sm',
                      minHeight: '44px',
                      _hover: {
                        color: 'accent-light',
                      },
                      _focus: {
                        outline: '1.5px solid',
                        outlineColor: 'accent',
                        outlineOffset: '3px',
                      },
                    })}
                  >
                    View Project →
                  </a>
                )}
              </Box>
            </Box>
          )}

          {/* Identity statement below featured */}
          <Box mt="3xl" pt="xl" borderTop="1px solid" borderColor="border">
            <Box
              fontSize="clamp(37px, 6vw, 50px)"
              fontFamily="heading"
              fontWeight="semibold"
              lineHeight="tight"
              letterSpacing="tight"
              color="text"
              mb="sm"
            >
              {identity.name}
            </Box>
            <Box
              fontSize="16px"
              fontFamily="body"
              color="text-secondary"
              letterSpacing="wide"
            >
              {identity.role}
            </Box>
          </Box>
        </Box>

        {/* SECONDARY COLUMN */}
        <Box
          className={css({
            borderRight: { base: 'none', lg: '1px solid' },
            borderBottom: { base: '1px solid', lg: 'none' },
            borderColor: 'border',
            p: { base: 'lg', md: '2xl', lg: '3xl xl' },
          })}
        >
          {/* Column label */}
          <Box
            pb="md"
            mb="xl"
            borderBottom="1px solid"
            borderColor="border"
          >
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              Technical Depth
            </Box>
          </Box>

          {/* Selected Work list */}
          <Box mb="3xl">
            <Box
              fontSize="12px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="md"
            >
              Selected Work
            </Box>
            {selectedWork.map((project) => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  py: 'sm',
                  px: 'sm',
                  borderBottom: '1px solid',
                  borderColor: 'border-subtle',
                  textDecoration: 'none',
                  minHeight: '44px',
                  transition: 'all 110ms ease',
                  _hover: {
                    bg: 'rgba(74, 139, 96, 0.06)',
                  },
                  _focus: {
                    outline: '1.5px solid',
                    outlineColor: 'accent',
                    outlineOffset: '3px',
                  },
                })}
              >
                <Box>
                  <Box
                    fontSize="21px"
                    fontFamily="heading"
                    fontWeight="medium"
                    lineHeight="snug"
                    letterSpacing="wide"
                    color="text"
                  >
                    {project.title}
                  </Box>
                  <Box
                    fontSize="12px"
                    fontFamily="body"
                    color="text-muted"
                    letterSpacing="wider"
                    mt="xs"
                  >
                    {project.type}
                  </Box>
                </Box>
                <Box
                  fontSize="12px"
                  fontFamily="mono"
                  color="text-muted"
                  letterSpacing="wider"
                  flexShrink={0}
                  ml="md"
                >
                  {project.year}
                </Box>
              </a>
            ))}
          </Box>

          {/* Experiments */}
          <Box>
            <Box
              fontSize="12px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="md"
            >
              Experiments
            </Box>
            {experiments.map((project) => (
              <a
                key={project.slug}
                href={project.externalUrl || `/work/${project.slug}`}
                {...(project.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  py: 'sm',
                  px: 'sm',
                  borderBottom: '1px solid',
                  borderColor: 'border-subtle',
                  textDecoration: 'none',
                  minHeight: '44px',
                  transition: 'all 110ms ease',
                  _hover: {
                    bg: 'rgba(74, 139, 96, 0.06)',
                  },
                  _focus: {
                    outline: '1.5px solid',
                    outlineColor: 'accent',
                    outlineOffset: '3px',
                  },
                })}
              >
                <Box>
                  <Box
                    fontSize="16px"
                    fontFamily="heading"
                    fontWeight="medium"
                    lineHeight="snug"
                    letterSpacing="wide"
                    color="text"
                  >
                    {project.title}
                  </Box>
                  <Box
                    fontSize="12px"
                    fontFamily="body"
                    color="text-muted"
                    letterSpacing="wider"
                    mt="xs"
                  >
                    {project.type}
                  </Box>
                </Box>
                <Box
                  fontSize="12px"
                  fontFamily="mono"
                  color="text-muted"
                  letterSpacing="wider"
                  flexShrink={0}
                  ml="md"
                >
                  {project.year}
                </Box>
              </a>
            ))}
          </Box>
        </Box>

        {/* TERTIARY COLUMN */}
        <Box
          className={css({
            p: { base: 'lg', md: '2xl', lg: '3xl lg' },
          })}
        >
          {/* Column label */}
          <Box
            pb="md"
            mb="xl"
            borderBottom="1px solid"
            borderColor="border"
          >
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              Context
            </Box>
          </Box>

          {/* Moon signal */}
          <Box mb="md">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Lunar Phase
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="snug">
              Full Moon — 96.5%
            </Box>
          </Box>

          {/* Season */}
          <Box mb="md">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Season
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="snug">
              Spring — April 29
            </Box>
          </Box>

          {/* Daylight */}
          <Box mb="md">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Daylight
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="snug">
              13.6 hours
            </Box>
          </Box>

          {/* Oscar Wilde quote */}
          <Box
            mt="md"
            pt="md"
            borderTop="1px solid"
            borderColor="border"
          >
            <Box
              fontSize="13px"
              fontFamily="heading"
              fontStyle="italic"
              lineHeight="loose"
              color="#CAC7D4"
              mb="sm"
            >
              Whenever people agree with me I always feel I must be wrong.
            </Box>
            <Box
              fontSize="11px"
              fontFamily="body"
              letterSpacing="wider"
              color="text-muted"
            >
              — O. Wilde
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* FOOTER */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        px={{ base: 'lg', md: '2xl' }}
        py="lg"
      >
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
                _hover: {
                  color: 'accent-light',
                },
                _focus: {
                  outline: '1.5px solid',
                  outlineColor: 'accent',
                  outlineOffset: '3px',
                },
              })}
            >
              Archive
            </a>
          </Flex>

          <Box textAlign={{ base: 'left', md: 'right' }}>
            <Box fontSize="9px" fontFamily="body" letterSpacing="wider" color="text-muted">
              DET 2 · MIN 5
            </Box>
            <Box
              fontSize="9px"
              fontFamily="heading"
              fontStyle="italic"
              color="#76718A"
              mt="xs"
            >
              noted.
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}