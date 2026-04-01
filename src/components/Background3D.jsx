import { useRef, useMemo, useEffect, useState, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useScrollStore } from '../useScrollEvents'

// ── Utility smoothstep ────────────────────────────────────────────────────────
const ss = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// ── Ashima snoise (shared GLSL string) ───────────────────────────────────────
const SNOISE = `
vec3 _m289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 _m289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 _perm(vec4 x){return _m289(((x*34.)+1.)*x);}
vec4 _tis(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=_m289(i);
  vec4 p=_perm(_perm(_perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=_tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

// ══════════════════════════════════════════════════════════════════════════════
// STAR FIELD — three parallax layers with twinkling
// ══════════════════════════════════════════════════════════════════════════════
const starVert = /* glsl */`
  attribute float aPhase;
  attribute float aBright;
  uniform float uTime;
  uniform float uWarmth;
  uniform float uScrollY;
  uniform vec2  uMouseShift;
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    float tw = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 1.7 + aPhase));
    vAlpha = aBright * tw;
    vec3 cold = vec3(0.72, 0.84, 1.00);
    vec3 warm = vec3(1.00, 0.88, 0.64);
    vColor = mix(cold, warm, uWarmth);
    vec3 pos = position;
    pos.y = mod(pos.y + uScrollY + 4.5, 9.0) - 4.5;
    pos.xy += uMouseShift;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 1.2 + aBright * 2.2;
  }
`
const starFrag = /* glsl */`
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, (1.0 - d * 2.0) * vAlpha);
  }
`

function StarLayer({ count, parallaxFactor, z }) {
  const matRef     = useRef()
  const scrollLerp = useRef(0)
  const mouseLerp  = useRef({ x: 0.5, y: 0.5 })

  const { positions, phases, brights } = useMemo(() => {
    const p = new Float32Array(count * 3)
    const ph = new Float32Array(count)
    const br = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 5.5
      p[i * 3 + 1] = (Math.random() - 0.5) * 9.0
      p[i * 3 + 2] = z + (Math.random() - 0.5) * 0.8
      ph[i] = Math.random() * Math.PI * 2
      br[i] = 0.25 + Math.random() * 0.75
    }
    return { positions: p, phases: ph, brights: br }
  }, [count, z])

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uWarmth:     { value: 0 },
    uScrollY:    { value: 0 },
    uMouseShift: { value: new THREE.Vector2(0, 0) },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const store = useScrollStore.getState()
    scrollLerp.current += (store.scrollProgress - scrollLerp.current) * 0.04
    const sp = scrollLerp.current
    mouseLerp.current.x += (store.mouseX - mouseLerp.current.x) * 0.06
    mouseLerp.current.y += (store.mouseY - mouseLerp.current.y) * 0.06
    const u = matRef.current.uniforms
    u.uTime.value     = clock.getElapsedTime()
    u.uWarmth.value   = ss(0.55, 0.92, sp)
    u.uScrollY.value  = sp * parallaxFactor * 6.5
    u.uMouseShift.value.set(
      (mouseLerp.current.x - 0.5) * parallaxFactor * 0.22,
      (mouseLerp.current.y - 0.5) * parallaxFactor * 0.14,
    )
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aPhase"   args={[phases,    1]} />
        <bufferAttribute attach="attributes-aBright"  args={[brights,   1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={starVert}
        fragmentShader={starFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

function StarField({ counts }) {
  return (
    <group>
      <StarLayer count={counts[0]} parallaxFactor={0.12} z={-5.5} />
      <StarLayer count={counts[1]} parallaxFactor={0.32} z={-3.2} />
      <StarLayer count={counts[2]} parallaxFactor={0.65} z={-1.5} />
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// COSMIC DUST — soft nebula fog behind the stars
// ══════════════════════════════════════════════════════════════════════════════
const dustFrag = /* glsl */`
  precision mediump float;
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;
  ${SNOISE}
  float fbm(vec3 p){ float v=0.;float a=.5; for(int i=0;i<4;i++){v+=a*snoise(p);p=p*2.1+vec3(1.7,9.2,3.4);a*=.5;} return v; }
  void main(){
    float n = fbm(vec3(vUv * 1.1, uTime * 0.012));
    float a = smoothstep(0.1, 0.6, (n + 1.0) * 0.5) * 0.055;
    vec3 cold  = vec3(0.020, 0.035, 0.072);
    vec3 mid   = vec3(0.040, 0.038, 0.090);
    vec3 warm  = vec3(0.075, 0.048, 0.025);
    float sp = uScroll;
    vec3 col = mix(cold, mid, smoothstep(0.30, 0.62, sp));
    col = mix(col, warm, smoothstep(0.65, 0.92, sp));
    gl_FragColor = vec4(col, a);
  }
