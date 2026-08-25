export interface ProjectEntry {
  name: string
  /** Tech line, e.g. "React Native / Expo / Supabase". */
  stack: string
  /** One-line description of what the project is. */
  summary: string
  githubUrl?: string
  /** Dedicated on-site page, when the project has one. */
  pageUrl?: string
}

export interface RecentFilm {
  title: string
  year?: string
  rating?: number
  posterUrl?: string
  url: string
}
