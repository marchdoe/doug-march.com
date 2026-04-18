import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

const frameBase = css({
  background: '#EDEFD9',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '16px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
})

const frameMd = css({
  background: '#EDEFD9',
  border: '1px solid',
  borderColor: '{colors.neutral.200}',
  borderRadius: '12px',
  boxShadow: '0 2px 14px rgba(38, 43, 29, 0.06)',
})

const sectionLabel = css({
  fontSize: '12px',
  fontFamily: 'Outfit, sans-serif',
  fontWeight: '500',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color: '{colors.neutral.400}',
  marginBottom: '16px',
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

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box padding="48px" textAlign="center">
        <Box fontSize="21px" fontFamily="Fraunces, serif" color="{colors.neutral.700}" marginBottom="16px">
          Project not found
        </Box>
        <a
          href="/"
          className={css({
            color: '{colors.accent.DEFAULT}',
            textDecoration: 'underline',
            fontSize: '16px',
            padding: '4px',
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: '4px' },
          })}
        >
          Back to work
        </a>
      </Box>
    )
  }

  return (
    <div className={galleryGrid}>
      {/* Back link */}
      <div className={css({ gridColumn: '1 / 13', '@media (max-width: 1024px)': { gridColumn: '1 / -1' } })}>
        <a
          href="/"
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontFamily: 'Outfit, sans-serif',
            color: '{colors.neutral.400}',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            padding: '8px 0',
            _hover: { color: '{colors.accent.DEFAULT}' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: '4px' },
          })}
        >
          ← Back
        </a>
      </div>

      {/* Main Project Frame */}
      <div className={css({ gridColumn: '1 / 9', '@media (max-width: 1024px)': { gridColumn: '1 / -1' } })}>
        <Box className={frameBase} padding="48px">
          <Box
            fontSize="12px"
            fontFamily="Outfit, sans-serif"
            fontWeight="500"
            letterSpacing="0.13em"
            textTransform="uppercase"
            color="{colors.neutral.400}"
            marginBottom="24px"
          >
            {project.type} · {project.year}
          </Box>
          <Box
            fontSize="50px"
            fontFamily="Fraunces, serif"
            fontWeight="400"
            lineHeight="1.0"
            letterSpacing="-0.03em"
            color="{colors.neutral.700}"
            marginBottom="24px"
            style={{ fontVariationSettings: "'opsz' 144" }}
          >
            {project.title}
          </Box>
          {project.role && (
            <Box
              fontSize="21px"
              fontFamily="Outfit, sans-serif"
              color="{colors.neutral.500}"
              lineHeight="1.15"
              marginBottom="24px"
            >
              {project.role}
            </Box>
          )}
          <Box
            width="48px"
            height="1px"
            background="{colors.accent.DEFAULT}"
            marginBottom="32px"
          />
          {project.problem && (
            <Box marginBottom="32px">
              <Box className={sectionLabel}>Problem</Box>
              <Box fontSize="16px" lineHeight="1.58" color="{colors.neutral.500}" maxWidth="60ch">
                {project.problem}
              </Box>
            </Box>
          )}
          {project.approach && (
            <Box marginBottom="32px">
              <Box className={sectionLabel}>Approach</Box>
              <Box fontSize="16px" lineHeight="1.58" color="{colors.neutral.500}" maxWidth="60ch">
                {project.approach}
              </Box>
            </Box>
          )}
          {project.outcome && (
            <Box marginBottom="32px">
              <Box className={sectionLabel}>Outcome</Box>
              <Box fontSize="16px" lineHeight="1.58" color="{colors.neutral.500}" maxWidth="60ch">
                {project.outcome}
              </Box>
            </Box>
          )}
          {project.description && !project.problem && (
            <Box fontSize="16px" lineHeight="1.58" color="{colors.neutral.500}" maxWidth="60ch">
              {project.description}
            </Box>
          )}
        </Box>
      </div>

      {/* Details Sidebar */}
      <div className={css({ gridColumn: '9 / 13', '@media (max-width: 1024px)': { gridColumn: '1 / -1' } })}>
        {project.stack && project.stack.length > 0 && (
          <Box className={frameMd} padding="32px" marginBottom="24px">
            <Box className={sectionLabel}>Stack</Box>
            <Flex gap="8px" flexWrap="wrap">
              {project.stack.map((tech) => (
                <Box
                  key={tech}
                  fontSize="14px"
                  fontFamily="Outfit, sans-serif"
                  color="{colors.neutral.500}"
                  padding="6px 12px"
                  background="rgba(110, 158, 42, 0.09)"
                  borderRadius="4px"
                >
                  {tech}
                </Box>
              ))}
            </Flex>
          </Box>
        )}

        <Box className={frameMd} padding="32px">
          <Box className={sectionLabel}>Links</Box>
          <Flex direction="column" gap="12px">
            {(project.externalUrl || project.liveUrl) && (
              <a
                href={project.externalUrl || project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '500',
                  color: '{colors.neutral.50}',
                  background: '{colors.accent.DEFAULT}',
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease-out',
                  _hover: { background: '{colors.accent.dark}' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                })}
              >
                Visit site →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: '500',
                  color: '{colors.neutral.700}',
                  background: '{colors.neutral.200}',
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease-out',
                  _hover: { background: '{colors.neutral.300}' },
                  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                })}
              >
                GitHub
              </a>
            )}
          </Flex>
        </Box>
      </div>

      {/* Footer */}
      <div className={css({ gridColumn: '1 / 13', '@media (max-width: 1024px)': { gridColumn: '1 / -1' } })}>
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