export interface ProjectEntry {
  number: string
  status: "Live" | "In Progress" | "Planned"
  name: string
  description: string
  tags: string[]
  githubUrl?: string
  linkLabel?: string
}
