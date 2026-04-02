import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { SectionLabel } from '../components/SectionLabel'

export const Route = createFileRoute('/about')({ component: AboutPage })

const aboutGridClass = css({
  display: 'grid',
  gridTemplateColumns: '3fr 2fr',
})

const capTagClass = css({
  fontSize: 'xs',
  fontFamily: 'body',
  color: 'text.muted',
  border: '1px solid',
  borderColor: 'border',
  padding: '3px 10px',
})

function AboutPage() {
  return (
    <Box style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* ── Identity header ── */}
      <Box
        borderBottom="1px solid"
        borderColor="border"
        style={{ padding: '48px 24px 40px' }}
      >
        <Box
          fontFamily="heading"
          fontSize="xl"
          fontWeight="700"
          color="text"
          lineHeight="tight"
          letterSpacing="tight"
          style={{ marginBottom: '8px' }}
        >
          {identity.name}
        </Box>
        <Box
          fontSize="xs"
          fontFamily="body"
          color="text.muted"
          letterSpacing="widest"
          style={{ textTransform: 'uppercase', marginBottom: '20px' }}
        >
          {identity.role}
        </Box>
        <Box
          fontSize="md"
          fontFamily="body"
          color="text.secondary"
          lineHeight="normal"
          style={{ maxWidth: '680px' }}
        >
          {identity.statement}
        </Box>
      </Box>

      {/* ── Two-column: timeline + capabilities/personal ── */}
      <div className={aboutGridClass}>

        {/* Left — Timeline */}
        <Box
          borderRight="1px solid"
          borderColor="border"
          style={{ padding: '32px 24px' }}
        >
          <SectionLabel>Timeline</SectionLabel>

          <VStack gap="0" align="stretch">
            {timeline.map((entry, i) => (
              <Flex
                key={`${entry.year}-${entry.company}-${i}`}
                align="flex-start"
                borderBottom="1px solid"
                borderColor="border"
                style={{ padding: '14px 0', gap: '0' }}
              >
                {/* Year — fixed width for alignment */}
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  color="text.muted"
                  lineHeight="snug"
                  style={{ minWidth: '140px', flexShrink: 0 }}
                >
                  {entry.year}
                </Box>

                {/* Role / Company / Description */}
                <Box style={{ flex: 1 }}>
                  <Flex align="center" gap="2" style={{ marginBottom: '2px' }}>
                    <Box
                      fontFamily="heading"
                      fontSize="base"
                      fontWeight="600"
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
                        style={{ textTransform: 'uppercase' }}
                      >
                        Current
                      </Box>
                    )}
                  </Flex>
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    color="text.muted"
                    style={{ marginBottom: '6px' }}
                  >
                    {entry.company}
                  </Box>
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    color="text.secondary"
                    lineHeight="normal"
                  >
                    {entry.description}
                  </Box>
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* Education — at bottom of timeline col */}
          <Box style={{ marginTop: '32px' }}>
            <SectionLabel>Education</SectionLabel>
            <Flex align="flex-start" style={{ gap: '0' }}>
              <Box
                fontSize="sm"
                fontFamily="body"
                color="text.muted"
                style={{ minWidth: '140px', flexShrink: 0 }}
              >
                {education.years}
              </Box>
              <Box>
                <Box
                  fontFamily="heading"
                  fontSize="base"
                  fontWeight="600"
                  color="text"
                  lineHeight="snug"
                  style={{ marginBottom: '2px' }}
                >
                  {education.school}
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text.muted">
                  {education.degree}
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text.muted">
                  {education.concentration}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Right — Capabilities + Personal */}
        <Box style={{ padding: '32px 24px' }}>

          {/* Capabilities */}
          <Box style={{ marginBottom: '40px' }}>
            <SectionLabel>Capabilities</SectionLabel>
            <Flex wrap="wrap" gap="2">
              {capabilities.map((cap) => (
                <Box key={cap} className={capTagClass}>
                  {cap}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Personal */}
          <Box borderTop="1px solid" borderColor="border" style={{ paddingTop: '32px' }}>
            <SectionLabel>Personal</SectionLabel>

            <VStack gap="0" align="stretch">
              <Flex
                justify="space-between"
                borderBottom="1px solid"
                borderColor="border"
                style={{ padding: '10px 0' }}
              >
                <Box fontSize="xs" fontFamily="body" color="text.muted" letterSpacing="wide" style={{ textTransform: 'uppercase' }}>
                  Sport
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text.secondary">
                  {personal.sport}
                </Box>
              </Flex>
              <Flex
                justify="space-between"
                borderBottom="1px solid"
                borderColor="border"
                style={{ padding: '10px 0' }}
              >
                <Box fontSize="xs" fontFamily="body" color="text.muted" letterSpacing="wide" style={{ textTransform: 'uppercase' }}>
                  Holes in One
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text.secondary">
                  {personal.holesInOne}
                </Box>
              </Flex>
              <Flex
                justify="space-between"
                borderBottom="1px solid"
                borderColor="border"
                style={{ padding: '10px 0' }}
              >
                <Box fontSize="xs" fontFamily="body" color="text.muted" letterSpacing="wide" style={{ textTransform: 'uppercase' }}>
                  Teams
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text.secondary" style={{ textAlign: 'right' }}>
                  {personal.teams.join(' · ')}
                </Box>
              </Flex>
              <Flex
                justify="space-between"
                borderBottom="1px solid"
                borderColor="border"
                style={{ padding: '10px 0' }}
              >
                <Box fontSize="xs" fontFamily="body" color="text.muted" letterSpacing="wide" style={{ textTransform: 'uppercase' }}>
                  Focus
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text.secondary" style={{ textAlign: 'right', maxWidth: '180px' }}>
                  {personal.currentFocus}
                </Box>
              </Flex>
            </VStack>
          </Box>

        </Box>

      </div>

    </Box>
  )
}