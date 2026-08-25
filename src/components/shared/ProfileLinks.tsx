import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../../data/links"
import { useEmail } from "../../hooks/useEmail"
import { DocumentIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons"

/**
 * GitHub / LinkedIn / email / resume as one labelled row. Used in the hero so
 * everything is reachable without scrolling, and again in Contact.
 */
export function ProfileLinks({ className = "" }: { className?: string }) {
  const { mailto } = useEmail()

  const links = [
    { label: "GitHub", href: GITHUB_URL, icon: <GitHubIcon className="h-4 w-4" />, external: true },
    { label: "LinkedIn", href: LINKEDIN_URL, icon: <LinkedInIcon className="h-4 w-4" />, external: true },
    { label: "Email", href: mailto, icon: <MailIcon className="h-4 w-4" />, external: false },
    { label: "Resume", href: RESUME_URL, icon: <DocumentIcon className="h-4 w-4" />, external: true },
  ]

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
          className="flex items-center gap-2 text-[15px] text-text-dim transition-colors hover:text-text"
        >
          {link.icon}
          {link.label}
        </a>
      ))}
    </div>
  )
}
