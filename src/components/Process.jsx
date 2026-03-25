import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We spend 30 minutes learning about your business, your goals, and what makes you different. No jargon — just a real conversation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Design Mock-Up',
    desc: 'Within 48 hours you receive a custom design mockup tailored to your brand. You\'ll see exactly what your site will look like before we build a line of code.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Build & Refine',
    desc: 'Once you\'re happy with the design, we build it. Fast, responsive, and SEO-ready. You get two rounds of revisions and a live preview link throughout.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Launch & Grow',
    desc: 'Your site goes live within 7 days. We handle domain, hosting, and Google setup. Then we stay on as your ongoing web partner — keeping things fast, fresh, and growing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    ),
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0d0d22',
        padding: '100px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Background large number watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(200px, 40vw, 420px)',
          fontWeight: 400,
          color: 'rgba(94,174,255,0.02)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          lineHeight: 1,
          letterSpacing: '0.1em',
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        PROCESS
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 72, textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(90deg, #5eaeff, #a855f7)' }} />
            <span className="section-label">How It Works</span>
            <span style={{ display: 'inline-block', width: 32, height: 2, background: 'linear-gradient(270deg, #5eaeff, #a855f7)' }} />
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: '#f0f0ff',
              margin: 0,
            }}
          >
            From brief to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              live in 7 days
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 32,
            position: 'relative',
          }}
        >
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: 52,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(94,174,255,0.3) 20%, rgba(168,85,247,0.3) 80%, transparent)',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step circle */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 28,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                {/* Gradient ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: '50%',
                    padding: 1,
                    background: `linear-gradient(135deg, ${i < 2 ? '#5eaeff' : '#a855f7'}, ${i < 2 ? '#a855f7' : '#5eaeff'})`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <span
                  style={{
                    color: i < 2 ? '#5eaeff' : '#a855f7',
                  }}
                >
                  {step.icon}
                </span>
              </div>

              {/* Number */}
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '0.9rem',
                  letterSpacing: '0.2em',
                  color: i < 2 ? '#5eaeff' : '#a855f7',
                  marginBottom: 8,
                }}
              >
                Step {step.num}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#f0f0ff',
                  margin: '0 0 14px',
                }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(240,240,255,0.6)',
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 260,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