`
const uvVert = /* glsl */`
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`

function CosmicDust() {
  const matRef     = useRef()
  const scrollLerp = useRef(0)
  const uniforms   = useMemo(() => ({ uTime: { value: 0 }, uScroll: { value: 0 } }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.03
    matRef.current.uniforms.uTime.value   = clock.getElapsedTime()
    matRef.current.uniforms.uScroll.value = scrollLerp.current
  })

  return (
    <mesh position={[0, 0, -7]}>
      <planeGeometry args={[22, 14]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={uvVert}
        fragmentShader={dustFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ICE PLANET — appears at Difference section
// ══════════════════════════════════════════════════════════════════════════════
const planetVert = /* glsl */`
  varying vec3 vViewPos;
  varying vec3 vViewNorm;
  varying vec3 vLocal;
  void main(){
    vLocal = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos  = mv.xyz;
    vViewNorm = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`
const planetFrag = /* glsl */`
  precision highp float;
  varying vec3 vViewPos;
  varying vec3 vViewNorm;
  varying vec3 vLocal;
  uniform float uOpacity;
  ${SNOISE}
  void main(){
    vec3 viewDir = normalize(-vViewPos);
    float rim = pow(1.0 - max(dot(vViewNorm, viewDir), 0.0), 4.0);
    float tex  = snoise(vLocal * 4.2) * 0.5 + 0.5;
    float det  = snoise(vLocal * 10.5) * 0.5 + 0.5;
    float surf = tex * 0.65 + det * 0.35;
    float crater = smoothstep(0.38, 0.44, tex) * smoothstep(0.56, 0.44, tex);
    vec3 base = mix(vec3(0.08, 0.14, 0.22), vec3(0.14, 0.22, 0.30), surf);
    base = mix(base, vec3(0.04, 0.08, 0.13), crater * 0.65);
    vec3 rimCol = vec3(0.44, 0.64, 0.80);
    vec3 color = mix(base, rimCol, rim * 0.82);
    gl_FragColor = vec4(color, uOpacity);
  }
`

function IcePlanet({ scale }) {
  const outerRef    = useRef()
  const innerRef    = useRef()
  const meshRef     = useRef()
  const atmRef      = useRef()
  const ringRef     = useRef()
  const lightRef    = useRef()
  const labelDivRef = useRef(null)
  const hoveredRef  = useRef(false)
  const scrollLerp  = useRef(0)
  const smoothOp    = useRef(0)
  const smoothSc    = useRef(0.2)

  const uniforms = useMemo(() => ({ uOpacity: { value: 0 } }), [])

  useFrame(({ clock }) => {
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp     = scrollLerp.current
    const rawVis = ss(0.10, 0.17, sp) * (1 - ss(0.30, 0.38, sp))

    smoothOp.current += (rawVis - smoothOp.current) * 0.008
    smoothSc.current += ((0.2 + rawVis * 0.8) - smoothSc.current) * 0.008

    const op  = smoothOp.current
    const hov = hoveredRef.current
    if (!outerRef.current) return

    outerRef.current.visible = op > 0.005

    // x fixed at right edge (partially off-screen), y rises from below
    const x = 1.50
    const y = -1.4 + ss(0.10, 0.28, sp) * 2.0
    outerRef.current.position.set(x * scale, y * scale, -3.2)
    if (innerRef.current) innerRef.current.scale.setScalar(smoothSc.current)
    if (meshRef.current)  meshRef.current.rotation.y += 0.0012

    uniforms.uOpacity.value = op
    if (atmRef.current) atmRef.current.material.opacity = op * 0.13

    const t = clock.getElapsedTime()
    const ringPulse = hov ? 0.30 : 0.06 + Math.sin(t * 1.1) * 0.015
    if (ringRef.current) ringRef.current.material.opacity = op * ringPulse

    if (lightRef.current) lightRef.current.intensity = op * (hov ? 2.2 : 0.8)

    if (labelDivRef.current) {
      labelDivRef.current.style.opacity = op < 0.05 ? '0' : (hov ? '0.9' : '0.2')
      const lineEl = labelDivRef.current.querySelector('.lbl-line')
      if (lineEl) lineEl.style.width = hov ? '24px' : '12px'
    }
  })

  const r = 0.72 * scale
  return (
    <group ref={outerRef} visible={false}>
      <pointLight ref={lightRef} color="#6fa3c7" intensity={0} distance={6} position={[-1.2, 0.5, 0.8]} />

      {/* Entrance-scale group */}
      <group ref={innerRef}>
        {/* Pulsing glow ring */}
        <mesh ref={ringRef} rotation={[Math.PI * 0.15, 0, 0]}>
          <ringGeometry args={[r * 1.30, r * 1.37, 64]} />
          <meshBasicMaterial color="#6fa3c7" transparent opacity={0} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>

        {/* Planet body */}
        <mesh
          ref={meshRef}
          onPointerOver={() => { hoveredRef.current = true; document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { hoveredRef.current = false; document.body.style.cursor = '' }}
          onClick={() => { window.location.href = '/about' }}
        >
          <sphereGeometry args={[r, 64, 64]} />
          <shaderMaterial
            vertexShader={planetVert}
            fragmentShader={planetFrag}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </mesh>

        {/* Atmosphere rim */}
        <mesh ref={atmRef}>
          <sphereGeometry args={[r * 1.14, 32, 32]} />
          <meshBasicMaterial color="#6fa3c7" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Always-visible label — outside innerRef so scale doesn't shift it */}
      <Html center position={[-r * 1.6, -r * 0.9, 0]} style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div
          ref={labelDivRef}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#6fa3c7',
            opacity: 0,
            transition: 'opacity 0.6s ease',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="lbl-line" style={{ display: 'inline-block', width: '12px', height: '1px', background: '#6fa3c7', transition: 'width 0.4s ease', flexShrink: 0 }} />
          ABOUT US
        </div>
      </Html>
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SPACE NEBULA — atmospheric cloud layers at Process section
// ══════════════════════════════════════════════════════════════════════════════
const nebulaFrag = /* glsl */`
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3  uColor;
  ${SNOISE}
  float fbm(vec3 p){ float v=0.;float a=.5; for(int i=0;i<4;i++){v+=a*snoise(p);p=p*2.1+vec3(2.1,8.7,1.9);a*=.5;} return v; }
  void main(){
    float w = fbm(vec3(vUv * 1.4, uTime * 0.008));
    float n = fbm(vec3(vUv * 1.8 + w * 0.35, uTime * 0.010 + 1.0));
    float a = smoothstep(0.05, 0.55, (n + 1.0) * 0.5) * uOpacity;
    gl_FragColor = vec4(uColor, a);
  }
`

function NebulaPlane({ offset, scale, color, z }) {
  const matRef     = useRef()
  const uniforms   = useMemo(() => ({
    uTime:    { value: 0 },
    uOpacity: { value: 0 },
    uColor:   { value: new THREE.Vector3(...color) },
  }), [color])
  const scrollLerp = useRef(0)

  useFrame(({ clock }) => {
    if (!matRef.current) return
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp  = scrollLerp.current
    const vis = ss(0.26, 0.34, sp) * (1 - ss(0.52, 0.60, sp))
    matRef.current.uniforms.uTime.value    = clock.getElapsedTime()
    matRef.current.uniforms.uOpacity.value = vis * 0.055
  })

  return (
    <mesh position={[offset[0] * scale, offset[1] * scale, z]}>
      <planeGeometry args={[4.5 * scale, 3.0 * scale]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={uvVert}
        fragmentShader={nebulaFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function SpaceNebula({ scale }) {
  const planes = [
    { offset: [-0.3,  0.2], color: [0.05, 0.14, 0.22], z: -3.8 },
    { offset: [ 0.4, -0.1], color: [0.06, 0.08, 0.18], z: -4.2 },
    { offset: [ 0.0,  0.4], color: [0.04, 0.14, 0.18], z: -4.5 },
  ]
  return (
    <group>
      {planes.map((p, i) => <NebulaPlane key={i} {...p} scale={scale} />)}
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CONSTELLATION — star pattern at Pricing section
// ══════════════════════════════════════════════════════════════════════════════
const CSTARS = [
  [0.82,  0.35, -2.6],
  [1.10,  0.58, -2.6],
  [1.40,  0.42, -2.6],
  [1.52, -0.10, -2.6],
  [1.22, -0.38, -2.6],
  [0.88, -0.22, -2.6],
]
const CLINES = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4]]

function Constellation({ scale }) {
  const groupRef    = useRef()
  const innerRef    = useRef()
  const starRefs    = useRef([])
  const lineRefs    = useRef([])
  const ringRef     = useRef()
  const labelDivRef = useRef(null)
  const hoveredRef  = useRef(false)
  const scrollLerp  = useRef(0)
  const smoothOp    = useRef(0)
  const smoothSc    = useRef(0.2)

  useFrame(({ clock }) => {
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp     = scrollLerp.current
    const rawVis = ss(0.47, 0.56, sp) * (1 - ss(0.69, 0.77, sp))

    smoothOp.current += (rawVis - smoothOp.current) * 0.008
    smoothSc.current += ((0.2 + rawVis * 0.8) - smoothSc.current) * 0.008

    const op  = smoothOp.current
    const hov = hoveredRef.current
    if (!groupRef.current) return

    groupRef.current.visible = op > 0.005
    if (innerRef.current) innerRef.current.scale.setScalar(smoothSc.current)

    const baseLineColor = hov ? '#4a7a9a' : '#2a4a5a'
    lineRefs.current.forEach(l => {
      if (l?.material) {
        l.material.opacity  = op * (hov ? 0.90 : 0.55)
        l.material.color.set(baseLineColor)
      }
    })
    starRefs.current.forEach(m => {
      if (m?.material) {
        m.material.opacity = op
        m.material.color.set(hov ? '#8fc4e0' : '#a8cce4')
      }
    })

    const t = clock.getElapsedTime()
    const ringPulse = hov ? 0.25 : 0.05 + Math.sin(t * 0.9) * 0.012
    if (ringRef.current) ringRef.current.material.opacity = op * ringPulse

    if (labelDivRef.current) {
      labelDivRef.current.style.opacity = op < 0.05 ? '0' : (hov ? '0.9' : '0.2')
      const lineEl = labelDivRef.current.querySelector('.lbl-line')
      if (lineEl) lineEl.style.width = hov ? '24px' : '12px'
    }
  })

  const scaledStars = CSTARS.map(([x, y, z]) => [x * scale, y * scale, z])
  // Center of constellation for ring placement
  const cx = CSTARS.reduce((s, [x]) => s + x, 0) / CSTARS.length * scale
  const cy = CSTARS.reduce((s, [, y]) => s + y, 0) / CSTARS.length * scale
  const cRadius = 0.50 * scale

  return (
    <group
      ref={groupRef}
      visible={false}
      onPointerOver={() => { hoveredRef.current = true; document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { hoveredRef.current = false; document.body.style.cursor = '' }}
      onClick={() => { window.location.href = '/work' }}
    >
      <group ref={innerRef}>
        {/* Stars */}
        {scaledStars.map((pos, i) => (
          <mesh key={i} ref={el => (starRefs.current[i] = el)} position={pos}>
            <sphereGeometry args={[0.012 * scale, 8, 8]} />
            <meshBasicMaterial color="#a8cce4" transparent opacity={0} />
          </mesh>
        ))}

        {/* Connection lines */}
        {CLINES.map(([a, b], i) => (
          <Line
            key={i}
            ref={el => (lineRefs.current[i] = el)}
            points={[scaledStars[a], scaledStars[b]]}
            color="#2a4a5a"
            lineWidth={1}
            transparent
            opacity={0}
          />
        ))}

        {/* Pulsing halo ring around constellation */}
        <mesh ref={ringRef} position={[cx, cy, -2.6]}>
          <ringGeometry args={[cRadius * 1.05, cRadius * 1.12, 64]} />
          <meshBasicMaterial color="#6fa3c7" transparent opacity={0} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      </group>

      {/* Always-visible label */}
      <Html center position={[scaledStars[3][0] + 0.14, scaledStars[3][1] - 0.08, -2.6]} style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div
          ref={labelDivRef}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#6fa3c7',
            opacity: 0,
            transition: 'opacity 0.6s ease',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="lbl-line" style={{ display: 'inline-block', width: '12px', height: '1px', background: '#6fa3c7', transition: 'width 0.4s ease', flexShrink: 0 }} />
          OUR WORK
        </div>
      </Html>
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// WARM STAR — appears at CTA section, cold→warm transition
// ══════════════════════════════════════════════════════════════════════════════
function WarmStar({ scale }) {
  const groupRef    = useRef()
  const innerRef    = useRef()
  const coreRef     = useRef()
  const coronaRef   = useRef()
  const lightRef    = useRef()
  const raysRef     = useRef([])
  const ringRef     = useRef()
  const labelDivRef = useRef(null)
  const hoveredRef  = useRef(false)
  const scrollLerp  = useRef(0)
  const smoothOp    = useRef(0)
  const smoothSc    = useRef(0.2)

  useFrame(({ clock }) => {
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp     = scrollLerp.current
    const rawVis = ss(0.64, 0.74, sp)

    smoothOp.current += (rawVis - smoothOp.current) * 0.008
    smoothSc.current += ((0.2 + rawVis * 0.8) - smoothSc.current) * 0.008

    const op  = smoothOp.current
    const hov = hoveredRef.current
    if (!groupRef.current) return

    groupRef.current.visible = op > 0.005

    // Bottom-right corner — x fixed, y rises to -0.6
    const x = 1.0
    const y = -1.80 + ss(0.64, 0.80, sp) * 1.20
    groupRef.current.position.set(x * scale, y * scale, -2.2)
    if (innerRef.current) innerRef.current.scale.setScalar(smoothSc.current)

    const t = clock.getElapsedTime()
    const pulse = 0.9 + Math.sin(t * 0.9) * 0.1

    if (coreRef.current)   coreRef.current.material.opacity   = op
    if (coronaRef.current) coronaRef.current.material.opacity = op * 0.12 * pulse
    if (lightRef.current)  lightRef.current.intensity = op * (hov ? 3.5 : 1.8) * pulse

    raysRef.current.forEach((r, i) => {
      if (!r) return
      r.material.opacity = op * (hov ? 0.18 : 0.08)
      r.rotation.z = (i / raysRef.current.length) * Math.PI + t * 0.06
    })

    const ringPulse = hov ? 0.28 : 0.05 + Math.sin(t * 1.3) * 0.012
    if (ringRef.current) ringRef.current.material.opacity = op * ringPulse

    if (labelDivRef.current) {
      labelDivRef.current.style.opacity = op < 0.05 ? '0' : (hov ? '0.9' : '0.2')
      const lineEl = labelDivRef.current.querySelector('.lbl-line')
      if (lineEl) lineEl.style.width = hov ? '24px' : '12px'
    }
  })

  const cr = 0.11 * scale
  const RAY_ANGLES = [0, 30, 60, 90, 120, 150]

  return (
    <group ref={groupRef} visible={false}>
      <pointLight ref={lightRef} color="#d4a850" intensity={0} distance={8} />

      <group ref={innerRef}>
        {/* Pulsing glow ring */}
        <mesh ref={ringRef}>
          <ringGeometry args={[cr * 1.8, cr * 1.95, 64]} />
          <meshBasicMaterial color="#d4a050" transparent opacity={0} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>

        {/* Core */}
        <mesh
          ref={coreRef}
          onPointerOver={() => { hoveredRef.current = true; document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { hoveredRef.current = false; document.body.style.cursor = '' }}
          onClick={() => { window.location.href = '/contact' }}
        >
          <sphereGeometry args={[cr, 24, 24]} />
          <meshBasicMaterial color="#fff8e8" transparent opacity={0} />
        </mesh>

        {/* Corona glow */}
        <mesh ref={coronaRef}>
          <sphereGeometry args={[cr * 4.5, 24, 24]} />
          <meshBasicMaterial color="#d4a050" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* Rays */}
        {RAY_ANGLES.map((deg, i) => (
          <mesh
            key={i}
            ref={el => (raysRef.current[i] = el)}
            rotation={[0, 0, (deg * Math.PI) / 180]}
          >
            <planeGeometry args={[cr * 0.18, cr * 14, 1, 1]} />
            <meshBasicMaterial color="#d4a050" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* Always-visible label — outside innerRef */}
      <Html center position={[-cr * 7, -cr * 1.5, 0]} style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div
          ref={labelDivRef}
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#d4a050',
            opacity: 0,
            transition: 'opacity 0.6s ease',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span className="lbl-line" style={{ display: 'inline-block', width: '12px', height: '1px', background: '#d4a050', transition: 'width 0.4s ease', flexShrink: 0 }} />
          CONTACT
        </div>
      </Html>
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CLICKABLE NAV STARS — scattered bright stars linking to pages
// ══════════════════════════════════════════════════════════════════════════════
const NAV_STAR_DATA = [
  { pos: [ 0.82,  0.55, -2.0], label: 'SERVICES', href: '/services', range: [0.04, 0.22] },
  { pos: [-0.72, -0.12, -2.5], label: 'BLOG',     href: '/blog',     range: [0.32, 0.52] },
  { pos: [ 0.75,  0.72, -3.0], label: 'FAQ',       href: '/faq',      range: [0.56, 0.78] },
]

function NavStar({ pos, label, href, range, scale }) {
  const meshRef    = useRef()
  const glowRef    = useRef()
  const [hovered, setHovered] = useState(false)
  const hoveredRef = useRef(false)
  const scrollLerp = useRef(0)
  const smoothOp   = useRef(0)

  useFrame(({ clock }) => {
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp     = scrollLerp.current
    const rawVis = ss(range[0], range[0] + 0.08, sp) * (1 - ss(range[1] - 0.06, range[1], sp))
    smoothOp.current += (rawVis - smoothOp.current) * 0.008
    const op  = smoothOp.current
    const hov = hoveredRef.current
    if (!meshRef.current) return
    meshRef.current.visible = op > 0.005
    if (glowRef.current) glowRef.current.visible = op > 0.005
    const pulse = 0.7 + 0.3 * Math.sin(clock.getElapsedTime() * 1.4 + pos[0] * 10)
    meshRef.current.material.opacity = op * (hov ? 1.0 : 0.75) * pulse
    if (glowRef.current) glowRef.current.material.opacity = op * (hov ? 0.35 : 0.12) * pulse
  })

  const scaledPos = [pos[0] * scale, pos[1] * scale, pos[2]]
  const r = 0.018 * scale

  return (
    <group>
      <mesh
        ref={meshRef}
        position={scaledPos}
        visible={false}
        onPointerOver={() => { setHovered(true); hoveredRef.current = true; document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); hoveredRef.current = false; document.body.style.cursor = '' }}
        onClick={() => { window.location.href = href }}
      >
        <sphereGeometry args={[r, 8, 8]} />
        <meshBasicMaterial color={hovered ? '#c0d8f0' : '#8fc4e0'} transparent opacity={0} />
        {hovered && (
          <Html center position={[r * 4, r * 4, 0]} style={{ zIndex: 10, pointerEvents: 'none' }}>
            <span style={{ fontFamily: '"DM Sans"', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6fa3c7', whiteSpace: 'nowrap', background: 'rgba(5,5,8,0.75)', padding: '2px 6px', borderRadius: 2 }}>
              {label} →
            </span>
          </Html>
        )}
      </mesh>
      <mesh ref={glowRef} position={scaledPos} visible={false}>
        <sphereGeometry args={[r * 5, 8, 8]} />
        <meshBasicMaterial color="#6fa3c7" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

function ClickableStars({ scale }) {
  return (
    <group>
      {NAV_STAR_DATA.map((s, i) => <NavStar key={i} {...s} scale={scale} />)}
    </group>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE
// ══════════════════════════════════════════════════════════════════════════════
function Scene({ isMobile, isTablet }) {
  const counts = isMobile ? [150, 75, 25] : isTablet ? [200, 100, 35] : [300, 150, 50]
  const scale  = isMobile ? 0.60 : isTablet ? 0.80 : 1.0

  return (
    <>
      <ambientLight intensity={0.12} color="#8fc4e0" />
      <directionalLight position={[-3, 2, 2]} intensity={0.5} color="#8fc4e0" />

      <CosmicDust />
      <StarField counts={counts} />
      <IcePlanet scale={scale} />
      <SpaceNebula scale={scale} />
      <Constellation scale={scale} />
      <WarmStar scale={scale} />
      <ClickableStars scale={scale} />

      <EffectComposer>
        <Bloom intensity={0.40} luminanceThreshold={0.15} luminanceSmoothing={0.90} mipmapBlur />
        <Vignette darkness={0.55} offset={0.28} />
      </EffectComposer>
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export default function Background3D() {
  const isMobile = useRef(window.innerWidth < 768).current
  const isTablet = useRef(window.innerWidth >= 768 && window.innerWidth < 1024).current

  useEffect(() => {
    const { setScroll, setMouse } = useScrollStore.getState()
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }
    const onMove = (e) => setMouse(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Canvas
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        dpr={isMobile ? [1, 1] : isTablet ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 1], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: false, toneMapping: THREE.NoToneMapping }}
        onCreated={({ gl }) => gl.setClearColor(0x050508, 1)}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Scene isMobile={isMobile} isTablet={isTablet} />
      </Canvas>
    </ErrorBoundary>
  )
}
