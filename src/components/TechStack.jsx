import { useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const techs = ['React', 'Three.js', 'GSAP', 'Vite', 'Tailwind', 'WebGL']
const ORBIT_RADIUS = 158   // tighter orbit — credibility footnote, not hero section
const ORBIT_MS     = 60000

export default function TechStack() {
  const sectionRef = useRef(null)
  const orbRef     = useRef(null)
  const pillRefs   = useRef([])
  const frameRef   = useRef(null)
  const startRef   = useRef(null)

  // ── Entrance animation ────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (orbRef.current) gsap.set(orbRef.current, { opacity: 0, scale: 0.9 })
      pillRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }) })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          startRef.current = Date.now()
          gsap.to(orbRef.current, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' })
          pillRefs.current.forEach((el, i) => {
            gsap.to(el, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.25 + i * 0.09 })
          })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Orbit rAF ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const animate = () => {
      if (startRef.current !== null) {
        const progress = (Date.now() - startRef.current) / ORBIT_MS
        techs.forEach((_, i) => {
          const el = pillRefs.current[i]
          if (!el) return
          const a = (i / techs.length) * Math.PI * 2 - Math.PI / 2 + progress * Math.PI * 2
          el.style.left = Math.cos(a) * ORBIT_RADIUS + 'px'
          el.style.top  = Math.sin(a) * ORBIT_RADIUS + 'px'
        })
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const handlePillEnter = (e) => {
    const p = e.currentTarget.querySelector('.t-pill')
    if (p) { p.style.borderColor = 'rgba(111,163,199,0.35)'; p.style.background = 'rgba(111,163,199,0.08)'; p.style.transform = 'scale(1.08)' }
  }
  const handlePillLeave = (e) => {
    const p = e.currentTarget.querySelector('.t-pill')
    if (p) { p.style.borderColor = 'rgba(111,163,199,0.1)'; p.style.background = 'rgba(232,237,242,0.04)'; p.style.transform = 'scale(1)' }
  }

  return (
    <section
      ref={sectionRef}
      style={{ background: 'transparent', padding: 'min(12vh, 100px) 0' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        {/* Section label */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}>
          The Tools
        </p>

        {/* ── Desktop orbit ────────────────────────────────────────────────── */}
        <div
          className="orbit-layout"
          style={{
            position: 'relative',
            width: 440, height: 440,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Glass orb — 200px */}
          <div
            ref={orbRef}
            style={{
              width: 200, height: 200,
              borderRadius: '50%',
              background: 'rgba(232,237,242,0.03)',
              border: '1px solid rgba(111,163,199,0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.25rem', flexShrink: 0, zIndex: 2, position: 'relative',
            }}
          >
            <span style={{
              fontFamily: '"DM Sans", sans-serif', fontWeight: 500,
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>Our</span>
            <span style={{
              fontFamily: '"Bodoni Moda", serif', fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--white)', lineHeight: 1,
            }}>Stack</span>
          </div>

          {/* Orbit anchor */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, zIndex: 3 }}>
            {techs.map((tech, i) => (
              <div
                key={tech}
                ref={el => (pillRefs.current[i] = el)}
                onMouseEnter={handlePillEnter}
                onMouseLeave={handlePillLeave}
                style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}
              >
                <div className="t-pill" style={{
                  padding: '8px 20px',
                  background: 'rgba(232,237,242,0.04)',
                  border: '1px solid rgba(111,163,199,0.1)',
                  borderRadius: 100,
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  whiteSpace: 'nowrap',
                  fontFamily: '"DM Sans", sans-serif', fontWeight: 400,
                  fontSize: 12, color: 'var(--muted-strong)',
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                  userSelect: 'none',
                }}>
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile grid ──────────────────────────────────────────────────── */}
        <div className="mobile-stack-layout" style={{ display: 'none' }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            background: 'rgba(232,237,242,0.03)',
            border: '1px solid rgba(111,163,199,0.12)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '0.2rem', margin: '0 auto 2rem',
          }}>
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)' }}>Our</span>
            <span style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', lineHeight: 1 }}>Stack</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '0.6rem', justifyContent: 'center' }}>
            {techs.map(tech => (
              <div key={tech} style={{
                padding: '8px 18px',
                background: 'rgba(232,237,242,0.04)',
                border: '1px solid rgba(111,163,199,0.1)',
                borderRadius: 100,
                fontFamily: '"DM Sans", sans-serif', fontWeight: 400,
                fontSize: 12, color: 'var(--muted-strong)',
                textAlign: 'center', whiteSpace: 'nowrap',
              }}>{tech}</div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif', fontWeight: 300,
          fontSize: 14, color: 'var(--muted)',
          textAlign: 'center', maxWidth: 480, lineHeight: 1.8, padding: '0 2rem',
        }}>
          Built with the same tools as the internet&apos;s most awarded studios.
          Your local business deserves nothing less.
        </p>

        {/* Attribution */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif', fontStyle: 'italic',
          fontWeight: 300, fontSize: 13, color: 'var(--muted)',
          textAlign: 'center',
        }}>
          The same stack behind Awwwards Site of the Year winners.
        </p>

      </div>

      <style>{`
        @media (max-width: 599px) {
          .orbit-layout        { display: none !important; }
          .mobile-stack-layout { display: block !important; }
        }
      `}</style>
    </section>
  )
}
