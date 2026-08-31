import { describe, it, expect, afterEach } from 'vitest'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { isMain } from '../../scripts/utils/cli.js'

const original = process.argv[1]
afterEach(() => {
  process.argv[1] = original
})

describe('isMain', () => {
  it('is true when argv[1] is this module', () => {
    process.argv[1] = fileURLToPath(import.meta.url)
    expect(isMain(import.meta.url)).toBe(true)
  })

  it('is false for any other entry', () => {
    process.argv[1] = '/somewhere/else.js'
    expect(isMain(import.meta.url)).toBe(false)
  })

  it('does not match on basename alone', () => {
    // Two of the old idioms used argv[1]?.endsWith('<name>.js').
    process.argv[1] = `/another/dir/${fileURLToPath(import.meta.url)
      .split('/')
      .pop()}`
    expect(isMain(import.meta.url)).toBe(false)
  })

  it('matches a path with a space in it', () => {
    // collect-ratings compared against URL.pathname, which is percent-encoded,
    // so a checkout under "My Projects/" never ran its CLI branch.
    const spaced = '/tmp/My Projects/repo/scripts/x.js'
    process.argv[1] = spaced
    expect(isMain(pathToFileURL(spaced).href)).toBe(true)
  })

  it('is false when there is no argv[1] at all', () => {
    process.argv[1] = undefined
    expect(isMain(import.meta.url)).toBe(false)
  })
})
