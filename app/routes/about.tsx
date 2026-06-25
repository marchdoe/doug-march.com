import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box
      className={css({
        padding: { base: '32px 5vw', md: '48px 4vw' },
        maxWidth: '1200px',
        width: '100%',
      })}
    >
      {/* Identity */}
      <Box className={css({ marginBottom: '64px' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(48px, 8vw, 120px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            textTransform: 'uppercase',
            marginBottom: '16px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '24px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            lineHeight: 'loose',
            color: 'textSecondary',
            maxWidth: '65ch',
          })}
        >
          {identity.statement}
        </p>
      </Box>

      {/* Timeline */}
      <Box className={css({ marginBottom: '64px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '8px',
          })}
        >
          Timeline
        </p>

        {timeline.map((entry, i) => (
          <Flex
            key={i}
            className={css({
              borderBottom: '1px solid',
              borderColor: 'border',
              padding: '16px 0',
              gap: { base: '0', md: '32px' },
              flexDirection: { base: 'column', md: 'row' },
              alignItems: { md: 'baseline' },
            })}
          >
            <Box
              className={css({
                fontFamily: 'mono',
                fontSize: '13px',
                color: 'textMuted',
                letterSpacing: 'wide',
                minWidth: '140px',
                flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
                marginBottom: { base: '4px', md: '0' },
              })}
            >
              {entry.year}
            </Box>
            <Box>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  color: 'text',
                  fontWeight: 'medium',
                })}
              >
                {entry.role}
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontSize: '16px',
                  color: 'textMuted',
                  marginLeft: '8px',
                })}
              >
                — {entry.company}
              </span>
              <p
                className={css({
                  fontFamily: 'body',
                  fontSize: '14px',
                  lineHeight: 'normal',
                  color: 'textSecondary',
                  marginTop: '4px',
                  maxWidth: '60ch',
                })}
              >
                {entry.description}
              </p>
            </Box>
          </Flex>
        ))}
      </Box>

      {/* Education */}
      <Box className={css({ marginBottom: '64px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '8px',
          })}
        >
          Education
        </p>
        <Flex
          className={css({
            gap: { base: '0', md: '32px' },
            flexDirection: { base: 'column', md: 'row' },
            alignItems: { md: 'baseline' },
            padding: '16px 0',
          })}
        >
          <Box
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              color: 'textMuted',
              letterSpacing: 'wide',
              minWidth: '140px',
              flexShrink: 0,
              fontVariantNumeric: 'tabular-nums',
              marginBottom: { base: '4px', md: '0' },
            })}
          >
            {education.years}
          </Box>
          <Box>
            <span className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', fontWeight: 'medium' })}>
              {education.degree}
            </span>
            <span className={css({ fontFamily: 'body', fontSize: '16px', color: 'textMuted', marginLeft: '8px' })}>
              — {education.school}
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '14px', color: 'textSecondary', marginTop: '4px' })}>
              Concentration: {education.concentration}
            </p>
          </Box>
        </Flex>
      </Box>

      {/* Capabilities */}
      <Box className={css({ marginBottom: '64px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '8px',
          })}
        >
          Capabilities
        </p>
        <Flex
          className={css({
            flexWrap: 'wrap',
            gap: '8px',
          })}
        >
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'mono',
                fontSize: '13px',
                color: 'textSecondary',
                letterSpacing: 'wide',
                border: '1px solid',
                borderColor: 'border',
                padding: '6px 12px',
                borderRadius: 'sm',
              })}
            >
              {cap}
            </span>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box className={css({ marginBottom: '48px' })}>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '8px',
          })}
        >
          Personal
        </p>
        <Grid
          className={css({
            gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
            gap: '16px',
          })}
        >
          <Box>
            <span className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', textTransform: 'uppercase', letterSpacing: 'wider' })}>
              Holes in One
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', marginTop: '4px' })}>
              {personal.holesInOne}
            </p>
          </Box>
          <Box>
            <span className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', textTransform: 'uppercase', letterSpacing: 'wider' })}>
              Sport
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', marginTop: '4px' })}>
              {personal.sport}
            </p>
          </Box>
          <Box>
            <span className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', textTransform: 'uppercase', letterSpacing: 'wider' })}>
              Teams
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', marginTop: '4px' })}>
              {personal.teams.join(', ')}
            </p>
          </Box>
          <Box>
            <span className={css({ fontFamily: 'mono', fontSize: '12px', color: 'textMuted', textTransform: 'uppercase', letterSpacing: 'wider' })}>
              Current Focus
            </span>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'text', marginTop: '4px' })}>
              {personal.currentFocus}
            </p>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}