import { css } from '../../styled-system/css'

export function Badge({
  href,
  kicker,
  lead,
  sub,
  ariaLabel,
}: {
  href: string
  kicker: string
  lead: string
  sub: string
  ariaLabel: string
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={css({
        position: 'fixed',
        top: { base: '3', md: '5' },
        right: { base: '4', md: '6' },
        zIndex: '50',
        display: 'block',
        background: 'bg',
        border: '2px solid',
        borderColor: 'border',
        boxShadow: '4px 4px 0 {colors.neutral.900}',
        padding: '3 4',
        minWidth: { base: '0', md: '52' },
        width: { base: 'calc(100% - 8vw)', md: 'auto' },
        transition: 'transform .18s ease',
        _hover: { transform: 'translate(-1px, -1px)' },
      })}
    >
      <div
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: '2xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textSecondary',
        })}
      >
        {kicker}
      </div>
      <div
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: 'xl',
          letterSpacing: 'tight',
          textTransform: 'uppercase',
          color: 'text',
          lineHeight: 'snug',
          marginTop: '1',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        {lead}
      </div>
      <div
        className={css({
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: 'sm',
          color: 'textMuted',
          marginTop: '0.5',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        {sub}
      </div>
    </a>
  )
}