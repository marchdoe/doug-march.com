// app/server/signals.ts
'use server'
import { createServerFn } from '@tanstack/react-start'
import { _readSignalsHandler, _saveOverridesHandler } from './signals-impl'

export const readSignals = createServerFn({ method: 'GET' })
  .handler(() => _readSignalsHandler())

export const saveOverrides = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => {
    const obj = d as Record<string, unknown>
    if (typeof obj !== 'object' || obj === null) throw new Error('Invalid input')
    return {
      moodOverride: obj.moodOverride === null ? null : String(obj.moodOverride ?? ''),
      notes: obj.notes === null ? null : String(obj.notes ?? ''),
    }
  })
  .handler(({ data }) => {
    _saveOverridesHandler(data)
    return { ok: true }
  })
