import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'
import { SectionLabel } from '../components/SectionLabel'

export const Route = createFileRoute('/')({ component: HomePage })

const mainGridClass = css({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
})

const workGridClass = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
})

const workCardClass = css({
  padding: '24px',
  borderRight: '1px solid',
  borderRightColor: 'border',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  borderLeft: '2px solid transparent',
  transition: 'background 0ms ease, border-left-color 120ms ease',
  _hover: {
    background: 'bg.card',
    borderLeftColor: 'accent',
  },
})

const experimentCardClass = css({
  padding: '20px 24px',
  borderRight: '1px solid',
  borderRightColor: 'border',
  borderBottom: '1px solid',
  borderBottomColor: 'border',
  borderLeft: '2px solid transparent',
  transition: 'background 0ms ease, border-left-color 120ms ease',
  _hover: {
    background: 'bg.card',
    borderLeftColor: 'accent',
  },
})

function WorkCard({ project }: { project: (typeof selectedWork)[number] }) {
  return (
    <Box className={workCardClass} style={{ minHeight: '200px' }}>
      <Box
        fontSize="xs"
        fontFamily="body"
        fontWeight="700"
        color="accent"
        letterSpacing="wider"
        style={{ textTransform: 'uppercase', marginBottom: '10px' }}
      >
        {project.type}
      </Box>
      <a href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
        <Box
          fontFamily="heading"
          fontSize="lg"
          fontWeight="600"
          color="text"
          lineHeight="snug"
          letterSpacing="wide"
          style={{ marginBottom: '12px' }}
        >
          {project.title}
        </Box>
      </a>
      {project.problem && (
        <Box
          fontSize="sm"
          fontFamily="body"
          color="text.secondary"
          lineHeight="normal"
          style={{ marginBottom: '16px' }}
        >
          {project.problem}
        </Box>
      )}
      <Flex justify="space-between" align="center" style={{ marginTop: 'auto' }}>
        <Box fontSize="xs" color="text.muted" fontFamily="body">
          {project.year}
        </Box>
        <a href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
          <Box fontSize="sm" color="accent" letterSpacing="wide">
            →
          </Box>
        </a>
      </Flex>
    </Box>
  )
}

function ExperimentCard({ project }: { project: (typeof experiments)[number] }) {
  return (
    <Box className={experimentCardClass}>
      <Flex align="baseline" gap="2" style={{ marginBottom: '8px' }}>
        <Box
          fontSize="xs"
          fontFamily="body"
          fontWeight="700"
          color="text.muted"
          letterSpacing="wider"
          style={{ textTransform: 'uppercase' }}
        >
          {project.type}
        </Box>
        <Box fontSize="xs" fontFamily="body" color="text.muted">
          · {project.year}
        </Box>
      </Flex>
      <a href={`/work/${project.slug}`} style={{ textDecoration: 'none' }}>
        <Box
          fontFamily="heading"
          fontSize="md"
          fontWeight="600"
          color="text"
          lineHeight="snug"
          style={{ marginBottom: '8px' }}
        >
          {project.title}
        </Box>
      </a>
      {project.description && (
        <Box
          fontSize="sm"
          fontFamily="body"
          color="text.muted"
          lineHeight="normal"
        >
          {project.description}
        </Box>
      )}
    </Box>
  )
}

