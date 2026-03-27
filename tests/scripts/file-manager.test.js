import { describe, it, expect, afterAll } from 'vitest'
import { writeFiles, ROOT } from '../../scripts/utils/file-manager.js'
import { existsSync, rmSync } from 'fs'
import path from 'path'

describe('file-manager writeFiles', () => {
  const testFile = '__test-write-guard__/test.txt'
  const testAbsPath = path.join(ROOT, testFile)

  afterAll(() => {
    // Clean up any test files
    const testDir = path.join(ROOT, '__test-write-guard__')
    if (existsSync(testDir)) rmSync(testDir, { recursive: true, force: true })
  })

  it('writes files within the project root', async () => {
    await writeFiles([{ path: testFile, content: 'hello' }])
    expect(existsSync(testAbsPath)).toBe(true)
  })

  it('blocks path traversal attempts', async () => {
    // These should be silently skipped, not written
    await writeFiles([
      { path: '../../.bashrc', content: 'malicious' },
      { path: '../../../etc/cron.d/backdoor', content: 'malicious' },
    ])

    // Verify nothing was written outside the root
    expect(existsSync(path.resolve(ROOT, '../../.bashrc'))).toBe(false)
  })

  it('throws on protected files', async () => {
    await expect(
      writeFiles([{ path: 'package.json', content: '{}' }])
    ).rejects.toThrow('protected file')

    await expect(
      writeFiles([{ path: 'app/content/projects.ts', content: 'bad' }])
    ).rejects.toThrow('protected file')
  })
})
