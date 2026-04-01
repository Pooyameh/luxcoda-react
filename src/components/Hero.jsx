import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import AnimatedText from './AnimatedText'

export default function Hero({ isLoaded, onOpenModal }) {
  const labelRef  = useRef(null)
  const subRef    = useRef(null)
  const scrollRef = useRef(null)

  useLayoutEffect(() => {
    if (!isLoaded) return

    gsap.set([labelRef.current, subRef.current, scrollRef.current], { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to(labelRef.current,  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    tl.to(subRef.current,    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '+=0.6')
    tl.to(scrollRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }, [isLoaded])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      textAlign: 'center',
      padding: '0 clamp(1.5rem, 8vw, 8rem)',
      position: 'relative',
    }}>

      {/* Label */}
      <p
        ref={labelRef}
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '3rem',
          opacity: 0,
        }}
      >
        Website Design — Est. 2026
      </p>

      {/* Headline — two lines, mixed weight */}
      <h1 style={{
        fontFamily: '"Bodoni Moda", serif',
        fontSize: 'clamp(3rem, 11vw, 10rem)',
        lineHeight: 0.95,
        margin: 0,
      }}>
        <AnimatedText
          as="span"
          style={{
            display: 'block',
            fontWeight: 400,
            color: 'var(--white)',
          }}
          delay={isLoaded ? 0.1 : 999}
        >
          We don&apos;t build websites.
        </AnimatedText>

        <AnimatedText
          as="span"
          style={{
            display: 'block',
            fontWeight: 800,
            fontStyle: 'italic',
            color: 'var(--gold)',
          }}
          delay={isLoaded ? 0.5 : 999}
        >
          We build legacies.
        </AnimatedText>
      </h1>

      {/* Subtitle */}
      <p
        ref={subRef}
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 300,
          fontSize: 16,
          color: 'var(--muted)',
          marginTop: '2.5rem',
          opacity: 0,
          maxWidth: 520,
          lineHeight: 1.8,
        }}
      >
        For the businesses that refuse to blend in. Custom-designed, hand-coded
        digital experiences for Brisbane&apos;s most ambitious brands.
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
          opacity: 0,
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
          Scroll
        </span>
        <div
          className="scroll-indicator-line"
          style={{
            width: 1,
            background: 'var(--gold)',
          }}
        />
      </div>
    </section>
  )
}
