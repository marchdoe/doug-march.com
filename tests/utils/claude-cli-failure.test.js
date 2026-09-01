import { describe, expect, it } from 'vitest'
import { describeCliFailure } from '../../scripts/utils/claude-cli.js'

// #300: a `claude` process that exited non-zero mid-stream resolved as a
// successful partial response, and the result event's is_error / subtype
// were never read. This is the decision, pulled out so it can be tested
// without a child process.
describe('describeCliFailure', () => {
  const ok = { type: 'result', subtype: 'success', is_error: false, result: '===FILE:a===\nx' }

  it('accepts a success result event, whatever the exit code', () => {
    expect(describeCliFailure(0, ok, 'x', '')).toBeNull()
    expect(describeCliFailure(1, ok, 'x', 'noise on stderr')).toBeNull()
  })

  it('rejects a result event that says is_error', () => {
    const failure = describeCliFailure(0, { ...ok, is_error: true, result: 'Rate limited' }, '', '')
    expect(failure).toMatch(/claude reported success \(is_error\): Rate limited/)
  })

  it('rejects a non-success subtype such as error_max_turns', () => {
    const failure = describeCliFailure(
      0,
      { ...ok, subtype: 'error_max_turns', result: '' },
      'partial',
      'hit the turn limit'
    )
    expect(failure).toMatch(/claude reported error_max_turns: hit the turn limit/)
  })

  it('rejects a crash after partial streaming and says how much arrived', () => {
    const failure = describeCliFailure(1, null, 'x'.repeat(4096), 'segfault')
    expect(failure).toMatch(/exited with code 1 after 4KB of partial output: segfault/)
  })

  it('rejects a crash with nothing at all', () => {
    expect(describeCliFailure(1, null, '', 'fatal: bad auth')).toMatch(
      /exited with code 1: fatal: bad auth/
    )
    expect(describeCliFailure(null, null, '', '')).toMatch(/exited with code null/)
  })

  it('accepts a clean exit with streamed text and no result event', () => {
    expect(describeCliFailure(0, null, 'streamed text', '')).toBeNull()
  })
})
