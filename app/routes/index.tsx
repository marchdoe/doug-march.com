import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const golfLeaderboard = [
  { pos: '1', player: 'S. Scheffler', score: '-8' },
  { pos: '2', player: 'R. McIlroy', score: '-6' },
  { pos: '3', player: 'C. Morikawa', score: '-5' },
  { pos: 'T4', player: 'B. Koepka', score: '-4' },
  { pos: 'T4', player: 'X. Schauffele', score: '-4' },
]

const hnCurrents = [
  { text: "Running Tesla Model 3's computer as a home server", tag: 'diy' },
  { text: 'Personal Encyclopedias and knowledge architecture', tag: 'knowledge-arch' },
  { text: 'The unreasonable effectiveness of plain text files', tag: 'systems' },
  { text: 'Building tools for thought in 2026', tag: 'craft' },
]

const indexRowClass = css({
  display: 'grid',
  alignItems: 'center',
  height: '48px',
  textDecoration: 'none',
  transition: 'background 150ms ease',
  borderBottom: '1px solid',
  borderColor: 'border',
  _hover: {
    background: 'rgba(201, 125, 30, 0.07)',
  },
})

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
    ...experiments,
  ]

  return (
    <Box as="main">
      {/* ─── Beat 1: Identity ─── */}
      <Box
        as="section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px 48px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <Box
          fontFamily="heading"
          fontWeight="700"
          fontSize="2xl"
          color="text"
          letterSpacing="tight"
          lineHeight="tight"
          style={{ textTransform: 'uppercase' }}
        >
          Doug
          <br />
          March
        </Box>

        {/* Spring horizon rule */}
        <Box
          style={{
            width: '80px',
            borderTop: '1px solid #a3b49d',
            margin: '32px 0',
          }}
        />

        <Box
          fontFamily="body"
          fontWeight="300"
          fontSize="md"
          color="textSecondary"
          lineHeight="snug"
          style={{ marginBottom: '16px' }}
        >
          Product Designer &amp; Developer
        </Box>

        <Box
          fontFamily="body"
          fontWeight="400"
          fontSize="base"
          color="textMuted"
          lineHeight="normal"
          style={{ maxWidth: '440px' }}
        >
          Building products at the intersection of design and engineering. Currently focused on AI-native tools.
        </Box>
      </Box>

      {/* ─── Beat 2: Quote ─── */}
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
            maxWidth: '640px',
            width: '100%',
            padding: '96px 48px',
          }}
        >
          <Box
            className={css({
              borderLeft: '3px solid token(colors.accent)',
              paddingLeft: '32px',
              transition: 'border-color 200ms ease',
              _hover: {
                borderLeftColor: 'accentDark',
              },
            })}
          >
            <Box
              fontFamily="heading"
              fontWeight="400"
              fontSize="lg"
              color="textBody"
              lineHeight="loose"
            >
              "The goal is not to show how great you are. The goal is to show how much you care."
            </Box>
            <Box
              fontFamily="body"
              fontWeight="300"
              fontSize="sm"
              color="textSecondary"
              style={{ marginTop: '24px' }}
            >
              — Maxime Lagace
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ─── Beat 3: Work Index ─── */}
      <Box
        as="section"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '80px 48px',
        }}
      >
        {/* Section header */}
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
            letterSpacing="widest"
            style={{ textTransform: 'uppercase' }}
          >
            <span style={{ color: '#c97d1e' }}>Opening Day&nbsp;·&nbsp;</span>
            <span style={{ color: '#a3b49d' }}>Selected Work</span>
          </Box>
        </Flex>

        {/* Work rows */}
        {allWork.map((project, i) => {
          const href =
            project.depth === 'lightweight' && project.externalUrl
              ? project.externalUrl
              : `/work/${project.slug}`
          const isExternal = project.depth === 'lightweight' && !!project.externalUrl

          return (
            <a
              key={project.slug}
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={indexRowClass}
              style={{
                gridTemplateColumns: '40px 1fr 72px 120px 24px',
              }}
            >
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="xs"
                color="textMuted"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {String(i + 1).padStart(2, '0')}
              </Box>
              <Box
                fontFamily="heading"
                fontWeight="600"
                fontSize="base"
                color="text"
              >
                {project.title}
              </Box>
              <Box
                fontFamily="body"
                fontWeight="300"
                fontSize="xs"
                color="textMuted"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {project.year}
              </Box>
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="xs"
                color="textSecondary"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {project.type}
              </Box>
              <Box
                fontFamily="body"
                fontSize="sm"
                color="accent"
                style={{ transition: 'color 150ms ease' }}
              >
                →
              </Box>
            </a>
          )
        })}
      </Box>

      {/* ─── Beat 4: Signals ─── */}
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
            maxWidth: '960px',
            width: '100%',
            padding: '80px 48px',
            display: 'flex',
            gap: '80px',
          }}
        >
          {/* Left column: Golf leaderboard + Pistons */}
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Leaderboard
            </Box>

            {golfLeaderboard.map((entry) => (
              <Box
                key={entry.player}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr 40px',
                  alignItems: 'center',
                  height: '44px',
                  borderBottom: '1px solid #c9d5c4',
                }}
              >
                <Box
                  fontFamily="body"
                  fontWeight="400"
                  fontSize="xs"
                  color="textMuted"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {entry.pos}
                </Box>
                <Box
                  fontFamily="body"
                  fontWeight="400"
                  fontSize="sm"
                  color="textSecondary"
                >
                  {entry.player}
                </Box>
                <Box
                  fontFamily="heading"
                  fontWeight="600"
                  fontSize="sm"
                  color="accent"
                >
                  {entry.score}
                </Box>
              </Box>
            ))}

            {/* Pistons score */}
            <Box
              style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #c9d5c4',
              }}
            >
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="2xs"
                color="textMuted"
                letterSpacing="widest"
                style={{ marginBottom: '8px' }}
              >
                last night
              </Box>
              <Box
                fontFamily="body"
                fontWeight="400"
                fontSize="xs"
                letterSpacing="wider"
                style={{
                  color: '#b8674e',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                DET&nbsp;&nbsp;129&nbsp;&nbsp;·&nbsp;&nbsp;MIL&nbsp;&nbsp;130&nbsp;↓
              </Box>
            </Box>
          </Box>

          {/* Right column: HN Currents */}
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Currents
            </Box>

            <VStack gap="5" align="stretch">
              {hnCurrents.map((item, idx) => (
                <Box
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '16px 1fr',
                    gap: '8px',
                    alignItems: 'start',
                  }}
                >
                  <Box
                    fontFamily="body"
                    fontWeight="500"
                    fontSize="xs"
                    color="accent"
                    style={{ paddingTop: '2px' }}
                  >
                    ·
                  </Box>
                  <Box>
                    <Box
                      fontFamily="body"
                      fontWeight="400"
                      fontSize="sm"
                      color="textSecondary"
                      lineHeight="normal"
                    >
                      {item.text}{' '}
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: '11px',
                          color: '#a3b49d',
                          fontWeight: '400',
                        }}
                      >
                        ({item.tag})
                      </span>
                    </Box>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* ─── Beat 5: Footer ─── */}
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
          style={{ maxWidth: '960px', width: '100%' }}
        >
          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="xs"
            style={{ color: '#596658' }}
          >
            March 26, 2026
          </Box>

          <Flex gap="8" align="center">
            <a
              href="mailto:doug@dougmarch.com"
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
              Email
            </a>
            <a
              href="https://github.com/dougmarch"
              target="_blank"
              rel="noopener noreferrer"
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
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/dougmarch"
              target="_blank"
              rel="noopener noreferrer"
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
              LinkedIn
            </a>
          </Flex>

          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="xs"
            style={{ color: '#596658' }}
          >
            © 2026
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}