import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const DURATION = 2600

export default function LoadingScreen({ onComplete }) {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(onComplete, DURATION)

    // Animate counter
    const interval = setInterval(() => {
      setPercent((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        // Ease out — fast at start, slower toward end
        const remaining = 100 - p
        const increment = Math.max(1, Math.floor(remaining * 0.06))
        return Math.min(100, p + increment)
      })
    }, 40)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75, ease: 'easeInOut' } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a',
        overflow: 'hidden',
      }}
    >
      {/* Orb left */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.1) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-80%, -65%)',
          pointerEvents: 'none',
        }}
      />
      {/* Orb right */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-20%, -35%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <img
          src="/logo.png"
          alt="Luxcoda"
          style={{ width: 'auto', height: 180, objectFit: 'contain' }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
        style={{
          marginTop: 20,
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.72rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'rgba(240,240,255,0.5)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Custom Websites · Brisbane
      </motion.p>

      {/* Percent counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 36,
          right: 40,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '1rem',
          letterSpacing: '0.12em',
          color: 'rgba(240,240,255,0.25)',
          zIndex: 2,
        }}
      >
        {percent}%
      </motion.div>

      {/* Loading bar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          background: 'linear-gradient(90deg, #5eaeff, #c084fc, #a855f7)',
          zIndex: 2,
        }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: DURATION / 1000 - 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
