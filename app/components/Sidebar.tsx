import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <>
      {/* Top-left: wordmark + tiny logo */}
      <div
        className={css({
          position: 'fixed',
          top: '24px',
          left: '6vw',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textMuted',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          mixBlendMode: 'multiply',
        })}
      >
        <img
          src={logoSvg}
          alt=""
          width={20}
          height={20}
          className={css({ display: 'block', width: '20px', height: '20px' })}
        />
        <a
          href="/"
          className={css({
            color: 'textMuted',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            paddingY: '14px',
            transition: 'color 0.15s ease',
            _hover: { color: 'accent' },
          })}
        >
          doug-march.com
        </a>
      </div>

      {/* Top-right: minimal nav links */}
      <nav
        aria-label="Primary"
        className={css({
          position: 'fixed',
          top: '24px',
          right: '6vw',
          zIndex: 50,
          display: 'flex',
          gap: { base: '20px', sm: '28px' },
          alignItems: 'center',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textSecondary',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            textDecoration: 'none',
            paddingY: '14px',
            paddingX: '4px',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'color 0.15s ease',
            _hover: { color: 'accent' },
            _focusVisible: {
              outline: '2px solid token(colors.accent)',
              outlineOffset: '2px',
            },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: 'textSecondary',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            textDecoration: 'none',
            paddingY: '14px',
            paddingX: '4px',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'color 0.15s ease',
            _hover: { color: 'accent' },
            _focusVisible: {
              outline: '2px solid token(colors.accent)',
              outlineOffset: '2px',
            },
          })}
        >
          About
        </a>
      </nav>

      {/* Bottom signal strip */}
      <aside
        aria-label="Signals"
        className={css({
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 50,
          minHeight: '48px',
          background: 'bgCard',
          borderTop: '1px solid token(colors.border)',
          display: 'flex',
          alignItems: 'center',
          paddingX: '6vw',
          paddingY: '8px',
          gap: { base: '18px', md: '28px' },
          fontFamily: 'body',
          fontSize: '12px',
          color: 'textSecondary',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        })}
      >
        <span className={css({ display: 'inline-flex', gap: '6px', flexShrink: 0 })}>
          <span aria-hidden>79°</span>
          <span aria-hidden>·</span>
          <span>Sunny</span>
        </span>
        <span className={css({ color: 'textMuted', flexShrink: 0 })}>
          <span aria-hidden>◑</span> 79%
        </span>
        <span
          className={css({
            color: 'textSecondary',
            flexShrink: 1,
            minWidth: '0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'inline-flex',
            gap: '8px',
            alignItems: 'baseline',
          })}
        >
          <span className={css({ color: 'accent' })} aria-hidden>↑ 343</span>
          <span
            className={css({
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: { base: '180px', md: '320px' },
              display: 'inline-block',
            })}
          >
            Async Rust never left the MVP
          </span>
        </span>
        <span className={css({ color: 'textMuted', flexShrink: 0 })}>SPY −0.37%</span>
        <span
          className={css({
            color: 'textMuted',
            fontStyle: 'italic',
            textTransform: 'none',
            letterSpacing: '0.02em',
            flexShrink: 0,
          })}
        >
          Mother’s Day in 5
        </span>
        <span
          className={css({
            color: 'textMuted',
            fontSize: '11px',
            flexShrink: 0,
            display: { base: 'none', md: 'inline' },
          })}
        >
          Truist Championship · Scheduled
        </span>
        <span className={css({ flex: '1 1 auto' })} />
        <a
          href="/archive"
          className={css({
            color: 'textMuted',
            textDecoration: 'none',
            flexShrink: 0,
            paddingY: '12px',
            transition: 'color 0.15s ease',
            _hover: { color: 'accent', textDecoration: 'underline' },
          })}
        >
          Archive
        </a>
      </aside>
    </>
  )
}