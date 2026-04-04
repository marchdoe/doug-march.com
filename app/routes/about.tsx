import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { timeline, capabilities, education } from '../content/timeline'
import { identity, personal } from '../content/about'

export const Route = createFileRoute('/about')({ component: AboutPage })

function SectionLabel({ children }: { children: string }) {
  return (
    <Box
      fontFamily="body"
      fontSize="xs"
      color="text-muted"
      style={{
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: '32px',
      }}
    >
      {children}
    </Box>
  )
}

function AboutPage() {
  return (
    <Box>
      {/* ── Hero / Identity ── */}
      <Box
        as="section"
        style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #E5DFC8',
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <Box
            fontFamily="body"
            fontSize="xs"
            color="text-muted"
            style={{
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: '28px',
            }}
          >
            About
          </Box>

          <Box
            fontFamily="serif"
            fontSize="xl"
            style={{
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#120D09',
              marginBottom: '28px',
            }}
          >
            {identity.name}
          </Box>

          <Box
            fontFamily="body"
            fontSize="base"
            color="text-secondary"
            style={{
              lineHeight: '1.65',
              letterSpacing: '0.04em',
              maxWidth: '560px',
            }}
          >
            {identity.statement}
          </Box>
        </Box>
      </Box>

      {/* ── Experience / Timeline ── */}
      <Box as="section" style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <SectionLabel>Experience</SectionLabel>

          {timeline.map((entry, i) => (
            <Box
              key={`${entry.year}-${entry.company}-${i}`}
              style={{
                paddingTop: '28px',
                paddingBottom: '28px',
                borderBottom: '1px solid #E5DFC8',
                display: 'flex',
                gap: '32px',
              }}
            >
              {/* Year column — fixed width so all years align */}
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{
                  minWidth: '120px',
                  flexShrink: '0',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '0.04em',
                  paddingTop: '3px',
                  lineHeight: '1.4',
                }}
              >
                {entry.year}
              </Box>

              {/* Content column */}
              <Box style={{ flex: '1', minWidth: '0' }}>
                <Flex align="center" style={{ gap: '10px', marginBottom: '4px' }}>
                  <Box
                    fontFamily="serif"
                    fontSize="sm"
                    style={{
                      fontWeight: '700',
                      lineHeight: '1.2',
                      color: '#120D09',
                    }}
                  >
                    {entry.role}
                  </Box>
                  {entry.current && (
                    <Box
                      fontFamily="body"
                      fontSize="2xs"
                      color="accent"
                      style={{
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        border: '1px solid #6A9D51',
                        borderRadius: '3px',
                        padding: '1px 6px',
                      }}
                    >
                      Now
                    </Box>
                  )}
                </Flex>

                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-secondary"
                  style={{
                    letterSpacing: '0.04em',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}
                >
                  {entry.company}
                </Box>

                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-muted"
                  style={{
                    lineHeight: '1.65',
                    letterSpacing: '0.04em',
                  }}
                >
                  {entry.description}
                </Box>
              </Box>
            </Box>
          ))}

          {/* Education row */}
          <Box
            style={{
              paddingTop: '28px',
              paddingBottom: '28px',
              display: 'flex',
              gap: '32px',
            }}
          >
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-muted"
              style={{
                minWidth: '120px',
                flexShrink: '0',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.04em',
                paddingTop: '3px',
              }}
            >
              {education.years}
            </Box>
            <Box style={{ flex: '1', minWidth: '0' }}>
              <Box
                fontFamily="serif"
                fontSize="sm"
                style={{
                  fontWeight: '700',
                  lineHeight: '1.2',
                  color: '#120D09',
                  marginBottom: '4px',
                }}
              >
                {education.degree}
              </Box>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-secondary"
                style={{ fontWeight: '600', marginBottom: '4px', letterSpacing: '0.04em' }}
              >
                {education.school}
              </Box>
              {education.concentration && (
                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-muted"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {education.concentration}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Capabilities ── */}
      <Box as="section" style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <SectionLabel>Capabilities</SectionLabel>

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
                fontSize="xs"
                color="text-secondary"
                style={{
                  padding: '6px 14px',
                  border: '1px solid #E5DFC8',
                  borderRadius: '3px',
                  backgroundColor: '#FAFAF4',
                  letterSpacing: '0.04em',
                  lineHeight: '1.4',
                }}
              >
                {cap}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── Personal ── */}
      <Box as="section" backgroundColor="card-bg" style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '96px 48px',
          }}
        >
          <SectionLabel>Outside Work</SectionLabel>

          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
            }}
          >
            <Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: '600',
                }}
              >
                Sport
              </Box>
              <Box
                fontFamily="serif"
                fontSize="sm"
                style={{ fontWeight: '400', color: '#3A3228', lineHeight: '1.4' }}
              >
                {personal.sport}
              </Box>
            </Box>

            <Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: '600',
                }}
              >
                Holes in One
              </Box>
              <Flex align="baseline" style={{ gap: '8px' }}>
                <Box
                  fontFamily="serif"
                  fontSize="lg"
                  style={{
                    fontWeight: '700',
                    color: '#6A9D51',
                    lineHeight: '1',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {personal.holesInOne}
                </Box>
                <Box
                  fontFamily="body"
                  fontSize="xs"
                  color="text-muted"
                  style={{ letterSpacing: '0.04em' }}
                >
                  career
                </Box>
              </Flex>
            </Box>

            <Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: '600',
                }}
              >
                Teams
              </Box>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-secondary"
                style={{ lineHeight: '1.65', letterSpacing: '0.04em' }}
              >
                {personal.teams.join(', ')}
              </Box>
            </Box>

            <Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: '600',
                }}
              >
                Current Focus
              </Box>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-secondary"
                style={{ lineHeight: '1.65', letterSpacing: '0.04em' }}
              >
                {personal.currentFocus}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box as="footer">
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '64px 48px',
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: '20px' }}
          >
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-secondary"
              style={{ letterSpacing: '0.04em' }}
            >
              Doug March
            </Box>
            <Flex style={{ gap: '24px' }}>
              <a href="/" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                <Box fontFamily="body" fontSize="xs" color="text-muted">Home</Box>
              </a>
              <a href="/archive" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                <Box fontFamily="body" fontSize="xs" color="text-muted">Archive</Box>
              </a>
            </Flex>
          </Flex>

          <Box style={{ borderTop: '1px solid #E5DFC8', paddingTop: '16px' }}>
            <Flex justify="space-between" align="center">
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{ letterSpacing: '0.04em' }}
              >
                © 2026 Doug March
              </Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}
              >
                Valero Texas Open — R. MacIntyre −14
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}