import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Fold, FoldGrid, RailTitle } from '../components/FoldGrid'
import { Gloss } from '../components/Gloss'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function WorkPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className={css({ paddingY: '9' })}>
        <h1
          className={css({
            fontFamily: 'heading',
            fontSize: '40px',
            color: 'text',
          })}
        >
          Not found
        </h1>
      </section>
    )
  }

  return (
    <>
      <section
        className={css({
          paddingTop: { base: '6', md: '8' },
          paddingBottom: { base: '7', md: '9' },
        })}
      >
        <div
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '5',
          })}
        >
          {project.type} · {project.year}
        </div>
        <h1
          className={css({
            fontFamily: 'heading',
            fontWeight: 'medium',
            fontSize: { base: '40px', md: '84px' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '7',
            maxWidth: '18ch',
          })}
        >
          {project.title}
        </h1>
      </section>

      <Fold id="problem">
        <FoldGrid
          main={
            <div className={css({ maxWidth: '66ch' })}>
              {project.problem && (
                <>
                  <div
                    className={css({
                      fontFamily: 'body',
                      fontSize: 'xs',
                      fontWeight: 'semibold',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'accent',
                      marginBottom: '4',
                    })}
                  >
                    The problem
                  </div>
                  <p
                    className={css({
                      fontFamily: 'heading',
                      fontSize: 'md',
                      lineHeight: 'normal',
                      color: 'paper.800',
                      marginBottom: '7',
                    })}
                  >
                    {project.problem}
                  </p>
                </>
              )}
              {project.approach && (
                <>
                  <div
                    className={css({
                      fontFamily: 'body',
                      fontSize: 'xs',
                      fontWeight: 'semibold',
                      letterSpacing: 'wider',
                      textTransform: 'uppercase',
                      color: 'accent',
                      marginBottom: '4',
                    })}
                  >
                    The approach
                  </div>
                  <p
                    className={css({
                      fontFamily: 'heading',
                      fontSize: 'md',
                      lineHeight: 'normal',
                      color: 'paper.800',
                    })}
                  >
                    {project.approach}
                  </p>
                </>
              )}
            </div>
          }
          rail={
            <>
              <RailTitle>Marginalia</RailTitle>
              <Gloss label="Type">{project.type}</Gloss>
              <Gloss label="Year">{project.year}</Gloss>
              {project.role && <Gloss label="Role">{project.role}</Gloss>}
              {project.stack && project.stack.length > 0 && (
                <Gloss label="Stack">{project.stack.join(', ')}</Gloss>
              )}
              {(project.liveUrl || project.externalUrl) && (
                <Gloss label="Link" note>
                  <a
                    href={project.liveUrl || project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      color: 'accent',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    })}
                  >
                    Visit the project →
                  </a>
                </Gloss>
              )}
            </>
          }
        />
      </Fold>

      {project.outcome && (
        <section
          className={css({
            background: 'accent',
            color: 'paper.50',
            marginX: { base: '-6', md: '-6vw' },
            paddingX: { base: '6', md: '6vw' },
            paddingY: { base: '8', md: '10' },
            borderTop: '1px solid',
            borderColor: 'ink.600',
          })}
        >
          <div
            className={css({
              fontFamily: 'body',
              fontSize: 'xs',
              fontWeight: 'semibold',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'paper.200',
              marginBottom: '5',
            })}
          >
            The outcome
          </div>
          <p
            className={css({
              fontFamily: 'heading',
              fontSize: { base: '24px', md: '36px' },
              lineHeight: 'snug',
              maxWidth: '52ch',
              color: 'paper.50',
            })}
          >
            {project.outcome}
          </p>
        </section>
      )}
    </>
  )
}