import type { ReactNode } from "react"
import { RevealOnScroll } from "./RevealOnScroll"

/**
 * The single section pattern every below-the-fold block uses: a hairline rule,
 * a title row that optionally carries an action on the right, then content.
 * New sections (a films & books catalogue, for example) should reuse this
 * rather than inventing their own layout.
 */
export function Section({
  id,
  title,
  action,
  children,
}: {
  id: string
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="border-t border-line py-24">
      <div className="mx-auto max-w-[860px] px-8">
        <RevealOnScroll className="mb-12 flex items-baseline justify-between gap-6">
          <h2 className="text-[clamp(28px,4vw,42px)] leading-none font-medium tracking-[-0.02em] text-text">
            {title}
          </h2>
          {action}
        </RevealOnScroll>
        {children}
      </div>
    </section>
  )
}
