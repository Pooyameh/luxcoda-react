import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import AnimatedText from './AnimatedText'

export default function Hero({ isLoaded }) {
  const labelRef  = useRef(null)
  const subRef    = useRef(null)
  const scrollRef = useRef(null)

  useLayoutEffect(() => {
    if (!isLoaded) return

    gsap.set([labelRef.current, subRef.current, scrollRef.current], { opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    // chars animate themselves via AnimatedText; sub and scroll follow after
    tl.to(subRef.current,   { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '+=0.6')
    tl.to(scrollRef.current,{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
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
          fontFamily: 'var(--sans)',
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '3rem',
          opacity: 0,
        }}
      >
        Website Design — Est. 2026
      </p>

      {/* Headline with mixed weight/style per line */}
      <h1 style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(2.5rem, 10vw, 9rem)',
        lineHeight: 1.05,
        margin: 0,
      }}>
        <AnimatedText
          as="span"
          style={{
            display: 'block',
            fontWeight: 300,
            color: 'var(--white)',
          }}
          delay={isLoaded ? 0.1 : 999}
        >
          We build
        </AnimatedText>

        <AnimatedText
          as="span"
          style={{
            display: 'block',
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'var(--gold)',
          }}
          delay={isLoaded ? 0.4 : 999}
        >
          digital presence
        </AnimatedText>

        <AnimatedText
          as="span"
          style={{
            display: 'block',
            fontWeight: 400,
            color: 'var(--white)',
          }}
          delay={isLoaded ? 0.7 : 999}
        >
          that commands rooms.
        </AnimatedText>
      </h1>

      {/* Subtitle */}
      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '2rem',
          opacity: 0,
          maxWidth: 480,
          lineHeight: 1.7,
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
          opacity: 0,
        }}
      >
        <span style={{
          fontFamily: 'var(--sans)',
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
            height: 30,
            background: 'var(--gold)',
          }}
        />
      </div>
    </section>
  )
}
