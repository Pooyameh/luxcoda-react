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

// ─── NDC Vertex Shader ────────────────────────────────────────────────────────
const ndcVert = /* glsl */`
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// ─── Fragment Shader ─────────────────────────────────────────────────────────
const fluidFrag = /* glsl */`
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform vec2  uResolution;
  uniform float uPulse;
  uniform vec2  uPulseOrigin;
  uniform vec3  uPulseColor;

  // ── Ashima simplex noise ─────────────────────────────────────────────────────
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

  float fbm(vec3 p, int octaves){
    float v=0.;float a=.5;float f=1.;
    for(int i=0;i<6;i++){
      if(i>=octaves) break;
      v+=a*snoise(p*f);a*=.5;f*=2.;
    }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float sp = uScroll;

    // ── Mouse distortion + pulse warp ────────────────────────────────────────
    vec2 toMouse = uv - uMouse;
    float md = length(toMouse);
    vec2 distort = normalize(toMouse + 0.001) * smoothstep(0.55, 0.0, md) * 0.08;

    // Pulse temporarily warps the noise field away from the pulse origin
    vec2 toPulse  = uv - uPulseOrigin;
    float pdLen   = length(toPulse);
    float pulseRippleWarp = exp(-3.0 * pdLen) * uPulse * 0.06;
    vec2 pulseWarp = normalize(toPulse + 0.001) * pulseRippleWarp;

    vec2 duv = uv + distort + pulseWarp;

    // ── Scroll zone parameters ────────────────────────────────────────────────
    float sinCurve   = sin(sp * 3.14159265);
    float speedMult  = 1.0 + sinCurve * 1.2;
    float noiseScale = mix(1.4, 2.8, sinCurve);
    float animTime   = uTime * speedMult;

    // ── FBM noise ─────────────────────────────────────────────────────────────
    float n  = fbm(vec3(duv * noiseScale,               animTime),   5);
    float n2 = fbm(vec3(duv * noiseScale * 0.6 + vec2(3.7, 2.1), animTime * 0.5 + 1.5), 5);
    n  = (n  + 1.0) * 0.5;
    n2 = (n2 + 1.0) * 0.5;

    // ── Color palette ─────────────────────────────────────────────────────────
    vec3 nearBlack = vec3(0.040, 0.025, 0.010);
    vec3 chocolate = vec3(0.120, 0.070, 0.030);
    vec3 amber     = vec3(0.220, 0.130, 0.040);
    vec3 gold      = vec3(0.350, 0.220, 0.060);
    vec3 hotGold   = vec3(0.500, 0.320, 0.080);

    // ── Base color ────────────────────────────────────────────────────────────
    float baseWarm = 0.30 + sinCurve * 0.50;
    vec3 col = mix(nearBlack, chocolate, smoothstep(0.15, 0.60, n) * baseWarm);
    col = mix(col, amber,   smoothstep(0.42, 0.78, n2) * (0.50 + sinCurve * 0.45));
    col = mix(col, gold,    smoothstep(0.60, 0.90, n * n2) * (sinCurve * 0.80 + 0.15));
    col = mix(col, hotGold, smoothstep(0.72, 0.95, n) * sinCurve * 0.55);

    // ── Hero glow (always-on at hero, fades as you scroll) ───────────────────
    float heroFade = smoothstep(0.28, 0.0, sp);
    vec2  glowPos  = vec2(0.72, 0.48);
    float heroGlow = exp(-2.5 * length(uv - glowPos)) * (0.38 + heroFade * 0.42);
    col += amber * heroGlow;

    // ── Hero: concentric soft portal rings ────────────────────────────────────
    float heroRings = sin(length(uv - vec2(0.5, 0.5)) * 22.0 - uTime * 0.6) * 0.5 + 0.5;
    heroRings *= smoothstep(0.62, 0.0, length(uv - vec2(0.5, 0.5)));
    col += amber * heroRings * heroFade * 0.05;

    // ── Warm zone glow (Difference / first scroll beats) ─────────────────────
    float warmZone = smoothstep(0.10, 0.30, sp) * smoothstep(0.52, 0.32, sp);
    float warmGlow = exp(-3.0 * length(uv - vec2(0.35, 0.55))) * warmZone * 0.55;
    col += chocolate * warmGlow;

    // ── notUs supernova burst (peaks ~scroll 0.20) ────────────────────────────
    float notUsZone = smoothstep(0.13, 0.22, sp) * smoothstep(0.32, 0.22, sp);
    float burst     = exp(-1.8 * length(uv - vec2(0.5, 0.42)));
    col += hotGold * burst * notUsZone * 0.50;

    // ── Process: diagonal light streaks ───────────────────────────────────────
    float processZone = smoothstep(0.28, 0.40, sp) * smoothstep(0.60, 0.48, sp);
    float streaks     = sin((uv.x + uv.y) * 28.0 + uTime * 0.35) * 0.5 + 0.5;
    streaks           = pow(streaks, 9.0);
    col += amber * streaks * processZone * 0.07;

    // ── Gold zone peak glow (Pricing) ─────────────────────────────────────────
    float goldZone = smoothstep(0.38, 0.54, sp) * smoothstep(0.74, 0.54, sp);
    float goldGlow = exp(-2.0 * length(uv - vec2(0.50, 0.45))) * goldZone * 0.65;
    col += gold * goldGlow;

    // ── Pricing: breathing brightness ─────────────────────────────────────────
    float breathe = sin(uTime * 0.8) * 0.5 + 0.5;
    col += gold * breathe * goldZone * 0.07;

    // ── CTA: center brightening (draws eye to CTA button) ────────────────────
    float ctaZone     = smoothstep(0.64, 0.72, sp) * smoothstep(0.84, 0.72, sp);
    float centerBright = exp(-2.8 * length(uv - vec2(0.5, 0.5)));
    col += hotGold * centerBright * ctaZone * 0.14;

    // ── End zone embers (TechStack → Contact) ────────────────────────────────
    float endZone = smoothstep(0.74, 0.90, sp);
    float endGlow = exp(-3.2 * length(uv - vec2(0.28, 0.50))) * endZone * 0.42;
    col += chocolate * endGlow;

    // ── Caustic sparkle layer ─────────────────────────────────────────────────
    float caustic = fbm(vec3(duv * 4.5, animTime * 0.7 + 3.0), 4);
    caustic = (caustic + 1.0) * 0.5;
    col += hotGold * smoothstep(0.78, 0.98, caustic) * sinCurve * 0.20;

    // ── Directional light sliding right → left ────────────────────────────────
    vec2  lightPos = mix(vec2(0.78, 0.52), vec2(0.22, 0.42), sp);
    float lDist    = length(uv - lightPos);
    float light    = smoothstep(0.90, 0.0, lDist) * (0.10 + sinCurve * 0.16);
    col += vec3(light * 0.85, light * 0.60, light * 0.20);

    // ── PULSE SHOCKWAVE RING ──────────────────────────────────────────────────
    // Ring starts at origin and expands outward as uPulse decays 1→0
    float ringRadius = (1.0 - uPulse) * 0.75;
    float ringHW     = 0.055;
    float pDist2     = length(uv - uPulseOrigin);
    float pulseRing  = smoothstep(ringRadius - ringHW, ringRadius, pDist2)
                     * smoothstep(ringRadius + ringHW, ringRadius, pDist2);
    col += uPulseColor * pulseRing * uPulse * 2.0;

    // Flash at origin when pulse first fires (uPulse near 1)
    float flashGlow = exp(-6.0 * pDist2) * pow(uPulse, 3.0) * 0.8;
    col += uPulseColor * flashGlow;

    // ── Vignette ──────────────────────────────────────────────────────────────
    float vig = 1.0 - smoothstep(0.28, 0.88, length(uv - 0.5) * 1.4);
    col *= mix(0.45, 1.0, vig);

    // ── Minimum floor — never pure black ─────────────────────────────────────
    col = max(col, vec3(0.025, 0.015, 0.005));

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── FluidPlane ───────────────────────────────────────────────────────────────
function FluidPlane({ reducedDetail }) {
  const matRef      = useRef()
  const lastPulse   = useRef(null)
  const scrollLerp  = useRef(0)

  const uniforms = useMemo(() => ({
    uTime:        { value: 0 },
    uMouse:       { value: new THREE.Vector2(0.5, 0.5) },
    uScroll:      { value: 0 },
    uResolution:  { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uPulse:       { value: 0 },
    uPulseOrigin: { value: new THREE.Vector2(0.5, 0.5) },
    uPulseColor:  { value: new THREE.Vector3(0.35, 0.22, 0.06) },
  }), [])

  useEffect(() => {
    const onResize = () => uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [uniforms])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const u = matRef.current.uniforms

    u.uTime.value = clock.getElapsedTime() * 0.09

    const store = useScrollStore.getState()
    u.uMouse.value.set(store.mouseX, store.mouseY)

    // Lerped scroll for smooth zone transitions
    scrollLerp.current += (store.scrollProgress - scrollLerp.current) * 0.04
    u.uScroll.value = scrollLerp.current

    // Pulse detection — each component tracks lastPulse.id independently
    const pulse = store.pulseEvent
    if (pulse && pulse !== lastPulse.current) {
      lastPulse.current = pulse
      if (pulse.intensity > 0) {
        u.uPulse.value = pulse.intensity
        u.uPulseOrigin.value.set(pulse.origin[0], pulse.origin[1])
        u.uPulseColor.value.set(pulse.color[0], pulse.color[1], pulse.color[2])
      }
    }

    // Decay pulse every frame
    u.uPulse.value *= 0.972
    if (u.uPulse.value < 0.005) u.uPulse.value = 0
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={ndcVert}
        fragmentShader={fluidFrag}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

// ─── OrbSystem — 4 glowing spheres that orbit, drift, and repel from mouse ───
const ORB_CONFIG = [
  { base: [0.45,  0.18, 0.05], r: 0.16, speed: 0.28, color: new THREE.Color(0.38, 0.24, 0.07) },
  { base: [-0.40, -0.12, 0.02], r: 0.11, speed: 0.45, color: new THREE.Color(0.30, 0.18, 0.05) },
  { base: [0.15,  -0.38, 0.08], r: 0.13, speed: 0.36, color: new THREE.Color(0.42, 0.26, 0.07) },
  { base: [-0.25,  0.32, 0.04], r: 0.09, speed: 0.52, color: new THREE.Color(0.26, 0.16, 0.05) },
]

function OrbSystem() {
  const meshRefs = useRef([])
  const orbPos   = useRef(ORB_CONFIG.map(o => new THREE.Vector3(...o.base)))
  const scrollLerp = useRef(0)

  useFrame(({ clock }) => {
    const t      = clock.getElapsedTime()
    const store  = useScrollStore.getState()
    scrollLerp.current += (store.scrollProgress - scrollLerp.current) * 0.03
    const sp     = scrollLerp.current
    const mx     = (store.mouseX - 0.5) * 2
    const my     = (store.mouseY - 0.5) * 2

    ORB_CONFIG.forEach((cfg, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return

      const angle = t * cfg.speed * 0.3 + i * Math.PI * 0.5
      const orbit = 0.08 + sp * 0.22             // orbit radius widens with scroll
      const scrollShift = sp * (i % 2 === 0 ? 0.3 : -0.3)

      const targetX = cfg.base[0] + Math.cos(angle) * orbit + scrollShift
      const targetY = cfg.base[1] + Math.sin(angle) * orbit
      const targetZ = cfg.base[2]

      const pos = orbPos.current[i]
      pos.x += (targetX - pos.x) * 0.02
      pos.y += (targetY - pos.y) * 0.02

      // Mouse repulsion
      const dx   = pos.x - mx * 1.0
      const dy   = pos.y - my * 0.6
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.45) {
        const push = (0.45 - dist) * 0.012
        pos.x += (dx / (dist + 0.001)) * push
        pos.y += (dy / (dist + 0.001)) * push
      }

      mesh.position.set(pos.x, pos.y, targetZ)

      // Opacity brightens in warm zone
      const sinCurve = Math.sin(sp * Math.PI)
      mesh.material.opacity = 0.06 + sinCurve * 0.12
    })
  })

  return (
    <group>
      {ORB_CONFIG.map((cfg, i) => (
        <mesh key={i} ref={el => (meshRefs.current[i] = el)} position={cfg.base}>
          <sphereGeometry args={[cfg.r, 16, 16]} />
          <meshBasicMaterial
            color={cfg.color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── RippleSystem — pool of 5 expanding rings ─────────────────────────────────
const RIPPLE_POOL = 5

function RippleSystem() {
  const meshRefs = useRef([])
  const pool     = useRef(
    Array.from({ length: RIPPLE_POOL }, () => ({
      active: false, scale: 0.01, opacity: 0,
      ox: 0, oy: 0,
      color: new THREE.Color(0.35, 0.22, 0.06),
    }))
  )
  const lastPulse = useRef(null)

  useFrame(() => {
    const pulse = useScrollStore.getState().pulseEvent

    // Spawn ripple when new pulse arrives
    if (pulse && pulse !== lastPulse.current && pulse.intensity > 0.1) {
      lastPulse.current = pulse
      const slot = pool.current.find(p => !p.active)
      if (slot) {
        slot.active  = true
        slot.scale   = 0.01
        slot.opacity = pulse.intensity * 0.50
        slot.ox      = (pulse.origin[0] - 0.5) * 2.2  // world units (camera space)
        slot.oy      = (pulse.origin[1] - 0.5) * 1.3
        slot.color.setRGB(pulse.color[0] * 2, pulse.color[1] * 2, pulse.color[2] * 2)
      }
    }

    pool.current.forEach((p, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return

      if (!p.active) {
        mesh.visible = false
        return
      }

      p.scale   += 0.022
      p.opacity *= 0.963

      if (p.opacity < 0.008) {
        p.active = false
        mesh.visible = false
        return
      }

      mesh.visible = true
      mesh.position.set(p.ox, p.oy, 0.02)
      mesh.scale.setScalar(p.scale)
      mesh.material.opacity = p.opacity
      mesh.material.color.copy(p.color)
    })
  })

  return (
    <group>
      {Array.from({ length: RIPPLE_POOL }, (_, i) => (
        <mesh key={i} ref={el => (meshRefs.current[i] = el)} visible={false}>
          <ringGeometry args={[0.88, 1.0, 72]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── FloatingParticles — gold additive particles with upward drift ─────────────
function FloatingParticles({ count }) {
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
      spds[i] = 0.12 + Math.random() * 0.10
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
        arr[i * 3] = basePos[i * 3] + Math.cos(t * speeds[i] + offsets[i]) * 0.18

        const drift = t * (0.04 + sinCurve * 0.06) * speeds[i] * 8
        let   y     = basePos[i * 3 + 1] + Math.sin(t * speeds[i] + offsets[i]) * 0.22 + drift
        if (y > 1.2) y -= 2.4
        arr[i * 3 + 1] = y
      }
      geoRef.current.attributes.position.needsUpdate = true
    }

    if (matRef.current) {
      const targetOpacity = 0.09 + sinCurve * 0.30
      const targetSize    = 0.018 + sinCurve * 0.028
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
        opacity={0.09}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Canvas-generated nebula textures ────────────────────────────────────────
function makeNebulaTex(r, g, b) {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g2  = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2)
  g2.addColorStop(0.0, `rgba(${r},${g},${b},0.9)`)
  g2.addColorStop(0.3, `rgba(${r},${g},${b},0.35)`)
  g2.addColorStop(0.7, `rgba(${r},${g},${b},0.07)`)
  g2.addColorStop(1.0, `rgba(${r},${g},${b},0.0)`)
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

// ─── GoldNebula — sprite planes that glow additively ─────────────────────────
const NEBULA_CONFIG = [
  { pos: [ 0.9,  0.28, -0.6], scale: 1.2, tex: () => makeNebulaTex(200, 130, 40), baseOp: 0.24 },
  { pos: [-0.8, -0.18, -0.8], scale: 1.0, tex: () => makeNebulaTex(160,  95, 25), baseOp: 0.18 },
  { pos: [ 0.3, -0.48, -0.7], scale: 0.9, tex: () => makeNebulaTex(220, 150, 55), baseOp: 0.16 },
  { pos: [-0.5,  0.55, -0.5], scale: 0.8, tex: () => makeNebulaTex(180, 110, 35), baseOp: 0.14 },
]

function GoldNebula() {
  const matRefs    = useRef([])
  const meshRefs   = useRef([])
  const scrollLerp = useRef(0)

  const textures = useMemo(() => NEBULA_CONFIG.map(n => n.tex()), [])

  useFrame(({ clock }) => {
    scrollLerp.current += (useScrollStore.getState().scrollProgress - scrollLerp.current) * 0.04
    const sp       = scrollLerp.current
    const sinCurve = Math.sin(sp * Math.PI)
    const t        = clock.getElapsedTime()

    NEBULA_CONFIG.forEach((cfg, i) => {
      const mat  = matRefs.current[i]
      const mesh = meshRefs.current[i]
      if (!mat || !mesh) return

      const target = cfg.baseOp * (0.4 + sinCurve * 1.1)
      mat.opacity += (target - mat.opacity) * 0.03

      const pulse = 1.0 + Math.sin(t * 0.28 + i * 1.6) * 0.06
      mesh.scale.setScalar(cfg.scale * pulse)
    })
  })

  return (
    <group>
      {NEBULA_CONFIG.map((cfg, i) => (
        <mesh key={i} ref={el => (meshRefs.current[i] = el)} position={cfg.pos} scale={cfg.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            ref={el => (matRefs.current[i] = el)}
            map={textures[i]}
            transparent
            opacity={cfg.baseOp * 0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ isMobile, isTablet }) {
  const particleCount = isMobile ? 30 : isTablet ? 50 : 80

  return (
    <>
      <FluidPlane reducedDetail={isMobile} />
      {!isMobile && <GoldNebula />}
      {!isMobile && <OrbSystem />}
      {!isMobile && <RippleSystem />}
      <FloatingParticles count={particleCount} />
      <EffectComposer>
        <Bloom
          intensity={isMobile ? 0.25 : 0.55}
          luminanceThreshold={0.20}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <Vignette darkness={0.42} offset={0.30} />
      </EffectComposer>
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Background3D() {
  const isMobile = useRef(window.innerWidth < 768).current
  const isTablet = useRef(window.innerWidth >= 768 && window.innerWidth < 1024).current

  useEffect(() => {
    const setMouse = useScrollStore.getState().setMouse

    const onMouseMove = (e) => {
      setMouse(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        setMouse(
          e.touches[0].clientX / window.innerWidth,
          1 - e.touches[0].clientY / window.innerHeight,
        )
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Canvas
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        dpr={isMobile ? [1, 1] : isTablet ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 1], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: false, toneMapping: THREE.NoToneMapping }}
        onCreated={({ gl }) => gl.setClearColor(0x050505, 1)}
      >
        <Scene isMobile={isMobile} isTablet={isTablet} />
      </Canvas>
    </ErrorBoundary>
  )
}
