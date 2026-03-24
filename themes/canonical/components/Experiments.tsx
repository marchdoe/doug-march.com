import { experiments } from '../content/projects'
import { ProjectRow } from './ProjectRow'

export function Experiments() {
  return (
    <>
      {experiments.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </>
  )
}
