import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '12',
        padding: { base: '8', md: 'clamp(2rem, 5vw, 5rem)' },
        maxWidth: '72ch',
      })}
    >
      <p
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}
      >
        About
      </p>

      <Box>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 'snug',
            letterSpacing: 'tight',
            color: 'text',
            margin: '0 0 1rem',
          })}
        >
          {identity.statement}
        </h1>
        <p
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'accent',
            textShadow: '0 0 40px {colors.accentGlow}',
            margin: 0,
          })}
        >
          {identity.role}
        </p>
      </Box>

      {/* Timeline */}
      <Box as="section">
        {timeline.map((entry, i) => (
          <Flex
            key={i}
            gap="6"
            className={css({
              padding: '4 0',
              borderBottom: '1px solid',
              borderColor: 'border',
              alignItems: 'baseline',
            })}
          >
            <Box
              className={css({
                flex: '0 0 120px',
                minWidth: '120px',
                fontFamily: 'body',
                fontWeight: 'semibold',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textMuted',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {entry.year}
            </Box>
            <Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontWeight: 'bold',
                  fontSize: 'sm',
                  color: 'text',
                })}
              >
                {entry.role} · {entry.company}
              </Box>
              <Box
                className={css({
                  fontFamily: 'body',
                  fontSize: 'sm',
                  color: 'textSecondary',
                  marginTop: '1',
                })}
              >
                {entry.description}
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>

      {/* Capabilities */}
      <Box
        as="section"
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4',
          paddingTop: '4',
          borderTop: '1px solid',
          borderColor: 'border',
        })}
      >
        {capabilities.map((cap) => (
          <span
            key={cap}
            className={css({
              fontFamily: 'body',
              fontWeight: 'semibold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
            })}
          >
            {cap}
          </span>
        ))}
      </Box>

      {/* Education */}
      <Box
        as="section"
        className={css({
          padding: '4 0',
          borderTop: '1px solid',
          borderColor: 'border',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        <Box className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'sm', color: 'text' })}>
          {education.school}
        </Box>
        <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'textSecondary', marginTop: '1' })}>
          {education.degree} — {education.concentration}
        </Box>
        <Box className={css({ fontFamily: 'body', fontSize: 'xs', color: 'textMuted', marginTop: '1' })}>
          {education.years}
        </Box>
      </Box>

      {/* Personal signals */}
      <Box
        as="section"
        className={css({
          padding: '6',
          border: '1px solid',
          borderColor: 'border',
          background: 'bgCard',
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
        })}
      >
        <Box
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: '2xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
          })}
        >
          Off the Clock
        </Box>
        <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'textSecondary' })}>
          Holes in one: <span className={css({ color: 'text', fontVariantNumeric: 'tabular-nums' })}>{personal.holesInOne}</span>
        </Box>
        <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'textSecondary' })}>
          Sport: {personal.sport}
        </Box>
        <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'textSecondary' })}>
          Teams: {personal.teams.join(' · ')}
        </Box>
        <Box className={css({ fontFamily: 'body', fontSize: 'sm', color: 'accent' })}>
          Current focus: {personal.currentFocus}
        </Box>
      </Box>
    </Box>
  )
}