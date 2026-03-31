import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const section = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const backLink = css({
  fontSize: 'xs',
  fontFamily: 'body',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: 'wide',
  _hover: { color: 'textSecondary' },
})

const externalLink = css({
  fontSize: 'sm',
  fontFamily: 'body',
  color: 'textSecondary',
  textDecoration: 'none',
  letterSpacing: 'normal',
  transition: 'color 0.2s',
  _hover: { color: 'text' },
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
      mb="4"
    >
      {label}
    </Box>
  )
}

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        className={section}
        style={{ paddingTop: '120px', paddingBottom: '96px' }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <Box fontSize="sm" fontFamily="body" color="textMuted" mb="6">
            Project not found.
          </Box>
          <a href="/" className={backLink}>← Back home</a>
        </Box>
      </Box>
    )
  }

  return (
    <Box>

      {/* ═══ PROJECT HEADER ═══ */}
      <Box
        className={section}
        style={{ paddingTop: '120px', paddingBottom: '96px', minHeight: '60vh' }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <Box mb="8">
            <a href="/" className={backLink}>← Doug March</a>
          </Box>

          <Box
            fontSize="2xs"
            fontFamily="body"
            color="textMuted"
            letterSpacing="widest"
            textTransform="uppercase"
            mb="6"
          >
            {project.type}
            {' · '}
            {project.year}
            {project.role ? ` · ${project.role}` : ''}
          </Box>

          <Box
            fontFamily="heading"
            fontWeight="700"
            color="text"
            letterSpacing="tight"
            lineHeight="tight"
            mb="8"
            style={{ fontSize: 'clamp(36px, 6vw, 50px)' }}
          >
            {project.title}
          </Box>

          {project.problem && (
            <Box
              fontSize="md"
              fontFamily="body"
              color="textSecondary"
              lineHeight="normal"
              style={{ maxWidth: '640px' }}
            >
              {project.problem}
            </Box>
          )}
        </Box>
      </Box>

      {/* ═══ PROJECT BODY ═══ */}
      {(project.approach || project.outcome || project.stack || project.description) && (
        <Box
          className={section}
          style={{
            paddingTop: '64px',
            paddingBottom: '64px',
            borderTop: '1px solid #19293A',
          }}
        >
          <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>

            {project.description && (
              <Box mb="12">
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="textSecondary"
                  lineHeight="normal"
                  style={{ maxWidth: '640px' }}
                >
                  {project.description}
                </Box>
              </Box>
            )}

            {project.approach && (
              <Box mb="12">
                <SectionLabel label="Approach" />
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="textSecondary"
                  lineHeight="normal"
                  style={{ maxWidth: '640px' }}
                >
                  {project.approach}
                </Box>
              </Box>
            )}

            {project.outcome && (
              <Box mb="12">
                <SectionLabel label="Outcome" />
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="textSecondary"
                  lineHeight="normal"
                  style={{ maxWidth: '640px' }}
                >
                  {project.outcome}
                </Box>
              </Box>
            )}

            {project.stack && project.stack.length > 0 && (
              <Box mb="12">
                <SectionLabel label="Stack" />
                <Flex gap="2" flexWrap="wrap">
                  {project.stack.map((tech) => (
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
              </Box>
            )}

            {(project.liveUrl || project.externalUrl || project.githubUrl) && (
              <Flex gap="6" align="center">
                {(project.liveUrl || project.externalUrl) && (
                  <a
                    href={project.liveUrl || project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLink}
                  >
                    View project →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLink}
                  >
                    GitHub →
                  </a>
                )}
              </Flex>
            )}

          </Box>
        </Box>
      )}

      {/* ═══ MORE WORK ═══ */}
      <Box
        className={section}
        style={{
          paddingTop: '64px',
          paddingBottom: '64px',
          borderTop: '1px solid #19293A',
        }}
      >
        <Box style={{ width: '100%', maxWidth: '960px', padding: '0 48px' }}>
          <Box
            fontSize="2xs"
            fontFamily="body"
            letterSpacing="widest"
            textTransform="uppercase"
            color="textMuted"
            mb="6"
          >
            More Work
          </Box>
          <a href="/" className={backLink}>← All projects</a>
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
              Doug March · {project.year}
            </Box>
            <a href="/archive" className={backLink}>archive</a>
          </Flex>
        </Box>
      </Box>

    </Box>
  )
}