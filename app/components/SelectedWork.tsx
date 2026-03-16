import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { selectedWork } from '../content/projects'
import { SectionHead } from './SectionHead'
import { ProjectRow } from './ProjectRow'

export function SelectedWork() {
  return (
    <Box
      className={css({
        mb: '8',
      })}
    >
      <SectionHead label="Selected Work" />
      <div>
        {selectedWork.map((project, index) => (
          <ProjectRow
            key={project.slug ?? project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </Box>
  )
}