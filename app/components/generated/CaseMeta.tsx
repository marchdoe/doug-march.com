import { css } from '../../../styled-system/css'

export function CaseMeta({
  role,
  timeline,
  status,
}: {
  role?: string
  timeline?: string
  status?: string
}) {
  const items = [role, timeline, status].filter(Boolean) as string[]
  if (items.length === 0) return null
  return (
    <div
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4',
        mt: '2',
        textStyle: '2xs',
        fontWeight: 500,
        letterSpacing: 'wide',
        textTransform: 'uppercase',
        color: 'textFaint',
      })}
    >
      {items.map((i) => (
        <span key={i}>{i}</span>
      ))}
    </div>
  )
}
