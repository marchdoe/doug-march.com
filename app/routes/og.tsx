import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { BrandLockup } from '../components/BrandLockup'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <div
      className={css({
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bg: 'field',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <div
        className={css({
          width: '1200px',
          height: '630px',
          position: 'relative',
          bg: 'field',
          color: 'fieldInk',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: '80px',
        })}
      >
        <p
          className={css({
            textStyle: 'sm',
            fontWeight: 500,
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'fieldInkMuted',
            mb: '6',
          })}
        >
          Final · Sept 5, 2026 · Detroit
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 400,
            textStyle: 'hero',
            color: 'fieldInk',
          })}
        >
          6–0.
        </h1>
        <p
          className={css({
            fontFamily: 'display',
            fontWeight: 400,
            textStyle: '5xl',
            color: 'fieldInk',
            mt: '2',
          })}
        >
          Shutout.
        </p>
        <div
          className={css({
            position: 'absolute',
            bottom: '48px',
            right: '64px',
            color: 'fieldInk',
          })}
        >
          <BrandLockup variant="stacked-md" mode="original" roleLine />
        </div>
      </div>
    </div>
  )
}
