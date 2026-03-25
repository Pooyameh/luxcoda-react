import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We spend 30 minutes learning about your business, goals, and what makes you different. No jargon — just a real conversation about results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: '#5eaeff',
  },
  {
    num: '02',
    title: 'Design Mock-Up',
    desc: 'Within 48 hours you receive a custom design mockup tailored to your brand. You see exactly what your site will look like — before we write a line of code.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    color: '#818cf8',
  },
  {
    num: '03',
    title: 'Build & Refine',
    desc: 'Once you approve the design, we build it. Fast, responsive, and SEO-ready. You get two rounds of revisions and a live preview link throughout.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#a855f7',
  },
  {
    num: '04',
    title: 'Launch & Grow',
    desc: 'Your site goes live within 7 days. We handle domain, hosting, and Google setup — then stay on as your ongoing digital partner to keep things growing.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
      </svg>
    ),
    color: '#c084fc',
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0d0d22',
        padding: '120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Giant watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(140px, 30vw, 340px)',
          fontWeight: 400,
          color: 'rgba(94,174,255,0.025)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          lineHeight: 1,
          letterSpacing: '0.12em',
          userSelect: 'none',
        }}
      >
        HOW IT WORKS
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 90 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 44,
                height: 1.5,
                background: 'linear-gradient(90deg, transparent, #5eaeff)',
                borderRadius: 2,
              }}
            />
            <span className="section-label">How It Works</span>
            <span
              style={{
                display: 'inline-block',
                width: 44,
                height: 1.5,
                background: 'linear-gradient(270deg, transparent, #a855f7)',
                borderRadius: 2,
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#f0f0ff',
              margin: 0,
              lineHeight: 1.05,
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

        {/* Steps grid */}
        <div
          style={{
            display: 'grid',
            gap: 28,
            position: 'relative',
          }}
          className="lg:grid-cols-4 md:grid-cols-2 grid-cols-1"
        >
          {/* Connector line — desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: 52,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background:
                'linear-gradient(90deg, #5eaeff 0%, #818cf8 33%, #a855f7 66%, #c084fc 100%)',
              transformOrigin: 'left center',
              zIndex: 0,
              opacity: 0.35,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Outlined number — signature visual element */}
              <div style={{ position: 'relative', marginBottom: 4 }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                    color: 'transparent',
                    WebkitTextStroke: `2px ${step.color}`,
                    display: 'block',
                    userSelect: 'none',
                  }}
                >
                  {step.num}
                </span>
              </div>

              {/* Icon circle */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${step.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  position: 'relative',
                  flexShrink: 0,
                  color: step.color,
                  boxShadow: `0 0 30px ${step.color}15`,
                }}
              >
                {/* Gradient ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -1,
                    borderRadius: '50%',
                    padding: 1,
                    background: `linear-gradient(135deg, ${step.color}60, transparent 60%)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                {step.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#f0f0ff',
                  margin: '0 0 14px',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(240,240,255,0.82)',
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: 280,
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
