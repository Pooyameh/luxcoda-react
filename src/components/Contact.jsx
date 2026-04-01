import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedText from './AnimatedText'

const methods = [
  { label: 'Phone',     value: '0414 758 891',          href: 'tel:0414758891'                    },
  { label: 'Email',     value: 'enquiries@luxcoda.com',  href: 'mailto:enquiries@luxcoda.com'      },
  { label: 'Instagram', value: '@luxcoda',               href: 'https://instagram.com/luxcoda'     },
  { label: 'Facebook',  value: 'facebook.com/luxcoda',   href: 'https://facebook.com/luxcoda'      },
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
        background: 'rgba(10,10,10,0.85)',
        padding: '15vh clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 8vw, 8rem)',
        alignItems: 'start',
      }}
      className="contact-grid"
      >

        {/* Left */}
        <div>
          <p style={{
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
          }}>
            Get in Touch
          </p>

          <AnimatedText
            as="h2"
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              color: 'var(--white)',
              lineHeight: 1.0,
              marginBottom: '1.5rem',
            }}
          >
            Let's Build.
          </AnimatedText>

          <p style={{
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
            color: 'var(--text-body)',
            lineHeight: 1.7,
            maxWidth: 360,
            marginBottom: '2rem',
          }}>
            Brisbane-based and ready to build. Reach out by phone, email, or social — we respond fast.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <span style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: 'var(--gold)',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
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
                borderBottom: i < methods.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
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
                if (arrow) arrow.style.color = 'var(--text-muted)'
              }}
            >
              <div>
                <p style={{
                  fontFamily: 'var(--sans)',
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
                  fontFamily: 'var(--sans)',
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
                  color: 'var(--text-muted)',
                  fontSize: 16,
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
