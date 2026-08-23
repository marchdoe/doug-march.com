import { describe, it, expect, afterEach } from 'vitest'
import { assertDevOnly } from '../../app/server/dev-only'

const originalEnv = process.env.NODE_ENV

describe('assertDevOnly', () => {
  afterEach(() => {
    process.env.NODE_ENV = originalEnv
  })

  it('throws in production', () => {
    process.env.NODE_ENV = 'production'
    expect(() => assertDevOnly()).toThrow(/only available in development/)
  })

  it('passes in development', () => {
    process.env.NODE_ENV = 'development'
    expect(() => assertDevOnly()).not.toThrow()
  })

  it('passes in test', () => {
    process.env.NODE_ENV = 'test'
    expect(() => assertDevOnly()).not.toThrow()
  })
})
