import { useEffect, useState } from "react"

/** Tracks which section id is currently under the nav, ported from the old site's scroll-highlight logic. Pass a stable (module-level or memoized) `ids` array. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("")

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const onScroll = () => {
      let current = ""
      for (const section of sections) {
        if (window.scrollY >= section.offsetTop - 130) current = section.id
      }
      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [ids])

  return active
}
