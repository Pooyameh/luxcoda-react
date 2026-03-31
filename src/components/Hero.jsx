import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const line1Words = ['Custom', 'websites', 'for']
const line2Words = ['Brisbane']
const line3Words = ['businesses.']

const wordVar = {
  hidden: { y: '115%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Hero({ onOpenModal, isLoaded = false }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        anticipatePin: 1,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const a = (delay = 0) => ({
    initial: { opacity: 0, y: 22, filter: 'blur(8px)' },
    animate: isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 22, filter: 'blur(8px)' },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay },
  })

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '70px clamp(1.25rem, 4vw, 4rem) clamp(2rem, 4vw, 4rem)',
      textAlign: 'center',
      background: '#060610',
    }}>

      {/* Large ambient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="orb-1" style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: 'clamp(500px, 60vw, 960px)', height: 'clamp(500px, 60vw, 960px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.1) 0%, rgba(94,174,255,0.02) 55%, transparent 70%)',
          filter: 'blur(72px)',
        }} />
        <div className="orb-2" style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: 'clamp(400px, 52vw, 860px)', height: 'clamp(400px, 52vw, 860px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, rgba(168,85,247,0.02) 55%, transparent 70%)',
          filter: 'blur(72px)',
        }} />
        {/* Center radial glow */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(280px, 38vw, 560px)', height: 'clamp(280px, 38vw, 560px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Fine grid mesh */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        backgroundSize: '76px 76px',
        maskImage: 'radial-gradient(ellipse 78% 72% at 50% 50%, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 78% 72% at 50% 50%, black 10%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, width: '100%' }}>

        {/* Glass badge */}
        <motion.div
          {...a(0.05)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            padding: '0.38rem 1.05rem',
            borderRadius: 100,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
            boxShadow: '0 0 8px rgba(94,174,255,0.8)',
          }} />
          Brisbane Web Design Studio
        </motion.div>

        {/* Headline line 1 */}
        <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 8.5rem)',
            fontWeight: 800, lineHeight: 0.94, letterSpacing: '-0.04em',
            color: '#fff', display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: '0 0.22em', margin: 0,
          }}>
            {line1Words.map((word, i) => (
              <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  custom={i}
                  variants={wordVar}
                  initial="hidden"
                  animate={isLoaded ? 'visible' : 'hidden'}
                  style={{ display: 'inline-block' }}
                >{word}</motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Headline line 2 */}
        <div style={{ overflow: 'hidden', marginBottom: '0.05em' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 8.5rem)',
            fontWeight: 800, lineHeight: 0.94, letterSpacing: '-0.04em',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0 0.22em', margin: 0,
          }}>
            {line2Words.map((word, i) => (
              <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  custom={line1Words.length + i}
                  variants={wordVar}
                  initial="hidden"
                  animate={isLoaded ? 'visible' : 'hidden'}
                  style={{ display: 'inline-block', color: '#fff' }}
                >{word}</motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Headline line 3 — gradient */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)' }}>
          <h1 style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 8.5rem)',
            fontWeight: 800, lineHeight: 0.94, letterSpacing: '-0.04em',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: '0 0.22em', margin: 0,
          }}>
            {line3Words.map((word, i) => (
              <span key={word} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  custom={line1Words.length + line2Words.length + i}
                  variants={wordVar}
                  initial="hidden"
                  animate={isLoaded ? 'visible' : 'hidden'}
                  className="gradient-text"
                  style={{ display: 'inline-block' }}
                >{word}</motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          {...a(0.75)}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 400, letterSpacing: '0.01em',
            maxWidth: 460, margin: '0 auto clamp(1.75rem, 3.5vh, 2.75rem)',
            lineHeight: 1.7,
          }}
        >
          No templates. Live in 7 days.
          Built to attract customers, not just look pretty.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...a(0.95)}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center', alignItems: 'center' }}
        >
          <button
            onClick={onOpenModal}
            style={{
              background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
              color: '#fff', border: 'none', borderRadius: 100,
              padding: 'clamp(0.8rem, 1.8vw, 1.05rem) clamp(1.75rem, 3.5vw, 2.4rem)',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              letterSpacing: '0.01em',
              boxShadow: '0 0 48px rgba(94,174,255,0.22), 0 0 96px rgba(168,85,247,0.12)',
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 0 60px rgba(94,174,255,0.32), 0 0 120px rgba(168,85,247,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 48px rgba(94,174,255,0.22), 0 0 96px rgba(168,85,247,0.12)'
            }}
          >
            Claim Your Free Mock-Up
          </button>

          <a
            href="#pricing"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              color: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(255,255,255,0.11)',
              borderRadius: 100,
              padding: 'clamp(0.8rem, 1.8vw, 1.05rem) clamp(1.75rem, 3.5vw, 2.4rem)',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 500, textDecoration: 'none', letterSpacing: '0.01em',
              transition: 'border-color 0.25s, background 0.25s, color 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.78)'
            }}
          >
            See Pricing
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — mouse scroll style */}
      <motion.div
        {...a(1.3)}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem',
        }}
      >
        <motion.div
          style={{
            width: 26, height: 42, borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '5px 0',
          }}
        >
          <motion.div
            animate={{ y: [0, 16, 0], opacity: [0.8, 0.15, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{ width: 3, height: 7, borderRadius: 100, background: 'rgba(255,255,255,0.38)' }}
          />
        </motion.div>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
