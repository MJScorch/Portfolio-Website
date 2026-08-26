import { useCallback, useEffect, useRef, useState } from "react"
import { usePageVisibility } from "./usePageVisibility"

/** Marks the sound control so the ambient gesture listener ignores it. */
export const AUDIO_CONTROL_ATTR = "data-audio-control"

export interface BackgroundAudio {
  /** True when the track is actually audible. */
  soundOn: boolean
  toggle: () => void
}

/**
 * Loops `src`, pausing with tab visibility so nothing plays into a hidden tab.
 *
 * Browsers refuse to start *audible* playback before a user gesture and a page
 * cannot opt out. Muted playback is allowed, so the track starts muted and
 * unmutes on the first interaction — by then it is decoded and running, so
 * sound arrives instantly rather than after a load pause.
 */
export function useBackgroundAudio(src: string): BackgroundAudio {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  /** Once the visitor uses the control, ambient gestures stop overriding them. */
  const userChoseRef = useRef(false)
  const [soundOn, setSoundOn] = useState(false)
  const visible = usePageVisibility()

  const setMuted = useCallback((muted: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = muted
    setSoundOn(!muted)
    if (!muted) void audio.play().catch(() => setSoundOn(false))
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    userChoseRef.current = true
    // Muted -> unmute, audible -> mute. Reads the element rather than state so
    // it stays correct even if the ambient listener changed it a moment ago.
    setMuted(!audio.muted)
  }, [setMuted])

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = "auto"
    audio.muted = true
    audioRef.current = audio
    void audio.play().catch(() => {})

    const reveal = (event: Event) => {
      // The control drives itself; letting this also fire would start the
      // track on pointerdown and then immediately toggle it off on click.
      const target = event.target as HTMLElement | null
      if (target?.closest?.(`[${AUDIO_CONTROL_ATTR}]`)) return
      if (userChoseRef.current) return
      window.removeEventListener("pointerdown", reveal)
      window.removeEventListener("keydown", reveal)
      setMuted(false)
    }

    window.addEventListener("pointerdown", reveal)
    window.addEventListener("keydown", reveal)

    return () => {
      window.removeEventListener("pointerdown", reveal)
      window.removeEventListener("keydown", reveal)
      audio.pause()
      audioRef.current = null
    }
  }, [src, setMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (visible) void audio.play().catch(() => {})
    else audio.pause()
  }, [visible])

  return { soundOn, toggle }
}
