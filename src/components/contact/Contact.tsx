import { useEmail } from "../../hooks/useEmail"
import { ProfileLinks } from "../shared/ProfileLinks"
import { RevealOnScroll } from "../shared/RevealOnScroll"
import { Section } from "../shared/Section"

export function Contact() {
  const { email, mailto } = useEmail()

  return (
    <Section id="contact" title="Contact">
      <RevealOnScroll className="flex flex-col gap-8">
        <a href={mailto} className="text-xl text-text transition-colors hover:text-text-dim">
          {email}
        </a>
        <ProfileLinks />
      </RevealOnScroll>
    </Section>
  )
}
