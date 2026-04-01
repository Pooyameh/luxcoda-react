import { useRef, useMemo, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useScrollStore } from '../useScrollEvents'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

// ─── Vertex shader — NDC quad, UV derived from position ──────────────────────
const vert = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// ─── Fragment shader — cold depth field ──────────────────────────────────────
const frag = /* glsl */`
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uPulse;
  varying vec2  vUv;

  // ── Ashima simplex 3D noise ──────────────────────────────────────────────────
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
    float v=0.;float a=.5;
    p += vec3(0.0);
    for(int i=0;i<5;i++){
      v+=a*snoise(p);
      p=p*2.1+vec3(1.7,9.2,3.4);
      a*=0.45;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float t  = uTime * 0.06;

    // ── Mouse warp — bends noise field like pushing water ────────────────────
    vec2 m     = uMouse;
    float mDist = length(uv - m);
    vec2 mWarp  = (uv - m) * smoothstep(0.35, 0.0, mDist) * 0.06;
    vec2 warpedUV = uv + mWarp;

    // ── Scroll energy — peaks in middle of page ──────────────────────────────
    float scrollEase = uScroll;
    float energy = 0.30 + sin(scrollEase * 3.14159) * 0.70;

    float speed = t * (0.8 + energy * 0.4);

    // ── Noise layers ─────────────────────────────────────────────────────────
    float n1 = fbm(vec3(warpedUV * 1.8, speed * 0.5));
    float n2 = fbm(vec3(warpedUV * 3.5 + 40.0, speed * 0.7));
    float n3 = fbm(vec3(warpedUV * 6.0 + 80.0, speed * 1.0));
    float nMain = n1 * 0.55 + n2 * 0.30 + n3 * 0.15;

    // ── Domain warping (feeds noise into noise — organic fluid shapes) ────────
    float warp   = fbm(vec3(warpedUV * 2.0 + n1 * 0.3, speed * 0.4));
    float nWarp  = fbm(vec3(warpedUV * 2.5 + warp * 0.4, speed * 0.6));

    // ── Cold color palette ────────────────────────────────────────────────────
    vec3 void_black = vec3(0.020, 0.020, 0.040);
    vec3 deep_navy  = vec3(0.030, 0.040, 0.080);
    vec3 steel      = vec3(0.060, 0.080, 0.120);
    vec3 ice_dark   = vec3(0.080, 0.120, 0.180);
    vec3 ice_mid    = vec3(0.120, 0.180, 0.250);
    vec3 ice_light  = vec3(0.180, 0.280, 0.380);
    vec3 silver     = vec3(0.250, 0.280, 0.320);
    vec3 warm_hint  = vec3(0.130, 0.110, 0.090);

    // ── Base layer ────────────────────────────────────────────────────────────
    vec3 color = mix(void_black, deep_navy, smoothstep(-0.3, 0.3, n1));

    // ── Flowing currents ──────────────────────────────────────────────────────
    float current1 = smoothstep(0.10, 0.55, nWarp) * energy;
    color = mix(color, steel, current1 * 0.6);

    float current2 = smoothstep(0.25, 0.60, nMain) * energy;
    color = mix(color, ice_dark, current2 * 0.4);

    // ── Ice-blue highlights — bioluminescence ─────────────────────────────────
    float highlight = smoothstep(0.40, 0.75, nWarp * nMain + 0.1);
    color = mix(color, ice_mid, highlight * energy * 0.35);

    float bright = smoothstep(0.55, 0.80, nWarp * n2);
    color = mix(color, ice_light, bright * energy * 0.20);

    // Ultra-rare silver peaks (only in middle scroll zone)
    float silverPeak = smoothstep(0.65, 0.85, nWarp * nMain * n2);
    color = mix(color, silver, silverPeak * energy * 0.10);

    // ── Hero: focused moonlight glow at top ──────────────────────────────────
    float heroFade = 1.0 - smoothstep(0.0, 0.22, scrollEase);
    float heroGlow = exp(-2.5 * length(uv - vec2(0.55, 0.40)));
    color += ice_dark * heroGlow * heroFade * 0.28;

    // ── Pricing zone: barely perceptible warm undertone ──────────────────────
    float pricingZone = smoothstep(0.40, 0.55, scrollEase) * smoothstep(0.70, 0.55, scrollEase);
    color = mix(color, warm_hint, smoothstep(0.30, 0.60, nMain) * pricingZone * 0.08);

    // ── Contact/end: deeper void settling ────────────────────────────────────
    float contactFade = smoothstep(0.75, 0.95, scrollEase);
    color = mix(color, void_black, contactFade * 0.50);

    // ── Moving light source that slowly sweeps across ─────────────────────────
    vec2 lightPos = vec2(
      0.5 + sin(uTime * 0.12) * 0.30,
      0.5 + cos(uTime * 0.09) * 0.20
    );
    float lightDist = length(uv - lightPos);
    float lightBeam = exp(-3.0 * lightDist);
    color += ice_dark * lightBeam * energy * 0.12;

    // ── Section-change brightness flash (subtle, not geometric) ──────────────
    color *= 1.0 + uPulse * 0.12;

    // ── Vignette ─────────────────────────────────────────────────────────────
    float vig = 1.0 - length(uv - 0.5) * 0.65;
    color *= vig;

    // ── Film grain ────────────────────────────────────────────────────────────
    float grain = fract(sin(dot(uv * uTime * 80.0, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.010;

    gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
  }
`

