import type { ProjectEntry } from "../types"

export const projects: ProjectEntry[] = [
  {
    number: "Project 01",
    status: "In Progress",
    name: "Letterboxd Recommendation Engine",
    description:
      "Personal movie recommender trained on Letterboxd export data. Combines NLP text embeddings of film descriptions with SVD over the user–film rating matrix. The goal is recommendations that feel personal, not just popular.",
    tags: ["NLP", "Embeddings", "SVD", "Matrix Factorization", "Claude-Assisted"],
    githubUrl: "https://github.com/MJScorch/Letterboxd-Recommendation-Engine",
  },
  {
    number: "Project 02",
    status: "Live",
    name: "Habit Tracker (iOS Scriptable)",
    description:
      "A habit tracking app built in JavaScript, running as a home screen widget on iOS via Scriptable. Just download Scriptable, copy habitTracker.js from my GitHub, and paste it in.",
    tags: ["JavaScript", "iOS", "Scriptable", "Claude-Assisted"],
    githubUrl: "https://github.com/MJScorch/ios_habit_tracker",
  },
  {
    number: "Project 03",
    status: "Planned",
    name: "Ontario Fish Identifier",
    description:
      "Based on the Merlin Bird ID app by Cornell Lab. Snap a picture on the water and get an answer in seconds.",
    tags: ["PyTorch", "CNNs", "Transfer Learning", "ResNet", "Image Classification", "Deep Learning"],
  },
]
