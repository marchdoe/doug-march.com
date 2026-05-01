import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex, Grid } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Quote Zone — Full-width dark band (Specimen puncture) */}
      <Box
        width="100%"
        background="{colors.neutral.800}"
        borderBottom="1px solid {colors.neutral.700}"
      >
        <Box
          maxW="1200px"
          mx="auto"
          px={{ base: '24', md: '48', lg: '120' }}
          py={{ base: '40', md: '64' }}
          minHeight={{ base: 'auto', md: '240px' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            fontFamily="heading"
            fontWeight="300"
            fontSize={{ base: '24px', md: '32px', lg: '37px' }}
            lineHeight="tight"
            letterSpacing="tight"
            color="{colors.neutral.50}"
            maxW="720px"
            mb="24"
          >
            The future is no more uncertain than the present.
          </Box>
          <Box
            fontFamily="body"
            fontSize="12px"
            letterSpacing="wider"
            color="{colors.accent.DEFAULT}"
          >
            — Walt Whitman
          </Box>
        </Box>
      </Box>

      {/* Broadsheet Grid */}
      <Box maxW="1200px" mx="auto" px={{ base: '16', md: '32', lg: '48' }} width="100%">
        <Grid
          gridTemplateColumns={{ base: '1fr', md: '1fr 1fr', lg: '2fr 1fr 1fr' }}
          columnGap="0"
        >
          {/* Column 1: Primary — Featured + Selected Work */}
          <Box
            py="40"
            pr={{ base: '0', lg: '32' }}
            borderRight={{ base: 'none', lg: '1px solid {colors.neutral.200}' }}
          >
            {/* Featured Project */}
            {featuredProject && (
              <Box mb="40" pb="32" borderBottom="1px solid {colors.neutral.800}">
                <Box
                  fontFamily="heading"
                  fontSize="9px"
                  letterSpacing="widest"
                  color="{colors.neutral.500}"
                  textTransform="uppercase"
                  mb="16"
                >
                  Featured
                </Box>
                <a
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  target={featuredProject.externalUrl ? '_blank' : undefined}
                  rel={featuredProject.externalUrl ? 'noopener noreferrer' : undefined}
                  className={css({
                    textDecoration: 'none',
                    display: 'block',
                    _hover: { '& .feat-title': { color: '{colors.accent.DEFAULT}' } },
                    _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '4px' },
                  })}
                >
                  <Box
                    className="feat-title"
                    fontFamily="heading"
                    fontWeight="700"
                    fontSize={{ base: '28px', md: '37px' }}
                    lineHeight="snug"
                    letterSpacing="tight"
                    color="{colors.neutral.800}"
                    mb="16"
                  >
                    {featuredProject.title}
                  </Box>
                </a>
                <Box
                  fontFamily="body"
                  fontSize="16px"
                  lineHeight="normal"
                  color="{colors.neutral.600}"
                  maxW="520px"
                >
                  {featuredProject.problem}
                </Box>
                <Flex mt="16" gap="16" align="center">
                  <Box fontFamily="body" fontSize="12px" letterSpacing="wide" color="{colors.neutral.500}">
                    {featuredProject.type}
                  </Box>
                  <Box fontFamily="mono" fontSize="12px" color="{colors.neutral.400}">
                    {featuredProject.year}
                  </Box>
                </Flex>
              </Box>
            )}

            {/* Selected Work */}
            <Box>
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="16"
                pb="8"
                borderBottom="1px solid {colors.neutral.800}"
              >
                Selected Work
              </Box>
              {selectedWork.map((project, i) => (
                <a
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    py: '12',
                    borderBottom: '1px solid {colors.neutral.100}',
                    textDecoration: 'none',
                    gap: '16',
                    minHeight: '44px',
                    _hover: {
                      background: '{colors.neutral.100}',
                      '& .work-num': { color: '{colors.accent.DEFAULT}' },
                    },
                    _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
                  })}
                >
                  <Flex align="baseline" gap="12">
                    <Box
                      className="work-num"
                      fontFamily="heading"
                      fontWeight="700"
                      fontSize="16px"
                      color="{colors.neutral.300}"
                      fontVariantNumeric="tabular-nums"
                      minW="24px"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Box>
                    <Box fontFamily="body" fontSize="16px" fontWeight="500" color="{colors.neutral.800}">
                      {project.title}
                    </Box>
                  </Flex>
                  <Flex gap="16" fontSize="12px" color="{colors.neutral.400}" flexShrink={0}>
                    <Box fontFamily="body" letterSpacing="wide">{project.type}</Box>
                    <Box fontFamily="mono" fontVariantNumeric="tabular-nums">{project.year}</Box>
                  </Flex>
                </a>
              ))}
            </Box>
          </Box>

          {/* Column 2: Secondary — Experiments */}
          <Box
            py="40"
            px={{ base: '0', md: '24' }}
            borderRight={{ base: 'none', lg: '1px solid {colors.neutral.200}' }}
            borderTop={{ base: '1px solid {colors.neutral.200}', md: 'none' }}
          >
            <Box
              fontFamily="heading"
              fontSize="9px"
              letterSpacing="widest"
              color="{colors.neutral.500}"
              textTransform="uppercase"
              mb="16"
              pb="8"
              borderBottom="1px solid {colors.neutral.800}"
            >
              Experiments
            </Box>
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                target={exp.externalUrl ? '_blank' : undefined}
                rel={exp.externalUrl ? 'noopener noreferrer' : undefined}
                className={css({
                  display: 'block',
                  py: '12',
                  borderBottom: '1px solid {colors.neutral.100}',
                  textDecoration: 'none',
                  minHeight: '44px',
                  _hover: { background: '{colors.neutral.100}' },
                  _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
                })}
              >
                <Box fontFamily="body" fontSize="15px" fontWeight="500" color="{colors.neutral.800}" mb="4">
                  {exp.title}
                </Box>
                <Flex gap="12" fontSize="12px" color="{colors.neutral.400}">
                  <Box fontFamily="body" letterSpacing="wide">{exp.type}</Box>
                  <Box fontFamily="mono" fontVariantNumeric="tabular-nums">{exp.year}</Box>
                </Flex>
                {exp.description && (
                  <Box
                    fontFamily="body"
                    fontSize="13px"
                    lineHeight="normal"
                    color="{colors.neutral.500}"
                    mt="8"
                    maxW="360px"
                  >
                    {exp.description}
                  </Box>
                )}
              </a>
            ))}
          </Box>

          {/* Column 3: Tertiary — Leaderboard + Signal */}
          <Box
            py="40"
            pl={{ base: '0', lg: '24' }}
            borderTop={{ base: '1px solid {colors.neutral.200}', lg: 'none' }}
          >
            {/* Golf Leaderboard */}
            <Box mb="32">
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="16"
                pb="8"
                borderBottom="1px solid"
                borderColor="{colors.accent.glow}"
              >
                Leaderboard
              </Box>
              {[
                { pos: '01', name: 'Cameron Young', score: '-8', lead: true },
                { pos: '02', name: 'Collin Morikawa', score: '-6', lead: false },
                { pos: '03', name: 'Scottie Scheffler', score: '-5', lead: false },
                { pos: 'T4', name: 'Xander Schauffele', score: '-4', lead: false },
                { pos: 'T4', name: 'Rory McIlroy', score: '-4', lead: false },
              ].map((player) => (
                <Flex
                  key={player.pos + player.name}
                  align="center"
                  height="40px"
                  borderBottom="1px solid {colors.neutral.100}"
                  gap="12"
                  className={css({
                    _hover: {
                      background: '{colors.neutral.100}',
                      borderLeft: '3px solid {colors.accent.DEFAULT}',
                      pl: '8',
                    },
                  })}
                >
                  <Box
                    fontFamily="heading"
                    fontWeight="700"
                    fontSize="16px"
                    fontVariantNumeric="tabular-nums"
                    color="{colors.neutral.800}"
                    minW="28px"
                  >
                    {player.pos}
                  </Box>
                  <Box fontFamily="body" fontSize="13px" color="{colors.neutral.600}" flex="1">
                    {player.name}
                  </Box>
                  <Box
                    fontFamily="mono"
                    fontSize="13px"
                    fontWeight="700"
                    fontVariantNumeric="tabular-nums"
                    color={player.lead ? '{colors.accent.DEFAULT}' : '{colors.accent.dark}'}
                  >
                    {player.score}
                  </Box>
                </Flex>
              ))}
              <Box
                fontFamily="body"
                fontSize="11px"
                letterSpacing="wider"
                color="{colors.neutral.500}"
                mt="12"
              >
                Cadillac Championship — Rd 2
              </Box>
            </Box>

            {/* HN Signal */}
            <Box>
              <Box
                fontFamily="heading"
                fontSize="9px"
                letterSpacing="widest"
                color="{colors.neutral.500}"
                textTransform="uppercase"
                mb="16"
                pb="8"
                borderBottom="1px solid {colors.neutral.200}"
              >
                Signal
              </Box>
              <Box mb="16">
                <Box fontFamily="body" fontSize="13px" color="{colors.neutral.600}" lineHeight="normal" mb="4">
                  NSA whistleblower raises new concerns about domestic surveillance infrastructure
                </Box>
                <Box fontFamily="body" fontSize="11px" fontVariantNumeric="tabular-nums" color="{colors.neutral.500}">
                  605 ↑
                </Box>
              </Box>
              <Box fontFamily="body" fontSize="12px" color="{colors.neutral.500}" lineHeight="normal" mb="8">
                Show HN: Open-source alternative to Vercel deployments
              </Box>
              <Box fontFamily="body" fontSize="12px" color="{colors.neutral.500}" lineHeight="normal">
                Why we moved from Kubernetes back to bare metal
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  )
}