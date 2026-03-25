import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const line1Words = ['Custom', 'websites', 'for']
const line2Words = ['Brisbane', 'businesses.']

const wordVar = {
  hidden: { y: '115%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.1 },
  }),
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Hero({ onOpenModal }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 'clamp(6rem, 10vw, 10rem) clamp(1.25rem, 4vw, 4rem) clamp(4rem, 6vw, 6rem)',
      textAlign: 'center',
    }}>
      {/* Orbs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div className="orb-1" style={{
          position: 'absolute',
          top: '10%', right: '8%',
          width: 'clamp(300px, 45vw, 700px)',
          height: 'clamp(300px, 45vw, 700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div className="orb-2" style={{
          position: 'absolute',
          bottom: '10%', left: '5%',
          width: 'clamp(250px, 40vw, 600px)',
          height: 'clamp(250px, 40vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, width: '100%' }}>

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.25)} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>
          <span style={{
            display: 'block', width: 6, height: 6, borderRadius: '50%',
            background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
          }} />
          <span style={{
            fontSize: '0.8rem', fontWeight: 500,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Brisbane Web Design Studio
          </span>
          <span style={{
            display: 'block', width: 6, height: 6, borderRadius: '50%',
            background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
          }} />
        </motion.div>

        {/* Headline — line 1 */}
        <div style={{ overflow: 'hidden', marginBottom: '0.15em' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8.5vw, 9rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#fff',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.22em',
          }}>
            {line1Words.map((word, i) => (
              <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  custom={i}
                  variants={wordVar}
                  initial="hidden"
                  animate="visible"
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Headline — line 2 (gradient) */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8.5vw, 9rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.22em',
          }}>
            {line2Words.map((word, i) => (
              <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  custom={line1Words.length + i}
                  variants={wordVar}
                  initial="hidden"
                  animate="visible"
                  className="gradient-text"
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p {...fadeUp(1.2)} style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
          color: 'rgba(255,255,255,0.75)',
          fontWeight: 400,
          letterSpacing: '0.01em',
          maxWidth: 520,
          margin: '0 auto clamp(2.5rem, 5vw, 3.5rem)',
          lineHeight: 1.6,
        }}>
          No templates. Live in 7 days.
          <br />Built to attract customers, not just look pretty.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(1.4)} style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '1rem', justifyContent: 'center', alignItems: 'center',
        }}>
          <button
            onClick={onOpenModal}
            style={{
              background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              padding: 'clamp(0.85rem, 2vw, 1.1rem) clamp(1.75rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              letterSpacing: '0.01em',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 0 40px rgba(94,174,255,0.25), 0 0 80px rgba(168,85,247,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Claim Your Free Mock-Up
          </button>

          <a
            href="#pricing"
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 100,
              padding: 'clamp(0.85rem, 2vw, 1.1rem) clamp(1.75rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'border-color 0.2s, background 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent' }}
          >
            See Pricing
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(2.0)}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} color="rgba(255,255,255,0.35)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
