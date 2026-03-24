import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

const metaLabel = css({
  fontFamily: 'body',
  fontSize: '2xs',
  fontWeight: 'bold',
  letterSpacing: 'widest',
  color: 'textMuted',
  textTransform: 'uppercase',
})

const bodyText = css({
  fontFamily: 'body',
  fontSize: 'base',
  fontWeight: 'light',
  color: 'textSecondary',
  lineHeight: 'normal',
})

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 64px',
        }}
      >
        <Box
          className={css({
            fontFamily: 'heading',
            fontWeight: 'black',
            color: 'text',
            textTransform: 'uppercase',
            lineHeight: 'tight',
          })}
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.03em', marginBottom: '32px' }}
        >
          Not Found
        </Box>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            fontWeight: 'regular',
            letterSpacing: 'widest',
            color: 'textSecondary',
            textTransform: 'uppercase',
            textDecoration: 'none',
            _hover: { color: 'text', textDecoration: 'underline' },
          })}
        >
          ← Back to work
        </a>
      </Box>
    )
  }

  return (
    <>
      {/* ── PROJECT SPECIMEN HEADER ────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 64px 0 64px',
        }}
      >
        {/* Breadcrumb */}
        <Box style={{ marginBottom: '32px' }}>
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: 'xs',
              fontWeight: 'light',
              letterSpacing: 'widest',
              color: 'textMuted',
              textTransform: 'uppercase',
              textDecoration: 'none',
              _hover: { color: 'textSecondary', textDecoration: 'underline' },
            })}
          >
            ← Work
          </a>
        </Box>

        {/* Title at display scale */}
        <h1
          className={css({
            fontFamily: 'heading',
            fontWeight: 'black',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            textTransform: 'uppercase',
            margin: '0',
          })}
          style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
        >
          {project.title}
        </h1>

        {/* Metadata strip */}
        <Flex
          gap="8"
          align="center"
          style={{
            borderTop: '1px solid #CBD1D8',
            marginTop: '32px',
            paddingTop: '20px',
          }}
        >
          <Box>
            <Box className={metaLabel} style={{ marginBottom: '4px' }}>Type</Box>
            <Box className={css({ fontFamily: 'body', fontSize: 'sm', fontWeight: 'light', color: 'textSecondary', letterSpacing: 'wide', textTransform: 'uppercase' })}>
              {project.type}
            </Box>
          </Box>
          <Box style={{ width: '1px', height: '32px', background: '#CBD1D8' }} />
          <Box>
            <Box className={metaLabel} style={{ marginBottom: '4px' }}>Year</Box>
            <Box className={css({ fontFamily: 'body', fontSize: 'sm', fontWeight: 'light', color: 'textSecondary' })}>
              {project.year}
            </Box>
          </Box>
          {project.role && (
            <>
              <Box style={{ width: '1px', height: '32px', background: '#CBD1D8' }} />
              <Box>
                <Box className={metaLabel} style={{ marginBottom: '4px' }}>Role</Box>
                <Box className={css({ fontFamily: 'body', fontSize: 'sm', fontWeight: 'light', color: 'textSecondary' })}>
                  {project.role}
                </Box>
              </Box>
            </>
          )}
          {(project.liveUrl || project.externalUrl) && (
            <Box style={{ marginLeft: 'auto' }}>
              <a
                href={project.liveUrl || project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  fontFamily: 'body',
                  fontSize: 'xs',
                  fontWeight: 'regular',
                  letterSpacing: 'widest',
                  color: 'accent',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  border: '1px solid',
                  borderColor: 'accent',
                  _hover: { background: 'accentBg', color: 'accentText' },
                })}
                style={{ padding: '8px 16px' }}
              >
                Visit Project →
              </a>
            </Box>
          )}
        </Flex>
      </Box>

      {/* ── CASE STUDY CONTENT ─────────────────────────────────────── */}
      <Box
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 64px 96px 64px',
        }}
      >
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <Box>
            {project.problem && (
              <Box style={{ marginBottom: '48px' }}>
                <Box className={metaLabel} style={{ marginBottom: '16px' }}>
                  Problem
                </Box>
                <Box
                  style={{
                    borderTop: '1px solid #CBD1D8',
                    paddingTop: '20px',
                  }}
                >
                  <p className={bodyText}>{project.problem}</p>
                </Box>
              </Box>
            )}

            {project.approach && (
              <Box style={{ marginBottom: '48px' }}>
                <Box className={metaLabel} style={{ marginBottom: '16px' }}>
                  Approach
                </Box>
                <Box style={{ borderTop: '1px solid #CBD1D8', paddingTop: '20px' }}>
                  <p className={bodyText}>{project.approach}</p>
                </Box>
              </Box>
            )}
          </Box>

          {/* Right column */}
          <Box>
            {project.outcome && (
              <Box style={{ marginBottom: '48px' }}>
                <Box className={metaLabel} style={{ marginBottom: '16px' }}>
                  Outcome
                </Box>
                <Box style={{ borderTop: '1px solid #CBD1D8', paddingTop: '20px' }}>
                  <p className={bodyText}>{project.outcome}</p>
                </Box>
              </Box>
            )}

            {project.description && !project.outcome && (
              <Box style={{ marginBottom: '48px' }}>
                <Box className={metaLabel} style={{ marginBottom: '16px' }}>
                  Overview
                </Box>
                <Box style={{ borderTop: '1px solid #CBD1D8', paddingTop: '20px' }}>
                  <p className={bodyText}>{project.description}</p>
                </Box>
              </Box>
            )}

            {project.stack && project.stack.length > 0 && (
              <Box>
                <Box className={metaLabel} style={{ marginBottom: '16px' }}>
                  Stack
                </Box>
                <Box style={{ borderTop: '1px solid #CBD1D8', paddingTop: '20px' }}>
                  <Flex gap="2" style={{ flexWrap: 'wrap' }}>
                    {project.stack.map((tech) => (
                      <Box
                        key={tech}
                        className={css({
                          fontFamily: 'body',
                          fontSize: 'xs',
                          fontWeight: 'light',
                          color: 'textSecondary',
                          letterSpacing: 'wide',
                          textTransform: 'uppercase',
                          border: '1px solid',
                          borderColor: 'border',
                        })}
                        style={{ padding: '5px 10px' }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* GitHub link if available */}
        {project.githubUrl && (
          <Box
            style={{
              marginTop: '48px',
              borderTop: '1px solid #CBD1D8',
              paddingTop: '24px',
            }}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                fontFamily: 'body',
                fontSize: 'xs',
                fontWeight: 'regular',
                letterSpacing: 'widest',
                color: 'textSecondary',
                textTransform: 'uppercase',
                textDecoration: 'none',
                _hover: { color: 'text', textDecoration: 'underline' },
              })}
            >
              View on GitHub →
            </a>
          </Box>
        )}
      </Box>
    </>
  )
}