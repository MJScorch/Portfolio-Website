import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Runs the Netlify function locally so `npm run dev` behaves like production.
 * Without this, /api/letterboxd only exists once deployed.
 */
function netlifyFunctionsDev(): Plugin {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/letterboxd')) return next()
        try {
          const { default: handler } = await server.ssrLoadModule('/netlify/functions/letterboxd.mjs')
          const result = await handler(new Request('http://localhost' + req.url))
          res.statusCode = result.status
          result.headers.forEach((value: string, key: string) => res.setHeader(key, value))
          res.end(await result.text())
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ films: [], error: String(error) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyFunctionsDev()],
})
