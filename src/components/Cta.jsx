import { useRef, useLayoutEffect } from 'react'
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

      tl.fromTo('.cta-glass-panel',
        { opacity: 0, y: 32, filter: 'blur(12px)', scale: 0.97 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.4, ease: 'power2.out' },
        0
      )
      tl.fromTo('.cta-eyebrow',
        { opacity: 0, letterSpacing: '0.32em' },
        { opacity: 1, letterSpacing: '0.14em', duration: 0.3, ease: 'power2.out' },
        0.1
      )
      tl.fromTo('.cta-headline',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0.18
      )
      tl.fromTo('.cta-body',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.3
      )
      tl.fromTo('.cta-button',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
        0.38
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
      padding: 'clamp(5rem, 10vh, 8rem) clamp(1.25rem, 4vw, 4rem)',
      background: '#060610',
    }}>

      {/* Large radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(94,174,255,0.07) 0%, rgba(168,85,247,0.06) 40%, transparent 75%)',
      }} />

      {/* Grid mesh */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: '76px 76px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1000, margin: '0 auto', width: '100%',
      }}>

        {/* Glass panel */}
        <div
          className="cta-glass-panel"
          style={{
            opacity: 0,
            borderRadius: 28,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.13)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 40px 100px rgba(0,0,0,0.6)',
            padding: 'clamp(2.5rem, 6vw, 5rem)',
            textAlign: 'center',
          }}
        >
          <p
            className="cta-eyebrow"
            style={{
              opacity: 0,
              fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '1.25rem',
            }}
          >
            Free, no commitment
          </p>

          <h2
            className="cta-headline"
            style={{
              opacity: 0,
              fontSize: 'clamp(2rem, 5.5vw, 5.5rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: '#fff',
              marginBottom: 'clamp(1rem, 2vw, 1.75rem)',
            }}
          >
            Your new website<br />
            <span className="gradient-text">is 7 days away.</span>
          </h2>

          <p
            className="cta-body"
            style={{
              opacity: 0,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 auto clamp(2rem, 4vw, 3rem)',
            }}
          >
            We'll design a custom preview of your new website at no cost. See exactly what we'd build for your business before committing to anything.
          </p>

          <div className="cta-button" style={{ opacity: 0, display: 'inline-block' }}>
            <button
              onClick={onOpenModal}
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                color: '#fff', border: 'none', borderRadius: 100,
                padding: 'clamp(1rem, 2vw, 1.3rem) clamp(2.5rem, 5vw, 3.5rem)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                letterSpacing: '0.01em',
                boxShadow: '0 0 60px rgba(94,174,255,0.22), 0 0 120px rgba(168,85,247,0.15)',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.88'
                e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 80px rgba(94,174,255,0.32), 0 0 160px rgba(168,85,247,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'scale(1) translateY(0)'
                e.currentTarget.style.boxShadow = '0 0 60px rgba(94,174,255,0.22), 0 0 120px rgba(168,85,247,0.15)'
              }}
            >
              Claim Free Mock-Up
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
