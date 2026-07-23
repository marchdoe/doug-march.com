import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { SmallCaps, TileBox, Chip } from '../components/Tile'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  const words = identity.statement.split(' ')
  const last = words.pop()

  return (
    <Grid
      gridTemplateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }}
      gridAutoRows={{ md: 'minmax(72px, auto)' }}
      gap={{ base: '4', md: '6' }}
    >
      {/* STATEMENT HERO */}
      <Box
        className={css({ gridColumn: { md: '1 / 9' }, gridRow: { md: '1 / 4' } })}
        background="radial-gradient(120% 120% at 22% 12%, {colors.brand.600} 0%, {colors.brand.800} 55%, {colors.brand.900} 100%)"
        border="1px solid"
        borderColor="border"
        borderRadius="lg"
        padding={{ base: '6', md: '10' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minH={{ base: '36vh', md: '40vh' }}
        gap="6"
      >
        <SmallCaps color="accentGlow">{identity.role}</SmallCaps>
        <Box
          as="h1"
          fontFamily="display"
          fontSize="clamp(48px, 8vw, 96px)"
          lineHeight="tight"
          letterSpacing="tight"
          textTransform="uppercase"
          color="text"
        >
          {words.join(' ')}{' '}
          <Box as="span" color="accentGlow">
            {last}
          </Box>
        </Box>
        <Box fontSize="sm" color="textSecondary" maxW="60ch" lineHeight="loose">
          {identity.name}
        </Box>
      </Box>

      {/* THE CHARGE — personal signals */}
      <TileBox
        background="surfaceQuiet"
        className={css({ gridColumn: { md: '9 / 13' }, gridRow: { md: '1 / 4' } })}
        display="flex"
        flexDirection="column"
        gap="5"
      >
        <SmallCaps color="accentGlow">The charge</SmallCaps>
        <Box borderTop="1px solid" borderColor="border" paddingTop="3">
          <SmallCaps>Holes in one</SmallCaps>
          <Box fontFamily="display" fontSize="3xl" color="text" letterSpacing="normal">
            {personal.holesInOne}
          </Box>
        </Box>
        <Box borderTop="1px solid" borderColor="border" paddingTop="3">
          <SmallCaps>Sport</SmallCaps>
          <Box fontSize="sm" color="textSecondary" mt="1">
            {personal.sport}
          </Box>
        </Box>
        <Box borderTop="1px solid" borderColor="border" paddingTop="3">
          <SmallCaps>Teams</SmallCaps>
          <Box fontSize="sm" color="textSecondary" mt="1">
            {personal.teams.join(' · ')}
          </Box>
        </Box>
        <Box borderTop="1px solid" borderColor="border" paddingTop="3">
          <SmallCaps>Current focus</SmallCaps>
          <Box fontSize="sm" color="textSecondary" mt="1" lineHeight="loose">
            {personal.currentFocus}
          </Box>
        </Box>
      </TileBox>

      {/* TIMELINE */}
      <TileBox
        background="surfaceQuiet"
        className={css({ gridColumn: { md: '1 / 9' }, gridRow: { md: '4 / 10' } })}
        display="flex"
        flexDirection="column"
        gap="4"
      >
        <SmallCaps color="accentGlow">Timeline</SmallCaps>
        {timeline.map((t) => (
          <Flex
            key={t.year + t.role}
            gap="4"
            borderTop="1px solid"
            borderColor="border"
            paddingTop="3"
            align="baseline"
            wrap="wrap"
          >
            <Box
              fontSize="sm"
              color="accentGlow"
              fontVariantNumeric="tabular-nums"
              flex={{ md: '0 0 120px' }}
              minW={{ md: '120px' }}
            >
              {t.year}
            </Box>
            <Box flex="1" minW="200px">
              <Box fontWeight="bold" fontSize="sm" color="text">
                {t.role} · {t.company}
                {t.current ? ' — current' : ''}
              </Box>
              <Box fontSize="sm" color="textSecondary" lineHeight="loose" mt="1">
                {t.description}
              </Box>
            </Box>
          </Flex>
        ))}
      </TileBox>

      {/* EDUCATION */}
      <TileBox
        className={css({ gridColumn: { md: '9 / 13' }, gridRow: { md: '4 / 6' } })}
        display="flex"
        flexDirection="column"
        gap="3"
      >
        <SmallCaps color="accentGlow">Education</SmallCaps>
        <Box>
          <Box fontWeight="bold" fontSize="sm" color="text">
            {education.school}
          </Box>
          <Box fontSize="sm" color="textSecondary" mt="1">
            {education.degree} · {education.concentration}
          </Box>
          <Box fontSize="xs" color="textMuted" letterSpacing="wide" mt="1" fontVariantNumeric="tabular-nums">
            {education.years}
          </Box>
        </Box>
      </TileBox>

      {/* CAPABILITIES */}
      <TileBox
        className={css({ gridColumn: { md: '9 / 13' }, gridRow: { md: '6 / 10' } })}
        background="surfaceQuiet"
        display="flex"
        flexDirection="column"
        gap="4"
      >
        <SmallCaps color="accentGlow">Capabilities</SmallCaps>
        <Flex wrap="wrap" gap="3">
          {capabilities.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </Flex>
      </TileBox>
    </Grid>
  )
}