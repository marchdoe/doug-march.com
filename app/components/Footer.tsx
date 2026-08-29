import { css } from '../../styled-system/css'
import { identity } from '../content/about'

export function Footer() {
  return (
    <footer
      className={css({
        borderTop: '3px double',
        borderTopColor: 'border',
        paddingY: '4',
        paddingX: { base: '4', md: '8' },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '3',
        fontFamily: 'body',
        fontSize: '2xs',
        letterSpacing: 'wider',
        textTransform: 'uppercase',
        color: 'textSubtle',
      })}
    >
      <span>
        © 2026 Doug March <span className={css({ color: 'accent' })}>·</span> Printed nightly,
        unread by morning
      </span>
      <span>
        Build 2026.07.29 <span className={css({ color: 'accent' })}>·</span> Spectral / Albert Sans{' '}
        <span className={css({ color: 'accent' })}>·</span>{' '}
        <a href={`mailto:${identity.email}`} className={css({ color: 'inherit' })}>
          {identity.email}
        </a>
      </span>
    </footer>
  )
}
