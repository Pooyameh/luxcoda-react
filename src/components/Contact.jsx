import { useRef, useLayoutEffect, useCallback } from 'react'
import { Phone, Mail } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function InstagramIcon({ size = 18, color = '#5eaeff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 18, color = '#5eaeff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const contacts = [
  {
    Icon: ({ size, color }) => <Phone size={size} color={color} strokeWidth={1.75} />,
    label: 'Phone',
    value: '0414 758 891',
    href: 'tel:0414758891',
    accent: '#22d3ee',
  },
  {
    Icon: ({ size, color }) => <Mail size={size} color={color} strokeWidth={1.75} />,
    label: 'Email',
    value: 'enquiries@luxcoda.com',
    href: 'mailto:enquiries@luxcoda.com',
    accent: '#5eaeff',
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    value: '@luxcoda',
    href: 'https://instagram.com/luxcoda',
    accent: '#a855f7',
  },
  {
    Icon: FacebookIcon,
    label: 'Facebook',
    value: 'facebook.com/luxcoda',
    href: 'https://facebook.com/luxcoda',
    accent: '#f472b6',
  },
]

/* ─── 3D Tilt Panel ─── */
function TiltPanel({ children }) {
  const panelRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 25, stiffness: 180 })
  const sy = useSpring(y, { damping: 25, stiffness: 180 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])

  const handleMouseMove = useCallback((e) => {
    const el = panelRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px', height: '100%' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          height: '100%',
          borderRadius: 24,
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.55)',
          overflow: 'hidden',
        }}
        whileHover={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 48px 120px rgba(0,0,0,0.65), 0 0 60px rgba(94,174,255,0.06)',
          transition: { duration: 0.3 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700',
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      })

      tl.fromTo('.contact-left',
        { opacity: 0, x: -40, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0
      )
      tl.fromTo('.contact-right',
        { opacity: 0, x: 35, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0.1
      )
      tl.fromTo('.contact-item',
        { opacity: 0, y: 16, filter: 'blur(5px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.07, duration: 0.3, ease: 'power2.out' },
        0.2
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(5rem, 10vh, 8rem) clamp(1.25rem, 5vw, 5rem)',
      background: '#060618',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '-8%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div style={{
        maxWidth: 1400, margin: '0 auto', width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 8vw, 8rem)',
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}
      className="contact-grid"
      >

        {/* LEFT — Headline */}
        <div className="contact-left" style={{ opacity: 0 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Get in Touch
          </span>

          <h2 style={{
            fontSize: 'clamp(4rem, 10vw, 10rem)',
            fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 0.85,
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            <span className="gradient-animate">Let's</span>
            <br />
            <span style={{ color: '#fff' }}>Build.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(0.93rem, 1.4vw, 1.05rem)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.72, maxWidth: 360,
            marginBottom: '2rem',
          }}>
            Brisbane-based and ready to build. Reach out by phone, email, or social — we respond fast.
          </p>

          {/* ABN / Trust strip */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.4rem 1rem',
            borderRadius: 100,
            background: 'rgba(34,211,238,0.06)',
            border: '1px solid rgba(34,211,238,0.18)',
            fontSize: '0.72rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.04em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#22d3ee',
              boxShadow: '0 0 8px rgba(34,211,238,0.9)',
              flexShrink: 0,
            }} />
            Brisbane, Queensland, Australia
          </div>
        </div>

        {/* RIGHT — Contact panel with 3D tilt */}
        <div className="contact-right" style={{ opacity: 0 }}>
          <TiltPanel>
            {contacts.map((item, idx) => {
              const { Icon } = item
              const isLast = idx === contacts.length - 1
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(1rem, 2vw, 1.5rem)',
                    padding: 'clamp(1.1rem, 2.2vw, 1.6rem) clamp(1.25rem, 2.5vw, 2rem)',
                    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    textDecoration: 'none',
                    opacity: 0,
                    transition: 'background 0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${item.accent}07`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Accent bar on left */}
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
                    background: `linear-gradient(180deg, transparent, ${item.accent}60, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }} className="contact-accent-bar" />

                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${item.accent}12`,
                    border: `1px solid ${item.accent}25`,
                    transition: 'background 0.3s, border-color 0.3s',
                  }}>
                    <Icon size={17} color={item.accent} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                      marginBottom: '0.2rem',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                      fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '-0.01em', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {item.value}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={`${item.accent}60`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, transition: 'stroke 0.3s' }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              )
            })}
          </TiltPanel>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        .contact-item:hover .contact-accent-bar { opacity: 1 !important; }
      `}</style>
    </section>
  )
}
