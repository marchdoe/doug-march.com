import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box maxW="1200px" mx="auto" w="100%">
      <Grid
        className={css({
          gridTemplateColumns: { base: '1fr', lg: '2fr 1.1fr 0.9fr' },
        })}
      >
        {/* PRIMARY COLUMN — Identity & Timeline */}
        <Box
          className={css({
            borderRight: { base: 'none', lg: '1px solid' },
            borderBottom: { base: '1px solid', lg: 'none' },
            borderColor: 'border',
            p: { base: 'lg', md: '2xl', lg: '3xl 2xl' },
          })}
        >
          {/* Column label */}
          <Box pb="md" mb="xl" borderBottom="1px solid" borderColor="border">
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              About
            </Box>
          </Box>

          {/* Identity */}
          <Box mb="3xl">
            <Box
              fontSize="clamp(28px, 4vw, 37px)"
              fontFamily="heading"
              fontWeight="semibold"
              lineHeight="tight"
              letterSpacing="tight"
              color="text"
              mb="md"
            >
              {identity.name}
            </Box>
            <Box
              fontSize="12px"
              fontFamily="body"
              letterSpacing="widest"
              color="text-muted"
              textTransform="uppercase"
              mb="lg"
            >
              {identity.role}
            </Box>
            <Box
              fontSize="16px"
              fontFamily="body"
              lineHeight="normal"
              color="text-secondary"
              maxW="600px"
            >
              {identity.statement}
            </Box>
          </Box>

          {/* Timeline */}
          <Box>
            <Box
              fontSize="12px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="md"
            >
              Experience
            </Box>
            {timeline.map((entry, i) => (
              <Flex
                key={`${entry.year}-${entry.company}`}
                gap={{ base: 'md', md: 'lg' }}
                py="sm"
                borderBottom="1px solid"
                borderColor="border-subtle"
                flexDirection={{ base: 'column', sm: 'row' }}
              >
                <Box
                  fontSize="12px"
                  fontFamily="mono"
                  color="text-muted"
                  letterSpacing="wider"
                  minW="120px"
                  flexShrink={0}
                  pt="xs"
                >
                  {entry.year}
                </Box>
                <Box flex="1" pb="sm">
                  <Box
                    fontSize="16px"
                    fontFamily="body"
                    fontWeight="medium"
                    color="text"
                    lineHeight="snug"
                  >
                    {entry.role}
                    {entry.current && (
                      <Box
                        as="span"
                        fontSize="9px"
                        letterSpacing="widest"
                        color="accent"
                        fontFamily="body"
                        ml="sm"
                        textTransform="uppercase"
                      >
                        Current
                      </Box>
                    )}
                  </Box>
                  <Box
                    fontSize="14px"
                    fontFamily="body"
                    color="text-secondary"
                    mt="xs"
                  >
                    {entry.company}
                  </Box>
                  <Box
                    fontSize="14px"
                    fontFamily="body"
                    color="text-muted"
                    mt="xs"
                    lineHeight="normal"
                    maxW="500px"
                  >
                    {entry.description}
                  </Box>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>

        {/* SECONDARY COLUMN — Capabilities & Education */}
        <Box
          className={css({
            borderRight: { base: 'none', lg: '1px solid' },
            borderBottom: { base: '1px solid', lg: 'none' },
            borderColor: 'border',
            p: { base: 'lg', md: '2xl', lg: '3xl xl' },
          })}
        >
          <Box pb="md" mb="xl" borderBottom="1px solid" borderColor="border">
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              Capabilities
            </Box>
          </Box>

          <Flex gap="sm" flexWrap="wrap" mb="3xl">
            {capabilities.map((cap) => (
              <Box
                key={cap}
                px="sm"
                py="xs"
                fontSize="12px"
                fontFamily="body"
                color="text-secondary"
                letterSpacing="wide"
                border="1px solid"
                borderColor="border-subtle"
                borderRadius="2px"
              >
                {cap}
              </Box>
            ))}
          </Flex>

          {/* Education */}
          <Box mb="3xl">
            <Box
              fontSize="12px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="md"
            >
              Education
            </Box>
            <Box>
              <Box fontSize="16px" fontFamily="body" fontWeight="medium" color="text" lineHeight="snug">
                {education.school}
              </Box>
              <Box fontSize="14px" fontFamily="body" color="text-secondary" mt="xs">
                {education.degree}
              </Box>
              <Box fontSize="14px" fontFamily="body" color="text-muted" mt="xs">
                {education.concentration}
              </Box>
              <Box fontSize="12px" fontFamily="mono" color="text-muted" letterSpacing="wider" mt="xs">
                {education.years}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* TERTIARY COLUMN — Personal */}
        <Box
          className={css({
            p: { base: 'lg', md: '2xl', lg: '3xl lg' },
          })}
        >
          <Box pb="md" mb="xl" borderBottom="1px solid" borderColor="border">
            <Box
              fontSize="11px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
            >
              Personal
            </Box>
          </Box>

          <Box mb="lg">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Holes in One
            </Box>
            <Box fontSize="28px" fontFamily="heading" fontWeight="semibold" color="text" lineHeight="snug">
              {personal.holesInOne}
            </Box>
          </Box>

          <Box mb="lg">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Sport
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="snug">
              {personal.sport}
            </Box>
          </Box>

          <Box mb="lg">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Teams
            </Box>
            {personal.teams.map((team) => (
              <Box
                key={team}
                fontSize="16px"
                fontFamily="body"
                color="text-secondary"
                lineHeight="snug"
                mb="xs"
              >
                {team}
              </Box>
            ))}
          </Box>

          <Box mb="lg">
            <Box
              fontSize="9px"
              letterSpacing="widest"
              color="text-muted"
              fontFamily="body"
              textTransform="uppercase"
              mb="xs"
            >
              Current Focus
            </Box>
            <Box fontSize="16px" fontFamily="body" color="text-secondary" lineHeight="normal" maxW="280px">
              {personal.currentFocus}
            </Box>
          </Box>

          {/* Wilde quote on about too */}
          <Box mt="xl" pt="md" borderTop="1px solid" borderColor="border">
            <Box
              fontSize="13px"
              fontFamily="heading"
              fontStyle="italic"
              lineHeight="loose"
              color="#CAC7D4"
              mb="sm"
            >
              Whenever people agree with me I always feel I must be wrong.
            </Box>
            <Box fontSize="11px" fontFamily="body" letterSpacing="wider" color="text-muted">
              — O. Wilde
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Footer */}
      <Box borderTop="1px solid" borderColor="border" px={{ base: 'lg', md: '2xl' }} py="lg">
        <Flex
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          flexDirection={{ base: 'column', md: 'row' }}
          gap="md"
        >
          <Flex gap="lg" align="center">
            <Box fontSize="12px" fontFamily="body" color="text-muted" letterSpacing="wider">
              © 2026
            </Box>
            <a
              href="/archive"
              className={css({
                fontSize: '12px',
                fontFamily: 'body',
                color: 'text-muted',
                letterSpacing: 'wider',
                textDecoration: 'none',
                padding: 'sm',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                _hover: { color: 'accent-light' },
                _focus: { outline: '1.5px solid', outlineColor: 'accent', outlineOffset: '3px' },
              })}
            >
              Archive
            </a>
          </Flex>
          <Box textAlign={{ base: 'left', md: 'right' }}>
            <Box fontSize="9px" fontFamily="body" letterSpacing="wider" color="text-muted">
              DET 2 · MIN 5
            </Box>
            <Box fontSize="9px" fontFamily="heading" fontStyle="italic" color="#76718A" mt="xs">
              noted.
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}