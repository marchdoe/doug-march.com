import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className={css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 6vw',
      minHeight: 'calc(100vh - 104px)',
      paddingTop: '14vh',
      paddingBottom: '6vh',
    })}>
      <h1 className={css({
        fontFamily: 'display',
        fontSize: 'clamp(52px, 7.5vw, 108px)',
        lineHeight: 'tight',
        letterSpacing: 'normal',
        textTransform: 'uppercase',
        color: 'textHero',
        fontWeight: 'bold',
        maxWidth: '100%',
      })}>
        DON'T LET THE FEAR{' '}
        <br className={css({ display: { base: 'none', md: 'block' } })} />
        OF LOSING BE{' '}
        <br className={css({ display: { base: 'none', md: 'block' } })} />
        GREATER THAN{' '}
        <br className={css({ display: { base: 'none', md: 'block' } })} />
        THE EXCITEMENT{' '}
        <br className={css({ display: { base: 'none', md: 'block' } })} />
        OF WINNING<span className={css({ color: 'accent' })}>.</span>
      </h1>
      <p className={css({
        fontFamily: 'body',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'textLabel',
        marginTop: '28px',
      })}>
        — ROBERT KIYOSAKI
      </p>
    </div>
  )
}