import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

const sectionLabelClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  marginBottom: '4',
})

const labelTextClass = css({
  fontSize: 'xs',
  fontFamily: 'body',
  fontWeight: '500',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const labelRuleClass = css({
  flex: '1',
  height: '1px',
  background: 'border',
})

function SectionLabel({ label }: { label: string }) {
  return (
    <div className={sectionLabelClass}>
      <span className={labelTextClass}>{label}</span>
      <span className={labelRuleClass} />
    </div>
  )
}

function AboutPage() {
  return (
    <Box fontFamily="body">

      {/* ── PAGE HEADER BAND ─────────────────────────────────── */}
      <Box
        width="100%"
        background="bgMasthead"
        py="10"
        px="12"
        borderBottom="1px solid"
        style={{ borderBottomColor: '#2A2720' }}
      >
        <Box maxWidth="1200px" mx="auto">
          <Box
            fontSize="xl"
            fontFamily="heading"
            fontWeight="700"
            color="textOnDark"
            lineHeight="tight"
            letterSpacing="tight"
            mb="3"
          >
            {identity.name}
          </Box>
          <Box
            fontSize="sm"
            fontFamily="body"
            fontWeight="400"
            color="textOnDarkMuted"
            letterSpacing="wide"
            mb="6"
          >
            {identity.role}
          </Box>
          <Box
            fontSize="md"
            fontFamily="heading"
            fontWeight="400"
            fontStyle="italic"
            color="textOnDark"
            lineHeight="normal"
            maxWidth="560px"
          >
            {identity.statement}
          </Box>
        </Box>
      </Box>

      {/* ── MAIN CONTENT — 2 columns (3fr 2fr) ─────────────── */}
      <Box
        maxWidth="1200px"
        mx="auto"
        width="100%"
        display="grid"
        gridTemplateColumns="3fr 2fr"
      >

        {/* Left column: Timeline */}
        <Box
          py="10"
          px="7"
          paddingLeft="12"
          borderRight="1px solid"
          borderColor="border"
        >
          <SectionLabel label="Experience" />

          <VStack gap="0" align="stretch">
            {timeline.map((entry, i) => (
              <Flex
                key={`${entry.year}-${entry.company}-${i}`}
                gap="6"
                py="4"
                borderBottom="1px solid"
                borderColor="border"
                align="flex-start"
              >
                {/* Year */}
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  fontWeight="400"
                  color="textMuted"
                  minWidth="48px"
                  flexShrink="0"
                  fontVariantNumeric="tabular-nums"
                  letterSpacing="wide"
                  mt="0"
                >
                  {entry.year}
                </Box>

                {/* Content */}
                <Box flex="1">
                  <Flex align="baseline" gap="2" mb="1" flexWrap="wrap">
                    <Box
                      fontSize="base"
                      fontFamily="body"
                      fontWeight="500"
                      color="text"
                      lineHeight="snug"
                    >
                      {entry.role}
                    </Box>
                    {entry.current && (
                      <Box
                        fontSize="xs"
                        fontFamily="body"
                        fontWeight="500"
                        color="accent"
                        letterSpacing="wide"
                        textTransform="uppercase"
                      >
                        Current
                      </Box>
                    )}
                  </Flex>
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    fontWeight="400"
                    color="textMuted"
                    mb="2"
                  >
                    {entry.company}
                  </Box>
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    fontWeight="300"
                    color="textSecondary"
                    lineHeight="normal"
                  >
                    {entry.description}
                  </Box>
                </Box>
              </Flex>
            ))}
          </VStack>

          {/* Education */}
          {education && (
            <Box mt="8">
              <SectionLabel label="Education" />
              <Flex gap="6" py="4" align="flex-start">
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  fontWeight="400"
                  color="textMuted"
                  minWidth="48px"
                  flexShrink="0"
                  letterSpacing="wide"
                >
                  {education.years}
                </Box>
                <Box flex="1">
                  <Box
                    fontSize="base"
                    fontFamily="body"
                    fontWeight="500"
                    color="text"
                    lineHeight="snug"
                    mb="1"
                  >
                    {education.school}
                  </Box>
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    fontWeight="400"
                    color="textMuted"
                  >
                    {education.degree} · {education.concentration}
                  </Box>
                </Box>
              </Flex>
            </Box>
          )}
        </Box>

        {/* Right column: Capabilities + Personal */}
        <Box
          py="10"
          px="8"
        >
          {/* Capabilities */}
          <Box mb="8">
            <SectionLabel label="Capabilities" />
            <Box display="flex" flexWrap="wrap" gap="2">
              {capabilities.map(cap => (
                <Box
                  key={cap}
                  px="3"
                  py="1"
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="400"
                  color="textSecondary"
                  background="bgCard"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="none"
                  letterSpacing="normal"
                >
                  {cap}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Personal */}
          <Box mb="8">
            <SectionLabel label="Off the Clock" />

            <VStack gap="3" align="stretch">
              <Flex justify="space-between" align="baseline" py="3" borderBottom="1px solid" borderColor="border">
                <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textMuted" letterSpacing="wide" textTransform="uppercase">
                  Sport
                </Box>
                <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textSecondary">
                  {personal.sport}
                </Box>
              </Flex>

              {personal.holesInOne > 0 && (
                <Flex justify="space-between" align="baseline" py="3" borderBottom="1px solid" borderColor="border">
                  <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textMuted" letterSpacing="wide" textTransform="uppercase">
                    Holes in One
                  </Box>
                  <Box
                    fontSize="base"
                    fontFamily="heading"
                    fontWeight="700"
                    color="text"
                    lineHeight="tight"
                  >
                    {personal.holesInOne}
                  </Box>
                </Flex>
              )}

              <Flex justify="space-between" align="flex-start" py="3" borderBottom="1px solid" borderColor="border">
                <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textMuted" letterSpacing="wide" textTransform="uppercase">
                  Teams
                </Box>
                <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textSecondary" textAlign="right">
                  {personal.teams.join(' · ')}
                </Box>
              </Flex>

              <Box py="3" borderBottom="1px solid" borderColor="border">
                <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textMuted" letterSpacing="wide" textTransform="uppercase" mb="2">
                  Current Focus
                </Box>
                <Box fontSize="sm" fontFamily="body" fontWeight="400" color="textSecondary" lineHeight="normal">
                  {personal.currentFocus}
                </Box>
              </Box>
            </VStack>
          </Box>

          {/* Back to work */}
          <Box
            pt="4"
            borderTop="1px solid"
            borderColor="border"
          >
            <a href="/" className={css({ textDecoration: 'none' })}>
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="500"
                color="textMuted"
                letterSpacing="wider"
                textTransform="uppercase"
                _hover={{ color: 'accent' }}
              >
                ← View Work
              </Box>
            </a>
          </Box>
        </Box>
      </Box>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <Box
        width="100%"
        background="bgMasthead"
        borderTop="1px solid"
        style={{ borderTopColor: '#2A2720' }}
        py="6"
        px="12"
      >
        <Flex maxWidth="1200px" mx="auto" justify="space-between" align="center">
          <Box fontSize="xs" fontFamily="body" fontWeight="400" color="textOnDarkMuted">
            Doug March · 2026
          </Box>
          <Flex gap="6">
            <a href="/" className={css({ textDecoration: 'none' })}>
              <Box fontSize="xs" fontFamily="body" fontWeight="500" color="textOnDarkMuted" letterSpacing="wider" textTransform="uppercase" _hover={{ color: 'accentLight' }}>
                Work
              </Box>
            </a>
            <a href="/about" className={css({ textDecoration: 'none' })}>
              <Box fontSize="xs" fontFamily="body" fontWeight="500" color="textOnDarkMuted" letterSpacing="wider" textTransform="uppercase" _hover={{ color: 'accentLight' }}>
                About
              </Box>
            </a>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}