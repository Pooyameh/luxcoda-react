import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const statements = [
  {
    number: '72',
    label: 'hours',
    body: 'Average time from first call to live preview.',
  },
  {
    number: '100%',
    label: 'bespoke',
    body: 'Every site is built from scratch. No templates. No shortcuts.',
  },
  {
    number: '3×',
    label: 'more leads',
    body: 'Average result our clients see in the first 90 days.',
  },
  {
    number: '01',
    label: 'point of contact',
    body: 'You talk to the person building your site. Always.',
  },
]

function Statement({ number, label, body, index }) {
  const wrapRef  = useRef(null)
  const numRef   = useRef(null)
  const fgRef    = useRef(null)   // foreground wrapper — parallax target
  const labelRef = useRef(null)
  const bodyRef  = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animation ──────────────────────────────────────────────
      gsap.set(numRef.current,   { opacity: 0, scale: 1.1 })
      gsap.set(labelRef.current, { opacity: 0, y: 20 })
      gsap.set(bodyRef.current,  { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      tl.to(numRef.current,   { opacity: 1, scale: 1, duration: 1,   ease: 'power3.out' })
        .to(labelRef.current, { opacity: 1, y: 0,     duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(bodyRef.current,  { opacity: 1, y: 0,     duration: 0.7, ease: 'power3.out' }, '-=0.45')

      // ── Parallax — watermark number (deeper plane) ──────────────────────
      // Drifts up faster + horizontal based on index (even right, odd left)
      gsap.to(numRef.current, {
        y: -60,
        x: index % 2 === 0 ? 30 : -30,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ── Parallax — foreground text (closer plane, subtler shift) ────────
      gsap.to(fgRef.current, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(2rem, 10vw, 16rem)',
        overflow: 'hidden',
      }}
    >
      {/* Watermark number — deep plane */}
      <div
        ref={numRef}
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 900,
          fontSize: 'clamp(120px, 18vw, 220px)',
          color: 'var(--white)',
          opacity: 0,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          position: 'absolute',
          left: 'clamp(1rem, 8vw, 12rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 0,
          willChange: 'transform',
        }}
      >
        {number}
      </div>

      {/* Foreground content — closer plane */}
      <div ref={fgRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
        <p
          ref={labelRef}
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 14,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
          }}
        >
          {label}
        </p>
        <p
          ref={bodyRef}
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 18,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
            maxWidth: 420,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  )
}

export default function Process() {
  const btnRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(btnRef.current, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: btnRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(btnRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: 'transparent', padding: 'clamp(4rem, 8vh, 8rem) 0' }}>
      {statements.map((s, i) => (
        <Statement key={i} index={i} {...s} />
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vh, 4rem) 2rem',
        }}
      >
        <button ref={btnRef} className="btn-outline-gold" data-magnetic>
          See our work →
        </button>
      </div>
    </section>
  )
}
