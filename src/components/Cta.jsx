import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Cta({ onOpenModal }) {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Eyebrow: letterSpacing compression (wide → tight = split-text feel)
      tl.fromTo('.cta-eyebrow',
        { opacity: 0, letterSpacing: '0.38em' },
        { opacity: 1, letterSpacing: '0.14em', duration: 0.5, ease: 'power2.out' }
      )
      // Headline: blur-to-sharp + y rise
      tl.fromTo('.cta-headline',
        { opacity: 0, y: 38, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' },
        '-=0.3'
      )
      // Body: slide in from right
      tl.fromTo('.cta-body',
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.35'
      )
      // Button: overshooting scale bounce
      tl.fromTo('.cta-button',
        { opacity: 0, scale: 0.72 },
        { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2.2)' },
        '-=0.25'
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
      padding: '0 clamp(1.25rem, 4vw, 4rem)',
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
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'center',
      }}
      className="cta-grid"
      >
        {/* Text */}
        <div>
          <p
            className="cta-eyebrow"
            style={{
              fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
              opacity: 0,
            }}
          >
            Free, no commitment
          </p>

          <h2
            className="cta-headline"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#fff',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              opacity: 0,
            }}
          >
            Your new website<br />
            <span className="gradient-text">is 7 days away.</span>
          </h2>

          <p
            className="cta-body"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              maxWidth: 500,
              opacity: 0,
            }}
          >
            We'll design a custom preview of your new website at no cost. See exactly what we'd build for your business before committing to anything.
          </p>
        </div>

        {/* CTA button */}
        <div className="cta-button" style={{ flexShrink: 0, opacity: 0 }}>
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
        </div>
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
