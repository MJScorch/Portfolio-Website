import clsx from "clsx"
import { RESUME_URL } from "../../data/links"
import { useActiveSection } from "../../hooks/useActiveSection"

const NAV_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const

const NAV_IDS = NAV_ITEMS.map((item) => item.id)

const LINK_CLASS = "text-[13px] tracking-[0.1em] text-text-dim uppercase transition-colors hover:text-text"

export function Nav() {
  const active = useActiveSection(NAV_IDS)

  return (
    <nav className="fixed inset-x-0 top-0 z-100 bg-linear-to-b from-bg/95 to-transparent py-5">
      <div className="mx-auto flex max-w-[860px] items-center justify-between px-8">
        <a href="#hero" className="text-[15px] font-medium tracking-[0.08em] text-text">
          M.Scorziello
        </a>
        <ul className="flex gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={clsx(LINK_CLASS, active === item.id && "text-text")}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            {/* Opens the PDF itself rather than an on-page duplicate. */}
            <a href={RESUME_URL} target="_blank" rel="noopener" className={LINK_CLASS}>
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
