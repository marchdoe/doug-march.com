import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Footer } from '../components/Footer'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : projects[0]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      {/* CANDLE BAND — title marquee */}
      <Box
        as="section"
        minH="34vh"
        padding={{ base: '10 6vw', md: 'clamp(40px,7vw,80px) 6vw' }}
        bg="bgCandle"
        color="textOnCandle"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        boxShadow="0 40px 120px token(colors.lime.400/35)"
      >
        <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'olive.700', marginBottom: '5' })}>
          {project.type} · {project.year}
        </p>
        <h1 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'clamp(48px,7vw,112px)', lineHeight: 'tight', letterSpacing: 'tight', maxWidth: '16ch' })}>
          {project.title}
        </h1>
      </Box>

      {/* DARKNESS BAND — problem statement */}
      {project.problem && (
        <Box as="section" minH="22vh" padding={{ base: '10 6vw', md: 'clamp(40px,6vw,72px) 6vw' }} bg="bg" display="flex" flexDirection="column" justifyContent="center">
          <h2 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'clamp(28px,4.5vw,56px)', lineHeight: 'tight', letterSpacing: 'tight', color: 'accent', maxWidth: '20ch' })}>
            {project.problem}
          </h2>
        </Box>
      )}

      {/* WORK BAND — role / approach / outcome / link */}
      <Box as="section" padding={{ base: '10 6vw', md: 'clamp(48px,7vw,88px) 6vw' }} bg="bgLedger" borderTop="1px solid" borderColor="border">
        <Box display="flex" flexDirection="column" gap="6" maxW="70ch">
          {project.role && (
            <div>
              <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>Role</p>
              <p className={css({ fontSize: 'md', color: 'text' })}>{project.role}</p>
            </div>
          )}
          {project.approach && (
            <div>
              <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>Approach</p>
              <p className={css({ fontSize: 'md', color: 'textSecondary', lineHeight: 'loose' })}>{project.approach}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted', marginBottom: '2' })}>Outcome</p>
              <p className={css({ fontSize: 'md', color: 'accent', lineHeight: 'loose' })}>{project.outcome}</p>
            </div>
          )}
          {project.stack && project.stack.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap="3">
              {project.stack.map((tech) => (
                <span key={tech} className={css({ fontSize: 'xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textSecondary', border: '1px solid', borderColor: 'border', borderRadius: 'sm', padding: '1 3' })}>
                  {tech}
                </span>
              ))}
            </Box>
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
                width: 'max-content',
                fontFamily: 'body',
                fontWeight: 'bold',
                fontSize: 'sm',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'olive.900',
                background: 'accent',
                padding: '3 5',
                borderRadius: 'sm',
                minH: '44px',
                _hover: { background: 'lime.300' },
              })}
            >
              Visit project <span aria-hidden="true">↗</span>
            </a>
          )}
        </Box>
      </Box>

      <Footer
        extraNavLinks={[
          { label: `← ${prev.title}`, href: `/work/${prev.slug}` },
          { label: `${next.title} →`, href: `/work/${next.slug}` },
        ]}
      />
    </>
  )
}