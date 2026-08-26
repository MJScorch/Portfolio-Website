import { AUDIO_CONTROL_ATTR } from "../../hooks/useBackgroundAudio"

function SpeakerOn() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="h-4 w-4">
      <path d="M8.5 2.5 5 5.5H2.5v5H5l3.5 3z" strokeLinejoin="round" />
      <path d="M11 5.6a3.4 3.4 0 0 1 0 4.8M13 3.6a6.2 6.2 0 0 1 0 8.8" strokeLinecap="round" />
    </svg>
  )
}

function SpeakerOff() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="h-4 w-4">
      <path d="M8.5 2.5 5 5.5H2.5v5H5l3.5 3z" strokeLinejoin="round" />
      <path d="m11 6.2 3.4 3.6M14.4 6.2 11 9.8" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Sound control for the hero. Hidden below `sm` — on a phone it would sit off
 * the hero's balance, and the layout reads better without it.
 *
 * The `data-audio-control` hook is what keeps the first click honest: without
 * it, the ambient gesture listener would unmute on pointerdown and this
 * button's own click would immediately mute again.
 */
export function SoundToggle({ soundOn, onToggle }: { soundOn: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      {...{ [AUDIO_CONTROL_ATTR]: "" }}
      aria-pressed={soundOn}
      aria-label={soundOn ? "Mute music" : "Play music"}
      className="pointer-events-auto hidden items-center gap-2 text-[11px] tracking-[0.06em] text-text-muted uppercase transition-colors hover:text-text sm:flex sm:text-[13px] sm:tracking-[0.1em]"
    >
      {soundOn ? <SpeakerOn /> : <SpeakerOff />}
      {soundOn ? "Sound on" : "Sound off"}
    </button>
  )
}
