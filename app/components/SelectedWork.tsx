import { Box } from '../../styled-system/jsx'
import { SectionHead } from './SectionHead'
import { ProjectRow } from './ProjectRow'
import { selectedWork } from '../content/projects'

export function SelectedWork() {
  return (
    <Box>
      <SectionHead label="Selected Work" />
      <Box>
        {selectedWork.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </Box>
    </Box>
  )
}