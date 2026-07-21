import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav, panelGradient } from '../components/Nav'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

const sectionHeadClass = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '4',
  borderBottom: '1px solid',
  borderColor: 'border',
  paddingBottom: '4',
  marginBottom: '10',
})

const sectionHeadClassMt = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '4',
  borderBottom: '1px solid',
  borderColor: 'border',
  paddingBottom: '4',
  marginBottom: '10',
  marginTop: '28',
})

const sectionH2Class = css({
  fontFamily: 'display',
  fontSize: { base: '30px', md: '44px', lg: '52px' },
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'text',
})

const idxClass = css({
  fontFamily: 'body',
  fontWeight: '600',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
})

const rowsClass = css({ borderTop: '1px solid', borderColor: 'border' })

const rowClass = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto auto',
  alignItems: 'baseline',
  gap: '5',
  paddingBlock: '6',
  paddingInline: '2',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background .2s ease',
  _hover: { bg: 'bgCard' },
})

const numClass = css({ fontFamily: 'body', fontWeight: '600', fontSize: 'xs', letterSpacing: 'wide', color: 'textMuted' })
const rTitleClass = css({ fontFamily: 'display', fontSize: { base: '26px', md: '34px', lg: '40px' }, letterSpacing: 'wide', textTransform: 'uppercase', color: 'text' })
const rTypeClass = css({ fontFamily: 'body', fontWeight: '500', fontSize: 'sm', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textSecondary', textAlign: 'right' })
const rYearClass = css({ fontFamily: 'body', fontWeight: '500', fontSize: 'md', color: 'textMuted', textAlign: 'right', fontVariantNumeric: 'tabular-nums' })

function HomePage() {
  return (
    <>
      <header className={css({
        bg: 'bgPanel',
        backgroundImage: panelGradient,
        color: 'textOnPanel',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '12',
      })}>
        <Nav />

        <div className={css({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingInline: '6vw',
          paddingBlock: '12',
        })}>
          <p className={css({
            fontFamily: 'body',
            fontWeight: '600',
            fontSize: 'sm',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'accentGlow',
            marginBottom: '6',
          })}>
            Today's operating manifesto
          </p>
          <h1 className={css({
            fontFamily: 'display',
            fontSize: { base: '56px', md: '110px', lg: '160px' },
            lineHeight: 'tight',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'textOnPanel',
          })}>
            Eighty Percent<br />On <span className={css({ color: 'accent' })}>Tomorrow</span>
          </h1>
          <p className={css({
            marginTop: '8',
            fontFamily: 'body',
            fontWeight: '500',
            fontSize: 'md',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textSecondary',
          })}>
            — Brian <span className={css({ color: 'textOnPanel' })}>Tracy</span> · Twenty on yesterday
          </p>
        </div>

        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '2',
          borderTop: '1px solid',
          borderColor: 'textOnPanel/24',
          paddingTop: '6',
          maxWidth: '520px',
          marginInline: '6vw',
        })}>
          <span className={css({
            fontFamily: 'body',
            fontWeight: '600',
            fontSize: 'xs',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'accentGlow',
          })}>
            The Open · Final — opportunity seized
          </span>
          <div className={css({
            fontFamily: 'display',
            fontSize: { base: '34px', md: '56px' },
            lineHeight: 'snug',
            letterSpacing: 'wide',
            color: 'textOnPanel',
            display: 'flex',
            alignItems: 'baseline',
            gap: '4',
            flexWrap: 'wrap',
          })}>
            Ryan Fox <em className={css({ fontStyle: 'normal', color: 'accent' })}>−10</em>
          </div>
          <span className={css({ fontSize: 'md', color: 'textSecondary' })}>
            Champion Golfer of the Year, decided today.
          </span>
        </div>
      </header>

      <main className={css({ bg: 'bg', paddingInline: '6vw', paddingBlock: { base: '16', md: '24' } })} id="work">
        {featuredProject && (
          <section className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', lg: '1.15fr 1fr' },
            alignItems: 'center',
            gap: '10',
            bg: 'bgCard',
            borderRadius: 'md',
            paddingInline: { base: '8', md: '12', lg: '16' },
            paddingBlock: { base: '8', md: '12', lg: '16' },
            marginBottom: '24',
            backgroundImage: 'linear-gradient(135deg, var(--colors-neutral-800) 0%, var(--colors-violet-900) 140%)',
          })}>
            <div>
              <p className={css({
                fontFamily: 'body',
                fontWeight: '600',
                fontSize: 'xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'accent',
                marginBottom: '6',
              })}>
                Featured · {featuredProject.type} · {featuredProject.year}
              </p>
              <h2 className={css({
                fontFamily: 'display',
                fontSize: { base: '56px', md: '88px', lg: '120px' },
                lineHeight: 'tight',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textOnPanel',
              })}>
                {featuredProject.title}
              </h2>
            </div>
            <div>
              {featuredProject.problem && (
                <p className={css({ maxWidth: '62ch', fontSize: 'lg', lineHeight: 'loose', color: 'textSecondary' })}>
                  {featuredProject.problem}
                </p>
              )}
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2',
                    marginTop: '4',
                    fontFamily: 'body',
                    fontWeight: '600',
                    fontSize: 'xs',
                    letterSpacing: 'widest',
                    textTransform: 'uppercase',
                    color: 'textOnPanel',
                    border: '1px solid',
                    borderColor: 'accent',
                    borderRadius: 'md',
                    paddingBlock: '4',
                    paddingInline: '6',
                    transition: 'background .22s ease, color .22s ease',
                    _hover: { bg: 'accent', color: 'bg' },
                  })}
                >
                  Visit {featuredProject.externalUrl.replace(/^https?:\/\//, '')} ↗
                </a>
              )}
            </div>
          </section>
        )}

        <div className={sectionHeadClass}>
          <h2 className={sectionH2Class}>Selected Work</h2>
          <span className={idxClass}>{String(selectedWork.length).padStart(2, '0')} built things</span>
        </div>
        <div className={rowsClass}>
          {selectedWork.map((p, i) => (
            <a key={p.slug} href={`/work/${p.slug}`} className={rowClass}>
              <span className={numClass}>{String(i + 1).padStart(2, '0')}</span>
              <span className={rTitleClass}>{p.title}</span>
              <span className={rTypeClass}>{p.type}</span>
              <span className={rYearClass}>{p.year}</span>
            </a>
          ))}
        </div>

        <div className={sectionHeadClassMt}>
          <h2 className={sectionH2Class}>Experiments</h2>
          <span className={idxClass}>{String(experiments.length).padStart(2, '0')} side quests</span>
        </div>
        <div className={rowsClass}>
          {experiments.map((p, i) => (
            <a
              key={p.slug}
              href={p.externalUrl ?? `/work/${p.slug}`}
              target={p.externalUrl ? '_blank' : undefined}
              rel={p.externalUrl ? 'noopener noreferrer' : undefined}
              className={rowClass}
            >
              <span className={numClass}>{String(selectedWork.length + i + 1).padStart(2, '0')}</span>
              <span className={rTitleClass}>{p.title}</span>
              <span className={rTypeClass}>{p.type}</span>
              <span className={rYearClass}>{p.year}</span>
            </a>
          ))}
        </div>
      </main>
    </>
  )
}