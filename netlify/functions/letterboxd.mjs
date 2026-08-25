// Letterboxd's RSS feed sends no CORS headers, so the browser cannot fetch it
// directly. This proxies it, parses out just the fields the shelf needs, and
// caches at the edge so we are not hammering their feed on every page view.

const FEED = "https://letterboxd.com/MJScorch/rss/"
const LIMIT = 8

const pick = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return m ? m[1].trim() : undefined
}

export default async () => {
  try {
    const res = await fetch(FEED, { headers: { "User-Agent": "scorziello.dev shelf" } })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const xml = await res.text()

    const films = []
    for (const block of xml.split("<item>").slice(1)) {
      const title = pick(block, "letterboxd:filmTitle")
      // Entries without a film title are list/story posts, not watches.
      if (!title) continue

      const rating = pick(block, "letterboxd:memberRating")
      const poster = block.match(/<img src="([^"]+)"/)?.[1]

      films.push({
        title,
        year: pick(block, "letterboxd:filmYear"),
        rating: rating ? Number(rating) : undefined,
        posterUrl: poster,
        url: pick(block, "link"),
      })
      if (films.length >= LIMIT) break
    }

    return new Response(JSON.stringify({ films }), {
      headers: {
        "content-type": "application/json",
        // Serve stale while revalidating so a slow upstream never blocks a visitor.
        "cache-control": "public, max-age=1800, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ films: [], error: String(error) }), {
      status: 200, // The shelf degrades to hidden; this is not a page error.
      headers: { "content-type": "application/json", "cache-control": "public, max-age=60" },
    })
  }
}

export const config = { path: "/api/letterboxd" }
