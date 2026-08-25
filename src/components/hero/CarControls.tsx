import { OrbitControls } from "@react-three/drei"
import { usePageVisibility } from "../../hooks/usePageVisibility"

/** Idle auto-rotate, drag-to-orbit only (no zoom, no pan) — auto-rotate pauses the instant the tab loses focus. */
export function CarControls() {
  const visible = usePageVisibility()

  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.05}
      autoRotate={visible}
      autoRotateSpeed={0.6}
      target={[0, 0.55, 0]}
    />
  )
}
