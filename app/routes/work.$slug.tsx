import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav, panelGradient } from '../components/Nav'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetail })

function WorkDetail() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className={css({
        bg: 'bgPanel',
        backgroundImage: panelGradient,
        color: 'textOnPanel',
        minHeight: '100vh',
      })}>
        <Nav />
        <div className={css({ paddingInline: '6vw', paddingBlock: '14' })}>
          <h1 className={css({ fontFamily: 'display', fontSize: '56px', textTransform: 'uppercase' })}>
            Not found
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className={css({
      bg: 'bgPanel',
      backgroundImage: panelGradient,
      color: 'textOnPanel',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    })}>
      <Nav />
      <div className={css({
        flex: 1,
        display: 'grid',
        gridTemplateColumns: { base: '1fr', lg: '1.15fr 1fr' },
        alignItems: 'center',
        gap: '10',
        paddingInline: '6vw',
        paddingBlock: { base: '10', md: '14' },
      })}>
        <div>
          <p className={css({
            fontFamily: 'body',
            fontWeight: '600',
            fontSize: 'xs',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '6',
          })}>
            {project.role ?? project.type} · {project.type} · {project.year}
          </p>
          <h1 className={css({
            fontFamily: 'display',
            fontSize: { base: '56px', md: '88px', lg: '120px' },
            lineHeight: 'tight',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'textOnPanel',
          })}>
            {project.title}
          </h1>
        </div>
        <div>
          {project.problem && (
            <p className={css({ maxWidth: '62ch', fontSize: 'lg', lineHeight: 'loose', color: 'textSecondary', marginBottom: '4' })}>
              {project.problem}
            </p>
          )}
          {project.approach && (
            <p className={css({ maxWidth: '62ch', fontSize: 'base', lineHeight: 'normal', color: 'textSecondary', marginBottom: '4' })}>
              {project.approach}
            </p>
          )}
          {project.outcome && (
            <p className={css({ maxWidth: '62ch', fontSize: 'base', lineHeight: 'normal', color: 'textSecondary', marginBottom: '6' })}>
              {project.outcome}
            </p>
          )}
          {project.stack && project.stack.length > 0 && (
            <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', marginBottom: '6' })}>
              {project.stack.map((s) => (
                <span
                  key={s}
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '500',
                    fontSize: 'sm',
                    letterSpacing: 'wide',
                    textTransform: 'uppercase',
                    color: 'textSecondary',
                    border: '1px solid',
                    borderColor: 'textOnPanel/24',
                    borderRadius: 'sm',
                    paddingBlock: '2',
                    paddingInline: '3',
                  })}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          {(project.liveUrl ?? project.externalUrl) && (
            <a
              href={project.liveUrl ?? project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2',
                fontFamily: 'body',
                fontWeight: '600',
                fontSize: 'xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textOnPanel',
                border: '1px solid',
                borderColor: 'accent',
                borderRadius: 'md',
                paddingBlock: '4',
                paddingInline: '6',
                transition: 'background .22s ease, color .22s ease',
                _hover: { bg: 'accent', color: 'bg' },
              })}
            >
              Visit site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}