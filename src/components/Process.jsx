import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    num: '01',
    title: 'Tell Us About\nYour Business',
    body: 'Fill out a short form or give us a call. We learn about your goals, your customers, and what you need your website to do.',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.07)',
    icon: '💬',
  },
  {
    num: '02',
    title: 'We Design Your\nFree Mock-Up',
    body: "Within 48 hours we'll design a custom preview built specifically for your business. No obligations, no payment required.",
    accent: '#5eaeff',
    glow: 'rgba(94,174,255,0.07)',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Build, Review\n& Refine',
    body: "Once you're happy with the direction, we build the full site. You get revision rounds to make sure every detail is right.",
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.07)',
    icon: '⚙️',
  },
  {
    num: '04',
    title: 'Launch &\nMaintain',
    body: 'We handle every technical detail — hosting, domain, speed optimisation — then stay on month after month to keep things running.',
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.07)',
    icon: '🚀',
  },
]

const SCROLL_TOTAL = 3200
const STEP = 1 / steps.length

/* ─── Floating phone wireframe ─── */
function PhoneWireframe({ accent }) {
  return (
    <div style={{
      width: 'clamp(140px, 18vw, 240px)',
      height: 'clamp(260px, 34vw, 440px)',
      borderRadius: 'clamp(28px, 4vw, 44px)',
      background: 'rgba(255,255,255,0.04)',
      border: `1.5px solid ${accent}35`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 60px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Notch */}
      <div style={{
        width: 60, height: 8, borderRadius: 100,
        background: 'rgba(255,255,255,0.08)',
        margin: '12px auto 0',
        flexShrink: 0,
      }} />

      {/* Screen */}
      <div style={{ flex: 1, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Fake nav bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <div style={{ width: 40, height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 3 }} />
          <div style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Hero block */}
        <div style={{
          borderRadius: 10, padding: '0.75rem',
          background: `linear-gradient(135deg, ${accent}12, rgba(168,85,247,0.08))`,
          border: `1px solid ${accent}20`,
        }}>
          <div style={{ width: '75%', height: 7, background: 'rgba(255,255,255,0.22)', borderRadius: 3, marginBottom: '0.3rem' }} />
          <div style={{ width: '55%', height: 7, background: `${accent}60`, borderRadius: 3, marginBottom: '0.5rem' }} />
          <div style={{ width: '90%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: '0.2rem' }} />
          <div style={{ width: '70%', height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginBottom: '0.65rem' }} />
          <div style={{ width: 70, height: 20, borderRadius: 100, background: `linear-gradient(135deg, ${accent}, #a855f7)` }} />
        </div>

        {/* Rows */}
        {[80, 65, 75].map((w, i) => (
          <div key={i} style={{
            display: 'flex', gap: '0.4rem', alignItems: 'center',
            padding: '0.35rem 0',
            borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, background: i % 2 === 0 ? `${accent}18` : 'rgba(168,85,247,0.12)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ width: `${w}%`, height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginBottom: '0.2rem' }} />
              <div style={{ width: `${w * 0.6}%`, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div style={{
        width: 50, height: 4, borderRadius: 100,
        background: 'rgba(255,255,255,0.15)',
        margin: '0 auto 10px', flexShrink: 0,
      }} />

      {/* Accent glow */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '50%',
        transform: 'translate(-50%, 50%)',
        width: '80%', height: '40%', borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}20, transparent 70%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)
  const slideRefs = useRef([])
  const dotsRef = useRef([])
  const phoneRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Init hidden
      slideRefs.current.slice(1).forEach(el => {
        gsap.set(el, { opacity: 0, y: 28, filter: 'blur(8px)' })
      })
      phoneRefs.current.slice(1).forEach(el => {
        gsap.set(el, { opacity: 0, scale: 0.9, y: 20 })
      })
      dotsRef.current.forEach((dot, i) => {
        if (i > 0) gsap.set(dot, { width: 6, backgroundColor: 'rgba(255,255,255,0.18)' })
      })

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
        const exitPos  = i * STEP + STEP * 0.72
        const enterPos = i * STEP + STEP * 0.82

        tl.to(slideRefs.current[i],
          { opacity: 0, y: -22, filter: 'blur(7px)', duration: STEP * 0.14, ease: 'power2.in' },
          exitPos
        )
        tl.to(phoneRefs.current[i],
          { opacity: 0, scale: 0.88, y: -15, filter: 'blur(6px)', duration: STEP * 0.14, ease: 'power2.in' },
          exitPos
        )
        tl.fromTo(slideRefs.current[i + 1],
          { opacity: 0, y: 28, filter: 'blur(7px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: STEP * 0.18, ease: 'power2.out' },
          enterPos
        )
        tl.fromTo(phoneRefs.current[i + 1],
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: STEP * 0.2, ease: 'power2.out' },
          enterPos
        )
        tl.to(dotsRef.current[i],
          { width: 6, backgroundColor: 'rgba(255,255,255,0.18)', duration: STEP * 0.08 },
          exitPos
        )
        tl.to(dotsRef.current[i + 1],
          { width: 28, backgroundColor: steps[i + 1].accent, duration: STEP * 0.08 },
          enterPos
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} id="process" style={{
      height: '100vh',
      background: '#07071a',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 55% 50% at 25% 60%, ${s.glow} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: i === 0 ? 1 : 0,
          }} className={`process-bg-${i}`} />
        ))}
      </div>

      {/* Grid mesh */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 30% 60%, black 5%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 30% 60%, black 5%, transparent 100%)',
      }} />

      {/* Section label */}
      <div style={{
        position: 'absolute',
        top: 'calc(70px + clamp(0.75rem, 1.5vh, 1.25rem))',
        left: 'clamp(1.25rem, 5vw, 5rem)',
        zIndex: 2,
      }}>
        <span className="section-label">How It Works</span>
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
            padding: '70px clamp(1.25rem, 5vw, 5rem) clamp(4rem, 7vh, 6rem)',
            gap: 'clamp(2rem, 5vw, 6rem)',
          }}
          className="process-grid"
        >
          {/* Left — Phone mockup */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              ref={el => phoneRefs.current[i] = el}
              style={{ opacity: i === 0 ? 1 : 0 }}
              className="float-y-slow"
            >
              <PhoneWireframe accent={step.accent} />
            </div>
          </div>

          {/* Right — Content */}
          <div>
            {/* Step tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.65rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.28rem 0.8rem', borderRadius: 100,
              background: `${step.accent}16`,
              border: `1px solid ${step.accent}30`,
              marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
            }}>
              <span style={{ color: step.accent }}>Step {step.num}</span>
            </div>

            {/* Icon */}
            <div style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              marginBottom: '0.5rem',
            }}>
              {step.icon}
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 3.5rem)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 1.08, color: '#fff',
              marginBottom: 'clamp(0.875rem, 1.8vh, 1.5rem)',
              whiteSpace: 'pre-line',
            }}>
              {step.title}
            </h2>

            <p style={{
              fontSize: 'clamp(0.93rem, 1.25vw, 1.05rem)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.78, margin: 0,
              maxWidth: 440,
            }}>
              {step.body}
            </p>

            {/* Progress counter */}
            <div style={{
              marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1,
                color: step.accent, opacity: 0.25,
              }}>
                {step.num}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>
                / 0{steps.length}
              </span>
            </div>
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
        {steps.map((s, i) => (
          <div
            key={i}
            ref={el => dotsRef.current[i] = el}
            style={{
              height: 4, borderRadius: 3,
              width: i === 0 ? 28 : 6,
              backgroundColor: i === 0 ? s.accent : 'rgba(255,255,255,0.18)',
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
          .process-grid > div:first-child { display: none !important; }
        }
      `}</style>
    </div>
  )
}
