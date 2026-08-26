/** A project that has its own page with a waitlist. */
export interface ProjectPage {
  /** URL segment and the key signups are stored under. */
  slug: string
  tagline: string
  description: string
}

export interface ProjectEntry {
  name: string
  /** Tech line, e.g. "React Native / Expo / Supabase". */
  stack: string
  /** One-line description of what the project is. */
  summary: string
  githubUrl?: string
  page?: ProjectPage
}

export interface RecentFilm {
  title: string
  year?: string
  rating?: number
  /** Whether the review carries a Letterboxd heart. */
  liked?: boolean
  posterUrl?: string
  url: string
}
