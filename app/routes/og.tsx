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
        background: 'bg',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div
        className={css({
          width: '1200px',
          height: '630px',
          position: 'relative',
          background: 'bg',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingX: '80px',
        })}
      >
        <div className={css({ position: 'absolute', top: '48px', left: '80px', color: 'accent' })}>
          <BrandLockup variant="horizontal-sm" mode="single-color" roleLine={false} />
        </div>

        <h1
          className={css({
            textStyle: 'hero',
            fontFamily: 'display',
            fontWeight: '800',
            color: 'text',
            maxWidth: '14ch',
            margin: 0,
          })}
        >
          Simplicity is the glory
          <span className={css({ display: 'block', marginLeft: '160px', color: 'accent' })}>
            of expression.
          </span>
        </h1>
      </div>
    </div>
  )
}
