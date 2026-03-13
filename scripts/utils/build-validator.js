import { spawnSync } from 'child_process'
import { ROOT } from './file-manager.js'

/**
 * Run `pnpm build` in the repo root.
 * Returns { success: true } on success.
 * Returns { success: false, error: string } on failure.
 * The error string contains the last 3000 chars of combined stderr+stdout.
 *
 * @returns {{ success: boolean, error?: string }}
 */
export function validateBuild() {
  console.log('  running pnpm build...')

  const result = spawnSync('pnpm', ['build'], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 120000, // 2 minute timeout
  })

  if (result.status === 0) {
    console.log('  build succeeded')
    return { success: true }
  }

  const combined = (result.stderr ?? '') + (result.stdout ?? '')
  const error = combined.slice(-3000) // last 3000 chars

  console.log('  build failed')
  console.log('  --- last 500 chars of build output ---')
  console.log(combined.slice(-500))
  console.log('  ---')

  return { success: false, error }
}
