import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type FeaturedProject = {
  title: string
  type: string
  year: number
  problem?: string
  externalUrl?: string
}

export function HeroContent({ project }: { project?: FeaturedProject }) {
  return (
    <Box
      gridArea={{ lg: 'eye' }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <p
        className={css({
          fontSize: 'sm',
          fontVariantCaps: 'small-caps',
          letterSpacing: 'wide',
          color: 'fieldInkMuted',
          fontWeight: '600',
          mb: { base: '7', lg: '9' },
        })}
      >
        Not genius or talent.
      </p>
      <h1 className={css({ textStyle: 'hero', fontWeight: '600', color: 'fieldInk', mb: '6' })}>
        Mastery is a function of time and intense focus.
      </h1>
      <p
        className={css({
          fontSize: { base: 'lg', lg: 'xl' },
          fontStyle: 'italic',
          color: 'fieldInkMuted',
          mb: '5',
        })}
      >
        — Robert Greene, <cite className={css({ fontStyle: 'italic' })}>Mastery</cite>
      </p>
      <p
        className={css({
          fontSize: 'base',
          color: 'fieldInk',
          maxWidth: '52ch',
          mb: '4',
        })}
      >
        Labor Day, two days out — the creed of the field: mastery is labor, not a gift.
      </p>

      {project && (
        <Box
          width="100%"
          maxWidth="640px"
          bg="field"
          borderTop="1px solid"
          borderColor="fieldBorder"
          p={{ base: '5', lg: '7' }}
          color="fieldInk"
          mt="4"
        >
          <p
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'fieldInkMuted',
              mb: '2',
            })}
          >
            Featured — {project.type} · {project.year}
          </p>
          <h2
            className={css({
              fontSize: { base: '2xl', lg: '3xl' },
              fontWeight: '600',
              color: 'fieldInk',
              mb: '3',
            })}
          >
            {project.title}
          </h2>
          {project.problem && (
            <p
              className={css({
                fontSize: 'base',
                lineHeight: 'loose',
                color: 'fieldInkMuted',
                maxWidth: '60ch',
                mb: '4',
              })}
            >
              {project.problem}
            </p>
          )}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              className={css({
                fontSize: 'sm',
                letterSpacing: 'wide',
                color: 'fieldInkMuted',
                borderBottom: '1px solid',
                borderColor: 'fieldBorder',
                pb: '1',
                _hover: { color: 'fieldInk' },
              })}
            >
              {project.externalUrl.replace('https://', '')} →
            </a>
          )}
        </Box>
      )}
    </Box>
  )
}
