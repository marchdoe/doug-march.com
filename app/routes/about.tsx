import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const section = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const backLink = css({
  fontSize: 'xs',
  fontFamily: 'body',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: 'wide',
  _hover: { color: 'textSecondary' },
})

function SectionLabel({ label }: { label: string }) {
  return (
    <Box
      fontSize="2xs"
      fontFamily="body"
      fontWeight="500"
      letterSpacing="widest"
      textTransform="uppercase"
      color="textMuted"
      mb="8"
    >
      {label}
    </Box>
  )
}

function AboutPage() {
  return (
    <Box>

      {/* ═══ IDENTITY HEADER ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '120px',
          paddingBottom: '96px',
          minHeight: '60vh',
          borderBottom: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <Box
            fontFamily="heading"
            fontWeight="700"
            color="text"
            letterSpacing="tight"
            lineHeight="tight"
            mb="6"
            style={{ fontSize: 'clamp(36px, 6vw, 50px)' }}
          >
            {identity.name}
          </Box>
          <Box
            fontSize="md"
            fontFamily="heading"
            fontWeight="300"
            color="textMuted"
            mb="10"
          >
            {identity.role}
          </Box>
          <Box
            fontSize="base"
            fontFamily="body"
            color="textSecondary"
            lineHeight="normal"
            style={{ maxWidth: '640px' }}
          >
            {identity.statement}
          </Box>
        </Box>
      </Box>

      {/* ═══ TIMELINE ═══ */}
      <Box
        className={section}
        style={{ paddingTop: '64px', paddingBottom: '64px' }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <SectionLabel label="Experience" />
          {timeline.map((entry, i) => (
            <Flex
              key={`${entry.year}-${entry.company}-${i}`}
              gap="8"
              py="6"
              borderBottom="1px solid"
              borderColor="borderSubtle"
            >
              {/* Year column — fixed width so ranges and single years align */}
              <Box
                fontSize="xs"
                fontFamily="body"
                color="textMuted"
                lineHeight="snug"
                style={{
                  minWidth: '120px',
                  width: '120px',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}
              >
                {entry.year}
              </Box>

              {/* Role / company / description */}
              <Box flex="1">
                <Flex align="baseline" gap="3" mb="1">
                  <Box
                    fontSize="base"
                    fontFamily="heading"
                    fontWeight="500"
                    color="text"
                    lineHeight="snug"
                  >
                    {entry.role}
                  </Box>
                  {entry.current && (
                    <Box
                      fontSize="2xs"
                      fontFamily="body"
                      color="accent"
                      letterSpacing="wider"
                      textTransform="uppercase"
                    >
                      now
                    </Box>
                  )}
                </Flex>
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  color="textSecondary"
                  mb="2"
                >
                  {entry.company}
                </Box>
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  color="textMuted"
                  lineHeight="normal"
                >
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>

      {/* ═══ CAPABILITIES ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '64px',
          paddingBottom: '64px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <SectionLabel label="Capabilities" />
          <Flex gap="2" flexWrap="wrap">
            {capabilities.map((cap) => (
              <Box
                key={cap}
                fontSize="xs"
                fontFamily="body"
                color="textSecondary"
                px="3"
                py="1"
                border="1px solid"
                borderColor="borderSubtle"
                borderRadius="none"
              >
                {cap}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* ═══ EDUCATION ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '64px',
          paddingBottom: '64px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <SectionLabel label="Education" />
          <Box>
            <Box
              fontSize="base"
              fontFamily="heading"
              fontWeight="500"
              color="text"
              lineHeight="snug"
              mb="2"
            >
              {education.school}
            </Box>
            <Box fontSize="sm" fontFamily="body" color="textSecondary" mb="1">
              {education.degree} · {education.concentration}
            </Box>
            <Box fontSize="xs" fontFamily="body" color="textMuted">
              {education.years}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ═══ PERSONAL ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '64px',
          paddingBottom: '64px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <SectionLabel label="Personal" />
          <Box fontSize="sm" fontFamily="body" color="textSecondary" lineHeight="loose">
            <Box mb="2">Currently: {personal.currentFocus}</Box>
            <Box mb="2">
              {personal.sport} · {personal.holesInOne} hole{personal.holesInOne !== 1 ? 's' : ''}-in-one
            </Box>
            <Box>Teams: {personal.teams.join(', ')}</Box>
          </Box>
        </Box>
      </Box>

      {/* ═══ FOOTER ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <Flex justify="space-between" align="baseline">
            <Box fontSize="xs" fontFamily="body" color="textMuted">
              Doug March · 2026
            </Box>
            <a href="/archive" className={backLink}>archive</a>
          </Flex>
        </Box>
      </Box>

    </Box>
  )
}