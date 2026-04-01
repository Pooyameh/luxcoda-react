import { useRef, useMemo, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
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
// STAR FIELD — three parallax layers, color shifts with scroll zones
// ══════════════════════════════════════════════════════════════════════════════
const starVert = /* glsl */`
  attribute float aPhase;
  attribute float aBright;
  uniform float uTime;
  uniform vec3  uStarColor;
  uniform float uScrollY;
  uniform vec2  uMouseShift;
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    float tw = 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 1.7 + aPhase));
    vAlpha = aBright * tw;
    vColor = uStarColor;
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
  const colorLerp  = useRef(new THREE.Color(0.70, 0.80, 1.00))

  const { positions, phases, brights } = useMemo(() => {
    const p  = new Float32Array(count * 3)
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
    uStarColor:  { value: new THREE.Color(0.70, 0.80, 1.00) },
    uScrollY:    { value: 0 },
    uMouseShift: { value: new THREE.Vector2(0, 0) },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const store = useScrollStore.getState()
    scrollLerp.current += (store.scrollProgress - scrollLerp.current) * 0.04
    const sp = scrollLerp.current

    // Star tint shifts with scroll zones
    let tr = 0.70, tg = 0.80, tb = 1.00
    if      (sp < 0.30) { tr = 0.70; tg = 0.80; tb = 1.00 }
    else if (sp < 0.55) { tr = 0.60; tg = 0.65; tb = 1.00 }
    else if (sp < 0.75) { tr = 0.80; tg = 0.60; tb = 1.00 }
    else                { tr = 1.00; tg = 0.85; tb = 0.70 }

    colorLerp.current.r += (tr - colorLerp.current.r) * 0.025
    colorLerp.current.g += (tg - colorLerp.current.g) * 0.025
    colorLerp.current.b += (tb - colorLerp.current.b) * 0.025

    mouseLerp.current.x += (store.mouseX - mouseLerp.current.x) * 0.06
    mouseLerp.current.y += (store.mouseY - mouseLerp.current.y) * 0.06

    const u = matRef.current.uniforms
    u.uTime.value     = clock.getElapsedTime()
    u.uStarColor.value.copy(colorLerp.current)
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
// UV VERTEX SHADER — shared by full-screen planes
// ══════════════════════════════════════════════════════════════════════════════
const uvVert = /* glsl */`
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`

// ══════════════════════════════════════════════════════════════════════════════
// COLOR FLOW PLANE — heavy, obvious section-by-section color shifts
// ══════════════════════════════════════════════════════════════════════════════
const colorFlowFrag = /* glsl */`
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uMouse;
  ${SNOISE}
  float fbm(vec3 p){
    float v=0.;float a=.5;
    for(int i=0;i<5;i++){v+=a*snoise(p);p=p*2.1+vec3(1.7,9.2,3.4);a*=.5;}
    return v;
  }
  void main(){
    // Mouse-driven warp
    vec2 mouseOffset = (uMouse - 0.5) * 0.12;
    vec2 uv = vUv + mouseOffset;

    // Domain warp — feed fbm into fbm for organic flow
    float wx = fbm(vec3(uv * 1.2,       uTime * 0.06));
    float wy = fbm(vec3(uv * 1.2 + 5.2, uTime * 0.06 + 1.0));
    vec2 warped = uv + vec2(wx, wy) * 0.30;

    float n       = fbm(vec3(warped * 2.0,        uTime * 0.08));
    float nDetail = fbm(vec3(warped * 4.0 + 50.0, uTime * 0.12));

    float sp = uScroll;

    // Zone weights — overlap so transitions are smooth but zones are distinct
    float zHero  = 1.0 - smoothstep(0.0,  0.18, sp);
    float zDiff  = smoothstep(0.08, 0.18, sp) * (1.0 - smoothstep(0.22, 0.32, sp));
    float zProc  = smoothstep(0.22, 0.32, sp) * (1.0 - smoothstep(0.44, 0.54, sp));
    float zPrice = smoothstep(0.44, 0.54, sp) * (1.0 - smoothstep(0.62, 0.72, sp));
    float zCta   = smoothstep(0.62, 0.72, sp) * (1.0 - smoothstep(0.76, 0.86, sp));
    float zCont  = smoothstep(0.76, 0.86, sp);

    // Remap noise to 0-1 range for mixing
    float nm = smoothstep(-0.5, 0.8, n);
    float nd = smoothstep(-0.3, 0.8, nDetail);

    // Hero: deep blue-black space
    vec3 heroColor  = mix(vec3(0.02,0.03,0.07), vec3(0.06,0.10,0.18), nm * 0.5);

    // Difference: bioluminescent teal currents
    vec3 diffColor  = mix(vec3(0.03,0.06,0.10), vec3(0.05,0.15,0.22), nm * 0.6);

    // Process: electric blue with violet peaks
    vec3 procColor  = mix(vec3(0.03,0.04,0.12), vec3(0.08,0.12,0.30), nm * 0.5);
    procColor  = mix(procColor, vec3(0.15,0.10,0.30), nd * 0.2);

    // Pricing: deep purple-violet (most distinctly different)
    vec3 priceColor = mix(vec3(0.05,0.03,0.10), vec3(0.12,0.06,0.22), nm * 0.6);
    priceColor = mix(priceColor, vec3(0.20,0.08,0.28), nd * 0.25);

    // CTA: warming to magenta
    vec3 ctaColor   = mix(vec3(0.08,0.03,0.08), vec3(0.18,0.06,0.14), nm * 0.5);

    // Contact: ember warmth
    vec3 contColor  = mix(vec3(0.06,0.04,0.03), vec3(0.12,0.08,0.04), nm * 0.5);

    // Blend zones — only active zone contributes
    vec3 color = heroColor  * zHero
               + diffColor  * zDiff
               + procColor  * zProc
               + priceColor * zPrice
               + ctaColor   * zCta
               + contColor  * zCont;

    float a = smoothstep(0.15, 0.7, (n + 1.0) * 0.5) * 0.85;
    gl_FragColor = vec4(color, a);
  }
`

function ColorFlowPlane() {
  const matRef     = useRef()
  const scrollLerp = useRef(0)
  const mouseLerp  = useRef({ x: 0.5, y: 0.5 })
  const uniforms   = useMemo(() => ({
    uTime:   { value: 0 },
    uScroll: { value: 0 },
    uMouse:  { value: new THREE.Vector2(0.5, 0.5) },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const store = useScrollStore.getState()
    scrollLerp.current += (store.scrollProgress - scrollLerp.current) * 0.03
    mouseLerp.current.x += (store.mouseX - mouseLerp.current.x) * 0.05
    mouseLerp.current.y += (store.mouseY - mouseLerp.current.y) * 0.05
    matRef.current.uniforms.uTime.value   = clock.getElapsedTime()
    matRef.current.uniforms.uScroll.value = scrollLerp.current
    matRef.current.uniforms.uMouse.value.set(mouseLerp.current.x, mouseLerp.current.y)
  })

  return (
    <mesh position={[0, 0, -7]}>
      <planeGeometry args={[22, 14]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={uvVert}
        fragmentShader={colorFlowFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE
// ══════════════════════════════════════════════════════════════════════════════
function Scene({ isMobile, isTablet }) {
  const counts = isMobile ? [150, 75, 25] : isTablet ? [200, 100, 35] : [300, 150, 50]

  return (
    <>
      <ambientLight intensity={0.12} color="#8fc4e0" />
      <ColorFlowPlane />
      <StarField counts={counts} />
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
      >
        <Scene isMobile={isMobile} isTablet={isTablet} />
      </Canvas>
    </ErrorBoundary>
  )
}
