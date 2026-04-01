import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const words = [
  { text: 'WebGL',    size: 'clamp(2rem, 5vw, 4.5rem)',    weight: 600, font: 'display', top: '8%',  left: '5%'  },
  { text: 'React',    size: 'clamp(2rem, 5vw, 4.5rem)',    weight: 600, font: 'display', top: '55%', left: '55%' },
  { text: 'GSAP',     size: 'clamp(1.2rem, 2.5vw, 2rem)',  weight: 400, font: 'display', top: '20%', left: '62%' },
  { text: 'Vite',     size: 'clamp(1.2rem, 2.5vw, 2rem)',  weight: 400, font: 'display', top: '72%', left: '12%' },
  { text: 'Tailwind', size: 'clamp(0.9rem, 1.5vw, 1.3rem)',weight: 300, font: 'sans',    top: '40%', left: '75%' },
  { text: 'Motion',   size: 'clamp(0.9rem, 1.5vw, 1.3rem)',weight: 300, font: 'sans',    top: '85%', left: '50%' },
]

export default function TechStack() {
  const containerRef = useRef(null)
  const wordRefs     = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      wordRefs.current.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1, y: 0,
              duration: 0.8, ease: 'power2.out',
              delay: i * 0.1,
            })
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: 'transparent', padding: '15vh 0' }}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 55vw, 600px)',
          overflow: 'hidden',
        }}
      >
        {words.map((w, i) => (
          <span
            key={w.text}
            ref={el => (wordRefs.current[i] = el)}
            style={{
              position: 'absolute',
              top: w.top,
              left: w.left,
              fontFamily: w.font === 'display' ? 'var(--display)' : 'var(--sans)',
              fontWeight: w.weight,
              fontSize: w.size,
              color: 'var(--white)',
              opacity: 0,
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {w.text}
          </span>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--sans)',
        fontWeight: 300,
        fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
        marginTop: '2rem',
        padding: '0 2rem',
      }}>
        Built with the tools the internet's best sites are built with.
      </p>
    </section>
  )
}
