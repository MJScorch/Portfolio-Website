import clsx from "clsx"
import type { ReactNode } from "react"
import { useScrollReveal } from "../../hooks/useScrollReveal"

export function RevealOnScroll({
  children,
  index = 0,
  className,
}: {
  children: ReactNode
  index?: number
  className?: string
}) {
  const { ref, visible, style } = useScrollReveal<HTMLDivElement>(index)
  return (
    <div ref={ref} className={clsx("reveal", visible && "visible", className)} style={style}>
      {children}
    </div>
  )
}
