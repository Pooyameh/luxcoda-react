import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'

const TRAIL_LENGTH = 8

export default function Cursor() {
  const [visible,       setVisible]       = useState(false)
  const [hovering,      setHovering]      = useState(false)
  const [clicking,      setClicking]      = useState(false)
  const [isTouch,       setIsTouch]       = useState(false)
  const [magnetic,      setMagnetic]      = useState(false)
  const [trail, setTrail] = useState(() =>
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  )
  const trailRef = useRef([...Array(TRAIL_LENGTH)].map(() => ({ x: -200, y: -200 })))
  const rafRef   = useRef(null)
  const ringRef  = useRef(null)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Outer ring — delayed float (factor ~0.08 feel via spring)
  const ringX = useSpring(mouseX, { damping: 18, stiffness: 130, mass: 0.8 })
  const ringY = useSpring(mouseY, { damping: 18, stiffness: 130, mass: 0.8 })

  const auraX = useSpring(mouseX, { damping: 18, stiffness: 100, mass: 1.0 })
  const auraY = useSpring(mouseY, { damping: 18, stiffness: 100, mass: 1.0 })

  // ── Core tracking + trail ──────────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    let currentX = -200
    let currentY = -200

    const updateTrail = () => {
      const positions = trailRef.current
      for (let i = positions.length - 1; i > 0; i--) {
        positions[i] = { ...positions[i - 1] }
      }
      positions[0] = { x: currentX, y: currentY }
      setTrail([...positions])
      rafRef.current = requestAnimationFrame(updateTrail)
    }
    rafRef.current = requestAnimationFrame(updateTrail)

    const onMove = (e) => {
      currentX = e.clientX
      currentY = e.clientY
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onOver  = (e) => {
      const el = e.target
      setHovering(!!el.closest('a, button, [role="button"], input, textarea, select, label'))
    }
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible])

  // ── Magnetic hover on [data-magnetic] elements ────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll('[data-magnetic]')
      const cleanup = []

      targets.forEach((el) => {
        const onEnter = () => {
          setMagnetic(true)
          if (ringRef.current) {
            gsap.to(ringRef.current, {
              scale: 2.5,
              borderColor: 'rgba(255,255,255,0.9)',
              duration: 0.35,
              ease: 'power2.out',
            })
          }
        }
        const onLeave = () => {
          setMagnetic(false)
          if (ringRef.current) {
            gsap.to(ringRef.current, {
              scale: 1,
              borderColor: 'rgba(201,169,110,0.4)',
              duration: 0.35,
              ease: 'power2.out',
            })
          }
        }
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        cleanup.push(() => {
          el.removeEventListener('mouseenter', onEnter)
          el.removeEventListener('mouseleave', onLeave)
        })
      })

      return () => cleanup.forEach(fn => fn())
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isTouch) return null

  const ringScale = clicking ? 0.75 : magnetic ? 1 : hovering ? 1.6 : 1

  return (
    <>
      {/* ── Particle trail ── */}
      {trail.map((pos, i) => {
        const progress = 1 - i / TRAIL_LENGTH
        const size = 3 * progress
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: size, height: size,
              borderRadius: '50%',
              background: `rgba(201,169,110,${visible ? progress * 0.35 : 0})`,
              transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
              pointerEvents: 'none',
              zIndex: 9994,
              transition: 'opacity 0.1s',
              willChange: 'transform',
            }}
          />
        )
      })}

      {/* ── Aura glow blob ── */}
      <motion.div
        animate={{
          opacity: visible ? (hovering ? 0.5 : 0.2) : 0,
          scale: clicking ? 0.65 : hovering ? 1.8 : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale:   { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 90, height: 90,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.06) 50%, transparent 70%)',
          filter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 9995,
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── Outer ring — 40px, gold border, delayed float ── */}
      <motion.div
        ref={ringRef}
        animate={{
          opacity: visible ? 1 : 0,
          scale: ringScale,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale:   { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.4)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── Inner dot — 8px, gold, snaps instantly ── */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.4 : hovering ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale:   { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#c9a96e',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 10000,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
