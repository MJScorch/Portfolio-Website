// Waitlist signup endpoint. Owns its own storage rather than relying on
// Netlify's form detection, which is silent when it fails.
//
// Defensive throughout: this is a public, unauthenticated endpoint, so it
// assumes every request is hostile until proven otherwise.

import { store } from "../lib/store.mjs"

/** Reject bodies larger than this outright — a signup is a few hundred bytes. */
const MAX_BODY_BYTES = 2_000
/** Longest legal email address per RFC 5321. */
const MAX_EMAIL_LENGTH = 254
/** Per-IP cap, and the window it applies over. */
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

// Deliberately conservative, and an allowlist rather than a blocklist: the
// local part may only contain characters actually used in practice. A negated
// class looks equivalent but silently admits emoji and other non-ASCII, which
// is exactly the kind of input that should never reach storage.
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9-]+)+$/

/** Allowlist rather than accepting whatever slug is posted. */
const PROJECTS = new Set(["marlin", "applausi"])

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  })

export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "method_not_allowed" })

  // Reject oversized payloads before reading them into memory.
  const declared = Number(request.headers.get("content-length") ?? 0)
  if (declared > MAX_BODY_BYTES) return json(413, { error: "too_large" })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "too_large" })

  let fields
  try {
    fields = new URLSearchParams(raw)
  } catch {
    return json(400, { error: "malformed" })
  }

  // Honeypot: a real person never fills a hidden field. Return success so a
  // bot cannot distinguish a rejection from an acceptance.
  if ((fields.get("company") ?? "").trim() !== "") return json(200, { ok: true })

  const email = (fields.get("email") ?? "").trim().toLowerCase()
  if (!email) return json(400, { error: "missing_email" })
  if (email.length > MAX_EMAIL_LENGTH) return json(400, { error: "invalid_email" })
  // Guards against emoji, control characters and other non-ASCII payloads.
  if (!EMAIL_PATTERN.test(email)) return json(400, { error: "invalid_email" })

  const project = (fields.get("project") ?? "").trim().toLowerCase()
  if (!PROJECTS.has(project)) return json(400, { error: "unknown_project" })

  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    null

  try {
    // Only rate limit when the caller is actually identifiable. Bucketing
    // every unidentified request together would let one client lock out
    // everyone else — a worse failure than not limiting. Netlify always
    // supplies the client IP header in production.
    if (ip) {
      const limits = store("waitlist-rate")
      const now = Date.now()
      const seen = await limits.get(`ip:${ip}`, { type: "json" }).catch(() => null)

      if (seen && now - seen.start < RATE_WINDOW_MS) {
        if (seen.count >= RATE_LIMIT) return json(429, { error: "rate_limited" })
        await limits.setJSON(`ip:${ip}`, { start: seen.start, count: seen.count + 1 })
      } else {
        await limits.setJSON(`ip:${ip}`, { start: now, count: 1 })
      }
    }

    const signups = store("waitlist")
    // Keyed by project + email, so signing up twice updates rather than duplicates.
    const key = `${project}:${email}`
    const existing = await signups.get(key, { type: "json" }).catch(() => null)
    if (!existing) {
      await signups.setJSON(key, { email, project, at: new Date().toISOString() })
    }

    return json(200, { ok: true })
  } catch (error) {
    console.error("waitlist error", error)
    return json(500, { error: "storage_unavailable" })
  }
}

export const config = { path: "/api/waitlist" }
