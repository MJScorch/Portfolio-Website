import { getStore } from "@netlify/blobs"

/**
 * In-memory stand-in used only outside the Netlify runtime, where Blobs has no
 * backend. It exists so the endpoints can be exercised with `npm run dev`;
 * deployed builds always get the real store.
 *
 * Lives outside `netlify/functions` so Netlify doesn't treat it as a function.
 */
const memory = new Map()

function fallbackStore(name) {
  const prefix = `${name}:`
  return {
    get: async (key) => memory.get(prefix + key) ?? null,
    setJSON: async (key, value) => void memory.set(prefix + key, value),
    list: async () => ({
      blobs: [...memory.keys()].filter((k) => k.startsWith(prefix)).map((k) => ({ key: k.slice(prefix.length) })),
    }),
  }
}

export function store(name) {
  try {
    return getStore(name)
  } catch {
    return fallbackStore(name)
  }
}
