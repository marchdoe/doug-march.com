// app/server/signals.ts
import { createServerFn } from '@tanstack/react-start'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'

const SIGNALS_PATH = resolve(process.cwd(), 'signals/today.yml')

// Exported for unit testing — pure logic without the server function wrapper
export function _readSignalsHandler(path = SIGNALS_PATH): Record<string, unknown> {
  const content = readFileSync(path, 'utf8')
  return yaml.load(content) as Record<string, unknown>
}

export function _saveOverridesHandler(
  data: { moodOverride: string | null; notes: string | null },
  path = SIGNALS_PATH
): void {
  const content = readFileSync(path, 'utf8')
  const signals = yaml.load(content) as Record<string, unknown>
  signals.mood_override = data.moodOverride ?? null
  signals.notes = data.notes || null
  writeFileSync(path, yaml.dump(signals), 'utf8')
}

// Server functions — never bundled to the client
export const readSignals = createServerFn({ method: 'GET' })
  .handler(() => _readSignalsHandler())

export const saveOverrides = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => d as { moodOverride: string | null; notes: string | null })
  .handler(({ data }) => {
    _saveOverridesHandler(data)
    return { ok: true }
  })
