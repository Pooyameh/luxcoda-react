import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2600)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
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
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-70%, -60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-30%, -40%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <img
          src="/logo.png"
          alt="Luxcoda"
          style={{ width: 'auto', height: 160, objectFit: 'contain' }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        style={{
          marginTop: 24,
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(240,240,255,0.45)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        Custom Websites · Brisbane
      </motion.p>

      {/* Loading bar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
          zIndex: 2,
        }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
