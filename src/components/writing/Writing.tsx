import { RevealOnScroll } from "../shared/RevealOnScroll"
import { Section } from "../shared/Section"
import { FilmShelf } from "./FilmShelf"

export function Writing() {
  return (
    <Section id="writing" title="Writing">
      <RevealOnScroll>
        <p className="text-text-dim">Nothing here yet.</p>
        <FilmShelf />
      </RevealOnScroll>
    </Section>
  )
}
