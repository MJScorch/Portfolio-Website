import { useState } from "react"
import { GitHubIcon } from "../components/shared/icons"
import { useEmail } from "../hooks/useEmail"
import type { ProjectEntry } from "../types"

type SubmitState = "idle" | "sending" | "done" | "invalid" | "limited" | "error"

/** One page shape for every project waitlist — driven entirely by project data. */
export function WaitlistPage({ project }: { project: ProjectEntry }) {
  const page = project.page!
  const [email, setEmail] = useState("")
  // Honeypot. Hidden from people, so anything in it means a bot.
  const [company, setCompany] = useState("")
  const [state, setState] = useState<SubmitState>("idle")
  const { email: ownerEmail, mailto } = useEmail()

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (state === "sending") return
    setState("sending")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email, company, project: page.slug }).toString(),
      })
      if (res.ok) return setState("done")
      const { error } = await res.json().catch(() => ({ error: "error" }))
      setState(error === "rate_limited" ? "limited" : error === "invalid_email" ? "invalid" : "error")
    } catch {
      setState("error")
    }
  }

  const finished = state === "done"

  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col justify-center px-6 py-24 sm:px-8">
      <a href="/" className="mb-16 text-[13px] text-text-muted transition-colors hover:text-text">
        ← Matthew Scorziello
      </a>

      <h1 className="mb-6 text-[clamp(40px,8vw,72px)] leading-[1.05] font-medium tracking-[-0.02em] text-text">
        {project.name}
      </h1>
      <p className="mb-4 max-w-[42ch] text-xl text-text-dim">{page.tagline}</p>
      <p className="mb-10 max-w-[52ch] text-text-dim">{page.description}</p>

      <form onSubmit={submit} className="mb-8 flex flex-col gap-3">
        {/* Honeypot — hidden from people and from screen readers. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="absolute h-0 w-0 opacity-0"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={state === "sending" || finished}
            className="w-full border border-line bg-transparent px-4 py-3 text-text placeholder:text-text-muted focus:border-text focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state === "sending" || finished}
            className="shrink-0 border border-text px-6 py-3 text-text transition-colors hover:bg-text hover:text-bg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text"
          >
            {finished ? "You're on the list" : state === "sending" ? "Joining…" : "Join waitlist"}
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.5em] text-[13px] text-text-muted">
          {finished && "Thanks — I'll let you know when it's ready."}
          {state === "invalid" && "That doesn't look like an email address."}
          {state === "limited" && "That's a few too many tries — give it a few minutes."}
          {state === "error" && (
            <>
              Couldn&rsquo;t save that. Email me at{" "}
              <a href={mailto} className="underline transition-colors hover:text-text">
                {ownerEmail}
              </a>{" "}
              and I&rsquo;ll add you manually.
            </>
          )}
        </p>
      </form>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener"
          className="flex w-fit items-center gap-2 text-[15px] text-text-dim transition-colors hover:text-text"
        >
          <GitHubIcon className="h-4 w-4" />
          Repository
        </a>
      )}
    </main>
  )
}
