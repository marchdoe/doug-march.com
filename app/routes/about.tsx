import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { FieldPanel } from '../components/generated/FieldPanel'
import { EvidenceBody } from '../components/generated/EvidenceBody'
import { PageFooter } from '../components/generated/PageFooter'
import { IdentityStandfirst } from '../components/generated/IdentityStandfirst'
import { TimelineSection } from '../components/generated/TimelineSection'
import { CapabilityBand } from '../components/generated/CapabilityBand'
import { EducationBlock } from '../components/generated/EducationBlock'
import { PersonalStats } from '../components/generated/PersonalStats'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <FieldPanel
        eyebrow={identity.role}
        marquee={String(personal.holesInOne)}
        shout="Holes-in-one."
        standfirst={personal.currentFocus}
      />
      <EvidenceBody>
        <IdentityStandfirst statement={identity.statement} />
        <TimelineSection entries={timeline} />
        <CapabilityBand items={capabilities} />
        <EducationBlock education={education} />
        <PersonalStats personal={personal} />
      </EvidenceBody>
      <PageFooter email={identity.email} />
    </>
  )
}
