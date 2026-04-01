import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const labelRef  = useRef(null)
  const line1Ref  = useRef(null)
  const line2Ref  = useRef(null)
  const line3Ref  = useRef(null)
  const subRef    = useRef(null)
  const scrollRef = useRef(null)
  const lineBarRef = useRef(null)

  useLayoutEffect(() => {
    const els = [labelRef.current, line1Ref.current, line2Ref.current, line3Ref.current, subRef.current]
    gsap.set(els, { opacity: 0, y: 30 })

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to(els, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
    })

    // Scroll indicator — line fades from top to bottom, looping
    gsap.set(scrollRef.current, { opacity: 0, y: 20 })
    tl.to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')

    gsap.to(lineBarRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 0.3,
    })

    return () => tl.kill()
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        textAlign: 'center',
        padding: '0 2rem',
      }}
    >
      {/* Label */}
      <p
        ref={labelRef}
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 11,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          opacity: 0.7,
          marginBottom: '2.5rem',
        }}
      >
        Website Design — Est. 2024
      </p>

      {/* Headline */}
      <h1
        data-magnetic
        style={{
          fontFamily: 'var(--serif)',
          lineHeight: 1.05,
          margin: 0,
        }}
      >
        <span ref={line1Ref} style={{ display: 'block' }}>
          <span className="hover-underline" style={{ fontWeight: 400, fontSize: 'clamp(52px, 7vw, 96px)', color: 'var(--white)' }}>
            We build<span className="underline-bar" />
          </span>
        </span>
        <span ref={line2Ref} style={{ display: 'block' }}>
          <span className="hover-underline" style={{ fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(52px, 7vw, 96px)', color: 'var(--white)' }}>
            digital presence<span className="underline-bar" />
          </span>
        </span>
        <span ref={line3Ref} style={{ display: 'block' }}>
          <span className="hover-underline" style={{ fontWeight: 400, fontSize: 'clamp(52px, 7vw, 96px)', color: 'var(--white)' }}>
            that commands rooms.<span className="underline-bar" />
          </span>
        </span>
      </h1>

      {/* Subtext */}
      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 18,
          color: 'var(--warm)',
          opacity: 0.6,
          marginTop: '2rem',
        }}
      >
        For local businesses ready to be taken seriously.
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 10,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          Scroll
        </span>
        <div
          ref={lineBarRef}
          style={{
            width: 1,
            height: 60,
            background: 'var(--gold)',
          }}
        />
      </div>
    </section>
  )
}
