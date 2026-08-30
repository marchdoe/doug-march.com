import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { BrandLockup } from '../components/BrandLockup'
import { identity } from '../content/about'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <div
      className={css({
        position: 'fixed',
        inset: '0',
        zIndex: '9999',
        bg: 'accent',
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
          bg: 'accent',
          color: 'fieldInk',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '9',
          overflow: 'hidden',
        })}
      >
        <BrandLockup
          variant="horizontal-md"
          mode="single-color"
          className={css({ color: 'fieldInk' })}
        />

        <div>
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: 'sm',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'fieldInkMuted',
              marginBottom: '5',
            })}
          >
            The busy man — rebuilt nightly
          </p>
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(4rem,10vw,7.5rem)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'fieldInk',
              textTransform: 'uppercase',
              margin: '0',
            })}
          >
            <span className={css({ display: 'block' })}>Select</span>
            <span className={css({ display: 'block' })}>a busy man.</span>
          </h1>
        </div>

        <div
          className={css({
            fontSize: 'sm',
            color: 'fieldInkMuted',
            fontWeight: 'semibold',
            letterSpacing: 'wide',
          })}
        >
          dougmar.ch · {identity.role}
        </div>
      </div>
    </div>
  )
}
