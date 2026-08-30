/**
 * Test-run setup.
 *
 * The suite prints a few dozen lines of production logging on every run —
 * `[mockup-critic] calling Anthropic SDK…`, archiver progress, validator
 * output — none of it assertions, all of it between the reporter and the
 * result you are looking for. Nothing spies on console, so silencing it costs
 * nothing and a failing test still shows its own error.
 *
 * VITEST_VERBOSE=1 puts it back when a test is being debugged.
 */
import { vi } from 'vitest'

if (!process.env.VITEST_VERBOSE) {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  // console.error is left alone: an unexpected one is usually the reason a
  // test is failing.
}
