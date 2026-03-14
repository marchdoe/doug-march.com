// app/server/signals.ts
'use server'
import { createServerFn } from '@tanstack/react-start'
import { _readSignalsHandler, _saveOverridesHandler } from './signals-impl'

export const readSignals = createServerFn({ method: 'GET' })
  .handler(() => _readSignalsHandler())

export const saveOverrides = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => d as { moodOverride: string | null; notes: string | null })
  .handler(({ data }) => {
    _saveOverridesHandler(data)
    return { ok: true }
  })
