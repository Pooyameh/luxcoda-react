import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch,  setIsTouch]  = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Ring follows with lerp delay
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.6 })
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.6 })

  useEffect(() => {
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
      setHovering(!!e.target.closest('a, button, [role="button"]'))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

  return (
    <>
      {/* Outer ring — lerped delay */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale:   hovering ? 1.6 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale:   { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 30, height: 30,
          borderRadius: '50%',
          border: '1px solid rgba(111,163,199,0.3)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 10001,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Inner dot — snaps instantly */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale:   hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 10002,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
