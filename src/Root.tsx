import App from "./App"
import { projectBySlug } from "./data/projects"
import { useBackgroundAudio } from "./hooks/useBackgroundAudio"
import { useRoute } from "./hooks/useRoute"
import { WaitlistPage } from "./pages/WaitlistPage"

/**
 * Owns the audio so it survives navigation — it sits above the route switch
 * rather than inside any one page.
 */
export function Root() {
  const path = useRoute()
  const audio = useBackgroundAudio("/audio/cavalleria-intermezzo.mp3")

  // Project pages are derived from the project data, so adding a `page` entry
  // is all it takes to create one.
  const project = projectBySlug(path.replace(/^\//, ""))
  if (project) return <WaitlistPage project={project} />

  return <App audio={audio} />
}
