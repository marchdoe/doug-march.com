import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'
import { FieldPanel } from '../components/generated/FieldPanel'
import { EvidenceBody } from '../components/generated/EvidenceBody'
import { PageFooter } from '../components/generated/PageFooter'
import { BoxScoreSection } from '../components/generated/BoxScoreSection'
import { FeaturedProject } from '../components/generated/FeaturedProject'
import { ProjectList } from '../components/generated/ProjectList'
import { OnRotationSection } from '../components/generated/OnRotationSection'
import { QuoteFootnote } from '../components/generated/QuoteFootnote'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      <FieldPanel
        eyebrow="Final · Sept 5, 2026 · Detroit"
        marquee="6–0."
        shout="Shutout."
        standfirst="The one clean win in today's signals — Detroit Tigers, September 5. Six runs scored, zero allowed."
        footItems={[
          { label: 'Runs', value: '6' },
          { label: 'Allowed', value: '0' },
          { label: 'Hits', value: '11' },
          { label: 'Errors', value: '0' },
        ]}
      />
      <EvidenceBody>
        <BoxScoreSection />
        {featuredProject && <FeaturedProject project={featuredProject} />}
        <ProjectList
          label="Selected Work"
          items={selectedWork}
          hrefFor={(p) => `/work/${p.slug}`}
        />
        <ProjectList
          label="Experiments"
          items={experiments}
          hrefFor={(p) => (p as { externalUrl?: string }).externalUrl ?? `/work/${p.slug}`}
        />
        <OnRotationSection />
        <QuoteFootnote />
      </EvidenceBody>
      <PageFooter email={identity.email} />
    </>
  )
}
