import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

export default function Process() {
  const sectionRef = useRef(null)
  const counterRef = useRef(null)
  const slideRefs = useRef([])
  const dotsRef = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let lastIdx = 0

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1200',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))

          if (idx !== lastIdx) {
            const prev = lastIdx
            lastIdx = idx

            // Cross-fade slides
            gsap.to(slideRefs.current[prev], {
              opacity: 0, y: -40, filter: 'blur(6px)',
              duration: 0.45, ease: 'power2.in', overwrite: true,
            })
            gsap.fromTo(slideRefs.current[idx],
              { opacity: 0, y: 40, filter: 'blur(6px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out', overwrite: true }
            )

            // Animate dots
            dotsRef.current.forEach((dot, i) => {
              gsap.to(dot, {
                width: i === idx ? 28 : 6,
                backgroundColor: i === idx ? '#5eaeff' : 'rgba(255,255,255,0.18)',
                duration: 0.3,
                overwrite: true,
              })
            })

            // Update counter text directly (no React re-render)
            if (counterRef.current) {
              counterRef.current.textContent = `${idx + 1} / ${steps.length}`
            }
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="process" style={{
      height: '100vh',
      background: '#060810',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Section label */}
      <div style={{
        position: 'absolute', top: 'clamp(1.5rem, 4vh, 3rem)',
        left: 'clamp(1.25rem, 4vw, 4rem)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        zIndex: 2,
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}>
          How It Works
        </span>
        <span ref={counterRef} style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.72rem' }}>
          1 / {steps.length}
        </span>
      </div>

      {/* All step slides overlaid — GSAP crossfades between them */}
      {steps.map((step, i) => (
        <div
          key={step.num}
          ref={el => slideRefs.current[i] = el}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === 0 ? 1 : 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            padding: '0 clamp(1.25rem, 4vw, 4rem)',
            gap: 'clamp(1rem, 3vw, 4rem)',
          }}
          className="process-grid"
        >
          {/* Giant step number */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <span style={{
              fontSize: 'clamp(18vw, 22vw, 26vw)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.06em',
              background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              userSelect: 'none',
              opacity: 0.12,
            }}>
              {step.num}
            </span>
          </div>

          {/* Step content */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              whiteSpace: 'pre-line',
            }}>
              {step.title}
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.75,
              maxWidth: 440,
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
              height: 5,
              borderRadius: 3,
              width: i === 0 ? 28 : 6,
              backgroundColor: i === 0 ? '#5eaeff' : 'rgba(255,255,255,0.18)',
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
