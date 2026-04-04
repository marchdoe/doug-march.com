import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box style={{ textAlign: 'center' }}>
          <Box
            fontFamily="serif"
            fontSize="lg"
            style={{
              fontWeight: '400',
              color: '#3A3228',
              marginBottom: '24px',
              fontStyle: 'italic',
            }}
          >
            Project not found.
          </Box>
          <a href="/" style={{ textDecoration: 'none', borderBottom: 'none' }}>
            <Box
              fontFamily="body"
              fontSize="xs"
              color="accent"
              style={{ letterSpacing: '0.04em' }}
            >
              ← Back home
            </Box>
          </a>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* ── Project Header ── */}
      <Box
        as="section"
        style={{
          borderBottom: '1px solid #E5DFC8',
          paddingTop: '96px',
          paddingBottom: '64px',
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            paddingLeft: '48px',
            paddingRight: '48px',
          }}
        >
          {/* Breadcrumb */}
          <Flex align="center" style={{ gap: '8px', marginBottom: '40px' }}>
            <a href="/" style={{ textDecoration: 'none', borderBottom: 'none' }}>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{ letterSpacing: '0.04em' }}
              >
                Doug March
              </Box>
            </a>
            <Box fontFamily="body" fontSize="xs" color="text-disabled">
              /
            </Box>
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-muted"
              style={{ letterSpacing: '0.04em' }}
            >
              Work
            </Box>
            <Box fontFamily="body" fontSize="xs" color="text-disabled">
              /
            </Box>
            <Box
              fontFamily="body"
              fontSize="xs"
              color="text-secondary"
              style={{ letterSpacing: '0.04em' }}
            >
              {project.title}
            </Box>
          </Flex>

          {/* Type + Year label */}
          <Box
            fontFamily="body"
            fontSize="xs"
            color="accent"
            style={{
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: '16px',
            }}
          >
            {project.type}
            <Box as="span" color="text-disabled" style={{ margin: '0 8px' }}>
              ·
            </Box>
            <Box as="span" color="text-muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {project.year}
            </Box>
          </Box>

          {/* Project title */}
          <Box
            fontFamily="serif"
            fontSize="2xl"
            style={{
              fontWeight: '700',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: '#120D09',
              marginBottom: '20px',
            }}
          >
            {project.title}
          </Box>

          {/* Role */}
          {project.role && (
            <Box
              fontFamily="body"
              fontSize="sm"
              color="text-secondary"
              style={{
                letterSpacing: '0.04em',
                lineHeight: '1.4',
              }}
            >
              {project.role}
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Project Image ── */}
      <Box style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            paddingLeft: '48px',
            paddingRight: '48px',
            paddingTop: '48px',
            paddingBottom: '48px',
          }}
        >
          <Box
            style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #E5DFC8 0%, #C8BFA0 45%, #BBD4A4 100%)',
              border: '1px solid #E5DFC8',
              boxShadow: '0 1px 4px rgba(33, 28, 20, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              fontFamily="serif"
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontStyle: 'italic',
                fontWeight: '400',
                color: '#C8BFA0',
                lineHeight: '1',
                letterSpacing: '-0.02em',
                userSelect: 'none',
              }}
            >
              {project.title}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Project Content ── */}
      <Box style={{ borderBottom: '1px solid #E5DFC8' }}>
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            paddingLeft: '48px',
            paddingRight: '48px',
            paddingTop: '64px',
            paddingBottom: '64px',
          }}
        >
          {/* Problem */}
          {project.problem && (
            <Box style={{ marginBottom: '48px' }}>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '16px',
                }}
              >
                The Problem
              </Box>
              <Box
                fontFamily="body"
                fontSize="base"
                color="text-secondary"
                style={{
                  lineHeight: '1.65',
                  letterSpacing: '0.04em',
                  maxWidth: '560px',
                }}
              >
                {project.problem}
              </Box>
            </Box>
          )}

          {/* Approach */}
          {project.approach && (
            <Box style={{ marginBottom: '48px' }}>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '16px',
                }}
              >
                Approach
              </Box>
              <Box
                fontFamily="body"
                fontSize="base"
                color="text-secondary"
                style={{
                  lineHeight: '1.65',
                  letterSpacing: '0.04em',
                  maxWidth: '560px',
                }}
              >
                {project.approach}
              </Box>
            </Box>
          )}

          {/* Outcome */}
          {project.outcome && (
            <Box style={{ marginBottom: '48px' }}>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '16px',
                }}
              >
                Outcome
              </Box>
              <Box
                fontFamily="body"
                fontSize="base"
                color="text-secondary"
                style={{
                  lineHeight: '1.65',
                  letterSpacing: '0.04em',
                  maxWidth: '560px',
                }}
              >
                {project.outcome}
              </Box>
            </Box>
          )}

          {/* Description fallback */}
          {!project.problem && !project.approach && !project.outcome && project.description && (
            <Box style={{ marginBottom: '48px' }}>
              <Box
                fontFamily="body"
                fontSize="base"
                color="text-secondary"
                style={{
                  lineHeight: '1.65',
                  letterSpacing: '0.04em',
                  maxWidth: '560px',
                }}
              >
                {project.description}
              </Box>
            </Box>
          )}

          {/* Stack */}
          {project.stack && project.stack.length > 0 && (
            <Box style={{ marginBottom: '48px' }}>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '16px',
                }}
              >
                Stack
              </Box>
              <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.stack.map((tech) => (
                  <Box
                    key={tech}
                    fontFamily="body"
                    fontSize="xs"
                    color="text-secondary"
                    style={{
                      padding: '5px 12px',
                      border: '1px solid #E5DFC8',
                      borderRadius: '3px',
                      backgroundColor: '#FAFAF4',
                      letterSpacing: '0.04em',
                      boxShadow: '0 1px 4px rgba(33, 28, 20, 0.04)',
                    }}
                  >
                    {tech}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Links */}
          {(project.liveUrl || project.externalUrl || project.githubUrl) && (
            <Flex style={{ gap: '12px', flexWrap: 'wrap' }}>
              {(project.liveUrl || project.externalUrl) && (
                <a
                  href={project.liveUrl || project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', borderBottom: 'none' }}
                >
                  <Box
                    fontFamily="body"
                    fontSize="xs"
                    style={{
                      padding: '10px 24px',
                      borderRadius: '28px',
                      backgroundColor: '#6A9D51',
                      color: 'white',
                      letterSpacing: '0.04em',
                      fontWeight: '600',
                      transition: 'all 140ms ease',
                      display: 'inline-block',
                    }}
                    className={css({ _hover: { backgroundColor: 'accent-dark' } })}
                  >
                    View Project →
                  </Box>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', borderBottom: 'none' }}
                >
                  <Box
                    fontFamily="body"
                    fontSize="xs"
                    style={{
                      padding: '10px 24px',
                      borderRadius: '28px',
                      border: '1px solid #E5DFC8',
                      color: '#574E3F',
                      letterSpacing: '0.04em',
                      fontWeight: '600',
                      transition: 'all 140ms ease',
                      display: 'inline-block',
                      backgroundColor: '#FAFAF4',
                    }}
                    className={css({ _hover: { borderColor: 'border', backgroundColor: 'card-bg' } })}
                  >
                    GitHub
                  </Box>
                </a>
              )}
            </Flex>
          )}
        </Box>
      </Box>

      {/* ── Quote Beat (project pages get a quieter version) ── */}
      <Box
        backgroundColor="card-bg"
        style={{
          borderBottom: '1px solid #E5DFC8',
          paddingTop: '64px',
          paddingBottom: '64px',
        }}
      >
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            paddingLeft: '48px',
            paddingRight: '48px',
          }}
        >
          <Box
            fontFamily="serif"
            fontSize="xl"
            style={{
              fontStyle: 'italic',
              fontWeight: '400',
              color: '#120D09',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Smile, breathe and go slowly.
          </Box>
          <Box
            style={{
              width: '48px',
              height: '1px',
              backgroundColor: '#6A9D51',
              marginBottom: '12px',
            }}
          />
          <Box
            fontFamily="body"
            fontSize="xs"
            color="text-muted"
            style={{ letterSpacing: '0.04em' }}
          >
            — Thich Nhat Hanh
          </Box>
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box as="footer">
        <Box
          style={{
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '64px 48px',
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: '20px' }}
          >
            <a href="/" style={{ textDecoration: 'none', borderBottom: 'none' }}>
              <Box
                fontFamily="body"
                fontSize="xs"
                color="text-muted"
                style={{ letterSpacing: '0.04em' }}
              >
                ← Back to work
              </Box>
            </a>
            <Flex style={{ gap: '24px' }}>
              <a href="/about" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                <Box fontFamily="body" fontSize="xs" color="text-muted">About</Box>
              </a>
              <a href="/archive" style={{ textDecoration: 'none', borderBottom: 'none' }}>
                <Box fontFamily="body" fontSize="xs" color="text-muted">Archive</Box>
              </a>
            </Flex>
          </Flex>

          <Box style={{ borderTop: '1px solid #E5DFC8', paddingTop: '16px' }}>
            <Flex justify="space-between" align="center">
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{ letterSpacing: '0.04em' }}
              >
                © 2026 Doug March
              </Box>
              <Box
                fontFamily="body"
                fontSize="2xs"
                color="text-muted"
                style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}
              >
                Valero Texas Open — R. MacIntyre −14
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}