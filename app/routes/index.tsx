import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      <div
        className={css({
          width: '100%',
          minHeight: 'calc(100vh - 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        })}
      >
        {/* Hero phrase */}
        <div
          className={css({
            padding: '0 5vw',
            userSelect: 'none',
          })}
        >
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'black',
              fontSize: 'clamp(5.5rem, 16vw, 20rem)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              textTransform: 'uppercase',
              color: 'accent',
              textShadow: '0 0 80px rgba(255, 36, 114, 0.20)',
              textWrap: 'balance',
            })}
          >
            <span className={css({ display: 'block' })}>Claude</span>
            <span className={css({ display: 'block' })}>Leaves</span>
            <span className={css({ display: 'block' })}>Fingerprints.</span>
          </h1>
        </div>

        {/* Signal strip — bottom */}
        <div
          className={css({
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            height: '80px',
            padding: '0 5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'body',
            fontSize: '13px',
            lineHeight: '1.3',
            gap: '16px',
            background: 'rgba(12, 6, 16, 0.90)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid',
            borderColor: 'rgba(255, 36, 114, 0.08)',
            zIndex: '50',
            '@media (max-width: 640px)': {
              flexDirection: 'column',
              height: 'auto',
              padding: '12px 5vw',
              alignItems: 'flex-start',
              gap: '6px',
            },
          })}
        >
          {/* Left: date + HN */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              flexWrap: 'wrap',
              minWidth: '0',
            })}
          >
            <span className={css({ color: 'textMuted', letterSpacing: 'wide', whiteSpace: 'nowrap' })}>
              2026.07.01
            </span>
            <span className={css({ color: 'textMuted', padding: '0 8px' })}>·</span>
            <span className={css({ color: 'accent', fontWeight: 'semibold', whiteSpace: 'nowrap' })}>
              HN #1 · 2,099 pts
            </span>
            <span className={css({ color: 'textMuted', padding: '0 6px' })}>—</span>
            <span
              className={css({
                color: 'textSecondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '360px',
                '@media (max-width: 768px)': {
                  maxWidth: '220px',
                },
              })}
            >
              &ldquo;Claude Code is steganographically marking requests&rdquo;
            </span>
          </div>

          {/* Right: sports + lunar + holiday */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              flexShrink: '0',
              flexWrap: 'wrap',
            })}
          >
            <span className={css({ color: 'accent', fontWeight: 'semibold', whiteSpace: 'nowrap' })}>
              DET 9 · OPP 3
            </span>
            <span className={css({ color: 'textMuted', padding: '0 8px' })}>·</span>
            <span className={css({ color: 'textMuted', whiteSpace: 'nowrap' })}>
              Waning gibbous 94.6%
            </span>
            <span className={css({ color: 'textMuted', padding: '0 8px' })}>·</span>
            <span className={css({ color: 'textMuted', whiteSpace: 'nowrap' })}>
              Independence Day −3
            </span>
          </div>
        </div>

        {/* Archive link — very subtle, above signal strip */}
        <div
          className={css({
            position: 'fixed',
            bottom: '80px',
            right: '5vw',
            zIndex: '50',
            '@media (max-width: 640px)': {
              bottom: 'auto',
              position: 'static',
              padding: '0 5vw',
              marginTop: '24px',
              textAlign: 'right',
            },
          })}
        >
          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              textDecoration: 'none',
              padding: '8px 0',
              _hover: { color: 'accent' },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            Archive
          </a>
        </div>
      </div>
    </>
  )
}