// Reads back the waitlist. Netlify Blobs has no dashboard UI, so without this
// there is no way to see who signed up short of the Netlify CLI.
//
// Deliberately small: this list is expected to be tiny, so it just returns
// everything as JSON rather than paginating.

import { store } from "../lib/store.mjs"

export default async (request) => {
  const expected = process.env.WAITLIST_TOKEN

  // Fail closed. With no token configured the endpoint does not exist, so a
  // missing env var can never accidentally expose the list.
  if (!expected) return new Response("Not found", { status: 404 })

  const provided = new URL(request.url).searchParams.get("token") ?? ""
  if (provided !== expected) return new Response("Not found", { status: 404 })

  try {
    const signups_ = store("waitlist")
    const { blobs } = await signups_.list()

    const signups = await Promise.all(
      blobs.map(async ({ key }) => {
        const entry = await signups_.get(key, { type: "json" }).catch(() => null)
        return entry ?? { key }
      }),
    )

    signups.sort((a, b) => String(a.at).localeCompare(String(b.at)))

    return new Response(JSON.stringify({ count: signups.length, signups }, null, 2), {
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    })
  } catch (error) {
    console.error("waitlist-export error", error)
    return new Response(JSON.stringify({ error: "storage_unavailable" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}

export const config = { path: "/api/waitlist-export" }
