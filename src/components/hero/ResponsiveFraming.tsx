import { useThree } from "@react-three/fiber"
import { useLayoutEffect } from "react"
import * as THREE from "three"

/** Orbit target — must match CarControls. */
const TARGET = new THREE.Vector3(0, 0.55, 0)

/** Distance that frames the car on a landscape viewport. */
const BASE_DISTANCE = 4.76

/**
 * The camera distance that frames the car nicely in landscape crops it badly
 * in a phone's portrait window. This pulls the camera back as the viewport
 * gets taller than it is wide, keeping the whole car in frame.
 *
 * Only the distance changes, never the orbit direction, so dragging still
 * behaves identically. At an aspect ratio of 1 or wider the distance is
 * exactly the desktop value, so desktop framing is untouched.
 */
export function ResponsiveFraming() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const controls = useThree((state) => state.controls) as { update?: () => void } | null

  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    const distance = aspect >= 1 ? BASE_DISTANCE : BASE_DISTANCE * THREE.MathUtils.clamp(1 / aspect, 1, 1.85)

    const direction = camera.position.clone().sub(TARGET)
    if (direction.lengthSq() === 0) return
    camera.position.copy(TARGET).addScaledVector(direction.normalize(), distance)
    camera.updateProjectionMatrix()
    controls?.update?.()
  }, [camera, size, controls])

  return null
}
