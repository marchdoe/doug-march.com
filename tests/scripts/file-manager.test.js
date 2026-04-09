import { describe, it, expect, afterEach } from 'vitest'
import { writeFiles, validateWritePath, ROOT } from '../../scripts/utils/file-manager.js'
import { existsSync, rmSync, readFileSync } from 'fs'
import path from 'path'

describe('validateWritePath', () => {
  describe('allowlist — permits legitimate writes', () => {
    it('allows app/components/ paths', () => {
      expect(validateWritePath('app/components/Foo.tsx')).toBe('app/components/Foo.tsx')
    })

    it('allows app/routes/ paths', () => {
      expect(validateWritePath('app/routes/index.tsx')).toBe('app/routes/index.tsx')
    })

    it('allows elements/preset.ts', () => {
      expect(validateWritePath('elements/preset.ts')).toBe('elements/preset.ts')
    })

    it('allows app/stubs/ paths', () => {
      expect(validateWritePath('app/stubs/foo.ts')).toBe('app/stubs/foo.ts')
    })

    it('normalizes ./ prefix', () => {
      expect(validateWritePath('./app/components/Foo.tsx')).toBe('app/components/Foo.tsx')
    })

    it('normalizes duplicate slashes', () => {
      expect(validateWritePath('app//components//Foo.tsx')).toBe('app/components/Foo.tsx')
    })
  })

  describe('path traversal — rejects escapes', () => {
    it('rejects ../ traversal', () => {
      expect(() => validateWritePath('../evil.txt')).toThrow(/traversal|not in write allowlist/)
    })

    it('rejects nested ../ escape', () => {
      expect(() => validateWritePath('app/components/../../../../etc/passwd')).toThrow(
        /traversal|allowlist/
      )
    })

    it('rejects absolute paths', () => {
      expect(() => validateWritePath('/etc/passwd')).toThrow()
    })

    it('rejects lateral escape into protected dir via ..', () => {
      // app/components/../content/projects.ts normalizes to app/content/projects.ts
      expect(() => validateWritePath('app/components/../content/projects.ts')).toThrow(
        /Forbidden/
      )
    })
  })

  describe('forbidden paths — rejects sensitive locations', () => {
    it('rejects .env', () => {
      expect(() => validateWritePath('.env')).toThrow(/Dotfile/)
    })

    it('rejects .github/ workflows', () => {
      expect(() => validateWritePath('.github/workflows/evil.yml')).toThrow(/Dotfile/)
    })

    it('rejects .npmrc', () => {
      expect(() => validateWritePath('.npmrc')).toThrow(/Dotfile/)
    })

    it('rejects .gitignore', () => {
      expect(() => validateWritePath('.gitignore')).toThrow(/Dotfile/)
    })

    it('rejects package.json', () => {
      expect(() => validateWritePath('package.json')).toThrow(/not in write allowlist/)
    })

    it('rejects pnpm-lock.yaml', () => {
      expect(() => validateWritePath('pnpm-lock.yaml')).toThrow(/not in write allowlist/)
    })

    it('rejects vite.config.ts', () => {
      expect(() => validateWritePath('vite.config.ts')).toThrow(/not in write allowlist/)
    })

    it('rejects vercel.json', () => {
      expect(() => validateWritePath('vercel.json')).toThrow(/not in write allowlist/)
    })

    it('rejects scripts/ directory', () => {
      expect(() => validateWritePath('scripts/daily-redesign.js')).toThrow(/not in write allowlist/)
    })

    it('rejects app/content/ files', () => {
      expect(() => validateWritePath('app/content/projects.ts')).toThrow(/Forbidden/)
    })

    it('rejects app/server/ files', () => {
      expect(() => validateWritePath('app/server/signals.ts')).toThrow(/Forbidden/)
    })

    it('rejects app/styles/ files', () => {
      expect(() => validateWritePath('app/styles/panda.css')).toThrow(/Forbidden/)
    })

    it('rejects app/routeTree.gen.ts', () => {
      expect(() => validateWritePath('app/routeTree.gen.ts')).toThrow(/Forbidden/)
    })

    it('rejects node_modules', () => {
      expect(() => validateWritePath('node_modules/react/index.js')).toThrow(/not in write allowlist/)
    })
  })

  describe('invalid inputs', () => {
    it('rejects empty string', () => {
      expect(() => validateWritePath('')).toThrow(/Invalid/)
    })

    it('rejects null', () => {
      expect(() => validateWritePath(null)).toThrow(/Invalid/)
    })

    it('rejects undefined', () => {
      expect(() => validateWritePath(undefined)).toThrow(/Invalid/)
    })

    it('rejects non-string input', () => {
      expect(() => validateWritePath(42)).toThrow(/Invalid/)
    })
  })
})

describe('file-manager writeFiles', () => {
  const testFile = 'app/components/__test_write.tsx'
  const testAbsPath = path.join(ROOT, testFile)

  afterEach(() => {
    if (existsSync(testAbsPath)) rmSync(testAbsPath)
  })

  it('writes allowed files and returns normalized paths', async () => {
    const written = await writeFiles([{ path: testFile, content: 'hello' }])
    expect(existsSync(testAbsPath)).toBe(true)
    expect(readFileSync(testAbsPath, 'utf8')).toBe('hello')
    expect(written).toEqual([testFile])
  })

  it('normalizes paths on write', async () => {
    const written = await writeFiles([{ path: './app/components/__test_write.tsx', content: 'x' }])
    expect(written).toEqual(['app/components/__test_write.tsx'])
  })

  it('throws on disallowed paths', async () => {
    await expect(
      writeFiles([{ path: 'package.json', content: '{}' }])
    ).rejects.toThrow()
  })

  it('throws on traversal attempts', async () => {
    await expect(
      writeFiles([{ path: '../../../etc/passwd', content: 'bad' }])
    ).rejects.toThrow()
  })

  it('throws on .env writes', async () => {
    await expect(
      writeFiles([{ path: '.env', content: 'STOLEN=1' }])
    ).rejects.toThrow(/Dotfile/)
  })
})
