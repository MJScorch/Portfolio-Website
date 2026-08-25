import { useEffect, useRef } from "react"
import { usePageVisibility } from "./usePageVisibility"

/**
 * Plays `src` on loop starting from the visitor's first interaction (browser
 * autoplay rules require a gesture), then pauses/resumes with tab visibility
 * so nothing plays uselessly in the background.
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
