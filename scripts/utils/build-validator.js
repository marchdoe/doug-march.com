import { spawnSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { ROOT } from './file-manager.js'

/**
 * Pre-build validation: check for known bad patterns in generated code.
 * Catches issues that `pnpm build` misses but break SSR at runtime.
 *
 * @returns {{ success: boolean, error?: string }}
 */
export function validateGenerated() {
  const errors = []

  // Check 1: Circular token references in preset.ts
  // e.g., fonts.heading: '{fonts.heading}' creates an infinite loop in PandaCSS
  try {
    const presetPath = resolve(ROOT, 'elements/preset.ts')
    const preset = readFileSync(presetPath, 'utf8')

    const semanticStart = preset.indexOf('semanticTokens')
    if (semanticStart > -1) {
      const semanticSection = preset.slice(semanticStart)

      // Check for self-referencing tokens: '{tokenCategory.tokenName}' where the
      // surrounding context is defining that same tokenCategory.tokenName
      // This catches: fonts: { heading: { value: '{fonts.heading}' } }
      const selfRefPatterns = [
        { category: 'fonts', pattern: /'\{fonts\.(\w+)\}'/g },
        { category: 'fontSizes', pattern: /'\{fontSizes\.(\w+)\}'/g },
        { category: 'fontWeights', pattern: /'\{fontWeights\.(\w+)\}'/g },
        { category: 'lineHeights', pattern: /'\{lineHeights\.(\w+)\}'/g },
        { category: 'letterSpacings', pattern: /'\{letterSpacings\.(\w+)\}'/g },
      ]

      for (const { category, pattern } of selfRefPatterns) {
        // Find if this category appears in semantic tokens
        const catRegex = new RegExp(`${category}\\s*:\\s*\\{`, 'g')
        let catMatch
        while ((catMatch = catRegex.exec(semanticSection)) !== null) {
          // Get the block content (rough — find matching brace)
          const blockStart = catMatch.index
          let depth = 0
          let blockEnd = blockStart
          for (let i = catMatch.index + catMatch[0].length - 1; i < semanticSection.length; i++) {
            if (semanticSection[i] === '{') depth++
            if (semanticSection[i] === '}') depth--
            if (depth === 0) { blockEnd = i; break }
          }
          const block = semanticSection.slice(blockStart, blockEnd + 1)

          // Check for self-references within this block
          let refMatch
          const localPattern = new RegExp(`'\\{${category}\\.(\\w+)\\}'`, 'g')
          while ((refMatch = localPattern.exec(block)) !== null) {
            const tokenName = refMatch[1]
            // Check if this token name appears as a key in this block
            if (block.match(new RegExp(`${tokenName}\\s*:`))) {
              errors.push(`Circular token: semanticTokens.${category}.${tokenName} references '{${category}.${tokenName}}' (self-reference breaks PandaCSS)`)
            }
          }
        }
      }
    }
  } catch (err) {
    // If we can't read preset.ts, that's a bigger problem — build will catch it
  }

  // Check 2: Non-type imports of React types in component files
  // e.g., import { ReactNode } from 'react' breaks SSR — must be import type { ReactNode }
  const componentFiles = [
    'app/components/Layout.tsx',
    'app/components/Sidebar.tsx',
    'app/components/FeaturedProject.tsx',
    'app/components/ProjectRow.tsx',
    'app/components/SectionHead.tsx',
    'app/components/SelectedWork.tsx',
    'app/components/Experiments.tsx',
    'app/components/Bio.tsx',
    'app/components/Timeline.tsx',
    'app/components/Capabilities.tsx',
    'app/components/Personal.tsx',
  ]

  const reactTypes = ['ReactNode', 'ReactElement', 'FC', 'PropsWithChildren', 'CSSProperties', 'MouseEvent', 'ChangeEvent', 'FormEvent']

  for (const file of componentFiles) {
    try {
      const content = readFileSync(resolve(ROOT, file), 'utf8')
      // Match: import { ReactNode } from 'react' (NOT import type { ReactNode })
      const importMatch = content.match(/^import\s+\{([^}]+)\}\s+from\s+['"]react['"]/m)
      if (importMatch) {
        const imports = importMatch[1].split(',').map(s => s.trim())
        const typeImports = imports.filter(i => reactTypes.includes(i))
        if (typeImports.length > 0) {
          errors.push(`${file}: import { ${typeImports.join(', ')} } from 'react' must use 'import type' — breaks SSR`)
        }
      }
    } catch {
      // File doesn't exist or can't be read — skip
    }
  }

  if (errors.length > 0) {
    const errorMsg = 'Pre-build validation failed:\n' + errors.map(e => `  - ${e}`).join('\n')
    console.log('  pre-build validation failed')
    for (const e of errors) console.log(`  ✗ ${e}`)
    return { success: false, error: errorMsg }
  }

  console.log('  pre-build validation passed')
  return { success: true }
}

/**
 * Run `pnpm build` in the repo root.
 * Returns { success: true } on success.
 * Returns { success: false, error: string } on failure.
 * The error string contains the last 3000 chars of combined stderr+stdout.
 *
 * @returns {{ success: boolean, error?: string }}
 */
export function validateBuild() {
  // Run pre-build checks first
  const preCheck = validateGenerated()
  if (!preCheck.success) {
    return preCheck
  }

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
