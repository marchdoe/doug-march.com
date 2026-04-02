import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'
import { SectionLabel } from '../components/SectionLabel'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const detailGridClass = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
})

const stackTagClass = css({
  fontSize: 'xs',
  fontFamily: 'body',
  color: 'text.muted',
  border: '1px solid',
  borderColor: 'border',
  padding: '3px 10px',
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <Box
          fontFamily="heading"
          fontSize="lg"
          fontWeight="300"
          color="text.muted"
          style={{ marginBottom: '24px' }}
        >
          Project not found.
        </Box>
        <a href="/" style={{ textDecoration: 'none' }}>
          <Box fontSize="sm" fontFamily="body" color="accent" letterSpacing="wide">
            ← All Work
          </Box>
        </a>
      </Box>
    )
  }

  return (
    <Box style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* ── Nav breadcrumb ── */}
      <Box
        borderBottom="1px solid"
        borderColor="border"
        style={{ padding: '16px 24px' }}
      >
        <a href="/" style={{ textDecoration: 'none' }}>
          <Box
            fontSize="xs"
            fontFamily="body"
            color="text.muted"
            letterSpacing="widest"
            style={{ textTransform: 'uppercase' }}
          >
            ← All Work
          </Box>
        </a>
      </Box>

      {/* ── Project header ── */}
      <Box
        borderBottom="1px solid"
        borderColor="border"
        style={{ padding: '40px 24px 36px' }}
      >
        <Box
          fontSize="2xs"
          fontFamily="body"
          color="accent"
          letterSpacing="widest"
          fontWeight="700"
          style={{ textTransform: 'uppercase', marginBottom: '16px' }}
        >
          {project.type} · {project.year}
        </Box>
        <Box
          fontFamily="heading"
          fontSize="xl"
          fontWeight="700"
          color="text"
          lineHeight="tight"
          letterSpacing="tight"
          style={{ marginBottom: '14px' }}
        >
          {project.title}
        </Box>
        {project.role && (
          <Box
            fontSize="sm"
            fontFamily="body"
            color="text.muted"
            letterSpacing="wide"
          >
            {project.role}
          </Box>
        )}
      </Box>

      {/* ── Project body — two-column ── */}
      <Box style={{ padding: '40px 24px' }}>
        <div className={detailGridClass}>

          {/* Left column */}
          <Box>
            {project.problem && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>Problem</SectionLabel>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="normal"
                >
                  {project.problem}
                </Box>
              </Box>
            )}

            {!project.problem && project.description && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>About</SectionLabel>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="normal"
                >
                  {project.description}
                </Box>
              </Box>
            )}

            {project.approach && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>Approach</SectionLabel>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="normal"
                >
                  {project.approach}
                </Box>
              </Box>
            )}

            {project.problem && project.description && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>About</SectionLabel>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="normal"
                >
                  {project.description}
                </Box>
              </Box>
            )}
          </Box>

          {/* Right column */}
          <Box>
            {project.outcome && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>Outcome</SectionLabel>
                <Box
                  fontSize="base"
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="normal"
                >
                  {project.outcome}
                </Box>
              </Box>
            )}

            {project.stack && project.stack.length > 0 && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>Stack</SectionLabel>
                <Flex wrap="wrap" gap="2">
                  {project.stack.map((tech) => (
                    <Box key={tech} className={stackTagClass}>
                      {tech}
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}

            {(project.liveUrl || project.externalUrl || project.githubUrl) && (
              <Box style={{ marginBottom: '36px' }}>
                <SectionLabel>Links</SectionLabel>
                <Flex direction="column" gap="3">
                  {(project.liveUrl || project.externalUrl) && (
                    <a
                      href={project.liveUrl || project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Box fontSize="sm" fontFamily="body" color="accent" letterSpacing="wide">
                        View live ↗
                      </Box>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Box fontSize="sm" fontFamily="body" color="text.secondary" letterSpacing="wide">
                        GitHub →
                      </Box>
                    </a>
                  )}
                </Flex>
              </Box>
            )}
          </Box>

        </div>
      </Box>

      {/* ── Adjacent work ── */}
      <Box borderTop="1px solid" borderColor="border" style={{ padding: '24px' }}>
        <Flex justify="space-between" align="center">
          <Box fontSize="xs" fontFamily="body" color="text.muted" letterSpacing="widest" style={{ textTransform: 'uppercase' }}>
            More Work
          </Box>
          <a href="/" style={{ textDecoration: 'none' }}>
            <Box fontSize="xs" fontFamily="body" color="text.muted" letterSpacing="wide">
              View all →
            </Box>
          </a>
        </Flex>
      </Box>

    </Box>
  )
}