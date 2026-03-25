import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

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

// step transitions
const numVariants = {
  enter: { opacity: 0, y: 60, filter: 'blur(8px)' },
  center: { opacity: 0.12, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -60, filter: 'blur(8px)', transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
}

const contentVariants = {
  enter: { opacity: 0, y: 30, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

export default function Process() {
  const containerRef = useRef(null)
  const [step, setStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 400vh container → 300vh budget → 4 steps each get ~75vh of scroll
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(3, Math.floor(v * 4))
    if (next !== step) setStep(next)
  })

  return (
    <div ref={containerRef} id="process" style={{ height: '400vh', background: '#060810' }}>

      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
      }}>
        {/* Section label */}
        <div style={{
          position: 'absolute', top: 'clamp(1.5rem, 4vh, 3rem)',
          left: 'clamp(1.25rem, 4vw, 4rem)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}>
            How It Works
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.72rem' }}>
            {step + 1} / {steps.length}
          </span>
        </div>

        {/* Main layout — number left, content right */}
        <div style={{
          height: '100%',
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
            <AnimatePresence mode="wait">
              <motion.span
                key={step}
                variants={numVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  fontSize: 'clamp(18vw, 22vw, 26vw)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  userSelect: 'none',
                }}
              >
                {steps[step].num}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Step content */}
          <div style={{ overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h2 style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  whiteSpace: 'pre-line',
                }}>
                  {steps[step].title}
                </h2>

                <p style={{
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.75,
                  maxWidth: 440,
                }}>
                  {steps[step].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vh, 3rem)',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '0.5rem', alignItems: 'center',
        }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              height: 5, borderRadius: 3,
              transition: 'width 0.35s ease, background 0.35s ease',
              width: i === step ? 28 : 6,
              background: i === step
                ? 'linear-gradient(90deg, #5eaeff, #a855f7)'
                : 'rgba(255,255,255,0.18)',
            }} />
          ))}
        </div>
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
