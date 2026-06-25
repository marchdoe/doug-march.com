import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: ProjectPage })

function ProjectPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box className={css({ padding: '48px 4vw' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 'bold',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            textTransform: 'uppercase',
          })}
        >
          Not Found
        </h1>
        <p className={css({ fontFamily: 'body', fontSize: '16px', color: 'textSecondary', marginTop: '16px' })}>
          This project doesn't exist.
        </p>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            marginTop: '24px',
            display: 'inline-block',
            padding: '12px 0',
            _hover: { color: 'accentLight' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← Back
        </a>
      </Box>
    )
  }

  return (
    <Box className={css({ padding: { base: '32px 5vw', md: '48px 4vw' }, maxWidth: '1200px' })}>
      {/* Project title */}
      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'bold',
          fontSize: 'clamp(48px, 10vw, 160px)',
          lineHeight: 'tight',
          letterSpacing: 'tight',
          color: 'text',
          textTransform: 'uppercase',
          marginBottom: '8px',
        })}
      >
        {project.title}
      </h1>

      {/* Meta row */}
      <Flex
        className={css({
          gap: '16px',
          alignItems: 'baseline',
          marginBottom: '32px',
          flexWrap: 'wrap',
        })}
      >
        <span
          className={css({
            fontFamily: 'mono',
            fontSize: '13px',
            color: 'textMuted',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
          })}
        >
          {project.type}
        </span>
        <span className={css({ fontFamily: 'mono', fontSize: '13px', color: 'textMuted', fontVariantNumeric: 'tabular-nums' })}>
          {project.year}
        </span>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              color: 'accent',
              letterSpacing: 'wide',
              padding: '12px 0',
              _hover: { color: 'accentLight' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Visit ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={css({
              fontFamily: 'mono',
              fontSize: '13px',
              color: 'accent',
              letterSpacing: 'wide',
              padding: '12px 0',
              _hover: { color: 'accentLight' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            GitHub ↗
          </a>
        )}
      </Flex>

      <div className={css({ width: '100%', height: '1px', background: 'border', marginBottom: '32px' })} />

      {/* Content sections */}
      {project.role && (
        <Box className={css({ marginBottom: '32px' })}>
          <p className={css({ fontFamily: 'mono', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
            Role
          </p>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'loose', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.role}
          </p>
        </Box>
      )}

      {project.problem && (
        <Box className={css({ marginBottom: '32px' })}>
          <p className={css({ fontFamily: 'mono', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
            Problem
          </p>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'loose', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.problem}
          </p>
        </Box>
      )}

      {project.approach && (
        <Box className={css({ marginBottom: '32px' })}>
          <p className={css({ fontFamily: 'mono', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
            Approach
          </p>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'loose', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.approach}
          </p>
        </Box>
      )}

      {project.outcome && (
        <Box className={css({ marginBottom: '32px' })}>
          <p className={css({ fontFamily: 'mono', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '8px' })}>
            Outcome
          </p>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'loose', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.outcome}
          </p>
        </Box>
      )}

      {project.description && (
        <Box className={css({ marginBottom: '32px' })}>
          <p className={css({ fontFamily: 'body', fontSize: '16px', lineHeight: 'loose', color: 'textSecondary', maxWidth: '65ch' })}>
            {project.description}
          </p>
        </Box>
      )}

      {project.stack && project.stack.length > 0 && (
        <Box className={css({ marginBottom: '32px' })}>
          <p className={css({ fontFamily: 'mono', fontSize: '11px', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '12px' })}>
            Stack
          </p>
          <Flex className={css({ flexWrap: 'wrap', gap: '8px' })}>
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className={css({
                  fontFamily: 'mono',
                  fontSize: '13px',
                  color: 'textSecondary',
                  border: '1px solid',
                  borderColor: 'border',
                  padding: '6px 12px',
                  borderRadius: 'sm',
                })}
              >
                {tech}
              </span>
            ))}
          </Flex>
        </Box>
      )}

      {/* Back link */}
      <div className={css({ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid', borderColor: 'border' })}>
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'accent',
            padding: '12px 0',
            display: 'inline-block',
            _hover: { color: 'accentLight' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          ← All Projects
        </a>
      </div>
    </Box>
  )
}