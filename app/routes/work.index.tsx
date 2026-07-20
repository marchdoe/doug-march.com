import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/')({ component: WorkIndex })

function WorkIndex() {
  const rows = [...selectedWork, ...experiments]

  return (
    <Box>
      {featuredProject && (
        <Box className={css({ padding: { base: '6 6vw', md: '4 6vw 8' } })}>
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textSecondary',
              marginBottom: '4',
            })}
          >
            Featured build
          </p>
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'normal',
              fontSize: 'clamp(36px, 6vw, 84px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              textTransform: 'uppercase',
              color: 'text',
            })}
          >
            {featuredProject.title}
          </h1>
          {featuredProject.problem && (
            <p
              className={css({
                fontFamily: 'body',
                fontWeight: 'medium',
                fontSize: { base: 'sm', md: 'md' },
                color: 'textSecondary',
                maxWidth: '65ch',
                marginTop: '6',
                lineHeight: 'normal',
              })}
            >
              {featuredProject.problem}
            </p>
          )}
          {featuredProject.externalUrl && (
            <a
              href={featuredProject.externalUrl}
              className={css({
                display: 'inline-block',
                marginTop: '4',
                fontFamily: 'body',
                fontWeight: 'bold',
                fontSize: 'xs',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'text',
                borderBottom: '2px solid',
                borderColor: 'text',
              })}
            >
              View live →
            </a>
          )}
        </Box>
      )}

      <Box className={css({ bg: 'surface', color: 'surfaceText', padding: '8 6vw 10', borderTop: '3px solid', borderColor: 'border' })}>
        <div
          className={css({
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'sm',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'surfaceText',
            borderBottom: '2px solid',
            borderColor: 'primary.600',
            paddingBottom: '3',
            marginBottom: '2',
          })}
        >
          Invoice — Selected Work &amp; Experiments
        </div>

        {rows.map((project) => {
          const href = project.externalUrl ?? `/work/${project.slug}`
          return (
            <a
              key={project.slug}
              href={href}
              className={css({
                display: 'grid',
                gridTemplateColumns: { base: '1fr auto', sm: 'minmax(88px,1.3fr) minmax(0,3fr) minmax(90px,auto)' },
                gap: '3',
                alignItems: 'baseline',
                padding: '3 0',
                borderBottom: '1px solid',
                borderColor: 'primary.800',
                cursor: 'pointer',
                '& .v': { borderBottom: '1px solid transparent' },
                _hover: { '& .v': { borderColor: 'surfaceText' } },
              })}
            >
              <span
                className={css({
                  gridColumn: { base: '1 / -1', sm: 'auto' },
                  fontFamily: 'body',
                  fontWeight: 'bold',
                  fontSize: '2xs',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: 'neutral.400',
                })}
              >
                {project.type}
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                  color: 'surfaceText',
                })}
              >
                <span className="v">{project.title}</span>
              </span>
              <span
                className={css({
                  fontFamily: 'body',
                  fontWeight: 'bold',
                  fontSize: 'sm',
                  textAlign: 'right',
                  color: 'primary.300',
                  fontVariantNumeric: 'tabular-nums',
                  whiteSpace: 'nowrap',
                })}
              >
                {project.year}
              </span>
            </a>
          )
        })}
      </Box>
    </Box>
  )
}