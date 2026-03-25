import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import MockupDialog from './MockupDialog'

const contactItems = [
  {
    label: 'Call Us',
    value: '0414 758 891',
    href: 'tel:0414758891',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: '#5eaeff',
  },
  {
    label: 'Email Us',
    value: 'enquiries@luxcoda.com',
    href: 'mailto:enquiries@luxcoda.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#a855f7',
  },
  {
    label: 'Instagram',
    value: '@luxcoda',
    href: 'https://instagram.com/luxcoda',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    color: '#f472b6',
  },
  {
    label: 'Facebook',
    value: 'facebook.com/luxcoda',
    href: 'https://facebook.com/luxcoda',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    color: '#60a5fa',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0a0a1a',
        padding: '120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div
        className="orb"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(94,174,255,0.07) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
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
            <span className="section-label">Get In Touch</span>
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
              margin: '0 0 20px',
              lineHeight: 1.05,
            }}
          >
            Ready to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #5eaeff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              get started?
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(240,240,255,0.85)',
              margin: '0 auto',
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            Get your free mock-up today — no commitment required. We'll show you exactly what your new site will look like before you pay a cent.
          </p>
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background:
              'linear-gradient(135deg, rgba(94,174,255,0.08) 0%, rgba(168,85,247,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 26,
            padding: 'clamp(36px, 5vw, 60px)',
            marginBottom: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 24,
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              background:
                'linear-gradient(135deg, rgba(94,174,255,0.18), rgba(168,85,247,0.18))',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5eaeff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                fontWeight: 800,
                color: '#f0f0ff',
                margin: '0 0 10px',
              }}
            >
              Claim Your Free Mock-Up
            </h3>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: '0.95rem',
                color: 'rgba(240,240,255,0.82)',
                margin: 0,
              }}
            >
              See your brand come to life — no risk, no obligation.
            </p>
          </div>
          <MockupDialog
            trigger={
              <Button
                className="gradient-btn"
                style={{ height: 52, padding: '0 40px', borderRadius: 14, fontSize: '1rem' }}
              >
                Get My Free Mock-Up
              </Button>
            }
          />
        </motion.div>

        {/* Contact cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {contactItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 + i * 0.09 }}
              whileHover={{ y: -5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '18px 20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                textDecoration: 'none',
                transition: 'border-color 0.25s, background 0.25s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${item.color}38`
                e.currentTarget.style.background = `${item.color}07`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: `${item.color}14`,
                  border: `1px solid ${item.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: 'rgba(240,240,255,0.5)',
                    marginBottom: 3,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#f0f0ff',
                  }}
                >
                  {item.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
