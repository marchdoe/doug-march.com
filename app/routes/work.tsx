import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav } from '../components/Nav'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work')({ component: WorkIndexPage })

function WorkIndexPage() {
  return (
    <div
      className={css({
        paddingX: 'clamp(24px, 6vw, 96px)',
        paddingY: 'clamp(28px, 6vh, 72px)',
        minWidth: 0,
      })}
    >
      <Nav />

      {featuredProject && (
        <section
          className={css({
            marginTop: 'clamp(28px, 6vh, 64px)',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '6',
          })}
        >
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'textFaint',
            })}
          >
            Featured
          </div>
          <h2
            className={css({
              textStyle: '2xl',
              fontWeight: '800',
              color: 'text',
              marginTop: '2',
              overflowWrap: 'break-word',
            })}
          >
            {featuredProject.title}
          </h2>
          {featuredProject.problem && (
            <p
              className={css({
                textStyle: 'base',
                color: 'textMuted',
                marginTop: '2',
                maxWidth: '60ch',
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
                marginTop: '3',
                fontSize: 'xs',
                textTransform: 'uppercase',
                letterSpacing: 'wide',
                color: 'accent',
                textDecoration: 'underline',
              })}
            >
              Visit ↗
            </a>
          )}
        </section>
      )}

      <section className={css({ marginTop: '9' })}>
        <div
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'textFaint',
            marginBottom: '3',
          })}
        >
          Selected Work
        </div>
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '4',
              paddingY: '4',
              borderTop: '1px solid',
              borderColor: 'border',
              flexWrap: 'wrap',
              minWidth: 0,
            })}
          >
            <span
              className={css({
                fontSize: 'lg',
                fontWeight: '700',
                color: 'text',
                overflowWrap: 'break-word',
              })}
            >
              {project.title}
            </span>
            <span
              className={css({
                fontSize: 'xs',
                textTransform: 'uppercase',
                letterSpacing: 'wide',
                color: 'textFaint',
              })}
            >
              {project.type} · {project.year}
            </span>
          </a>
        ))}
      </section>

      <section className={css({ marginTop: '9', paddingBottom: '9' })}>
        <div
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'textFaint',
            marginBottom: '3',
          })}
        >
          Experiments
        </div>
        {experiments.map((project) => (
          <a
            key={project.slug}
            href={project.externalUrl ?? `/work/${project.slug}`}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '4',
              paddingY: '4',
              borderTop: '1px solid',
              borderColor: 'border',
              flexWrap: 'wrap',
              minWidth: 0,
            })}
          >
            <span
              className={css({
                fontSize: 'lg',
                fontWeight: '700',
                color: 'text',
                overflowWrap: 'break-word',
              })}
            >
              {project.title}
            </span>
            <span
              className={css({
                fontSize: 'xs',
                textTransform: 'uppercase',
                letterSpacing: 'wide',
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
