// tests/server/signals.test.ts
import { describe, it, expect, afterEach } from 'vitest'
import { writeFileSync, unlinkSync, readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'
import { _readSignalsHandler, _saveOverridesHandler } from '../../app/server/signals-impl.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FIXTURES_DIR = resolve(__dirname, '../fixtures')
const TEST_PATH = resolve(FIXTURES_DIR, 'test-signals.yml')

const sample = {
  date: '2026-03-14',
  weather: { location: 'Chicago', conditions: 'Sunny', feel: 'warm' },
  sports: [],
  mood_override: null,
  notes: null,
}

function writeYaml(data: object) {
  mkdirSync(FIXTURES_DIR, { recursive: true })
  writeFileSync(TEST_PATH, yaml.dump(data), 'utf8')
}

afterEach(() => {
  try { unlinkSync(TEST_PATH) } catch { /* ok */ }
})

describe('_readSignalsHandler', () => {
  it('returns parsed YAML', () => {
    writeYaml(sample)
    const result = _readSignalsHandler(TEST_PATH)
    expect(result.date).toBe('2026-03-14')
    expect((result.weather as Record<string, string>).location).toBe('Chicago')
  })
})

describe('_saveOverridesHandler', () => {
  it('writes mood_override', () => {
    writeYaml(sample)
    _saveOverridesHandler({ moodOverride: 'dark', notes: null }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.mood_override).toBe('dark')
  })

  it('clears mood_override when null', () => {
    writeYaml({ ...sample, mood_override: 'dark' })
    _saveOverridesHandler({ moodOverride: null, notes: null }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.mood_override).toBeNull()
  })

  it('writes notes', () => {
    writeYaml(sample)
    _saveOverridesHandler({ moodOverride: null, notes: 'Hole in one!' }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.notes).toBe('Hole in one!')
  })

  it('clears notes when null', () => {
    writeYaml({ ...sample, notes: 'old note' })
    _saveOverridesHandler({ moodOverride: null, notes: null }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.notes).toBeNull()
  })

  it('preserves other fields', () => {
    writeYaml(sample)
    _saveOverridesHandler({ moodOverride: 'dark', notes: 'hi' }, TEST_PATH)
    const out = yaml.load(readFileSync(TEST_PATH, 'utf8')) as Record<string, unknown>
    expect(out.date).toBe('2026-03-14')
  })
})
