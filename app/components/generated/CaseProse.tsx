import { css } from '../../../styled-system/css'

export function CaseProse({ label, text, lead }: { label: string; text: string; lead?: boolean }) {
  return (
    <div className={css({ mt: { base: '7', lg: '9' } })}>
      <p
        className={css({
          textStyle: 'xs',
          fontWeight: 700,
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          mb: '3',
        })}
      >
        {label}
      </p>
      <p className={css({ textStyle: lead ? 'lg' : 'md', color: 'textMuted', maxW: '62ch' })}>
        {text}
      </p>
    </div>
  )
}
