import { createFileRoute } from '@tanstack/react-router'
import { projects } from '../content/projects'
import { identity } from '../content/about'
import { FieldPanel } from '../components/generated/FieldPanel'
import { EvidenceBody } from '../components/generated/EvidenceBody'
import { PageFooter } from '../components/generated/PageFooter'
import { CaseMeta } from '../components/generated/CaseMeta'
import { CaseProse } from '../components/generated/CaseProse'
import { ConstraintsList } from '../components/generated/ConstraintsList'
import { ProcessList } from '../components/generated/ProcessList'
import { DecisionsList } from '../components/generated/DecisionsList'
import { ReferencesList } from '../components/generated/ReferencesList'
import { StackAndLink } from '../components/generated/StackAndLink'

type WhitePaper = {
  timeline?: string
  status?: string
  context?: string
  constraints?: string[]
  process?: { phase: string; does: string; produces: string }[]
  decisions?: { decision: string; why: string }[]
  references?: { title: string; url: string; note?: string }[]
}

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <EvidenceBody>
        <p>Project not found.</p>
      </EvidenceBody>
    )
  }

  const p = project as typeof project & WhitePaper

  return (
    <>
      <FieldPanel eyebrow={`${p.type} · ${p.year}`} marquee={p.title} />
      <EvidenceBody>
        <CaseMeta role={p.role} timeline={p.timeline} status={p.status} />
        {p.problem && <CaseProse label="Problem" text={p.problem} lead />}
        {p.approach && <CaseProse label="Approach" text={p.approach} />}
        {p.outcome && <CaseProse label="Outcome" text={p.outcome} />}
        {p.context && <CaseProse label="Context" text={p.context} />}
        {p.constraints && <ConstraintsList items={p.constraints} />}
        {p.process && <ProcessList steps={p.process} />}
        {p.decisions && <DecisionsList items={p.decisions} />}
        {p.references && <ReferencesList items={p.references} />}
        <StackAndLink stack={p.stack} liveUrl={p.liveUrl} />
      </EvidenceBody>
      <PageFooter email={identity.email} />
    </>
  )
}
