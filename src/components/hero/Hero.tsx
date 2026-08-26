import type { BackgroundAudio } from "../../hooks/useBackgroundAudio"
import { SoundToggle } from "../audio/SoundToggle"
import { ProfileLinks } from "../shared/ProfileLinks"
import { CarScene } from "./CarScene"

export function Hero({ audio }: { audio: BackgroundAudio }) {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <CarScene />

      {/* Scrim that lets the car pass into shadow behind the name — unchanged. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-bg via-bg/55 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-12 sm:pb-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="animate-fade-up mb-3 text-[10px] tracking-[0.12em] text-text-dim uppercase sm:mb-4 sm:text-[13px] sm:tracking-[0.2em] [animation-delay:0.1s]">
            Bachelor of Mathematics · University of Waterloo
          </p>
          <h1 className="animate-fade-up text-[clamp(48px,9vw,104px)] leading-none font-medium tracking-[-0.02em] text-text [animation-delay:0.25s]">
            Matthew <em className="font-bold italic">Scorziello</em>
          </h1>
          {/* Links left, sound control right — the control is desktop-only, so
              on a phone this collapses back to just the links. */}
          <div className="animate-fade-up mt-5 flex items-end justify-between gap-6 sm:mt-6 [animation-delay:0.4s]">
            <ProfileLinks className="pointer-events-auto min-w-0 flex-1" />
            <SoundToggle soundOn={audio.soundOn} onToggle={audio.toggle} />
          </div>
        </div>
      </div>
    </section>
  )
}
