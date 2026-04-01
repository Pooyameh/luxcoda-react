import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

const steps = [
  {
    num: '01',
    label: 'Discovery',
    body: 'We learn your business, your customers, and what makes you different. No templates. No assumptions.',
    flip: false,
  },
  {
    num: '02',
    label: 'Design',
    body: 'A bespoke visual identity built from scratch. Every pixel considered, every interaction intentional.',
    flip: true,
  },
  {
    num: '03',
    label: 'Develop',
    body: 'Built on modern frameworks. Fast, responsive, and engineered to perform.',
    flip: false,
  },
  {
    num: '04',
    label: 'Launch',
    body: 'Go live with confidence. Ongoing support to keep you ahead.',
    flip: true,
  },
]

function Step({ num, label, body, flip }) {
  const numRef     = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on watermark number — scrolls at ~0.5x speed
      gsap.to(numRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Content fade in
      gsap.set(contentRef.current, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1, y: 0, duration: 1, ease: 'power2.out',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: flip ? '1fr 1fr' : '1fr 1fr',
      gap: 'clamp(2rem, 6vw, 8rem)',
      alignItems: 'center',
      padding: '10vh clamp(1.5rem, 5vw, 4rem)',
      maxWidth: 1200,
      margin: '0 auto',
    }}
    className="process-step"
    >
      {/* Number side */}
      <div style={{ order: flip ? 2 : 1, display: 'flex', justifyContent: flip ? 'flex-end' : 'flex-start' }}>
        <div
          ref={numRef}
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 300,
            fontSize: 'clamp(4rem, 12vw, 11rem)',
            lineHeight: 1,
            color: 'var(--white)',
            opacity: 0.15,
            userSelect: 'none',
            willChange: 'transform',
          }}
        >
          {num}
        </div>
      </div>

      {/* Content side */}
      <div ref={contentRef} style={{ order: flip ? 1 : 2 }}>
        <p style={{
          fontFamily: 'var(--sans)',
          fontWeight: 500,
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '1.25rem',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)',
          color: 'var(--text-body)',
          lineHeight: 1.7,
          maxWidth: 500,
        }}>
          {body}
        </p>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" style={{ background: 'transparent', padding: '5vh 0' }}>
      {steps.map((s, i) => (
        <Step key={i} {...s} />
      ))}

      <style>{`
        @media (max-width: 640px) {
          .process-step {
            grid-template-columns: 1fr !important;
          }
          .process-step > div { order: unset !important; }
        }
      `}</style>
    </section>
  )
}
