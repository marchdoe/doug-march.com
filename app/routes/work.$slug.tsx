import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { SectionHead } from '../components/SectionHead'
import { projects } from '../content/projects'
import styles from './work.$slug.module.css'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug)
    if (!project) throw notFound()
    return project
  },
  component: ProjectPage,
})

function ProjectPage() {
  const project = Route.useLoaderData()

  if (project.depth === 'lightweight') {
    return (
      <Layout>
        <Link to="/" className={styles.back}>← BACK TO WORK</Link>
        <div className={styles.lightCard} data-label={project.type.toUpperCase()}>
          <div className={styles.lightTitle}>{project.title}</div>
          <div className={styles.lightDesc}>{project.description}</div>
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGreen}>
              VIEW PROJECT ↗
            </a>
          )}
        </div>
        <SectionHead label="QUICK FACTS" />
        <div className={styles.quickFacts}>
          <div className={styles.fact}>
            <div className={styles.factLabel}>TYPE</div>
            <div className={styles.factValue}>{project.type}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>YEAR</div>
            <div className={styles.factValue}>{project.year}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>STATUS</div>
            <div className={styles.factValue}>{project.status ?? 'Complete'}</div>
          </div>
        </div>
        {project.stack && (
          <>
            <SectionHead label="STACK" />
            <div className={styles.tags} style={{ marginTop: '0.5rem' }}>
              {project.stack.map((s) => <div key={s} className={styles.tag}>{s.toUpperCase()}</div>)}
            </div>
          </>
        )}
      </Layout>
    )
  }

  return (
    <Layout>
      <Link to="/" className={styles.back}>← BACK TO WORK</Link>

      <div className={styles.header}>
        <div className={styles.typeLabel}>{project.type} · {project.year}</div>
        <div className={styles.title}>{project.title}</div>
        <div className={styles.meta}>
          {project.role && (
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>ROLE</div>
              <div className={styles.metaValue}>{project.role}</div>
            </div>
          )}
          {project.timeline && (
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>TIMELINE</div>
              <div className={styles.metaValue}>{project.timeline}</div>
            </div>
          )}
          {project.status && (
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>STATUS</div>
              <div className={styles.metaValue}>{project.status}</div>
            </div>
          )}
        </div>
      </div>

      {project.problem && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// PROBLEM</div>
          <div className={styles.body}>{project.problem}</div>
        </div>
      )}

      {project.approach && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// APPROACH</div>
          <div className={styles.body}>{project.approach}</div>
        </div>
      )}

      {project.outcome && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// OUTCOME</div>
          <div className={styles.body}>{project.outcome}</div>
        </div>
      )}

      {project.stack && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>// STACK</div>
          <div className={styles.tags}>
            {project.stack.map((s) => <div key={s} className={styles.tag}>{s.toUpperCase()}</div>)}
          </div>
        </div>
      )}

      <div className={styles.ctas}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGreen}>
            VIEW LIVE SITE →
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
            VIEW ON GITHUB ↗
          </a>
        )}
      </div>
    </Layout>
  )
}
