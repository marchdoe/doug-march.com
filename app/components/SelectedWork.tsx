import { selectedWork } from '../content/projects'
import { ProjectRow } from './ProjectRow'

export function SelectedWork() {
  return (
    <>
      {selectedWork.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </>
  )
}
