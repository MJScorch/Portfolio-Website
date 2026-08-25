import { useEffect, useState } from "react"

const normalise = (path: string) => path.replace(/\/+$/, "") || "/"

/**
 * Minimal client-side routing. Two pages doesn't warrant a router dependency,
 * but navigating without a full reload matters here: a reload would tear down
 * the audio element and re-trigger the browser's autoplay block.
 */
export function useRoute() {
  const [path, setPath] = useState(() => normalise(window.location.pathname))

  useEffect(() => {
    const onPop = () => setPath(normalise(window.location.pathname))
    window.addEventListener("popstate", onPop)

    // Intercept same-origin link clicks so they don't reload the document.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const anchor = (event.target as HTMLElement | null)?.closest?.("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return
      // Leave hash links, mail links and anything off-site alone.
      if (!href.startsWith("/") || href.startsWith("//")) return

      const next = normalise(href)
      event.preventDefault()
      if (next !== normalise(window.location.pathname)) {
        window.history.pushState({}, "", href)
        setPath(next)
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("popstate", onPop)
      document.removeEventListener("click", onClick)
    }
  }, [])

  return path
}
