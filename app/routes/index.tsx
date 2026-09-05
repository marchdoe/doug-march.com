import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { identity } from '../content/about'
import { RadialField } from '../components/generated/RadialField'
import { HeroContent } from '../components/generated/HeroContent'
import { SignalColumn } from '../components/generated/SignalColumn'
import { WorkFooter } from '../components/generated/WorkFooter'

export const Route = createFileRoute('/')({ component: HomePage })

const leftSignals = [
  { label: 'Moon', value: 'Last quarter · 33%' },
  { label: 'Tigers · baseball', value: '6–7, loss', muted: true },
  { label: 'Weather · Aldie', value: '73° Clear · AQI Good' },
]

const rightSignals = [
  { label: 'Markets · SPY', value: '−0.39%', muted: true },
  { label: 'Biltmore Championship', value: 'Tees off · scheduled' },
  { label: 'GitHub', value: 'Watching · dougmar.ch' },
]

function HomePage() {
  return (
    <>
      <RadialField dateline={'Fri · Sep 5 2026\nAldie, VA'}>
        <SignalColumn items={leftSignals} align="left" />
        <HeroContent project={featuredProject} />
        <SignalColumn items={rightSignals} align="right" />
      </RadialField>
      <WorkFooter
        selectedWork={selectedWork}
        experiments={experiments}
        email={identity.email}
        name={identity.name}
        role={identity.role}
      />
    </>
  )
}
