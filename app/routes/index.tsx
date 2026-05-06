import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      <div
        className={css({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 48px)',
          padding: '0 6vw',
          overflow: 'hidden',
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(60px, 16.5vw, 230px)',
            fontWeight: '700',
            lineHeight: '0.88',
            letterSpacing: '-0.02em',
            color: 'heroText',
            textTransform: 'uppercase',
            userSelect: 'none',
          })}
        >
          <span className={css({ display: 'block' })}>Every loss</span>
          <span className={css({ display: 'block' })}>is a gain</span>
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '16px',
            fontWeight: '400',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginTop: '32px',
          })}
        >
          — Sathya Sai Baba
        </p>
      </div>

      {/* Signal strip */}
      <div
        className={css({
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6vw',
          gap: '24px',
          borderTop: '1px solid',
          borderColor: 'border',
          background: 'bg',
          zIndex: '100',
          overflowX: 'auto',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          '@media (max-width: 640px)': {
            gap: '16px',
            padding: '0 4vw',
          },
        })}
      >
        <SignalItem color="signalLoss" label="DET 3 · PIT 10" />
        <SignalItem color="signalWin" label="DET 111 · MIA 101" />
        <SignalItem color="textMuted" label="◐ 72%" />
        <SignalItem color="textMuted" label="☀ 13.8H" />
        <SignalItem color="textMuted" label="MOTHER'S DAY — 4 DAYS" />
        <SignalItem color="textMuted" label="AGENTS DEPLOY CLOUDFLARE ↑344" />
      </div>
    </>
  )
}

function SignalItem({ color, label }: { color: string; label: string }) {
  return (
    <span
      className={css({
        fontFamily: 'mono',
        fontSize: '12px',
        fontWeight: '400',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: color,
        flexShrink: 0,
      })}
    >
      {label}
    </span>
  )
}