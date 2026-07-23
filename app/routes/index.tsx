import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { capabilities } from '../content/timeline'
import { SmallCaps, TileBox, LinkArrow, Chip, WRow } from '../components/Tile'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <Grid
      gridTemplateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }}
      gridAutoRows={{ md: 'minmax(72px, auto)' }}
      gap={{ base: '4', md: '6' }}
    >
      {/* HERO */}
      <Box
        className={css({
          gridColumn: { md: '1 / 9' },
          gridRow: { md: '1 / 5' },
        })}
        background="radial-gradient(120% 120% at 22% 12%, {colors.brand.600} 0%, {colors.brand.800} 55%, {colors.brand.900} 100%)"
        border="1px solid"
        borderColor="border"
        borderRadius="lg"
        padding={{ base: '6', md: '10' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minH={{ base: '48vh', md: '56vh' }}
        gap="8"
      >
        <SmallCaps color="accentGlow">Daily manifesto · 23 July 2026</SmallCaps>
        <Box
          as="h1"
          fontFamily="display"
          fontSize="clamp(64px, 12vw, 190px)"
          lineHeight="tight"
          letterSpacing="tight"
          textTransform="uppercase"
          color="text"
        >
          Passion&nbsp;is
          <Box as="span" display="block" color="accentGlow">
            Energy
          </Box>
        </Box>
        <Flex wrap="wrap" gap="6" align="flex-end" justify="space-between">
          <Box fontSize="sm" color="textSecondary" maxW="38ch" lineHeight="loose">
            A portfolio that tears itself down and rebuilds every dawn out of nothing but
            enthusiasm. Today the current runs electric ultramarine.
          </Box>
          <LinkArrow href="#work">See the work ↗</LinkArrow>
        </Flex>
      </Box>

      {/* QUOTE */}
      <TileBox
        className={css({ gridColumn: { md: '9 / 13' }, gridRow: { md: '1 / 3' } })}
        background="surfaceQuiet"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="6"
      >
        <SmallCaps color="accentGlow">The full charge</SmallCaps>
        <Box
          as="blockquote"
          margin="0"
          fontFamily="body"
          fontWeight="medium"
          fontStyle="italic"
          fontSize="lg"
          lineHeight="normal"
          color="text"
        >
          &ldquo;Feel the power that comes from focusing on what excites you.&rdquo;
        </Box>
        <SmallCaps color="accentGlow">— Oprah Winfrey</SmallCaps>
      </TileBox>

      {/* CHARGE / SIGNALS */}
      <TileBox
        id="charge"
        className={css({ gridColumn: { md: '9 / 13' }, gridRow: { md: '3 / 8' } })}
        background="surfaceQuiet"
        display="flex"
        flexDirection="column"
        gap="6"
      >
        <SmallCaps color="accentGlow">The day's charge</SmallCaps>

        <Box borderTop="1px solid" borderColor="border" paddingTop="4">
          <SmallCaps>Detroit Tigers · win</SmallCaps>
          <Box fontFamily="display" fontSize="2xl" lineHeight="snug" letterSpacing="normal">
            <Box as="span" color="accentGlow">
              5
            </Box>{' '}
            <Box as="span" color="textMuted" fontSize="0.6em">
              –
            </Box>{' '}
            <Box as="span" color="textMuted">
              1
            </Box>
          </Box>
          <Box fontSize="sm" color="textSecondary" lineHeight="loose" mt="1" fontVariantNumeric="tabular-nums">
            DET 5 · OPP 1 · W — a small win, celebrated.
          </Box>
        </Box>

        <Box borderTop="1px solid" borderColor="border" paddingTop="4">
          <SmallCaps>On heavy rotation</SmallCaps>
          <Box fontSize="sm" color="textSecondary" lineHeight="loose" mt="1">
            Tobin Sprout
            <br />
            The War on Drugs
          </Box>
        </Box>

        <Box borderTop="1px solid" borderColor="border" paddingTop="4">
          <SmallCaps>Moon · waxing gibbous</SmallCaps>
          <Flex align="center" gap="3" mt="2">
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="15" fill="var(--brand900, #131a4d)" stroke="var(--brand500, #3550dd)" strokeWidth="1" />
              <path d="M17 2a15 15 0 0 1 0 30 11 15 0 0 0 0-30Z" fill="var(--accent100, #d3ddff)" />
            </svg>
            <Box fontFamily="display" fontSize="xl" color="text" letterSpacing="normal">
              71%
            </Box>
          </Flex>
        </Box>
      </TileBox>

      {/* FEATURED */}
      <TileBox
        id="featured"
        className={css({ gridColumn: { md: '1 / 5' }, gridRow: { md: '5 / 8' } })}
        display="flex"
        flexDirection="column"
        gap="6"
        justifyContent="space-between"
      >
        {featuredProject && (
          <>
            <Box>
              <SmallCaps color="accentGlow">
                Featured project · {featuredProject.year}
              </SmallCaps>
              <Box
                as="h3"
                fontFamily="display"
                fontSize="4xl"
                letterSpacing="normal"
                textTransform="uppercase"
                color="text"
                lineHeight="tight"
                mt="2"
              >
                {featuredProject.title}
              </Box>
            </Box>
            <Box fontSize="sm" lineHeight="loose" color="textSecondary" maxW="40ch">
              {featuredProject.problem}
            </Box>
            {featuredProject.externalUrl && (
              <LinkArrow href={featuredProject.externalUrl} target="_blank" rel="noopener">
                Visit {featuredProject.title} ↗
              </LinkArrow>
            )}
          </>
        )}
      </TileBox>

      {/* WORK DIRECTORY */}
      <TileBox
        id="work"
        background="surfaceQuiet"
        className={css({ gridColumn: { md: '5 / 9' }, gridRow: { md: '5 / 8' } })}
        display="flex"
        flexDirection="column"
        gap="4"
      >
        <SmallCaps color="accentGlow">Selected work</SmallCaps>
        {selectedWork.map((p) => (
          <WRow key={p.slug} href={`/work/${p.slug}`}>
            <Box fontWeight="bold" fontSize="sm" color="text">
              {p.title}
            </Box>
            <Box fontSize="xs" color="textMuted" letterSpacing="wide" textTransform="uppercase" fontVariantNumeric="tabular-nums">
              {p.type} · {p.year}
            </Box>
          </WRow>
        ))}

        <SmallCaps color="accentGlow" mt="4">
          Experiments
        </SmallCaps>
        {experiments.map((p) => (
          <WRow
            key={p.slug}
            href={p.externalUrl ?? `/work/${p.slug}`}
            target={p.externalUrl ? '_blank' : undefined}
            rel={p.externalUrl ? 'noopener' : undefined}
          >
            <Box fontWeight="bold" fontSize="sm" color="text">
              {p.title}
            </Box>
            <Box fontSize="xs" color="textMuted" letterSpacing="wide" textTransform="uppercase" fontVariantNumeric="tabular-nums">
              {p.type} · {p.year}
            </Box>
          </WRow>
        ))}
      </TileBox>

      {/* CAPABILITIES */}
      <TileBox
        className={css({ gridColumn: { md: '1 / 7' }, gridRow: { md: '8 / 9' } })}
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