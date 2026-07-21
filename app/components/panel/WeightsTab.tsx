import { useState } from 'react'
import { Slider } from '@base-ui/react/slider'
import { css, cx } from '../../../styled-system/css'
import {
  sliderRow,
  sliderLabelRow,
  sliderControl,
  sliderTrack,
  sliderIndicator,
  sliderThumb,
  mutedText,
  button,
  errorText,
  successText,
} from './styles'
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
        <div key={key} className={sliderRow}>
          <Slider.Root
            min={0}
            max={10}
            step={1}
            value={weights[key]}
            onValueChange={(value) => setWeights((w) => ({ ...w, [key]: value }))}
          >
            <div className={sliderLabelRow}>
              <Slider.Label>{label}</Slider.Label>
              <span>{weights[key]}</span>
            </div>
            <Slider.Control className={sliderControl}>
              <Slider.Track className={sliderTrack}>
                <Slider.Indicator className={sliderIndicator} />
                <Slider.Thumb className={sliderThumb} />
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>
          <p className={mutedText}>{desc}</p>
        </div>
      ))}
      <button type="button" disabled={state === 'busy'} onClick={save} className={button({ kind: 'primary' })}>
        {state === 'busy' ? 'Saving…' : 'Save weights'}
      </button>
      {state === 'saved' && <p className={cx(successText, css({ marginTop: '10px' }))}>Saved — applies to the next run.</p>}
      {state !== 'idle' && state !== 'busy' && state !== 'saved' && (
        <p role="alert" className={cx(errorText, css({ marginTop: '10px' }))}>{state}</p>
      )}
    </section>
  )
}
