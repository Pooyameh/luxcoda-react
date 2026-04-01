import { useRef, useMemo, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// ─── Vertex shader ────────────────────────────────────────────────────────────
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// ─── Fragment shader — scroll-reactive liquid aurora ──────────────────────────
// Zones:
//   0.00–0.15  Hero        → deep dark, barely moving, single faint glow right
//   0.15–0.45  Diff+Process → warming currents emerge, speed increases
//   0.45–0.70  Pricing+CTA  → rich gold peak, most active, radial light center
//   0.70–1.00  TechStack+Contact → settling back to dark intimate embers
const fragmentShader = /* glsl */`
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollProgress;
  varying vec2  vUv;

  // ── Ashima simplex 3D noise ─────────────────────────────────────────────────
  vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute4(vec4 x){return mod289v4(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt4(vec4 r){return 1.79284291400159-.85373472095314*r;}

  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289v3(i);
    vec4 p=permute4(permute4(permute4(
      i.z+vec4(0.,i1.z,i2.z,1.))
      +i.y+vec4(0.,i1.y,i2.y,1.))
      +i.x+vec4(0.,i1.x,i2.x,1.)));
    float n_=.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;
    vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt4(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  // ── FBM (5 octaves) ─────────────────────────────────────────────────────────
  float fbm(vec3 p){
    float v=0.;float a=.5;float f=1.;
    for(int i=0;i<5;i++){v+=a*snoise(p*f);a*=.5;f*=2.;}
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float sp = uScrollProgress;

    // ── Mouse distortion: push noise field radially away from cursor ──────────
    vec2 toMouse = uv - uMouse;
    float md = length(toMouse);
    vec2 distort = normalize(toMouse + 0.001) * smoothstep(0.65, 0.0, md) * 0.11;
    vec2 duv = uv + distort;

    // ── Scroll-zone parameters (all driven by a sin arch over 0..1) ───────────
    // sinCurve peaks at sp=0.5 (pricing/CTA zone), is 0 at edges
    float sinCurve = sin(sp * 3.14159265);

    // Animation speed: slow at hero/contact, fastest at pricing
    float speedMult  = 1.0 + sinCurve * 0.90;

    // Noise spatial scale: coarser at edges, finer detail at peak
    float noiseScale = mix(1.55, 2.65, sinCurve);

    // Gold intensity: invisible at hero, peaks at pricing, embers at contact
    float goldIntens = sinCurve * 0.72;

    // Overall scene brightness: dim at edges, full brightness at peak
    float brightness = 0.25 + sinCurve * 0.48;

    float animTime = uTime * speedMult;

    // ── Two FBM noise layers ──────────────────────────────────────────────────
    float n  = fbm(vec3(duv * noiseScale,                          animTime));
    float n2 = fbm(vec3(duv * noiseScale * 0.62 + vec2(3.7, 2.1), animTime * 0.55 + 1.5));

    n  = (n  + 1.0) * 0.5;   // remap [-1,1] → [0,1]
    n2 = (n2 + 1.0) * 0.5;

    // ── Color palette ─────────────────────────────────────────────────────────
    vec3 black     = vec3(0.020, 0.020, 0.020);
    vec3 charcoal  = vec3(0.042, 0.038, 0.033);
    vec3 darkBrown = vec3(0.085, 0.058, 0.024);
    vec3 warmGold  = vec3(0.195, 0.130, 0.044);
    vec3 deepGold  = vec3(0.255, 0.185, 0.062);

    // ── Composite ─────────────────────────────────────────────────────────────
    vec3 col = mix(black, charcoal, smoothstep(0.20, 0.65, n));
    col = mix(col, darkBrown, smoothstep(0.45, 0.78, n2) * brightness);
    col = mix(col, warmGold,  smoothstep(0.62, 0.92, n * n2) * goldIntens);

    // Deep gold accent visible only in the pricing/CTA peak zone (0.35–0.70)
    float peakZone = smoothstep(0.30, 0.52, sp) * smoothstep(0.72, 0.52, sp);
    col = mix(col, deepGold, smoothstep(0.55, 0.85, n) * peakZone * 0.28);

    // ── Directional warm light — slides from right→left as page scrolls ───────
    vec2 lightPos   = mix(vec2(0.75, 0.52), vec2(0.28, 0.35), sp);
    float lightDist = length(uv - lightPos);
    float lIntens   = brightness * 0.14;
    float light     = smoothstep(0.88, 0.0, lightDist) * lIntens;
    col += vec3(light * 0.82, light * 0.60, light * 0.22);  // warm tint

    // ── Vignette ──────────────────────────────────────────────────────────────
    float vig = 1.0 - smoothstep(0.30, 0.95, length(uv - 0.5) * 1.45);
    col *= mix(0.55, 1.0, vig);

    // ── Edge darkening: first 12% and last 15% of scroll are darkest ──────────
    float edgeDark = smoothstep(0.0, 0.13, sp) * smoothstep(1.0, 0.85, sp);
    col *= mix(0.32, 1.0, edgeDark);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── Fluid background plane ───────────────────────────────────────────────────
function FluidBackground({ scrollProgress, mouseRef }) {
  const matRef    = useRef()
  const scrollRef = useRef(scrollProgress)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uMouse:          { value: new THREE.Vector2(0.5, 0.5) },
    uScrollProgress: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    uniforms.uTime.value = clock.getElapsedTime() * 0.08

    // Convert mouseRef coords (-1..1) → UV space (0..1)
    uniforms.uMouse.value.set(
      mouseRef.current.x * 0.5 + 0.5,
      mouseRef.current.y * 0.5 + 0.5,
    )

    // Lerped scroll — smooth zone transitions, no snapping
    uniforms.uScrollProgress.value +=
      (scrollRef.current - uniforms.uScrollProgress.value) * 0.04
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

// ─── Gold particle field — reacts to scroll zone ──────────────────────────────
function Particles({ scrollProgress }) {
  const geoRef    = useRef()
  const matRef    = useRef()
  const scrollRef = useRef(scrollProgress)
  const lerpedRef = useRef(0)      // internal lerped value avoids re-renders
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  const count = 150

  const { positions, offsets } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const offs = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 5
      offs[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, offsets: offs }
  }, [])

  const basePos = useMemo(() => positions.slice(), [positions])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Lerp scroll internally for ultra-smooth material changes
    lerpedRef.current += (scrollRef.current - lerpedRef.current) * 0.04
    const sp       = lerpedRef.current
    const sinCurve = Math.sin(sp * Math.PI)  // 0 at edges, 1 at middle

    // Drift speed: faster in the warm middle zone
    const speed = 0.15 + sinCurve * 0.12

    // Position drift
    if (geoRef.current) {
      const arr = geoRef.current.attributes.position.array
      for (let i = 0; i < count; i++) {
        arr[i * 3]     = basePos[i * 3]     + Math.cos(t * speed + offsets[i]) * 0.20
        arr[i * 3 + 1] = basePos[i * 3 + 1] + Math.sin(t * speed + offsets[i]) * 0.26
                         + sinCurve * t * 0.008  // gentle upward drift in middle zone
      }
      geoRef.current.attributes.position.needsUpdate = true
    }

    // Material: opacity + size react to scroll zone
    if (matRef.current) {
      const targetOpacity = 0.04 + sinCurve * 0.17   // 0.04 (edges) → 0.21 (peak)
      const targetSize    = 0.012 + sinCurve * 0.018  // 0.012 (edges) → 0.030 (peak)
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * 0.03
      matRef.current.size    += (targetSize    - matRef.current.size)    * 0.03
    }
  })

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#c9a96e"
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.04}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress, mouseRef }) {
  return (
    <>
      <FluidBackground scrollProgress={scrollProgress} mouseRef={mouseRef} />
      <Particles scrollProgress={scrollProgress} />
      <EffectComposer>
        <Bloom intensity={0.18} luminanceThreshold={0.38} luminanceSmoothing={0.92} />
        <Vignette darkness={0.48} offset={0.32} />
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
          top: 0, left: 0,
          width: '100vw', height: '100vh',
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
