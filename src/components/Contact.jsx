import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

const methods = [
  { label: 'Phone',     value: '0414 758 891',          href: 'tel:0414758891'                },
  { label: 'Email',     value: 'enquiries@luxcoda.com',  href: 'mailto:enquiries@luxcoda.com'  },
  { label: 'Instagram', value: '@luxcoda',               href: 'https://instagram.com/luxcoda' },
  { label: 'Facebook',  value: 'facebook.com/luxcoda',   href: 'https://facebook.com/luxcoda'  },
]

export default function Contact() {
  const rightRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = rightRef.current.querySelectorAll('.contact-method')
      gsap.set(items, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: rightRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power2.out',
            stagger: 0.1,
          })
        },
      })
    }, rightRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      style={{
        background: 'rgba(5,5,5,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 'min(18vh, 160px) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div
        className="contact-grid"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 8vw, 8rem)',
          alignItems: 'start',
        }}
      >

        {/* Left */}
        <div>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
          }}>
            Get in Touch
          </p>

          <AnimatedText
            as="h2"
            style={{
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: 'var(--white)',
              lineHeight: 1.0,
              marginBottom: '1.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            Let&apos;s Build.
          </AnimatedText>

          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: 15,
            color: 'var(--muted-strong)',
            lineHeight: 1.8,
            maxWidth: 440,
            marginBottom: '2rem',
          }}>
            Brisbane-based. Obsessively focused on craft. Whether you need a new site
            from scratch or want to take your existing one from forgettable to remarkable
            — reach out. We respond fast.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: 'var(--gold)',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: 13,
              color: 'var(--white)',
              letterSpacing: '0.03em',
            }}>
              Brisbane, Queensland, Australia
            </span>
          </div>
        </div>

        {/* Right — contact methods */}
        <div ref={rightRef}>
          {methods.map((m, i) => (
            <a
              key={m.label}
              href={m.href}
              target={m.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-method"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(1rem, 2vh, 1.5rem) 0',
                borderBottom: '1px solid rgba(240,236,228,0.06)',
                textDecoration: 'none',
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => {
                const arrow = e.currentTarget.querySelector('.c-arrow')
                if (arrow) arrow.style.color = 'var(--gold)'
              }}
              onMouseLeave={e => {
                const arrow = e.currentTarget.querySelector('.c-arrow')
                if (arrow) arrow.style.color = 'var(--muted)'
              }}
            >
              <div>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.3rem',
                }}>
                  {m.label}
                </p>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: 16,
                  color: 'var(--white)',
                }}>
                  {m.value}
                </p>
              </div>
              <span
                className="c-arrow"
                style={{
                  color: 'var(--muted)',
                  fontSize: 14,
                  transition: 'color 0.2s',
                }}
              >
                →
              </span>
            </a>
          ))}
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
