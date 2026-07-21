import { useRouterState } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { education } from '../content/timeline'
import { personal } from '../content/about'
import { projects } from '../content/projects'

const asideClass = css({
  bg: 'bgSliver',
  borderTop: { base: '1px solid', md: 'none' },
  borderColor: 'border',
  paddingInline: '4',
  paddingBlock: '8',
  display: 'flex',
  flexDirection: 'column',
  gap: '8',
  position: { base: 'static', md: 'sticky' },
  top: { md: 0 },
  height: { md: '100vh' },
  overflow: { md: 'hidden' },
})

const sigBlockClass = css({
  borderTop: '1px solid',
  borderColor: 'border',
  paddingTop: '5',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
})

const sigLabelClass = css({
  fontFamily: 'body',
  fontWeight: '600',
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const sigLineClass = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '3',
  fontFamily: 'body',
  fontSize: 'base',
  color: 'textSecondary',
})

const valClass = css({
  fontWeight: '600',
  fontVariantNumeric: 'tabular-nums',
  color: 'textSecondary',
})

const colophonLineClass = css({
  fontFamily: 'body',
  fontSize: 'sm',
  lineHeight: 'normal',
  color: 'textMuted',
  fontVariantNumeric: 'tabular-nums',
})

const strongClass = css({ color: 'textSecondary', fontWeight: '600' })

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const matches = useRouterState({ select: (s) => s.matches })

  const isAbout = pathname.startsWith('/about')
  const isWork = pathname.startsWith('/work')

  const lastMatch = matches[matches.length - 1]
  const slug = (lastMatch?.params as { slug?: string } | undefined)?.slug
  const currentIndex = slug ? projects.findIndex((p) => p.slug === slug) : -1
  const current = currentIndex >= 0 ? projects[currentIndex] : undefined
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined
  const next = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined

  return (
    <aside className={asideClass} aria-label="Yesterday's data">
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '1' })}>
        <div className={css({
          fontFamily: 'display',
          fontSize: '40px',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textSecondary',
          lineHeight: 'tight',
        })}>
          Yesterday
        </div>
        <div className={css({
          fontFamily: 'body',
          fontWeight: '600',
          fontSize: '2xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'textMuted',
        })}>
          Twenty percent — the demoted sliver
        </div>
      </div>

      {isAbout ? (
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
          <div className={sigBlockClass}>
            <span className={sigLabelClass}>Education</span>
            <div className={css({ fontFamily: 'body', fontSize: 'base', color: 'textSecondary', lineHeight: 'normal' })}>
              {education.school}<br />
              {education.degree} — {education.concentration}<br />
              {education.years}
            </div>
          </div>
          <div className={sigBlockClass}>
            <span className={sigLabelClass}>Holes in One</span>
            <div className={sigLineClass}>
              <span>{personal.sport}</span>
              <span className={valClass}>{personal.holesInOne}</span>
            </div>
          </div>
          <div className={sigBlockClass}>
            <span className={sigLabelClass}>Teams</span>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '1' })}>
              {personal.teams.map((t) => (
                <span key={t} className={css({ fontSize: 'base', color: 'textSecondary' })}>{t}</span>
              ))}
            </div>
          </div>
          <div className={sigBlockClass}>
            <span className={sigLabelClass}>Current Focus</span>
            <p className={css({ fontSize: 'base', color: 'textSecondary', lineHeight: 'normal' })}>
              {personal.currentFocus}
            </p>
          </div>
        </div>
      ) : isWork ? (
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '6' })}>
          {current && (
            <div className={sigBlockClass}>
              <span className={sigLabelClass}>{current.title}</span>
              <div className={sigLineClass}>
                <span>{current.type}</span>
                <span className={valClass}>{current.year}</span>
              </div>
            </div>
          )}
          <div className={sigBlockClass}>
            <span className={sigLabelClass}>Navigate</span>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
              {prev && <a href={`/work/${prev.slug}`} className={sigLineClass}><span>← {prev.title}</span></a>}
              {next && <a href={`/work/${next.slug}`} className={sigLineClass}><span>{next.title} →</span></a>}
            </div>
          </div>
        </div>
      ) : (
        <div className={sigBlockClass}>
          <span className={sigLabelClass}>Detroit Tigers</span>
          <div className={sigLineClass}>
            <span>Final · completed</span>
            <span className={valClass}>W 8–6</span>
          </div>
        </div>
      )}

      <div className={css({
        marginTop: 'auto',
        borderTop: '1px solid',
        borderColor: 'border',
        paddingTop: '6',
        display: 'flex',
        flexDirection: 'column',
        gap: '3',
      })}>
        <span className={sigLabelClass}>Colophon</span>
        <p className={colophonLineClass}><strong className={strongClass}>Moon</strong> — first quarter, 50% illuminated</p>
        <p className={colophonLineClass}>
          <strong className={strongClass}>On rotation</strong><br />
          Radiohead<br />
          Guided by Voices<br />
          Tobin Sprout
        </p>
        <p className={colophonLineClass}>
          <strong className={strongClass}>Built at dawn</strong> — 21 Jul 2026<br />
          Torn down &amp; rebuilt daily · Summer
        </p>
      </div>
    </aside>
  )
}