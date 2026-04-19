import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <Box display="flex" flexDirection="column" width="100%">
      {/* Identity Beat */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="160"
        paddingBottom="96"
      >
        <Box
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 5vw, 50px)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#3E3028',
            marginBottom: '16px',
          }}
        >
          {identity.name}
        </Box>
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '21px',
            fontWeight: 400,
            color: '#5C4A3E',
            marginBottom: '32px',
          }}
        >
          {identity.role}
        </Box>
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.65,
            color: '#5C4A3E',
            maxWidth: '600px',
          }}
        >
          {identity.statement}
        </Box>
      </Box>

      {/* Timeline Beat */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="64"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Experience
        </Box>
        <VStack gap="0" alignItems="stretch">
          {timeline.map((entry, i) => (
            <Flex
              key={entry.year + entry.company}
              gap="24"
              paddingY="16"
              style={{
                borderBottom: i < timeline.length - 1 ? '1px solid rgba(228, 217, 208, 0.6)' : 'none',
                alignItems: 'baseline',
              }}
            >
              <Box
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#A89080',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: '120px',
                  flexShrink: 0,
                  letterSpacing: '0.05em',
                }}
              >
                {entry.year}
              </Box>
              <Box flex="1">
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#3E3028',
                  }}
                >
                  {entry.role}
                </Box>
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#7A6558',
                    marginTop: '4px',
                  }}
                >
                  {entry.company}
                </Box>
                <Box
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: '#7A6558',
                    marginTop: '8px',
                    maxWidth: '520px',
                  }}
                >
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Education Beat */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="64"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Education
        </Box>
        <Flex gap="24" alignItems="baseline">
          <Box
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              color: '#A89080',
              fontVariantNumeric: 'tabular-nums',
              minWidth: '120px',
              flexShrink: 0,
              letterSpacing: '0.05em',
            }}
          >
            {education.years}
          </Box>
          <Box>
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                fontWeight: 500,
                color: '#3E3028',
              }}
            >
              {education.school}
            </Box>
            <Box
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                color: '#7A6558',
                marginTop: '4px',
              }}
            >
              {education.degree} · {education.concentration}
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Capabilities Beat */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="64"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Capabilities
        </Box>
        <Flex gap="8" flexWrap="wrap">
          {capabilities.map(cap => (
            <Box
              key={cap}
              paddingX="16"
              paddingY="8"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#7A6558',
                letterSpacing: '0.05em',
                backgroundColor: '#F3EDE8',
                borderRadius: '3px',
                border: '1px solid #E4D9D0',
              }}
            >
              {cap}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Personal Beat */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingY="64"
        paddingBottom="96"
      >
        <Box
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Personal
        </Box>
        <VStack gap="0" alignItems="stretch">
          <Flex
            justifyContent="space-between"
            paddingY="12"
            style={{ borderBottom: '1px solid rgba(228, 217, 208, 0.6)' }}
          >
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 400, color: '#7A6558' }}>
              Holes in One
            </Box>
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3E3028', fontVariantNumeric: 'tabular-nums' }}>
              {personal.holesInOne}
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            paddingY="12"
            style={{ borderBottom: '1px solid rgba(228, 217, 208, 0.6)' }}
          >
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 400, color: '#7A6558' }}>
              Sport
            </Box>
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3E3028' }}>
              {personal.sport}
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            paddingY="12"
            style={{ borderBottom: '1px solid rgba(228, 217, 208, 0.6)' }}
          >
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 400, color: '#7A6558' }}>
              Teams
            </Box>
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3E3028' }}>
              {personal.teams.join(', ')}
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            paddingY="12"
          >
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 400, color: '#7A6558' }}>
              Current Focus
            </Box>
            <Box style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px', fontWeight: 500, color: '#3E3028', textAlign: 'right', maxWidth: '400px' }}>
              {personal.currentFocus}
            </Box>
          </Flex>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        width="100%"
        maxWidth="760px"
        marginX="auto"
        paddingX="48"
        paddingTop="48"
        paddingBottom="96"
        style={{ borderTop: '1px solid #E4D9D0' }}
      >
        <Flex
          justifyContent="space-between"
          alignItems="baseline"
          flexWrap="wrap"
          gap="16"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A89080',
          }}
        >
          <span>© 2026 Doug March</span>
          <a
            href="/archive"
            className={css({
              color: 'text-placeholder',
              textDecoration: 'none',
              padding: '4',
              _hover: { color: 'accent' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </Flex>
      </Box>
    </Box>
  )
}