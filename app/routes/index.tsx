import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav } from '../components/Nav'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        minHeight: { base: 'auto', md: '100%' },
        paddingX: 'clamp(24px, 6vw, 96px)',
        paddingY: 'clamp(32px, 8vh, 120px)',
        gap: 'clamp(28px, 4vh, 52px)',
        minWidth: 0,
      })}
    >
      <h1
        className={css({
          textStyle: 'hero',
          fontFamily: 'display',
          fontWeight: '800',
          color: 'text',
          maxWidth: '16ch',
          margin: 0,
          overflowWrap: 'break-word',
        })}
      >
        Simplicity is the glory
        <span
          className={css({
            display: 'block',
            marginLeft: 'clamp(24px, 14vw, 240px)',
            color: 'accent',
          })}
        >
          of expression.
        </span>
      </h1>

      <div className={css({ maxWidth: '44ch', minWidth: 0 })}>
        <p
          className={css({
            textStyle: 'xl',
            fontWeight: '600',
            color: 'text',
            margin: 0,
          })}
        >
          — Walt Whitman
        </p>
        <p
          className={css({
            textStyle: 'base',
            color: 'textMuted',
            marginTop: '2',
            maxWidth: '52ch',
          })}
        >
          A portfolio that tears itself down and rebuilds every night, taking the line as both creed
          and dare — proving restraint in the layout itself.
        </p>
      </div>

      <Nav />
    </div>
  )
}
