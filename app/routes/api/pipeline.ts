import { createAPIFileRoute } from '@tanstack/start-api-routes'
import { spawn } from 'child_process'
import { resolve } from 'path'

const SCRIPT_PATH = resolve(process.cwd(), 'scripts/daily-redesign.js')
const encoder = new TextEncoder()

function sseEvent(data: object): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
}

export const APIRoute = createAPIFileRoute('/api/pipeline')({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const dryRun = url.searchParams.get('dryRun') === 'true'

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response('ANTHROPIC_API_KEY not set', { status: 500 })
    }

    const stream = new ReadableStream({
      start(controller) {
        const child = spawn('node', [SCRIPT_PATH], {
          env: { ...process.env, DRY_RUN: dryRun ? 'true' : 'false' },
          cwd: process.cwd(),
        })

        const handleData = (chunk: Buffer) => {
          const lines = chunk.toString().split('\n').filter(l => l.trim())
          for (const line of lines) {
            controller.enqueue(sseEvent({ type: 'log', line }))
          }
        }

        child.stdout.on('data', handleData)
        child.stderr.on('data', handleData)

        child.on('close', (code) => {
          if (code === 0) {
            controller.enqueue(sseEvent({ type: 'done', success: true }))
          } else {
            controller.enqueue(sseEvent({ type: 'done', success: false, error: `Process exited with code ${code}` }))
          }
          controller.close()
        })

        child.on('error', (err) => {
          controller.enqueue(sseEvent({ type: 'done', success: false, error: err.message }))
          controller.close()
        })
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  },
})
