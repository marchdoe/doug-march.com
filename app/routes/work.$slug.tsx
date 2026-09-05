import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { identity } from '../content/about'
import { Box } from '../../styled-system/jsx'
import { CaseStudyHero } from '../components/generated/CaseStudyHero'
import { CaseStudyBody } from '../components/generated/CaseStudyBody'
import { ContextProse } from '../components/generated/ContextProse'
import { ConstraintsList } from '../components/generated/ConstraintsList'
import { ProcessSection } from '../components/generated/ProcessSection'
import { DecisionsSection } from '../components/generated/DecisionsSection'
import { ReferencesSection } from '../components/generated/ReferencesSection'
import { ContactColophon } from '../components/generated/ContactColophon'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

type FullProject = (typeof projects)[number] & {
  timeline?: string
  status?: string
  context?: string
  constraints?: string[]
  process?: { phase: string; does: string; produces: string }[]
  decisions?: { decision: string; why: string }[]
  references?: { title: string; url: string; note?: string }[]
}

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug) as FullProject | undefined

  if (!project) {
    return (
      <Box
        px={{ base: '5', lg: '9' }}
        pt={{ base: '160px', lg: '200px' }}
        pb="9"
        fontSize="lg"
        color="text"
      >
        Project not found.
      </Box>
    )
  }

  return (
    <>
      <CaseStudyHero
        project={{
          title: project.title,
          type: project.type,
          year: project.year,
          role: project.role,
          timeline: project.timeline,
          status: project.status,
          problem: project.problem,
        }}
      />
      <CaseStudyBody body={project} />
      <ContextProse context={project.context} />
      <ConstraintsList constraints={project.constraints} />
      <ProcessSection process={project.process} />
      <DecisionsSection decisions={project.decisions} />
      <ReferencesSection references={project.references} />
      <Box
        px={{ base: '5', md: '7', lg: '9' }}
        pb={{ base: '9', lg: '9' }}
        borderTop="1px solid"
        borderColor="border"
        pt="5"
      >
        <ContactColophon email={identity.email} name={identity.name} role={identity.role} />
      </Box>
    </>
  )
}
