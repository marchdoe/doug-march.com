import { Link } from '@tanstack/react-router'
import type { Project } from '../content/types'
import styles from './ProjectRow.module.css'

type Props = { project: Project; index: number }

export function ProjectRow({ project, index }: Props) {
  const isExperiment = project.depth === 'lightweight'
  const rowClass = `${styles.row} ${isExperiment ? styles.experiment : ''}`
  const yearLabel = project.externalUrl
    ? `${project.year} ↗`
    : `${project.year}`

  if (project.externalUrl && isExperiment) {
    return (
      <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
        <div className={styles.num}>{String(index + 1).padStart(2, '0')}</div>
        <div className={styles.name}>{project.title}</div>
        <div className={styles.tag}>{project.type.toUpperCase()}</div>
        <div className={styles.year}>{yearLabel}</div>
      </a>
    )
  }

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className={rowClass}>
      <div className={styles.num}>{String(index + 1).padStart(2, '0')}</div>
      <div className={styles.name}>{project.title}</div>
      <div className={styles.tag}>{project.type.toUpperCase()}</div>
      <div className={styles.year}>{yearLabel}</div>
    </Link>
  )
}
