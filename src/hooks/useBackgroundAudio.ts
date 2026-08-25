import { useEffect, useRef } from "react"
import { usePageVisibility } from "./usePageVisibility"

/**
 * Loops `src` in the background, pausing with tab visibility so nothing plays
 * uselessly when the tab is hidden.
 *
 * Browsers refuse to start *audible* playback before the visitor has
 * interacted with the page, and there is no way for a page to opt out of that.
 * What they do allow is muted playback. So this starts muted immediately and
 * unmutes on the first interaction: by the time the visitor clicks, scrolls
 * onto the car, or drags it, the track is already decoded, buffered and
 * running, so the sound comes in instantly rather than after a load pause.
 */
export function useBackgroundAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const unmutedRef = useRef(false)
  const visible = usePageVisibility()

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = "auto"
    audio.muted = true
    audioRef.current = audio

    // Muted autoplay is permitted, so this generally succeeds.
    void audio.play().catch(() => {})

    const reveal = () => {
      if (unmutedRef.current) return
      unmutedRef.current = true
      audio.muted = false
      // If the muted start was refused too, this gesture is our chance.
      void audio.play().catch(() => {
        unmutedRef.current = false
        audio.muted = true
      })
    }

    // `pointerdown` covers click and touch; `keydown` covers keyboard users.
    // Both count as user activation, which is what unlocks audible playback.
    window.addEventListener("pointerdown", reveal)
    window.addEventListener("keydown", reveal)

    return () => {
      window.removeEventListener("pointerdown", reveal)
      window.removeEventListener("keydown", reveal)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (visible) void audio.play().catch(() => {})
    else audio.pause()
  }, [visible])
}
