import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  const sectionLabel = css({
    fontFamily: 'mono',
    fontSize: '11px',
    letterSpacing: 'widest',
    textTransform: 'uppercase',
    color: '{colors.stone.500}',
    marginBottom: '6',
  })

  const heading = css({
    fontFamily: 'display',
    fontSize: 'clamp(36px, 8vw, 80px)',
    lineHeight: 'tight',
    letterSpacing: 'wide',
    textTransform: 'uppercase',
    color: '{colors.stone.50}',
    marginBottom: '8',
  })

  const bodyText = css({
    fontFamily: 'body',
    fontSize: '16px',
    lineHeight: 'normal',
    color: '{colors.stone.300}',
    maxWidth: '65ch',
  })

  const timelineRow = css({
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: '6',
    paddingTop: '4',
    paddingBottom: '4',
    borderBottom: '1px solid',
    borderColor: 'border',
    mdDown: {
      gridTemplateColumns: '1fr',
      gap: '1',
    },
  })

  const yearLabel = css({
    fontFamily: 'mono',
    fontSize: '12px',
    letterSpacing: 'wider',
    color: '{colors.stone.500}',
    fontVariantNumeric: 'tabular-nums',
    flexShrink: 0,
    minWidth: '120px',
  })

  const roleText = css({
    fontFamily: 'body',
    fontSize: '16px',
    lineHeight: 'snug',
    color: '{colors.stone.50}',
    fontWeight: 'medium',
  })

  const companyText = css({
    fontFamily: 'body',
    fontSize: '14px',
    color: '{colors.violet.400}',
  })

  const descText = css({
    fontFamily: 'body',
    fontSize: '14px',
    lineHeight: 'normal',
    color: '{colors.stone.400}',
    marginTop: '1',
  })

  const capTag = css({
    fontFamily: 'mono',
    fontSize: '12px',
    letterSpacing: 'wider',
    textTransform: 'uppercase',
    color: '{colors.stone.300}',
    padding: '2px 8px',
    border: '1px solid',
    borderColor: 'border',
    display: 'inline-block',
  })

  return (
    <>
      <Box marginBottom="16">
        <p className={sectionLabel}>About</p>
        <h1 className={heading}>{identity.name}</h1>
        <p className={css({
          fontFamily: 'mono',
          fontSize: '14px',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: '{colors.violet.400}',
          marginBottom: '6',
        })}>
          {identity.role}
        </p>
        <p className={bodyText}>{identity.statement}</p>
      </Box>

      {/* Timeline */}
      <Box marginBottom="16">
        <p className={sectionLabel}>Experience</p>
        {timeline.map((entry, i) => (
          <div key={i} className={timelineRow}>
            <span className={yearLabel}>{entry.year}</span>
            <div>
              <p className={roleText}>{entry.role}</p>
              <p className={companyText}>{entry.company}</p>
              <p className={descText}>{entry.description}</p>
            </div>
          </div>
        ))}
      </Box>

      {/* Education */}
      <Box marginBottom="16">
        <p className={sectionLabel}>Education</p>
        <div className={timelineRow}>
          <span className={yearLabel}>{education.years}</span>
          <div>
            <p className={roleText}>{education.degree}</p>
            <p className={companyText}>{education.school}</p>
            <p className={descText}>{education.concentration}</p>
          </div>
        </div>
      </Box>

      {/* Capabilities */}
      <Box marginBottom="16">
        <p className={sectionLabel}>Capabilities</p>
        <Flex flexWrap="wrap" gap="2">
          {capabilities.map((cap, i) => (
            <span key={i} className={capTag}>{cap}</span>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box marginBottom="16">
        <p className={sectionLabel}>Personal</p>
        <Grid columns={{ base: 1, md: 2 }} gap="6">
          <div>
            <p className={css({ fontFamily: 'mono', fontSize: '12px', letterSpacing: 'wider', textTransform: 'uppercase', color: '{colors.stone.500}', marginBottom: '1' })}>
              Holes in One
            </p>
            <p className={css({ fontFamily: 'display', fontSize: '48px', lineHeight: 'tight', color: '{colors.violet.400}' })}>
              {personal.holesInOne}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'mono', fontSize: '12px', letterSpacing: 'wider', textTransform: 'uppercase', color: '{colors.stone.500}', marginBottom: '1' })}>
              Sport
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: '{colors.stone.300}' })}>
              {personal.sport}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'mono', fontSize: '12px', letterSpacing: 'wider', textTransform: 'uppercase', color: '{colors.stone.500}', marginBottom: '1' })}>
              Teams
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: '{colors.stone.300}' })}>
              {personal.teams.join(', ')}
            </p>
          </div>
          <div>
            <p className={css({ fontFamily: 'mono', fontSize: '12px', letterSpacing: 'wider', textTransform: 'uppercase', color: '{colors.stone.500}', marginBottom: '1' })}>
              Current Focus
            </p>
            <p className={css({ fontFamily: 'body', fontSize: '16px', color: '{colors.stone.300}' })}>
              {personal.currentFocus}
            </p>
          </div>
        </Grid>
      </Box>

      {/* Footer nav */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="6"
      >
        <Flex gap="6" alignItems="baseline">
          <a
            href="/"
            className={css({
              fontFamily: 'mono',
              fontSize: '11px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: '{colors.stone.500}',
              _hover: { color: '{colors.stone.300}' },
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            })}
          >
            Home
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'mono',
              fontSize: '11px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: '{colors.stone.300}',
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            })}
          >
            About
          </a>
          <a
            href="/archive"
            className={css({
              fontFamily: 'mono',
              fontSize: '11px',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: '{colors.stone.500}',
              _hover: { color: '{colors.stone.300}' },
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </>
  )
}