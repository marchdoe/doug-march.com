import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box paddingY="12">
        <p className={css({ fontSize: 'lg', color: 'text' })}>404 — no such directory.</p>
        <a href="/" className={css({ color: 'accent', fontSize: 'sm' })}>cd ~/doug-march</a>
      </Box>
    )
  }

  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <>
      <p
        className={css({
          fontSize: 'xs',
          color: 'textMuted',
          letterSpacing: 'normal',
          paddingTop: '4',
        })}
      >
        <span className={css({ color: 'pine.400' })}>~/doug-march/work/{project.slug}</span> —
      </p>

      {/* HERO */}
      <Box
        as="section"
        className={css({
          paddingY: { base: '8', md: '10' },
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '4xl', md: '6xl', lg: '7xl' },
            lineHeight: 'tight',
            letterSpacing: 'normal',
            textTransform: 'uppercase',
            color: 'text',
          })}
        >
          {project.title}
        </h1>
        <Flex gap="4" className={css({ marginTop: '4', fontSize: '2xs', letterSpacing: 'wide', color: 'textMuted', textTransform: 'uppercase' })}>
          <span>{project.type}</span>
          <span className={css({ color: 'pine.400' })}>{project.year}</span>
        </Flex>
      </Box>

      <Box
        as="main"
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1.6fr 1fr' },
          paddingY: '8',
          gap: { base: '8', md: '0' },
        })}
      >
        <Box className={css({ paddingX: { base: 0, md: '8' }, paddingLeft: 0 })}>
          {project.problem && (
            <Box marginBottom="8">
              <SectionLabel>problem ::</SectionLabel>
              <p className={css({ fontSize: 'md', lineHeight: 'loose', color: 'textSecondary', maxWidth: '70ch' })}>
                {project.problem}
              </p>
            </Box>
          )}
          {project.approach && (
            <Box marginBottom="8">
              <SectionLabel>approach ::</SectionLabel>
              <p className={css({ fontSize: 'md', lineHeight: 'loose', color: 'textSecondary', maxWidth: '70ch' })}>
                {project.approach}
              </p>
            </Box>
          )}
          {project.outcome && (
            <Box marginBottom="8">
              <SectionLabel>outcome ::</SectionLabel>
              <p className={css({ fontSize: 'md', lineHeight: 'loose', color: 'textSecondary', maxWidth: '70ch' })}>
                {project.outcome}
              </p>
            </Box>
          )}
        </Box>

        <Box
          as="aside"
          className={css({
            paddingX: { base: 0, md: '8' },
            borderLeft: { base: 'none', md: '1px solid' },
            borderColor: 'border',
          })}
        >
          {project.role && (
            <MetaRow label="role" value={project.role} />
          )}
          {project.stack && (
            <MetaRow label="stack" value={project.stack.join(' · ')} />
          )}
          {(project.liveUrl || project.externalUrl) && (
            <a
              href={project.liveUrl ?? project.externalUrl}
              target="_blank"
              rel="noopener"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2',
                fontSize: 'xs',
                color: 'accent',
                paddingY: '3',
                minHeight: '44px',
                _hover: { color: 'accentBright' },
              })}
            >
              visit live <span>→</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener"
              className={css({
                display: 'block',
                fontSize: 'xs',
                color: 'accent',
                paddingY: '2',
                _hover: { color: 'accentBright' },
              })}
            >
              source →
            </a>
          )}

          <Box marginTop="10">
            <a
              href={`/work/${next.slug}`}
              className={css({
                display: 'grid',
                gridTemplateColumns: '26px 1fr auto',
                alignItems: 'baseline',
                gap: '3',
                paddingY: '3',
                borderTop: '1px solid',
                borderColor: 'pine.600',
                _hover: { background: 'rgba(41,206,127,0.03)' },
              })}
            >
              <span className={css({ fontSize: '2xs', color: 'pine.400' })}>→</span>
              <span className={css({ fontSize: 'md', color: 'text' })}>next dir · {next.title}</span>
              <span className={css({ fontSize: '2xs', color: 'textMuted' })}>{next.year}</span>
            </a>
          </Box>
        </Box>
      </Box>
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={css({
        fontSize: '2xs',
        letterSpacing: 'wider',
        textTransform: 'uppercase',
        color: 'pine.400',
        marginBottom: '2',
      })}
    >
      {children}
    </p>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex
      justify="space-between"
      gap="4"
      className={css({
        paddingY: '3',
        borderBottom: '1px solid',
        borderColor: 'border',
        fontSize: 'sm',
      })}
    >
      <span className={css({ color: 'pine.400', letterSpacing: 'wide', textTransform: 'uppercase', fontSize: '2xs' })}>
        {label}
      </span>
      <span className={css({ color: 'textSecondary', textAlign: 'right' })}>{value}</span>
    </Flex>
  )
}