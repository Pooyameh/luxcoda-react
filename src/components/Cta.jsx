import { motion } from 'framer-motion'

export default function Cta({ onOpenModal }) {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 4vw, 4rem)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Background gradient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(94,174,255,0.07) 0%, rgba(168,85,247,0.06) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
      }}
      className="cta-grid"
      >
        {/* Text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
            }}
          >
            Free, no commitment
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#fff',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            Your new website<br />
            <span className="gradient-text">is 7 days away.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              maxWidth: 500,
            }}
          >
            We'll design a custom preview of your new website at no cost. See exactly what we'd build for your business before committing to anything.
          </motion.p>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ flexShrink: 0 }}
        >
          <button
            onClick={onOpenModal}
            style={{
              background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              padding: 'clamp(1rem, 2vw, 1.3rem) clamp(2rem, 4vw, 3rem)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 60px rgba(94,174,255,0.2), 0 0 100px rgba(168,85,247,0.15)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Claim Free Mock-Up
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
