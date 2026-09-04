import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { HeroPanel } from '../components/generated/HeroPanel'
import { FieldPanel } from '../components/generated/FieldPanel'
import { PersonalField } from '../components/generated/PersonalField'
import { CapabilityRail } from '../components/generated/CapabilityRail'
import { TimelineList } from '../components/generated/TimelineList'
import { EducationBlock } from '../components/generated/EducationBlock'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: '7fr 5fr' }}
        minH={{ md: '60vh' }}
      >
        <HeroPanel
          eyebrow="About · Dispatch"
          heading="The work is a person"
          standfirst={identity.statement}
        />
        <FieldPanel tag="Currently">
          <PersonalField personal={personal} />
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
        <CapabilityRail capabilities={capabilities} />
        <TimelineList entries={timeline} />
        <EducationBlock education={education} />
      </Box>
    </>
  )
}
