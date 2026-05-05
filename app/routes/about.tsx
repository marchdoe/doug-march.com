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
      <Box mb="12" pb="12" borderBottom="1px solid" borderColor="border">
        <Box
          fontSize="clamp(28px, 4vw, 42px)"
          fontFamily="heading"
          fontWeight="bold"
          lineHeight="snug"
          letterSpacing="tight"
          color="text"
          mb="4"
        >
          {identity.name}
        </Box>
        <Box fontSize="sm" fontFamily="body" color="text-muted" mb="6">
          {identity.role}
        </Box>
        <Box
          fontSize="base"
          fontFamily="body"
          color="text-secondary"
          lineHeight="normal"
          maxW="600px"
        >
          {identity.statement}
        </Box>
      </Box>

      {/* Timeline */}
      <Box mb="12">
        <Flex align="center" gap="4" mb="6">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            whiteSpace="nowrap"
          >
            Experience
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>

        <VStack gap="0" align="stretch">
          {timeline.map((entry, i) => (
            <Flex
              key={`${entry.year}-${entry.company}`}
              gap="6"
              py="5"
              borderBottom="1px solid"
              borderColor="border"
              className={css({
                '@media (max-width: 767px)': {
                  flexDirection: 'column',
                  gap: '4px',
                },
              })}
            >
              <Box
                fontSize="sm"
                fontFamily="mono"
                color="text-muted"
                minW="120px"
                flexShrink={0}
              >
                {entry.year}
              </Box>
              <Box flex="1">
                <Box fontSize="base" fontFamily="heading" fontWeight="medium" color="text">
                  {entry.role}
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text-secondary" mt="1">
                  {entry.company}
                </Box>
                <Box fontSize="sm" fontFamily="body" color="text-muted" mt="2" lineHeight="normal" maxW="520px">
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Education */}
      <Box mb="12">
        <Flex align="center" gap="4" mb="6">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            whiteSpace="nowrap"
          >
            Education
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>

        <Flex gap="6" py="5" borderBottom="1px solid" borderColor="border"
          className={css({
            '@media (max-width: 767px)': {
              flexDirection: 'column',
              gap: '4px',
            },
          })}
        >
          <Box fontSize="sm" fontFamily="mono" color="text-muted" minW="120px" flexShrink={0}>
            {education.years}
          </Box>
          <Box flex="1">
            <Box fontSize="base" fontFamily="heading" fontWeight="medium" color="text">
              {education.degree}
            </Box>
            <Box fontSize="sm" fontFamily="body" color="text-secondary" mt="1">
              {education.school}
            </Box>
            <Box fontSize="sm" fontFamily="body" color="text-muted" mt="1">
              {education.concentration}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Capabilities */}
      <Box mb="12">
        <Flex align="center" gap="4" mb="6">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            whiteSpace="nowrap"
          >
            Capabilities
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>

        <Flex gap="2" flexWrap="wrap">
          {capabilities.map((cap) => (
            <Box
              key={cap}
              px="3"
              py="1"
              fontSize="xs"
              fontFamily="body"
              color="text-muted"
              background="bg"
              border="1px solid"
              borderColor="border"
              borderRadius="base"
            >
              {cap}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Personal */}
      <Box mb="12">
        <Flex align="center" gap="4" mb="6">
          <Box
            fontSize="2xs"
            fontFamily="heading"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color="text-disabled"
            whiteSpace="nowrap"
          >
            Personal
          </Box>
          <Box flex="1" height="1px" background="border" />
        </Flex>

        <VStack gap="0" align="stretch">
          <Flex py="3" borderBottom="1px solid" borderColor="border" justify="space-between">
            <Box fontSize="sm" fontFamily="body" color="text-muted">Holes in One</Box>
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="text">{personal.holesInOne}</Box>
          </Flex>
          <Flex py="3" borderBottom="1px solid" borderColor="border" justify="space-between">
            <Box fontSize="sm" fontFamily="body" color="text-muted">Sport</Box>
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="text">{personal.sport}</Box>
          </Flex>
          <Flex py="3" borderBottom="1px solid" borderColor="border" justify="space-between">
            <Box fontSize="sm" fontFamily="body" color="text-muted">Teams</Box>
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="text">{personal.teams.join(', ')}</Box>
          </Flex>
          <Flex py="3" borderBottom="1px solid" borderColor="border" justify="space-between">
            <Box fontSize="sm" fontFamily="body" color="text-muted">Current Focus</Box>
            <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="text">{personal.currentFocus}</Box>
          </Flex>
        </VStack>
      </Box>

      {/* Footer */}
      <Box mt="12" pt="6" borderTop="1px solid" borderColor="border">
        <Flex justify="space-between" align="center">
          <Box fontSize="xs" fontFamily="body" color="text-disabled">© 2026</Box>
          <a
            href="/archive"
            className={css({
              fontSize: 'xs',
              fontFamily: 'body',
              color: 'text-disabled',
              textDecoration: 'none',
              _hover: { color: 'text-muted' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </>
  )
}