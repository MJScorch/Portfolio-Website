import { useEffect, useRef } from "react"
import { usePageVisibility } from "./usePageVisibility"

/**
 * Plays `src` on loop, then pauses/resumes with tab visibility so nothing
 * plays uselessly in the background.
 *
 * Playback is attempted immediately on load. Browsers block unmuted autoplay
 * until a site has earned enough engagement, so that attempt is expected to
 * be rejected for most first-time visitors — when it is, we fall back to
 * starting on the first interaction. Returning visitors, and anyone who has
 * allowed audio for the site, get it straight away.
 */
export function useBackgroundAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)
  const visible = usePageVisibility()

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = "auto"
    audioRef.current = audio

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      audio.play().catch(() => {
        startedRef.current = false
      })
    }

    // Try straight away; falls through to the listeners below if blocked.
    start()

    window.addEventListener("pointerdown", start)
    window.addEventListener("keydown", start)

    return () => {
      window.removeEventListener("pointerdown", start)
      window.removeEventListener("keydown", start)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !startedRef.current) return
    if (visible) audio.play().catch(() => {})
    else audio.pause()
  }, [visible])
}
