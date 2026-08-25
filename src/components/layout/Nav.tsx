import clsx from "clsx"
import { RESUME_URL } from "../../data/links"
import { useActiveSection } from "../../hooks/useActiveSection"

const NAV_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const

const NAV_IDS = NAV_ITEMS.map((item) => item.id)

const LINK_CLASS =
  "text-[11px] tracking-[0.06em] text-text-dim uppercase transition-colors hover:text-text sm:text-[13px] sm:tracking-[0.1em]"

export function Nav() {
  const active = useActiveSection(NAV_IDS)

  return (
    <nav className="fixed inset-x-0 top-0 z-100 bg-linear-to-b from-bg/95 to-transparent py-5">
      <div className="mx-auto flex max-w-[860px] items-center justify-between gap-4 px-5 sm:px-8">
        {/* The wordmark is redundant on a phone — the name is right below it in
            the hero — and dropping it is what lets all four links fit. */}
        <a href="#hero" className="hidden text-[15px] font-medium tracking-[0.08em] text-text sm:block">
          M.Scorziello
        </a>
        <ul className="flex w-full justify-between gap-3 sm:w-auto sm:justify-end sm:gap-7">
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
