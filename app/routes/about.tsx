import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
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
            {identity.name}
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              color: '{colors.neutral.500}',
              textTransform: 'uppercase',
              marginBottom: '32px',
            })}
          >
            {identity.role}
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
            {identity.statement}
          </Box>
        </Box>
      </Box>

      {/* Timeline */}
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
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
              marginBottom: '48px',
            })}
          >
            Experience
          </Box>
          <VStack gap="0" width="100%" alignItems="stretch">
            {timeline.map((entry, i) => (
              <Flex
                key={`${entry.year}-${entry.company}-${i}`}
                gap="24"
                className={css({
                  padding: '24px 0',
                  borderBottom: '1px solid {colors.neutral.200}',
                  flexWrap: 'wrap',
                  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                    gap: '8px',
                  },
                })}
              >
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    color: '{colors.neutral.400}',
                    minWidth: '120px',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                    paddingTop: '4px',
                  })}
                >
                  {entry.year}
                </Box>
                <Box flex="1">
                  <Box
                    className={css({
                      fontFamily: 'display',
                      fontWeight: 'semibold',
                      fontSize: '1rem',
                      lineHeight: '1.35',
                      color: '{colors.neutral.700}',
                    })}
                  >
                    {entry.role}
                  </Box>
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: '0.875rem',
                      color: '{colors.neutral.500}',
                      marginTop: '4px',
                    })}
                  >
                    {entry.company}
                  </Box>
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: '0.875rem',
                      lineHeight: '1.60',
                      color: '{colors.neutral.400}',
                      marginTop: '8px',
                      maxWidth: '540px',
                    })}
                  >
                    {entry.description}
                  </Box>
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Education */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '96px 32px',
          backgroundColor: '#FAFAF6',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
          },
        })}
      >
        <Box maxWidth="760px" width="100%">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
              marginBottom: '48px',
            })}
          >
            Education
          </Box>
          <Box
            className={css({
              padding: '24px 0',
              borderBottom: '1px solid {colors.neutral.200}',
            })}
          >
            <Flex gap="24" className={css({ '@media (max-width: 600px)': { flexDirection: 'column', gap: '8px' } })}>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: '{colors.neutral.400}',
                  minWidth: '120px',
                  flexShrink: 0,
                  fontVariantNumeric: 'tabular-nums',
                  paddingTop: '4px',
                })}
              >
                {education.years}
              </Box>
              <Box flex="1">
                <Box
                  className={css({
                    fontFamily: 'display',
                    fontWeight: 'semibold',
                    fontSize: '1rem',
                    lineHeight: '1.35',
                    color: '{colors.neutral.700}',
                  })}
                >
                  {education.degree}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '0.875rem',
                    color: '{colors.neutral.500}',
                    marginTop: '4px',
                  })}
                >
                  {education.school}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '0.875rem',
                    color: '{colors.neutral.400}',
                    marginTop: '4px',
                  })}
                >
                  {education.concentration}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* Capabilities */}
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
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
              marginBottom: '48px',
            })}
          >
            Capabilities
          </Box>
          <Flex flexWrap="wrap" gap="8">
            {capabilities.map((cap) => (
              <Box
                key={cap}
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
                {cap}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* Personal */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={css({
          padding: '96px 32px',
          backgroundColor: '#FAFAF6',
          '@media (max-width: 767px)': {
            padding: '64px 24px',
          },
        })}
      >
        <Box maxWidth="760px" width="100%">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '{colors.neutral.400}',
              textTransform: 'uppercase',
              marginBottom: '48px',
            })}
          >
            Personal
          </Box>
          <VStack gap="0" width="100%" alignItems="stretch">
            <Flex
              className={css({
                padding: '16px 0',
                borderBottom: '1px solid {colors.neutral.200}',
                gap: '24px',
              })}
            >
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.400}', minWidth: '120px' })}>
                Sport
              </Box>
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.600}' })}>
                {personal.sport}
              </Box>
            </Flex>
            <Flex
              className={css({
                padding: '16px 0',
                borderBottom: '1px solid {colors.neutral.200}',
                gap: '24px',
              })}
            >
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.400}', minWidth: '120px' })}>
                Holes in One
              </Box>
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.600}' })}>
                {personal.holesInOne}
              </Box>
            </Flex>
            <Flex
              className={css({
                padding: '16px 0',
                borderBottom: '1px solid {colors.neutral.200}',
                gap: '24px',
              })}
            >
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.400}', minWidth: '120px' })}>
                Teams
              </Box>
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.600}' })}>
                {personal.teams.join(', ')}
              </Box>
            </Flex>
            <Flex
              className={css({
                padding: '16px 0',
                borderBottom: '1px solid {colors.neutral.200}',
                gap: '24px',
              })}
            >
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.400}', minWidth: '120px' })}>
                Current Focus
              </Box>
              <Box className={css({ fontFamily: 'body', fontSize: '0.875rem', color: '{colors.neutral.600}' })}>
                {personal.currentFocus}
              </Box>
            </Flex>
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