import { useMemo } from "react"

/** Assembled in JS (not in markup) so plain-text scrapers don't pick it up, same approach as the old site. */
export function useEmail() {
  return useMemo(() => {
    const user = atob("c2NvcnppZWxsby5tYXR0aGV3")
    const domain = atob("Z21haWwuY29t")
    const email = `${user}@${domain}`
    return { email, mailto: `mailto:${email}` }
  }, [])
}
