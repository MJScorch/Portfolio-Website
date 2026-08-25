import App from "./App"
import { useBackgroundAudio } from "./hooks/useBackgroundAudio"
import { useRoute } from "./hooks/useRoute"
import { Marlin } from "./pages/Marlin"

/**
 * Owns the audio so it keeps playing across page changes — it lives above the
 * routing switch rather than inside any one page.
 */
export function Root() {
  const path = useRoute()
  useBackgroundAudio("/audio/cavalleria-intermezzo.mp3")

  return path === "/marlin" ? <Marlin /> : <App />
}
