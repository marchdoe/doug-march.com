import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Badge } from '../components/Badge'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <>
        <Badge href="/" ariaLabel="Back to poster" kicker="Doug March" lead="Back to poster" sub="Not found" />
        <Box as="main" padding={{ base: '0 6vw' }}>
          <h1
            className={css({
              fontFamily: 'display',
              textTransform: 'uppercase',
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: 'text',
            })}
          >
            Project not found
          </h1>
        </Box>
      </>
    )
  }

  const link = project.liveUrl || project.externalUrl || project.githubUrl

  return (
    <>
      <Badge
        href="/"
        ariaLabel="Back to poster"
        kicker="Doug March · Invoice"
        lead="Back to poster"
        sub={`${project.type} · ${project.year}`}
      />

      <Box
        as="main"
        background="surface"
        color="surfaceText"
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={{ base: '20 6vw 6', md: '0 6vw' }}
        minHeight="60vh"
      >
        <p
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'sm',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'primary.300',
            marginBottom: '4',
          })}
        >
          {project.type} · {project.year}
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            letterSpacing: 'tight',
            lineHeight: 'tight',
            fontSize: 'clamp(44px, 8vw, 120px)',
            color: 'surfaceText',
            marginBottom: '8',
          })}
        >
          {project.title}
        </h1>

        {project.problem && (
          <p className={css({ fontFamily: 'body', fontSize: { base: 'base', md: 'md' }, color: 'neutral.300', maxWidth: '65ch', marginBottom: '4' })}>
            <strong className={css({ color: 'surfaceText' })}>Problem — </strong>
            {project.problem}
          </p>
        )}
        {project.approach && (
          <p className={css({ fontFamily: 'body', fontSize: { base: 'base', md: 'md' }, color: 'neutral.300', maxWidth: '65ch', marginBottom: '4' })}>
            <strong className={css({ color: 'surfaceText' })}>Approach — </strong>
            {project.approach}
          </p>
        )}
        {project.outcome && (
          <p className={css({ fontFamily: 'body', fontSize: { base: 'base', md: 'md' }, color: 'neutral.300', maxWidth: '65ch', marginBottom: '6' })}>
            <strong className={css({ color: 'surfaceText' })}>Outcome — </strong>
            {project.outcome}
          </p>
        )}

        {link && (
          <a
            href={link}
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'sm',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'surfaceText',
              borderBottom: '2px solid',
              borderColor: 'primary.300',
              display: 'inline-block',
              width: 'fit-content',
            })}
          >
            Visit project ↗
          </a>
        )}
      </Box>

      <Box background="surface" color="surfaceText" borderTop="3px solid" borderColor="border" padding="8 6vw">
        <Flex justify="space-between" wrap="wrap" gap="4" borderBottom="2px solid" className={css({ borderColor: 'accent' })} paddingBottom="3" marginBottom="2">
          <span className={css({ fontFamily: 'body', fontWeight: 'bold', fontSize: 'xs', letterSpacing: 'widest', textTransform: 'uppercase' })}>
            Line item — {project.slug}
          </span>
          <span className={css({ fontFamily: 'body', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'neutral.400' })}>
            {project.depth} · {project.year}
          </span>
        </Flex>
        {project.stack && project.stack.length > 0 && (
          <Flex wrap="wrap" gap="2" paddingY="2">
            {project.stack.map((s) => (
              <span
                key={s}
                className={css({
                  fontFamily: 'body',
                  fontWeight: 'medium',
                  fontSize: '2xs',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'primary.300',
                  border: '1px solid',
                  borderColor: 'accent',
                  padding: '1 2.5',
                })}
              >
                {s}
              </span>
            ))}
          </Flex>
        )}
      </Box>
    </>
  )
}