import { describe, it, expect, afterEach } from 'vitest'
import { modelFor, isDevModelTier, PROD_MODELS, MODEL_IDS } from '../../scripts/utils/models.js'

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
    expect(modelFor('mockup-designer')).toBe(MODEL_IDS.sonnet) // capped down from opus
  })

  it('defaults to PROD when an API key is present (CI / billed run)', () => {
    setEnv({ ANTHROPIC_API_KEY: 'sk-ant-test' })
    expect(isDevModelTier()).toBe(false)
    expect(modelFor('mockup-designer')).toBe(MODEL_IDS.opus) // full prod model
  })

  it('PIPELINE_TIER=prod forces prod models even with no API key', () => {
    setEnv({ PIPELINE_TIER: 'prod' })
    expect(modelFor('mockup-designer')).toBe(MODEL_IDS.opus)
  })

  it('PIPELINE_TIER=dev forces dev cap even with an API key', () => {
    setEnv({ PIPELINE_TIER: 'dev', ANTHROPIC_API_KEY: 'sk-ant-test' })
    expect(modelFor('mockup-designer')).toBe(MODEL_IDS.sonnet)
  })

  it('caps the art director (opus in prod) to sonnet in dev', () => {
    setEnv({})
    expect(modelFor('art-director')).toBe(MODEL_IDS.sonnet)
    setEnv({ PIPELINE_TIER: 'prod' })
    expect(modelFor('art-director')).toBe(MODEL_IDS.opus)
  })

  it('leaves models already at or below the dev ceiling unchanged', () => {
    setEnv({}) // dev tier
    expect(modelFor('spec-critic')).toBe(MODEL_IDS.haiku) // haiku stays haiku
    expect(modelFor('react-engineer')).toBe(MODEL_IDS.sonnet)
    expect(modelFor('mockup-critic')).toBe(MODEL_IDS.sonnet)
    expect(modelFor('screenshot-critic')).toBe(MODEL_IDS.sonnet)
  })

  it('falls back to sonnet for an unknown agent', () => {
    setEnv({ PIPELINE_TIER: 'prod' })
    expect(modelFor('who-dis')).toBe(MODEL_IDS.sonnet)
  })

  it('resolves every tier to an explicit model ID, never a bare alias', () => {
    setEnv({ PIPELINE_TIER: 'prod' })
    for (const agent of Object.keys(PROD_MODELS)) {
      expect(modelFor(agent)).toMatch(/^claude-/)
    }
  })

  it('exposes the prod model map for reference', () => {
    expect(PROD_MODELS['mockup-designer']).toBe('opus')
    expect(PROD_MODELS['art-director']).toBe('opus')
  })
})
