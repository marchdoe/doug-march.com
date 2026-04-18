import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

const frameBase = css({
  background: '#EDEFD9',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '16px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
  transition: 'background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
  _hover: {
    background: '#E4E6CC',
    borderColor: '{colors.neutral.300}',
    boxShadow: '0 4px 24px rgba(38, 43, 29, 0.10)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const frameMd = css({
  background: '#EDEFD9',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '12px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
  transition: 'background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out',
  _hover: {
    background: '#E4E6CC',
    borderColor: '{colors.neutral.300}',
    boxShadow: '0 4px 24px rgba(38, 43, 29, 0.10)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const galleryGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '24px',
  padding: '48px',
  maxWidth: '1320px',
  margin: '0 auto',
  alignItems: 'start',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(6, 1fr)',
    padding: '24px',
    gap: '16px',
  },
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    padding: '16px',
    gap: '16px',
  },
})

const sectionLabel = css({
  fontSize: '12px',
  fontFamily: 'Outfit, sans-serif',
  fontWeight: '500',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: '{colors.neutral.400}',
  marginBottom: '24px',
})

function AboutPage() {
  return (
    <div className={galleryGrid}>
      {/* Identity Frame */}
      <div
        className={css({
          gridColumn: '1 / 8',
          '@media (max-width: 1024px)': { gridColumn: '1 / -1' },
        })}
      >
        <Box className={frameBase} padding="48px">
          <Box
            fontSize="37px"
            fontFamily="Fraunces, serif"
            fontWeight="400"
            lineHeight="1.15"
            letterSpacing="0.04em"
            color="{colors.neutral.700}"
            marginBottom="16px"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            {identity.name}
          </Box>
          <Box
            fontSize="21px"
            fontFamily="Outfit, sans-serif"
            color="{colors.neutral.500}"
            marginBottom="16px"
            lineHeight="1.15"
          >
            {identity.role}
          </Box>
          <Box
            width="48px"
            height="1px"
            background="{colors.accent.DEFAULT}"
            marginBottom="24px"
          />
          <Box
            fontSize="16px"
            fontFamily="Outfit, sans-serif"
            lineHeight="1.58"
            color="{colors.neutral.500}"
            maxWidth="60ch"
          >
            {identity.statement}
          </Box>
        </Box>
      </div>

      {/* Personal Frame */}
      <div
        className={css({
          gridColumn: '8 / 13',
          '@media (max-width: 1024px)': { gridColumn: '1 / -1' },
        })}
      >
        <Box className={frameMd} padding="32px">
          <Box className={sectionLabel}>Personal</Box>
          <Box marginBottom="16px">
            <Box fontSize="14px" fontFamily="Outfit, sans-serif" color="{colors.neutral.400}" letterSpacing="0.08em" marginBottom="4px">
              Sport
            </Box>
            <Box fontSize="16px" color="{colors.neutral.700}">{personal.sport}</Box>
          </Box>
          <Box marginBottom="16px">
            <Box fontSize="14px" fontFamily="Outfit, sans-serif" color="{colors.neutral.400}" letterSpacing="0.08em" marginBottom="4px">
              Holes in One
            </Box>
            <Box fontSize="28px" fontFamily="Fraunces, serif" color="{colors.neutral.700}" style={{ fontVariationSettings: "'opsz' 36" }}>
              {personal.holesInOne}
            </Box>
          </Box>
          <Box marginBottom="16px">
            <Box fontSize="14px" fontFamily="Outfit, sans-serif" color="{colors.neutral.400}" letterSpacing="0.08em" marginBottom="4px">
              Teams
            </Box>
            <Box fontSize="16px" color="{colors.neutral.700}" lineHeight="1.58">
              {personal.teams.join(', ')}
            </Box>
          </Box>
          <Box>
            <Box fontSize="14px" fontFamily="Outfit, sans-serif" color="{colors.neutral.400}" letterSpacing="0.08em" marginBottom="4px">
              Current Focus
            </Box>
            <Box fontSize="16px" color="{colors.neutral.500}" lineHeight="1.58">
              {personal.currentFocus}
            </Box>
          </Box>
        </Box>
      </div>

      {/* Timeline Frame */}
      <div
        className={css({
          gridColumn: '1 / 8',
          '@media (max-width: 1024px)': { gridColumn: '1 / -1' },
        })}
      >
        <Box className={frameBase} padding="48px">
          <Box className={sectionLabel}>Experience</Box>
          {timeline.map((entry, i) => (
            <Flex
              key={entry.year + entry.company}
              gap="24px"
              paddingY="16px"
              borderBottom={i < timeline.length - 1 ? '1px solid' : 'none'}
              borderColor="{colors.neutral.200}"
              flexWrap={{ base: 'wrap', md: 'nowrap' }}
            >
              <Box
                fontSize="14px"
                fontFamily="Outfit, sans-serif"
                fontWeight="400"
                color="{colors.neutral.400}"
                letterSpacing="0.08em"
                minWidth="120px"
                flexShrink={0}
              >
                {entry.year}
              </Box>
              <Box flex="1" minWidth="0">
                <Box fontSize="16px" fontWeight="500" color="{colors.neutral.700}" marginBottom="2px">
                  {entry.role}
                </Box>
                <Box fontSize="14px" color="{colors.neutral.500}" marginBottom="4px">
                  {entry.company}
                </Box>
                <Box fontSize="14px" color="{colors.neutral.400}" lineHeight="1.58">
                  {entry.description}
                </Box>
              </Box>
            </Flex>
          ))}
        </Box>
      </div>

      {/* Capabilities Frame */}
      <div
        className={css({
          gridColumn: '8 / 13',
          '@media (max-width: 1024px)': { gridColumn: '1 / -1' },
        })}
      >
        <Box className={frameMd} padding="32px">
          <Box className={sectionLabel}>Capabilities</Box>
          <Flex gap="8px" flexWrap="wrap">
            {capabilities.map((cap) => (
              <Box
                key={cap}
                fontSize="14px"
                fontFamily="Outfit, sans-serif"
                color="{colors.neutral.500}"
                padding="6px 12px"
                background="rgba(110, 158, 42, 0.09)"
                borderRadius="4px"
                letterSpacing="0.04em"
              >
                {cap}
              </Box>
            ))}
          </Flex>
        </Box>
      </div>

      {/* Education Frame */}
      <div
        className={css({
          gridColumn: '8 / 13',
          '@media (max-width: 1024px)': { gridColumn: '1 / -1' },
        })}
      >
        <Box className={frameMd} padding="32px">
          <Box className={sectionLabel}>Education</Box>
          <Box fontSize="16px" fontWeight="500" color="{colors.neutral.700}" marginBottom="4px">
            {education.school}
          </Box>
          <Box fontSize="14px" color="{colors.neutral.500}" marginBottom="4px">
            {education.degree} — {education.concentration}
          </Box>
          <Box fontSize="14px" color="{colors.neutral.400}" letterSpacing="0.08em">
            {education.years}
          </Box>
        </Box>
      </div>

      {/* Footer */}
      <div
        className={css({
          gridColumn: '1 / 13',
          '@media (max-width: 1024px)': { gridColumn: '1 / -1' },
        })}
      >
        <Flex
          justify="space-between"
          align="center"
          paddingTop="48px"
          paddingBottom="32px"
          fontSize="12px"
          fontFamily="Outfit, sans-serif"
          letterSpacing="0.08em"
          color="{colors.neutral.400}"
          flexWrap="wrap"
          gap="16px"
        >
          <Box>© 2026 Doug March</Box>
          <a
            href="/archive"
            className={css({
              color: '{colors.neutral.400}',
              textDecoration: 'none',
              fontSize: '12px',
              padding: '4px',
              _hover: { color: '{colors.accent.DEFAULT}' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: '4px' },
            })}
          >
            Archive
          </a>
        </Flex>
      </div>
    </div>
  )
}