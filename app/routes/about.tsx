import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Identity Statement */}
      <Box mb="64px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: 'clamp(24px, 3vw, 28px)',
            fontWeight: 'bold',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text-heading',
            marginBottom: '16px',
          })}
        >
          {identity.name}
        </Box>
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '13px',
            letterSpacing: 'wide',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          {identity.role}
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
          {identity.statement}
        </Box>
      </Box>

      {/* Timeline */}
      <Box mb="64px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          Experience
        </Box>
        <VStack gap="0" align="stretch">
          {timeline.map((entry, i) => (
            <Flex
              key={`${entry.year}-${entry.company}-${i}`}
              gap="24px"
              className={css({
                paddingTop: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
                flexDirection: 'row',
                '@media (max-width: 767px)': {
                  flexDirection: 'column',
                  gap: '4px',
                },
              })}
            >
              <Box
                className={css({
                  fontFamily: 'space-grotesk',
                  fontSize: '13px',
                  color: 'text-muted',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: '120px',
                  flexShrink: 0,
                })}
              >
                {entry.year}
              </Box>
              <Box flex="1">
                <Box
                  className={css({
                    fontFamily: 'space-grotesk',
                    fontSize: '16px',
                    fontWeight: 'medium',
                    color: 'text-heading',
                    lineHeight: 'snug',
                  })}
                >
                  {entry.role}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'work-sans',
                    fontSize: '14px',
                    color: 'text-muted',
                    marginTop: '2px',
                  })}
                >
                  {entry.company}
                </Box>
                <Box
                  className={css({
                    fontFamily: 'work-sans',
                    fontSize: '14px',
                    color: 'text-secondary',
                    lineHeight: 'normal',
                    marginTop: '8px',
                  })}
                >
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Education */}
      <Box mb="64px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          Education
        </Box>
        <Box
          className={css({
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          <Box
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '16px',
              fontWeight: 'medium',
              color: 'text-heading',
            })}
          >
            {education.school}
          </Box>
          <Box
            className={css({
              fontFamily: 'work-sans',
              fontSize: '14px',
              color: 'text-secondary',
              marginTop: '4px',
            })}
          >
            {education.degree} — {education.concentration}
          </Box>
          <Box
            className={css({
              fontFamily: 'space-grotesk',
              fontSize: '13px',
              color: 'text-muted',
              fontVariantNumeric: 'tabular-nums',
              marginTop: '4px',
            })}
          >
            {education.years}
          </Box>
        </Box>
      </Box>

      {/* Capabilities */}
      <Box mb="64px">
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          Capabilities
        </Box>
        <Flex gap="8px" flexWrap="wrap">
          {capabilities.map((cap) => (
            <Box
              key={cap}
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '13px',
                color: 'text-secondary',
                background: 'bg-card',
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'sm',
                padding: '4px 12px',
              })}
            >
              {cap}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box>
        <Box
          className={css({
            fontFamily: 'space-grotesk',
            fontSize: '11px',
            fontWeight: 'semibold',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'text-muted',
            marginBottom: '24px',
          })}
        >
          Personal
        </Box>
        <VStack gap="0" align="stretch">
          <Flex
            justify="space-between"
            className={css({
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-muted',
              })}
            >
              Holes in One
            </Box>
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                fontWeight: 'semibold',
                color: 'text-heading',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {personal.holesInOne}
            </Box>
          </Flex>
          <Flex
            justify="space-between"
            className={css({
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-muted',
              })}
            >
              Sport
            </Box>
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-heading',
              })}
            >
              {personal.sport}
            </Box>
          </Flex>
          <Flex
            justify="space-between"
            align="flex-start"
            className={css({
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-muted',
              })}
            >
              Teams
            </Box>
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-heading',
                textAlign: 'right',
              })}
            >
              {personal.teams.join(', ')}
            </Box>
          </Flex>
          <Flex
            justify="space-between"
            className={css({
              paddingTop: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <Box
              className={css({
                fontFamily: 'space-grotesk',
                fontSize: '14px',
                color: 'text-muted',
              })}
            >
              Current Focus
            </Box>
            <Box
              className={css({
                fontFamily: 'work-sans',
                fontSize: '14px',
                color: 'text-heading',
                textAlign: 'right',
                maxWidth: '300px',
              })}
            >
              {personal.currentFocus}
            </Box>
          </Flex>
        </VStack>
      </Box>
    </>
  )
}