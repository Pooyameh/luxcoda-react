import { useRef, useLayoutEffect } from 'react'
import { Phone, Mail } from 'lucide-react'
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
  },
  {
    Icon: ({ size, color }) => <Mail size={size} color={color} strokeWidth={1.75} />,
    label: 'Email',
    value: 'enquiries@luxcoda.com',
    href: 'mailto:enquiries@luxcoda.com',
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    value: '@luxcoda',
    href: 'https://instagram.com/luxcoda',
  },
  {
    Icon: FacebookIcon,
    label: 'Facebook',
    value: 'facebook.com/luxcoda',
    href: 'https://facebook.com/luxcoda',
  },
]

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
        { opacity: 0, x: -36, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0
      )
      tl.fromTo('.contact-item',
        { opacity: 0, x: 28, filter: 'blur(5px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.3, ease: 'power2.out' },
        0.15
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 clamp(1.25rem, 4vw, 4rem)',
      background: '#06060f',
      overflow: 'hidden',
    }}>

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '-8%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,174,255,0.06) 0%, transparent 70%)',
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
        {/* Left — Large headline */}
        <div className="contact-left" style={{ opacity: 0 }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            display: 'block', marginBottom: '1.5rem',
          }}>
            Get in Touch
          </span>
          <h2 style={{
            fontSize: 'clamp(4rem, 10vw, 10rem)',
            fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.88,
            background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            Let's<br />Talk.
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.72, maxWidth: 360,
          }}>
            Brisbane-based and ready to build. Reach out by phone, email, or social — we respond fast.
          </p>
        </div>

        {/* Right — Contact list (no cards, clean glass rows) */}
        <div
          style={{
            borderRadius: 24,
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(36px)',
            WebkitBackdropFilter: 'blur(36px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.55)',
            overflow: 'hidden',
          }}
        >
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
                  padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 3vw, 2.25rem)',
                  borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none',
                  opacity: 0,
                  transition: 'background 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(94,174,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <Icon size={16} color="rgba(94,174,255,0.85)" />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                    marginBottom: '0.18rem',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.88rem, 1.2vw, 0.96rem)',
                    fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '-0.01em', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {item.value}
                  </div>
                </div>

                {/* Arrow */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
