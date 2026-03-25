import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
      }}
    >
      {/* Pulsing glow orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.18) 0%, rgba(168,85,247,0.14) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="Luxcoda"
        initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 'clamp(72px, 12vh, 110px)',
          width: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Progress bar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: 'clamp(80px, 12vw, 120px)',
        height: 1.5,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ scaleX: 0, transformOrigin: 'left center' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          onAnimationComplete={() => setTimeout(onComplete, 120)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #5eaeff, #a855f7)',
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  )
}
