import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Maps a request path to the function that serves it in production. */
const FUNCTIONS: Record<string, string> = {
  '/api/letterboxd': '/netlify/functions/letterboxd.mjs',
  '/api/waitlist': '/netlify/functions/waitlist.mjs',
}

/**
 * Runs the Netlify functions locally so `npm run dev` matches production.
 * Without this these routes only exist once deployed, which makes the
 * endpoints impossible to exercise while developing.
 */
function netlifyFunctionsDev(): Plugin {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0] ?? ''
        const modulePath = FUNCTIONS[path]
        if (!modulePath) return next()

        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const body = Buffer.concat(chunks)

        try {
          const { default: handler } = await server.ssrLoadModule(modulePath)
          const request = new Request('http://localhost' + req.url, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: body.length ? body : undefined,
          })
          const result = await handler(request)
          res.statusCode = result.status
          result.headers.forEach((value: string, key: string) => res.setHeader(key, value))
          res.end(await result.text())
        } catch (error) {
          res.statusCode = 500
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ error: String(error) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyFunctionsDev()],
})
