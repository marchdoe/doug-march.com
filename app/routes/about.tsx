import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav } from '../components/Nav'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  const strong = css({ color: 'fieldInk', fontWeight: '600' })

  return (
    <div
      className={css({
        paddingX: 'clamp(24px, 6vw, 96px)',
        paddingY: 'clamp(28px, 6vh, 72px)',
        minWidth: 0,
      })}
    >
      <Nav />

      <p
        className={css({
          textStyle: 'xl',
          fontWeight: '600',
          color: 'text',
          marginTop: 'clamp(28px, 6vh, 64px)',
          maxWidth: '48ch',
        })}
      >
        {identity.statement}
      </p>

      <div
        className={css({
          fontSize: 'sm',
          color: 'textFaint',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          marginTop: '2',
        })}
      >
        {identity.name} · {identity.role}
      </div>

      <ol
        className={css({
          borderLeft: '1px solid',
          borderColor: 'border',
          display: 'flex',
          flexDirection: 'column',
          gap: '6',
          paddingLeft: '6',
          listStyle: 'none',
          margin: 0,
          marginTop: '9',
        })}
      >
        {timeline.map((entry) => (
          <li
            key={`${entry.year}-${entry.role}`}
            className={css({
              display: 'flex',
              flexDirection: { base: 'column', md: 'row' },
              gap: '2',
              minWidth: 0,
            })}
          >
            <div
              className={css({
                flex: '0 0 120px',
                minWidth: '120px',
                fontVariantNumeric: 'tabular-nums',
                fontSize: 'sm',
                color: 'textFaint',
              })}
            >
              {entry.year}
            </div>
            <div className={css({ flex: '1', minWidth: 0 })}>
              <div className={css({ fontSize: 'base', fontWeight: '700', color: 'text' })}>
                {entry.role} · {entry.company}
              </div>
              <div className={css({ fontSize: 'base', color: 'textMuted', marginTop: '1' })}>
                {entry.description}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'textFaint',
          marginTop: '9',
          maxWidth: '80ch',
          overflowWrap: 'break-word',
        })}
      >
        {capabilities.join(' · ')}
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1',
          fontSize: 'sm',
          color: 'textMuted',
          marginTop: '6',
        })}
      >
        <div>{education.school}</div>
        <div>
          {education.degree} · {education.concentration}
        </div>
        <div>{education.years}</div>
      </div>

      <div
        className={css({
          marginTop: '9',
          background: 'field',
          color: 'fieldInkMuted',
          padding: '6',
          borderTop: '1px solid',
          borderColor: 'borderStrong',
          minWidth: 0,
        })}
      >
        <div
          className={css({
            fontSize: '2xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'fieldInkMuted',
            marginBottom: '2',
          })}
        >
          Off the clock
        </div>
        <div
          className={css({
            fontSize: 'sm',
            lineHeight: 'loose',
            display: 'flex',
            flexDirection: 'column',
            gap: '1',
          })}
        >
          <div>
            Holes in one: <b className={strong}>{personal.holesInOne}</b>
          </div>
          <div>
            Sport: <b className={strong}>{personal.sport}</b>
          </div>
          <div>
            Teams: <b className={strong}>{personal.teams.join(', ')}</b>
          </div>
          <div>
            Currently: <b className={strong}>{personal.currentFocus}</b>
          </div>
        </div>
      </div>
    </div>
  )
}
