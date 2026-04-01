import { useRef, useMemo, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// ─── Vertex shader (shared) ───────────────────────────────────────────────────
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// ─── Fragment shader — organic simplex noise ──────────────────────────────────
const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  varying vec2  vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j   = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_  = floor(j * ns.z);
    vec4 y_  = floor(j - 7.0 * x_);
    vec4 x   = x_ *ns.x + ns.yyyy;
    vec4 y   = y_ *ns.x + ns.yyyy;
    vec4 h   = 1.0 - abs(x) - abs(y);
    vec4 b0  = vec4(x.xy, y.xy);
    vec4 b1  = vec4(x.zw, y.zw);
    vec4 s0  = floor(b0)*2.0 + 1.0;
    vec4 s1  = floor(b1)*2.0 + 1.0;
    vec4 sh  = -step(h, vec4(0.0));
    vec4 a0  = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1  = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0  = vec3(a0.xy, h.x);
    vec3 p1  = vec3(a0.zw, h.y);
    vec3 p2  = vec3(a1.xy, h.z);
    vec3 p3  = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float n = snoise(vec3(vUv * 2.5, uTime * 0.08 + uScrollProgress * 1.5));
    n = (n + 1.0) * 0.5;
    n = smoothstep(0.3, 0.75, n);
    float goldBleed = uScrollProgress * 0.18;
    vec3 color = mix(uColorA, uColorB, n * goldBleed);
    gl_FragColor = vec4(color, 1.0);
  }
`

// ─── Fluid background plane ───────────────────────────────────────────────────
function FluidBackground({ scrollProgress }) {
  const matRef    = useRef()
  const scrollRef = useRef(scrollProgress)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  const uniforms = useMemo(() => ({
    uTime:          { value: 0 },
    uScrollProgress:{ value: 0 },
    uColorA:        { value: new THREE.Color(0.039, 0.039, 0.039) },
    uColorB:        { value: new THREE.Color(0.788, 0.663, 0.431) },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value          = clock.getElapsedTime()
    matRef.current.uniforms.uScrollProgress.value = scrollRef.current
  })

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[60, 34]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── Particle field ───────────────────────────────────────────────────────────
function ParticleField({ scrollProgress }) {
  const groupRef = useRef()
  const geoRef   = useRef()
  const count    = 6000

  const { basePositions, offsets, initialPositions } = useMemo(() => {
    const base = new Float32Array(count * 3)
    const offs = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      base[i * 3]     = (Math.random() - 0.5) * 60
      base[i * 3 + 1] = (Math.random() - 0.5) * 40
      base[i * 3 + 2] = (Math.random() - 0.5) * 30
      offs[i] = Math.random() * Math.PI * 2
    }
    return { basePositions: base, offsets: offs, initialPositions: base.slice() }
  }, [])

  const scrollRef = useRef(scrollProgress)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollRef.current * Math.PI * 2
    }
    if (geoRef.current) {
      const pos = geoRef.current.attributes.position.array
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = basePositions[i * 3]     + Math.cos(t * 0.2 + offsets[i]) * 0.12
        pos[i * 3 + 1] = basePositions[i * 3 + 1] + Math.sin(t * 0.3 + offsets[i]) * 0.15
      }
      geoRef.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.012} sizeAttenuation transparent opacity={0.3} />
      </points>
    </group>
  )
}

// ─── Gold orb ─────────────────────────────────────────────────────────────────
function LuxuryOrb({ scrollProgress, mouseRef }) {
  const meshRef   = useRef()
  const scrollRef = useRef(scrollProgress)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  // Current lerped values (avoid re-renders — plain object)
  const lerped = useRef({ x: 4, y: 0, rx: 0, ry: 0 })

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t  = clock.getElapsedTime()
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    const baseX   = 4 - scrollRef.current * 8
    const targetX = baseX + mx * 0.8
    const targetY = my * 0.5
    const targetRX = my * 0.4
    const targetRY = mx * 0.4

    // Lerp toward targets — heavy/luxurious feel
    lerped.current.x  += (targetX  - lerped.current.x)  * 0.03
    lerped.current.y  += (targetY  - lerped.current.y)  * 0.03
    lerped.current.rx += (targetRX - lerped.current.rx) * 0.05
    lerped.current.ry += (targetRY - lerped.current.ry) * 0.05

    meshRef.current.position.x = lerped.current.x
    meshRef.current.position.y = lerped.current.y
    // Auto-spin on top of mouse rotation
    meshRef.current.rotation.x = lerped.current.rx + t * 0.25
    meshRef.current.rotation.y = lerped.current.ry + t * 0.4
    meshRef.current.rotation.z = t * 0.15
  })

  return (
    <mesh ref={meshRef} position={[4, 0, -5]}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial color="#c9a96e" metalness={1.0} roughness={0.1} />
    </mesh>
  )
}

// ─── Horizontal lines ─────────────────────────────────────────────────────────
function HorizontalLines() {
  const lines = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.06 })
    return Array.from({ length: 12 }, (_, i) => {
      const y = -6 + (i / 11) * 12
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-20, y, -8),
        new THREE.Vector3(20, y, -8),
      ])
      return new THREE.Line(geo, mat)
    })
  }, [])

  return (
    <>
      {lines.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress, mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight color="#c9a96e" position={[5, 5, 5]} intensity={2} />
      <FluidBackground scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />
      <LuxuryOrb scrollProgress={scrollProgress} mouseRef={mouseRef} />
      <HorizontalLines />
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.9} />
        <Vignette darkness={0.5} offset={0.3} />
      </EffectComposer>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Background3D({ scrollProgress = 0 }) {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <ErrorBoundary>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollProgress={scrollProgress} mouseRef={mouseRef} />
      </Canvas>
    </ErrorBoundary>
  )
}
