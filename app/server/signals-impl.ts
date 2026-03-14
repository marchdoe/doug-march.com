// app/server/signals-impl.ts
// Pure implementation — no server function wrappers, safe to import in tests
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import yaml from 'js-yaml'

export const SIGNALS_PATH = resolve(process.cwd(), 'signals/today.yml')

export function _readSignalsHandler(path = SIGNALS_PATH): Record<string, unknown> {
  const content = readFileSync(path, 'utf8')
  const data = yaml.load(content) as Record<string, unknown>
  // js-yaml parses bare YYYY-MM-DD dates as Date objects — normalize to string
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().slice(0, 10)
  }
  return data
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
