import { useEffect, useState } from "react"

/** Tracks document.visibilityState so the hero rotation and background audio can pause together when the tab loses focus. */
export function usePageVisibility(): boolean {
  const [visible, setVisible] = useState(() => document.visibilityState === "visible")

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [])

  return visible
}
