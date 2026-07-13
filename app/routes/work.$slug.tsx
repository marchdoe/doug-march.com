import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section
        className={css({
          bg: 'bg',
          padding: { base: '16 6', md: '20 7vw' },
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            textTransform: 'lowercase',
            fontSize: 'clamp(38px, 6vw, 76px)',
            color: 'text',
          })}
        >
          not found
        </h1>
        <p className={css({ color: 'textSecondary', marginTop: '4' })}>
          There's no project here. <a href="/" className={css({ color: 'accent', fontWeight: 'bold' })}>Back home ↗</a>
        </p>
      </section>
    )
  }

  const link = project.liveUrl ?? project.externalUrl ?? project.githubUrl

  return (
    <>
      <section
        className={css({
          bg: 'bg',
          padding: { base: '14 6', md: '18 7vw' },
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5',
        })}
      >
        <span className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'accent', fontWeight: 'bold' })}>
          {project.type} · {project.year}
        </span>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            textTransform: 'lowercase',
            fontSize: 'clamp(56px, 10vw, 148px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            maxWidth: '90%',
          })}
        >
          {project.title}
        </h1>
        {project.problem && (
          <p className={css({ fontSize: 'md', color: 'textSecondary', maxWidth: '56ch', lineHeight: 'loose' })}>
            {project.problem}
          </p>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener"
            className={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2',
              width: 'fit-content',
              bg: 'accent',
              color: 'cyan.50',
              paddingX: '6',
              paddingY: '3',
              borderRadius: 'md',
              minHeight: '44px',
              fontWeight: 'bold',
              fontSize: 'sm',
              transition: 'background .2s ease, transform .2s ease',
              _hover: { bg: 'spineBg', transform: 'translateY(-2px)' },
            })}
          >
            Visit the project ↗
          </a>
        )}
      </section>

      <section className={css({ bg: 'cyan.200', padding: { base: '10 6', md: '14 7vw' }, display: 'grid', gap: '8' })}>
        {project.role && (
          <div>
            <p className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'cyan.800', fontWeight: 'bold', marginBottom: '3' })}>
              Role
            </p>
            <p className={css({ fontSize: 'md', color: 'text', maxWidth: '60ch' })}>{project.role}</p>
          </div>
        )}
        {project.approach && (
          <div>
            <p className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'cyan.800', fontWeight: 'bold', marginBottom: '3' })}>
              Approach
            </p>
            <p className={css({ fontSize: 'md', color: 'text', maxWidth: '60ch' })}>{project.approach}</p>
          </div>
        )}
        {project.outcome && (
          <div>
            <p className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'cyan.800', fontWeight: 'bold', marginBottom: '3' })}>
              Outcome
            </p>
            <p className={css({ fontSize: 'md', color: 'text', maxWidth: '60ch' })}>{project.outcome}</p>
          </div>
        )}
        {project.stack && project.stack.length > 0 && (
          <div>
            <p className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'cyan.800', fontWeight: 'bold', marginBottom: '3' })}>
              Stack
            </p>
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2' })}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={css({
                    fontSize: '2xs',
                    textTransform: 'uppercase',
                    letterSpacing: 'widest',
                    fontWeight: 'bold',
                    color: 'cyan.800',
                    bg: 'cardBg',
                    padding: '2 4',
                    borderRadius: 'full',
                    border: '1px solid',
                    borderColor: 'cyan.500',
                  })}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}