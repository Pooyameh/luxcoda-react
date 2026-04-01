import { useRef, useMemo, Component } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

const wordDefs = [
  { text: 'React',    base: [-3.5,  1.5,   0],   size: 0.7  },
  { text: 'Motion',   base: [ 2.5,  1.8,  -1],   size: 0.5  },
  { text: 'WebGL',    base: [-2,   -1.5,   0.5], size: 0.8  },
  { text: 'GSAP',     base: [ 3,   -0.8,  -0.5], size: 0.6  },
  { text: 'Vite',     base: [ 0.5,  2.2,   1],   size: 0.45 },
  { text: 'Tailwind', base: [-1,   -2.5,  -1],   size: 0.55 },
]

function FloatingWords({ mouseRef }) {
  const { camera } = useThree()
  const textRefs = useRef([])

  const currentPos = useMemo(
    () => wordDefs.map(w => ({ x: w.base[0], y: w.base[1], z: w.base[2] })),
    []
  )

  const mouseWorld = useMemo(() => new THREE.Vector3(), [])
  const tempVec    = useMemo(() => new THREE.Vector3(), [])
  const tempDir    = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Unproject mouse to z=0 plane
    tempVec.set(mouseRef.current.x, mouseRef.current.y, 0.5).unproject(camera)
    tempDir.copy(tempVec).sub(camera.position).normalize()
    const d = -camera.position.z / tempDir.z
    mouseWorld.copy(camera.position).addScaledVector(tempDir, d)

    wordDefs.forEach((w, i) => {
      const [bx, by, bz] = w.base

      // Slow sine drift unique per index
      const driftX = Math.sin(t * 0.35 + i * 1.4) * 0.25
      const driftY = Math.cos(t * 0.28 + i * 0.95) * 0.2

      // Repulsion from mouse
      const dx = bx - mouseWorld.x
      const dy = by - mouseWorld.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001
      const strength = Math.max(0, 1 - dist / 5) * 1.8
      const repX = (dx / dist) * strength
      const repY = (dy / dist) * strength

      const targetX = bx + driftX + repX
      const targetY = by + driftY + repY

      // Lerp toward target
      currentPos[i].x += (targetX - currentPos[i].x) * 0.03
      currentPos[i].y += (targetY - currentPos[i].y) * 0.03

      const mesh = textRefs.current[i]
      if (mesh) {
        mesh.position.x = currentPos[i].x
        mesh.position.y = currentPos[i].y
        mesh.position.z = bz
      }
    })
  })

  return (
    <>
      {wordDefs.map((w, i) => (
        <Text
          key={w.text}
          ref={el => (textRefs.current[i] = el)}
          position={[w.base[0], w.base[1], w.base[2]]}
          fontSize={w.size}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {w.text}
        </Text>
      ))}
    </>
  )
}

function Scene({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={1} />
      <FloatingWords mouseRef={mouseRef} />
    </>
  )
}

export default function TechStack() {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  const handleMouseLeave = () => {
    mouseRef.current.x = 0
    mouseRef.current.y = 0
  }

  return (
    <section
      style={{
        background: 'transparent',
        padding: 'clamp(3rem, 6vh, 6rem) 0 clamp(2rem, 4vh, 4rem)',
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100vw', height: '60vh', cursor: 'none' }}
      >
        <ErrorBoundary>
          <Canvas
            style={{ width: '100%', height: '100%' }}
            camera={{ position: [0, 0, 8], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene mouseRef={mouseRef} />
          </Canvas>
        </ErrorBoundary>
      </div>

      <p
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 16,
          color: 'var(--warm)',
          opacity: 0.6,
          textAlign: 'center',
          padding: '0 2rem',
          marginTop: '1.5rem',
        }}
      >
        Built with the tools the internet's best sites are built with.
      </p>
    </section>
  )
}
