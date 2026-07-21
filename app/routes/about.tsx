import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Nav, panelGradient } from '../components/Nav'
import { identity } from '../content/about'
import { timeline, capabilities } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <div className={css({
      bg: 'bgPanel',
      backgroundImage: panelGradient,
      color: 'textOnPanel',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    })}>
      <Nav />

      <div className={css({ paddingInline: '6vw', paddingBlock: { base: '10', md: '14' } })}>
        <p className={css({
          fontFamily: 'body',
          fontWeight: '600',
          fontSize: 'xs',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'accentGlow',
          marginBottom: '6',
        })}>
          {identity.role}
        </p>
        <h1 className={css({
          fontFamily: 'display',
          fontSize: { base: '40px', md: '64px', lg: '88px' },
          lineHeight: 'tight',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'textOnPanel',
          maxWidth: '20ch',
        })}>
          {identity.name}
        </h1>
        <p className={css({
          marginTop: '6',
          maxWidth: '62ch',
          fontSize: 'lg',
          lineHeight: 'loose',
          color: 'textSecondary',
        })}>
          {identity.statement}
        </p>
      </div>

      <div className={css({ paddingInline: '6vw', paddingBottom: { base: '10', md: '14' } })}>
        <div className={css({ borderTop: '1px solid', borderColor: 'textOnPanel/24' })}>
          {timeline.map((t) => (
            <div
              key={`${t.year}-${t.role}-${t.company}`}
              className={css({
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '6',
                paddingBlock: '6',
                paddingInline: '2',
                borderBottom: '1px solid',
                borderColor: 'textOnPanel/16',
              })}
            >
              <span className={css({
                fontFamily: 'body',
                fontWeight: '500',
                fontSize: 'sm',
                fontVariantNumeric: 'tabular-nums',
                color: 'accentGlow',
              })}>
                {t.year}
              </span>
              <div>
                <div className={css({ fontFamily: 'body', fontWeight: '600', fontSize: 'md', color: 'textOnPanel' })}>
                  {t.role} <span className={css({ color: 'textSecondary', fontWeight: '500' })}>· {t.company}</span>
                </div>
                <p className={css({ marginTop: '1', fontSize: 'base', lineHeight: 'normal', color: 'textSecondary' })}>
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={css({
        marginTop: 'auto',
        paddingInline: '6vw',
        paddingBlock: { base: '8', md: '10' },
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2',
      })}>
        {capabilities.map((c) => (
          <span
            key={c}
            className={css({
              fontFamily: 'body',
              fontWeight: '500',
              fontSize: 'sm',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'textOnPanel',
              border: '1px solid',
              borderColor: 'accent',
              borderRadius: 'sm',
              paddingBlock: '2',
              paddingInline: '4',
            })}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}