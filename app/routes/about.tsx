import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, Grid, styled } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { HeroNav } from '../components/HeroNav'
import { Chip } from '../components/Chip'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const label = css({
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontWeight: 'bold',
})

function AboutPage() {
  return (
    <Box display="flex" flexDirection="column" gap={{ base: '8', md: '12' }} paddingY={{ base: '6', md: '8' }}>
      <Box>
        <span className={css({ ...label._important, marginBottom: '4', display: 'block' })}>
          02 · About
        </span>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            fontSize: 'clamp(40px, 6vw, 88px)',
            color: 'text',
            maxWidth: '20ch',
          })}
        >
          {identity.statement}
        </h1>
        <p className={css({ fontSize: 'base', color: 'textSecondary', marginTop: '4' })}>
          {identity.name} — {identity.role}
        </p>
        <Box marginTop="6">
          <HeroNav active="about" />
        </Box>
      </Box>

      <Box>
        <span className={label}>Timeline</span>
        <Box display="flex" flexDirection="column" marginTop="4">
          {timeline.map((entry, i) => (
            <Flex
              key={i}
              gap="6"
              bg="cardBg"
              borderBottom={i === timeline.length - 1 ? 'none' : '1px solid'}
              borderColor="border"
              paddingX="4"
              paddingY="4"
              align="baseline"
              wrap="wrap"
            >
              <span
                className={css({
                  flex: '0 0 120px',
                  minWidth: '120px',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: 'sm',
                  color: 'accent',
                  fontWeight: 'bold',
                })}
              >
                {entry.year}
              </span>
              <Box flex="1" minWidth="200px">
                <p className={css({ fontSize: 'base', color: 'text', fontWeight: 'bold' })}>
                  {entry.role} · {entry.company}
                </p>
                <p className={css({ fontSize: 'sm', color: 'textSecondary', marginTop: '1' })}>
                  {entry.description}
                </p>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>

      <Box>
        <span className={label}>Capabilities</span>
        <Flex wrap="wrap" gap="2" marginTop="4">
          {capabilities.map((cap) => (
            <Chip key={cap}>{cap}</Chip>
          ))}
        </Flex>
      </Box>

      <Grid gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="8">
        <Box>
          <span className={label}>Education</span>
          <Box marginTop="4" display="flex" flexDirection="column" gap="1">
            <p className={css({ fontSize: 'md', color: 'text', fontWeight: 'bold' })}>
              {education.school}
            </p>
            <p className={css({ fontSize: 'sm', color: 'textSecondary' })}>
              {education.degree} · {education.concentration}
            </p>
            <p
              className={css({
                fontSize: 'xs',
                color: 'textMuted',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {education.years}
            </p>
          </Box>
        </Box>

        <Box>
          <span className={label}>Off the clock</span>
          <Flex wrap="wrap" gap="2" marginTop="4">
            <Chip>{personal.holesInOne} holes-in-one</Chip>
            <Chip>{personal.sport}</Chip>
            {personal.teams.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
            <Chip>{personal.currentFocus}</Chip>
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}