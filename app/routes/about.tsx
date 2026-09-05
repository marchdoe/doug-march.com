import { createFileRoute } from '@tanstack/react-router'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { AboutMasthead } from '../components/generated/AboutMasthead'
import { TimelineList } from '../components/generated/TimelineList'
import { CapabilitiesChips } from '../components/generated/CapabilitiesChips'
import { EducationBlock } from '../components/generated/EducationBlock'
import { PersonalColophon } from '../components/generated/PersonalColophon'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <AboutMasthead statement={identity.statement} name={identity.name} role={identity.role} />
      <TimelineList entries={timeline} />
      <CapabilitiesChips capabilities={capabilities} />
      <EducationBlock education={education} />
      <PersonalColophon
        personal={personal}
        email={identity.email}
        name={identity.name}
        role={identity.role}
      />
    </>
  )
}
