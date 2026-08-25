import { useGLTF } from "@react-three/drei"
import type { ThreeElement } from "@react-three/fiber"
import { useLayoutEffect, useRef } from "react"
import * as THREE from "three"

const MODEL_URL = "/models/f2006.glb"

/** Bodywork panels that should read as glossy automotive paint. */
const PAINTED_PANELS = new Set(["WCCARBODY.021", "WCEXTRA0.023", "WCEXTRA1.023", "WCWING.023"])

/** Tyre sidewall and tread. */
const TYRES = new Set(["side.023", "tread.023"])

/** Wheel rims, spokes and hub — dark anodised, not bare metal. */
const RIMS = new Set(["F248_RIM.003", "F248_RIM_BLUR.003", "FERSPOKES_BLUR.003", "FE2HUB.003"])

/** Loads the F2006 and centers it on X/Z with its lowest point sitting on y = 0, regardless of how the source mesh was authored. */
export function CarModel(props: ThreeElement<typeof THREE.Group>) {
  const { scene } = useGLTF(MODEL_URL)
  const groupRef = useRef<THREE.Group>(null!)

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    groupRef.current.position.set(-center.x, -box.min.y, -center.z)

    // The export carries no KHR_materials_clearcoat, and every surface was
    // authored fairly rough (paint ~0.37, tyres ~0.78-0.89). That rough a
    // surface scatters the studio HDRI into a flat wash instead of mirroring
    // its softbox as a defined streak — which is exactly what reads as
    // "matte red with a light on it" rather than waxed paint.
    //
    // The HDRI itself is well suited to this (a dark studio with a bright
    // umbrella and ceiling light, ~1900:1 dynamic range), so the fix is to
    // make the surfaces smooth enough to actually reflect it. Only gloss
    // properties are touched — all exported maps, colours and factors stay.
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const material = obj.material as THREE.MeshPhysicalMaterial

      if (PAINTED_PANELS.has(material.name)) {
        // Clearcoat carries the wet, waxed depth. Roughness is deliberately
        // not pushed to a mirror finish — below ~0.2 the softbox reflection
        // blows whole panels out to white at glancing angles. Darkening the
        // colour multiplier deepens the red towards the reference crimson,
        // which the specular would otherwise wash toward orange.
        material.clearcoat = 1
        material.clearcoatRoughness = 0.06
        material.roughness = 0.24
        material.color.setScalar(0.82)
        material.needsUpdate = true
        return
      }

      if (TYRES.has(material.name)) {
        // Blacker and wetter, like scrubbed race rubber. Darkening via the
        // material colour keeps the Bridgestone lettering legible instead of
        // crushing it, since it multiplies the existing texture.
        material.color.setScalar(0.42)
        material.roughness = 0.42
        material.needsUpdate = true
        return
      }

      if (RIMS.has(material.name)) {
        // The rim textures are already near-black (RGB ~30), but at the
        // authored roughness of 0.76 they scatter the studio environment
        // into a flat grey wash. Tightening them keeps the rims reading
        // black with a defined highlight rather than uniformly lit grey.
        material.color.setScalar(0.55)
        material.roughness = 0.45
        material.needsUpdate = true
      }
    })
  }, [scene])

  return (
    <group {...props}>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_URL)
