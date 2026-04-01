import { useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const techs = ['React', 'Three.js', 'GSAP', 'Vite', 'Tailwind', 'WebGL']
const ORBIT_RADIUS = 190   // px from center to pill center
const ORBIT_MS     = 60000 // ms for one full rotation

export default function TechStack() {
  const sectionRef   = useRef(null)
  const orbRef       = useRef(null)
  const pillRefs     = useRef([])
  const frameRef     = useRef(null)
  const startRef     = useRef(null)   // set when section enters view

  // ── Entrance animation via ScrollTrigger ──────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Start everything invisible
      if (orbRef.current) gsap.set(orbRef.current, { opacity: 0, scale: 0.9 })
      pillRefs.current.forEach(el => { if (el) gsap.set(el, { opacity: 0 }) })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 72%',
        once: true,
        onEnter: () => {
          startRef.current = Date.now()  // start orbit clock

          gsap.to(orbRef.current, {
            opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
          })
          pillRefs.current.forEach((el, i) => {
            gsap.to(el, {
              opacity: 1, duration: 0.6, ease: 'power2.out',
              delay: 0.25 + i * 0.09,
            })
          })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Orbit animation via rAF ───────────────────────────────────────────────
  useEffect(() => {
    const animate = () => {
      if (startRef.current !== null) {
        const elapsed = Date.now() - startRef.current
        const progress = elapsed / ORBIT_MS  // full rotations elapsed

        techs.forEach((_, i) => {
          const el = pillRefs.current[i]
          if (!el) return
          const startAngle = (i / techs.length) * Math.PI * 2 - Math.PI / 2
          const angle = startAngle + progress * Math.PI * 2
          const x = Math.cos(angle) * ORBIT_RADIUS
          const y = Math.sin(angle) * ORBIT_RADIUS
          el.style.left = x + 'px'
          el.style.top  = y + 'px'
        })
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  // ── Pill hover handlers ───────────────────────────────────────────────────
  const handlePillEnter = (e) => {
    const inner = e.currentTarget.querySelector('.t-pill')
    if (inner) {
      inner.style.borderColor = 'rgba(201,169,110,0.35)'
      inner.style.background  = 'rgba(201,169,110,0.08)'
      inner.style.transform   = 'scale(1.08)'
    }
  }
  const handlePillLeave = (e) => {
    const inner = e.currentTarget.querySelector('.t-pill')
    if (inner) {
      inner.style.borderColor = 'rgba(201,169,110,0.1)'
      inner.style.background  = 'rgba(240,236,228,0.04)'
      inner.style.transform   = 'scale(1)'
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{ background: 'transparent', padding: 'min(18vh, 160px) 0' }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4rem',
      }}>

        {/* ── Desktop orbit layout ─────────────────────────────────────── */}
        <div
          className="orbit-layout"
          style={{
            position: 'relative',
            width: 520,
            height: 520,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Glass orb */}
          <div
            ref={orbRef}
            style={{
              width: 240, height: 240,
              borderRadius: '50%',
              background: 'rgba(240,236,228,0.03)',
              border: '1px solid rgba(201,169,110,0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              flexShrink: 0,
              zIndex: 2,
              position: 'relative',
            }}
          >
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Our
            </span>
            <span style={{
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: 'var(--white)',
              lineHeight: 1,
            }}>
              Stack
            </span>
          </div>

          {/* Orbit anchor — 0×0 at center of the orbit area */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            width: 0, height: 0,
            zIndex: 3,
          }}>
            {techs.map((tech, i) => (
              <div
                key={tech}
                ref={el => (pillRefs.current[i] = el)}
                onMouseEnter={handlePillEnter}
                onMouseLeave={handlePillLeave}
                style={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  /* left/top set by rAF */
                }}
              >
                <div
                  className="t-pill"
                  style={{
                    padding: '10px 24px',
                    background: 'rgba(240,236,228,0.04)',
                    border: '1px solid rgba(201,169,110,0.1)',
                    borderRadius: 100,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    whiteSpace: 'nowrap',
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: 13,
                    color: 'var(--muted-strong)',
                    transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                    userSelect: 'none',
                  }}
                >
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile grid layout (hidden on desktop) ───────────────────── */}
        <div className="mobile-stack-layout" style={{ display: 'none' }}>
          {/* Small orb */}
          <div style={{
            width: 160, height: 160,
            borderRadius: '50%',
            background: 'rgba(240,236,228,0.03)',
            border: '1px solid rgba(201,169,110,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.2rem',
            margin: '0 auto 2.5rem',
          }}>
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: 9,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>Our</span>
            <span style={{
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 700,
              fontSize: '1.6rem',
              color: 'var(--white)',
              lineHeight: 1,
            }}>Stack</span>
          </div>

          {/* 2×3 pill grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, auto)',
            gap: '0.75rem',
            justifyContent: 'center',
          }}>
            {techs.map(tech => (
              <div
                key={tech}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(240,236,228,0.04)',
                  border: '1px solid rgba(201,169,110,0.1)',
                  borderRadius: 100,
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 13,
                  color: 'var(--muted-strong)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 300,
          fontSize: 14,
          color: 'var(--muted)',
          textAlign: 'center',
          maxWidth: 480,
          lineHeight: 1.8,
          padding: '0 2rem',
        }}>
          Built with the same tools as the internet&apos;s most awarded studios.
          Your local business deserves nothing less.
        </p>
      </div>

      <style>{`
        @media (max-width: 599px) {
          .orbit-layout       { display: none !important; }
          .mobile-stack-layout{ display: block !important; }
        }
      `}</style>
    </section>
  )
}
