import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const line1Words = ['Custom', 'websites', 'for']
const line2Words = ['Brisbane', 'businesses.']

const wordVar = {
  hidden: { y: '115%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
  }),
}

export default function Hero({ onOpenModal, isLoaded = false }) {
  const a = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  })

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '72px clamp(1.25rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem)',
      textAlign: 'center',
      background: '#050508',
    }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="orb-1" style={{
          position: 'absolute', top: '8%', right: '5%',
          width: 'clamp(280px, 42vw, 660px)', height: 'clamp(280px, 42vw, 660px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.16) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div className="orb-2" style={{
          position: 'absolute', bottom: '8%', left: '3%',
          width: 'clamp(220px, 36vw, 550px)', height: 'clamp(220px, 36vw, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, width: '100%' }}>

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
          animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}
        >
          <img
            src="/logo.png"
            alt="Luxcoda"
            style={{
              height: 'clamp(64px, 9vh, 96px)',
              width: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </motion.div>

        {/* ── Headline line 1 ── */}
        <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
          <h1 style={{
            fontSize: 'clamp(2.6rem, 7vw, 8rem)',
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
                  animate={isLoaded ? 'visible' : 'hidden'}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* ── Headline line 2 (gradient) ── */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(1rem, 2.5vh, 2rem)' }}>
          <h1 style={{
            fontSize: 'clamp(2.6rem, 7vw, 8rem)',
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
                  animate={isLoaded ? 'visible' : 'hidden'}
                  className="gradient-text"
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* ── Tagline ── */}
        <motion.p
          {...a(0.72)}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
            color: 'rgba(255,255,255,0.72)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            maxWidth: 480,
            margin: '0 auto clamp(1.5rem, 3vh, 2.5rem)',
            lineHeight: 1.6,
          }}
        >
          No templates. Live in 7 days.
          <br />
          Built to attract customers, not just look pretty.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          {...a(0.92)}
          style={{
            display: 'flex', flexWrap: 'wrap',
            gap: '0.875rem', justifyContent: 'center', alignItems: 'center',
          }}
        >
          <button
            onClick={onOpenModal}
            style={{
              background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
              color: '#fff', border: 'none', borderRadius: 100,
              padding: 'clamp(0.75rem, 1.8vw, 1rem) clamp(1.6rem, 3.5vw, 2.2rem)',
              fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
              fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              letterSpacing: '0.01em',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 0 40px rgba(94,174,255,0.22), 0 0 80px rgba(168,85,247,0.12)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.87'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Claim Your Free Mock-Up
          </button>

          <a
            href="#pricing"
            style={{
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100,
              padding: 'clamp(0.75rem, 1.8vw, 1rem) clamp(1.6rem, 3.5vw, 2.2rem)',
              fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
              fontWeight: 500, textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'border-color 0.2s, background 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'transparent' }}
          >
            See Pricing
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...a(1.2)}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.2rem, 2.5vh, 2rem)',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={13} color="rgba(255,255,255,0.28)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
