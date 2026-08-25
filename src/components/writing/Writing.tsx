import { RevealOnScroll } from "../shared/RevealOnScroll"
import { Section } from "../shared/Section"
import { FilmShelf } from "./FilmShelf"

export function Writing() {
  return (
    <Section id="writing" title="Writing">
      <RevealOnScroll>
        <p className="text-text-dim">Still out for peer review.</p>
        <FilmShelf />
      </RevealOnScroll>
    </Section>
  )
}
