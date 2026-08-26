import type { ProjectEntry } from "../types"

/**
 * Order is deliberate — most substantial first. A `page` entry gives the
 * project its own route and waitlist; `slug` doubles as the storage key for
 * that project's signups, so changing it orphans existing ones.
 */
export const projects: ProjectEntry[] = [
  {
    name: "Applausi",
    stack: "Python / scikit-learn / NLP embeddings",
    summary:
      "Work in progress — movie recommendation engine built on Letterboxd exports plus AI analysis of written critiques.",
    githubUrl: "https://github.com/MJScorch/Letterboxd-Recommendation-Engine",
    page: {
      slug: "applausi",
      tagline: "Taste, understood.",
      description:
        "A recommender built from your own Letterboxd history — not just what you rated highly, but what you actually wrote about it. Reads your reviews to work out why a film landed, then finds the next one.",
    },
  },
  {
    name: "Marlin Fish ID",
    stack: "React Native / Expo / PyTorch",
    summary:
      "Work in progress — fish identification for Ontario anglers, using a fine-tuned image classifier to name a catch from a photo.",
    githubUrl: "https://github.com/MJScorch/Marlin-Fish-ID",
    page: {
      slug: "marlin",
      tagline: "Know your catch.",
      description:
        "Fish identification for Ontario anglers — point your camera at a catch and get the species back in seconds, along with the regulations that apply to it.",
    },
  },
  {
    name: "Diem",
    stack: "JavaScript / Scriptable / iOS",
    summary: "Work in progress — a habit tracker that lives on the iOS home screen as a widget.",
    githubUrl: "https://github.com/MJScorch/ios_habit_tracker",
  },
]

export const projectBySlug = (slug: string) => projects.find((project) => project.page?.slug === slug)
