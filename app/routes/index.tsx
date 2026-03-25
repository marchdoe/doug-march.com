import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const sectionLabelClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  marginBottom: '4',
})

const labelTextClass = css({
  fontSize: 'xs',
  fontFamily: 'body',
  fontWeight: '500',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
})

const labelRuleClass = css({
  flex: '1',
  height: '1px',
  background: 'border',
})

function SectionLabel({ label }: { label: string }) {
  return (
    <div className={sectionLabelClass}>
      <span className={labelTextClass}>{label}</span>
      <span className={labelRuleClass} />
    </div>
  )
}

const workRowClass = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  alignItems: 'center',
  height: '11',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  gap: '6',
  cursor: 'pointer',
  textDecoration: 'none',
  _hover: {
    background: 'bgRow',
  },
})

function HomePage() {
  return (
    <Box fontFamily="body">

      {/* ── ABOVE FOLD — 3-column broadsheet ─────────────────── */}
      <Box
        maxWidth="1200px"
        mx="auto"
        width="100%"
        display="grid"
        gridTemplateColumns="2.5fr 1fr 1fr"
        minHeight="64vh"
      >

        {/* Column 1: Identity + Featured Project */}
        <Box
          py="8"
          px="7"
          paddingLeft="12"
          borderBottom="1px solid"
          borderColor="border"
        >
          <VStack gap="0" align="stretch">
            {/* Name */}
            <Box mb="2">
              <Box
                fontSize="xl"
                fontFamily="heading"
                fontWeight="700"
                color="text"
                lineHeight="tight"
                letterSpacing="tight"
              >
                Doug March
              </Box>
            </Box>

            {/* Role */}
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textMuted"
              letterSpacing="wide"
              mb="6"
            >
              Product Designer &amp; Developer
            </Box>

            {/* Statement */}
            <Box
              fontSize="md"
              fontFamily="heading"
              fontWeight="400"
              color="textSecondary"
              lineHeight="normal"
              mb="10"
              maxWidth="400px"
            >
              Making products that feel inevitable in retrospect.
            </Box>

            {/* Featured Project */}
            {featuredProject && (
              <Box>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="500"
                  color="textMuted"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  mb="3"
                >
                  Featured
                </Box>

                <a
                  href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
                  target={featuredProject.externalUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={css({ textDecoration: 'none' })}
                >
                  <Box
                    fontSize="lg"
                    fontFamily="heading"
                    fontWeight="700"
                    color="text"
                    lineHeight="tight"
                    letterSpacing="tight"
                    mb="3"
                    _hover={{ color: 'accent' }}
                  >
                    {featuredProject.title}
                  </Box>
                </a>

                {featuredProject.problem && (
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    fontWeight="400"
                    color="textSecondary"
                    lineHeight="normal"
                    maxWidth="380px"
                    mb="4"
                  >
                    {featuredProject.problem}
                  </Box>
                )}

                {featuredProject.role && (
                  <Box
                    fontSize="xs"
                    fontFamily="body"
                    fontWeight="400"
                    color="textMuted"
                    letterSpacing="wide"
                  >
                    {featuredProject.role} · {featuredProject.year}
                  </Box>
                )}
              </Box>
            )}
          </VStack>
        </Box>

        {/* Column 2: Sports results */}
        <Box
          borderLeft="1px solid"
          borderColor="border"
          borderBottom="1px solid"
          py="8"
          px="7"
        >
          <SectionLabel label="Results" />

          {/* Tigers win — green left-bar callout */}
          <Box
            mb="5"
            py="4"
            pl="3"
            style={{ borderLeft: '3px solid #4A8C6A' }}
          >
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textMuted"
              letterSpacing="widest"
              textTransform="uppercase"
              mb="1"
            >
              Det Tigers
            </Box>
            <Box
              fontSize="lg"
              fontFamily="heading"
              fontWeight="700"
              color="text"
              lineHeight="tight"
              mb="2"
            >
              11–8
            </Box>
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textSecondary"
              lineHeight="normal"
            >
              Offense showed up early. Opening Day tomorrow.
            </Box>
          </Box>

          {/* Red Wings loss — terse, no accent bar */}
          <Box pl="3">
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textMuted"
              lineHeight="normal"
            >
              Red Wings fell 2–3.
            </Box>
          </Box>
        </Box>

        {/* Column 3: Environmental signals */}
        <Box
          borderLeft="1px solid"
          borderColor="border"
          borderBottom="1px solid"
          py="8"
          px="7"
        >
          <SectionLabel label="Signals" />

          <VStack gap="2" align="stretch">
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="300"
              color="textMuted"
              letterSpacing="wide"
              lineHeight="normal"
            >
              12.1 hrs daylight
            </Box>
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="300"
              color="textMuted"
              letterSpacing="wide"
              lineHeight="normal"
            >
              First quarter moon · 51.4% illuminated
            </Box>
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="300"
              color="textMuted"
              letterSpacing="wide"
              lineHeight="normal"
              mt="4"
            >
              March 25, 2026
            </Box>
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="300"
              color="textMuted"
              letterSpacing="wide"
              lineHeight="normal"
            >
              Wednesday
            </Box>
          </VStack>
        </Box>
      </Box>

      {/* ── DATELINE BAND — full width, Stack-borrowed beat ── */}
      <Box
        width="100%"
        height="12"
        background="bgDateline"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="borderAccent"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="4"
      >
        <Box
          fontSize="xs"
          fontFamily="body"
          fontWeight="500"
          color="accent"
          letterSpacing="widest"
          textTransform="uppercase"
        >
          Tomorrow
        </Box>
        <Box
          fontSize="xs"
          color="textMuted"
          fontFamily="body"
        >
          ·
        </Box>
        <Box
          fontSize="xs"
          fontFamily="body"
          fontWeight="400"
          color="textSecondary"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          MLB Opening Day — March 26, 2026
        </Box>
      </Box>

      {/* ── BELOW FOLD — 2-column (grammar shift from 3 to 2) ─ */}
      <Box
        maxWidth="1200px"
        mx="auto"
        width="100%"
        display="grid"
        gridTemplateColumns="2fr 1fr"
      >

        {/* Column 1 (wide): Work list + Experiments + Sora */}
        <Box
          py="10"
          px="8"
          paddingLeft="12"
        >
          {/* Selected Work */}
          <Box mb="8">
            <SectionLabel label="Selected Work" />

            {selectedWork.length === 0 && (
              <Box fontSize="sm" color="textMuted" fontFamily="body">No projects yet.</Box>
            )}

            {selectedWork.map(project => (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={workRowClass}
              >
                <Box
                  fontSize="base"
                  fontFamily="body"
                  fontWeight="400"
                  color="text"
                >
                  {project.title}
                </Box>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="400"
                  color="textMuted"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  {project.type}
                </Box>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="400"
                  color="textMuted"
                  fontVariantNumeric="tabular-nums"
                >
                  {project.year}
                </Box>
              </a>
            ))}
          </Box>

          {/* Experiments */}
          <Box mb="8">
            <SectionLabel label="Experiments" />

            {experiments.map(exp => (
              <a
                key={exp.slug}
                href={exp.externalUrl || `/work/${exp.slug}`}
                target={exp.externalUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={workRowClass}
              >
                <Box
                  fontSize="base"
                  fontFamily="body"
                  fontWeight="400"
                  color="text"
                >
                  {exp.title}
                </Box>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="400"
                  color="textMuted"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  {exp.type}
                </Box>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="400"
                  color="textMuted"
                  fontVariantNumeric="tabular-nums"
                >
                  {exp.year}
                </Box>
              </a>
            ))}
          </Box>

          {/* Sora shutdown — cultural weather note */}
          <Box
            pt="6"
            borderTop="1px solid"
            borderColor="border"
          >
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textMuted"
              letterSpacing="widest"
              textTransform="uppercase"
              mb="2"
            >
              Tools
            </Box>
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textSecondary"
              lineHeight="normal"
              mb="1"
            >
              Sora shutting down.
            </Box>
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="300"
              color="textMuted"
              lineHeight="normal"
            >
              HN · 726 pts. A tool ends quietly.
            </Box>
          </Box>
        </Box>

        {/* Column 2 (narrow): Rumi + context */}
        <Box
          borderLeft="1px solid"
          borderColor="border"
          py="10"
          px="8"
        >
          {/* Rumi quote — anchor text, generous leading */}
          <Box mb="6">
            <Box
              fontSize="md"
              fontFamily="heading"
              fontWeight="400"
              fontStyle="italic"
              color="text"
              lineHeight="loose"
              mb="3"
            >
              Take time like the river that never grows stale
            </Box>
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="300"
              color="textMuted"
              letterSpacing="wide"
            >
              — Rumi
            </Box>
          </Box>

          {/* Separator */}
          <Box
            height="1px"
            background="border"
            mb="6"
          />

          {/* Contextual note */}
          <Box mb="6">
            <Box
              fontSize="xs"
              fontFamily="body"
              fontWeight="500"
              color="textMuted"
              letterSpacing="wider"
              textTransform="uppercase"
              mb="3"
            >
              Now
            </Box>
            <Box
              fontSize="sm"
              fontFamily="body"
              fontWeight="400"
              color="textSecondary"
              lineHeight="normal"
            >
              Wednesday in late March. Light almost even — 12.1 hours. The season hasn't committed yet, but the direction is clear.
            </Box>
          </Box>

          {/* About link */}
          <Box
            pt="4"
            borderTop="1px solid"
            borderColor="border"
          >
            <a href="/about" className={css({ textDecoration: 'none' })}>
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="500"
                color="textMuted"
                letterSpacing="wider"
                textTransform="uppercase"
                _hover={{ color: 'accent' }}
              >
                About Doug →
              </Box>
            </a>
          </Box>
        </Box>
      </Box>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Box
        width="100%"
        background="bgMasthead"
        borderTop="1px solid"
        style={{ borderTopColor: '#2A2720' }}
        py="6"
        px="12"
      >
        <Flex
          maxWidth="1200px"
          mx="auto"
          justify="space-between"
          align="center"
        >
          <Box
            fontSize="xs"
            fontFamily="body"
            fontWeight="400"
            color="textOnDarkMuted"
          >
            Doug March · 2026
          </Box>
          <Flex gap="6">
            <a href="/" className={css({ textDecoration: 'none' })}>
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="500"
                color="textOnDarkMuted"
                letterSpacing="wider"
                textTransform="uppercase"
                _hover={{ color: 'accentLight' }}
              >
                Work
              </Box>
            </a>
            <a href="/about" className={css({ textDecoration: 'none' })}>
              <Box
                fontSize="xs"
                fontFamily="body"
                fontWeight="500"
                color="textOnDarkMuted"
                letterSpacing="wider"
                textTransform="uppercase"
                _hover={{ color: 'accentLight' }}
              >
                About
              </Box>
            </a>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}