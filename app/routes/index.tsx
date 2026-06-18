import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Quote Stage */}
      <div
        className={css({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5vh 5vw',
          minHeight: '76vh',
        })}
      >
        <div
          className={css({
            maxWidth: '92vw',
          })}
        >
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: 'tight',
              color: 'text',
              textWrap: 'balance',
            })}
          >
            <span
              className={css({
                display: 'block',
                fontSize: 'clamp(52px, 7.8vw, 112px)',
                letterSpacing: '-0.02em',
              })}
            >
              The harder you work,
            </span>
            <span
              className={css({
                display: 'block',
                fontSize: 'clamp(52px, 7.8vw, 112px)',
                letterSpacing: '-0.02em',
              })}
            >
              the harder it is to
            </span>
            <span
              className={css({
                display: 'block',
                fontSize: 'clamp(72px, 11.5vw, 165px)',
                letterSpacing: '0.12em',
                color: 'text',
              })}
            >
              Surrender.
            </span>
          </h1>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              color: 'textMuted',
              marginTop: '24px',
            })}
          >
            — Vince Lombardi
          </p>
        </div>
      </div>

      {/* Signal Footer */}
      <footer
        className={css({
          minHeight: '90px',
          padding: '0 5vw',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          borderTop: '1px solid',
          borderColor: 'border',
          flexWrap: 'wrap',
        })}
      >
        {/* U.S. Open */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: '12px 0',
            paddingRight: '32px',
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '10px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              color: 'textMuted',
            })}
          >
            U.S. Open
          </span>
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '11px',
              color: 'accent',
              lineHeight: 'snug',
            })}
          >
            Leader: E (5 tied)
          </span>
          <a
            href="/work/15th-club"
            className={css({
              fontFamily: 'mono',
              fontSize: '10px',
              color: 'textMuted',
              _hover: { color: 'accentLight' },
              transition: 'color 200ms ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              minHeight: '44px',
              marginTop: '-16px',
              paddingTop: '16px',
            })}
          >
            → 15th Club
          </a>
        </div>

        {/* Divider */}
        <div
          className={css({
            width: '1px',
            height: '40px',
            background: 'border',
            flexShrink: 0,
            display: { base: 'none', sm: 'block' },
          })}
        />

        {/* Tigers */}
        <div
          className={css({
            display: { base: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: '4px',
            padding: '12px 32px',
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '10px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              color: 'textMuted',
            })}
          >
            MLB
          </span>
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '11px',
              color: 'textSecondary',
              opacity: 0.7,
            })}
          >
            DET 2 · 4
          </span>
        </div>

        {/* Divider */}
        <div
          className={css({
            width: '1px',
            height: '40px',
            background: 'border',
            flexShrink: 0,
            display: { base: 'none', md: 'block' },
          })}
        />

        {/* HN */}
        <div
          className={css({
            display: { base: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: '4px',
            padding: '12px 32px',
          })}
        >
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '10px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              color: 'textMuted',
            })}
          >
            HN
          </span>
          <span
            className={css({
              fontFamily: 'mono',
              fontSize: '10px',
              color: 'textMuted',
            })}
          >
            ↑834 — Midjourney Medical
          </span>
        </div>

        {/* Spacer */}
        <div className={css({ flex: 1 })} />

        {/* Juneteenth badge */}
        <div
          className={css({
            border: '1px solid',
            borderColor: 'borderAccent',
            padding: '6px 12px',
            fontFamily: 'mono',
            fontSize: '11px',
            color: 'accentLight',
            display: { base: 'none', sm: 'block' },
            flexShrink: 0,
          })}
        >
          Juneteenth ↑ tomorrow
        </div>

        {/* Archive link */}
        <a
          href="/archive"
          className={css({
            fontFamily: 'mono',
            fontSize: '10px',
            color: 'textMuted',
            marginLeft: '32px',
            _hover: { color: 'accentLight' },
            transition: 'color 200ms ease',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
          })}
        >
          Archive
        </a>
      </footer>
    </>
  )
}