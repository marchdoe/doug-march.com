import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2px' }}>
      <span className={css({
        fontFamily: 'oswald',
        fontSize: 'xs',
        fontWeight: '400',
        color: 'textRightMuted',
        letterSpacing: 'widest',
        textTransform: 'uppercase',
      })}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#EAE6D2' }} />
    </div>
  )
}

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
  ]

  return (
    <div style={{ padding: '52px', paddingBottom: '96px' }}>

      {/* Weather + market strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <span className={css({
          fontFamily: 'oswald',
          fontSize: 'xs',
          fontWeight: '400',
          color: 'textRightMuted',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
        })}>
          36°F &nbsp;·&nbsp; Sunny &nbsp;·&nbsp; Feels like 29°F
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span className={css({ fontFamily: 'oswald', fontSize: 'xs', color: 'textRightMuted', letterSpacing: 'widest', textTransform: 'uppercase' })}>
            Market{' '}
          </span>
          <span className={css({ fontFamily: 'oswald', fontSize: 'xs', color: 'marketGreen', letterSpacing: 'widest' })}>
            +1.05%
          </span>
        </span>
      </div>

      {/* Opening Day — the only eager element */}
      <div
        className={css({ background: 'accentOpeningDayGlow' })}
        style={{ padding: '24px 28px', marginBottom: '48px' }}
      >
        <div className={css({
          fontFamily: 'oswald',
          fontSize: 'xl',
          fontWeight: '600',
          color: 'accentOpeningDay',
          letterSpacing: 'tight',
          lineHeight: 'tight',
        })}>
          2 DAYS
        </div>
        <div className={css({
          fontFamily: 'oswald',
          fontWeight: '400',
          color: 'textRightMuted',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
        })} style={{ fontSize: '12px', marginTop: '5px' }}>
          MLB Opening Day
        </div>
      </div>

      {/* Pistons — present, acknowledged, moving on */}
      <div style={{ borderBottom: '1px solid #EAE6D2', marginBottom: '48px' }}>
        <div style={{ height: '44px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className={css({
            fontFamily: 'oswald',
            fontSize: 'md',
            fontWeight: '500',
            color: 'textRight',
            letterSpacing: 'normal',
            fontVariantNumeric: 'tabular-nums',
          })}>
            DET &nbsp;113 &nbsp;·&nbsp; OKC &nbsp;110
          </span>
          <span className={css({
            fontFamily: 'oswald',
            fontSize: 'xs',
            fontWeight: '400',
            color: 'textRightSecondary',
            letterSpacing: 'wide',
          })}>
            W
          </span>
        </div>
      </div>

      {/* Work index */}
      <div style={{ marginBottom: '40px' }}>
        <SectionLabel label="Work" />
        {allWork.map((project, i) => {
          const num = String(i + 1).padStart(3, '0')
          const href = project.liveUrl ?? project.externalUrl ?? `/work/${project.slug}`
          const external = !!(project.liveUrl || project.externalUrl)
          return (
            <a
              key={project.slug}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={css({
                display: 'block',
                transition: 'background 0.15s ease',
                _hover: { background: 'bgCardRight' },
              })}
              style={{ borderBottom: '1px solid #EAE6D2' }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto auto 18px',
                height: '44px',
                alignItems: 'center',
                gap: '16px',
              }}>
                <span className={css({
                  fontFamily: 'oswald',
                  fontSize: 'xs',
                  color: 'textRightMuted',
                  fontVariantNumeric: 'tabular-nums',
                })}>
                  {num}
                </span>
                <span className={css({
                  fontFamily: 'oswald',
                  fontSize: 'base',
                  fontWeight: project.featured ? '600' : '500',
                  color: 'textRight',
                })}>
                  {project.title}
                </span>
                <span className={css({
                  fontFamily: 'oswald',
                  fontSize: 'xs',
                  color: 'textRightMuted',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                })}>
                  {project.type}
                </span>
                <span className={css({
                  fontFamily: 'oswald',
                  fontSize: 'xs',
                  color: 'textRightMuted',
                  fontVariantNumeric: 'tabular-nums',
                })}>
                  {project.year}
                </span>
                <span className={css({
                  fontFamily: 'oswald',
                  fontSize: 'sm',
                  color: 'textRightSecondary',
                })}>
                  →
                </span>
              </div>
            </a>
          )
        })}
      </div>

      {/* Experiments */}
      {experiments.length > 0 && (
        <div>
          <SectionLabel label="Experiments" />
          {experiments.map((project, i) => {
            const num = `E${String(i + 1).padStart(2, '0')}`
            const href = project.externalUrl ?? project.liveUrl ?? `/work/${project.slug}`
            const external = !!(project.externalUrl || project.liveUrl)
            return (
              <a
                key={project.slug}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={css({
                  display: 'block',
                  transition: 'background 0.15s ease',
                  _hover: { background: 'bgCardRight' },
                })}
                style={{ borderBottom: '1px solid #EAE6D2' }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr auto auto 18px',
                  height: '44px',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <span className={css({ fontFamily: 'oswald', fontSize: 'xs', color: 'textRightMuted', fontVariantNumeric: 'tabular-nums' })}>
                    {num}
                  </span>
                  <span className={css({ fontFamily: 'oswald', fontSize: 'base', fontWeight: '500', color: 'textRight' })}>
                    {project.title}
                  </span>
                  <span className={css({ fontFamily: 'oswald', fontSize: 'xs', color: 'textRightMuted', letterSpacing: 'wide', textTransform: 'uppercase' })}>
                    {project.type}
                  </span>
                  <span className={css({ fontFamily: 'oswald', fontSize: 'xs', color: 'textRightMuted', fontVariantNumeric: 'tabular-nums' })}>
                    {project.year}
                  </span>
                  <span className={css({ fontFamily: 'oswald', fontSize: 'sm', color: 'textRightSecondary' })}>
                    →
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}