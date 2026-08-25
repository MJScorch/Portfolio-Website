import { useEmail } from "../../hooks/useEmail"
import { ProfileLinks } from "../shared/ProfileLinks"
import { RevealOnScroll } from "../shared/RevealOnScroll"
import { Section } from "../shared/Section"

export function Contact() {
  const { email, mailto } = useEmail()

  return (
    <Section id="contact" title="Contact">
      <RevealOnScroll className="flex flex-col gap-8">
        <p className="max-w-[46ch] text-text-dim">
          If you have a role, a project, or an idea you think I&rsquo;d be a good fit for, I&rsquo;d be glad to hear
          about it — feel free to get in touch.
        </p>
        <a href={mailto} className="text-xl text-text transition-colors hover:text-text-dim">
          {email}
        </a>
        <ProfileLinks />
      </RevealOnScroll>
    </Section>
  )
}
