import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { Sidebar } from '../components/Sidebar'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Band 1: Identity Hero */}
      <section
        className={css({
          width: '100%',
          minHeight: { base: '400px', md: '60vh' },
          bg: 'bandHero',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            pt: '8',
            pb: '16',
          })}
        >
          <Sidebar />

          <Flex alignItems="flex-end" pb="8">
            <div>
              <h1
                className={css({
                  fontFamily: 'heading',
                  fontSize: { base: '37px', md: '50px' },
                  fontWeight: 'semibold',
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'textOnDark',
                  mb: '6',
                })}
              >
                {identity.name}
              </h1>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondaryOnDark',
                  maxWidth: '600px',
                  mb: '3',
                })}
              >
                {identity.role}
              </p>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textSecondaryOnDark',
                  maxWidth: '600px',
                })}
              >
                {identity.statement}
              </p>
            </div>
          </Flex>
        </div>
      </section>

      {/* Band 2: Timeline */}
      <section
        className={css({
          width: '100%',
          bg: 'bandFeatured',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: { base: '16', md: '24' },
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '9px',
              fontWeight: 'semibold',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textMuted',
              display: 'block',
              mb: '8',
            })}
          >
            Experience
          </span>

          <VStack gap="0" alignItems="stretch">
            {timeline.map((entry) => (
              <Flex
                key={entry.year + entry.company}
                gap={{ base: '4', md: '8' }}
                py="4"
                borderBottom="1px solid"
                borderColor="border"
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Box
                  className={css({
                    fontFamily: 'mono',
                    fontSize: '12px',
                    color: 'textMuted',
                    minWidth: '120px',
                    flexShrink: 0,
                    letterSpacing: 'wider',
                  })}
                >
                  {entry.year}
                </Box>
                <Box flex="1">
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: '16px',
                      fontWeight: 'medium',
                      color: 'text',
                      mb: '1',
                    })}
                  >
                    {entry.role}
                  </Box>
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textSecondary',
                      mb: '2',
                    })}
                  >
                    {entry.company}
                  </Box>
                  <Box
                    className={css({
                      fontFamily: 'body',
                      fontSize: '14px',
                      color: 'textMuted',
                      lineHeight: 'normal',
                      maxWidth: '560px',
                    })}
                  >
                    {entry.description}
                  </Box>
                </Box>
              </Flex>
            ))}
          </VStack>
        </div>
      </section>

      {/* Band 3: Capabilities & Education */}
      <section
        className={css({
          width: '100%',
          bg: 'bandIndex',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: { base: '16', md: '20' },
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: '2fr 1fr' },
            gap: { base: '12', md: '16' },
          })}
        >
          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '9px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                mb: '6',
              })}
            >
              Capabilities
            </span>
            <Flex gap="2" flexWrap="wrap">
              {capabilities.map((cap) => (
                <Box
                  key={cap}
                  className={css({
                    px: '3',
                    py: '2',
                    fontFamily: 'body',
                    fontSize: '12px',
                    color: 'textSecondary',
                    bg: 'bgCard',
                    border: '1px solid',
                    borderColor: 'border',
                    borderRadius: 'sm',
                    letterSpacing: 'wide',
                  })}
                >
                  {cap}
                </Box>
              ))}
            </Flex>
          </div>

          <div>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '9px',
                fontWeight: 'semibold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textMuted',
                display: 'block',
                mb: '6',
              })}
            >
              Education
            </span>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: 'medium',
                color: 'text',
                mb: '1',
              })}
            >
              {education.school}
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                mb: '1',
              })}
            >
              {education.degree}
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textMuted',
                mb: '1',
              })}
            >
              {education.concentration}
            </Box>
            <Box
              className={css({
                fontFamily: 'mono',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'wider',
              })}
            >
              {education.years}
            </Box>
          </div>
        </div>
      </section>

      {/* Band 4: Personal */}
      <section
        className={css({
          width: '100%',
          bg: 'bandEditorial',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: { base: '16', md: '20' },
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '9px',
              fontWeight: 'semibold',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textMutedOnDark',
              display: 'block',
              mb: '8',
            })}
          >
            Personal
          </span>

          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: '8',
            })}
          >
            <div>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMutedOnDark',
                  mb: '2',
                })}
              >
                Holes in One
              </Box>
              <Box
                className={css({
                  fontFamily: 'heading',
                  fontSize: '28px',
                  fontWeight: 'semibold',
                  color: 'textOnDark',
                  lineHeight: 'snug',
                })}
              >
                {personal.holesInOne}
              </Box>
            </div>

            <div>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMutedOnDark',
                  mb: '2',
                })}
              >
                Sport
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  color: 'textOnDark',
                })}
              >
                {personal.sport}
              </Box>
            </div>

            <div>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMutedOnDark',
                  mb: '2',
                })}
              >
                Teams
              </Box>
              <VStack gap="1" alignItems="flex-start">
                {personal.teams.map((team) => (
                  <Box
                    key={team}
                    className={css({
                      fontFamily: 'body',
                      fontSize: '16px',
                      color: 'textOnDark',
                    })}
                  >
                    {team}
                  </Box>
                ))}
              </VStack>
            </div>

            <div>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '12px',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'textMutedOnDark',
                  mb: '2',
                })}
              >
                Current Focus
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  lineHeight: 'normal',
                  color: 'textOnDark',
                })}
              >
                {personal.currentFocus}
              </Box>
            </div>
          </div>
        </div>
      </section>

      {/* Band 5: Footer */}
      <footer
        className={css({
          width: '100%',
          bg: 'bandFooter',
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          className={css({
            width: '100%',
            maxWidth: '1100px',
            px: { base: '6', md: '12' },
            py: '12',
            display: 'flex',
            flexDirection: { base: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { base: 'flex-start', md: 'center' },
            gap: '4',
          })}
        >
          <Flex gap="6" alignItems="center">
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: 'textMutedOnDark',
              })}
            >
              © 2026 Doug March
            </span>
            <a
              href="/archive"
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: 'textMutedOnDark',
                textDecoration: 'none',
                _hover: { color: 'textSecondaryOnDark', textDecoration: 'underline' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
              })}
            >
              Archive
            </a>
          </Flex>
        </div>
      </footer>
    </>
  )
}