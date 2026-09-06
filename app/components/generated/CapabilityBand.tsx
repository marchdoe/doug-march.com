import { css } from '../../../styled-system/css'

export function CapabilityBand({ items }: { items: string[] }) {
  return (
    <div
      className={css({
        mt: { base: '7', lg: '9' },
        display: 'flex',
        flexWrap: 'wrap',
      })}
    >
      {items.map((c) => (
        <span
          key={c}
          className={css({
            textStyle: 'sm',
            fontWeight: 500,
            letterSpacing: 'wide',
            textTransform: 'lowercase',
            fontVariant: 'small-caps',
            color: 'textMuted',
            px: '3',
            py: '2',
            borderRight: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          {c}
        </span>
      ))}
    </div>
  )
}
