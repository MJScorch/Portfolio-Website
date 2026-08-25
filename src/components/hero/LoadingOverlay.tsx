import { useProgress } from "@react-three/drei"

export function LoadingOverlay() {
  const { active, progress } = useProgress()

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-[13px] tracking-[0.2em] text-text-dim uppercase">Loading model</span>
      <div className="h-px w-40 bg-line">
        <div className="h-px bg-text transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
