import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { HeroPanel } from '../components/generated/HeroPanel'
import { FieldPanel } from '../components/generated/FieldPanel'
import { CaseStudyMeta } from '../components/generated/CaseStudyMeta'
import { ProblemApproachOutcome } from '../components/generated/ProblemApproachOutcome'
import { StackList } from '../components/generated/StackList'
import { WhitePaperContext } from '../components/generated/WhitePaperContext'
import { WhitePaperProcess } from '../components/generated/WhitePaperProcess'
import { WhitePaperDecisions } from '../components/generated/WhitePaperDecisions'
import { WhitePaperReferences } from '../components/generated/WhitePaperReferences'
import { WorkRowList } from '../components/generated/WorkRowList'
import { projects, selectedWork, type Project } from '../content/projects'

type ProjectFull = Project & { timeline?: string; status?: string }

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug) as ProjectFull | undefined

  if (!project) {
    return (
      <Box px="6" py="10" fontFamily="display" color="text">
        Not found.
      </Box>
    )
  }

  const related = selectedWork.filter((p) => p.slug !== project.slug)

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: '7fr 5fr' }}
        minH={{ md: '55vh' }}
      >
        <HeroPanel
          eyebrow={`Case study · ${project.type}`}
          heading={project.title}
          standfirst={project.description ?? ''}
        />
        <FieldPanel tag="The problem">
          <Box
            fontFamily="display"
            fontWeight="700"
            fontSize="2xl"
            letterSpacing="tight"
            color="fieldInk"
          >
            {project.problem}
          </Box>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener"
              className={css({
                fontFamily: 'display',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'fieldInk',
                borderBottom: '1px solid',
                borderColor: 'fieldInk',
                alignSelf: 'flex-start',
                display: 'inline-flex',
                minH: '44px',
                alignItems: 'center',
              })}
            >
              Visit live ↗
            </a>
          )}
        </FieldPanel>
      </Box>

      <Box
        as="section"
        bg="bg"
        px={{ base: '5', md: '6' }}
        py={{ base: '10', md: '9' }}
        borderTop="1px solid"
        borderColor="borderStrong"
      >
        <CaseStudyMeta
          rows={[
            { label: 'Role', value: project.role },
            { label: 'Year', value: String(project.year) },
            { label: 'Timeline', value: project.timeline },
            { label: 'Status', value: project.status },
          ]}
        />
        <ProblemApproachOutcome
          problem={project.problem}
          approach={project.approach}
          outcome={project.outcome}
        />
        <StackList stack={project.stack} />
        <WhitePaperContext context={project.context} constraints={project.constraints} />
        <WhitePaperProcess process={project.process} />
        <WhitePaperDecisions decisions={project.decisions} />
        <WhitePaperReferences references={project.references} />
      </Box>

      <Box
        as="section"
        bg="bg"
        px={{ base: '5', md: '6' }}
        py={{ base: '10', md: '9' }}
        borderTop="1px solid"
        borderColor="borderStrong"
      >
        <Box
          fontFamily="display"
          fontWeight="700"
          fontSize={{ base: '2xl', md: '3xl' }}
          letterSpacing="tight"
          color="text"
          mb="8"
        >
          Other work
        </Box>
        <WorkRowList projects={related} startIndex={1} />
      </Box>
    </>
  )
}
