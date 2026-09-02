import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { identity } from '../content/about'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/')({ component: WorkIndex })

function WorkIndex() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: { base: '8', md: '9' },
        paddingX: { base: '6', md: '9' },
        paddingY: { base: '8', md: '9' },
      })}
    >
      <nav aria-label="Primary" className={navClass}>
        <a href="/work" className={navLink}>
          Work
        </a>
        <span className={sep}>·</span>
        <a href="/about" className={navLink}>
          About
        </a>
        <span className={sep}>·</span>
        <a href={`mailto:${identity.email}`} className={navLink}>
          Contact
        </a>
      </nav>

      {featuredProject && (
        <section
          className={css({ display: 'flex', flexDirection: 'column', gap: '3', maxWidth: '58ch' })}
        >
          <p
            className={css({
              textStyle: 'xs',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'textFaint',
              margin: 0,
            })}
          >
            Featured
          </p>
          <h2
            className={css({
              textStyle: '3xl',
              fontWeight: '800',
              letterSpacing: 'tight',
              color: 'text',
              margin: 0,
            })}
          >
            {featuredProject.title}
          </h2>
          {featuredProject.problem && (
            <p className={css({ textStyle: 'base', color: 'textMuted', margin: 0 })}>
              {featuredProject.problem}
            </p>
          )}
          {featuredProject.externalUrl && (
            <a
              href={featuredProject.externalUrl}
              className={css({
                textStyle: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'accent',
                width: 'fit-content',
                _hover: { textDecoration: 'underline' },
              })}
            >
              Visit ↗
            </a>
          )}
        </section>
      )}

      <section
        aria-label="Selected work"
        className={css({ display: 'flex', flexDirection: 'column' })}
      >
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '5',
              borderTop: '1px solid',
              borderColor: 'border',
              paddingY: '5',
              _hover: { color: 'accent' },
            })}
          >
            <span className={css({ textStyle: 'lg', fontWeight: '600', color: 'text' })}>
              {project.title}
            </span>
            <span
              className={css({
                textStyle: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
              })}
            >
              {project.type} · {project.year}
            </span>
          </a>
        ))}
      </section>

      <section
        aria-label="Experiments"
        className={css({ display: 'flex', flexDirection: 'column' })}
      >
        {experiments.map((project) => (
          <a
            key={project.slug}
            href={project.externalUrl ?? `/work/${project.slug}`}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '5',
              borderTop: '1px solid',
              borderColor: 'border',
              paddingY: '5',
              _hover: { color: 'accent' },
            })}
          >
            <span className={css({ textStyle: 'base', fontWeight: '600', color: 'text' })}>
              {project.title}
            </span>
            <span
              className={css({
                textStyle: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textFaint',
              })}
            >
              {project.type} · {project.year}
            </span>
          </a>
        ))}
      </section>
    </div>
  )
}

const navClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  textStyle: 'xs',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  fontWeight: '600',
  color: 'textMuted',
})
const navLink = css({
  paddingY: '3',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: { color: 'accent' },
})
const sep = css({ color: 'border', paddingX: '3' })
