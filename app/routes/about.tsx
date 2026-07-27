import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, Stack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box
      as="main"
      className={css({
        paddingX: { base: '6', md: '12', lg: '24' },
        paddingY: { base: '10', md: '14', lg: '20' },
      })}
    >
      {/* Identity statement — Bricolage block filling ~70% width */}
      <h1
        className={css({
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: 'clamp(28px, 4vw, 56px)',
          lineHeight: 'snug',
          letterSpacing: 'tight',
          color: 'text',
          maxWidth: { base: '100%', lg: '70%' },
          margin: '0 0 12',
        })}
      >
        {identity.statement}
      </h1>

      <Box
        className={css({
          fontFamily: 'body',
          fontSize: 'sm',
          color: 'textSecondary',
          marginBottom: '16',
        })}
      >
        {identity.name} — {identity.role}
      </Box>

      {/* Timeline */}
      <Stack
        gap="0"
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          marginBottom: '16',
        })}
      >
        {timeline.map((entry, i) => (
          <Flex
            key={i}
            align="baseline"
            gap="6"
            className={css({
              borderBottom: '1px solid',
              borderColor: 'border',
              paddingY: '4',
              bg: i % 2 === 0 ? 'bgDeep' : 'transparent',
              paddingX: '4',
              flexWrap: 'wrap',
            })}
          >
            <Box
              className={css({
                minWidth: '120px',
                flexShrink: '0',
                fontFamily: 'body',
                fontSize: 'sm',
                fontWeight: 'semibold',
                color: 'accent',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {entry.year}
            </Box>
            <Box
              className={css({
                minWidth: { base: '100%', md: '260px' },
                flexShrink: '0',
                fontFamily: 'heading',
                fontSize: 'md',
                color: 'text',
              })}
            >
              {entry.role} <span className={css({ color: 'textMuted' })}>· {entry.company}</span>
            </Box>
            <Box
              className={css({
                fontFamily: 'body',
                fontSize: 'sm',
                color: 'textSecondary',
                flex: '1',
                minWidth: '200px',
              })}
            >
              {entry.description}
            </Box>
          </Flex>
        ))}
      </Stack>

      {/* Capabilities */}
      <Flex
        wrap="wrap"
        gap="4"
        className={css({
          marginBottom: '16',
          fontFamily: 'body',
          fontSize: 'xs',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textSecondary',
        })}
      >
        {capabilities.map((cap) => (
          <Box
            key={cap}
            className={css({
              borderBottom: '1px solid',
              borderColor: 'border',
              paddingBottom: '1',
            })}
          >
            {cap}
          </Box>
        ))}
      </Flex>

      {/* Education */}
      <Box
        className={css({
          marginBottom: '16',
          fontFamily: 'body',
          fontSize: 'sm',
          color: 'textSecondary',
          lineHeight: 'normal',
        })}
      >
        <Box className={css({ color: 'text', fontWeight: 'semibold' })}>
          {education.school} — {education.degree}
        </Box>
        <Box>
          {education.concentration} · {education.years}
        </Box>
      </Box>

      {/* Personal data — second baseline strip echoing the home footer */}
      <Flex
        wrap="wrap"
        gap="2"
        columnGap="7"
        className={css({
          bg: 'bgDeep',
          borderTop: '1px solid',
          borderColor: 'border',
          paddingX: '4',
          paddingY: '4',
          fontFamily: 'body',
          fontSize: '2xs',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textSecondary',
        })}
      >
        <span>
          <span className={css({ color: 'textMuted' })}>HOLES IN ONE</span>{' '}
          <span className={css({ color: 'accent' })}>{personal.holesInOne}</span>
        </span>
        <span className={css({ color: 'border' })}>/</span>
        <span>
          <span className={css({ color: 'textMuted' })}>SPORT</span> {personal.sport}
        </span>
        <span className={css({ color: 'border' })}>/</span>
        <span>
          <span className={css({ color: 'textMuted' })}>TEAMS</span> {personal.teams.join(', ')}
        </span>
        <span className={css({ color: 'border' })}>/</span>
        <span>
          <span className={css({ color: 'textMuted' })}>NOW</span> {personal.currentFocus}
        </span>
      </Flex>
    </Box>
  )
}