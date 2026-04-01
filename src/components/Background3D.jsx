import { useRef, useMemo, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// ─── NDC Vertex Shader (bypasses camera — fills screen exactly) ───────────────
const ndcVertexShader = /* glsl */`
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// ─── Fragment Shader — bright scroll-reactive aurora ──────────────────────────
const fluidFragmentShader = /* glsl */`
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollProgress;
  uniform vec2  uResolution;

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

  float fbm(vec3 p){
    float v=0.;float a=.5;float f=1.;
    for(int i=0;i<5;i++){v+=a*snoise(p*f);a*=.5;f*=2.;}
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float sp = uScrollProgress;

    // ── Mouse distortion ──────────────────────────────────────────────────────
    vec2 toMouse = uv - uMouse;
    float md = length(toMouse);
    vec2 distort = normalize(toMouse + 0.001) * smoothstep(0.55, 0.0, md) * 0.08;
    vec2 duv = uv + distort;

    // ── Scroll zones ──────────────────────────────────────────────────────────
    float sinCurve  = sin(sp * 3.14159265);            // arch: 0 at edges, 1 at mid
    float speedMult = 1.0 + sinCurve * 1.2;
    float noiseScale= mix(1.4, 2.8, sinCurve);
    float animTime  = uTime * speedMult;

    // ── FBM noise layers ──────────────────────────────────────────────────────
    float n  = fbm(vec3(duv * noiseScale,               animTime));
    float n2 = fbm(vec3(duv * noiseScale * 0.6 + vec2(3.7, 2.1), animTime * 0.5 + 1.5));
    n  = (n  + 1.0) * 0.5;
    n2 = (n2 + 1.0) * 0.5;

    // ── Visible warm color palette ────────────────────────────────────────────
    vec3 nearBlack  = vec3(0.04,  0.025, 0.010);
    vec3 chocolate  = vec3(0.12,  0.070, 0.030);
    vec3 amber      = vec3(0.22,  0.130, 0.040);
    vec3 gold       = vec3(0.35,  0.220, 0.060);
    vec3 hotGold    = vec3(0.50,  0.320, 0.080);

    // ── Base color: always at least chocolate visible ─────────────────────────
    float baseWarm  = 0.30 + sinCurve * 0.50;          // never fully black
    vec3 col = mix(nearBlack, chocolate, smoothstep(0.15, 0.60, n) * baseWarm);
    col = mix(col, amber,   smoothstep(0.42, 0.78, n2) * (0.50 + sinCurve * 0.45));
    col = mix(col, gold,    smoothstep(0.60, 0.90, n * n2) * (sinCurve * 0.80 + 0.15));
    col = mix(col, hotGold, smoothstep(0.72, 0.95, n) * sinCurve * 0.55);

    // ── Hero glow — always-on radial at top-right, slides as scroll increases ─
    float heroZone  = smoothstep(0.25, 0.0, sp);        // present at top of page
    vec2  glowPos   = vec2(0.72, 0.48);
    float heroDist  = length(uv - glowPos);
    float heroGlow  = exp(-2.5 * heroDist) * (0.35 + heroZone * 0.45);
    col += amber * heroGlow;

    // ── Warm zone secondary glow (Difference / Process) ───────────────────────
    float warmZone  = smoothstep(0.10, 0.30, sp) * smoothstep(0.55, 0.32, sp);
    vec2  warmPos   = vec2(0.35, 0.55);
    float warmDist  = length(uv - warmPos);
    float warmGlow  = exp(-3.0 * warmDist) * warmZone * 0.55;
    col += chocolate * warmGlow;

    // ── Gold zone peak glow (Pricing / CTA) ───────────────────────────────────
    float goldZone  = smoothstep(0.35, 0.52, sp) * smoothstep(0.72, 0.52, sp);
    vec2  goldPos   = vec2(0.50, 0.45);
    float goldDist  = length(uv - goldPos);
    float goldGlow  = exp(-2.0 * goldDist) * goldZone * 0.65;
    col += gold * goldGlow;

    // ── End zone ember glow (TechStack / Contact) ─────────────────────────────
    float endZone   = smoothstep(0.72, 0.90, sp);
    vec2  endPos    = vec2(0.28, 0.50);
    float endDist   = length(uv - endPos);
    float endGlow   = exp(-3.5 * endDist) * endZone * 0.40;
    col += chocolate * endGlow;

    // ── Caustic / sparkle layer ───────────────────────────────────────────────
    float caustic = fbm(vec3(duv * 4.5, animTime * 0.7 + 3.0));
    caustic = (caustic + 1.0) * 0.5;
    col += hotGold * smoothstep(0.78, 0.98, caustic) * sinCurve * 0.22;

    // ── Directional light sliding right → left ────────────────────────────────
    vec2 lightPos  = mix(vec2(0.78, 0.52), vec2(0.22, 0.42), sp);
    float lDist    = length(uv - lightPos);
    float light    = smoothstep(0.90, 0.0, lDist) * (0.10 + sinCurve * 0.16);
    col += vec3(light * 0.85, light * 0.60, light * 0.20);

    // ── Vignette ──────────────────────────────────────────────────────────────
    float vig = 1.0 - smoothstep(0.28, 0.88, length(uv - 0.5) * 1.4);
    col *= mix(0.45, 1.0, vig);

    // ── Ensure minimum floor brightness so it never looks pure black ──────────
    col = max(col, vec3(0.025, 0.015, 0.005));

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── Fluid background plane (NDC — fills screen) ─────────────────────────────
function FluidPlane({ scrollProgress, mouseRef }) {
  const matRef    = useRef()
  const scrollRef = useRef(scrollProgress)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uMouse:          { value: new THREE.Vector2(0.5, 0.5) },
    uScrollProgress: { value: 0 },
    uResolution:     { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  }), [])

  useEffect(() => {
    const onResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [uniforms])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    uniforms.uTime.value = clock.getElapsedTime() * 0.09

    uniforms.uMouse.value.set(
      mouseRef.current.x * 0.5 + 0.5,
      mouseRef.current.y * 0.5 + 0.5,
    )

    uniforms.uScrollProgress.value +=
      (scrollRef.current - uniforms.uScrollProgress.value) * 0.04
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={ndcVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

// ─── Canvas-generated radial gradient texture ─────────────────────────────────
function makeNebulaTexture(r, g, b) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0.0, `rgba(${r},${g},${b},0.9)`)
  grad.addColorStop(0.35, `rgba(${r},${g},${b},0.35)`)
  grad.addColorStop(0.7,  `rgba(${r},${g},${b},0.08)`)
  grad.addColorStop(1.0,  `rgba(${r},${g},${b},0.0)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

// ─── Gold nebula sprites ───────────────────────────────────────────────────────
function GoldNebula({ scrollProgress }) {
  const groupRef  = useRef()
  const scrollRef = useRef(scrollProgress)
  const lerpedRef = useRef(0)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  const nebulae = useMemo(() => [
    { pos: [ 8,  3, -6], scale: 10, tex: makeNebulaTexture(200, 130, 40), baseOpacity: 0.25 },
    { pos: [-7, -2, -8], scale: 9,  tex: makeNebulaTexture(160, 95,  25), baseOpacity: 0.20 },
    { pos: [ 3, -5, -7], scale: 8,  tex: makeNebulaTexture(220, 150, 55), baseOpacity: 0.18 },
    { pos: [-4,  6, -5], scale: 7,  tex: makeNebulaTexture(180, 110, 35), baseOpacity: 0.15 },
  ], [])

  const materials = useRef([])

  useFrame(({ clock }) => {
    lerpedRef.current += (scrollRef.current - lerpedRef.current) * 0.04
    const sp       = lerpedRef.current
    const sinCurve = Math.sin(sp * Math.PI)
    const t        = clock.getElapsedTime()

    materials.current.forEach((mat, i) => {
      if (!mat) return
      const base   = nebulae[i].baseOpacity
      const target = base * (0.4 + sinCurve * 1.1)
      mat.opacity += (target - mat.opacity) * 0.03

      // Slow breathing pulse
      const pulse = 1.0 + Math.sin(t * 0.3 + i * 1.5) * 0.06
      if (groupRef.current) {
        const mesh = groupRef.current.children[i]
        if (mesh) mesh.scale.setScalar(nebulae[i].scale * pulse)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {nebulae.map((n, i) => (
        <mesh key={i} position={n.pos} scale={n.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={el => (materials.current[i] = el)}
            map={n.tex}
            transparent
            opacity={n.baseOpacity * 0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Floating gold particles ───────────────────────────────────────────────────
function FloatingParticles({ scrollProgress }) {
  const geoRef    = useRef()
  const matRef    = useRef()
  const scrollRef = useRef(scrollProgress)
  const lerpedRef = useRef(0)
  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  const count = 80

  const { positions, offsets, speeds } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const offs = new Float32Array(count)
    const spds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 36
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4
      offs[i] = Math.random() * Math.PI * 2
      spds[i] = 0.12 + Math.random() * 0.10
    }
    return { positions: pos, offsets: offs, speeds: spds }
  }, [])

  const basePos = useMemo(() => positions.slice(), [positions])

  useFrame(({ clock }) => {
    lerpedRef.current += (scrollRef.current - lerpedRef.current) * 0.04
    const sp       = lerpedRef.current
    const sinCurve = Math.sin(sp * Math.PI)
    const t        = clock.getElapsedTime()

    if (geoRef.current) {
      const arr = geoRef.current.attributes.position.array
      for (let i = 0; i < count; i++) {
        arr[i * 3]     = basePos[i * 3]     + Math.cos(t * speeds[i] + offsets[i]) * 0.18
        // Upward drift — faster in warm middle zone; wrap at top boundary
        const drift    = t * (0.04 + sinCurve * 0.06) * speeds[i] * 8
        let   y        = basePos[i * 3 + 1] + Math.sin(t * speeds[i] + offsets[i]) * 0.22 + drift
        const yBound   = 12
        if (y > yBound) y -= yBound * 2  // wrap around
        arr[i * 3 + 1] = y
      }
      geoRef.current.attributes.position.needsUpdate = true
    }

    if (matRef.current) {
      const targetOpacity = 0.08 + sinCurve * 0.28
      const targetSize    = 0.018 + sinCurve * 0.026
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
        color="#d4a84b"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ scrollProgress, mouseRef }) {
  return (
    <>
      <FluidPlane     scrollProgress={scrollProgress} mouseRef={mouseRef} />
      <GoldNebula     scrollProgress={scrollProgress} />
      <FloatingParticles scrollProgress={scrollProgress} />
      <EffectComposer>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.20}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <Vignette darkness={0.40} offset={0.30} />
      </EffectComposer>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Background3D({ scrollProgress = 0 }) {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
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
        camera={{ position: [0, 0, 1], fov: 60 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.NoToneMapping }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050505, 1)
        }}
      >
        <Scene scrollProgress={scrollProgress} mouseRef={mouseRef} />
      </Canvas>
    </ErrorBoundary>
  )
}
