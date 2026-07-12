import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div
      className={css({
        display: 'grid',
        alignContent: 'center',
        justifyItems: 'start',
        padding: { base: '8 6', md: '12 16', lg: '18 24' },
        minHeight: { base: 'auto', md: '78vh' },
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <p
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          color: 'textMuted',
          marginBottom: { base: '4', md: '8' },
        })}
      >
        New Moon · Day 28 <span className={css({ color: 'accentGlow' })}>◐</span> The lunar calendar rolls back to zero
      </p>

      {/* Fluid clamp() retained for the hero — the static fontSize token
          scale doesn't cover poster-scale specimen sizing; this is a fluid
          exception, not a color/hex violation. */}
      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 'normal',
          textTransform: 'uppercase',
          lineHeight: 'tight',
          letterSpacing: 'normal',
          color: 'text',
        })}
        style={{ fontSize: 'clamp(72px, 14vw, 224px)' }}
      >
        <span className={css({ display: 'block' })}>Start Over</span>
        <span className={css({ display: 'block' })}>
          In The{' '}
          <span
            className={css({
              color: 'accent',
              textShadow: '0 0 48px {colors.accent.300}',
            })}
          >
            Dark
          </span>
        </span>
      </h1>

      <p
        className={css({
          position: 'relative',
          marginTop: { base: '5', md: '8' },
          maxWidth: '52ch',
          fontSize: { base: 'base', md: 'md' },
          lineHeight: 'normal',
          color: 'textSecondary',
        })}
      >
        Doug March — designer &amp; builder. This portfolio{' '}
        <strong className={css({ color: 'text', fontWeight: 'medium' })}>
          erases and rebuilds itself every morning
        </strong>
        , tonight under a sky with no moon in it. 2.1% illumination, and the crescent already on its way back.
      </p>
    </div>
  )
}