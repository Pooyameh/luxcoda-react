import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL_LENGTH = 8

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [trail, setTrail] = useState(() =>
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  )
  const trailRef = useRef([...Array(TRAIL_LENGTH)].map(() => ({ x: -200, y: -200 })))
  const rafRef = useRef(null)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { damping: 22, stiffness: 220, mass: 0.5 })
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 220, mass: 0.5 })

  const auraX = useSpring(mouseX, { damping: 18, stiffness: 100, mass: 1.0 })
  const auraY = useSpring(mouseY, { damping: 18, stiffness: 100, mass: 1.0 })

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

    const onOver = (e) => {
      const el = e.target
      setHovering(!!el.closest('a, button, [role="button"], input, textarea, select, label'))
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

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
              background: i % 2 === 0
                ? `rgba(94, 174, 255, ${visible ? progress * 0.55 : 0})`
                : `rgba(168, 85, 247, ${visible ? progress * 0.45 : 0})`,
              transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
              pointerEvents: 'none',
              zIndex: 9994,
              transition: 'opacity 0.1s',
              willChange: 'transform',
            }}
          />
        )
      })}

      {/* ── Aura (slowest, glow blob) ── */}
      <motion.div
        animate={{
          opacity: visible ? (hovering ? 0.65 : 0.3) : 0,
          scale: clicking ? 0.65 : hovering ? 1.8 : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 90, height: 90,
          borderRadius: '50%',
          background: hovering
            ? 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(94,174,255,0.12) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(94,174,255,0.14) 0%, rgba(168,85,247,0.09) 50%, transparent 70%)',
          filter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 9995,
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── Outer ring (medium lag) ── */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : hovering ? 1.6 : 1,
          borderColor: hovering
            ? 'rgba(34,211,238,0.85)'
            : 'rgba(255,255,255,0.22)',
          backgroundColor: hovering
            ? 'rgba(34,211,238,0.05)'
            : 'transparent',
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 38, height: 38,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.22)',
          pointerEvents: 'none',
          zIndex: 9997,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── Inner dot (precise tracking) ── */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.35 : hovering ? 0 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 7, height: 7,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22d3ee, #5eaeff)',
          boxShadow: '0 0 8px rgba(34,211,238,0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
