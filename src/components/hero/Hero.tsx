import { GITHUB_URL } from "../../data/links"
import { GitHubIcon } from "../shared/icons"
import { ProfileLinks } from "../shared/ProfileLinks"
import { CarScene } from "./CarScene"

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <CarScene />

      {/* Scrim that lets the car pass into shadow behind the name — unchanged. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-bg via-bg/55 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-8 pb-14 sm:px-12 sm:pb-20">
        <div className="mx-auto max-w-[1100px]">
          <p className="animate-fade-up mb-4 text-[13px] tracking-[0.2em] text-text-dim uppercase [animation-delay:0.1s]">
            Bachelor of Mathematics · University of Waterloo
          </p>
          <div className="animate-fade-up flex flex-wrap items-center gap-x-6 gap-y-2 [animation-delay:0.25s]">
            <h1 className="text-[clamp(48px,9vw,104px)] leading-none font-medium tracking-[-0.02em] text-text">
              Matthew <em className="font-bold italic">Scorziello</em>
            </h1>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="pointer-events-auto text-text-dim transition-colors hover:text-text"
            >
              <GitHubIcon className="h-7 w-7" />
            </a>
          </div>
          <ProfileLinks className="animate-fade-up pointer-events-auto mt-6 [animation-delay:0.4s]" />
        </div>
      </div>
    </section>
  )
}
