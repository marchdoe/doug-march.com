import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      {/* Identity */}
      <Box marginBottom="4xl">
        <Box
          fontSize="lg"
          fontFamily="heading"
          fontWeight="bold"
          color="text"
          lineHeight="snug"
          marginBottom="md"
        >
          {identity.name}
        </Box>
        <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="accent" letterSpacing="wider" textTransform="uppercase" marginBottom="xl">
          {identity.role}
        </Box>
        <Box fontSize="base" fontFamily="body" color="textSecondary" lineHeight="normal" maxWidth="600px">
          {identity.statement}
        </Box>
      </Box>

      {/* Timeline */}
      <Box marginBottom="4xl">
        <Flex alignItems="center" gap="lg" marginBottom="xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase">
            Experience
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>
        <VStack gap="0" alignItems="stretch">
          {timeline.map((entry, i) => (
            <Flex
              key={`${entry.year}-${entry.company}`}
              gap="xl"
              paddingY="lg"
              borderBottom="1px solid"
              borderColor="border"
              className={css({
                '@media (max-width: 767px)': {
                  flexDirection: 'column',
                  gap: 'sm',
                },
              })}
            >
              <Box
                fontSize="sm"
                fontFamily="mono"
                color="textMuted"
                minWidth="120px"
                flexShrink={0}
              >
                {entry.year}
              </Box>
              <Box flex="1">
                <Box fontSize="base" fontFamily="heading" fontWeight="medium" color="text">
                  {entry.role}
                </Box>
                <Box fontSize="sm" fontFamily="body" color="textSecondary" marginBottom="xs">
                  {entry.company}
                </Box>
                <Box fontSize="sm" fontFamily="body" color="textMuted" lineHeight="normal">
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Education */}
      <Box marginBottom="4xl">
        <Flex alignItems="center" gap="lg" marginBottom="xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase">
            Education
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>
        <Box>
          <Box fontSize="base" fontFamily="heading" fontWeight="medium" color="text">{education.school}</Box>
          <Box fontSize="sm" fontFamily="body" color="textSecondary">{education.degree} — {education.concentration}</Box>
          <Box fontSize="sm" fontFamily="mono" color="textMuted">{education.years}</Box>
        </Box>
      </Box>

      {/* Capabilities */}
      <Box marginBottom="4xl">
        <Flex alignItems="center" gap="lg" marginBottom="xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase">
            Capabilities
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>
        <Flex gap="sm" flexWrap="wrap">
          {capabilities.map((cap) => (
            <Box
              key={cap}
              paddingX="md"
              paddingY="xs"
              fontSize="sm"
              fontFamily="body"
              color="textSecondary"
              background="bg"
              borderRadius="xs"
              border="1px solid"
              borderColor="border"
            >
              {cap}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box marginBottom="3xl">
        <Flex alignItems="center" gap="lg" marginBottom="xl">
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="widest" textTransform="uppercase">
            Personal
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>
        <VStack gap="md" alignItems="flex-start">
          <Flex gap="sm" alignItems="baseline">
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="wider" textTransform="uppercase" minWidth="120px">Holes in One</Box>
            <Box fontSize="base" fontFamily="body" color="text">{personal.holesInOne}</Box>
          </Flex>
          <Flex gap="sm" alignItems="baseline">
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="wider" textTransform="uppercase" minWidth="120px">Sport</Box>
            <Box fontSize="base" fontFamily="body" color="text">{personal.sport}</Box>
          </Flex>
          <Flex gap="sm" alignItems="baseline">
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="wider" textTransform="uppercase" minWidth="120px">Teams</Box>
            <Box fontSize="base" fontFamily="body" color="text">{personal.teams.join(', ')}</Box>
          </Flex>
          <Flex gap="sm" alignItems="baseline">
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="wider" textTransform="uppercase" minWidth="120px">Focus</Box>
            <Box fontSize="base" fontFamily="body" color="text">{personal.currentFocus}</Box>
          </Flex>
        </VStack>
      </Box>

      {/* Footer */}
      <Box paddingTop="xl" borderTop="1px solid" borderColor="border">
        <Flex justifyContent="space-between" alignItems="baseline">
          <Box fontSize="xs" fontFamily="body" color="textMuted">
            © 2026 Doug March
          </Box>
          <a href="/archive" className={css({
            fontSize: 'xs',
            fontFamily: 'body',
            color: 'textMuted',
            textDecoration: 'none',
            _hover: { color: 'accent', textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
          })}>
            Archive
          </a>
        </Flex>
      </Box>
    </>
  )
}