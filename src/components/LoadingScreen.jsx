import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const lineRef = useRef(null)

  useEffect(() => {
    if (!lineRef.current) return

    gsap.to(lineRef.current, {
      width: '60px',
      duration: 1.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setTimeout(onComplete, 300)
      },
    })
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--black)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        style={{
          fontFamily: '"Bodoni Moda", serif',
          fontWeight: 400,
          fontSize: 18,
          letterSpacing: '0.25em',
          color: 'var(--white)',
          textTransform: 'uppercase',
        }}
      >
        Luxcoda
      </motion.span>

      {/* Gold progress line */}
      <div style={{
        width: 60,
        height: 1,
        background: 'rgba(201,169,110,0.15)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '0px',
            background: 'var(--gold)',
          }}
        />
      </div>
    </motion.div>
  )
}
