import App from "./App"
import { useBackgroundAudio } from "./hooks/useBackgroundAudio"
import { useRoute } from "./hooks/useRoute"
import { Marlin } from "./pages/Marlin"

/**
 * Owns the audio so it survives navigation — it sits above the route switch
 * rather than inside any one page.
 */
export function Root() {
  const path = useRoute()
  const audio = useBackgroundAudio("/audio/cavalleria-intermezzo.mp3")

  return path === "/marlin" ? <Marlin /> : <App audio={audio} />
}
