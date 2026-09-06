import { css } from '../../../styled-system/css'

type Project = {
  title: string
  type: string
  year: number
  role?: string
  problem?: string
  externalUrl?: string
}

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className={css({ mt: { base: '8', lg: '10' } })}>
      <p
        className={css({
          textStyle: 'xs',
          fontWeight: 700,
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          mb: '3',
        })}
      >
        Featured
      </p>
      <h2
        className={css({
          fontFamily: 'display',
          fontWeight: 400,
          textStyle: '4xl',
          color: 'text',
        })}
      >
        {project.title}
      </h2>
      <p
        className={css({
          textStyle: '2xs',
          fontWeight: 500,
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textFaint',
          mt: '2',
        })}
      >
        {project.role ?? project.type} · {project.year}
      </p>
      {project.problem && (
        <p
          className={css({
            textStyle: 'md',
            color: 'textMuted',
            maxW: '62ch',
            mt: '2',
            mb: '3',
          })}
        >
          {project.problem}
        </p>
      )}
      {project.externalUrl && (
        <a
          href={project.externalUrl}
          className={css({
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            textStyle: 'sm',
            fontWeight: 500,
            color: 'text',
            borderBottom: '1px solid',
            borderColor: 'accentAlt',
            pb: '1',
          })}
        >
          Read the case →
        </a>
      )}
    </div>
  )
}
