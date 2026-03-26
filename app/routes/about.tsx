import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box as="main">
      {/* ─── Header: Identity ─── */}
      <Box
        as="section"
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 48px 80px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="2xs"
          color="textMuted"
          letterSpacing="widest"
          style={{ textTransform: 'uppercase', marginBottom: '32px' }}
        >
          About
        </Box>

        <Box
          fontFamily="heading"
          fontWeight="700"
          fontSize="xl"
          color="text"
          letterSpacing="tight"
          lineHeight="tight"
          style={{ marginBottom: '32px', textTransform: 'uppercase' }}
        >
          {identity.name}
        </Box>

        <Box
          style={{
            width: '80px',
            borderTop: '1px solid #a3b49d',
            marginBottom: '32px',
          }}
        />

        <Box
          fontFamily="body"
          fontWeight="300"
          fontSize="md"
          color="textSecondary"
          lineHeight="snug"
          style={{ marginBottom: '24px' }}
        >
          {identity.role}
        </Box>

        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="base"
          color="textBody"
          lineHeight="normal"
          style={{ maxWidth: '560px' }}
        >
          {identity.statement}
        </Box>
      </Box>

      {/* ─── Timeline ─── */}
      <Box
        as="section"
        style={{
          background: '#eaf0e6',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          style={{
            maxWidth: '760px',
            width: '100%',
            padding: '80px 48px',
          }}
        >
          {/* Section label */}
          <Flex
            align="center"
            style={{
              borderBottom: '1px solid #c9d5c4',
              paddingBottom: '16px',
              marginBottom: '0',
            }}
          >
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase' }}
            >
              Experience
            </Box>
          </Flex>

          {/* Timeline rows */}
          <VStack gap="0" align="stretch">
            {timeline.map((entry, i) => (
              <Flex
                key={`${entry.year}-${entry.company}-${i}`}
                gap="6"
                style={{
                  padding: '24px 0',
                  borderBottom: '1px solid #c9d5c4',
                }}
              >
                <Box
                  fontFamily="body"
                  fontWeight="400"
                  fontSize="xs"
                  color="textMuted"
                  style={{
                    minWidth: '50px',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                    paddingTop: '2px',
                  }}
                >
                  {entry.year}
                  {entry.current && (
                    <Box
                      style={{
                        display: 'inline-block',
                        marginLeft: '6px',
                        color: '#c97d1e',
                      }}
                    >
                      ·
                    </Box>
                  )}
                </Box>
                <Box style={{ flex: 1 }}>
                  <Box
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize="base"
                    color="text"
                    style={{ marginBottom: '4px' }}
                  >
                    {entry.role}
                  </Box>
                  <Box
                    fontFamily="body"
                    fontWeight="400"
                    fontSize="sm"
                    color="textSecondary"
                    style={{ marginBottom: '8px' }}
                  >
                    {entry.company}
                  </Box>
                  <Box
                    fontFamily="body"
                    fontWeight="300"
                    fontSize="sm"
                    color="textMuted"
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
            <Box style={{ paddingTop: '32px' }}>
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="2xs"
                color="textMuted"
                letterSpacing="widest"
                style={{ textTransform: 'uppercase', marginBottom: '16px' }}
              >
                Education
              </Box>
              <Flex gap="6">
                <Box
                  fontFamily="body"
                  fontWeight="400"
                  fontSize="xs"
                  color="textMuted"
                  style={{ minWidth: '50px', flexShrink: 0 }}
                >
                  {education.years}
                </Box>
                <Box>
                  <Box
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize="base"
                    color="text"
                    style={{ marginBottom: '4px' }}
                  >
                    {education.degree}
                  </Box>
                  <Box
                    fontFamily="body"
                    fontWeight="400"
                    fontSize="sm"
                    color="textSecondary"
                    style={{ marginBottom: '4px' }}
                  >
                    {education.school}
                  </Box>
                  {education.concentration && (
                    <Box
                      fontFamily="body"
                      fontWeight="300"
                      fontSize="sm"
                      color="textMuted"
                    >
                      {education.concentration}
                    </Box>
                  )}
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Box>

      {/* ─── Capabilities ─── */}
      <Box
        as="section"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '80px 48px',
        }}
      >
        <Flex
          align="center"
          style={{
            borderBottom: '1px solid #c9d5c4',
            paddingBottom: '16px',
            marginBottom: '32px',
          }}
        >
          <Box
            fontFamily="body"
            fontWeight="400"
            fontSize="2xs"
            color="textMuted"
            letterSpacing="widest"
            style={{ textTransform: 'uppercase' }}
          >
            Capabilities
          </Box>
        </Flex>

        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {capabilities.map((cap) => (
            <Box
              key={cap}
              fontFamily="body"
              fontWeight="400"
              fontSize="xs"
              color="textSecondary"
              style={{
                padding: '6px 12px',
                background: '#eaf0e6',
                border: '1px solid #c9d5c4',
                borderRadius: '0px',
                letterSpacing: '0.02em',
              }}
            >
              {cap}
            </Box>
          ))}
        </Box>
      </Box>

      {/* ─── Personal ─── */}
      <Box
        as="section"
        style={{
          background: '#eaf0e6',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          style={{
            maxWidth: '760px',
            width: '100%',
            padding: '80px 48px',
          }}
        >
          <Flex
            align="center"
            style={{
              borderBottom: '1px solid #c9d5c4',
              paddingBottom: '16px',
              marginBottom: '32px',
            }}
          >
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase' }}
            >
              Off the Clock
            </Box>
          </Flex>

          <VStack gap="0" align="stretch">
            <Flex
              style={{
                padding: '16px 0',
                borderBottom: '1px solid #c9d5c4',
              }}
              gap="6"
            >
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="xs"
                color="textMuted"
                style={{ minWidth: '120px', flexShrink: 0 }}
              >
                Current Focus
              </Box>
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="sm"
                color="textSecondary"
              >
                {personal.currentFocus}
              </Box>
            </Flex>

            <Flex
              style={{
                padding: '16px 0',
                borderBottom: '1px solid #c9d5c4',
              }}
              gap="6"
            >
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="xs"
                color="textMuted"
                style={{ minWidth: '120px', flexShrink: 0 }}
              >
                Sport
              </Box>
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="sm"
                color="textSecondary"
              >
                {personal.sport}
              </Box>
            </Flex>

            {personal.holesInOne > 0 && (
              <Flex
                style={{
                  padding: '16px 0',
                  borderBottom: '1px solid #c9d5c4',
                }}
                gap="6"
              >
                <Box
                  fontFamily="body"
                  fontWeight="400"
                  fontSize="xs"
                  color="textMuted"
                  style={{ minWidth: '120px', flexShrink: 0 }}
                >
                  Holes in One
                </Box>
                <Box
                  fontFamily="heading"
                  fontWeight="600"
                  fontSize="sm"
                  color="accent"
                >
                  {personal.holesInOne}
                </Box>
              </Flex>
            )}

            <Flex
              style={{
                padding: '16px 0',
              }}
              gap="6"
            >
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="xs"
                color="textMuted"
                style={{ minWidth: '120px', flexShrink: 0 }}
              >
                Teams
              </Box>
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="sm"
                color="textSecondary"
              >
                {personal.teams.join(', ')}
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Box>

      {/* ─── Footer ─── */}
      <Box
        as="footer"
        style={{
          background: '#2a322a',
          padding: '48px 48px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ maxWidth: '760px', width: '100%' }}
        >
          <a
            href="/"
            className={css({
              fontFamily: 'heading',
              fontSize: 'xs',
              letterSpacing: 'wider',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              _hover: { color: 'accentLight' },
            })}
            style={{ color: '#a3b49d' }}
          >
            ← Work
          </a>
          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="xs"
            style={{ color: '#596658' }}
          >
            © 2026 Doug March
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}