import { useRef, useLayoutEffect, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const line1 = ['Custom', 'websites']
const line2 = ['that', 'actually']
const line3 = ['convert.']

const wordVar = {
  hidden: { y: '115%', opacity: 0, rotateX: -15 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
  }),
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.4 + 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: (Math.random() * 0.5 + 0.5) * 0.8,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = Date.now() / 1000

      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -5) p.x = canvas.width + 5
        if (p.x > canvas.width + 5) p.x = -5
        if (p.y < -5) p.y = canvas.height + 5
        if (p.y > canvas.height + 5) p.y = -5

        const twinkle = Math.sin(t * p.phaseSpeed + p.phase) * 0.3 + 0.7
        const alpha = p.opacity * twinkle

        // Star dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        // Occasional cyan tint
        if (idx % 7 === 0) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.4})`
          ctx.fill()
        }

        // Draw connections
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const lineAlpha = 0.05 * (1 - dist / 100) * twinkle
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(94, 174, 255, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}

/* ─── 3D Browser Mockup ─── */
function BrowserMockup({ rotateX, rotateY }) {
  const rows = [70, 55, 45, 65, 50]
  return (
    <div className="tilt-scene" style={{ width: '100%' }}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          maxWidth: 540,
          margin: '0 auto',
          borderRadius: 18,
          background: 'rgba(5,5,22,0.88)',
          border: '1px solid rgba(255,255,255,0.13)',
          boxShadow:
            '0 60px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 80px rgba(94,174,255,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Browser chrome */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '0.7rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, flexShrink: 0 }} />
          ))}
          <div style={{
            flex: 1, marginLeft: '0.5rem',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 6, padding: '0.28rem 0.75rem',
            fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.02em',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
            luxcoda.com.au
          </div>
        </div>

        {/* Nav */}
        <div style={{
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ width: 70, height: 8, background: 'rgba(255,255,255,0.18)', borderRadius: 4 }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[50, 42, 36].map((w, i) => (
              <div key={i} style={{ width: w, height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }} />
            ))}
            <div style={{ width: 56, height: 20, background: 'linear-gradient(135deg, #5eaeff, #a855f7)', borderRadius: 100, marginLeft: '0.25rem' }} />
          </div>
        </div>

        {/* Hero section sketch */}
        <div style={{
          margin: '1rem',
          background: 'linear-gradient(135deg, rgba(94,174,255,0.07), rgba(168,85,247,0.05))',
          borderRadius: 12, padding: '1.25rem',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #5eaeff, #a855f7)' }} />
            <div style={{ width: 110, height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 3 }} />
          </div>
          <div style={{ width: '88%', height: 12, background: 'rgba(255,255,255,0.22)', borderRadius: 4, marginBottom: '0.4rem' }} />
          <div style={{ width: '72%', height: 12, background: 'rgba(255,255,255,0.18)', borderRadius: 4, marginBottom: '0.35rem' }} />
          <div style={{ width: '55%', height: 10, background: 'linear-gradient(90deg, #5eaeff, #a855f7)', borderRadius: 4, marginBottom: '1rem' }} />
          <div style={{ width: '68%', height: 7, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: '0.25rem' }} />
          <div style={{ width: '45%', height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 3, marginBottom: '1rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: 100, height: 28, background: 'linear-gradient(135deg, #5eaeff, #a855f7)', borderRadius: 100 }} />
            <div style={{ width: 80, height: 28, background: 'rgba(255,255,255,0.08)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        </div>

        {/* Feature rows */}
        <div style={{ padding: '0 1rem 0.5rem' }}>
          {rows.map((w, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.45rem 0',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                background: i % 2 === 0
                  ? 'rgba(94,174,255,0.12)'
                  : 'rgba(168,85,247,0.1)',
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: `${w}%`, height: 5, background: 'rgba(255,255,255,0.12)', borderRadius: 3, marginBottom: '0.2rem' }} />
                <div style={{ width: `${w * 0.6}%`, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
              </div>
              <div style={{
                width: 30, height: 14,
                background: i % 3 === 0
                  ? 'rgba(34,211,238,0.15)'
                  : 'rgba(255,255,255,0.05)',
                borderRadius: 100,
              }} />
            </div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div style={{
          padding: '0.5rem 1rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: 28, height: 4, background: i === 1 ? 'rgba(94,174,255,0.5)' : 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Floating Badge ─── */
function FloatingBadge({ text, icon, style, delay = 0, accent = '#22d3ee' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        position: 'absolute',
        display: 'flex', alignItems: 'center', gap: '0.45rem',
        padding: '0.45rem 0.9rem',
        borderRadius: 100,
        background: 'rgba(5,5,22,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${accent}30`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset`,
        fontSize: '0.72rem', fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
        zIndex: 2,
        ...style,
      }}
    >
      <span style={{ color: accent, fontSize: '0.85rem' }}>{icon}</span>
      {text}
    </motion.div>
  )
}

/* ─── Main Hero ─── */
export default function Hero({ onOpenModal, isLoaded = false }) {
  const sectionRef = useRef(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 28, stiffness: 160, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Browser 3D tilt (centred at 0)
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10])
  const rotateX = useTransform(smoothY, [0, 1], [7, -7])

  // Orb parallax
  const orbX1 = useTransform(smoothX, [0, 1], ['5%', '-5%'])
  const orbY1 = useTransform(smoothY, [0, 1], ['5%', '-5%'])
  const orbX2 = useTransform(smoothX, [0, 1], ['-4%', '4%'])
  const orbY2 = useTransform(smoothY, [0, 1], ['-4%', '4%'])

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        anticipatePin: 1,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const a = (delay = 0) => ({
    initial: { opacity: 0, y: 22, filter: 'blur(8px)' },
    animate: isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 22, filter: 'blur(8px)' },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay },
  })

  const allWords = [...line1, ...line2, ...line3]

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#010112',
        padding: 'clamp(90px, 12vh, 130px) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 6vh, 5rem)',
      }}
    >
      {/* Stars */}
      <ParticleCanvas />

      {/* Ambient orbs */}
      <motion.div
        className="orb-1"
        style={{
          position: 'absolute',
          top: '-20%', right: '-5%',
          width: 'clamp(500px, 65vw, 1000px)',
          height: 'clamp(500px, 65vw, 1000px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.09) 0%, rgba(94,174,255,0.02) 55%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
          x: orbX1,
          y: orbY1,
        }}
      />
      <motion.div
        className="orb-2"
        style={{
          position: 'absolute',
          bottom: '-25%', left: '-12%',
          width: 'clamp(400px, 55vw, 880px)',
          height: 'clamp(400px, 55vw, 880px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, rgba(168,85,247,0.02) 55%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
          x: orbX2,
          y: orbY2,
        }}
      />
      {/* Cyan accent orb */}
      <div className="orb-3" style={{
        position: 'absolute',
        top: '35%', left: '40%',
        width: 'clamp(200px, 28vw, 480px)',
        height: 'clamp(200px, 28vw, 480px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Fine grid mesh */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 5%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 5%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1400, width: '100%', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
      }} className="hero-grid">

        {/* ── LEFT: Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Badge */}
          <motion.div
            {...a(0.05)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
              padding: '0.38rem 1rem',
              borderRadius: 100,
              background: 'rgba(34,211,238,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(34,211,238,0.18)',
              marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)',
              fontSize: '0.73rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.8)',
              alignSelf: 'flex-start',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: '#22d3ee',
              boxShadow: '0 0 10px rgba(34,211,238,0.9)',
            }} />
            Brisbane Web Design Studio
          </motion.div>

          {/* Headline — line 1 */}
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 8rem)',
              fontWeight: 800, lineHeight: 0.93, letterSpacing: '-0.045em',
              color: '#fff', display: 'flex', flexWrap: 'wrap',
              gap: '0 0.22em', margin: 0,
            }}>
              {line1.map((w, i) => (
                <span key={w} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    custom={i}
                    variants={wordVar}
                    initial="hidden"
                    animate={isLoaded ? 'visible' : 'hidden'}
                    style={{ display: 'inline-block' }}
                  >{w}</motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Headline — line 2 */}
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 8rem)',
              fontWeight: 800, lineHeight: 0.93, letterSpacing: '-0.045em',
              color: '#fff', display: 'flex', flexWrap: 'wrap',
              gap: '0 0.22em', margin: 0,
            }}>
              {line2.map((w, i) => (
                <span key={w} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    custom={line1.length + i}
                    variants={wordVar}
                    initial="hidden"
                    animate={isLoaded ? 'visible' : 'hidden'}
                    style={{ display: 'inline-block' }}
                  >{w}</motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Headline — line 3 gradient */}
          <div style={{ overflow: 'hidden', marginBottom: 'clamp(1rem, 2vh, 1.75rem)' }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 8rem)',
              fontWeight: 800, lineHeight: 0.93, letterSpacing: '-0.045em',
              display: 'flex', flexWrap: 'wrap',
              gap: '0 0.22em', margin: 0,
            }}>
              {line3.map((w, i) => (
                <span key={w} style={{ overflow: 'hidden', display: 'inline-block' }}>
                  <motion.span
                    custom={line1.length + line2.length + i}
                    variants={wordVar}
                    initial="hidden"
                    animate={isLoaded ? 'visible' : 'hidden'}
                    className="gradient-text"
                    style={{ display: 'inline-block' }}
                  >{w}</motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            {...a(0.75)}
            style={{
              fontSize: 'clamp(0.92rem, 1.5vw, 1.08rem)',
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 400,
              lineHeight: 1.72,
              maxWidth: 400,
              marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
            }}
          >
            No templates. Live in 7 days.
            Built to attract customers, not just look pretty.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...a(0.92)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}
          >
            <button
              className="btn-primary"
              onClick={onOpenModal}
              style={{
                padding: 'clamp(0.8rem, 1.6vw, 1rem) clamp(1.6rem, 3vw, 2.25rem)',
                fontSize: 'clamp(0.88rem, 1.3vw, 0.98rem)',
                boxShadow: '0 0 40px rgba(94,174,255,0.2), 0 0 80px rgba(168,85,247,0.12)',
              }}
            >
              <span>Claim Your Free Mock-Up</span>
            </button>

            <a
              href="#pricing"
              className="btn-ghost"
              style={{
                padding: 'clamp(0.8rem, 1.6vw, 1rem) clamp(1.6rem, 3vw, 2.25rem)',
                fontSize: 'clamp(0.88rem, 1.3vw, 0.98rem)',
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              See Pricing
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...a(1.1)}
            style={{
              display: 'flex', gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              marginTop: 'clamp(1.75rem, 3.5vh, 3rem)',
              paddingTop: 'clamp(1.25rem, 2.5vh, 2rem)',
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {[
              { value: '7', unit: 'days', label: 'to launch' },
              { value: '100%', unit: '', label: 'custom-built' },
              { value: '24h', unit: '', label: 'free mock-up' },
            ].map(({ value, unit, label }) => (
              <div key={label}>
                <div style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.55rem)',
                  fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
                }}>
                  <span className="gradient-text-cyan">{value}</span>
                  {unit && <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500, fontSize: '0.7em' }}>{unit}</span>}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', marginTop: '0.15rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Browser ── */}
        <motion.div
          {...a(0.45)}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="hero-browser-col"
        >
          <div className="float-y-slow" style={{ width: '100%', position: 'relative' }}>
            <BrowserMockup rotateX={rotateX} rotateY={rotateY} />

            {/* Floating badges */}
            <FloatingBadge
              text="Live in 7 Days"
              icon="⚡"
              accent="#22d3ee"
              delay={1.1}
              style={{ top: '-4%', right: '-8%' }}
            />
            <FloatingBadge
              text="SEO Optimised"
              icon="🚀"
              accent="#a855f7"
              delay={1.3}
              style={{ bottom: '12%', left: '-10%' }}
            />
            <FloatingBadge
              text="Mobile First"
              icon="📱"
              accent="#5eaeff"
              delay={1.5}
              style={{ bottom: '-4%', right: '5%' }}
            />

            {/* Glow under browser */}
            <div style={{
              position: 'absolute', bottom: '-15%', left: '10%', right: '10%', height: '60%',
              background: 'radial-gradient(ellipse, rgba(94,174,255,0.12) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: -1, borderRadius: '50%',
            }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...a(1.4)}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.25rem, 2.5vh, 2rem)',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <motion.div
          style={{
            width: 24, height: 40, borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '5px 0',
          }}
        >
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.7, 0.1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            style={{ width: 2.5, height: 6, borderRadius: 100, background: 'rgba(34,211,238,0.5)' }}
          />
        </motion.div>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-browser-col { display: none !important; }
        }
      `}</style>
    </section>
  )
}
