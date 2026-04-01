import { useMemo, useRef, useState, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// ─── Morphing mesh: icosahedron → sphere ──────────────────────────────────────
function MorphMesh({ hovered, isMobile }) {
  const meshSolidRef = useRef()
  const meshWireRef  = useRef()
  const morphRef     = useRef(0)   // 0 = faceted, 1 = smooth sphere
  const lightRef     = useRef()

  const detail = isMobile ? 2 : 3

  // Shared geometry — both meshes reference the same geometry object
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, detail), [detail])

  // Pre-compute: base (faceted) and sphere (perfectly smooth) positions
  const { icoPos, sphPos } = useMemo(() => {
    const base = new Float32Array(geometry.attributes.position.array)
    const sph  = new Float32Array(base.length)
    for (let i = 0; i < base.length; i += 3) {
      const x = base[i], y = base[i + 1], z = base[i + 2]
      const len = Math.sqrt(x * x + y * y + z * z)
      sph[i]     = (x / len) * 1.5
      sph[i + 1] = (y / len) * 1.5
      sph[i + 2] = (z / len) * 1.5
    }
    return { icoPos: base, sphPos: sph }
  }, [geometry])

  useFrame(({ clock }, delta) => {
    const target = hovered ? 1 : 0
    morphRef.current += (target - morphRef.current) * 0.035

    const t = morphRef.current

    // ── Morph vertex positions ─────────────────────────────────────────────
    const arr = geometry.attributes.position.array
    for (let i = 0; i < arr.length; i++) {
      arr[i] = icoPos[i] * (1 - t) + sphPos[i] * t
    }
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    // ── Rotation — faster when hovered ────────────────────────────────────
    if (meshSolidRef.current) {
      meshSolidRef.current.rotation.y += delta * (0.22 + t * 0.55)
      meshSolidRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.28) * 0.22
    }
    if (meshWireRef.current) {
      meshWireRef.current.rotation.y = meshSolidRef.current?.rotation.y ?? 0
      meshWireRef.current.rotation.x = meshSolidRef.current?.rotation.x ?? 0
    }

    // ── Solid mesh: fades in on hover ──────────────────────────────────────
    if (meshSolidRef.current) {
      const solidTarget = 0.08 + t * 0.78
      meshSolidRef.current.material.opacity +=
        (solidTarget - meshSolidRef.current.material.opacity) * 0.06
      meshSolidRef.current.material.emissiveIntensity +=
        ((0.06 + t * 0.50) - meshSolidRef.current.material.emissiveIntensity) * 0.05
      meshSolidRef.current.material.roughness +=
        ((1.0 - t * 0.85) - meshSolidRef.current.material.roughness) * 0.05
    }

    // ── Wireframe mesh: fades out on hover ─────────────────────────────────
    if (meshWireRef.current) {
      const wireTarget = 0.45 * (1 - t)
      meshWireRef.current.material.opacity +=
        (wireTarget - meshWireRef.current.material.opacity) * 0.05
    }

    // ── Inner light brightens on hover ─────────────────────────────────────
    if (lightRef.current) {
      lightRef.current.intensity += ((t * 3.0) - lightRef.current.intensity) * 0.05
    }
  })

  return (
    <group>
      {/* Inner point light */}
      <pointLight ref={lightRef} color="#6fa3c7" intensity={0} distance={6} />

      {/* Solid mesh — glassy on hover */}
      <mesh ref={meshSolidRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0e1e2e"
          emissive="#6fa3c7"
          emissiveIntensity={0.06}
          transparent
          opacity={0.08}
          roughness={1.0}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe overlay — fades out when hovering */}
      <mesh ref={meshWireRef} geometry={geometry}>
        <meshBasicMaterial
          color="#6fa3c7"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  )
}

// ─── The interactive morph scene ──────────────────────────────────────────────
function MorphScene({ hovered, isMobile }) {
  return (
    <>
      <ambientLight intensity={0.15} color="#8fc4e0" />
      <directionalLight position={[4, 4, 4]} intensity={0.6} color="#8fc4e0" />
      <directionalLight position={[-3, -2, 2]} intensity={0.3} color="#6fa3c7" />

      <MorphMesh hovered={hovered} isMobile={isMobile} />

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.08} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function InteractiveMorph() {
  const [hovered, setHovered] = useState(false)
  const isMobile = window.innerWidth < 768

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        userSelect: 'none',
      }}
    >
      {/* Canvas */}
      <div
        className="morph-canvas-wrap"
        style={{
          width: 480,
          height: 480,
          cursor: hovered ? 'pointer' : 'default',
          position: 'relative',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        <ErrorBoundary>
          <Canvas
            dpr={isMobile ? [1, 1] : [1, 2]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: 'transparent' }}
            gl={{ antialias: true, alpha: true }}
          >
            <MorphScene hovered={hovered} isMobile={isMobile} />
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Label */}
      <p style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 400,
        fontSize: 11,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--accent)' : 'var(--muted)',
        transition: 'color 0.5s ease',
        marginTop: '-1.5rem',
        pointerEvents: 'none',
      }}>
        {hovered ? 'What we deliver' : 'Hover to transform'}
      </p>
    </div>
  )
}
