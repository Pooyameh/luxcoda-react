import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const words = [
  { text: 'React',    size: 'clamp(2rem, 5vw, 4.5rem)',    weight: 600, font: 'display', top: '55%', left: '55%', color: 'var(--white)'                     },
  { text: 'Three.js', size: 'clamp(2.5rem, 6vw, 5rem)',    weight: 700, font: 'display', top: '20%', left: '45%', color: 'var(--white)'                     },
  { text: 'GSAP',     size: 'clamp(1.2rem, 2.5vw, 2rem)',  weight: 400, font: 'display', top: '70%', left: '18%', color: 'var(--muted-strong)'              },
  { text: 'Vite',     size: 'clamp(1.2rem, 2.5vw, 2rem)',  weight: 400, font: 'display', top: '15%', left: '8%',  color: 'var(--muted-strong)'              },
  { text: 'Tailwind', size: 'clamp(0.9rem, 1.5vw, 1.3rem)',weight: 300, font: 'sans',    top: '40%', left: '75%', color: 'rgba(240,236,228,0.25)'           },
  { text: 'WebGL',    size: 'clamp(3rem, 8vw, 7rem)',       weight: 800, font: 'display', top: '38%', left: '18%', color: 'rgba(240,236,228,0.07)'           },
  { text: 'Motion',   size: 'clamp(0.9rem, 1.5vw, 1.3rem)',weight: 300, font: 'sans',    top: '85%', left: '50%', color: 'rgba(240,236,228,0.25)'           },
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
              fontFamily: w.font === 'display' ? '"Bodoni Moda", serif' : '"DM Sans", sans-serif',
              fontWeight: w.weight,
              fontSize: w.size,
              color: w.color,
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
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 300,
        fontSize: 14,
        color: 'var(--muted)',
        textAlign: 'center',
        marginTop: '2rem',
        padding: '0 2rem',
        maxWidth: 500,
        margin: '2rem auto 0',
        lineHeight: 1.8,
      }}>
        Built with the same tools as the internet&apos;s most awarded studios.
        Your local business deserves nothing less.
      </p>
    </section>
  )
}
