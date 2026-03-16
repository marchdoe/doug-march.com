import { css } from '../../styled-system/css'
import { type Project } from '../content/projects'

interface ProjectRowProps {
  project: Project
  index: number
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const href = project.slug
    ? `/work/${project.slug}`
    : (project.link ?? project.externalUrl ?? project.url ?? '#')

  const isExternal = !project.slug

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={css({
        display: 'flex',
        alignItems: 'baseline',
        gap: '4',
        py: '3',
        px: '4',
        borderBottom: '1px solid',
        borderBottomColor: 'border.DEFAULT',
        textDecoration: 'none',
        transition: 'background 0.12s ease',
        _hover: {
          bg: 'bg.tint',
          '& [data-title]': {
            color: 'accent.DEFAULT',
          },
        },
        _first: {
          borderTop: '1px solid',
          borderTopColor: 'border.DEFAULT',
        },
      })}
    >
      {/* Index */}
      <span
        className={css({
          fontFamily: 'mono',
          fontSize: '2xs',
          fontWeight: 'regular',
          color: 'text.dim',
          minWidth: '1.5rem',
          textAlign: 'right',
          flexShrink: '0',
        })}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Title */}
      <span
        data-title=""
        className={css({
          fontFamily: 'serif',
          fontSize: 'base',
          fontWeight: 'medium',
          lineHeight: 'snug',
          color: 'text',
          flex: '1',
          transition: 'color 0.12s ease',
        })}
      >
        {project.title}
      </span>

      {/* Type */}
      <span
        className={css({
          fontFamily: 'mono',
          fontSize: 'xs',
          fontWeight: 'regular',
          color: 'text.mid',
          letterSpacing: 'wide',
          display: { base: 'none', sm: 'block' },
        })}
      >
        {project.type}
      </span>

      {/* Year */}
      <span
        className={css({
          fontFamily: 'mono',
          fontSize: 'xs',
          fontWeight: 'regular',
          color: 'text.dim',
          minWidth: '2.5rem',
          textAlign: 'right',
          flexShrink: '0',
        })}
      >
        {project.year}
      </span>
    </a>
  )
}