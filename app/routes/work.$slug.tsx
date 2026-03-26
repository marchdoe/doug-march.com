import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '96px 48px',
        }}
      >
        <Box
          fontFamily="heading"
          fontWeight="700"
          fontSize="2xl"
          color="text"
          letterSpacing="tight"
          lineHeight="tight"
          style={{ textTransform: 'uppercase', marginBottom: '32px' }}
        >
          404
        </Box>
        <Box
          fontFamily="body"
          fontWeight="300"
          fontSize="md"
          color="textSecondary"
          style={{ marginBottom: '32px' }}
        >
          Project not found.
        </Box>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: 'sm',
            color: 'accent',
            textDecoration: 'none',
            letterSpacing: 'wide',
            transition: 'color 150ms ease',
            _hover: { color: 'accentDark' },
          })}
        >
          ← Back to work
        </a>
      </Box>
    )
  }

  return (
    <Box as="main">
      {/* ─── Hero ─── */}
      <Box
        as="section"
        style={{
          minHeight: '55vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '120px 48px 64px',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Back link */}
        <Box style={{ marginBottom: '48px' }}>
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontWeight: '400',
              fontSize: 'xs',
              color: 'textMuted',
              textDecoration: 'none',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              transition: 'color 150ms ease',
              _hover: { color: 'accent' },
            })}
          >
            ← Work
          </a>
        </Box>

        {/* Type + Year */}
        <Flex gap="4" align="center" style={{ marginBottom: '20px' }}>
          <Box
            fontFamily="body"
            fontWeight="400"
            fontSize="2xs"
            color="accent"
            letterSpacing="widest"
            style={{ textTransform: 'uppercase' }}
          >
            {project.type}
          </Box>
          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="2xs"
            color="textMuted"
            letterSpacing="widest"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {project.year}
          </Box>
          {project.featured && (
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              letterSpacing="widest"
              style={{
                textTransform: 'uppercase',
                color: '#c97d1e',
                borderLeft: '1px solid #c9d5c4',
                paddingLeft: '12px',
              }}
            >
              Featured
            </Box>
          )}
        </Flex>

        {/* Title */}
        <Box
          fontFamily="heading"
          fontWeight="700"
          fontSize="xl"
          color="text"
          letterSpacing="tight"
          lineHeight="tight"
          style={{ textTransform: 'uppercase', marginBottom: '24px' }}
        >
          {project.title}
        </Box>

        {/* Horizon rule */}
        <Box
          style={{
            width: '80px',
            borderTop: '1px solid #a3b49d',
          }}
        />
      </Box>

      {/* ─── Detail Content ─── */}
      <Box
        as="section"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '64px 48px 80px',
        }}
      >
        {project.role && (
          <Box style={{ marginBottom: '40px' }}>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '12px' }}
            >
              Role
            </Box>
            <Box
              fontFamily="heading"
              fontWeight="600"
              fontSize="base"
              color="textSecondary"
            >
              {project.role}
            </Box>
          </Box>
        )}

        {project.problem && (
          <Box
            style={{
              marginBottom: '48px',
              paddingBottom: '48px',
              borderBottom: '1px solid #c9d5c4',
            }}
          >
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Problem
            </Box>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="md"
              color="textBody"
              lineHeight="normal"
              letterSpacing="normal"
            >
              {project.problem}
            </Box>
          </Box>
        )}

        {project.approach && (
          <Box
            style={{
              marginBottom: '48px',
              paddingBottom: '48px',
              borderBottom: '1px solid #c9d5c4',
            }}
          >
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Approach
            </Box>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="base"
              color="textBody"
              lineHeight="normal"
            >
              {project.approach}
            </Box>
          </Box>
        )}

        {project.outcome && (
          <Box
            style={{
              marginBottom: '48px',
              paddingBottom: '48px',
              borderBottom: '1px solid #c9d5c4',
            }}
          >
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Outcome
            </Box>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="base"
              color="textBody"
              lineHeight="normal"
            >
              {project.outcome}
            </Box>
          </Box>
        )}

        {project.description && !project.problem && (
          <Box
            style={{
              marginBottom: '48px',
              paddingBottom: '48px',
              borderBottom: '1px solid #c9d5c4',
            }}
          >
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="base"
              color="textBody"
              lineHeight="normal"
            >
              {project.description}
            </Box>
          </Box>
        )}

        {project.stack && project.stack.length > 0 && (
          <Box style={{ marginBottom: '48px' }}>
            <Box
              fontFamily="body"
              fontWeight="400"
              fontSize="2xs"
              color="textMuted"
              letterSpacing="widest"
              style={{ textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Stack
            </Box>
            <Box
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {project.stack.map((tech) => (
                <Box
                  key={tech}
                  fontFamily="body"
                  fontWeight="400"
                  fontSize="xs"
                  color="textSecondary"
                  style={{
                    padding: '5px 10px',
                    background: '#eaf0e6',
                    border: '1px solid #c9d5c4',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* External links */}
        {(project.liveUrl || project.githubUrl || project.externalUrl) && (
          <Flex gap="6" align="center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  fontFamily: 'heading',
                  fontWeight: '600',
                  fontSize: 'xs',
                  color: 'accent',
                  textDecoration: 'none',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  transition: 'color 150ms ease',
                  _hover: { color: 'accentDark' },
                })}
              >
                Live Site →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  fontFamily: 'heading',
                  fontWeight: '600',
                  fontSize: 'xs',
                  color: 'textSecondary',
                  textDecoration: 'none',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  transition: 'color 150ms ease',
                  _hover: { color: 'accent' },
                })}
              >
                GitHub →
              </a>
            )}
            {project.externalUrl && !project.liveUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  fontFamily: 'heading',
                  fontWeight: '600',
                  fontSize: 'xs',
                  color: 'accent',
                  textDecoration: 'none',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  transition: 'color 150ms ease',
                  _hover: { color: 'accentDark' },
                })}
              >
                View Project →
              </a>
            )}
          </Flex>
        )}
      </Box>

      {/* ─── Alternate bg: next project hint ─── */}
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
            maxWidth: '760px',
            width: '100%',
            padding: '48px',
          }}
        >
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontWeight: '400',
              fontSize: 'xs',
              color: 'textMuted',
              textDecoration: 'none',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              transition: 'color 150ms ease',
              _hover: { color: 'accent' },
            })}
          >
            ← All Work
          </a>
        </Box>
      </Box>

      {/* ─── Footer ─── */}
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
          style={{ maxWidth: '760px', width: '100%' }}
        >
          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="xs"
            style={{ color: '#596658' }}
          >
            March 26, 2026
          </Box>
          <Box
            fontFamily="body"
            fontWeight="300"
            fontSize="xs"
            style={{ color: '#596658' }}
          >
            © 2026 Doug March
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}