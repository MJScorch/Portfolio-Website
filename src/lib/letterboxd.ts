import { useEffect, useState } from "react"
import type { RecentFilm } from "../types"

/**
 * Recently-watched films from Letterboxd, via the Netlify function proxy.
 * Failure is silent by design — the shelf simply doesn't render rather than
 * showing an error on an otherwise clean page.
 */
export function useRecentFilms() {
  const [films, setFilms] = useState<RecentFilm[]>([])

  useEffect(() => {
    let cancelled = false
    fetch("/api/letterboxd")
      .then((res) => (res.ok ? res.json() : { films: [] }))
      .then((data) => {
        if (!cancelled && Array.isArray(data.films)) setFilms(data.films)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return films
}
