import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '128px',
          paddingBottom: '80px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '96px',
            paddingBottom: '48px',
          },
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            fontWeight: 'bold',
            color: 'text',
            marginBottom: '32px',
          })}
        >
          About
        </Box>
        <Box
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: 'normal',
            color: 'text-secondary',
            maxWidth: '600px',
          })}
        >
          {identity.statement}
        </Box>
        <Flex
          gap="16px"
          className={css({
            fontFamily: 'mono',
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginTop: '24px',
          })}
        >
          <span>{identity.name}</span>
          <span>·</span>
          <span>{identity.role}</span>
        </Flex>
      </Box>

      {/* Hairline */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': { paddingLeft: '24px', paddingRight: '24px' },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Timeline */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '96px',
          paddingBottom: '96px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '56px',
            paddingBottom: '56px',
          },
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '48px',
          })}
        >
          Experience
        </Box>

        <VStack gap="0" align="stretch">
          {timeline.map((entry, i) => (
            <Flex
              key={`${entry.year}-${entry.company}-${i}`}
              className={css({
                paddingTop: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid',
                borderColor: 'border',
                gap: '24px',
                flexWrap: 'wrap',
                '@media (min-width: 768px)': {
                  flexWrap: 'nowrap',
                },
              })}
            >
              <Box
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  color: 'text-muted',
                  minWidth: '120px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                })}
              >
                {entry.year}
              </Box>
              <Box flex="1" minWidth="0">
                <Box
                  className={css({
                    fontFamily: 'heading',
                    fontSize: '16px',
                    fontWeight: 'semibold',
                    color: 'text',
                    lineHeight: 'snug',
                  })}
                >
                  {entry.role}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '14px',
                    color: 'text-muted',
                    marginTop: '4px',
                  })}
                >
                  {entry.company}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'body',
                    fontSize: '16px',
                    lineHeight: 'normal',
                    color: 'text-secondary',
                    marginTop: '8px',
                    maxWidth: '560px',
                  })}
                >
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Hairline */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': { paddingLeft: '24px', paddingRight: '24px' },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Capabilities + Education side by side */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '96px',
          paddingBottom: '96px',
          display: 'grid',
          gridTemplateColumns: '7fr 5fr',
          columnGap: '64px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '56px',
            paddingBottom: '56px',
            gridTemplateColumns: '1fr',
            rowGap: '48px',
          },
        })}
      >
        {/* Capabilities */}
        <Box>
          <Box
            className={css({
              fontFamily: 'heading',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'text-muted',
              marginBottom: '32px',
            })}
          >
            Capabilities
          </Box>
          <Flex flexWrap="wrap" gap="8px">
            {capabilities.map((cap) => (
              <Box
                key={cap}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  color: 'text-secondary',
                  padding: '6px 12px',
                  border: '1px solid',
                  borderColor: 'border',
                  borderRadius: '2px',
                })}
              >
                {cap}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Education */}
        <Box>
          <Box
            className={css({
              fontFamily: 'heading',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'text-muted',
              marginBottom: '32px',
            })}
          >
            Education
          </Box>
          <Box
            className={css({
              fontFamily: 'heading',
              fontSize: '16px',
              fontWeight: 'semibold',
              color: 'text',
              lineHeight: 'snug',
            })}
          >
            {education.school}
          </Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontSize: '16px',
              color: 'text-secondary',
              lineHeight: 'normal',
              marginTop: '8px',
            })}
          >
            {education.degree}, {education.concentration}
          </Box>
          <Box
            className={css({
              fontFamily: 'mono',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'text-muted',
              marginTop: '8px',
            })}
          >
            {education.years}
          </Box>
        </Box>
      </Box>

      {/* Hairline */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          '@media (max-width: 767px)': { paddingLeft: '24px', paddingRight: '24px' },
        })}
      >
        <Box className={css({ height: '1px', background: 'border' })} />
      </Box>

      {/* Personal */}
      <Box
        className={css({
          maxWidth: '1228px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '64px',
          paddingRight: '64px',
          paddingTop: '96px',
          paddingBottom: '96px',
          '@media (max-width: 767px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingTop: '56px',
            paddingBottom: '56px',
          },
        })}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '32px',
          })}
        >
          Personal
        </Box>

        <Box
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            '@media (max-width: 767px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            },
          })}
        >
          <Box>
            <Box
              className={css({
                fontFamily: 'mono',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '8px',
              })}
            >
              Holes in One
            </Box>
            <Box
              className={css({
                fontFamily: 'heading',
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'text',
                lineHeight: 'snug',
              })}
            >
              {personal.holesInOne}
            </Box>
          </Box>
          <Box>
            <Box
              className={css({
                fontFamily: 'mono',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '8px',
              })}
            >
              Sport
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                lineHeight: 'normal',
              })}
            >
              {personal.sport}
            </Box>
          </Box>
          <Box>
            <Box
              className={css({
                fontFamily: 'mono',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '8px',
              })}
            >
              Teams
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                lineHeight: 'normal',
              })}
            >
              {personal.teams.join(', ')}
            </Box>
          </Box>
          <Box>
            <Box
              className={css({
                fontFamily: 'mono',
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'text-muted',
                marginBottom: '8px',
              })}
            >
              Current Focus
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                color: 'text',
                lineHeight: 'normal',
              })}
            >
              {personal.currentFocus}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        className={css({
          background: 'bg-footer',
          padding: '48px 64px',
          marginTop: '48px',
          '@media (max-width: 767px)': {
            padding: '32px 24px',
          },
        })}
      >
        <Flex
          justify="space-between"
          align="baseline"
          className={css({
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            flexWrap: 'wrap',
            gap: '16px',
          })}
        >
          <Box
            className={css({
              fontFamily: 'mono',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'text-footer',
            })}
          >
            © 2026 Doug March
          </Box>
          <a
            href="/archive"
            className={css({
              fontFamily: 'mono',
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '{colors.sage.400}',
              textDecoration: 'none',
              padding: '8px 0',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 180ms ease',
              _hover: { color: 'text-footer' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </>
  )
}