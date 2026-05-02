import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box
      padding={{ base: '32px 24px 64px', md: '64px 56px 96px 56px' }}
      maxWidth="720px"
    >
      {/* Identity */}
      <Box marginBottom="64px">
        <Box
          fontSize="clamp(28px, 3vw, 37px)"
          fontFamily="heading"
          fontWeight="semibold"
          color="text"
          lineHeight="snug"
          marginBottom="24px"
        >
          {identity.name}
        </Box>
        <Box
          fontSize="16px"
          fontFamily="body"
          color="text-secondary"
          lineHeight="normal"
          maxWidth="560px"
        >
          {identity.statement}
        </Box>
        <Box
          fontSize="14px"
          fontFamily="body"
          color="text-muted"
          marginTop="12px"
        >
          {identity.role}
        </Box>
      </Box>

      {/* Timeline */}
      <Box marginBottom="64px">
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="24px"
        >
          Experience
        </Box>
        <VStack gap="0" align="stretch">
          {timeline.map((entry, i) => (
            <Flex
              key={`${entry.year}-${entry.company}`}
              gap={{ base: '16px', md: '24px' }}
              paddingY="16px"
              borderBottom="1px solid"
              borderColor="border"
              align="flex-start"
            >
              <Box
                fontSize="14px"
                fontFamily="mono"
                color="text-muted"
                minWidth="120px"
                flexShrink={0}
                style={{ fontVariantNumeric: 'tabular-nums' }}
                lineHeight="snug"
              >
                {entry.year}
              </Box>
              <Box flex="1">
                <Box
                  fontSize="16px"
                  fontFamily="heading"
                  fontWeight="medium"
                  color="text"
                  lineHeight="snug"
                >
                  {entry.role}
                </Box>
                <Box
                  fontSize="14px"
                  fontFamily="body"
                  color="text-secondary"
                  marginTop="2px"
                >
                  {entry.company}
                </Box>
                <Box
                  fontSize="14px"
                  fontFamily="body"
                  color="text-muted"
                  marginTop="8px"
                  lineHeight="normal"
                >
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Education */}
      <Box marginBottom="64px">
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="24px"
        >
          Education
        </Box>
        <Box paddingY="16px" borderBottom="1px solid" borderColor="border">
          <Flex gap={{ base: '16px', md: '24px' }} align="flex-start">
            <Box
              fontSize="14px"
              fontFamily="mono"
              color="text-muted"
              minWidth="120px"
              flexShrink={0}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {education.years}
            </Box>
            <Box flex="1">
              <Box fontSize="16px" fontFamily="heading" fontWeight="medium" color="text" lineHeight="snug">
                {education.degree}
              </Box>
              <Box fontSize="14px" fontFamily="body" color="text-secondary" marginTop="2px">
                {education.school}
              </Box>
              <Box fontSize="14px" fontFamily="body" color="text-muted" marginTop="4px">
                {education.concentration}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Capabilities */}
      <Box marginBottom="64px">
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="24px"
        >
          Capabilities
        </Box>
        <Flex gap="8px" flexWrap="wrap">
          {capabilities.map((cap) => (
            <Box
              key={cap}
              paddingX="12px"
              paddingY="6px"
              fontSize="14px"
              fontFamily="body"
              color="text-secondary"
              border="1px solid"
              borderColor="border"
              borderRadius="sm"
            >
              {cap}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box marginBottom="64px">
        <Box
          fontSize="10px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          borderTop="1px solid"
          borderColor="border-muted"
          paddingTop="20px"
          marginBottom="24px"
        >
          Personal
        </Box>
        <VStack gap="12px" align="stretch">
          <Flex gap="24px" align="baseline">
            <Box fontSize="14px" fontFamily="body" color="text-muted" minWidth="120px" flexShrink={0}>
              Holes in One
            </Box>
            <Box fontSize="16px" fontFamily="heading" fontWeight="semibold" color="text">
              {personal.holesInOne}
            </Box>
          </Flex>
          <Flex gap="24px" align="baseline">
            <Box fontSize="14px" fontFamily="body" color="text-muted" minWidth="120px" flexShrink={0}>
              Sport
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text">
              {personal.sport}
            </Box>
          </Flex>
          <Flex gap="24px" align="baseline">
            <Box fontSize="14px" fontFamily="body" color="text-muted" minWidth="120px" flexShrink={0}>
              Teams
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text">
              {personal.teams.join(', ')}
            </Box>
          </Flex>
          <Flex gap="24px" align="baseline">
            <Box fontSize="14px" fontFamily="body" color="text-muted" minWidth="120px" flexShrink={0}>
              Current Focus
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text">
              {personal.currentFocus}
            </Box>
          </Flex>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        borderTop="1px solid"
        borderColor="border"
        paddingTop="24px"
        fontSize="12px"
        fontFamily="body"
        color="text-muted"
      >
        <Flex justify="space-between" align="center">
          <span>© 2026 Doug March</span>
          <a
            href="/archive"
            className={css({
              color: 'text-muted',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline', color: 'accent' },
              _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
              minHeight: '44px',
              minWidth: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}