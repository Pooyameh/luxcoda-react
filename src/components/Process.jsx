import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    num: '01',
    title: 'Tell Us About\nYour Business',
    body: 'Fill out a short form or give us a call. We learn about your goals, your customers, and what you need your website to do.',
  },
  {
    num: '02',
    title: 'We Design Your\nFree Mock-Up',
    body: "Within 48 hours we'll design a custom preview built specifically for your business. No obligations, no payment required.",
  },
  {
    num: '03',
    title: 'Build, Review\n& Refine',
    body: "Once you're happy with the direction, we build the full site. You get revision rounds to make sure every detail is right.",
  },
  {
    num: '04',
    title: 'Launch &\nMaintain',
    body: 'We handle every technical detail — hosting, domain, speed optimisation — then stay on month after month to keep things running.',
  },
]

const SCROLL_TOTAL = 3200   // total pinned scroll distance
const STEP = 1 / steps.length  // 0.25 per step

export default function Process() {
  const sectionRef = useRef(null)
  const slideRefs = useRef([])
  const dotsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state — all slides except first are hidden
      slideRefs.current.slice(1).forEach(el => {
        gsap.set(el, { opacity: 0, y: 28, filter: 'blur(8px)' })
      })
      dotsRef.current.forEach((dot, i) => {
        if (i > 0) gsap.set(dot, { width: 6, backgroundColor: 'rgba(255,255,255,0.18)' })
      })

      // Pure scrub timeline — position-based, never skips on fast scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${SCROLL_TOTAL}`,
          pin: true,
          scrub: 2.2,
          anticipatePin: 1,
        },
      })

      for (let i = 0; i < steps.length - 1; i++) {
        // Each step occupies STEP (0.25) of the timeline
        // Exit current step at ~80% through its window
        const exitPos  = i * STEP + STEP * 0.72
        const enterPos = i * STEP + STEP * 0.82

        // Exit slide i
        tl.to(slideRefs.current[i],
          { opacity: 0, y: -22, filter: 'blur(7px)', duration: STEP * 0.14, ease: 'power2.in' },
          exitPos
        )
        // Enter slide i+1
        tl.fromTo(slideRefs.current[i + 1],
          { opacity: 0, y: 28, filter: 'blur(7px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: STEP * 0.18, ease: 'power2.out' },
          enterPos
        )

        // Dots
        tl.to(dotsRef.current[i],
          { width: 6, backgroundColor: 'rgba(255,255,255,0.18)', duration: STEP * 0.08 },
          exitPos
        )
        tl.to(dotsRef.current[i + 1],
          { width: 28, backgroundColor: '#5eaeff', duration: STEP * 0.08 },
          enterPos
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="process" style={{
      height: '100vh',
      background: '#07080f',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
          filter: 'blur(64px)',
        }} />
        <div style={{
          position: 'absolute', top: '-15%', right: '-8%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.06) 0%, transparent 70%)',
          filter: 'blur(64px)',
        }} />
      </div>

      {/* Section label */}
      <div style={{
        position: 'absolute',
        top: 'calc(70px + clamp(0.75rem, 1.5vh, 1.25rem))',
        left: 'clamp(1.25rem, 4vw, 4rem)',
        zIndex: 2,
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}>How It Works</span>
      </div>

      {/* Slides */}
      {steps.map((step, i) => (
        <div
          key={step.num}
          ref={el => slideRefs.current[i] = el}
          style={{
            position: 'absolute', inset: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            padding: '70px clamp(1.25rem, 4vw, 4rem) clamp(4rem, 7vh, 6rem)',
            gap: 'clamp(1rem, 3vw, 4rem)',
          }}
          className="process-grid"
        >
          {/* Giant ghost number */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{
              fontSize: 'clamp(20vw, 24vw, 28vw)',
              fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em',
              background: 'linear-gradient(135deg, rgba(94,174,255,0.15), rgba(168,85,247,0.12))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              userSelect: 'none',
            }}>
              {step.num}
            </span>
          </div>

          {/* Content — glass panel */}
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              display: 'inline-block', fontSize: '0.65rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.28rem 0.75rem', borderRadius: 100,
              background: 'linear-gradient(135deg, rgba(94,174,255,0.15), rgba(168,85,247,0.15))',
              border: '1px solid rgba(94,174,255,0.2)',
              marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
            }}>
              <span className="gradient-text">Step {step.num}</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 3.2rem)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 1.1, color: '#fff',
              marginBottom: 'clamp(0.875rem, 1.8vh, 1.4rem)',
              whiteSpace: 'pre-line',
            }}>
              {step.title}
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.78, margin: 0,
            }}>
              {step.body}
            </p>
          </div>
        </div>
      ))}

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.5rem, 4vh, 3rem)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem', alignItems: 'center',
        zIndex: 2,
      }}>
        {steps.map((_, i) => (
          <div
            key={i}
            ref={el => dotsRef.current[i] = el}
            style={{
              height: 4, borderRadius: 3,
              width: i === 0 ? 28 : 6,
              backgroundColor: i === 0 ? '#5eaeff' : 'rgba(255,255,255,0.18)',
              transition: 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            align-content: center;
          }
        }
      `}</style>
    </div>
  )
}
