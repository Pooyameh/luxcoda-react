import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const HEADLINE = 'Your website should be your best salesperson.'

export default function Cta({ onOpenModal }) {
  const sectionRef  = useRef(null)
  const headlineRef = useRef(null)
  const subRef      = useRef(null)
  const btnRef      = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([subRef.current, btnRef.current], { opacity: 0, y: 20 })

      // Set all chars hidden
      const chars = Array.from(headlineRef.current.querySelectorAll('.char'))
      gsap.set(chars, { y: 80, opacity: 0, rotationX: -90, transformOrigin: '0% 50% -50px' })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          // Characters tumble into place
          gsap.to(chars, {
            y: 0, opacity: 1, rotationX: 0,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.025,
          })

          // Sub and button fade in after chars settle
          const totalDelay = 0.025 * chars.length + 0.3
          gsap.to(subRef.current, {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out', delay: totalDelay,
          })
          gsap.to(btnRef.current, {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out', delay: totalDelay + 0.2,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        textAlign: 'center',
        padding: '0 clamp(2rem, 8vw, 10rem)',
      }}
    >
      <h2
        ref={headlineRef}
        data-magnetic
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(32px, 5.5vw, 80px)',
          color: 'var(--white)',
          lineHeight: 1.15,
          margin: 0,
          perspective: '1000px',
        }}
      >
        {/* Character split — each letter is a tumbling span */}
        {HEADLINE.split('').map((char, i) => (
          <span
            key={i}
            className="char"
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </h2>

      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 18,
          color: 'var(--gold)',
          marginTop: '2rem',
          opacity: 0,
        }}
      >
        Most local businesses are leaving money on the table.
      </p>

      <div ref={btnRef} style={{ marginTop: '3rem', opacity: 0 }}>
        <button
          className="btn-fill-gold"
          data-magnetic
          onClick={onOpenModal}
        >
          Start the conversation
        </button>
      </div>
    </section>
  )
}
