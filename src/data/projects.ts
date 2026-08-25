import type { ProjectEntry } from "../types"

/**
 * Order is deliberate — most substantial first.
 * `stack` and `summary` are placeholders to be filled in as each project firms up.
 */
export const projects: ProjectEntry[] = [
  {
    name: "Letterboxd Recommendation Engine",
    stack: "Python / scikit-learn / NLP embeddings",
    summary:
      "Work in progress — movie recommendation engine built on Letterboxd exports plus AI analysis of written critiques.",
    githubUrl: "https://github.com/MJScorch/Letterboxd-Recommendation-Engine",
  },
  {
    name: "Marlin — Fish ID",
    stack: "React Native / Expo / PyTorch",
    summary:
      "Work in progress — fish identification for Ontario anglers, using a fine-tuned image classifier to name a catch from a photo.",
    githubUrl: "https://github.com/MJScorch/Marlin-Fish-ID",
    pageUrl: "/marlin",
  },
  {
    name: "Habit Tracker",
    stack: "JavaScript / Scriptable / iOS",
    summary: "Work in progress — a habit tracker that lives on the iOS home screen as a widget.",
    githubUrl: "https://github.com/MJScorch/ios_habit_tracker",
  },
]
