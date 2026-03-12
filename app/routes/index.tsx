import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { MissionCard } from '../components/MissionCard'
import { ProjectRow } from '../components/ProjectRow'
import { SectionHead } from '../components/SectionHead'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import styles from './index.module.css'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Layout>
      {featuredProject && <MissionCard project={featuredProject} />}

      <SectionHead label="SELECTED WORK" />
      {selectedWork.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <div className={styles.gap} />

      <SectionHead label="EXPERIMENTS &amp; SIDE PROJECTS" />
      {experiments.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}

      <div className={styles.footer}>
        <span className={styles.footerText}>© {new Date().getFullYear()} DOUG MARCH</span>
        <a href="mailto:doug@doug-march.com" className={styles.footerLink}>
          GET IN TOUCH →
        </a>
      </div>
    </Layout>
  )
}
