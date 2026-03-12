import type { Project } from '../content/types'
import styles from './MissionCard.module.css'

type Props = { project: Project }

export function MissionCard({ project }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.name}>{project.title.toUpperCase()}</div>
      {project.problem && (
        <div className={styles.desc}>{project.problem}</div>
      )}
      {project.externalUrl && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          → VISIT {project.externalUrl.replace(/^https?:\/\//, '').toUpperCase()}
        </a>
      )}
    </div>
  )
}
