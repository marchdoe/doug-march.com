import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box padding="6vw" paddingTop={{ base: '80px', md: '120px' }}>
      {/* Identity */}
      <Box marginBottom={{ base: '48px', md: '96px' }} maxWidth="720px">
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '24px',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: '18px',
            color: 'accent',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            marginBottom: '24px',
          })}
        >
          {identity.role}
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: 'normal',
            color: 'textSecondary',
            maxWidth: '65ch',
          })}
        >
          {identity.statement}
        </p>
      </Box>

      {/* Timeline */}
      <Box marginBottom={{ base: '48px', md: '96px' }}>
        <h2
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          EXPERIENCE
        </h2>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '0' })}>
          {timeline.map((entry, i) => (
            <div
              key={i}
              className={css({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                gap: { base: '4px', md: '0' },
                paddingY: '16px',
                borderBottom: '1px solid',
                borderColor: 'border',
              })}
            >
              <span
                className={css({
                  fontFamily: 'body',
                  fontWeight: 'normal',
                  fontSize: '14px',
                  color: 'textMuted',
                  minWidth: '140px',
                  flexShrink: 0,
                  letterSpacing: 'wide',
                })}
              >
                {entry.year}
              </span>
              <Box flex="1">
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'semibold',
                    fontSize: '16px',
                    color: 'text',
                  })}
                >
                  {entry.role}
                </span>
                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: 'normal',
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
                    fontWeight: 'normal',
                    fontSize: '14px',
                    lineHeight: 'normal',
                    color: 'textSecondary',
                    marginTop: '4px',
                    maxWidth: '65ch',
                  })}
                >
                  {entry.description}
                </p>
              </Box>
            </div>
          ))}
        </div>
      </Box>

      {/* Education */}
      <Box marginBottom={{ base: '48px', md: '96px' }}>
        <h2
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          EDUCATION
        </h2>
        <div
          className={css({
            display: 'flex',
            flexDirection: { base: 'column', md: 'row' },
            gap: { base: '4px', md: '0' },
            paddingY: '16px',
          })}
        >
          <span
            className={css({
              fontFamily: 'body',
              fontWeight: 'normal',
              fontSize: '14px',
              color: 'textMuted',
              minWidth: '140px',
              flexShrink: 0,
              letterSpacing: 'wide',
            })}
          >
            {education.years}
          </span>
          <Box>
            <span
              className={css({
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: '16px',
                color: 'text',
              })}
            >
              {education.degree}
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontWeight: 'normal',
                fontSize: '16px',
                color: 'textMuted',
                marginLeft: '8px',
              })}
            >
              — {education.school}
            </span>
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: 'normal',
                fontSize: '14px',
                color: 'textSecondary',
                marginTop: '4px',
              })}
            >
              {education.concentration}
            </p>
          </Box>
        </div>
      </Box>

      {/* Capabilities */}
      <Box marginBottom={{ base: '48px', md: '96px' }}>
        <h2
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          CAPABILITIES
        </h2>
        <Flex wrap="wrap" gap="8px">
          {capabilities.map((cap, i) => (
            <span
              key={i}
              className={css({
                fontFamily: 'body',
                fontWeight: 'normal',
                fontSize: '14px',
                color: 'textSecondary',
                padding: '8px 16px',
                border: '1px solid',
                borderColor: 'border',
                letterSpacing: 'wide',
              })}
            >
              {cap}
            </span>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box marginBottom={{ base: '48px', md: '96px' }}>
        <h2
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            marginBottom: '32px',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '12px',
          })}
        >
          PERSONAL
        </h2>
        <Grid columns={{ base: 1, md: 2 }} gap="24px">
          <Box>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wider', textTransform: 'uppercase', marginBottom: '4px' })}>
              HOLES IN ONE
            </p>
            <p className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: '32px', color: 'accent' })}>
              {personal.holesInOne}
            </p>
          </Box>
          <Box>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wider', textTransform: 'uppercase', marginBottom: '4px' })}>
              SPORT
            </p>
            <p className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '16px', color: 'text' })}>
              {personal.sport}
            </p>
          </Box>
          <Box>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wider', textTransform: 'uppercase', marginBottom: '4px' })}>
              TEAMS
            </p>
            <p className={css({ fontFamily: 'body', fontWeight: 'normal', fontSize: '16px', color: 'textSecondary' })}>
              {personal.teams.join(' · ')}
            </p>
          </Box>
          <Box>
            <p className={css({ fontFamily: 'body', fontSize: '12px', color: 'textMuted', letterSpacing: 'wider', textTransform: 'uppercase', marginBottom: '4px' })}>
              CURRENT FOCUS
            </p>
            <p className={css({ fontFamily: 'body', fontWeight: 'normal', fontSize: '16px', color: 'textSecondary', maxWidth: '65ch' })}>
              {personal.currentFocus}
            </p>
          </Box>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="16px"
        marginTop="48px"
      >
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            _hover: { color: 'accentLight', textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </Box>
    </Box>
  )
}