import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#060610',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
      }}
    >
      {/* Outer slow-rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', width: 440, height: 440, borderRadius: '50%',
          border: '1px solid rgba(94,174,255,0.07)', pointerEvents: 'none',
        }}
      />

      {/* Inner counter-rotating ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', width: 290, height: 290, borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.1)', pointerEvents: 'none',
        }}
      >
        <div style={{
          position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)',
          width: 5, height: 5, borderRadius: '50%',
          background: '#a855f7', boxShadow: '0 0 10px rgba(168,85,247,0.9)',
        }} />
      </motion.div>

      {/* Pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.14) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)',
          filter: 'blur(52px)', pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="Luxcoda"
        initial={{ opacity: 0, scale: 0.84, filter: 'blur(14px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 'clamp(180px, 28vh, 250px)', width: 'auto', position: 'relative', zIndex: 1 }}
      />

      {/* Progress bar */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: 'clamp(100px, 14vw, 140px)', height: 1.5,
        background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden',
      }}>
        <motion.div
          initial={{ scaleX: 0, transformOrigin: 'left center' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          onAnimationComplete={() => setTimeout(onComplete, 120)}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  )
}
