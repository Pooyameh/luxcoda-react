import { useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Cta({ onOpenModal }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700',
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      })

      tl.fromTo('.cta-left',
        { opacity: 0, x: -50, filter: 'blur(14px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' },
        0
      )
      tl.fromTo('.cta-right',
        { opacity: 0, x: 40, filter: 'blur(12px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0.1
      )
      tl.fromTo('.cta-button',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
        0.35
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#010112',
    }}>

      {/* Dramatic center glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.05) 0%, rgba(94,174,255,0.06) 25%, rgba(168,85,247,0.05) 50%, transparent 70%)',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* Horizontal scan lines */}
      {[0.25, 0.5, 0.75].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${pos * 100}%`, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, rgba(94,174,255,${0.03 + i * 0.01}), transparent)`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1400, margin: '0 auto', width: '100%',
        padding: 'clamp(5rem, 10vh, 8rem) clamp(1.25rem, 5vw, 5rem)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 8rem)',
        alignItems: 'center',
      }} className="cta-grid">

        {/* LEFT: Giant "7 days" statement */}
        <div className="cta-left" style={{ opacity: 0 }}>
          {/* Big number */}
          <div style={{
            fontSize: 'clamp(8rem, 18vw, 22rem)',
            fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em',
            background: 'linear-gradient(135deg, #22d3ee 0%, #5eaeff 40%, #a855f7 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            userSelect: 'none',
            position: 'relative',
          }}>
            7
            {/* Reflection / echo */}
            <div style={{
              position: 'absolute',
              top: '100%', left: 0,
              fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit',
              letterSpacing: 'inherit',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, transparent 60%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: 'scaleY(-0.35)',
              transformOrigin: 'top',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 80%)',
              userSelect: 'none', pointerEvents: 'none',
            }}>7</div>
          </div>

          <div style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '-0.5rem',
          }}>
            days to your new website.
          </div>

          {/* Decorative dots */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem', alignItems: 'center' }}>
            {['#22d3ee', '#5eaeff', '#a855f7'].map((c, i) => (
              <motion.div
                key={c}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }}
              />
            ))}
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>

        {/* RIGHT: Text + CTA */}
        <div className="cta-right" style={{ opacity: 0 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1rem' }}>
            Free, no commitment
          </span>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 4vw, 3.8rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
            color: '#fff',
            marginBottom: 'clamp(1rem, 2vw, 1.75rem)',
          }}>
            Your new website<br />
            <span className="gradient-text">starts today.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.93rem, 1.4vw, 1.05rem)',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.72,
            maxWidth: 420,
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}>
            We'll design a custom preview of your new website at no cost. See exactly what we'd build for your business before committing to anything.
          </p>

          {/* Features checklist */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 clamp(2rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { text: 'Free custom mock-up in 48 hours', color: '#22d3ee' },
              { text: 'No obligation, no payment required', color: '#5eaeff' },
              { text: 'Live in 7 days once you approve', color: '#a855f7' },
            ].map(({ text, color }) => (
              <li key={text} style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                color: 'rgba(255,255,255,0.72)',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '0.6rem', color,
                }}>✓</span>
                {text}
              </li>
            ))}
          </ul>

          <div className="cta-button" style={{ opacity: 0, display: 'inline-block' }}>
            <button
              onClick={onOpenModal}
              className="btn-primary"
              style={{
                padding: 'clamp(1rem, 2vw, 1.35rem) clamp(2.25rem, 4.5vw, 3.5rem)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                boxShadow: '0 0 60px rgba(34,211,238,0.2), 0 0 120px rgba(94,174,255,0.15), 0 0 200px rgba(168,85,247,0.1)',
              }}
            >
              <span>Claim Your Free Mock-Up →</span>
            </button>
          </div>

          <p style={{
            marginTop: '1rem', fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.28)', letterSpacing: '0.01em',
          }}>
            No credit card required · Respond within 24 hours
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-left { text-align: center; }
        }
      `}</style>
    </section>
  )
}
