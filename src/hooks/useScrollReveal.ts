import { useEffect, useRef, useState } from "react"

/** Fades an element in the first time it scrolls into view, ported from the old site's IntersectionObserver reveal. */
export function useScrollReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible, style: { transitionDelay: `${(index % 4) * 0.075}s` } }
}
