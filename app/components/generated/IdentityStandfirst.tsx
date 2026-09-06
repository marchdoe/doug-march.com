import { css } from '../../../styled-system/css'

export function IdentityStandfirst({ statement }: { statement: string }) {
  return (
    <p
      className={css({
        textStyle: 'md',
        color: 'textMuted',
        maxW: '62ch',
        mt: { base: '6', lg: '2' },
      })}
    >
      {statement}
    </p>
  )
}
