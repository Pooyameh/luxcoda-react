import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Animated orbital rings + logo reveal ─── */
export default function LoadingScreen({ onComplete }) {
  const progressRef = useRef(null)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#010112',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.12) 0%, rgba(168,85,247,0.08) 40%, rgba(34,211,238,0.04) 60%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Outermost slow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: 520, height: 520, borderRadius: '50%',
          border: '1px solid rgba(94,174,255,0.06)',
          pointerEvents: 'none',
        }}
      >
        {/* Dot on ring */}
        <div style={{
          position: 'absolute', top: -3, left: '50%',
          width: 6, height: 6, borderRadius: '50%',
          background: '#5eaeff',
          boxShadow: '0 0 12px rgba(94,174,255,0.9), 0 0 24px rgba(94,174,255,0.5)',
          transform: 'translateX(-50%)',
        }} />
      </motion.div>

      {/* Second ring — counter rotating */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: 380, height: 380, borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.09)',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          position: 'absolute', top: -3.5, left: '50%',
          width: 7, height: 7, borderRadius: '50%',
          background: '#a855f7',
          boxShadow: '0 0 14px rgba(168,85,247,0.95), 0 0 28px rgba(168,85,247,0.5)',
          transform: 'translateX(-50%)',
        }} />
      </motion.div>

      {/* Third ring — fast rotating, cyan */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: 260, height: 260, borderRadius: '50%',
          border: '1px solid rgba(34,211,238,0.1)',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          position: 'absolute', bottom: -3, left: '50%',
          width: 5, height: 5, borderRadius: '50%',
          background: '#22d3ee',
          boxShadow: '0 0 10px rgba(34,211,238,0.9), 0 0 20px rgba(34,211,238,0.5)',
          transform: 'translateX(-50%)',
        }} />
      </motion.div>

      {/* Inner pulsing ring */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 180, height: 180, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <motion.img
        src="/logo.png"
        alt="Luxcoda"
        initial={{ opacity: 0, scale: 0.78, filter: 'blur(18px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          height: 'clamp(160px, 24vh, 230px)',
          width: 'auto',
          position: 'relative', zIndex: 1,
        }}
      />

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          position: 'relative', zIndex: 1,
          marginTop: '2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
        }}
      >
        {/* Progress track */}
        <div style={{
          width: 'clamp(100px, 15vw, 160px)', height: 1.5,
          background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden',
        }}>
          <motion.div
            ref={progressRef}
            initial={{ scaleX: 0, transformOrigin: 'left center' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            onAnimationComplete={() => setTimeout(onComplete, 100)}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, #22d3ee, #5eaeff, #a855f7)',
              borderRadius: 2,
            }}
          />
        </div>

        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: '0.62rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          }}
        >
          Loading
        </motion.span>
      </motion.div>

      {/* Corner decorations */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
          style={{
            position: 'absolute',
            width: 20, height: 20,
            ...pos,
            borderTop: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderRight: i % 2 === 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
        />
      ))}
    </motion.div>
  )
}
