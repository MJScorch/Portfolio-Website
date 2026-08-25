import { ContactShadows, Environment, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import * as THREE from "three"
import { CarControls } from "./CarControls"
import { CarModel } from "./CarModel"
import { LoadingOverlay } from "./LoadingOverlay"
import { ResponsiveFraming } from "./ResponsiveFraming"

export function CarScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <PerspectiveCamera makeDefault position={[3.2, 1.5, 3.4]} fov={38} />
        {/* The HDRI does the heavy lifting for reflections; these just lift the
            shadow side and give the bodywork a defined highlight to catch. */}
        {/* The HDRI provides essentially all the light. The directional lamp is
            kept low on purpose: on a clearcoated surface it adds a second, very
            intense specular lobe on top of the environment reflection, and that
            stacking is what clipped whole panels to white at glancing angles. */}
        <ambientLight intensity={0.05} />
        <directionalLight position={[5, 8, 3]} intensity={0.18} />
        <Suspense fallback={null}>
          <CarModel />
          <Environment files="/hdri/studio.hdr" environmentIntensity={0.85} />
          <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={14} blur={2.4} far={4} />
        </Suspense>
        <CarControls />
        <ResponsiveFraming />
      </Canvas>
      <LoadingOverlay />
    </div>
  )
}
