import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const section = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const content = css({
  width: '100%',
  style: 'max-width: 960px',
})

const workRowLink = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8',
  paddingTop: '6',
  paddingBottom: '6',
  paddingLeft: '4',
  paddingRight: '4',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  textDecoration: 'none',
  transition: 'background 0.15s',
  _hover: { background: 'bgCard' },
})

const indexRowLink = css({
  display: 'flex',
  alignItems: 'center',
  height: '14',
  paddingLeft: '4',
  paddingRight: '4',
  gap: '4',
  background: 'bg',
  textDecoration: 'none',
  transition: 'background 0.15s',
  _hover: { background: 'bgCard' },
})

const backLink = css({
  fontSize: 'xs',
  fontFamily: 'body',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: 'wide',
  _hover: { color: 'textSecondary' },
})

function SectionLabel({ label }: { label: string }) {
  return (
    <Box
      fontSize="2xs"
      fontFamily="body"
      fontWeight="500"
      letterSpacing="widest"
      textTransform="uppercase"
      color="textMuted"
      mb="8"
    >
      {label}
    </Box>
  )
}

function HomePage() {
  return (
    <Box>

      {/* ═══ 1. HERO — full moon, dark sky, name at display scale ═══ */}
      <Box
        className={section}
        style={{ minHeight: '100vh', background: '#0A1520' }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '960px',
            padding: '0 48px',
            paddingTop: '40vh',
          }}
        >
          <Box
            fontFamily="heading"
            fontWeight="700"
            color="text"
            letterSpacing="tight"
            lineHeight="tight"
            style={{ fontSize: 'clamp(44px, 8vw, 67px)' }}
          >
            Doug<br />March
          </Box>
          <Box
            mt="6"
            fontSize="md"
            fontFamily="heading"
            fontWeight="300"
            color="textMuted"
          >
            Product Designer & Developer
          </Box>
          <Box
            mt="4"
            fontSize="2xs"
            fontFamily="body"
            color="textMuted"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            March 31, 2026
          </Box>
        </Box>
      </Box>

      {/* ═══ 2. FEATURED PROJECT — Spaceman, full beat ═══ */}
      {featuredProject && (
        <Box
          className={section}
          style={{
            minHeight: '80vh',
            borderLeft: '1px solid rgba(47, 168, 101, 0.12)',
            paddingTop: '96px',
            paddingBottom: '96px',
            borderTop: '1px solid #2C4055',
          }}
        >
          <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
            <SectionLabel label="Featured" />

            <Box
              fontSize="2xs"
              fontFamily="body"
              letterSpacing="widest"
              textTransform="uppercase"
              color="textMuted"
              mb="6"
            >
              {featuredProject.type}
              {' · '}
              {featuredProject.year}
              {featuredProject.role ? ` · ${featuredProject.role}` : ''}
            </Box>

            <a
              href={featuredProject.externalUrl || featuredProject.liveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <Box
                fontFamily="heading"
                fontWeight="700"
                color="text"
                fontSize="xl"
                lineHeight="snug"
                letterSpacing="tight"
                mb="8"
                style={{
                  maxWidth: '640px',
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}
              >
                {featuredProject.title}
              </Box>
            </a>

            {featuredProject.problem && (
              <Box
                fontSize="base"
                fontFamily="body"
                color="textSecondary"
                lineHeight="normal"
                mb="5"
                style={{ maxWidth: '640px' }}
              >
                {featuredProject.problem}
              </Box>
            )}

            {featuredProject.approach && (
              <Box
                fontSize="base"
                fontFamily="body"
                color="textMuted"
                lineHeight="normal"
                mb="8"
                style={{ maxWidth: '640px' }}
              >
                {featuredProject.approach}
              </Box>
            )}

            {featuredProject.stack && featuredProject.stack.length > 0 && (
              <Flex gap="2" flexWrap="wrap">
                {featuredProject.stack.map((tech) => (
                  <Box
                    key={tech}
                    fontSize="2xs"
                    fontFamily="body"
                    color="textMuted"
                    letterSpacing="wide"
                    textTransform="uppercase"
                    px="3"
                    py="1"
                    border="1px solid"
                    borderColor="borderSubtle"
                    borderRadius="none"
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </Box>
      )}

      {/* ═══ 3. SELECTED WORK — three projects, each a full row ═══ */}
      <Box
        className={section}
        id="work"
        style={{
          paddingTop: '96px',
          paddingBottom: '96px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <SectionLabel label="Selected Work" />

          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={workRowLink}
            >
              <Box
                fontSize="2xs"
                fontFamily="body"
                color="textMuted"
                letterSpacing="widest"
                textTransform="uppercase"
                style={{ minWidth: '80px', flexShrink: 0, paddingTop: '3px' }}
              >
                {project.year}
              </Box>
              <Box flex="1">
                <Box
                  fontSize="lg"
                  fontFamily="heading"
                  fontWeight="500"
                  color="text"
                  lineHeight="snug"
                  mb="2"
                >
                  {project.title}
                </Box>
                <Box
                  fontSize="2xs"
                  fontFamily="body"
                  color="textMuted"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  mb="3"
                >
                  {project.type}
                  {project.role ? ` · ${project.role}` : ''}
                </Box>
                {project.problem && (
                  <Box
                    fontSize="sm"
                    fontFamily="body"
                    color="textSecondary"
                    lineHeight="normal"
                    style={{ maxWidth: '520px' }}
                  >
                    {project.problem}
                  </Box>
                )}
              </Box>
              <Box
                fontSize="base"
                color="textMuted"
                style={{ flexShrink: 0, paddingTop: '2px' }}
              >
                →
              </Box>
            </a>
          ))}
        </Box>
      </Box>

      {/* ═══ 4. WORK INDEX — systematic two-column grid ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '64px',
          paddingBottom: '64px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <SectionLabel label="All Work" />

          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: '#19293A',
            }}
          >
            {[...selectedWork, ...experiments].map((project, i) => (
              <a
                key={project.slug}
                href={
                  project.depth === 'full'
                    ? `/work/${project.slug}`
                    : project.liveUrl || project.externalUrl || '#'
                }
                target={project.depth === 'lightweight' ? '_blank' : undefined}
                rel={
                  project.depth === 'lightweight'
                    ? 'noopener noreferrer'
                    : undefined
                }
                className={indexRowLink}
              >
                <Box
                  fontSize="2xs"
                  fontFamily="body"
                  color="textMuted"
                  style={{ minWidth: '28px', flexShrink: 0 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Box>
                <Box
                  fontSize="base"
                  fontFamily="heading"
                  fontWeight="500"
                  color="text"
                  flex="1"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.title}
                </Box>
                <Box
                  fontSize="xs"
                  fontFamily="body"
                  color="textMuted"
                  style={{ flexShrink: 0 }}
                >
                  {project.year}
                </Box>
              </a>
            ))}
          </Box>

          {/* Sports footnotes — wry, 9px, terminal tone */}
          <Box
            mt="8"
            pt="8"
            borderTop="1px solid"
            borderColor="borderSubtle"
          >
            <Box
              fontSize="2xs"
              fontFamily="body"
              color="textMuted"
              letterSpacing="wide"
              lineHeight="loose"
            >
              <Box>¹ DET 110 – IND 114. Noted.</Box>
              <Box>² Tigers 6 – 9. Onward.</Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ═══ 5. RUMI — seed-dot, then the quote, nothing else ═══ */}
      <Box
        className={section}
        style={{
          minHeight: '40vh',
          paddingTop: '64px',
          paddingBottom: '64px',
          justifyContent: 'center',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '960px',
            padding: '0 48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* The one spring green gesture */}
          <Box
            fontSize="sm"
            color="accent"
            letterSpacing="wider"
            mb="6"
            textAlign="center"
            style={{ userSelect: 'none' }}
          >
            ·
          </Box>
          <Box
            fontSize="md"
            fontFamily="body"
            fontWeight="400"
            color="textSecondary"
            lineHeight="loose"
            textAlign="center"
            style={{ maxWidth: '520px' }}
          >
            What is planted in each person's soul will sprout
          </Box>
        </Box>
      </Box>

      {/* ═══ FOOTER ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <Flex justify="space-between" align="baseline">
            <Box fontSize="xs" fontFamily="body" color="textMuted">
              Doug March · Product Designer & Developer · 2026
            </Box>
            <Box fontSize="xs" fontFamily="body" color="textMuted">
              <a href="/archive" className={backLink}>archive</a>
            </Box>
          </Flex>
        </Box>
      </Box>

    </Box>
  )
}