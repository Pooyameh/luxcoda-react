import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const items = [
  {
    num: '01',
    title: 'No Templates',
    body: 'Every site is designed and built from scratch. No Squarespace, no Wix, no generic themes re-skinned with your logo. Your business is unique — your website should be too.',
    icon: '✦',
    accent: '#5eaeff',
    glow: 'rgba(94,174,255,0.12)',
  },
  {
    num: '02',
    title: 'Live in 7 Days',
    body: 'From brief to launch in under a week. Most agencies take 6–12 weeks and charge double. We move fast without cutting corners.',
    icon: '⚡',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.12)',
  },
  {
    num: '03',
    title: 'Built to Convert',
    body: 'Every layout, headline, and button is designed to turn visitors into customers — not to win a design award. Your site is a sales tool, and we treat it like one.',
    icon: '◈',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
  },
  {
    num: '04',
    title: 'Ongoing & Local',
    body: "Monthly hosting, maintenance, and updates included. We're a Brisbane studio — same city, same time zone, always available.",
    icon: '◎',
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.12)',
  },
]

/* ─── 3D Tilt Card ─── */
function TiltCard({ item, index, isVisible }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, { damping: 20, stiffness: 180 })
  const sy = useSpring(y, { damping: 20, stiffness: 180 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12])
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10])
  const glowX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
      animate={isVisible
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 50, filter: 'blur(12px)' }
      }
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{ perspective: '1000px', height: '100%' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
          cursor: 'default',
          overflow: 'hidden',
          height: '100%',
          boxSizing: 'border-box',
        }}
        whileHover={{
          boxShadow: `0 40px 100px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px ${item.accent}28`,
          borderColor: `${item.accent}30`,
          transition: { duration: 0.35 },
        }}
      >
        {/* Mouse-following glow spot */}
        <motion.div
          style={{
            position: 'absolute',
            width: '65%', height: '65%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${item.glow} 0%, transparent 70%)`,
            filter: 'blur(28px)',
            pointerEvents: 'none',
            left: glowX,
            top: glowY,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Ghost number behind */}
        <div style={{
          position: 'absolute',
          bottom: '-0.1em', right: '-0.05em',
          fontSize: 'clamp(5rem, 10vw, 13rem)',
          fontWeight: 900, lineHeight: 1,
          letterSpacing: '-0.06em',
          background: `linear-gradient(135deg, ${item.accent}1a, ${item.accent}07)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none', pointerEvents: 'none',
          transform: 'translateZ(-20px)',
          transformStyle: 'preserve-3d',
        }}>
          {item.num}
        </div>

        {/* Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 16, marginBottom: '1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${item.accent}14`,
          border: `1px solid ${item.accent}25`,
          fontSize: '1.4rem',
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
          flexShrink: 0,
        }}>
          {item.icon}
        </div>

        {/* Step badge */}
        <div style={{
          display: 'inline-block',
          fontSize: '0.62rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '0.22rem 0.7rem', borderRadius: 100,
          background: `${item.accent}16`,
          border: `1px solid ${item.accent}30`,
          color: item.accent,
          marginBottom: '0.75rem',
          transform: 'translateZ(16px)',
          transformStyle: 'preserve-3d',
        }}>
          {item.num}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.75rem)',
          fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.15,
          color: '#fff', margin: '0 0 0.75rem',
          transform: 'translateZ(18px)',
          transformStyle: 'preserve-3d',
        }}>
          {item.title}
        </h3>

        {/* Body */}
        <p style={{
          fontSize: 'clamp(0.83rem, 1.05vw, 0.93rem)',
          color: 'rgba(255,255,255,0.72)',
          lineHeight: 1.75, margin: 0,
          position: 'relative', zIndex: 1,
        }}>
          {item.body}
        </p>

        {/* Accent bottom line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${item.accent}55, transparent)`,
          borderRadius: '0 0 24px 24px',
          opacity: 0,
        }} />
      </motion.div>
    </motion.div>
  )
}

export default function Difference() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => setIsVisible(true),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(5rem, 10vh, 9rem) clamp(1.25rem, 5vw, 5rem)',
      background: 'linear-gradient(180deg, #010112 0%, #07071a 50%, #010112 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background atmosphere */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '-5%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.025) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
            The Difference
          </span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 4rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
          }}>
            Why businesses choose{' '}
            <span className="gradient-text-cyan">Luxcoda</span>
          </h2>
          <p style={{
            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '1rem', maxWidth: 480, margin: '1rem auto 0',
            lineHeight: 1.7,
          }}>
            We built a studio that solves every frustration business owners have with web design agencies.
          </p>
        </motion.div>

        {/* 3D Tilt Cards — 2x2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          alignItems: 'stretch',
        }} className="diff-grid">
          {items.map((item, i) => (
            <TiltCard key={item.num} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            marginTop: 'clamp(2rem, 4vw, 3rem)',
            padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 3rem)', flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Brisbane-based', icon: '📍' },
            { label: 'Bespoke code', icon: '💻' },
            { label: 'No lock-in contracts', icon: '🔓' },
            { label: 'Fast response time', icon: '⚡' },
          ].map(({ label, icon }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)',
              fontWeight: 500, letterSpacing: '0.01em',
            }}>
              <span style={{ fontSize: '1rem' }}>{icon}</span>
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .diff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