function HomePage() {
  const powellQuote = 'Perpetual optimism is a force multiplier.'

  return (
    <Box style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* ── Three-column broadsheet grid ── */}
      <div className={mainGridClass}>

        {/* COL 1 — Featured project */}
        <Box
          borderRight="1px solid"
          borderColor="border"
          style={{ padding: '32px 24px', minHeight: '68vh' }}
        >
          <SectionLabel>Featured</SectionLabel>

          {featuredProject && (
            <Box style={{ paddingTop: '12px' }}>
              <Box
                fontSize="2xs"
                fontFamily="body"
                color="text.muted"
                letterSpacing="widest"
                style={{ textTransform: 'uppercase', marginBottom: '20px' }}
              >
                {featuredProject.type} · {featuredProject.year}
              </Box>

              <a
                href={
                  featuredProject.externalUrl ||
                  featuredProject.liveUrl ||
                  `/work/${featuredProject.slug}`
                }
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={
                  featuredProject.externalUrl ? 'noopener noreferrer' : undefined
                }
                style={{ textDecoration: 'none' }}
              >
                <Box
                  fontFamily="heading"
                  fontSize="2xl"
                  fontWeight="700"
                  color="text"
                  lineHeight="tight"
                  letterSpacing="tight"
                  style={{ marginBottom: '24px' }}
                >
                  {featuredProject.title}
                </Box>
              </a>

              {featuredProject.problem && (
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="normal"
                  style={{ maxWidth: '520px', marginBottom: '28px' }}
                >
                  {featuredProject.problem}
                </Box>
              )}

              {featuredProject.role && (
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  color="text.muted"
                  style={{ marginBottom: '28px' }}
                >
                  Role — {featuredProject.role}
                </Box>
              )}

              <a
                href={
                  featuredProject.externalUrl ||
                  featuredProject.liveUrl ||
                  `/work/${featuredProject.slug}`
                }
                target={featuredProject.externalUrl ? '_blank' : undefined}
                rel={
                  featuredProject.externalUrl ? 'noopener noreferrer' : undefined
                }
                style={{ textDecoration: 'none' }}
              >
                <Box
                  fontSize="sm"
                  fontFamily="body"
                  color="accent"
                  letterSpacing="wide"
                >
                  View project ↗
                </Box>
              </a>
            </Box>
          )}
        </Box>

        {/* COL 2 — About + Powell quote (specimen zone) */}
        <Box
          borderRight="1px solid"
          borderColor="border"
          style={{ padding: '24px 20px' }}
        >
          <SectionLabel>About</SectionLabel>

          <Box style={{ marginBottom: '24px' }}>
            <Box
              fontFamily="heading"
              fontSize="md"
              fontWeight="600"
              color="text"
              lineHeight="snug"
              style={{ marginBottom: '6px' }}
            >
              {identity.name}
            </Box>
            <Box
              fontSize="xs"
              fontFamily="body"
              color="text.muted"
              letterSpacing="wide"
              style={{ textTransform: 'uppercase', marginBottom: '14px' }}
            >
              {identity.role}
            </Box>
            <Box
              fontSize="sm"
              fontFamily="body"
              color="text.secondary"
              lineHeight="normal"
              style={{ marginBottom: '16px' }}
            >
              {identity.statement}
            </Box>
            <a href="/about" style={{ textDecoration: 'none' }}>
              <Box
                fontSize="xs"
                fontFamily="body"
                color="text.muted"
                letterSpacing="wide"
              >
                Full bio →
              </Box>
            </a>
          </Box>

          {/* Separator */}
          <Box borderTop="1px solid" borderColor="border" />

          {/* Powell quote — specimen accent zone */}
          <Box style={{ padding: '48px 0' }}>
            <Box
              borderLeft="2px solid"
              borderColor="accent"
              style={{ paddingLeft: '20px' }}
            >
              <Box
                as="blockquote"
                fontFamily="heading"
                fontSize="xl"
                fontWeight="300"
                color="text"
                lineHeight="loose"
                letterSpacing="wide"
                style={{ margin: '0 0 14px 0', fontStyle: 'normal' }}
              >
                "{powellQuote}"
              </Box>
              <Box
                fontSize="xs"
                fontFamily="body"
                color="text.muted"
                letterSpacing="wider"
                style={{ textTransform: 'uppercase' }}
              >
                — Colin Powell
              </Box>
            </Box>
          </Box>
        </Box>

        {/* COL 3 — Signals */}
        <Box style={{ padding: '20px 16px' }}>
          <SectionLabel>Signals</SectionLabel>

          {/* Tigers score */}
          <Box style={{ marginBottom: '4px' }}>
            <Box
              fontFamily="heading"
              fontSize="sm"
              fontWeight="300"
              color="signal"
              lineHeight="snug"
              style={{ fontStyle: 'italic' }}
            >
              DET 0 · OAK 1 — L
            </Box>
          </Box>
          <Box
            fontSize="sm"
            fontFamily="body"
            fontWeight="300"
            color="text.muted"
            style={{ marginBottom: '20px' }}
          >
            noted.
          </Box>

          {/* Hairline */}
          <Box borderTop="1px solid" borderColor="border" style={{ marginBottom: '14px' }} />

          {/* Easter + Masters */}
          <Box style={{ marginBottom: '8px' }}>
            <Box
              fontSize="xs"
              fontFamily="body"
              color="text.muted"
              lineHeight="normal"
            >
              <Box as="span" color="accent">◦</Box>
              {' '}Easter → 3 days
            </Box>
          </Box>
          <Box style={{ marginBottom: '8px' }}>
            <Box
              fontSize="xs"
              fontFamily="body"
              color="text.muted"
              lineHeight="normal"
            >
              Augusta → 7 days
            </Box>
          </Box>

          {/* Artemis — bottom of column */}
          <Box style={{ marginTop: '32px' }}>
            <Box borderTop="1px solid" borderColor="border" style={{ marginBottom: '12px' }} />
            <Box
              fontSize="xs"
              fontFamily="body"
              color="text.muted"
              letterSpacing="wide"
            >
              Artemis II ↑
            </Box>
          </Box>
        </Box>

      </div>

      {/* ── Selected work section ── */}
      <Box borderTop="1px solid" borderColor="border" style={{ padding: '24px 24px 0' }}>
        <SectionLabel>Selected Work</SectionLabel>
      </Box>

      <div className={workGridClass}>
        {selectedWork.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>

      {/* ── Experiments section ── */}
      {experiments.length > 0 && (
        <>
          <Box style={{ padding: '24px 24px 0' }}>
            <SectionLabel>Experiments</SectionLabel>
          </Box>
          <div className={workGridClass}>
            {experiments.map((project) => (
              <ExperimentCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}

    </Box>
  )
}