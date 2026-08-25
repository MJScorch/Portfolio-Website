import { useState } from "react"
import { GitHubIcon } from "../components/shared/icons"

const REPO_URL = "https://github.com/MJScorch/Marlin-Fish-ID"
const FORM_NAME = "marlin-waitlist"

export function Marlin() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setState("sending")
    try {
      // Netlify Forms accepts a urlencoded POST to any path on the site.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": FORM_NAME, email }).toString(),
      })
      setState(res.ok ? "done" : "error")
    } catch {
      setState("error")
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col justify-center px-6 py-24 sm:px-8">
      <a href="/" className="mb-16 text-[13px] text-text-muted transition-colors hover:text-text">
        ← Matthew Scorziello
      </a>

      <h1 className="mb-6 text-[clamp(40px,8vw,72px)] leading-[1.05] font-medium tracking-[-0.02em] text-text">
        Marlin
      </h1>
      <p className="mb-4 max-w-[42ch] text-xl text-text-dim">Know your catch.</p>
      <p className="mb-10 max-w-[52ch] text-text-dim">
        Fish identification for Ontario anglers — point your camera at a catch and get the species back in seconds,
        along with the regulations that apply to it.
      </p>

      <form onSubmit={submit} name={FORM_NAME} data-netlify="true" className="mb-8 flex flex-col gap-3">
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={state === "sending" || state === "done"}
            className="w-full border border-line bg-transparent px-4 py-3 text-text placeholder:text-text-muted focus:border-text focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state === "sending" || state === "done"}
            className="shrink-0 border border-text px-6 py-3 text-text transition-colors hover:bg-text hover:text-bg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-text"
          >
            {state === "done" ? "You're on the list" : state === "sending" ? "Joining…" : "Join waitlist"}
          </button>
        </div>
        <p aria-live="polite" className="min-h-[1.5em] text-[13px] text-text-muted">
          {state === "done" && "Thanks — I'll let you know when it's ready."}
          {state === "error" && "Something went wrong. Try again, or email me directly."}
        </p>
      </form>

      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener"
        className="flex w-fit items-center gap-2 text-[15px] text-text-dim transition-colors hover:text-text"
      >
        <GitHubIcon className="h-4 w-4" />
        Repository
      </a>
    </main>
  )
}
