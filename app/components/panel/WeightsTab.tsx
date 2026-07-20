import { useState } from 'react'
import { Slider } from '@base-ui/react/slider'
import { css } from '../../../styled-system/css'
import { saveWeights, type Weights } from './api'

const ROWS: Array<{ key: keyof Weights; label: string; desc: string }> = [
  { key: 'signals', label: 'Signals', desc: 'How much daily signals steer content' },
  { key: 'inspiration', label: 'Inspiration', desc: 'How much references steer style' },
  { key: 'ratings', label: 'Ratings', desc: 'How much past feedback influences decisions' },
  { key: 'risk', label: 'Risk', desc: 'How bold the design gestures get' },
]

export function WeightsTab({ initial }: { initial: Weights }) {
  const [weights, setWeights] = useState<Weights>(initial)
  const [state, setState] = useState<'idle' | 'busy' | 'saved' | string>('idle')

  const save = async () => {
    setState('busy')
    try {
      await saveWeights(weights)
      setState('saved')
    } catch (err) {
      setState(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <section>
      {ROWS.map(({ key, label, desc }) => (
        <div key={key} className={css({ marginBottom: '5' })}>
          <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
            <label htmlFor={`weight-${key}`}>{label}</label>
            <span>{weights[key]}</span>
          </div>
          <Slider.Root
            id={`weight-${key}`}
            min={0}
            max={10}
            step={1}
            value={weights[key]}
            onValueChange={(value) => setWeights((w) => ({ ...w, [key]: value }))}
          >
            <Slider.Control className={css({ display: 'flex', alignItems: 'center', height: '5' })}>
              <Slider.Track className={css({ height: '1', width: '100%', backgroundColor: 'currentColor', opacity: 0.2 })}>
                <Slider.Indicator className={css({ backgroundColor: 'currentColor' })} />
                <Slider.Thumb className={css({ width: '4', height: '4', borderRadius: 'full', backgroundColor: 'currentColor' })} />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <p className={css({ fontSize: 'sm', opacity: 0.7 })}>{desc}</p>
        </div>
      ))}
      <button type="button" disabled={state === 'busy'} onClick={save}>
        {state === 'busy' ? 'Saving…' : 'Save weights'}
      </button>
      {state === 'saved' && <p>Saved — applies to the next run.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'saved' && <p role="alert">{state}</p>}
    </section>
  )
}
