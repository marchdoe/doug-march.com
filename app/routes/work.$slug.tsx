import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { projects, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

const subhead = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'md',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  margin: '6 0 3',
  paddingTop: '4',
  borderTop: '2px solid',
  borderColor: 'border',
})

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Box padding="12" fontFamily="display" fontSize="xl" textTransform="uppercase">
        Story Not Found
      </Box>
    )
  }

  const next = [...selectedWork, ...experiments].filter((p) => p.slug !== project.slug).slice(0, 4)

  return (
    <>
      {/* BANNER */}
      <Box
        bg="bg"
        minH="30vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={{ base: '5', md: '12' }}
        py={{ base: '5', md: '8' }}
        borderBottom="2px solid"
        borderColor="border"
      >
        <Box
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text"
          marginBottom="3"
        >
          {project.type} · {project.year}
        </Box>
        <Box
          as="h1"
          fontFamily="display"
          fontWeight="bold"
          textTransform="uppercase"
          color="knockout"
          margin="0"
          lineHeight="tight"
          letterSpacing="tight"
          style={{ fontSize: 'clamp(48px, 9vw, 128px)' }}
        >
          {project.title}
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1.6fr 1fr 1fr' }}>
        <Box padding={{ base: '5', md: '6' }}>
          {project.problem && (
            <Box bg="panel" color="knockout" padding="5" marginBottom="6">
              <Box fontSize="2xs" letterSpacing="widest" textTransform="uppercase" color="bg" fontWeight="bold">
                The Problem
              </Box>
              <Box as="p" fontSize="md" lineHeight="normal" color="knockout" marginTop="2" marginBottom="4">
                {project.problem}
              </Box>
              {(project.liveUrl || project.externalUrl) && (
                <a
                  href={project.liveUrl || project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontSize: 'xs',
                    fontWeight: 'bold',
                    letterSpacing: 'wide',
                    textTransform: 'uppercase',
                    color: 'bg',
                    borderBottom: '2px solid',
                    borderColor: 'bg',
                    paddingBottom: '1px',
                    transition: 'background .18s ease, color .18s ease',
                    _hover: { bg: 'bg', color: 'panel' },
                  })}
                >
                  Visit the live story ↗
                </a>
              )}
            </Box>
          )}

          {project.approach && (
            <>
              <Box as="h3" className={subhead}>
                The Approach
              </Box>
              <Box as="p" fontSize="sm" lineHeight="normal" color="text" marginBottom="4">
                {project.approach}
              </Box>
            </>
          )}

          {project.outcome && (
            <>
              <Box as="h3" className={subhead}>
                The Outcome
              </Box>
              <Box as="p" fontSize="sm" lineHeight="normal" color="text" marginBottom="4">
                {project.outcome}
              </Box>
            </>
          )}
        </Box>

        <Box
          padding={{ base: '5', md: '6' }}
          borderTop={{ base: '2px solid', md: 'none' }}
          borderLeft={{ base: 'none', md: '2px solid' }}
          borderColor="border"
        >
          {project.role && (
            <>
              <Box as="h3" className={subhead} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                Role
              </Box>
              <Box as="p" fontSize="sm" color="text" marginBottom="4">
                {project.role}
              </Box>
            </>
          )}
          {project.stack && project.stack.length > 0 && (
            <>
              <Box as="h3" className={subhead}>
                Stack
              </Box>
              <Box as="p" fontSize="sm" color="text">
                {project.stack.join(' · ')}
              </Box>
            </>
          )}
        </Box>

        <Box
          padding={{ base: '5', md: '6' }}
          borderTop={{ base: '2px solid', md: 'none' }}
          borderLeft={{ base: 'none', md: '2px solid' }}
          borderColor="border"
        >
          <Box as="h3" className={subhead} style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            Next in the Section
          </Box>
          <Box as="ul" listStyle="none" margin="0" padding="0">
            {next.map((p) => (
              <Box
                as="li"
                key={p.slug}
                borderBottom="1px solid"
                borderColor="border"
                _first={{ borderTop: '1px solid', borderColor: 'border' }}
              >
                <a
                  href={`/work/${p.slug}`}
                  className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '3',
                    padding: '2px 4px',
                    margin: '-2px -4px',
                    transition: 'background .16s ease, color .16s ease',
                    _hover: { bg: 'panel', color: 'knockout' },
                  })}
                >
                  <span
                    className={css({
                      fontFamily: 'display',
                      fontWeight: 'bold',
                      fontSize: 'lg',
                      textTransform: 'uppercase',
                      letterSpacing: 'tight',
                    })}
                  >
                    {p.title}
                  </span>
                  <span className={css({ fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'text' })}>
                    {p.type} · {p.year}
                  </span>
                </a>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}