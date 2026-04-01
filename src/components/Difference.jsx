import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Split a string into inline-block char spans
function Chars({ text, style }) {
  return (
    <span style={style}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

const staggerIn = (chars) =>
  gsap.to(chars, {
    y: 0, opacity: 1, rotationX: 0,
    duration: 0.8, ease: 'power4.out',
    stagger: 0.025,
  })

const staggerOut = (chars) =>
  gsap.to(chars, {
    y: -80, opacity: 0, rotationX: 90,
    duration: 0.45, ease: 'power3.in',
    stagger: 0.012,
    transformOrigin: '0% 50% -50px',
  })

export default function Difference() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const stmt1Ref = useRef(null)
  const stmt2Ref = useRef(null)
  const stmt3Ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getChars = (ref) => Array.from(ref.current.querySelectorAll('.char'))

      // Set initial hidden state for chars
      const chars1 = getChars(stmt1Ref)
      const chars2 = getChars(stmt2Ref)
      const chars3 = getChars(stmt3Ref)

      const initHidden = (chars) =>
        gsap.set(chars, { y: 80, opacity: 0, rotationX: -90, transformOrigin: '0% 50% -50px' })

      initHidden(chars1)
      initHidden(chars2)
      initHidden(chars3)

      // Pin inner while outer scrolls
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: innerRef.current,
      })

      // Statement 1 — enters when section top hits viewport
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => staggerIn(chars1),
      })

      // Statement 2 — ~33% through outer section
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: '30% top',
        once: true,
        onEnter: () => {
          staggerOut(chars1)
          gsap.delayedCall(0.3, () => staggerIn(chars2))
        },
      })

      // Statement 3 — ~66% through outer section
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: '63% top',
        once: true,
        onEnter: () => {
          staggerOut(chars2)
          gsap.delayedCall(0.3, () => staggerIn(chars3))
        },
      })
    }, outerRef)

    return () => ctx.revert()
  }, [])

  const centeredAbsolute = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 clamp(1.5rem, 8vw, 12rem)',
    perspective: '1000px',
  }

  return (
    <div ref={outerRef} style={{ minHeight: '300vh', background: 'transparent' }}>
      <div
        ref={innerRef}
        style={{
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* Statement 1 */}
        <p ref={stmt1Ref} style={{ ...centeredAbsolute }}>
          <Chars
            text="Most agency websites look the same."
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              color: 'var(--white)',
              lineHeight: 1.2,
            }}
          />
        </p>

        {/* Statement 2 */}
        <p ref={stmt2Ref} style={{ ...centeredAbsolute }}>
          <Chars
            text="Yours won't."
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: 'var(--gold)',
              lineHeight: 1.1,
            }}
          />
        </p>

        {/* Statement 3 */}
        <p ref={stmt3Ref} style={{ ...centeredAbsolute }}>
          <Chars
            text="Luxcoda builds sites that make people stop scrolling."
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(28px, 4.5vw, 64px)',
              color: 'var(--white)',
              lineHeight: 1.25,
            }}
          />
        </p>
      </div>
    </div>
  )
}
