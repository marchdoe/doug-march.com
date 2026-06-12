import { describe, it, expect, afterEach } from 'vitest'
import { modelFor, isDevModelTier, PROD_MODELS } from '../../scripts/utils/models.js'

const ENV_KEYS = ['PIPELINE_TIER', 'ANTHROPIC_API_KEY']
const saved = {}
function setEnv(patch) {
  for (const k of ENV_KEYS) {
    saved[k] = process.env[k]
    delete process.env[k]
  }
  Object.assign(process.env, patch)
}
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
})

describe('model tier resolution', () => {
  it('defaults to DEV when no API key is present (local Max-plan run)', () => {
    setEnv({})
    expect(isDevModelTier()).toBe(true)
    expect(modelFor('mockup-designer')).toBe('sonnet') // capped down from opus
  })

  it('defaults to PROD when an API key is present (CI / billed run)', () => {
    setEnv({ ANTHROPIC_API_KEY: 'sk-ant-test' })
    expect(isDevModelTier()).toBe(false)
    expect(modelFor('mockup-designer')).toBe('opus') // full prod model
  })

  it('PIPELINE_TIER=prod forces prod models even with no API key', () => {
    setEnv({ PIPELINE_TIER: 'prod' })
    expect(modelFor('mockup-designer')).toBe('opus')
  })

  it('PIPELINE_TIER=dev forces dev cap even with an API key', () => {
    setEnv({ PIPELINE_TIER: 'dev', ANTHROPIC_API_KEY: 'sk-ant-test' })
    expect(modelFor('mockup-designer')).toBe('sonnet')
  })

  it('leaves models already at or below the dev ceiling unchanged', () => {
    setEnv({}) // dev tier
    expect(modelFor('art-director')).toBe('sonnet')   // sonnet stays sonnet
    expect(modelFor('spec-critic')).toBe('haiku')     // haiku stays haiku
    expect(modelFor('react-engineer')).toBe('sonnet')
    expect(modelFor('mockup-critic')).toBe('sonnet')
  })

  it('falls back to sonnet for an unknown agent', () => {
    setEnv({ PIPELINE_TIER: 'prod' })
    expect(modelFor('who-dis')).toBe('sonnet')
  })

  it('exposes the prod model map for reference', () => {
    expect(PROD_MODELS['mockup-designer']).toBe('opus')
  })
})
