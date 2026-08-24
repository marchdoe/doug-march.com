/**
 * PROTOTYPE HOST — issue #159.
 *
 * /how/<date> is the explainer's settled home per #154, but this file exists
 * only to host the three layout prototypes behind ?variant=A|B|C. The real
 * route should be written properly once a layout wins.
 */
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ExplainerPrototype, EXPLAINER_VARIANTS } from '../components/prototype/ExplainerPrototype'
import { PrototypeSwitcher } from '../components/prototype/ArchiveCalendarPrototype'

export const Route = createFileRoute('/how/$date')({
  component: HowPage,
  validateSearch: (s: Record<string, unknown>): { variant?: string } =>
    typeof s.variant === 'string' ? { variant: s.variant } : {},
})

const VARIANTS = Object.keys(EXPLAINER_VARIANTS)

function HowPage() {
  const { date } = Route.useParams()
  const { variant } = Route.useSearch()
  const navigate = useNavigate({ from: '/how/$date' })
  const current = variant && VARIANTS.includes(variant) ? variant : 'A'

  return (
    <>
      <ExplainerPrototype date={date} variant={current} />
      {import.meta.env.DEV && (
        <PrototypeSwitcher
          variants={VARIANTS}
          current={current}
          onChange={(v) => navigate({ search: { variant: v } })}
          names={EXPLAINER_VARIANTS}
        />
      )}
    </>
  )
}
