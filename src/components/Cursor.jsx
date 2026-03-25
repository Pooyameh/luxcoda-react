import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Ring lags behind with spring physics — creates the trailing effect
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 220, mass: 0.5 })
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 220, mass: 0.5 })

  // Outer aura lags even more
  const auraX = useSpring(mouseX, { damping: 18, stiffness: 120, mass: 0.8 })
  const auraY = useSpring(mouseY, { damping: 18, stiffness: 120, mass: 0.8 })

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      const el = e.target
      if (el.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true)
      } else {
        setHovering(false)
      }
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
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* ── Aura (slowest layer, subtle glow) ── */}
      <motion.div
        animate={{
          opacity: visible ? (hovering ? 0.6 : 0.3) : 0,
          scale: clicking ? 0.7 : hovering ? 1.6 : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 80, height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 9996,
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
          scale: clicking ? 0.8 : hovering ? 1.5 : 1,
          borderColor: hovering
            ? 'rgba(94,174,255,0.8)'
            : 'rgba(255,255,255,0.25)',
          backgroundColor: hovering
            ? 'rgba(94,174,255,0.06)'
            : 'transparent',
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.25)',
          pointerEvents: 'none',
          zIndex: 9997,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* ── Inner dot (no lag, follows exactly) ── */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.4 : hovering ? 0 : 1,
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
          background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
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