// ─── Cold Fluid Plane ────────────────────────────────────────────────────────
function ColdFluidPlane() {
  const matRef     = useRef()
  const scrollLerp = useRef(0)
  const lastPulse  = useRef(null)

  const uniforms = useMemo(() => ({
    uTime:   { value: 0 },
    uMouse:  { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uPulse:  { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const u     = matRef.current.uniforms
    const store = useScrollStore.getState()

    u.uTime.value = clock.getElapsedTime()
    u.uMouse.value.set(store.mouseX, store.mouseY)

    scrollLerp.current += (store.scrollProgress - scrollLerp.current) * 0.04
    u.uScroll.value = scrollLerp.current

    // Section-change flash
    const pulse = store.pulseEvent
    if (pulse && pulse !== lastPulse.current) {
      lastPulse.current = pulse
      u.uPulse.value = 1.0
    }
    u.uPulse.value *= 0.94   // fast decay — just a flash
    if (u.uPulse.value < 0.005) u.uPulse.value = 0
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

// ─── Ice blue particles ───────────────────────────────────────────────────────
function ParticleField({ count }) {
  const geoRef     = useRef()
  const matRef     = useRef()
  const scrollLerp = useRef(0)

  const { positions, offsets, speeds } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const offs = new Float32Array(count)
    const spds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 3.6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.0 - 0.4
      offs[i] = Math.random() * Math.PI * 2
      spds[i] = 0.10 + Math.random() * 0.12
    }
    return { positions: pos, offsets: offs, speeds: spds }
  }, [count])

  const basePos = useMemo(() => positions.slice(), [positions])

  useFrame(({ clock }) => {
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp       = scrollLerp.current
    const sinCurve = Math.sin(sp * Math.PI)
    const t        = clock.getElapsedTime()

    if (geoRef.current) {
      const arr = geoRef.current.attributes.position.array
      for (let i = 0; i < count; i++) {
        arr[i * 3] = basePos[i * 3] + Math.cos(t * speeds[i] + offsets[i]) * 0.12
        const drift = t * (0.02 + sinCurve * 0.03) * speeds[i] * 8
        let   y     = basePos[i * 3 + 1] + Math.sin(t * speeds[i] + offsets[i]) * 0.14 + drift
        if (y > 1.2) y -= 2.4
        arr[i * 3 + 1] = y
      }
      geoRef.current.attributes.position.needsUpdate = true
    }

    if (matRef.current) {
      const tOp   = 0.06 + sinCurve * 0.14
      const tSize = 0.003 + sinCurve * 0.003
      matRef.current.opacity += (tOp   - matRef.current.opacity) * 0.03
      matRef.current.size    += (tSize - matRef.current.size)    * 0.03
    }
  })

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#6fa3c7"
        size={0.003}
        sizeAttenuation
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ isMobile }) {
  return (
    <>
      <ColdFluidPlane />
      <ParticleField count={isMobile ? 30 : 80} />
      <EffectComposer>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.95}
          mipmapBlur
        />
        <Vignette darkness={0.50} offset={0.30} />
      </EffectComposer>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Background3D() {
  const isMobile = useRef(window.innerWidth < 768).current

  useEffect(() => {
    const setMouse = useScrollStore.getState().setMouse
    const onMove  = (e) => setMouse(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    const onTouch = (e) => {
      if (e.touches.length > 0)
        setMouse(e.touches[0].clientX / window.innerWidth, 1 - e.touches[0].clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove,  { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Canvas
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        camera={{ position: [0, 0, 1], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: false, toneMapping: THREE.NoToneMapping }}
        onCreated={({ gl }) => gl.setClearColor(0x050508, 1)}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </ErrorBoundary>
  )
}
