import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Footer } from '../components/Footer'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* CANDLE BAND */}
      <Box
        as="section"
        minH="38vh"
        padding={{ base: '10 6vw', md: 'clamp(40px,7vw,80px) 6vw' }}
        bg="bgCandle"
        color="textOnCandle"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        zIndex={2}
        boxShadow="0 40px 120px token(colors.lime.400/35)"
        aria-label="Hero, first line"
      >
        <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'olive.700', marginBottom: { base: '4', md: 'clamp(16px,3vw,28px)' } })}>
          Today's rebuild — 18 July 2026
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(56px,8vw,128px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            maxWidth: '16ch',
          })}
        >
          Better to light a candle
        </h1>
      </Box>

      {/* DARKNESS BAND */}
      <Box
        as="section"
        minH="30vh"
        padding={{ base: '10 6vw 8', md: 'clamp(40px,6vw,72px) 6vw clamp(32px,5vw,56px)' }}
        bg="bg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        zIndex={1}
        aria-label="Hero, second line"
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: 'clamp(56px,8vw,128px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            maxWidth: '18ch',
            color: 'accent',
          })}
        >
          than to curse <span className={css({ color: 'olive.400' })}>the darkness.</span>
        </h1>
        <p className={css({ marginTop: { base: '6', md: 'clamp(24px,4vw,40px)' }, fontFamily: 'body', fontWeight: 'bold', fontSize: 'sm', letterSpacing: 'wider', textTransform: 'uppercase', color: 'textMuted' })}>
          — Chinese Proverb
        </p>
      </Box>

      {/* WORK BAND */}
      <Box as="section" padding={{ base: '10 6vw', md: 'clamp(48px,7vw,88px) 6vw' }} bg="bgLedger" borderTop="1px solid" borderColor="border" aria-label="Selected work">
        <Box display="flex" alignItems="baseline" justifyContent="space-between" gap="4" flexWrap="wrap" marginBottom={{ base: '8', md: 'clamp(28px,4vw,48px)' }}>
          <h2 className={css({ fontSize: { base: 'xl', md: '2xl' }, letterSpacing: 'tight', color: 'text' })}>The work — one candle at a time</h2>
          <span className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'accent' })}>
            Featured · Selected · Experiments
          </span>
        </Box>

        {featuredProject && (
          <Box
            display="grid"
            gap={{ base: '6', md: 'clamp(20px,3vw,40px)' }}
            padding={{ base: '6', md: 'clamp(28px,4vw,44px)' }}
            bg="olive.900"
            border="1px solid"
            borderColor="border"
            borderRadius="md"
            marginBottom={{ base: '10', md: 'clamp(40px,5vw,64px)' }}
            position="relative"
            overflow="hidden"
            borderLeft="6px solid"
            borderLeftColor="accent"
          >
            <div>
              <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textMuted' })}>
                Featured · {featuredProject.type} · {featuredProject.year}
              </p>
              <h3 className={css({ fontSize: 'clamp(34px,5.5vw,72px)', letterSpacing: 'tight', color: 'accent', margin: '4 0 5' })}>
                {featuredProject.title}
              </h3>
              {featuredProject.problem && (
                <p className={css({ fontSize: { base: 'base', md: 'md' }, lineHeight: 'loose', color: 'textSecondary', maxWidth: '60ch', marginBottom: '6' })}>
                  {featuredProject.problem}
                </p>
              )}
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  target="_blank"
                  rel="noopener"
                  className={css({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2',
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
                  Visit the live rebuild <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </Box>
        )}

        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))" gap="4">
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '4',
                padding: '5 6',
                border: '1px solid',
                borderColor: 'border',
                borderRadius: 'md',
                bg: 'olive.900',
                minH: '44px',
                _hover: { bg: 'olive.700', borderColor: 'lime.600' },
              })}
            >
              <span className={css({ fontFamily: 'display', fontWeight: 'semibold', fontSize: 'lg', letterSpacing: 'tight', color: 'text' })}>{project.title}</span>
              <span className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', textAlign: 'right', whiteSpace: 'nowrap' })}>
                <b className={css({ display: 'block', color: 'accent', fontWeight: 'bold', fontSize: '2xs', marginBottom: '1' })}>{project.role ?? project.type}</b>
                {project.year}
              </span>
            </a>
          ))}
        </Box>

        <p className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase', color: 'textSecondary', margin: 'clamp(36px,5vw,56px) 0 4' })}>
          Experiments — small flames
        </p>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))" gap="4">
          {experiments.map((project) => {
            const href = project.externalUrl ?? project.liveUrl ?? `/work/${project.slug}`
            const external = Boolean(project.externalUrl ?? project.liveUrl)
            return (
              <a
                key={project.slug}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener' : undefined}
                className={css({
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '4',
                  padding: '5 6',
                  border: '1px solid',
                  borderColor: 'border',
                  borderRadius: 'md',
                  bg: 'olive.900',
                  minH: '44px',
                  _hover: { bg: 'olive.700', borderColor: 'lime.600' },
                })}
              >
                <span className={css({ fontFamily: 'display', fontWeight: 'semibold', fontSize: 'lg', letterSpacing: 'tight', color: 'text' })}>{project.title}</span>
                <span className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', textAlign: 'right', whiteSpace: 'nowrap' })}>
                  <b className={css({ display: 'block', color: 'accent', fontWeight: 'bold', fontSize: '2xs', marginBottom: '1' })}>Experiment</b>
                  {project.year}
                </span>
              </a>
            )
          })}
        </Box>
      </Box>

      <Footer />
    </>
  )
}